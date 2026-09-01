import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { rateLimit, getIP } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

const EXPIRES_DAYS = 30
// Alfabeto sin caracteres ambiguos (0/O, 1/I) para que sea fácil de leer/dictar
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function makeCode(len = 6): string {
  let out = ''
  for (let i = 0; i < len; i++) out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  return out
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const rl = rateLimit(`referral:${ip}`, { max: 10, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) return NextResponse.json({ error: 'Demasiados intentos. Prueba más tarde.' }, { status: 429 })

  const body = await req.json().catch(() => ({}))
  const name = (body.name || '').trim()
  const phone = (body.phone || '').trim()

  if (!name || name.length < 2) return NextResponse.json({ error: 'Escribe tu nombre.' }, { status: 400 })
  if (!phone || phone.replace(/\D/g, '').length < 8) return NextResponse.json({ error: 'Escribe un teléfono válido para poder pagarte tu beneficio.' }, { status: 400 })

  const db = getSupabase()
  if (!db) return NextResponse.json({ error: 'Servicio no disponible por ahora.' }, { status: 503 })

  const expiresAt = new Date(Date.now() + EXPIRES_DAYS * 24 * 60 * 60 * 1000)

  // Inserta reintentando si el código colisiona (unique)
  let code = ''
  for (let attempt = 0; attempt < 6; attempt++) {
    code = makeCode()
    const { error } = await db.from('referrals').insert({
      code,
      ref_name: name,
      ref_phone: phone,
      expires_at: expiresAt.toISOString(),
    })
    if (!error) {
      return NextResponse.json({
        code,
        link: `https://fixday.cl/r/${code}`,
        expiresAt: expiresAt.toISOString(),
        expiresDays: EXPIRES_DAYS,
      })
    }
    // 23505 = unique_violation → reintenta con otro código
    if (error.code !== '23505') {
      console.error('referrals insert error:', error)
      return NextResponse.json({ error: 'No se pudo generar tu código. Intenta de nuevo.' }, { status: 500 })
    }
  }
  return NextResponse.json({ error: 'No se pudo generar un código único. Intenta de nuevo.' }, { status: 500 })
}
