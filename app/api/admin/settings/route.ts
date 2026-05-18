import { NextRequest } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key) return Response.json({ error: 'Missing key' }, { status: 400 })

  const sb = getSupabase()
  if (!sb) return Response.json({ value: 'true' })

  try {
    const { data } = await sb.from('settings').select('value').eq('key', key).single()
    return Response.json({ value: data?.value ?? 'true' })
  } catch {
    return Response.json({ value: 'true' })
  }
}

export async function PATCH(req: NextRequest) {
  const { key, value } = await req.json()
  if (!key || value === undefined) return Response.json({ error: 'Invalid body' }, { status: 400 })

  const sb = getSupabase()
  if (!sb) return Response.json({ error: 'DB error' }, { status: 500 })

  await sb.from('settings').upsert({ key, value: String(value) }, { onConflict: 'key' })
  return Response.json({ ok: true })
}
