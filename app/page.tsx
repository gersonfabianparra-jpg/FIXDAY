'use client'

import { useEffect, useRef, useState } from 'react'
import Bix from './components/Bix'

const WA_NUMBER = '56936649332'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola FIXDAY, necesito ayuda con mi computador 💻')}`

function LogoSVG({ id }: { id: string }) {
  return (
    <svg className="logo-icon" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}bg`} x1="1" y1="1" x2="41" y2="41" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A0D18" />
          <stop offset="100%" stopColor="#060608" />
        </linearGradient>
        <linearGradient id={id} x1="4" y1="21" x2="38" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#2997FF" />
          <stop offset="100%" stopColor="#BF5AF2" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="40" height="40" rx="8" fill={`url(#${id}bg)`} stroke={`url(#${id})`} strokeWidth="1.5" />
      <path d="M 4 12 L 21 12 L 21 16 L 10 16 L 10 19 L 17 19 L 17 23 L 10 23 L 10 30 L 4 30 Z" fill={`url(#${id})`} />
      <path d="M 21 12 L 26 12 Q 38 12 38 21 Q 38 30 26 30 L 21 30 L 21 26 L 26 26 Q 32 26 32 21 Q 32 16 26 16 L 21 16 Z" fill={`url(#${id})`} />
      <line x1="21" y1="12" x2="21" y2="30" stroke="#08090F" strokeWidth="1.5" />
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
    </svg>
  )
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface Review {
  id: string
  client_name: string
  client_location?: string
  rating: number
  review_text: string
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mnavOpen, setMnavOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [stats, setStats] = useState({ equipos: 0, satisfaccion: 0 })
  const [reviews, setReviews] = useState<Review[]>([])
  const [reportCount] = useState(100)
  const equiposTarget = useRef(100)

  // Particles + shooting stars + mouse attraction
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const c = canvas
    const ctx = c.getContext('2d')!
    const mouse = { x: -999, y: -999 }

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    const COLORS = ['#2997FF', '#5E5CE6', '#BF5AF2', '#00C8FF']

    class Dot {
      x: number; y: number; s: number; vx: number; vy: number; a: number; col: string; pulse: number
      constructor() { this.x=0;this.y=0;this.s=0;this.vx=0;this.vy=0;this.a=0;this.col='';this.pulse=0; this.reset() }
      reset() {
        this.x = Math.random() * c.width
        this.y = Math.random() * c.height
        this.s = Math.random() * 1.8 + 0.4
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.a = Math.random() * 0.45 + 0.1
        this.col = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.pulse = Math.random() * Math.PI * 2
      }
      update() {
        const dx = mouse.x - this.x, dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) { this.vx += (dx / dist) * 0.04; this.vy += (dy / dist) * 0.04 }
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > 1.5) { this.vx = (this.vx / speed) * 1.5; this.vy = (this.vy / speed) * 1.5 }
        this.x += this.vx; this.y += this.vy
        this.pulse += 0.018
        if (this.x < 0 || this.x > c.width || this.y < 0 || this.y > c.height) this.reset()
      }
      draw() {
        const s = this.s + Math.sin(this.pulse) * 0.28
        ctx.globalAlpha = this.a
        ctx.fillStyle = this.col
        ctx.beginPath(); ctx.arc(this.x, this.y, s, 0, Math.PI * 2); ctx.fill()
      }
    }

    class ShootingStar {
      x: number; y: number; vx: number; vy: number; len: number; a: number; active: boolean; timer: number
      constructor() { this.x=0;this.y=0;this.vx=0;this.vy=0;this.len=0;this.a=0;this.active=false;this.timer=0; this.spawn() }
      spawn() {
        this.active = false
        this.timer = Math.random() * 280 + 80
        this.x = Math.random() * c.width * 0.75
        this.y = Math.random() * c.height * 0.45
        const angle = Math.PI * 0.22 + (Math.random() - 0.5) * 0.35
        const spd = Math.random() * 11 + 7
        this.vx = Math.cos(angle) * spd
        this.vy = Math.sin(angle) * spd
        this.len = Math.random() * 65 + 28
        this.a = Math.random() * 0.65 + 0.35
      }
      update() {
        if (!this.active) { if (--this.timer <= 0) this.active = true; return }
        this.x += this.vx; this.y += this.vy
        if (this.x > c.width + 60 || this.y > c.height + 60) this.spawn()
      }
      draw() {
        if (!this.active) return
        const spd = Math.hypot(this.vx, this.vy)
        const tx = this.x - (this.vx / spd) * this.len
        const ty = this.y - (this.vy / spd) * this.len
        const g = ctx.createLinearGradient(tx, ty, this.x, this.y)
        g.addColorStop(0, 'rgba(255,255,255,0)')
        g.addColorStop(1, `rgba(255,255,255,${this.a})`)
        ctx.save()
        ctx.globalAlpha = 1
        ctx.strokeStyle = g; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(this.x, this.y); ctx.stroke()
        ctx.globalAlpha = this.a
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }
    }

    const dots: Dot[] = Array.from({ length: 130 }, () => new Dot())
    const shooters: ShootingStar[] = Array.from({ length: 5 }, () => new ShootingStar())
    let raf: number
    const animate = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      shooters.forEach(s => { s.update(); s.draw() })
      dots.forEach(d => { d.update(); d.draw() })
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.14
            ctx.strokeStyle = dots[i].col; ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll: navbar + progress bar
  useEffect(() => {
    const pb = document.getElementById('progress-bar')
    const onScroll = () => {
      setNavScrolled(window.scrollY > 50)
      if (pb) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        pb.style.width = `${(window.scrollY / max) * 100}%`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile nav body lock
  useEffect(() => { document.body.style.overflow = mnavOpen ? 'hidden' : '' }, [mnavOpen])

  // Scroll reveal animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fu, .fu-l, .fu-r, .fu-s').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Process section line + number animation
  useEffect(() => {
    const el = document.getElementById('process')
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('in-view') },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // 3D tilt for tech cards
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.tc')
    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.animationPlayState = 'paused'
      el.style.transform = `perspective(500px) rotateX(${-y * 22}deg) rotateY(${x * 22}deg) scale(1.13) translateZ(14px)`
    }
    const onLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      el.style.animationPlayState = ''
      el.style.transform = ''
    }
    cards.forEach(card => {
      card.addEventListener('mousemove', onMove as EventListener)
      card.addEventListener('mouseleave', onLeave as EventListener)
    })
    return () => cards.forEach(card => {
      card.removeEventListener('mousemove', onMove as EventListener)
      card.removeEventListener('mouseleave', onLeave as EventListener)
    })
  }, [])

  // Approved reviews + real report count
  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => setReviews(d.reviews ?? []))
      .catch(() => {})
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => {
        if (d.count > 0) {
          void d.count // contador fijo en 100
        }
      })
      .catch(() => {})
  }, [])

  // Stats counter
  useEffect(() => {
    const el = document.getElementById('hstats')
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      let frame = 0
      const total = 70
      const tick = () => {
        frame++
        const ease = 1 - Math.pow(1 - frame / total, 3)
        setStats({ equipos: Math.round(ease * equiposTarget.current), satisfaccion: Math.round(ease * 98) })
        if (frame < total) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  const field = (key: keyof typeof formData) => ({
    value: formData[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [key]: e.target.value })),
  })

  return (
    <>
      <div id="progress-bar" />
      <canvas ref={canvasRef} id="cv" />

      {/* WhatsApp float */}
      <a href={WA_LINK} className="wafloat" target="_blank" rel="noopener noreferrer">
        <div className="pr" />
        <WAIcon />
        <span>Escríbenos por WhatsApp</span>
      </a>

      {/* Mobile nav */}
      <div className={`mnav ${mnavOpen ? 'open' : ''}`}>
        <button className="mclose" onClick={() => setMnavOpen(false)}>&times;</button>
        <a href="#services" onClick={() => setMnavOpen(false)}>Servicios</a>
        <a href="#precios" onClick={() => setMnavOpen(false)}>Precios</a>
        <a href="#why" onClick={() => setMnavOpen(false)}>Por qué nosotros</a>
        <a href="/zonas" onClick={() => setMnavOpen(false)}>Zonas</a>
        <a href="#contact" onClick={() => setMnavOpen(false)} className="btn btn-dp">Agendar visita</a>
      </div>

      {/* NAV */}
      <nav className={navScrolled ? 'sc' : ''}>
        <div className="container">
          <div className="nav-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <a href="#" className="logo">
                <LogoSVG id="lg-nav" />
                <div>
                  <div className="logo-name">FIXDAY</div>
                  <div className="logo-tag">Técnico a Domicilio</div>
                </div>
              </a>
              <a href="/admin" title="Admin" style={{ opacity: 0.18, color: 'inherit', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', transition: 'opacity .2s', marginTop: 1 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.18')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10zm-6-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                </svg>
              </a>
            </div>
            <ul className="nav-links">
              <li><a href="#services">Servicios</a></li>
              <li><a href="#precios">Precios</a></li>
              <li><a href="#why">Por qué nosotros</a></li>
              <li><a href="/zonas">Zonas</a></li>
              <li><a href="#contact" className="btn btn-dp">Agendar visita</a></li>
            </ul>
            <button className="burger" onClick={() => setMnavOpen(true)} aria-label="Abrir menú">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hbadge">
                <div className="hdot" />
                Disponible en toda la Región Metropolitana
              </div>
              <h1 className="hero-title">
                <span className="line-wrap"><span className="line-inner li1">Tu computador</span></span>
                <span className="line-wrap"><span className="line-inner li2 gd">reparado hoy.</span></span>
                <span className="line-wrap"><span className="line-inner li3">En tu casa.</span></span>
              </h1>
              <p className="hero-sub">
                Servicio técnico profesional a domicilio. Diagnóstico rápido, soluciones reales y sin vueltas. Llevamos el taller directamente donde tú estás.
              </p>
              <div className="hbtns">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola FIXDAY, quiero agendar una visita técnica')}`}
                  className="btn btn-dp" target="_blank" rel="noopener noreferrer"
                >
                  <WAIcon /> Agendar por WhatsApp
                </a>
                <a href="#services" className="btn btn-do">
                  Ver servicios
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="hstats" id="hstats">
                <div className="stat-item">
                  <div className="stat-n">+{stats.equipos}</div>
                  <div className="stat-l">Equipos reparados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-n">{stats.satisfaccion}%</div>
                  <div className="stat-l">Satisfacción</div>
                </div>
                <div className="stat-item">
                  <div className="stat-n">&lt;24h</div>
                  <div className="stat-l">Tiempo de respuesta</div>
                </div>
              </div>
            </div>

            {/* Tech cards visual */}
            <div className="hero-visual">
              <div className="tcards">
                {[
                  { icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="3" y="7" width="30" height="18" rx="3" stroke="#2997FF" strokeWidth="1.8"/><path d="M12 25v4M24 25v4M9 29h18" stroke="#2997FF" strokeWidth="1.8" strokeLinecap="round"/><path d="M9 14h10M9 18h6" stroke="#5E5CE6" strokeWidth="1.5" strokeLinecap="round"/></svg>, label: 'PC & Laptop' },
                  { icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="5" y="5" width="26" height="26" rx="3" stroke="#2997FF" strokeWidth="1.8"/><path d="M12 18h5M12 23h8M12 13h12" stroke="#5E5CE6" strokeWidth="1.5" strokeLinecap="round"/><circle cx="25" cy="13" r="2.5" fill="#2997FF"/></svg>, label: 'Windows' },
                  { icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><ellipse cx="18" cy="15" rx="10" ry="6" stroke="#2997FF" strokeWidth="1.8"/><path d="M8 15v6c0 3.3 4.5 6 10 6s10-2.7 10-6v-6" stroke="#5E5CE6" strokeWidth="1.8"/><path d="M8 21v6c0 3.3 4.5 6 10 6s10-2.7 10-6v-6" stroke="#2997FF" strokeWidth="1.8" opacity=".5"/></svg>, label: 'Datos' },
                  { icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M5 14c7.2-7.2 18.8-7.2 26 0" stroke="#2997FF" strokeWidth="1.8" strokeLinecap="round"/><path d="M9 18c4.97-4.97 13.03-4.97 18 0" stroke="#5E5CE6" strokeWidth="1.8" strokeLinecap="round"/><path d="M13 22c2.76-2.76 7.24-2.76 10 0" stroke="#2997FF" strokeWidth="1.8" strokeLinecap="round"/><circle cx="18" cy="27" r="2.5" fill="#2997FF"/></svg>, label: 'WiFi' },
                  { icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18 4l3.5 9h9.5l-7.5 5.5 3 9.5L18 23 9.5 28l3-9.5L5 13h9.5z" stroke="#2997FF" strokeWidth="1.8" strokeLinejoin="round"/></svg>, label: 'Premium' },
                  { icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="7" y="15" width="22" height="14" rx="2" stroke="#2997FF" strokeWidth="1.8"/><path d="M13 15V11a5 5 0 0 1 10 0v4" stroke="#5E5CE6" strokeWidth="1.8" strokeLinecap="round"/><circle cx="18" cy="22" r="2.5" fill="#2997FF"/></svg>, label: 'Seguro' },
                ].map(({ icon, label }) => (
                  <div key={label} className="tc">{icon}<div className="tc-lbl">{label}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE SLIDER ── */}
      <section id="slider">
        <div className="chip-wrap">
          <span className="chip-d">Todos nuestros servicios</span>
        </div>
        <div className="slider-wrap">
          <div className="strack">
            {[...Array(2)].map((_, set) =>
              [
                { title: 'Mantención Física y Lógica', desc: 'Limpieza interna, pasta térmica y actualización completa.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/><path d="M6 10h12v2H6z"/></svg> },
                { title: 'Respaldo de Información', desc: 'Copia de seguridad de todos tus datos antes de cualquier intervención.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
                { title: 'Recuperación de Datos', desc: 'Recuperamos archivos de discos dañados o formateados.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/><line x1="12" y1="7" x2="12" y2="17"/></svg> },
                { title: 'Instalación de Windows', desc: 'Windows 10 u 11 con todos los drivers y programas esenciales.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { title: 'Optimización del Sistema', desc: 'Tu PC como nuevo: eliminamos malware, basura y procesos lentos.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
                { title: 'WiFi y Repetidores', desc: 'Routers, access points y repetidores para cobertura total.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M1 6s4-6 11-6 11 6 11 6"/><path d="M5 10s2.5-4 7-4 7 4 7 4"/><path d="M9 14s1.5-2 3-2 3 2 3 2"/><line x1="12" y1="20" x2="12" y2="18"/></svg> },
                { title: 'Servicio a Domicilio', desc: 'Vamos donde tú estás. Sin traslados. Toda la Región Metropolitana.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
              ].map(({ title, desc, icon }) => (
                <div key={`${set}-${title}`} className="si">
                  <div className="si-icon">{icon}</div>
                  <div className="si-content"><h4>{title}</h4><p>{desc}</p></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="services">
        <div className="container">
          <div className="sh fu">
            <span className="chip-l">Lo que hacemos</span>
            <h2>Servicios técnicos<br /><span className="gl">profesionales</span></h2>
            <p>Visita a domicilio con diagnóstico técnico incluido. Sin cargos ocultos y con garantía en cada servicio.</p>
          </div>
          <div className="sgrid">
            {[
              { n:'01', title:'Mantención Lógica y Física', desc:'Limpieza interna de polvo, cambio de pasta térmica, diagnóstico de hardware, actualización de drivers y sistema operativo.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="3"/></svg> },
              { n:'02', title:'Respaldo de Información', desc:'Resguardamos tus documentos, fotos y archivos importantes antes de cualquier intervención. Tus datos siempre protegidos.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
              { n:'03', title:'Recuperación de Datos', desc:'¿Perdiste archivos importantes? Recuperamos información de discos dañados, formateados o con particiones corruptas.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/><line x1="12" y1="7" x2="12" y2="17"/></svg> },
              { n:'04', title:'Instalación de Windows', desc:'Instalación limpia de Windows 10 u 11, con todos los drivers necesarios, antivirus y programas básicos configurados.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { n:'05', title:'Optimización del Sistema', desc:'Hacemos que tu equipo vuelva a funcionar como nuevo. Eliminamos malware, programas basura y procesos que lo frenan.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { n:'06', title:'WiFi y Repetidores', desc:'Configuramos tu red doméstica o de oficina. Routers, access points y repetidores para cobertura WiFi completa en todo el hogar.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><path d="M1 6s4-6 11-6 11 6 11 6"/><path d="M5 10s2.5-4 7-4 7 4 7 4"/><path d="M9 14s1.5-2 3-2 3 2 3 2"/><line x1="12" y1="20" x2="12" y2="18"/></svg> },
            ].map(({ n, title, desc, icon }, i) => (
              <div key={n} className={`scard fu d${(i % 3) + 1}`}>
                <div className="card-shine" />
                <div className="sicon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="snum">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="precios">
        <div className="container">
          <div className="sh fu">
            <span className="chip-d">Tarifas</span>
            <h2>Precios claros,<br /><span className="gl">sin sorpresas</span></h2>
            <p>Visita a domicilio + diagnóstico técnico: <strong>$15.000</strong>. Si realizamos la reparación, ese valor se aplica al total del servicio.</p>
            <div className="price-banner fu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Visita a domicilio + diagnóstico — <strong style={{ marginLeft: 5, color: '#2997FF' }}>$15.000</strong><span style={{ marginLeft: 8, color: '#636366', fontWeight: 400, fontSize: '0.85em' }}>(se aplica al servicio si hay reparación)</span>
            </div>
          </div>
          <div className="pgrid">
            {([
              { name:'Mantención Lógica y Física', price:'$25.000', items:['Limpieza interna y pasta térmica','Actualización de drivers y SO','Diagnóstico completo de hardware'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="3"/></svg> },
              { name:'Respaldo de Información', price:'$15.000', items:['Copia de todos tus archivos','Organización por categorías','Entrega en disco o pendrive'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
              { name:'Recuperación de Datos', price:'$35.000', extra:'según dificultad', items:['Discos dañados o formateados','Particiones corruptas','Sin cobro si no hay recuperación'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/><line x1="12" y1="7" x2="12" y2="17"/></svg> },
              { name:'Instalación de Windows', price:'$30.000', items:['Windows 10 u 11 original','Todos los drivers instalados','Antivirus y programas esenciales'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { name:'Optimización del Sistema', price:'$20.000', items:['Eliminación de malware y basura','Inicio rápido y sistema fluido','Tuning completo del rendimiento'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { name:'WiFi y Repetidores', price:'$30.000', items:['Configuración de router','Instalación de repetidores','Cobertura total en tu hogar'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><path d="M1 6s4-6 11-6 11 6 11 6"/><path d="M5 10s2.5-4 7-4 7 4 7 4"/><path d="M9 14s1.5-2 3-2 3 2 3 2"/><line x1="12" y1="20" x2="12" y2="18"/></svg> },
            ] as Array<{ name: string; price: string; extra?: string; items: string[]; icon: React.ReactNode }>).map(({ name, price, extra, items, icon }, i) => (
              <div key={name} className={`pcard fu d${(i % 3) + 1}`}>
                <div className="pcard-icon">{icon}</div>
                <div className="pcard-name">{name}</div>
                <div className="pcard-price">Desde {price}</div>
                <div className="pcard-label">{extra ?? 'precio de referencia'}</div>
                <ul className="pcard-list">
                  {items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="price-note fu">
            Los precios son referenciales e incluyen mano de obra. Repuestos o materiales adicionales se cotizan aparte.<br />
            Visita + diagnóstico: $15.000 — se aplica al total si realizamos la reparación.
          </p>
          <div style={{ textAlign: 'center', marginTop: 40 }} className="fu">
            <a href="#contact" className="btn btn-dp">Solicitar visita técnica</a>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why">
        <div className="container">
          <div className="wgrid">
            <div>
              <span className="chip-l fu">¿Por qué FIXDAY?</span>
              <h2 className="fu d1">
                La diferencia está<br /><span className="gl">en cómo trabajamos</span>
              </h2>
              <div className="wfeats">
                {[
                  { title: 'Vamos a tu domicilio', desc: 'No tienes que llevar tu equipo a ningún lado. Llegamos donde estés en toda la Región Metropolitana.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
                  { title: 'Diagnóstico sin costo', desc: 'Revisamos tu equipo y te explicamos qué tiene antes de cobrar un peso. Total transparencia desde el inicio.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg> },
                  { title: 'Garantía de satisfacción', desc: 'Si el problema vuelve dentro de los 7 días, regresamos sin costo adicional. Así de serios somos.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> },
                  { title: 'Respuesta inmediata', desc: 'Respondemos por WhatsApp al instante y agendamos en el horario que más te acomode. Sin burocracia.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg> },
                ].map(({ title, desc, icon }, i) => (
                  <div key={title} className={`wfeat fu d${i + 1}`}>
                    <div className="wfeat-icon">{icon}</div>
                    <div className="wfeat-text"><h4>{title}</h4><p>{desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fu-r d2">
              {reviews.length > 0 && (
                <div className="wcard">
                  <div className="stars">{'★'.repeat(reviews[0].rating)}{'☆'.repeat(5 - reviews[0].rating)}</div>
                  <p className="wquote">&ldquo;{reviews[0].review_text}&rdquo;</p>
                  <div className="wauthor">
                    <div className="wavatar">{reviews[0].client_name[0].toUpperCase()}</div>
                    <div className="wainfo">
                      <strong>{reviews[0].client_name}</strong>
                      {reviews[0].client_location && <span>{reviews[0].client_location}</span>}
                    </div>
                  </div>
                </div>
              )}
              <div className="wstats">
                <div className="wstat"><div className="n">+{reportCount}</div><div className="l">Equipos reparados</div></div>
                <div className="wstat"><div className="n">98%</div><div className="l">Satisfacción</div></div>
                <div className="wstat"><div className="n">&lt;24h</div><div className="l">Respuesta</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process">
        <div className="container">
          <div className="sh fu">
            <span className="chip-l">Cómo funciona</span>
            <h2>Del problema a la solución<br /><span className="gl">en 4 pasos</span></h2>
            <p>Proceso simple, transparente y sin sorpresas. Tú solo cuéntanos el problema.</p>
          </div>
          <div className="psteps">
            {[
              { n:'1', title:'Contáctanos', desc:'Escríbenos por WhatsApp o el formulario. Cuéntanos qué le pasa a tu equipo.' },
              { n:'2', title:'Agendamos', desc:'Coordinamos una visita en el horario que más te acomode. Sin esperas largas.' },
              { n:'3', title:'Diagnóstico', desc:'Revisamos tu equipo en tu casa y te explicamos el problema con presupuesto claro.' },
              { n:'4', title:'¡Listo!', desc:'Solucionamos el problema y te entregamos tu equipo funcionando perfectamente.' },
            ].map(({ n, title, desc }, i) => (
              <div key={n} className={`pstep fu d${i + 1}`}>
                <div className="pnum-wrap">
                  <div className="pnum">{n}</div>
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <div className="cgrid">
            <div className="cinfo fu-l">
              <span className="chip-d">Contacto</span>
              <h2>Agenda tu visita<br /><span className="gd">hoy mismo</span></h2>
              <p>Completa el formulario o escríbenos directamente por WhatsApp. Respondemos en minutos durante nuestro horario de atención.</p>
              <div className="cdets">
                <div className="cdet">
                  <div className="cdet-icon"><WAIcon /></div>
                  <div className="cdet-text"><strong>WhatsApp</strong><span>+56 9 3664 9332</span></div>
                </div>
                <div className="cdet">
                  <div className="cdet-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="cdet-text"><strong>Zona de cobertura</strong><span>Región Metropolitana, Chile</span></div>
                </div>
                <div className="cdet">
                  <div className="cdet-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="cdet-text"><strong>Horario de atención</strong><span>Lunes a Viernes, 8:00 – 19:00 hrs</span></div>
                </div>
              </div>

              <div className="pay-methods">
                <span className="pay-title">Medios de pago aceptados</span>
                <div className="pay-badges">
                  <div className="pay-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                    </svg>
                    Transferencia
                  </div>
                  <div className="pay-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Efectivo
                  </div>
                </div>
              </div>
            </div>

            <div className="cform fu-r d2">
              {formStatus === 'success' ? (
                <div className="fsuccess">
                  <div className="fcheck">✓</div>
                  <h3 style={{ marginBottom: 10 }}>¡Solicitud recibida!</h3>
                  <p style={{ marginBottom: 8 }}>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                  <p style={{ fontSize: 14, color: '#636366' }}>Horario de atención: Lunes a Viernes, 8:00 – 19:00 hrs</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="frow">
                    <div className="fg">
                      <label htmlFor="f-name">Nombre *</label>
                      <input id="f-name" type="text" placeholder="Tu nombre completo" required {...field('name')} />
                    </div>
                    <div className="fg">
                      <label htmlFor="f-phone">Teléfono *</label>
                      <input id="f-phone" type="tel" placeholder="+56 9 XXXX XXXX" required {...field('phone')} />
                    </div>
                  </div>
                  <div className="fg">
                    <label htmlFor="f-email">Correo electrónico</label>
                    <input id="f-email" type="email" placeholder="tucorreo@ejemplo.com" {...field('email')} />
                  </div>
                  <div className="fg">
                    <label htmlFor="f-service">Servicio que necesitas *</label>
                    <select id="f-service" required {...field('service')}>
                      <option value="" disabled>Selecciona un servicio</option>
                      <option>Mantención lógica y física</option>
                      <option>Respaldo de información</option>
                      <option>Recuperación de datos</option>
                      <option>Instalación de Windows</option>
                      <option>Optimización del sistema</option>
                      <option>Instalación WiFi / Repetidores</option>
                      <option>Otro / No sé qué tiene</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label htmlFor="f-msg">Cuéntanos el problema</label>
                    <textarea id="f-msg" placeholder="Describe qué le pasa a tu equipo o qué necesitas..." {...field('message')} />
                  </div>
                  {formStatus === 'error' && (
                    <p className="ferror">Hubo un error al enviar. Inténtalo de nuevo.</p>
                  )}
                  <button type="submit" className="btn btn-dp fsub" disabled={formStatus === 'loading'}>
                    {formStatus === 'loading' ? 'Enviando...' : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Enviar solicitud
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="fgrid">
            <div className="fbrand">
              <a href="#" className="logo">
                <LogoSVG id="lg-footer" />
                <div><div className="logo-name">FIXDAY</div><div className="logo-tag">Técnico a Domicilio</div></div>
              </a>
              <p>Servicio técnico profesional a domicilio en la Región Metropolitana de Santiago. Rápido, confiable y transparente.</p>
              <a href={WA_LINK} className="btn btn-dp" style={{ padding: '11px 22px', fontSize: '0.88rem' }} target="_blank" rel="noopener noreferrer">
                <WAIcon /> +56 9 3664 9332
              </a>
            </div>
            <div className="fcol">
              <h5>Servicios</h5>
              <ul>
                {['Mantención de PC','Respaldo de datos','Recuperación de datos','Instalación Windows','Optimización PC','Redes WiFi'].map(s => (
                  <li key={s}><a href="#services">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className="fcol">
              <h5>Empresa</h5>
              <ul>
                <li><a href="#why">Por qué FIXDAY</a></li>
                <li><a href="#process">Cómo funciona</a></li>
                <li><a href="#contact">Contacto</a></li>
                <li><a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="fbot">
            <p>© {new Date().getFullYear()} <span className="gd">FIXDAY</span>. Todos los derechos reservados.</p>
            <p>Santiago, Chile — Región Metropolitana</p>
          </div>
        </div>
      </footer>

      <Bix />
    </>
  )
}
