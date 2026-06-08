'use client'

import { useEffect } from 'react'

interface Props {
  event: string
  params?: Record<string, unknown>
}

export default function MetaPixelEvent({ event, params }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event, params)
    }
  }, [event, params])

  return null
}
