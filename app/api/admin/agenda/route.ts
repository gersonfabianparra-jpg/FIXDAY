import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { enviarCorreo, plantilla, dominioVerificado, correoAdmin } from '@/lib/email'
import { AGENDA_DEFAULT, AgendaConfig, ahoraEnChile, formatoLargo, TZ } from '@/lib/agenda'
import { listarReservas, obtenerReserva, actualizarReserva, eliminarReserva, crearReserva, contarEnBloque, type Reserva } from '@/lib/store'

export const dynamic = 'force-dynamic'

/** Link para que el cliente agregue la visita a su Google Calendar. */
function linkGoogleCalendar(fecha: string, bloque: string, comuna: string, direccion: string): string {
  const [ini, fin] = bloque.split('-')
  const limpio = (h: string) => `${fecha.replace(/-/g, '')}T${h.replace(':', '')}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Visita técnica FIXDAY',
    dates: `${limpio(ini)}/${limpio(fin)}`,
    details: 'Visita técnica a domicilio de FIXDAY. Cualquier cambio, escríbenos al WhatsApp +56 9 3664 9332.',
    location: [direccion, comuna, 'Región Metropolitana'].filter(Boolean).join(', '),
    ctz: TZ,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

/** Correo de confirmación. Lo usan tanto la agenda web como las citas internas. */
async function enviarConfirmacion(reserva: Reserva): Promise<boolean> {
  if (!reserva.email) return false

  const cuando = `${formatoLargo(reserva.fecha)}, entre ${reserva.bloque.replace('-', ' y ')}`
  const filas: Array<[string, string]> = [
    ['Cuándo', cuando],
    ['Dónde', [reserva.direccion, reserva.comuna].filter(Boolean).join(', ') || 'La coordinamos contigo'],
    ['Servicio', reserva.servicio || 'Diagnóstico general'],
  ]
  // Si se acordó un monto, ese manda; si no, se informa el valor de la visita
  filas.push(reserva.valor
    ? ['Valor acordado', reserva.valor]
    : ['Valor visita', '$25.000 (se descuenta si haces la reparación)'])

  const r = await enviarCorreo({
    to: reserva.email, esCliente: true, replyTo: correoAdmin(),
    subject: `✅ Visita confirmada · ${formatoLargo(reserva.fecha)}`,
    html: plantilla({
      titulo: '¡Tu visita está confirmada!',
      intro: `Listo, ${String(reserva.name).split(' ')[0]}. Un técnico de FIXDAY llegará a tu domicilio en el horario acordado.`,
      filas,
      cta: { texto: 'Ver mi cita y agregarla al calendario', url: `https://fixday.cl/cita/${reserva.id}` },
      nota: 'Te avisaremos por WhatsApp cuando el técnico vaya en camino. Si necesitas cambiar o cancelar la hora, escríbenos al +56 9 3664 9332 con anticipación.',
    }),
  })
  return r.enviado
}

export async function GET() {
  const db = getSupabase()
  if (!db) {
    return NextResponse.json(
      { error: 'Supabase no configurado. Ejecuta supabase-maipu.sql y revisa las variables en Vercel.' },
      { status: 503 }
    )
  }

  const { fecha: hoy } = ahoraEnChile()

  let reservas
  let modo
  try {
    const r = await listarReservas(db)
    reservas = r.reservas
    modo = r.modo
  } catch (err) {
    console.error('[agenda admin] No se pudieron leer las reservas:', err)
    return NextResponse.json({ error: 'No se pudo leer la agenda.' }, { status: 500 })
  }

  const cfgRes = await db.from('settings').select('value').eq('key', 'agenda_config').single()

  let config: AgendaConfig = AGENDA_DEFAULT
  try {
    const p = JSON.parse(cfgRes.data?.value ?? '')
    if (p && typeof p === 'object') config = { ...AGENDA_DEFAULT, ...p }
  } catch { /* usa los valores por defecto */ }

  return NextResponse.json(
    { reservas, config, hoy, modo, dominioVerificado: dominioVerificado() },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

/** Confirma, cancela o marca como realizada una hora. Al confirmar avisa al cliente. */
export async function PATCH(req: NextRequest) {
  const { id, status, admin_note } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'Falta el id' }, { status: 400 })

  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })

  const reserva = await obtenerReserva(db, id)
  if (!reserva) return NextResponse.json({ error: 'No se encontró la hora' }, { status: 404 })

  const patch: Record<string, unknown> = {}
  if (status) {
    patch.status = status
    if (status === 'confirmada') patch.confirmed_at = new Date().toISOString()
  }
  if (admin_note !== undefined) patch.admin_note = admin_note

  try {
    await actualizarReserva(db, id, patch)
  } catch (err) {
    console.error('[agenda admin] No se pudo actualizar:', err)
    return NextResponse.json({ error: 'No se pudo actualizar la hora.' }, { status: 500 })
  }

  let correoCliente = false

  if (status === 'confirmada' && reserva.email) {
    correoCliente = await enviarConfirmacion({ ...reserva, ...patch } as Reserva)
  }

  if (status === 'cancelada' && reserva.email) {
    const r = await enviarCorreo({
      to: reserva.email, esCliente: true, replyTo: correoAdmin(),
      subject: 'Sobre tu solicitud de visita · FIXDAY',
      html: plantilla({
        titulo: 'No pudimos tomar esa hora',
        intro: `Hola ${String(reserva.name).split(' ')[0]}: lamentablemente no tenemos disponibilidad para el horario que solicitaste.`,
        filas: [['Horario solicitado', `${formatoLargo(reserva.fecha)}, ${reserva.bloque}`], ['Comuna', reserva.comuna ?? '—']],
        cta: { texto: 'Elegir otro horario', url: 'https://fixday.cl/agendar' },
        nota: 'Puedes elegir otro día en la web o escribirnos directo al WhatsApp +56 9 3664 9332 y lo coordinamos contigo.',
      }),
    })
    correoCliente = r.enviado
  }

  return NextResponse.json({ ok: true, correoCliente })
}

