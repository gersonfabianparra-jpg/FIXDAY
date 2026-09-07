/** Contexto de origen de la visita, para saber qué canal trae los clientes. */
export interface TrackCtx {
  device: string
  referrer: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  source: string
}

export function getCtx(): TrackCtx {
  if (typeof window === 'undefined') {
    return { device: '', referrer: '', utm_source: '', utm_medium: '', utm_campaign: '', source: '' }
  }
  const p = new URLSearchParams(window.location.search)
  return {
    device: window.innerWidth < 768 ? 'movil' : 'escritorio',
    referrer: document.referrer || 'directo',
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    source: window.location.pathname,
  }
}

/** Registra un evento del embudo sin bloquear la navegación. */
export function trackEvent(event: string, comuna: string, section?: string) {
  try {
    const ctx = getCtx()
    fetch('/api/zona-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({ event, comuna, section, ...ctx }),
    }).catch(() => {})
  } catch { /* nunca debe romper la página */ }
}
