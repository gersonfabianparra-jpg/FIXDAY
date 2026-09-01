'use client'

import { useEffect, useRef, useState } from 'react'
import Bix from './components/Bix'
import StatsCounter from './components/StatsCounter'
import JsonLd from './components/JsonLd'
import { COMUNAS } from './zonas/comunas'
import { HOME_FAQ } from './faq-home'

// Iconos de la FAQ (paralelos a HOME_FAQ por índice)
const FAQ_ICONS: React.ReactNode[] = [
  <svg key="f0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="f1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="f2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg key="f3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="f4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  <svg key="f5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
]

const WA_NUMBER = '56936649332'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola FIXDAY 👋, me interesa una página web o servicio técnico para mi computador')}`

// Titular de la semana: cada semana el hero adopta un tema con su propio gancho y color.
interface WeekTheme { kicker: string; lead: string; accent: string; color: string; sub: string }
const WEEKLY_THEMES: WeekTheme[] = [
  { kicker: 'Reparación a domicilio', lead: 'Tu computador', accent: 'no está para el tacho.', color: '#2997FF', sub: 'Un técnico llega a tu casa y lo deja como nuevo. Sin traslados, sin esperas.' },
  { kicker: 'Diseño web que vende', lead: 'Tu negocio merece una web', accent: 'que venda sola.', color: '#BF5AF2', sub: 'Sitios profesionales, optimizados para Google, listos en 5 a 7 días.' },
  { kicker: 'PC lento', lead: 'Deja de esperar', accent: 'a que tu PC reaccione.', color: '#30D158', sub: 'Optimización y mantención a domicilio en toda la Región Metropolitana.' },
  { kicker: 'Recuperación de datos', lead: 'Tus fotos no están perdidas.', accent: 'Todavía.', color: '#FF9F0A', sub: 'Recuperamos datos de discos dañados, formateados o con errores.' },
  { kicker: 'Diseño web + SEO', lead: 'Si no estás en Google,', accent: 'no existes.', color: '#5E5CE6', sub: 'Páginas web profesionales, pensadas para que tus clientes te encuentren.' },
  { kicker: 'Técnico a domicilio', lead: 'El técnico va a ti.', accent: 'Sin traslados, sin filas.', color: '#64D2FF', sub: 'Atendemos en tu casa u oficina el mismo día, en toda la RM.' },
  { kicker: 'Mantención preventiva', lead: 'Tu PC te avisa antes de fallar.', accent: '¿Lo escuchas?', color: '#2997FF', sub: 'Mantención a domicilio que evita reparaciones caras. Desde $25.000.' },
  { kicker: 'Tiendas online', lead: 'Vende', accent: 'mientras duermes.', color: '#BF5AF2', sub: 'Tiendas online que trabajan por ti las 24 horas del día.' },
  { kicker: 'Instalación de Windows', lead: 'Windows nuevo,', accent: 'PC como recién comprado.', color: '#30D158', sub: 'Instalación limpia a domicilio, con todos tus datos a salvo.' },
  { kicker: 'Segunda opinión gratis', lead: 'Reparamos lo que otros', accent: 'te dijeron que botaras.', color: '#FF9F0A', sub: 'Antes de comprar uno nuevo, deja que revisemos el tuyo.' },
]
function currentThemeIndex(): number {
  const now = new Date()
  const jan1 = new Date(now.getFullYear(), 0, 1)
  const week = Math.floor(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay()) / 7)
  return week % WEEKLY_THEMES.length
}

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