/** Borra una hora definitivamente (por ejemplo, una de prueba). */
export async function DELETE(req: NextRequest) {
  const { id } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'Falta el id' }, { status: 400 })

  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })

  try {
    await eliminarReserva(db, id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[agenda admin] No se pudo eliminar:', err)
    return NextResponse.json({ error: 'No se pudo eliminar la hora.' }, { status: 500 })
  }
}

/**
 * Crea una cita agendada por el administrador (cliente que cerró por WhatsApp).
 * Nace confirmada, porque el trato ya está hecho, y avisa al cliente si dejó correo.
 */
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}))

  const name      = String(b.name || '').trim().slice(0, 80)
  const phone     = String(b.phone || '').trim().slice(0, 30)
  const email     = String(b.email || '').trim().toLowerCase().slice(0, 120)
  const fecha     = String(b.fecha || '').trim()
  const bloque    = String(b.bloque || '').trim().slice(0, 20)
  const comuna    = String(b.comuna || '').trim().slice(0, 60)
  const direccion = String(b.direccion || '').trim().slice(0, 200)
  const servicio  = String(b.servicio || '').trim().slice(0, 80)
  const mensaje   = String(b.mensaje || '').trim().slice(0, 500)
  const valor     = String(b.valor || '').trim().slice(0, 40)

  if (name.length < 2) return NextResponse.json({ error: 'Falta el nombre del cliente.' }, { status: 400 })
  if (phone.replace(/\D/g, '').length < 8) return NextResponse.json({ error: 'Falta un teléfono válido.' }, { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return NextResponse.json({ error: 'Falta la fecha.' }, { status: 400 })
  if (!/^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/.test(bloque)) {
    return NextResponse.json({ error: 'El horario debe ser tipo 09:00-11:00.' }, { status: 400 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'El correo no es válido.' }, { status: 400 })
  }

  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })

  const bloqueLimpio = bloque.replace(/\s/g, '')
  const ahora = new Date().toISOString()

  // Aviso (no bloqueo): el administrador manda, pero conviene saber si se topa
  let aviso: string | null = null
  try {
    const ocupados = await contarEnBloque(db, fecha, bloqueLimpio)
    if (ocupados > 0) aviso = `Ya había ${ocupados} visita(s) en ese horario.`
  } catch { /* si no se puede contar, se crea igual */ }

  let id: string
  try {
    const r = await crearReserva(db, {
      fecha, bloque: bloqueLimpio, name, phone, email: email || null,
      comuna, direccion, servicio, mensaje,
      status: 'confirmada',
      confirmed_at: ahora,
      valor: valor || undefined,
      origen: 'interna',
      source: 'admin',
    })
    id = r.id
  } catch (err) {
    console.error('[agenda admin] No se pudo crear la cita:', err)
    return NextResponse.json({ error: 'No se pudo crear la cita.' }, { status: 500 })
  }

  const reserva: Reserva = {
    id, created_at: ahora, fecha, bloque: bloqueLimpio, name, phone,
    email: email || null, comuna, direccion, servicio, mensaje,
    status: 'confirmada', confirmed_at: ahora, valor: valor || undefined, origen: 'interna',
  }

  const correoCliente = await enviarConfirmacion(reserva)

  // Mensaje listo para pegar en WhatsApp, con el enlace a su comprobante
  const url = `https://fixday.cl/cita/${id}`
  const texto =
    `¡Hola ${name.split(' ')[0]}! 👋 Te confirmo tu visita técnica de FIXDAY:\n\n` +
    `📅 ${formatoLargo(fecha)}\n` +
    `🕐 Entre ${bloqueLimpio.replace('-', ' y ')}\n` +
    (direccion || comuna ? `📍 ${[direccion, comuna].filter(Boolean).join(', ')}\n` : '') +
    (servicio ? `🔧 ${servicio}\n` : '') +
    (valor ? `💵 Valor acordado: ${valor}\n` : '') +
    `\nAcá puedes ver tu cita y agregarla a tu calendario:\n${url}\n\n` +
    `Cualquier cambio me avisas por acá. ¡Nos vemos!`

  const soloDigitos = phone.replace(/\D/g, '').replace(/^0+/, '')
  const numero = soloDigitos.startsWith('56') ? soloDigitos : `56${soloDigitos}`

  return NextResponse.json({
    ok: true, id, url, aviso, correoCliente,
    whatsapp: `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
    texto,
  })
}
