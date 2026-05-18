import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
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
