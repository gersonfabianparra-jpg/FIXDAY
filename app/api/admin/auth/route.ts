import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIP } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  // Máx 5 intentos fallidos → bloqueado 15 min
  const ip = getIP(req)
  const rl = rateLimit(`auth:${ip}`, { max: 5, windowMs: 15 * 60 * 1000, blockMs: 15 * 60 * 1000 })
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Demasiados intentos. Intenta en ${Math.ceil((rl.retryAfter ?? 900) / 60)} minutos.` },
      { status: 429 }
    )
  }

  const { user, pass } = await req.json()

  const validUser = process.env.ADMIN_USER
  const validPass = process.env.ADMIN_PASS
  const secret    = process.env.ADMIN_SECRET

  if (!validUser || !validPass || !secret) {
    return NextResponse.json({ error: 'Servidor no configurado.' }, { status: 503 })
  }

  if (user !== validUser || pass !== validPass) {
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin-token', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin-token')
  return res
}
