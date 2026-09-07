import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { rateLimit, getIP } from '@/lib/rateLimit'

/**
 * Eventos anónimos del embudo de una zona (sin datos personales).
 * Permite saber cuánta gente mira, cuánta hace clic y cuánta deja sus datos.
 */

const ALLOWED = new Set(['wa_click', 'form_open', 'form_skip', 'cupon_copiado', 'cupos_visto'])

export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const rl = rateLimit(`zonaevt:${ip}`, { max: 120, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) return NextResponse.json({ ok: false }, { status: 429 })

  const body = await req.json().catch(() => ({}))
  const event = String(body.event || '')
  if (!ALLOWED.has(event)) return NextResponse.json({ ok: false }, { status: 400 })

  const db = getSupabase()
  if (db) {
    const { error } = await db.from('zone_events').insert({
      comuna: String(body.comuna || 'Región Metropolitana').slice(0, 60),
      event,
      section: String(body.section || '').slice(0, 120),
      device: String(body.device || '').slice(0, 20),
      referrer: String(body.referrer || '').slice(0, 300),
      utm_source: String(body.utm_source || '').slice(0, 80) || null,
      utm_campaign: String(body.utm_campaign || '').slice(0, 120) || null,
    })
    if (error) console.error('Supabase insert error (zona-event):', error)
  }

  return NextResponse.json({ ok: true })
}
