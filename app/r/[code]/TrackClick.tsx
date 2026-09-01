'use client'

import { useEffect } from 'react'

/** Registra un clic del link de referido (una vez, al abrir). */
export default function TrackClick({ code }: { code: string }) {
  useEffect(() => {
    fetch('/api/referrals/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      keepalive: true,
    }).catch(() => {})
  }, [code])
  return null
}
