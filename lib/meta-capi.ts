import { createHash } from 'crypto'

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN

function hash(value: string): string {
  return createHash('sha256').update(value.toLowerCase().trim()).digest('hex')
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('56')) return `+${digits}`
  if (digits.startsWith('9') && digits.length === 9) return `+56${digits}`
  return `+56${digits}`
}

export interface CAPILeadPayload {
  name: string
  phone: string
  email?: string
  service: string
  sourceUrl?: string
  clientIp?: string
  clientUserAgent?: string
  eventId?: string
}

export async function sendLeadEvent(payload: CAPILeadPayload): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return

  const nameParts = payload.name.trim().split(' ')
  const firstName = nameParts[0] ?? ''
  const lastName = nameParts.slice(1).join(' ') || ''

  const userData: Record<string, string> = {
    ph: hash(normalizePhone(payload.phone)),
    fn: hash(firstName),
  }
  if (lastName) userData.ln = hash(lastName)
  if (payload.email) userData.em = hash(payload.email)
  if (payload.clientIp) userData.client_ip_address = payload.clientIp
  if (payload.clientUserAgent) userData.client_user_agent = payload.clientUserAgent

  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: payload.sourceUrl ?? 'https://fixday.cl',
    action_source: 'website',
    event_id: payload.eventId,
    user_data: userData,
    custom_data: {
      content_name: payload.service,
      content_category: 'Servicio técnico',
      currency: 'CLP',
    },
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [event] }),
      }
    )
    if (!res.ok) {
      const err = await res.text()
      console.error('Meta CAPI error:', err)
    }
  } catch (err) {
    console.error('Meta CAPI fetch failed:', err)
  }
}
