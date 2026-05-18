import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ reviews: [] })
  const { data } = await sb
    .from('reviews')
    .select('id, client_name, client_location, rating, review_text, service, approved_at')
    .eq('status', 'approved')
    .order('approved_at', { ascending: false })
    .limit(6)
  return NextResponse.json({ reviews: data ?? [] })
}

export async function POST(req: NextRequest) {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  try {
    const { client_name, client_location, rating, review_text, service } = await req.json()
    if (!client_name?.trim() || !rating || !review_text?.trim()) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating inválido' }, { status: 400 })
    }
    const { error } = await sb.from('reviews').insert([{
      client_name: client_name.trim(),
      client_location: client_location?.trim() || null,
      rating,
      review_text: review_text.trim(),
      service: service || null,
      status: 'pending',
    }])
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
