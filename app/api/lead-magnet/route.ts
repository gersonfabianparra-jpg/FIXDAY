import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'
import { rateLimit, getIP } from '@/lib/rateLimit'

const DOWNLOAD_PATH = '/guia-fixday-senales-pc.pdf'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Payload {
  email: string
  comuna?: string
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const rl = rateLimit(`leadmagnet:${ip}`, { max: 8, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) {
    return NextResponse.json({ error: 'Demasiados envíos. Intenta más tarde.' }, { status: 429 })
  }

  const body: Payload = await req.json().catch(() => ({ email: '' }))
  const email = (body.email || '').trim().toLowerCase()
  const comuna = (body.comuna || '').trim() || 'Región Metropolitana'

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Ingresa un correo válido.' }, { status: 400 })
  }

  // Guardar como lead (tabla compartida; el origen queda marcado en "service")
  const db = getSupabase()
  if (db) {
    const { error } = await db.from('leads').insert({
      name: 'Descarga guía',
      phone: '—',
      email,
      service: `📥 Guía PC · ${comuna}`,
      message: 'Lead magnet: guía "10 señales de que tu PC necesita mantención"',
    })
    if (error) console.error('Supabase insert error (lead-magnet):', error)
  }

  // Notificar a FIXDAY (Resend sandbox solo entrega al dueño; el visitante descarga en pantalla)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.EMAIL_TO ?? 'fabiansitolaral@gmail.com'
    await resend.emails.send({
      from: 'FIXDAY Web <onboarding@resend.dev>',
      to,
      subject: `📥 Nueva descarga de guía – ${comuna}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0A0A0A;color:#F5F5F7;padding:32px;border-radius:16px;">
        <h2 style="color:#2997FF;margin:0 0 16px;font-size:18px;">Nuevo correo captado (lead magnet)</h2>
        <p style="font-size:14px;color:#AEAEB2;margin:0 0 8px;">Alguien descargó la guía desde <strong style="color:#F5F5F7;">${comuna}</strong>.</p>
        <p style="font-size:15px;margin:0;">Correo: <strong style="color:#F5F5F7;">${email}</strong></p>
        <p style="margin-top:20px;font-size:11px;color:#3A3A3C;">Puedes usarlo para remarketing. Generado automáticamente desde fixday.cl</p>
      </div>`,
    }).catch(err => console.error('Resend error (lead-magnet):', err))
  }

  return NextResponse.json({ success: true, download: DOWNLOAD_PATH })
}
