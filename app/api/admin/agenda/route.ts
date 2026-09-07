import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { enviarCorreo, plantilla, dominioVerificado } from '@/lib/email'
import { AGENDA_DEFAULT, AgendaConfig, ahoraEnChile, formatoLargo, TZ } from '@/lib/agenda'

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

export async function GET() {
  const db = getSupabase()
  if (!db) {
    return NextResponse.json(
      { error: 'Supabase no configurado. Ejecuta supabase-maipu.sql y revisa las variables en Vercel.' },
      { status: 503 }
    )
  }

  const { fecha: hoy } = ahoraEnChile()

  const [reservasRes, cfgRes] = await Promise.all([
    db.from('bookings').select('*').order('fecha', { ascending: true }).order('bloque', { ascending: true }).limit(400),
    db.from('settings').select('value').eq('key', 'agenda_config').single(),
  ])

  if (reservasRes.error && reservasRes.error.code === '42P01') {
    return NextResponse.json(
      { error: 'Falta crear la tabla de agenda. Ejecuta supabase-maipu.sql en Supabase → SQL Editor.' },
      { status: 503 }
    )
  }

  let config: AgendaConfig = AGENDA_DEFAULT
  try {
    const p = JSON.parse(cfgRes.data?.value ?? '')
    if (p && typeof p === 'object') config = { ...AGENDA_DEFAULT, ...p }
  } catch { /* usa los valores por defecto */ }

  return NextResponse.json(
    { reservas: reservasRes.data ?? [], config, hoy, dominioVerificado: dominioVerificado() },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

/** Confirma, cancela o marca como realizada una hora. Al confirmar avisa al cliente. */
export async function PATCH(req: NextRequest) {
  const { id, status, admin_note } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'Falta el id' }, { status: 400 })

  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })

  const { data: reserva, error: errLectura } = await db.from('bookings').select('*').eq('id', id).single()
  if (errLectura || !reserva) return NextResponse.json({ error: 'No se encontró la hora' }, { status: 404 })

  const patch: Record<string, unknown> = {}
  if (status) {
    patch.status = status
    if (status === 'confirmada') patch.confirmed_at = new Date().toISOString()
  }
  if (admin_note !== undefined) patch.admin_note = admin_note

  const { error } = await db.from('bookings').update(patch).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  let correoCliente = false

  if (status === 'confirmada' && reserva.email) {
    const cuando = `${formatoLargo(reserva.fecha)}, entre ${reserva.bloque.replace('-', ' y ')}`
    const r = await enviarCorreo({
      to: reserva.email, esCliente: true,
      subject: `✅ Visita confirmada · ${formatoLargo(reserva.fecha)}`,
      html: plantilla({
        titulo: '¡Tu visita está confirmada!',
        intro: `Listo, ${String(reserva.name).split(' ')[0]}. Un técnico de FIXDAY llegará a tu domicilio en el horario acordado.`,
        filas: [
          ['Cuándo', cuando],
          ['Dónde', [reserva.direccion, reserva.comuna].filter(Boolean).join(', ') || reserva.comuna],
          ['Servicio', reserva.servicio || 'Diagnóstico general'],
          ['Valor visita', '$25.000 (se descuenta si haces la reparación)'],
        ],
        cta: { texto: 'Agregar a mi calendario', url: linkGoogleCalendar(reserva.fecha, reserva.bloque, reserva.comuna ?? '', reserva.direccion ?? '') },
        nota: 'Te avisaremos por WhatsApp cuando el técnico vaya en camino. Si necesitas cambiar o cancelar la hora, escríbenos al +56 9 3664 9332 con anticipación.',
      }),
    })
    correoCliente = r.enviado
  }

  if (status === 'cancelada' && reserva.email) {
    const r = await enviarCorreo({
      to: reserva.email, esCliente: true,
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
