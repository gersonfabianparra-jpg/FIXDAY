'use client'

import { useEffect, useRef, useState } from 'react'

type Mood = 'idle' | 'scrolling' | 'happy' | 'working' | 'waving'

const MOOD_MSG: Record<Mood, string> = {
  idle:      '¡Hola! Soy Bix 🤖',
  scrolling: '¡Espera, espera!',
  happy:     '¡Muy buena elección! ⭐',
  working:   '¡A reparar se dijo! 🔧',
  waving:    '¿Te puedo ayudar? 📱',
}

function BixSVG({ mood, ex, ey }: { mood: Mood; ex: number; ey: number }) {
  const isScrolling = mood === 'scrolling'
  const isHappy     = mood === 'happy'
  const isWorking   = mood === 'working'
  const isWaving    = mood === 'waving'

  const ac = isScrolling ? '#FF9F0A' : isHappy ? '#30D158' : isWaving ? '#BF5AF2' : '#2997FF'
  const ec = isHappy ? '#30D158' : isWaving ? '#BF5AF2' : '#2997FF'
  const er = isScrolling ? 7.5 : 5.5

  const dx = Math.max(-2.5, Math.min(2.5, ex * 2.5))
  const dy = Math.max(-2.5, Math.min(2.5, ey * 2.5))

  return (
    <svg width="80" height="126" viewBox="0 0 80 126" fill="none">
      {/* Antenna glow */}
      <circle cx="40" cy="7" r="12" fill={ac} opacity="0.15" className="bix-pulse" />
      <line x1="40" y1="7" x2="40" y2="20" stroke={ac} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="7" r="5" fill={ac} />
      <circle cx="40" cy="7" r="2.2" fill="white" opacity="0.8" />

      {/* Head */}
      <rect x="8" y="20" width="64" height="48" rx="16" fill="#12122A" stroke={ac} strokeWidth="1.5" />

      {/* Left eye socket */}
      <rect x="14" y="30" width="23" height="18" rx="6" fill="#07071A" />
      <circle cx={25.5 + dx} cy={39 + dy} r={er} fill={ec} />
      <circle cx={27.5 + dx} cy={37 + dy} r="2.2" fill="white" opacity="0.75" />

      {/* Right eye socket */}
      <rect x="43" y="30" width="23" height="18" rx="6" fill="#07071A" />
      <circle cx={54.5 + dx} cy={39 + dy} r={er} fill={ec} />
      <circle cx={56.5 + dx} cy={37 + dy} r="2.2" fill="white" opacity="0.75" />

      {/* Mouth — cambia con el humor */}
      {isScrolling ? (
        <ellipse cx="40" cy="57" rx="8" ry="6" fill="#07071A" stroke={ac} strokeWidth="1.2" />
      ) : isHappy ? (
        <path d="M28 54 Q40 66 52 54" stroke="#30D158" strokeWidth="2.5" strokeLinecap="round" />
      ) : isWaving ? (
        <path d="M28 56 Q34 51 40 56 Q46 61 52 56" stroke="#BF5AF2" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <rect x="28" y="54" width="24" height="6" rx="3" fill="#07071A" />
      )}

      {/* Body */}
      <rect x="12" y="72" width="56" height="42" rx="14" fill="#0F0F22" stroke="rgba(41,151,255,0.35)" strokeWidth="1.5" />

      {/* Chest panel */}
      <rect x="22" y="82" width="36" height="22" rx="7" fill="#07071A" stroke="rgba(41,151,255,0.2)" strokeWidth="1" />
      <text x="40" y="97" textAnchor="middle" fontSize="11" fontWeight="800" fill="#2997FF" fontFamily="monospace">FD</text>

      {/* Status LED */}
      <circle cx="52" cy="78" r="3.5" fill={isWorking ? '#FF9F0A' : '#30D158'} />
      <circle cx="52" cy="78" r="6"   fill={isWorking ? '#FF9F0A' : '#30D158'} opacity="0.2" />

      {/* Brazo izquierdo */}
      <rect
        x="-2" y="76" width="14" height="28" rx="7"
        fill="#0F0F22" stroke="rgba(41,151,255,0.3)" strokeWidth="1.5"
        style={{
          transformOrigin: '5px 80px',
          transform: isWaving ? 'rotate(30deg)' : isWorking ? 'rotate(-18deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s ease',
        }}
      />
      {/* Brazo derecho */}
      <rect
        x="68" y="76" width="14" height="28" rx="7"
        fill="#0F0F22" stroke="rgba(41,151,255,0.3)" strokeWidth="1.5"
        style={{
          transformOrigin: '75px 80px',
          transform: isWaving ? 'rotate(-30deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Pies */}
      <rect x="16" y="114" width="20" height="12" rx="6" fill="#0F0F22" stroke="rgba(41,151,255,0.25)" strokeWidth="1" />
      <rect x="44" y="114" width="20" height="12" rx="6" fill="#0F0F22" stroke="rgba(41,151,255,0.25)" strokeWidth="1" />
    </svg>
  )
}

export default function Bix() {
  const [enabled, setEnabled] = useState(false)
  const [loaded,  setLoaded]  = useState(false)
  const [mood,    setMood]    = useState<Mood>('idle')
  const [eye,     setEye]     = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const wrapRef      = useRef<HTMLDivElement>(null)
  const scrollTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moodRef      = useRef<Mood>('idle')
  const waveActive   = useRef(false)

  const setM = (m: Mood) => { moodRef.current = m; setMood(m) }

  useEffect(() => {
    fetch('/api/settings?key=mascot_enabled')
      .then(r => r.json())
      .then(d => { setEnabled(d.value !== 'false'); setLoaded(true) })
      .catch(() => { setEnabled(true); setLoaded(true) })
  }, [])

  useEffect(() => {
    if (!enabled) return

    let lastY = window.scrollY

    const detectSection = () => {
      const pairs: [string, Mood][] = [['contact', 'waving'], ['why', 'happy'], ['services', 'working']]
      for (const [id, m] of pairs) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.65 && r.bottom > window.innerHeight * 0.35) { setM(m); return }
      }
      setM('idle')
    }

    const onScroll = () => {
      const curr = window.scrollY
      const delta = Math.abs(curr - lastY)
      lastY = curr
      if (delta > 10) {
        // Reiniciar animación shake
        const el = wrapRef.current
        if (el) { el.classList.remove('bix-shake'); void el.offsetWidth; el.classList.add('bix-shake') }
        setM('scrolling')
        if (scrollTimer.current) clearTimeout(scrollTimer.current)
        scrollTimer.current = setTimeout(() => {
          wrapRef.current?.classList.remove('bix-shake')
          detectSection()
        }, 700)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      setEye({ x: (e.clientX - cx) / 360, y: (e.clientY - cy) / 360 })

      if (Math.hypot(e.clientX - cx, e.clientY - cy) < 140 && !waveActive.current && moodRef.current === 'idle') {
        waveActive.current = true
        setM('waving')
        setTimeout(() => { waveActive.current = false; detectSection() }, 2200)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
    }
  }, [enabled])

  if (!loaded || !enabled) return null

  return (
    <>
      <style>{`
        @keyframes bix-bob  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
        @keyframes bix-shake{ 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes bix-in   { from{opacity:0;transform:scale(.6) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes bix-pulse{ 0%,100%{opacity:.15} 50%{opacity:.45} }
        .bix-wrap           { animation: bix-bob 2.6s ease-in-out infinite, bix-in 0.7s ease-out both; }
        .bix-wrap.bix-shake { animation: bix-shake 0.45s ease-in-out 1 !important; }
        .bix-pulse          { animation: bix-pulse 1.8s ease-in-out infinite; }
        @media (max-width:768px){ .bix-wrap{ display:none!important; } }
      `}</style>

      <div
        ref={wrapRef}
        className="bix-wrap"
        style={{
          position: 'fixed', right: 28, top: '55%', transform: 'translateY(-50%)',
          zIndex: 40, userSelect: 'none', cursor: 'default',
          filter: 'drop-shadow(0 8px 36px rgba(41,151,255,0.28))',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Burbuja de diálogo */}
        {hovered && (
          <div style={{
            position: 'absolute', right: 92, top: '50%', transform: 'translateY(-50%)',
            background: '#12122A', border: '1px solid rgba(41,151,255,0.3)',
            borderRadius: 12, padding: '9px 15px',
            fontSize: 13, color: '#F5F5F7', whiteSpace: 'nowrap',
            fontFamily: '-apple-system,sans-serif',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
            animation: 'bix-in 0.25s ease-out both',
          }}>
            {MOOD_MSG[mood]}
          </div>
        )}

        <BixSVG mood={mood} ex={eye.x} ey={eye.y} />
      </div>
    </>
  )
}
