import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'
import { rateLimit, getIP } from '@/lib/rateLimit'
import { sendLeadEvent } from '@/lib/meta-capi'

/**
 * Captura el contacto ANTES de que la persona se vaya a WhatsApp.
 * Sin esto, cada clic en WhatsApp se pierde sin dejar datos para remarketing.
 */

interface Payload {
  name?: string
  problema?: string
  phone?: string
  comuna?: string
  source?: string
  device?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const rl = rateLimit(`zonalead:${ip}`, { max: 12, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) {
    return NextResponse.json({ error: 'Demasiados envíos. Intenta más tarde.' }, { status: 429 })
  }

  const body: Payload = await req.json().catch(() => ({}))
  const name     = (body.name || '').trim().slice(0, 80)
  const problema = (body.problema || '').trim().slice(0, 500)
  const phone    = (body.phone || '').trim().slice(0, 30)
  const comuna   = (body.comuna || '').trim().slice(0, 60) || 'Región Metropolitana'

  if (name.length < 2) {
    return NextResponse.json({ error: 'Escribe tu nombre.' }, { status: 400 })
  }

  const db = getSupabase()
  if (db) {
    const { error } = await db.from('leads').insert({
      name,
      phone: phone || '—',
      service: `🏠 Visita a domicilio · ${comuna}`,
      message: problema || 'No especificó el problema.',
      comuna,
      source: (body.source || '').slice(0, 120) || `/zonas`,
      device: (body.device || '').slice(0, 20),
      referrer: (body.referrer || '').slice(0, 300),
      utm_source: (body.utm_source || '').slice(0, 80) || null,
      utm_medium: (body.utm_medium || '').slice(0, 80) || null,
      utm_campaign: (body.utm_campaign || '').slice(0, 120) || null,
      status: 'nuevo',
    })
    if (error) console.error('Supabase insert error (zona-lead):', error)

    await db.from('zone_events').insert({
      comuna,
      event: 'lead',
      section: (body.source || '').slice(0, 120),
      device: (body.device || '').slice(0, 20),
      utm_source: (body.utm_source || '').slice(0, 80) || null,
      utm_campaign: (body.utm_campaign || '').slice(0, 120) || null,
    }).then(({ error: e }) => { if (e) console.error('zone_events (lead):', e) })
  }

  // Evento de conversión a Meta (para públicos de remarketing y campañas)
  if (phone) {
    await sendLeadEvent({
      name,
      phone,
      service: `Visita a domicilio ${comuna}`,
      sourceUrl: body.source,
      clientIp: ip,
      clientUserAgent: req.headers.get('user-agent') ?? undefined,
    }).catch(err => console.error('Meta CAPI error (zona-lead):', err))
  }

  // Aviso inmediato para que puedas responder antes que la competencia
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.EMAIL_TO ?? 'fabiansitolaral@gmail.com'
    await resend.emails.send({
      from: 'FIXDAY Web <onboarding@resend.dev>',
      to,
      subject: `🔥 Contacto desde ${comuna} – ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0A0A0A;color:#F5F5F7;padding:32px;border-radius:16px;">
        <h2 style="color:#2997FF;margin:0 0 6px;font-size:18px;">Nuevo contacto desde la página de ${comuna}</h2>
        <p style="font-size:12px;color:#636366;margin:0 0 18px;">Esta persona iba camino a WhatsApp. Ya tienes sus datos.</p>
        <p style="font-size:15px;margin:0 0 8px;">Nombre: <strong style="color:#F5F5F7;">${name}</strong></p>
        <p style="font-size:15px;margin:0 0 8px;">Teléfono: <strong style="color:#F5F5F7;">${phone || 'no lo dejó'}</strong></p>
        <p style="font-size:15px;margin:0 0 8px;">Problema: <strong style="color:#F5F5F7;">${problema || '—'}</strong></p>
        <p style="margin-top:20px;font-size:11px;color:#3A3A3C;">Origen: ${body.source ?? '—'} · ${body.utm_source ?? 'directo'}</p>
      </div>`,
    }).catch(err => console.error('Resend error (zona-lead):', err))
  }

  return NextResponse.json({ success: true })
}
