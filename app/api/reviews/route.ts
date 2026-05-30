import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ reviews: [] })

  // Read configurable limit from settings
  const settingResult = await sb.from('settings').select('value').eq('key', 'review_public_limit').single()
  const setting = settingResult.data
  const limit = parseInt(setting?.value ?? '6', 10) || 6

  const { data } = await sb
    .from('reviews')
    .select('id, client_name, client_location, rating, review_text, service, approved_at')
    .eq('status', 'approved')
    .order('approved_at', { ascending: false })
    .limit(limit)
  return NextResponse.json({ reviews: data ?? [] })
}

export async function POST(req: NextRequest) {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  try {
    const { client_name, client_location, rating, review_text, service } = await req.json()
    if (!client_name?.trim() || !rating || !review_text?.trim()) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating inválido' }, { status: 400 })
    }
    const { error } = await sb.from('reviews').insert([{
      client_name: client_name.trim(),
      client_location: client_location?.trim() || null,
      rating,
      review_text: review_text.trim(),
      service: service || null,
      status: 'pending',
    }])
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Email notification
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const to = process.env.EMAIL_TO ?? 'fabiansitolaral@gmail.com'
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
      await resend.emails.send({
        from: 'FIXDAY Web <onboarding@resend.dev>',
        to,
        subject: `⭐ Nueva reseña de ${client_name.trim()} (${stars})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#F5F5F7;padding:36px;border-radius:16px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px;">
              <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#0071E3,#2997FF);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;color:#fff;">F</div>
              <span style="font-weight:800;font-size:20px;letter-spacing:-.02em;">FIXDAY</span>
            </div>
            <h2 style="color:#FF9F0A;margin:0 0 20px;font-size:18px;">⭐ Nueva reseña pendiente de aprobación</h2>
            <div style="background:#161616;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,.08);">
              <div style="font-size:24px;color:#FF9F0A;margin-bottom:12px;">${stars}</div>
              <div style="font-size:16px;color:#F5F5F7;font-weight:700;margin-bottom:4px;">${client_name.trim()}</div>
              ${client_location ? `<div style="font-size:13px;color:#636366;margin-bottom:12px;">${client_location}</div>` : ''}
              ${service ? `<div style="font-size:12px;color:#2997FF;margin-bottom:12px;">${service}</div>` : ''}
              <div style="font-size:14px;color:#AEAEB2;line-height:1.7;font-style:italic;">"${review_text.trim()}"</div>
            </div>
            <a href="https://fixday.cl/admin/reviews" style="display:inline-block;background:#2997FF;color:#fff;border-radius:10px;padding:12px 24px;font-size:14px;font-weight:700;text-decoration:none;">Aprobar o rechazar en el panel →</a>
            <p style="margin-top:24px;font-size:11px;color:#3A3A3C;">Este mensaje fue generado automáticamente desde fixday.cl</p>
          </div>
        `,
      }).catch(err => console.error('Resend review error:', err))
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
