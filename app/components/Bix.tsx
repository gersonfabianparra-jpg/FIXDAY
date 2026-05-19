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

const COLORS: Record<Mood, { ac: string; ec: string }> = {
  idle:      { ac: '#2997FF', ec: '#2997FF' },
  scrolling: { ac: '#FF9F0A', ec: '#2997FF' },
  happy:     { ac: '#30D158', ec: '#30D158' },
  working:   { ac: '#FF9F0A', ec: '#2997FF' },
  waving:    { ac: '#BF5AF2', ec: '#BF5AF2' },
}

const T = 'fill 0.5s ease, stroke 0.5s ease, r 0.3s ease'

function BixSVG({ mood, ex, ey, blink }: { mood: Mood; ex: number; ey: number; blink: boolean }) {
  const { ac, ec } = COLORS[mood]
  const isScrolling = mood === 'scrolling'
  const isHappy     = mood === 'happy'
  const isWorking   = mood === 'working'
  const isWaving    = mood === 'waving'

  const er = isScrolling ? 7.5 : 5.5
  const dx = Math.max(-5.5, Math.min(5.5, ex * 6))
  const dy = Math.max(-3.5, Math.min(3.5, ey * 6))

  return (
    <svg width="96" height="130" viewBox="-8 0 96 130" fill="none" style={{ overflow: 'visible' }}>

      {/* Antena */}
      <circle cx="40" cy="7" r="13" style={{ fill: ac, transition: T }} opacity="0.15" className="bix-pulse" />
      <line x1="40" y1="7" x2="40" y2="20" style={{ stroke: ac, transition: T }} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="7" r="5.5" style={{ fill: ac, transition: T }} />
      <circle cx="40" cy="7" r="2.5" fill="white" opacity="0.85" />

      {/* Cabeza */}
      <rect x="8" y="20" width="64" height="48" rx="16" fill="#12122A" style={{ stroke: ac, transition: T }} strokeWidth="1.5" />

      {/* Ojo izquierdo */}
      <rect x="14" y="30" width="23" height="18" rx="6" fill="#07071A" />
      {blink
        ? <rect x="15" y="37" width="21" height="4" rx="2" style={{ fill: ec, transition: T }} opacity="0.7" />
        : <>
            <circle cx={25.5 + dx} cy={39 + dy} r={er} style={{ fill: ec, transition: T }} />
            <circle cx={27.5 + dx} cy={37 + dy} r="2.2" fill="white" opacity="0.75" />
          </>
      }

      {/* Ojo derecho */}
      <rect x="43" y="30" width="23" height="18" rx="6" fill="#07071A" />
      {blink
        ? <rect x="44" y="37" width="21" height="4" rx="2" style={{ fill: ec, transition: T }} opacity="0.7" />
        : <>
            <circle cx={54.5 + dx} cy={39 + dy} r={er} style={{ fill: ec, transition: T }} />
            <circle cx={56.5 + dx} cy={37 + dy} r="2.2" fill="white" opacity="0.75" />
          </>
      }

      {/* Boca */}
      <g style={{ transition: 'opacity 0.35s ease' }}>
        {isScrolling && <ellipse cx="40" cy="57" rx="8" ry="6" fill="#07071A" style={{ stroke: ac, transition: T }} strokeWidth="1.2" />}
        {isHappy     && <path d="M26 53 Q40 67 54 53" style={{ stroke: '#30D158', transition: T }} strokeWidth="2.5" strokeLinecap="round" />}
        {isWaving    && <path d="M28 56 Q34 51 40 56 Q46 61 52 56" style={{ stroke: '#BF5AF2', transition: T }} strokeWidth="2" strokeLinecap="round" />}
        {!isScrolling && !isHappy && !isWaving && <rect x="28" y="54" width="24" height="6" rx="3" fill="#07071A" />}
      </g>

      {/* Cuerpo */}
      <rect x="12" y="72" width="56" height="44" rx="14" fill="#0F0F22" stroke="rgba(41,151,255,0.35)" strokeWidth="1.5" />

      {/* Panel del pecho */}
      <rect x="22" y="82" width="36" height="23" rx="7" fill="#07071A" stroke="rgba(41,151,255,0.2)" strokeWidth="1" />
      <text x="40" y="98" textAnchor="middle" fontSize="11" fontWeight="800" fill="#2997FF" fontFamily="monospace">FD</text>

      {/* LED estado */}
      <circle cx="52" cy="78" r="3.5" style={{ fill: isWorking ? '#FF9F0A' : '#30D158', transition: T }} />
      <circle cx="52" cy="78" r="6"   style={{ fill: isWorking ? '#FF9F0A' : '#30D158', transition: T }} opacity="0.2" />

      {/* Brazo izquierdo */}
      <rect
        x="-6" y="76" width="16" height="30" rx="8"
        fill="#0F0F22" strokeWidth="1.5"
        style={{
          stroke: isWaving ? 'rgba(191,90,242,0.5)' : 'rgba(41,151,255,0.3)',
          transformOrigin: '2px 80px',
          transform: isWaving ? 'rotate(35deg)' : isWorking ? 'rotate(-20deg)' : 'rotate(0deg)',
          transition: 'transform 0.45s ease, stroke 0.5s ease',
        }}
      />

      {/* Brazo derecho */}
      <g style={{
        transformOrigin: '78px 80px',
        transform: isWaving ? 'rotate(-35deg)' : 'rotate(0deg)',
        transition: 'transform 0.45s ease',
      }}>
        <rect x="70" y="76" width="16" height="30" rx="8" fill="#0F0F22" stroke="rgba(41,151,255,0.3)" strokeWidth="1.5" />
        {isWorking && (
          <g transform="translate(78,106) rotate(-40)" className="bix-wrench">
            <rect x="-7" y="-2.5" width="18" height="5" rx="2.5" fill="#FF9F0A" />
            <circle cx="-7" cy="0" r="4.5" fill="#FF9F0A" />
            <circle cx="-7" cy="0" r="2.5" fill="#0F0F22" />
            <circle cx="11" cy="0" r="3" fill="#FF9F0A" />
            <circle cx="11" cy="0" r="1.5" fill="#0F0F22" />
          </g>
        )}
      </g>

      {/* Pies */}
      <rect x="16" y="116" width="20" height="13" rx="6" fill="#0F0F22" stroke="rgba(41,151,255,0.25)" strokeWidth="1" />
      <rect x="44" y="116" width="20" height="13" rx="6" fill="#0F0F22" stroke="rgba(41,151,255,0.25)" strokeWidth="1" />

      {/* Estrellas cuando está feliz */}
      {isHappy && <>
        <circle cx="-4" cy="55" r="3"   fill="#FF9F0A" className="bix-star1" />
        <circle cx="84" cy="45" r="2.2" fill="#30D158" className="bix-star2" />
        <circle cx="-2" cy="38" r="1.8" fill="#2997FF" className="bix-star3" />
        <circle cx="82" cy="62" r="1.5" fill="#BF5AF2" className="bix-star4" />
      </>}

      {/* Ondas cuando scrollea */}
      {isScrolling && <>
        <circle cx="4"  cy="35" r="3" fill="none" stroke="#FF9F0A" strokeWidth="1.5" className="bix-wave1" />
        <circle cx="76" cy="35" r="3" fill="none" stroke="#FF9F0A" strokeWidth="1.5" className="bix-wave2" />
      </>}
    </svg>
  )
}

