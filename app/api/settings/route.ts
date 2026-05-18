import { NextRequest } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key) return Response.json({ error: 'Missing key' }, { status: 400 })

  const sb = getSupabase()
  if (!sb) return Response.json({ key, value: 'true' })

  try {
    const { data } = await sb.from('settings').select('value').eq('key', key).single()
    return Response.json({ key, value: data?.value ?? 'true' })
  } catch {
    return Response.json({ key, value: 'true' })
  }
}
