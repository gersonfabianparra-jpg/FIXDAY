import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  const { data, error } = await sb.from('reports').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ reports: data })
}

export async function POST(req: NextRequest) {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  try {
    const body = await req.json()
    const { data, error } = await sb.from('reports').insert([body]).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ report: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
