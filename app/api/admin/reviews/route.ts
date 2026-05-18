import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  const { data, error } = await sb
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ reviews: data })
}

export async function PATCH(req: NextRequest) {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  try {
    const { id, status } = await req.json()
    if (!id || !['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }
    const update: Record<string, unknown> = { status }
    update.approved_at = status === 'approved' ? new Date().toISOString() : null
    const { error } = await sb.from('reviews').update(update).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
