import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { leerEmbudo, leadsDeComuna } from '@/lib/store'

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

  let totales: Record<string, number> = {}
  let origenes: Record<string, number> = {}
  let leads: unknown[] = []
  let modo: string = 'tabla'

  try {
    const e = await leerEmbudo(db, comuna, desde)
    totales = e.embudo; origenes = e.origenes; modo = e.modo
  } catch (err) {
    console.error('[admin zona] No se pudo leer el embudo:', err)
  }

  try {
    const l = await leadsDeComuna(db, comuna)
    leads = l.leads
  } catch (err) {
    console.error('[admin zona] No se pudieron leer los leads:', err)
  }

  const embudo = {
    wa_click: totales.wa_click ?? 0,
    form_open: totales.form_open ?? 0,
    form_skip: totales.form_skip ?? 0,
    lead: totales.lead ?? 0,
    cupon_copiado: totales.cupon_copiado ?? 0,
    movil: totales.movil ?? 0,
    escritorio: totales.escritorio ?? 0,
  }

  return NextResponse.json(
    { embudo, origenes, leads, modo },
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
  if (error) {
    const faltaColumna = ['42703', 'PGRST204'].includes(error.code ?? '')
    return NextResponse.json({
      error: faltaColumna
        ? 'Para guardar el estado de seguimiento hay que ejecutar supabase-maipu.sql en Supabase.'
        : error.message,
    }, { status: faltaColumna ? 503 : 500 })
  }
  return NextResponse.json({ ok: true })
}
