import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { rateLimit, getIP } from '@/lib/rateLimit'
import { enviarCorreo, plantilla, correoAdmin, dominioVerificado } from '@/lib/email'
import { sendLeadEvent } from '@/lib/meta-capi'
import {
  AGENDA_DEFAULT, AgendaConfig, ahoraEnChile, diaSemana, sumarDias,
  minutosDeBloque, MARGEN_MINUTOS, formatoLargo,
} from '@/lib/agenda'

export const dynamic = 'force-dynamic'

async function leerConfig(): Promise<AgendaConfig> {
  const db = getSupabase()
  if (!db) return AGENDA_DEFAULT
  try {
    const { data } = await db.from('settings').select('value').eq('key', 'agenda_config').single()
    const p = JSON.parse(data?.value ?? '')
    return (p && typeof p === 'object') ? { ...AGENDA_DEFAULT, ...p } : AGENDA_DEFAULT
  } catch { return AGENDA_DEFAULT }
}

/** Días con sus bloques y cupos disponibles. */
export async function GET() {
  const cfg = await leerConfig()
  const { fecha: hoy, minutos } = ahoraEnChile()
  const db = getSupabase()

  const hasta = sumarDias(hoy, cfg.diasAnticipacion)
  const ocupacion: Record<string, number> = {}
  let faltaTabla = false

  if (db) {
    const { data, error } = await db
      .from('bookings')
      .select('fecha, bloque')
      .gte('fecha', hoy).lte('fecha', hasta)
      .in('status', ['pendiente', 'confirmada'])

    // Sin la tabla no se puede guardar nada: mejor no mostrar un calendario
    // que después va a fallar al enviar.
    if (error) {
      faltaTabla = true
      console.error('[agenda] No se pudo leer bookings:', error.message)
    } else {
      for (const b of data ?? []) ocupacion[`${b.fecha}|${b.bloque}`] = (ocupacion[`${b.fecha}|${b.bloque}`] ?? 0) + 1
    }
  }

  const dias = []
  for (let i = 0; i <= cfg.diasAnticipacion; i++) {
    const fecha = sumarDias(hoy, i)
    if (!cfg.diasHabiles.includes(diaSemana(fecha))) continue

    const bloques = cfg.bloques.map(bloque => {
      const usados = ocupacion[`${fecha}|${bloque}`] ?? 0
      const muyJusto = fecha === hoy && minutosDeBloque(bloque) - minutos < MARGEN_MINUTOS
      return { bloque, disponibles: Math.max(0, cfg.maxPorBloque - usados), libre: !muyJusto && usados < cfg.maxPorBloque }
    })

    if (bloques.some(b => b.libre)) dias.push({ fecha, bloques })
  }

  // En producción, sin base de datos no se muestran horarios: no podríamos
  // guardar la reserva. En desarrollo sí, para poder revisar el calendario.
  const enDesarrollo = process.env.NODE_ENV !== 'production'

  const noSePuedeGuardar = !db || faltaTabla

  return NextResponse.json(
    {
      activo: cfg.activo,
      dias,
      sinConexion: noSePuedeGuardar && !enDesarrollo,
      demo: noSePuedeGuardar && enDesarrollo,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

/** Crea una solicitud de hora (queda pendiente de confirmación). */
export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const rl = rateLimit(`agenda:${ip}`, { max: 6, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) return NextResponse.json({ error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 })

  const b = await req.json().catch(() => ({}))
  const name      = String(b.name || '').trim().slice(0, 80)
  const phone     = String(b.phone || '').trim().slice(0, 30)
  const email     = String(b.email || '').trim().toLowerCase().slice(0, 120)
  const fecha     = String(b.fecha || '').trim()
  const bloque    = String(b.bloque || '').trim()
  const comuna    = String(b.comuna || '').trim().slice(0, 60)
  const direccion = String(b.direccion || '').trim().slice(0, 200)
  const servicio  = String(b.servicio || '').trim().slice(0, 80)
  const mensaje   = String(b.mensaje || '').trim().slice(0, 500)

  if (name.length < 2) return NextResponse.json({ error: 'Escribe tu nombre.' }, { status: 400 })
  if (phone.replace(/\D/g, '').length < 8) return NextResponse.json({ error: 'Escribe un teléfono válido.' }, { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return NextResponse.json({ error: 'Elige un día.' }, { status: 400 })
  if (!comuna) return NextResponse.json({ error: 'Indica tu comuna.' }, { status: 400 })

  const cfg = await leerConfig()
  if (!cfg.activo) return NextResponse.json({ error: 'La agenda está cerrada por ahora. Escríbenos por WhatsApp.' }, { status: 503 })
  if (!cfg.bloques.includes(bloque)) return NextResponse.json({ error: 'Elige un horario.' }, { status: 400 })

  const { fecha: hoy, minutos } = ahoraEnChile()
  if (fecha < hoy) return NextResponse.json({ error: 'Esa fecha ya pasó.' }, { status: 400 })
  if (fecha > sumarDias(hoy, cfg.diasAnticipacion)) return NextResponse.json({ error: 'Esa fecha está fuera del rango.' }, { status: 400 })
  if (!cfg.diasHabiles.includes(diaSemana(fecha))) return NextResponse.json({ error: 'Ese día no atendemos.' }, { status: 400 })
  if (fecha === hoy && minutosDeBloque(bloque) - minutos < MARGEN_MINUTOS) {
    return NextResponse.json({ error: 'Ese horario ya está muy cerca. Elige uno más tarde.' }, { status: 400 })
  }

  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'La agenda no está disponible en este momento.' }, { status: 503 })

  // Verifica el cupo justo antes de guardar, por si alguien reservó mientras tanto
  const { count } = await db
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('fecha', fecha).eq('bloque', bloque)
    .in('status', ['pendiente', 'confirmada'])

  if ((count ?? 0) >= cfg.maxPorBloque) {
    return NextResponse.json({ error: 'Ese horario se acaba de ocupar. Elige otro, por favor.' }, { status: 409 })
  }

  const { data: creada, error } = await db.from('bookings').insert({
    fecha, bloque, name, phone, email: email || null, comuna, direccion, servicio, mensaje,
    status: 'pendiente',
    source: String(b.source || '').slice(0, 120),
    utm_source: String(b.utm_source || '').slice(0, 80) || null,
    device: String(b.device || '').slice(0, 20),
  }).select('id').single()

  if (error) {
    console.error('Supabase insert error (bookings):', error)
    const sinTabla = error.code === '42P01'
    return NextResponse.json({
      error: sinTabla
        ? 'La agenda en línea aún no está habilitada. Escríbenos por WhatsApp y coordinamos tu visita.'
        : 'No pudimos guardar tu hora. Intenta de nuevo o escríbenos por WhatsApp.',
    }, { status: sinTabla ? 503 : 500 })
  }

  const cuando = `${formatoLargo(fecha)}, entre ${bloque.replace('-', ' y ')}`

  // Aviso al administrador
  await enviarCorreo({
    to: correoAdmin(),
    replyTo: email || undefined,
    subject: `📅 Nueva hora solicitada · ${comuna} · ${fecha} ${bloque}`,
    html: plantilla({
      titulo: 'Nueva solicitud de hora',
      intro: 'Alguien reservó una visita desde la web. Queda <strong>pendiente</strong> hasta que la confirmes en el panel.',
      filas: [
        ['Cuándo', cuando], ['Cliente', name], ['Teléfono', phone],
        ['Correo', email || '—'], ['Comuna', comuna], ['Dirección', direccion || '—'],
        ['Servicio', servicio || '—'], ['Detalle', mensaje || '—'],
      ],
      cta: { texto: 'Confirmar o rechazar', url: 'https://fixday.cl/admin/agenda' },
      nota: 'Al confirmarla desde el panel, el cliente recibe su correo de confirmación automáticamente.',
    }),
  })

  // Acuse de recibo al cliente (requiere dominio verificado en Resend)
  let avisoCliente = false
  if (email) {
    const r = await enviarCorreo({
      to: email, esCliente: true,
      subject: `Recibimos tu solicitud de visita · FIXDAY`,
      html: plantilla({
        titulo: `¡Gracias, ${name.split(' ')[0]}!`,
        intro: 'Recibimos tu solicitud de visita técnica a domicilio. En cuanto la revisemos te llegará la confirmación definitiva.',
        filas: [['Día solicitado', cuando], ['Comuna', comuna], ['Dirección', direccion || 'La coordinamos contigo'], ['Servicio', servicio || 'Diagnóstico general']],
        nota: 'La visita más el diagnóstico tienen un valor de $25.000, que se descuenta del total si haces la reparación con nosotros. ¿Necesitas cambiar la hora? Respóndenos este correo o escríbenos al WhatsApp +56 9 3664 9332.',
      }),
    })
    avisoCliente = r.enviado
  }

  sendLeadEvent({
    name, phone, email: email || undefined,
    service: `Agendamiento ${servicio || 'visita'} ${comuna}`,
    sourceUrl: 'https://fixday.cl/agendar',
    clientIp: ip,
    clientUserAgent: req.headers.get('user-agent') ?? undefined,
  }).catch(() => {})

  return NextResponse.json({
    success: true, id: creada?.id, cuando,
    avisoCliente,
    dominioVerificado: dominioVerificado(),
  })
}
