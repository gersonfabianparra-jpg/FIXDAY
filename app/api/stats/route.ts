import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ count: 0 })
  const { count } = await sb
    .from('reports')
    .select('*', { count: 'exact', head: true })
  return NextResponse.json({ count: count ?? 0 })
}
