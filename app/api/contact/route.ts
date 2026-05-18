import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getSupabase } from '@/lib/supabase'

interface ContactPayload {
  name: string
  phone: string
  email?: string
  service: string
  message?: string
}

export async function POST(req: NextRequest) {
  const body: ContactPayload = await req.json()
  const { name, phone, email, service, message } = body

  if (!name?.trim() || !phone?.trim() || !service?.trim()) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
  }

  // Save to Supabase
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

  // Send email notification if credentials are configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      })

      await transporter.sendMail({
        from: `"FIXDAY Web" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
        subject: `🔧 Nuevo contacto FIXDAY – ${service}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#030A1A;color:#C8D8F4;padding:32px;border-radius:12px;">
            <h2 style="color:#00D4FF;margin-bottom:24px;">Nuevo contacto desde la web</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);color:#6A7FA8;width:140px;">Nombre</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);font-weight:600;color:#fff;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);color:#6A7FA8;">Teléfono</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);font-weight:600;color:#fff;">${phone}</td></tr>
              ${email ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);color:#6A7FA8;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);color:#fff;">${email}</td></tr>` : ''}
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);color:#6A7FA8;">Servicio</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,212,255,0.15);font-weight:600;color:#00D4FF;">${service}</td></tr>
              ${message ? `<tr><td style="padding:10px 0;color:#6A7FA8;vertical-align:top;">Descripción</td><td style="padding:10px 0;color:#C8D8F4;">${message}</td></tr>` : ''}
            </table>
            <div style="margin-top:28px;">
              <a href="https://wa.me/56936649332?text=${encodeURIComponent(`Hola ${name}! Vi tu solicitud de ${service}. `)}" style="display:inline-block;background:linear-gradient(135deg,#1560FF,#00D4FF);color:white;padding:12px 24px;border-radius:50px;font-weight:600;text-decoration:none;">Responder por WhatsApp</a>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('Error enviando email:', err)
    }
  }

  const waText = encodeURIComponent(
    `Hola FIXDAY! 👋\nMe llamo *${name}*\n📱 Tel: ${phone}\n🔧 Servicio: ${service}${message ? `\n📝 Problema: ${message}` : ''}`
  )

  return NextResponse.json({
    success: true,
    waUrl: `https://wa.me/56936649332?text=${waText}`,
  })
}
