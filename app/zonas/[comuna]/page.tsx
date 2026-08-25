import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { COMUNAS, getComunaBySlug } from '../comunas'
import Logo from '@/app/components/Logo'

export function generateStaticParams() {
  return COMUNAS.map(c => ({ comuna: c.slug }))
}

export async function generateMetadata({ params }: { params: { comuna: string } }): Promise<Metadata> {
  const c = getComunaBySlug(params.comuna)
  if (!c) return {}
  return {
    title: `Técnico Computadores a Domicilio en ${c.name} | FIXDAY`,
    description: `Servicio técnico de computadores a domicilio en ${c.name}. Mantención, recuperación de datos, instalación de Windows, optimización y WiFi. Visita + diagnóstico $25.000. Rápido, confiable y profesional.`,
    alternates: { canonical: `/zonas/${c.slug}` },
    openGraph: {
      title: `Técnico a Domicilio en ${c.name} | FIXDAY`,
      description: `Reparación de computadores en ${c.name}. Servicio profesional, rápido y transparente.`,
      url: `https://fixday.cl/zonas/${c.slug}`,
      siteName: 'FIXDAY',
      locale: 'es_CL',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `Técnico a domicilio en ${c.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Técnico a Domicilio en ${c.name} | FIXDAY`,
      description: `Reparación de computadores en ${c.name}. Servicio profesional, rápido y transparente.`,
    },
  }
}

