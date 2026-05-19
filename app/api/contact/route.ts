import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'
import { rateLimit, getIP } from '@/lib/rateLimit'

interface ContactPayload {
  name: string
  phone: string
  email?: string
  service: string
  message?: string
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const rl = rateLimit(`contact:${ip}`, { max: 5, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) {
    return NextResponse.json({ error: 'Demasiados envíos. Intenta más tarde.' }, { status: 429 })
  }

  const body: ContactPayload = await req.json()
  const { name, phone, email, service, message } = body

  if (!name?.trim() || !phone?.trim() || !service?.trim()) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
  }

  // Guardar en Supabase
  const db = getSupabase()
  if (db) {
    const { error } = await db.from('leads').insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      service: service.trim(),
      message: message?.trim() || null,
    })
    if (error) console.error('Supabase insert error:', error)
  }

  // Enviar email de notificación con Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.EMAIL_TO ?? 'fabiansitolaral@gmail.com'

    await resend.emails.send({
      from: 'FIXDAY Web <onboarding@resend.dev>',
      to,
      subject: `🔧 Nueva solicitud – ${service}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#F5F5F7;padding:36px;border-radius:16px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px;">
            <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#0071E3,#2997FF);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;color:#fff;">F</div>
            <span style="font-weight:800;font-size:20px;letter-spacing:-.02em;">FIXDAY</span>
          </div>
          <h2 style="color:#2997FF;margin:0 0 24px;font-size:18px;">Nueva solicitud desde la web</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#636366;width:130px;font-size:14px;">Nombre</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);font-weight:700;font-size:14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#636366;font-size:14px;">Teléfono</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);font-weight:700;font-size:14px;">${phone}</td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#636366;font-size:14px;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:14px;">${email}</td>
            </tr>` : ''}
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#636366;font-size:14px;">Servicio</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);font-weight:700;color:#2997FF;font-size:14px;">${service}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding:12px 0;color:#636366;vertical-align:top;font-size:14px;">Descripción</td>
              <td style="padding:12px 0;font-size:14px;color:#AEAEB2;">${message}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top:28px;padding:16px;background:#161616;border-radius:10px;border:1px solid rgba(255,255,255,.07);">
            <p style="margin:0;font-size:13px;color:#636366;">Para responder, llama o escribe al número: <strong style="color:#F5F5F7;">${phone}</strong></p>
          </div>
          <p style="margin-top:24px;font-size:11px;color:#3A3A3C;">Este mensaje fue generado automáticamente desde fixday.cl</p>
        </div>
      `,
    }).catch(err => console.error('Resend error:', err))
  }

  return NextResponse.json({ success: true })
}
