import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Suma un clic al abrir un link de referido (llamado desde /r/[code]).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const code = (body.code || '').trim().toUpperCase()
  if (!code) return NextResponse.json({ ok: false }, { status: 400 })

  const db = getSupabase()
  if (!db) return NextResponse.json({ ok: false })

  const { data } = await db.from('referrals').select('clicks').eq('code', code).maybeSingle()
  if (data) {
    await db.from('referrals').update({ clicks: (data.clicks ?? 0) + 1 }).eq('code', code)
  }
  return NextResponse.json({ ok: true })
}