export default function Bix() {
  const [enabled,  setEnabled]  = useState(true)
  const [ready,    setReady]    = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mood,     setMood]     = useState<Mood>('idle')
  const [eye,      setEye]      = useState({ x: 0, y: 0 })
  const [blink,    setBlink]    = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const [showMsg,  setShowMsg]  = useState(false)

  const wrapRef     = useRef<HTMLDivElement>(null)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const msgTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moodRef     = useRef<Mood>('idle')
  const waveActive  = useRef(false)
  const lastMouse   = useRef({ x: -1, y: -1 })

  const setM = (m: Mood) => {
    if (moodRef.current !== m && m !== 'scrolling') {
      setShowMsg(true)
      if (msgTimer.current) clearTimeout(msgTimer.current)
      msgTimer.current = setTimeout(() => setShowMsg(false), 2800)
    }
    moodRef.current = m
    setMood(m)
  }

  // Todo en un solo efecto: mobile → settings → aparecer
  useEffect(() => {
    // 1. Detectar mobile inmediatamente (antes del fade-in)
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)

    // 2. Consultar si está habilitado
    fetch('/api/settings?key=mascot_enabled')
      .then(r => r.json())
      .then(d => setEnabled(d.value !== 'false'))
      .catch(() => {})

    // 3. Aparecer DESPUÉS de que mobile ya está detectado
    const t = setTimeout(() => setReady(true), 80)

    return () => {
      window.removeEventListener('resize', check)
      clearTimeout(t)
    }
  }, [])

  // Parpadeo aleatorio
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const doBlink = () => {
      setBlink(true)
      setTimeout(() => setBlink(false), 130)
      timer = setTimeout(doBlink, 2200 + Math.random() * 3500)
    }
    timer = setTimeout(doBlink, 1800 + Math.random() * 1500)
    return () => clearTimeout(timer)
  }, [])

  // Mirar alrededor en idle
  useEffect(() => {
    const id = setInterval(() => {
      if (moodRef.current !== 'idle') return
      const dirs = [{ x: -0.7, y: 0.1 }, { x: 0.7, y: -0.1 }, { x: 0, y: 0.4 }, { x: 0.4, y: 0.3 }]
      const d = dirs[Math.floor(Math.random() * dirs.length)]
      setEye(d)
      setTimeout(() => { if (moodRef.current === 'idle') setEye({ x: 0, y: 0 }) }, 700)
    }, 4000 + Math.random() * 2000)
    return () => clearInterval(id)
  }, [])

  // Scroll + mouse + detección de sección
  useEffect(() => {
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

    const calcEye = (clientX: number, clientY: number) => {
      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      setEye({ x: (clientX - cx) / 110, y: (clientY - cy) / 110 })
    }

    let lastY = window.scrollY
    const onScroll = () => {
      const curr = window.scrollY
      const delta = Math.abs(curr - lastY)
      lastY = curr
      // Actualizar ojos con la última posición conocida del mouse
      if (lastMouse.current.x >= 0) calcEye(lastMouse.current.x, lastMouse.current.y)
      if (delta > 10) {
        const el = wrapRef.current
        if (el) { el.classList.remove('bix-shake'); void el.offsetWidth; el.classList.add('bix-shake') }
        moodRef.current = 'scrolling'
        setMood('scrolling')
        if (scrollTimer.current) clearTimeout(scrollTimer.current)
        scrollTimer.current = setTimeout(() => {
          wrapRef.current?.classList.remove('bix-shake')
          detectSection()
        }, 700)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      lastMouse.current = { x: e.clientX, y: e.clientY }
      calcEye(e.clientX, e.clientY)

      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      if (Math.hypot(e.clientX - cx, e.clientY - cy) < 150 && !waveActive.current && moodRef.current === 'idle') {
        waveActive.current = true
        setM('waving')
        setTimeout(() => { waveActive.current = false; detectSection() }, 2500)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
    }
  }, [])

  const visible = ready && enabled

  return (
    <>
      <style>{`
        @keyframes bix-bob       { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
        @keyframes bix-happy-bob { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-16px)} }
        @keyframes bix-shake     { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes bix-pulse     { 0%,100%{opacity:.15} 50%{opacity:.5} }
        @keyframes bix-star-up   { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-34px) scale(0);opacity:0} }
        @keyframes bix-wave-out  { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2.4);opacity:0} }
        @keyframes bix-wrench    { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-22deg)} }

        .bix-wrap            { animation: bix-bob 2.6s ease-in-out infinite; }
        .bix-wrap.bix-shadow { filter: drop-shadow(0 8px 32px rgba(41,151,255,0.25)); }
        .bix-wrap.bix-happy  { animation: bix-happy-bob 1.5s ease-in-out infinite !important; }
        .bix-wrap.bix-shake  { animation: bix-shake 0.45s ease-in-out 1 !important; }
        .bix-pulse           { animation: bix-pulse 1.8s ease-in-out infinite; }
        .bix-star1           { animation: bix-star-up 1.4s ease-out infinite; }
        .bix-star2           { animation: bix-star-up 1.4s ease-out 0.4s infinite; }
        .bix-star3           { animation: bix-star-up 1.4s ease-out 0.8s infinite; }
        .bix-star4           { animation: bix-star-up 1.4s ease-out 1.1s infinite; }
        .bix-wave1           { animation: bix-wave-out 0.7s ease-out infinite; }
        .bix-wave2           { animation: bix-wave-out 0.7s ease-out 0.35s infinite; }
        .bix-wrench          { animation: bix-wrench 0.6s ease-in-out infinite; transform-origin: -7px 0px; }

      `}</style>

      <div
        style={{
          position: 'fixed',
          right: isMobile ? 10 : 20,
          ...(isMobile ? { bottom: 88 } : { top: '55%', transform: 'translateY(-50%)' }),
          zIndex: 40,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: visible ? 'auto' : 'none',
          userSelect: 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Burbuja — solo desktop */}
        <div style={{
          display: isMobile ? 'none' : undefined,
          position: 'absolute', right: 104, top: '50%',
          transform: 'translateY(-50%)',
          opacity: (hovered || showMsg) ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        }}>
          <div style={{
            background: '#12122A', border: '1px solid rgba(41,151,255,0.3)',
            borderRadius: 12, padding: '9px 15px',
            fontSize: 13, color: '#F5F5F7', whiteSpace: 'nowrap',
            fontFamily: '-apple-system,sans-serif',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            {MOOD_MSG[mood]}
          </div>
        </div>

        {/* Wrapper de escala para mobile (separado de la animación bob) */}
        <div style={isMobile ? { transform: 'scale(0.62)', transformOrigin: 'right bottom' } : undefined}>
          <div
            ref={wrapRef}
            className={`bix-wrap${mood === 'happy' ? ' bix-happy' : ''}${!isMobile ? ' bix-shadow' : ''}`}
          >
            <BixSVG mood={mood} ex={eye.x} ey={eye.y} blink={blink} />
          </div>
        </div>
      </div>
    </>
  )
}