const stroke = { fill: 'none', stroke: '#2997FF', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const SERVICES = [
  {
    title: 'Mantención de PC', desc: 'Limpieza interna, pasta térmica, drivers y sistema operativo.', price: '$25.000',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
  {
    title: 'Instalación de Windows', desc: 'Windows 10 u 11, drivers, antivirus y programas esenciales.', price: '$30.000',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M12 7v6M9 10h6"/></svg>,
  },
  {
    title: 'Recuperación de datos', desc: 'Discos dañados, formateados o con particiones corruptas.', price: '$35.000',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>,
  },
  {
    title: 'Optimización del sistema', desc: 'Eliminamos malware y procesos que frenan tu equipo.', price: '$20.000',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    title: 'Respaldo de información', desc: 'Copia segura de tus archivos, fotos y documentos.', price: '$15.000',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  },
  {
    title: 'WiFi y repetidores', desc: 'Configuración de router y cobertura completa en tu hogar.', price: '$30.000',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  },
]

const STEPS = [
  { n: '1', title: 'Escríbenos por WhatsApp', desc: 'Cuéntanos qué le pasa a tu equipo. Te respondemos en menos de una hora.' },
  { n: '2', title: 'Coordinamos la visita', desc: 'Agendamos el mismo día o al día siguiente, en el horario que te acomode.' },
  { n: '3', title: 'Reparamos en tu casa', desc: 'Diagnóstico claro, presupuesto sin sorpresas y solución en el lugar.' },
]

const WA_BASE = 'https://wa.me/56936649332?text='

export default function ComunaPage({ params }: { params: { comuna: string } }) {
  const c = getComunaBySlug(params.comuna)
  if (!c) notFound()

  const waMsg = encodeURIComponent(`Hola FIXDAY, necesito un técnico a domicilio en ${c.name}`)

  // Comunas cercanas que tienen su propia página → chips clicables (interlinking)
  const nearbyLinks = c.nearby
    .map(name => COMUNAS.find(x => x.name === name))
    .filter((x): x is (typeof COMUNAS)[number] => Boolean(x))

  const faqs = [
    { q: `¿Cuánto cuesta la visita de un técnico a domicilio en ${c.name}?`, a: `La visita a domicilio en ${c.name} más el diagnóstico tiene un valor de $25.000. Si realizas la reparación con nosotros, ese monto se descuenta del total del servicio.` },
    { q: `¿En cuánto tiempo llegan a ${c.name}?`, a: `Coordinamos la visita técnica en ${c.name} para el mismo día o el día siguiente según disponibilidad. Atendemos de lunes a viernes de 08:00 a 19:00.` },
    { q: `¿Tengo que llevar mi computador o van a mi casa en ${c.name}?`, a: `No necesitas trasladar tu equipo. El servicio es completamente a domicilio: el técnico llega a tu casa u oficina en ${c.name} con todas las herramientas necesarias.` },
    { q: `¿Qué computadores reparan en ${c.name}?`, a: `Atendemos computadores de escritorio y notebooks de todas las marcas con Windows. Hacemos mantención, instalación de Windows, recuperación de datos, optimización, respaldo y configuración de WiFi.` },
    { q: `¿Ofrecen garantía por el servicio en ${c.name}?`, a: `Sí. Todos nuestros servicios en ${c.name} incluyen 7 días de garantía: si el mismo problema vuelve a aparecer, regresamos sin costo adicional.` },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      {/* Hover styles (server-safe, scoped con prefijo cz-) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cz-svc{transition:transform .22s ease,border-color .22s ease,background .22s ease}
        .cz-svc:hover{transform:translateY(-3px);border-color:rgba(41,151,255,.35);background:#141414}
        .cz-chip{transition:background .2s ease,border-color .2s ease,color .2s ease}
        .cz-chip:hover{background:rgba(41,151,255,.14);border-color:rgba(41,151,255,.4);color:#fff}
        .cz-cta{transition:transform .2s ease,box-shadow .2s ease}
        .cz-cta:hover{transform:translateY(-2px)}
        .cz-faq[open] .cz-faq-plus{transform:rotate(45deg)}
        .cz-faq summary::-webkit-details-marker{display:none}

        /* ── Hero animado ── */
        .cz-hero{position:relative;overflow:hidden}
        .cz-aurora{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;opacity:.55;will-change:transform}
        .cz-aurora.a1{width:520px;height:520px;top:-160px;left:-80px;background:radial-gradient(circle,rgba(41,151,255,.5),transparent 65%);animation:czFloat1 14s ease-in-out infinite}
        .cz-aurora.a2{width:460px;height:460px;top:-120px;right:-60px;background:radial-gradient(circle,rgba(191,90,242,.45),transparent 65%);animation:czFloat2 18s ease-in-out infinite}
        .cz-aurora.a3{width:380px;height:380px;bottom:-180px;left:38%;background:radial-gradient(circle,rgba(0,200,255,.35),transparent 65%);animation:czFloat3 16s ease-in-out infinite}
        @keyframes czFloat1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,40px) scale(1.12)}}
        @keyframes czFloat2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-50px,30px) scale(1.08)}}
        @keyframes czFloat3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-40px) scale(1.15)}}

        .cz-shimmer{background:linear-gradient(90deg,#2997FF 0%,#5E5CE6 30%,#BF5AF2 55%,#00C8FF 80%,#2997FF 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:czShimmer 6s linear infinite}
        @keyframes czShimmer{0%{background-position:0% 50%}100%{background-position:250% 50%}}

        .cz-rise{opacity:0;transform:translateY(16px);animation:czRise .7s cubic-bezier(.16,1,.3,1) forwards}
        .cz-d1{animation-delay:.05s}.cz-d2{animation-delay:.15s}.cz-d3{animation-delay:.28s}.cz-d4{animation-delay:.4s}.cz-d5{animation-delay:.52s}
        @keyframes czRise{to{opacity:1;transform:translateY(0)}}

        .cz-pin{position:relative;display:inline-flex}
        .cz-pin::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(41,151,255,.6);animation:czPulse 2s ease-out infinite}
        @keyframes czPulse{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.9);opacity:0}}

        .cz-dot{width:8px;height:8px;border-radius:50%;background:#30D158;box-shadow:0 0 0 0 rgba(48,209,88,.6);animation:czBlink 1.8s ease-out infinite}
        @keyframes czBlink{0%{box-shadow:0 0 0 0 rgba(48,209,88,.6)}70%{box-shadow:0 0 0 7px rgba(48,209,88,0)}100%{box-shadow:0 0 0 0 rgba(48,209,88,0)}}

        @media (prefers-reduced-motion: reduce){
          .cz-aurora,.cz-shimmer,.cz-rise,.cz-pin::after,.cz-dot{animation:none!important}
          .cz-rise{opacity:1;transform:none}
          .cz-shimmer{-webkit-text-fill-color:transparent}
        }
      `}} />

      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'LocalBusiness',
            name: `FIXDAY — Técnico a domicilio en ${c.name}`,
            description: `Servicio técnico de computadores a domicilio en ${c.name}, ${c.sector}.`,
            url: `https://fixday.cl/zonas/${c.slug}`,
            telephone: '+56936649332',
            image: 'https://fixday.cl/opengraph-image',
            areaServed: { '@type': 'City', name: c.name, containedInPlace: { '@type': 'State', name: 'Región Metropolitana' } },
            openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '19:00' }],
            priceRange: '$$',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://fixday.cl' },
              { '@type': 'ListItem', position: 2, name: 'Zonas', item: 'https://fixday.cl/zonas' },
              { '@type': 'ListItem', position: 3, name: c.name, item: `https://fixday.cl/zonas/${c.slug}` },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        ],
      })}} />

      {/* Top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-comuna" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/zonas" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Todas las zonas</Link>
            <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
              style={{ background: '#2997FF', color: '#fff', borderRadius: 980, padding: '10px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Agendar visita
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '18px 24px 0' }}>
        <nav aria-label="Ruta de navegación" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#636366', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#86868B', textDecoration: 'none' }}>Inicio</Link>
          <span aria-hidden>/</span>
          <Link href="/zonas" style={{ color: '#86868B', textDecoration: 'none' }}>Zonas</Link>
          <span aria-hidden>/</span>
          <span style={{ color: '#2997FF', fontWeight: 600 }}>{c.name}</span>
        </nav>
      </div>

      {/* Hero animado */}
      <section className="cz-hero" style={{ padding: '48px 0 56px' }}>
        {/* Auroras animadas de fondo */}
        <div className="cz-aurora a1" />
        <div className="cz-aurora a2" />
        <div className="cz-aurora a3" />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 100%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="cz-rise cz-d1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.28)', borderRadius: 980, padding: '7px 18px', fontSize: 11, fontWeight: 700, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            <span className="cz-pin" style={{ alignItems: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
            </span>
            {c.sector} · Santiago
          </div>

          <h1 className="cz-rise cz-d2" style={{ fontSize: 'clamp(2.1rem,5.6vw,3.6rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-.035em', marginBottom: 20, maxWidth: 760 }}>
            Técnico de computadores<br />
            <span className="cz-shimmer">a domicilio en {c.name}</span>
          </h1>

          <p className="cz-rise cz-d3" style={{ fontSize: '1.12rem', color: '#9A9AA0', lineHeight: 1.8, maxWidth: 600, marginBottom: 26 }}>
            Servicio técnico profesional en <strong style={{ color: '#F5F5F7' }}>{c.name}</strong>. Vamos a tu casa u oficina, revisamos tu equipo y lo dejamos funcionando. Sin traslados, sin esperas.
          </p>

          {/* Trust badges */}
          <div className="cz-rise cz-d4" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(48,209,88,.08)', border: '1px solid rgba(48,209,88,.28)', borderRadius: 980, padding: '7px 15px', fontSize: 12.5, color: '#7EE29B', fontWeight: 600 }}>
              <span className="cz-dot" />
              Disponibles hoy en {c.name}
            </span>
            {['7 días de garantía', 'Sin traslados', 'Diagnóstico transparente'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 980, padding: '7px 15px', fontSize: 12.5, color: '#C7C7CC', fontWeight: 500 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                {t}
              </span>
            ))}
          </div>

          <div className="cz-rise cz-d5" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer" className="cz-cta"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 980, padding: '15px 30px', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 30px rgba(37,211,102,.32)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Agendar visita en {c.name}
            </a>
            <Link href="/#contact" className="cz-cta"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', borderRadius: 980, padding: '15px 30px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Formulario de contacto
            </Link>
          </div>
        </div>
      </section>

      {/* Precio visita */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 56px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(41,151,255,.09), rgba(191,90,242,.06))', border: '1px solid rgba(41,151,255,.2)', borderRadius: 18, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 260 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(41,151,255,.14)', border: '1px solid rgba(41,151,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7' }}>Visita a domicilio + diagnóstico en {c.name}</div>
              <div style={{ fontSize: 13, color: '#86868B', marginTop: 2 }}>Si realizamos la reparación, el valor se aplica al total.</div>
            </div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#F5F5F7', letterSpacing: '-.03em', whiteSpace: 'nowrap' }}>$25.000</div>
        </div>
      </div>

      {/* Cómo funciona */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>
            Cómo agendar en {c.name}
          </h2>
          <p style={{ color: '#636366', fontSize: 15, marginBottom: 36 }}>Tres pasos simples y tu equipo queda funcionando.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{ background: '#0C0C0C', border: '1px solid rgba(255,255,255,.07)', borderRadius: 18, padding: '26px 24px', position: 'relative' }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#0071E3,#BF5AF2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7', marginBottom: 7 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#636366', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>
            Servicios técnicos en {c.name}
          </h2>
          <p style={{ color: '#636366', fontSize: 15, marginBottom: 36 }}>
            Todos los servicios incluyen desplazamiento a {c.name} sin costo adicional.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {SERVICES.map(s => (
              <div key={s.title} className="cz-svc" style={{ background: '#111', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7', lineHeight: 1.3 }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: 13, color: '#8A8A8F', lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 14 }}>
                  <span style={{ fontSize: 12, color: '#636366' }}>Desde</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#2997FF' }}>{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué FIXDAY en esta comuna */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: 'clamp(28px,5vw,44px)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 28 }}>
              ¿Por qué elegir FIXDAY en {c.name}?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
              {[
                { title: `Llegamos a ${c.name}`, desc: 'Vamos directo a tu dirección. Sin que tengas que movilizar tu equipo.', icon: <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> },
                { title: 'Respuesta rápida', desc: 'Coordinamos visita el mismo día o al día siguiente según disponibilidad.', icon: <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> },
                { title: '7 días de garantía', desc: 'Si el problema vuelve en 7 días, regresamos sin costo adicional.', icon: <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> },
                { title: 'Diagnóstico claro', desc: 'Te explicamos el problema antes de cobrar cualquier reparación.', icon: <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
              ].map(f => (
                <div key={f.title}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{f.icon}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#F5F5F7' }}>{f.title}</h4>
                  <p style={{ fontSize: 13, color: '#636366', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 28 }}>
            Preguntas frecuentes sobre el servicio en {c.name}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map(({ q, a }) => (
              <details key={q} className="cz-faq" style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, fontSize: '0.92rem', color: '#F5F5F7', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  {q}
                  <span className="cz-faq-plus" style={{ color: '#2997FF', fontSize: 20, flexShrink: 0, transition: 'transform .22s ease', lineHeight: 1 }}>+</span>
                </summary>
                <div style={{ padding: '0 20px 16px', fontSize: '0.86rem', color: '#86868B', lineHeight: 1.7 }}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Comunas cercanas — interlinking */}
      {nearbyLinks.length > 0 && (
        <section style={{ padding: '0 0 72px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-.01em', marginBottom: 6, color: '#F5F5F7' }}>
              También atendemos cerca de {c.name}
            </h2>
            <p style={{ color: '#636366', fontSize: 13.5, marginBottom: 20 }}>Estás en {c.sector.toLowerCase()}. Revisa el servicio en las comunas vecinas:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {nearbyLinks.map(n => (
                <Link key={n.slug} href={`/zonas/${n.slug}`} className="cz-chip"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 980, padding: '9px 18px', fontSize: 13.5, color: '#C7C7CC', textDecoration: 'none', fontWeight: 500 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  {n.name}
                </Link>
              ))}
              <Link href="/zonas" className="cz-chip"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.25)', borderRadius: 980, padding: '9px 18px', fontSize: 13.5, color: '#2997FF', textDecoration: 'none', fontWeight: 600 }}>
                Ver todas las comunas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section style={{ padding: '0 0 100px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(41,151,255,.08), rgba(191,90,242,.06))', border: '1px solid rgba(255,255,255,.09)', borderRadius: 24, padding: 'clamp(36px,6vw,56px) 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: 900, letterSpacing: '-.02em', marginBottom: 12 }}>
              ¿Tu computador tiene problemas en {c.name}?
            </h2>
            <p style={{ color: '#86868B', fontSize: 15, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Escríbenos y agendamos una visita técnica a domicilio en {c.name} para el horario que más te acomode.
            </p>
            <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer" className="cz-cta"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '16px 36px', fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 28px rgba(37,211,102,.3)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#3A3A3C', marginBottom: 8 }}>
          © {new Date().getFullYear()} FIXDAY · Técnico a domicilio en {c.name} y toda la Región Metropolitana
        </p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>Inicio</Link>
          <Link href="/zonas" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>Todas las zonas</Link>
          <Link href="/#contact" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>Contacto</Link>
        </div>
      </footer>
    </div>
  )
}
