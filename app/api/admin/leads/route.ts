import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const db = getSupabase()
  if (!db) {
    return NextResponse.json(
      { error: 'Supabase no configurado. Agrega NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local' },
      { status: 503 }
    )
  }

  const { data, error } = await db
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ leads: data }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
