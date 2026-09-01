import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 503 })
  const { data, error } = await db.from('referrals').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ referrals: data }, { headers: { 'Cache-Control': 'no-store' } })
}

// Marcar como pagado / no pagado
export async function PATCH(req: NextRequest) {
  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 503 })
  const body = await req.json().catch(() => ({}))
  const { id, redeemed } = body
  if (!id) return NextResponse.json({ error: 'Falta id.' }, { status: 400 })
  const { error } = await db.from('referrals')
    .update({ redeemed: !!redeemed, redeemed_at: redeemed ? new Date().toISOString() : null })
    .eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
