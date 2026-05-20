'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { target: 150, prefix: '+', suffix: '', label: 'Equipos reparados', icon: '🔧' },
  { target: 98,  prefix: '',  suffix: '%', label: 'Clientes satisfechos', icon: '⭐' },
  { target: 38,  prefix: '',  suffix: '', label: 'Comunas atendidas', icon: '📍' },
  { target: 24,  prefix: '<', suffix: 'h', label: 'Tiempo de respuesta', icon: '⚡' },
]

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let frame = 0
    const total = 80
    const tick = () => {
      frame++
      const ease = 1 - Math.pow(1 - frame / total, 3)
      setVal(Math.round(ease * target))
      if (frame < total) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return val
}

function StatItem({ target, prefix, suffix, label, icon, active }: typeof STATS[0] & { active: boolean }) {
  const val = useCountUp(target, active)
  return (
    <div style={{ textAlign: 'center', flex: '1 1 160px' }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{
        fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
        fontWeight: 900,
        letterSpacing: '-.04em',
        lineHeight: 1,
        background: 'linear-gradient(135deg, #2997FF, #BF5AF2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 10,
      }}>
        {prefix}{val}{suffix}
      </div>
      <div style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500, letterSpacing: '.01em' }}>{label}</div>
    </div>
  )
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setActive(true)
      obs.disconnect()
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ padding: '72px 0', background: '#050505', borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 40,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {STATS.map((s, i) => (
            <StatItem key={i} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
