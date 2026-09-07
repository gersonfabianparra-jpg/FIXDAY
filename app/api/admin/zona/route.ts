import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

/**
 * Datos del panel de una zona: embudo de los últimos 30 días y sus leads.
 * Protegido por el middleware de /api/admin.
 */

export async function GET(req: NextRequest) {
  const comuna = req.nextUrl.searchParams.get('comuna') || 'Maipú'
  const db = getSupabase()
  if (!db) {
    return NextResponse.json(
      { error: 'Supabase no configurado. Revisa las variables de entorno en Vercel.' },
      { status: 503 }
    )
  }

  const desde = new Date(Date.now() - 30 * 86400000).toISOString()

  const [eventsRes, leadsRes] = await Promise.all([
    db.from('zone_events').select('event, created_at, device, utm_source').eq('comuna', comuna).gte('created_at', desde),
    db.from('leads').select('*').eq('comuna', comuna).order('created_at', { ascending: false }).limit(300),
  ])

  if (eventsRes.error && eventsRes.error.code === '42P01') {
    return NextResponse.json(
      { error: 'Falta crear las tablas. Ejecuta supabase-maipu.sql en Supabase → SQL Editor.' },
      { status: 503 }
    )
  }

  const events = eventsRes.data ?? []
  const embudo = {
    wa_click: events.filter(e => e.event === 'wa_click').length,
    form_open: events.filter(e => e.event === 'form_open').length,
    form_skip: events.filter(e => e.event === 'form_skip').length,
    lead: events.filter(e => e.event === 'lead').length,
    cupon_copiado: events.filter(e => e.event === 'cupon_copiado').length,
    movil: events.filter(e => e.device === 'movil').length,
    escritorio: events.filter(e => e.device === 'escritorio').length,
  }

  // De dónde llega la gente (para saber qué canal invertir)
  const origenes: Record<string, number> = {}
  for (const e of events) {
    const k = e.utm_source || 'directo / orgánico'
    origenes[k] = (origenes[k] ?? 0) + 1
  }

  return NextResponse.json(
    { embudo, origenes, leads: leadsRes.data ?? [], leadsError: leadsRes.error?.message ?? null },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

/** Cambia el estado de seguimiento de un lead (nuevo → contactado → agendado…). */
export async function PATCH(req: NextRequest) {
  const { id, status, admin_note } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'Falta el id' }, { status: 400 })

  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })

  const patch: Record<string, unknown> = {}
  if (status) {
    patch.status = status
    if (status === 'contactado') patch.contacted_at = new Date().toISOString()
  }
  if (admin_note !== undefined) patch.admin_note = admin_note

  const { error } = await db.from('leads').update(patch).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