interface LiveInfo { greeting: string; status: string; when: string; open: boolean }

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mnavOpen, setMnavOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  // Hero "en vivo": saludo + estado según hora/día reales (se recalcula solo)
  const [live, setLive] = useState<LiveInfo | null>(null)
  useEffect(() => {
    const compute = () => {
      const d = new Date()
      const h = d.getHours()
      const day = d.getDay() // 0 dom … 6 sáb
      const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
      const greeting = h >= 5 && h < 12 ? 'Buenos días' : h >= 12 && h < 20 ? 'Buenas tardes' : 'Buenas noches'
      const franja = h >= 5 && h < 12 ? 'por la mañana' : h >= 12 && h < 20 ? 'por la tarde' : 'por la noche'
      const weekday = day >= 1 && day <= 5
      const open = weekday && h >= 8 && h < 19
      let status: string, when: string
      if (open) { status = 'Atendiendo ahora'; when = `${dias[day]} ${franja}` }
      else if (weekday && h < 8) { status = 'Abrimos hoy a las 8:00'; when = 'déjanos tu mensaje' }
      else if (weekday && h >= 19) { status = 'Cerramos por hoy'; when = 'agenda para mañana' }
      else { status = 'Fin de semana'; when = 'agenda para el lunes' }
      setLive({ greeting, status, when, open })
    }
    compute()
    const id = setInterval(compute, 60000)
    return () => clearInterval(id)
  }, [])
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [stats, setStats] = useState({ equipos: 0, satisfaccion: 0 })
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewIdx, setReviewIdx] = useState(0)
  const [reportCount] = useState(100)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [carouselMs, setCarouselMs] = useState(6000)
  const equiposTarget = useRef(100)
  const sliderRef = useRef<HTMLDivElement>(null)
  const sliderDrag = useRef({ dragging: false, startX: 0, startScroll: 0 })
  const [sliderIndex, setSliderIndex] = useState(0)
  const [sliderCanPrev, setSliderCanPrev] = useState(false)
  const [sliderCanNext, setSliderCanNext] = useState(true)
  // Tema del titular de la semana (default estable para SSR; el real se aplica tras montar)
  const [theme, setTheme] = useState<WeekTheme>(WEEKLY_THEMES[0])
  useEffect(() => {
    setTheme(WEEKLY_THEMES[currentThemeIndex()])
    // Reevalúa por si el navegador queda abierto al cambiar de semana
    const id = setInterval(() => setTheme(WEEKLY_THEMES[currentThemeIndex()]), 6 * 60 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

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
        const distSq = dx * dx + dy * dy
        if (distSq < 180 * 180) { const d = Math.sqrt(distSq); this.vx += (dx / d) * 0.04; this.vy += (dy / d) * 0.04 }
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

    const dots: Dot[] = Array.from({ length: 60 }, () => new Dot())
    const shooters: ShootingStar[] = Array.from({ length: 4 }, () => new ShootingStar())
    let raf: number
    const DIST_SQ = 110 * 110

    const animate = () => {
      if (document.hidden) { raf = requestAnimationFrame(animate); return }
      ctx.clearRect(0, 0, c.width, c.height)
      shooters.forEach(s => { s.update(); s.draw() })
      dots.forEach(d => { d.update(); d.draw() })
      // Use squared distance to avoid sqrt in O(n²) loop
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < DIST_SQ) {
            ctx.globalAlpha = (1 - Math.sqrt(distSq) / 110) * 0.13
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

  // Approved reviews + carousel speed + real report count
  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => setReviews(d.reviews ?? []))
      .catch(() => {})
    fetch('/api/settings?key=review_carousel_seconds')
      .then(r => r.json())
      .then(d => { const s = parseInt(d.value, 10); if (s >= 2) setCarouselMs(s * 1000) })
      .catch(() => {})
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => { if (d.count > 0) void d.count })
      .catch(() => {})
  }, [])

  // Auto-avance de reseñas
  useEffect(() => {
    if (reviews.length < 2) return
    const id = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), carouselMs)
    return () => clearInterval(id)
  }, [reviews.length, carouselMs])

  // Services slider: track scroll position for arrows/dots
  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    const update = () => {
      setSliderCanPrev(el.scrollLeft > 8)
      setSliderCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
      let closest = 0
      let minDist = Infinity
      Array.from(el.children).forEach((child, i) => {
        const dist = Math.abs((child as HTMLElement).offsetLeft - el.scrollLeft)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setSliderIndex(closest)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollSliderToCard = (i: number) => {
    const el = sliderRef.current
    const child = el?.children[i] as HTMLElement | undefined
    if (el && child) el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
  }
  const scrollSliderBy = (dir: 1 | -1) => {
    const el = sliderRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }
  const onSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = sliderRef.current
    if (!el) return
    sliderDrag.current = { dragging: true, startX: e.clientX, startScroll: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
    el.classList.add('dragging')
  }
  const onSliderPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderDrag.current.dragging) return
    const el = sliderRef.current
    if (!el) return
    el.scrollLeft = sliderDrag.current.startScroll - (e.clientX - sliderDrag.current.startX)
  }
  const onSliderPointerUp = () => {
    sliderDrag.current.dragging = false
    sliderRef.current?.classList.remove('dragging')
  }

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

  const avgRating = reviews.length
    ? reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length
    : 4.9

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
        <a href="/paginas-web" onClick={() => setMnavOpen(false)}>Páginas Web</a>
        <a href="#services" onClick={() => setMnavOpen(false)}>Servicios</a>
        <a href="/zonas" onClick={() => setMnavOpen(false)}>Zonas</a>
        <a href="/cotizador" onClick={() => setMnavOpen(false)}>Cotizador</a>
        <a href="#why" onClick={() => setMnavOpen(false)}>Por qué nosotros</a>
        <a href="/blog" onClick={() => setMnavOpen(false)}>Blog</a>
        <a href="#contact" onClick={() => setMnavOpen(false)} className="btn btn-dp">Cotizar proyecto</a>
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
                  <div className="logo-tag">Web + Técnico PC</div>
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
              <li><a href="/paginas-web">Páginas Web</a></li>
              <li><a href="#services">Servicios</a></li>
              <li><a href="/zonas">Zonas</a></li>
              <li><a href="/cotizador">Cotizador</a></li>
              <li><a href="#why">Por qué nosotros</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="#contact" className="btn btn-dp">Cotizar proyecto</a></li>
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
              <div className="hero-glow" />
              <div className="hbadge" style={live && !live.open ? { borderColor: 'rgba(255,159,10,.35)', background: 'rgba(255,159,10,.08)' } : undefined}>
                <div className="hdot" style={live && !live.open ? { background: '#FF9F0A', boxShadow: '0 0 0 0 rgba(255,159,10,.5)' } : undefined} />
                {live ? `${live.status} · ${live.when}` : 'Diseño web + Técnico a domicilio · Región Metropolitana'}
              </div>
              <div className="htrust">
                <span className="htrust-stars" aria-hidden>★★★★★</span>
                <strong>{avgRating.toFixed(1)}</strong>
                <span className="htrust-sep">·</span>
                <span>+100 clientes felices en la Región Metropolitana</span>
              </div>
              {live && (
                <div style={{ fontSize: 'clamp(1rem,2.4vw,1.35rem)', fontWeight: 700, color: '#C7C7CC', marginBottom: 6, letterSpacing: '-.01em' }}>
                  {live.greeting} <span style={{ display: 'inline-block' }}>👋</span>
                </div>
              )}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${theme.color}1c`, border: `1px solid ${theme.color}55`, borderRadius: 980, padding: '6px 15px', fontSize: 11.5, fontWeight: 800, color: theme.color, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                <span style={{ fontSize: 9 }}>◆</span> Tema de la semana · {theme.kicker}
              </div>
              <h1 className="hero-title" key={theme.kicker}>
                <span style={{ display: 'block', color: '#F5F5F7' }}>{theme.lead}</span>
                <span className="ht-mega" style={{ display: 'block', backgroundImage: `linear-gradient(90deg, ${theme.color} 0%, #ffffff 42%, ${theme.color} 72%, #ffffff 100%)`, backgroundSize: '250% 100%' }}>{theme.accent}</span>
              </h1>
              <div className="hero-stack">
                <span className="hs-tag">Páginas Web</span>
                <span className="hs-tag">Tiendas Online</span>
                <span className="hs-tag">Soporte a Domicilio</span>
              </div>
              <p className="hero-sub">{theme.sub}</p>
              <div className="hbtns">
                <a
                  href={WA_LINK}
                  className="btn btn-dp btn-xl" target="_blank" rel="noopener noreferrer"
                >
                  <WAIcon /> Cotizar por WhatsApp
                </a>
                <a href="/paginas-web" className="btn btn-do btn-xl">
                  Ver mi trabajo
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="hurgency">
                <span className="hu-dot" />
                Agenda hoy · Respondemos en minutos por WhatsApp
              </div>
<div className="hstats" id="hstats">
                <div className="stat-item">
                  <div className="stat-n">+{stats.equipos}</div>
                  <div className="stat-l">Proyectos realizados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-n">{stats.satisfaccion}%</div>
                  <div className="stat-l">Clientes satisfechos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-n">5–7</div>
                  <div className="stat-l">Días de entrega</div>
                </div>
              </div>
            </div>

            {/* Dual animated mockups: web + técnico */}
            <div className="hero-visual">
              <div className="hv-stage">
                {/* Navegador / web publicada */}
                <div className="hv-browser">
                  <div className="hv-bar">
                    <span className="hv-tl r" /><span className="hv-tl y" /><span className="hv-tl g" />
                    <div className="hv-url">https://tunegocio.cl</div>
                  </div>
                  <div className="hv-screen">
                    <div className="hv-badge">Publicado ✓</div>
                    <div className="hv-herobar" />
                    <div className="hv-line w85" />
                    <div className="hv-line w65" />
                    <div className="hv-line w45" />
                    <div className="hv-cta" />
                  </div>
                </div>
                {/* Equipo / técnico en optimización */}
                <div className="hv-laptop">
                  <div className="hv-lscreen">
                    <div className="hv-gear">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg>
                    </div>
                    <div className="hv-status">Optimizando equipo…</div>
                    <div className="hv-progress"><span /></div>
                    <div className="hv-check">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      Rendimiento +100%
                    </div>
                  </div>
                  <div className="hv-base" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE SLIDER ── */}
      <section id="slider">
        <div className="chip-wrap">
          <span className="chip-d">Todo lo que hacemos por ti</span>
        </div>
        <div className="slider-wrap">
          <button
            type="button"
            className="slider-arrow prev"
            onClick={() => scrollSliderBy(-1)}
            disabled={!sliderCanPrev}
            aria-label="Servicio anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div
            className="strack"
            ref={sliderRef}
            onPointerDown={onSliderPointerDown}
            onPointerMove={onSliderPointerMove}
            onPointerUp={onSliderPointerUp}
            onPointerLeave={onSliderPointerUp}
          >
            {[
              { title: 'Creación de Páginas Web', desc: 'Sitios modernos y profesionales diseñados desde cero para tu negocio.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 9l2 2-2 2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 13h4" strokeLinecap="round"/></svg> },
              { title: 'Personalización WordPress', desc: 'Modificamos, personalizamos y optimizamos tu sitio WordPress a fondo.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-3.5 19.4M12 2a10 10 0 0 1 3.5 19.4M2 12h20"/></svg> },
              { title: 'Reorganización de WordPress', desc: 'Ordenamos tu sitio WordPress desordenado: secciones, menús y diseño.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
              { title: 'Tiendas Online', desc: 'E-commerce y tiendas WooCommerce para vender en internet.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> },
              { title: 'Mantención Física y Lógica', desc: 'Limpieza interna, pasta térmica y actualización completa.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/><path d="M6 10h12v2H6z"/></svg> },
              { title: 'Respaldo de Información', desc: 'Copia de seguridad de todos tus datos antes de cualquier intervención.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
              { title: 'Recuperación de Datos', desc: 'Recuperamos archivos de discos dañados o formateados.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/><line x1="12" y1="7" x2="12" y2="17"/></svg> },
              { title: 'Instalación de Windows', desc: 'Windows 10 u 11 con todos los drivers y programas esenciales.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { title: 'Optimización del Sistema', desc: 'Tu PC como nuevo: eliminamos malware, basura y procesos lentos.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'WiFi y Repetidores', desc: 'Routers, access points y repetidores para cobertura total.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M1 6s4-6 11-6 11 6 11 6"/><path d="M5 10s2.5-4 7-4 7 4 7 4"/><path d="M9 14s1.5-2 3-2 3 2 3 2"/><line x1="12" y1="20" x2="12" y2="18"/></svg> },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="si">
                <div className="si-icon">{icon}</div>
                <div className="si-content"><h4>{title}</h4><p>{desc}</p></div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="slider-arrow next"
            onClick={() => scrollSliderBy(1)}
            disabled={!sliderCanNext}
            aria-label="Siguiente servicio"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <div className="slider-dots">
          {Array.from({ length: 9 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`sdot${i === sliderIndex ? ' active' : ''}`}
              onClick={() => scrollSliderToCard(i)}
              aria-label={`Ir al servicio ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <StatsCounter />

      {/* ── SERVICES GRID ── */}
      <section id="services">
        <div className="container">
          <div className="sh fu">
            <span className="chip-l">Lo que hacemos</span>
            <h2>Técnico a domicilio<br /><span className="gl">y páginas web</span></h2>
            <p>Visita a domicilio con diagnóstico técnico incluido — y también creamos tu sitio web profesional. Sin cargos ocultos y con garantía.</p>
          </div>
          <div className="sgrid">
            {[
              { n:'01', title:'Mantención Lógica y Física', desc:'Limpieza interna de polvo, cambio de pasta térmica, diagnóstico de hardware, actualización de drivers y sistema operativo.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="3"/></svg>, href:'/servicios/mantencion-pc' },
              { n:'02', title:'Respaldo de Información', desc:'Resguardamos tus documentos, fotos y archivos importantes antes de cualquier intervención. Tus datos siempre protegidos.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>, href:'/servicios/respaldo-datos' },
              { n:'03', title:'Recuperación de Datos', desc:'¿Perdiste archivos importantes? Recuperamos información de discos dañados, formateados o con particiones corruptas.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/><line x1="12" y1="7" x2="12" y2="17"/></svg>, href:'/servicios/recuperacion-datos' },
              { n:'04', title:'Instalación de Windows', desc:'Instalación limpia de Windows 10 u 11, con todos los drivers necesarios, antivirus y programas básicos configurados.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>, href:'/servicios/instalacion-windows' },
              { n:'05', title:'Optimización del Sistema', desc:'Hacemos que tu equipo vuelva a funcionar como nuevo. Eliminamos malware, programas basura y procesos que lo frenan.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, href:'/servicios/optimizacion-pc' },
              { n:'06', title:'WiFi y Repetidores', desc:'Configuramos tu red doméstica o de oficina. Routers, access points y repetidores para cobertura WiFi completa en todo el hogar.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><path d="M1 6s4-6 11-6 11 6 11 6"/><path d="M5 10s2.5-4 7-4 7 4 7 4"/><path d="M9 14s1.5-2 3-2 3 2 3 2"/><line x1="12" y1="20" x2="12" y2="18"/></svg>, href:'/servicios/wifi-redes' },
              { n:'07', title:'Diseño de Páginas Web', desc:'Creamos tu sitio web profesional: rápido, moderno y optimizado para Google. Ideal para negocios, emprendimientos y profesionales independientes.', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/><line x1="13" y1="11" x2="17" y2="11"/></svg>, href:'/paginas-web' },
            ].map(({ n, title, desc, icon, href }, i) => (
              <a key={n} href={href} target="_blank" rel="noopener noreferrer" className={`scard fu d${(i % 3) + 1}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="card-shine" />
                <div className="sicon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="snum">{n}</span>
              </a>
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
            <p>Visita a domicilio + diagnóstico técnico: <strong>$20.000</strong>. Si realizamos la reparación, ese valor se aplica al total del servicio.</p>
            <div className="price-banner fu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Visita a domicilio + diagnóstico — <strong style={{ marginLeft: 5, color: '#2997FF' }}>$20.000</strong><span style={{ marginLeft: 8, color: '#636366', fontWeight: 400, fontSize: '0.85em' }}>(se aplica al servicio si hay reparación)</span>
            </div>
          </div>
          <div className="pgrid">
            {([
              { name:'Mantención Lógica y Física', price:'$25.000', items:['Limpieza interna y pasta térmica','Actualización de drivers y SO','Diagnóstico completo de hardware'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="3"/></svg> },
              { name:'Respaldo de Información', price:'$25.000', items:['Copia de todos tus archivos','Organización por categorías','Entrega en disco o pendrive'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
              { name:'Recuperación de Datos', price:'$35.000', extra:'según dificultad', items:['Discos dañados o formateados','Particiones corruptas','Sin cobro si no hay recuperación'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/><line x1="12" y1="7" x2="12" y2="17"/></svg> },
              { name:'Instalación de Windows', price:'$30.000', items:['Windows 10 u 11 original','Todos los drivers instalados','Antivirus y programas esenciales'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { name:'Optimización del Sistema', price:'$20.000', items:['Eliminación de malware y basura','Inicio rápido y sistema fluido','Tuning completo del rendimiento'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { name:'WiFi y Repetidores', price:'$30.000', items:['Configuración de router','Instalación de repetidores','Cobertura total en tu hogar'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><path d="M1 6s4-6 11-6 11 6 11 6"/><path d="M5 10s2.5-4 7-4 7 4 7 4"/><path d="M9 14s1.5-2 3-2 3 2 3 2"/><line x1="12" y1="20" x2="12" y2="18"/></svg> },
              { name:'Diseño de Páginas Web', price:'$200.000', extra:'sitio completo y publicado', items:['Diseño moderno y profesional','Optimizado para Google (SEO)','Dominio y hosting incluido 1 año'], icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/><line x1="13" y1="11" x2="17" y2="11"/></svg> },
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
            Visita + diagnóstico: $20.000 — se aplica al total si realizamos la reparación.
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
              {reviews.length > 0 && (() => {
                const r = reviews[reviewIdx]
                return (
                  <div className="wcard" style={{ position: 'relative', minHeight: 180 }}>
                    <div key={reviewIdx} style={{ animation: 'rev-fade 0.5s ease' }}>
                      <div className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                      <p className="wquote">&ldquo;{r.review_text}&rdquo;</p>
                      <div className="wauthor">
                        <div className="wavatar">{r.client_name[0].toUpperCase()}</div>
                        <div className="wainfo">
                          <strong>{r.client_name}</strong>
                          {r.client_location && <span>{r.client_location}</span>}
                        </div>
                      </div>
                    </div>
                    {reviews.length > 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
                        {/* Flechas */}
                        <button
                          onClick={() => setReviewIdx(i => (i - 1 + reviews.length) % reviews.length)}
                          style={{ background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#2997FF', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >‹</button>
                        {/* Puntos */}
                        <div style={{ display: 'flex', gap: 6 }}>
                          {reviews.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setReviewIdx(i)}
                              style={{ width: i === reviewIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === reviewIdx ? '#2997FF' : 'rgba(255,255,255,.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setReviewIdx(i => (i + 1) % reviews.length)}
                          style={{ background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#2997FF', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >›</button>
                      </div>
                    )}
                  </div>
                )
              })()}
              <div className="wstats">
                <div className="wstat"><div className="n">+{reportCount}</div><div className="l">Equipos reparados</div></div>
                <div className="wstat"><div className="n">98%</div><div className="l">Satisfacción</div></div>
                <div className="wstat"><div className="n">&lt;24h</div><div className="l">Respuesta</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUIEN SOY ── */}
      <section id="quien-soy" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="container">
          <div className="qs-grid" style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 52, alignItems: 'center' }}>

            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, flexShrink: 0 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 148, height: 148, borderRadius: '50%', background: 'linear-gradient(135deg,#0071E3,#BF5AF2)', padding: 3 }}>
                  <img
                    src="/gerson.jpg"
                    alt="Gerson — Técnico FIXDAY"
                    width={142}
                    height={142}
                    style={{ width: 142, height: 142, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                  />
                </div>
                {/* Badge verificado */}
                <div style={{ position: 'absolute', bottom: 4, right: 4, width: 32, height: 32, borderRadius: '50%', background: '#30D158', border: '3px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>

              {/* Credenciales */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 980, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#2997FF' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Técnico IPP
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,159,10,.1)', border: '1px solid rgba(255,159,10,.2)', borderRadius: 980, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#FF9F0A' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FF9F0A" strokeWidth="2.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                  Cert. CISCO HW & SW
                </div>
              </div>
            </div>

            {/* Texto */}
            <div>
              <span className="chip-l" style={{ display: 'inline-block', marginBottom: 16 }}>El técnico detrás de FIXDAY</span>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-.03em', marginBottom: 20, color: '#F5F5F7' }}>
                Hola, soy <span className="gl">Gerson</span>
              </h2>
              <p style={{ fontSize: '0.97rem', color: '#86868B', lineHeight: 1.85, marginBottom: 20 }}>
                Llevo más de <strong style={{ color: '#F5F5F7' }}>10 años trabajando en informática</strong> — y hace un mes di el paso de crear FIXDAY para llevar ese conocimiento directamente a tu casa. Todo empezó gracias a mi hermano, quien me inspiró a estudiar tecnología. Desde entonces no paré: me certifiqué como Técnico Informático en el IPP y obtuve certificación en Hardware y Software en la academia CISCO.
              </p>
              <p style={{ fontSize: '0.97rem', color: '#86868B', lineHeight: 1.85, marginBottom: 28 }}>
                Lo que más me gusta de este trabajo no es solo reparar el equipo — es ver la cara de la persona cuando vuelve a funcionar. <strong style={{ color: '#F5F5F7' }}>Mientras trabajo, te explico cada paso</strong>: no solo lo arreglo, te enseño para que la próxima vez sepas qué pasó y cómo cuidar tu equipo.
              </p>

              {/* Pills de diferenciadores */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'Puntual siempre' },
                  { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: 'Te explico todo' },
                  { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: 'Sin letra chica' },
                  { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'A domicilio' },
                  { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, label: '+10 años de experiencia' },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 980, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#AEAEB2' }}>
                    {icon} {label}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PORTAFOLIO WEB ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ display: 'inline-block', background: 'rgba(191,90,242,.08)', border: '1px solid rgba(191,90,242,.22)', borderRadius: 980, padding: '6px 18px', fontSize: 11, fontWeight: 700, color: '#BF5AF2', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18 }}>Diseño web</span>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-.03em', color: '#F5F5F7', margin: '0 0 14px' }}>
              Páginas web que<br />hemos creado
            </h2>
            <p style={{ color: '#636366', fontSize: '0.9rem', margin: 0 }}>Negocios chilenos con presencia profesional en internet, diseñadas desde cero.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 860, margin: '0 auto' }}>

            {/* Stockeo */}
            <a href="https://stockeo.cl" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,160,23,.2)', borderRadius: 20, overflow: 'hidden', transition: 'border-color .2s' }}>
                {/* Browser chrome */}
                <div style={{ background: '#1A1A1A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBC2E', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
                  <div style={{ flex: 1, background: '#2C2C2E', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#636366', marginLeft: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>stockeo.cl</div>
                </div>
                {/* Screenshot */}
                <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <img
                    src="/screenshots/stockeo.jpg"
                    alt="Stockeo - Sistema de gestión para negocios"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#F5F5F7' }}>Stockeo</span>
                    <span style={{ background: 'rgba(212,160,23,.1)', border: '1px solid rgba(212,160,23,.25)', borderRadius: 980, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#D4A017', letterSpacing: '.07em', textTransform: 'uppercase' }}>Software</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.65, margin: '0 0 14px' }}>Gestión para negocios y talleres: inventario, boletas, cotizaciones y reportes para el SII desde el celular.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#D4A017', fontWeight: 600 }}>
                    Ver sitio
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </div>
              </div>
            </a>

            {/* PostMockup */}
            <a href="https://www.postmockup.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#0D0D0D', border: '1px solid rgba(48,209,88,.2)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ background: '#1A1A1A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBC2E', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
                  <div style={{ flex: 1, background: '#2C2C2E', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#636366', marginLeft: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>postmockup.com</div>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <img src="/screenshots/postmockup.jpg" alt="PostMockup - Generador de comentarios falsos" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} loading="lazy" />
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#F5F5F7' }}>PostMockup</span>
                    <span style={{ background: 'rgba(48,209,88,.1)', border: '1px solid rgba(48,209,88,.25)', borderRadius: 980, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#30D158', letterSpacing: '.07em', textTransform: 'uppercase' }}>Herramienta web</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.65, margin: '0 0 14px' }}>Crea mockups de comentarios de redes sociales (TikTok, Instagram, WhatsApp y más) de forma rápida y gratis.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#30D158', fontWeight: 600 }}>
                    Ver sitio
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Cleans Chile */}
            <a href="https://cleanschile.cl" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#0D0D0D', border: '1px solid rgba(41,151,255,.2)', borderRadius: 20, overflow: 'hidden' }}>
                {/* Browser chrome */}
                <div style={{ background: '#1A1A1A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBC2E', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
                  <div style={{ flex: 1, background: '#2C2C2E', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#636366', marginLeft: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>cleanschile.cl</div>
                </div>
                {/* Screenshot */}
                <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <img
                    src="/screenshots/cleanschile.jpg"
                    alt="Cleans Chile - Detailing automotriz premium"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#F5F5F7' }}>Cleans Chile</span>
                    <span style={{ background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.25)', borderRadius: 980, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#2997FF', letterSpacing: '.07em', textTransform: 'uppercase' }}>Detailing</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.65, margin: '0 0 14px' }}>Detailing automotriz premium en Santiago. Nanotecnología y precisión para transformar tu vehículo.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#2997FF', fontWeight: 600 }}>
                    Ver sitio
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Aceros Cumbres */}
            <a href="https://aceroscumbres.cl" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,107,53,.2)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ background: '#1A1A1A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBC2E', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
                  <div style={{ flex: 1, background: '#2C2C2E', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#636366', marginLeft: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>aceroscumbres.cl</div>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <img src="/screenshots/aceroscumbres.jpg" alt="Aceros Cumbres - Paneles y materiales de acero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} loading="lazy" />
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#F5F5F7' }}>Aceros Cumbres</span>
                    <span style={{ background: 'rgba(255,107,53,.1)', border: '1px solid rgba(255,107,53,.25)', borderRadius: 980, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#FF6B35', letterSpacing: '.07em', textTransform: 'uppercase' }}>Tienda online</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.65, margin: '0 0 14px' }}>Venta de paneles aislados, perfiles y materiales de acero a medida para proyectos de construcción. Cotización directa por WhatsApp.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#FF6B35', fontWeight: 600 }}>
                    Ver sitio
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </div>
              </div>
            </a>

            {/* IT Parra */}
            <a href="https://itparra.online/es/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#0D0D0D', border: '1px solid rgba(0,210,180,.2)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ background: '#1A1A1A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBC2E', flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
                  <div style={{ flex: 1, background: '#2C2C2E', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#636366', marginLeft: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>itparra.online</div>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <img src="/screenshots/itparra.jpg" alt="IT Parra - Portafolio profesional IT" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} loading="lazy" />
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#F5F5F7' }}>IT Parra</span>
                    <span style={{ background: 'rgba(0,210,180,.1)', border: '1px solid rgba(0,210,180,.25)', borderRadius: 980, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#00D2B4', letterSpacing: '.07em', textTransform: 'uppercase' }}>CV / Portafolio</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.65, margin: '0 0 14px' }}>Portafolio profesional de ingeniero en telecomunicaciones e infraestructura IT con más de 15 años de experiencia en Europa y Latinoamérica.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#00D2B4', fontWeight: 600 }}>
                    Ver sitio
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D2B4" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </div>
              </div>
            </a>

          </div>

          {/* CTA hacia página web */}
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="/paginas-web" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 980, padding: '11px 24px', fontSize: 13, fontWeight: 600, color: '#86868B', textDecoration: 'none' }}>
              ¿Quieres tu página web? Ver planes y precios →
            </a>
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

      {/* ── COBERTURA ── */}
      <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="container">
          <div className="sh fu" style={{ marginBottom: 40 }}>
            <span className="chip-l">Dónde atendemos</span>
            <h2>38 comunas en la<br /><span className="gl">Región Metropolitana</span></h2>
            <p>Llevamos el servicio técnico directamente a tu puerta, sin que tengas que trasladar tu equipo.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 860, margin: '0 auto 32px' }}>
            {COMUNAS.map(c => (
              <a
                key={c.slug}
                href={`/zonas/${c.slug}`}
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 980, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#AEAEB2', textDecoration: 'none', transition: 'all .2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(41,151,255,.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(41,151,255,.3)'; (e.currentTarget as HTMLElement).style.color = '#2997FF' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLElement).style.color = '#AEAEB2' }}
              >
                {c.name}
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/zonas" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 980, padding: '10px 22px', fontSize: 13, fontWeight: 700, color: '#2997FF', textDecoration: 'none' }}>
              Ver mapa interactivo de cobertura
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': 'https://fixday.cl/#faq',
          mainEntity: HOME_FAQ.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
      <section id="faq" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-60%)', width: 800, height: 500, background: 'radial-gradient(ellipse, rgba(41,151,255,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="sh fu" style={{ marginBottom: 52 }}>
            <span className="chip-l">Preguntas frecuentes</span>
            <h2>Todo lo que necesitas<br /><span className="gl">saber antes de llamar</span></h2>
          </div>
          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HOME_FAQ.map(({ q, a }, i) => {
              const icon = FAQ_ICONS[i]
              const open = faqOpen === i
              return (
                <div
                  key={i}
                  style={{
                    background: open ? 'rgba(41,151,255,.04)' : '#0D0D0D',
                    border: `1px solid ${open ? 'rgba(41,151,255,.25)' : 'rgba(255,255,255,.07)'}`,
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'border-color .25s, background .25s',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFaqOpen(open ? null : i)}
                >
                  <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: open ? 'rgba(41,151,255,.15)' : 'rgba(255,255,255,.05)',
                      border: `1px solid ${open ? 'rgba(41,151,255,.3)' : 'rgba(255,255,255,.08)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: open ? '#2997FF' : '#636366',
                      transition: 'all .25s',
                    }}>
                      {icon}
                    </div>
                    <span style={{ flex: 1, fontWeight: 700, fontSize: '0.95rem', color: open ? '#F5F5F7' : '#D1D1D6', lineHeight: 1.4, transition: 'color .25s' }}>
                      {q}
                    </span>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: open ? 'rgba(41,151,255,.15)' : 'rgba(255,255,255,.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .25s',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .25s' }}>
                        <path d="M2 4l4 4 4-4" stroke={open ? '#2997FF' : '#636366'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{
                    maxHeight: open ? 200 : 0,
                    overflow: 'hidden',
                    transition: 'max-height .35s cubic-bezier(.4,0,.2,1)',
                  }}>
                    <div style={{ padding: '0 22px 20px 74px', fontSize: '0.88rem', color: '#86868B', lineHeight: 1.75 }}>
                      {a}
                    </div>
                  </div>
                </div>
              )
            })}
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
                      <option>Creación de página web</option>
                      <option>Personalización WordPress</option>
                      <option>Reorganización de sitio WordPress</option>
                      <option>Tienda online / WooCommerce</option>
                      <option>Mantención lógica y física</option>
                      <option>Respaldo de información</option>
                      <option>Recuperación de datos</option>
                      <option>Instalación de Windows</option>
                      <option>Optimización del sistema</option>
                      <option>Instalación WiFi / Repetidores</option>
                      <option>Otro</option>
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

      {/* ── INSTAGRAM ── */}
      <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
            <a
              href="https://www.instagram.com/fixdaycl"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                boxShadow: '0 0 32px rgba(220,39,67,.35)',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>

            <div>
              <p style={{ fontSize: '0.85rem', color: '#636366', margin: 0, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600 }}>Síguenos en Instagram</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5F5F7', margin: '4px 0 0', letterSpacing: '-.02em' }}>@fixdaycl</p>
            </div>

            <a
              href="https://www.instagram.com/fixdaycl"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: '#fff',
                borderRadius: 980,
                padding: '12px 28px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              Seguir en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section style={{ padding: '64px 0', borderTop: '1px solid rgba(255,255,255,.06)', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,.01))' }}>
        <div className="container">
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            {/* Google icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(255,255,255,.08)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>

            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#636366', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Estamos en Google Business</p>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: '#F5F5F7', letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: 12 }}>
              ¿Te ayudamos bien?<br />
              <span style={{ background: 'linear-gradient(135deg,#4285F4,#34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Cuéntaselo a Google</span>
            </h2>
            <p style={{ color: '#636366', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 28, maxWidth: 420, margin: '0 auto 28px' }}>
              Tu reseña ayuda a otros usuarios a encontrarnos y nos motiva a seguir mejorando. Solo toma 1 minuto.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <a
                href="https://g.page/r/CTqzZD_Jn7yPEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: '#1a1a1a', borderRadius: 980, padding: '13px 28px', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 24px rgba(255,255,255,.08)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Dejar reseña en Google
              </a>
              <a href="/resenas" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>Ver página de reseñas →</a>
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
                <div><div className="logo-name">FIXDAY</div><div className="logo-tag">Diseño Web</div></div>
              </a>
              <p>Creamos y personalizamos páginas web para negocios chilenos. También reorganizamos WordPress y ofrecemos soporte técnico a domicilio.</p>
              <a href={WA_LINK} className="btn btn-dp" style={{ padding: '11px 22px', fontSize: '0.88rem' }} target="_blank" rel="noopener noreferrer">
                <WAIcon /> +56 9 3664 9332
              </a>
            </div>
            <div className="fcol">
              <h5>Servicios</h5>
              <ul>
                {['Creación de páginas web','Personalización WordPress','Reorganización WordPress','Tiendas online','Mantención de PC','Soporte técnico a domicilio'].map(s => (
                  <li key={s}><a href="#services">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className="fcol">
              <h5>Empresa</h5>
              <ul>
                <li><a href="#why">Por qué FIXDAY</a></li>
                <li><a href="#process">Cómo funciona</a></li>
                <li><a href="/zonas">Zonas de cobertura</a></li>
                <li><a href="/paginas-web">Páginas Web</a></li>
                <li><a href="#contact">Contacto</a></li>
                <li><a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/fixdaycl" target="_blank" rel="noopener noreferrer">Instagram</a></li>
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
