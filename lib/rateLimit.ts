interface Entry {
  count: number
  firstAt: number
  blockedUntil?: number
}

const store = new Map<string, Entry>()

export function rateLimit(key: string, opts: {
  max: number
  windowMs: number
  blockMs?: number
}): { ok: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (entry?.blockedUntil && now < entry.blockedUntil) {
    return { ok: false, retryAfter: Math.ceil((entry.blockedUntil - now) / 1000) }
  }

  if (!entry || now - entry.firstAt > opts.windowMs) {
    store.set(key, { count: 1, firstAt: now })
    return { ok: true }
  }

  if (entry.count >= opts.max) {
    if (opts.blockMs) entry.blockedUntil = now + opts.blockMs
    return { ok: false, retryAfter: opts.blockMs ? Math.ceil(opts.blockMs / 1000) : 60 }
  }

  entry.count++
  return { ok: true }
}

export function getIP(req: Request): string {
  const fwd = (req as any).headers?.get?.('x-forwarded-for')
  return fwd?.split(',')[0].trim() ?? 'unknown'
}
