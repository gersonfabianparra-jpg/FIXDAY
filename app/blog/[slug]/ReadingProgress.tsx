'use client'

import { useEffect, useState } from 'react'

/** Barra de progreso de lectura fija en el borde superior. */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 200, pointerEvents: 'none' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#2997FF,#BF5AF2)', transition: 'width .08s linear' }} />
    </div>
  )
}
