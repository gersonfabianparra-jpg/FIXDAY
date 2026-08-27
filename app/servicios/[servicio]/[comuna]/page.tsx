import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, getServiceBySlug } from '../../services'
import { COMUNAS, getComunaBySlug } from '../../../zonas/comunas'
import Logo from '@/app/components/Logo'

// 6 servicios × 40 comunas = 240 landing pages long-tail
export function generateStaticParams() {
  return SERVICES.flatMap(s => COMUNAS.map(c => ({ servicio: s.slug, comuna: c.slug })))
}

export async function generateMetadata({ params }: { params: { servicio: string; comuna: string } }): Promise<Metadata> {
  const s = getServiceBySlug(params.servicio)
  const c = getComunaBySlug(params.comuna)
  if (!s || !c) return {}
  const url = `https://fixday.cl/servicios/${s.slug}/${c.slug}`
  return {
    title: `${s.shortTitle} a Domicilio en ${c.name} | FIXDAY`,
    description: `${s.shortTitle} a domicilio en ${c.name}, ${c.sector}. Técnico profesional que va a tu casa u oficina. ${s.price} · visita + diagnóstico $20.000. Agenda hoy.`,
    alternates: { canonical: `/servicios/${s.slug}/${c.slug}` },
    openGraph: {
      title: `${s.shortTitle} a Domicilio en ${c.name} | FIXDAY`,
      description: `${s.shortTitle} en ${c.name}. Servicio técnico a domicilio, rápido y transparente.`,
      url,
      siteName: 'FIXDAY',
      locale: 'es_CL',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${s.shortTitle} en ${c.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${s.shortTitle} a Domicilio en ${c.name} | FIXDAY`,
      description: `${s.shortTitle} en ${c.name}. Servicio técnico a domicilio profesional.`,
    },
  }
}

const stroke = { fill: 'none', stroke: '#2997FF', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const WA_BASE = 'https://wa.me/56936649332?text='

const STEPS = [
  { n: '1', title: 'Escríbenos por WhatsApp', desc: 'Cuéntanos qué necesitas. Te respondemos en menos de una hora.' },
  { n: '2', title: 'Coordinamos la visita', desc: 'Agendamos el mismo día o al día siguiente, en el horario que te acomode.' },
  { n: '3', title: 'Resolvemos en tu casa', desc: 'Diagnóstico claro, presupuesto sin sorpresas y solución en el lugar.' },
]

export default function ServicioComunaPage({ params }: { params: { servicio: string; comuna: string } }) {
  const s = getServiceBySlug(params.servicio)
  const c = getComunaBySlug(params.comuna)
  if (!s || !c) notFound()

  const waMsg = encodeURIComponent(`Hola FIXDAY, necesito ${s.shortTitle} a domicilio en ${c.name}`)
  const url = `https://fixday.cl/servicios/${s.slug}/${c.slug}`

  // Comunas cercanas con página de este mismo servicio → interlinking
  const nearbyLinks = c.nearby
    .map(name => COMUNAS.find(x => x.name === name))
    .filter((x): x is (typeof COMUNAS)[number] => Boolean(x))

  // Otros servicios en esta misma comuna → interlinking
  const otherServices = SERVICES.filter(x => x.slug !== s.slug)

  // FAQ: una específica de la comuna al inicio + las del servicio
  const faqs = [
    { q: `¿Hacen ${s.shortTitle.toLowerCase()} a domicilio en ${c.name}?`, a: `Sí. Ofrecemos ${s.shortTitle.toLowerCase()} a domicilio en ${c.name} y en todo el ${c.sector.toLowerCase()} de Santiago. El técnico llega a tu casa u oficina con todas las herramientas necesarias, sin que tengas que trasladar tu equipo.` },
    ...s.faq,
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cz-svc{transition:transform .22s ease,border-color .22s ease,background .22s ease}
        .cz-svc:hover{transform:translateY(-3px);border-color:rgba(41,151,255,.35);background:#141414}
        .cz-chip{transition:background .2s ease,border-color .2s ease,color .2s ease}
        .cz-chip:hover{background:rgba(41,151,255,.14);border-color:rgba(41,151,255,.4);color:#fff}
        .cz-cta{transition:transform .2s ease,box-shadow .2s ease}
        .cz-cta:hover{transform:translateY(-2px)}
        .cz-faq[open] .cz-faq-plus{transform:rotate(45deg)}
        .cz-faq summary::-webkit-details-marker{display:none}
        .cz-hero{position:relative;overflow:hidden}
        .cz-aurora{position:absolute;border-radius:50%;filter:blur(64px);pointer-events:none;opacity:.9;will-change:transform,opacity;mix-blend-mode:screen}
        .cz-aurora.a1{width:640px;height:640px;top:-200px;left:-120px;background:radial-gradient(circle,rgba(41,151,255,.95),transparent 62%);animation:czFloat1 8s ease-in-out infinite}
        .cz-aurora.a2{width:600px;height:600px;top:-160px;right:-100px;background:radial-gradient(circle,rgba(191,90,242,.9),transparent 62%);animation:czFloat2 9.5s ease-in-out infinite}
        .cz-aurora.a3{width:520px;height:520px;bottom:-240px;left:34%;background:radial-gradient(circle,rgba(0,200,255,.8),transparent 62%);animation:czFloat3 7.5s ease-in-out infinite}
        @keyframes czFloat1{0%,100%{transform:translate(0,0) scale(1);opacity:.75}50%{transform:translate(150px,90px) scale(1.35);opacity:1}}
        @keyframes czFloat2{0%,100%{transform:translate(0,0) scale(1);opacity:.7}50%{transform:translate(-130px,70px) scale(1.3);opacity:1}}
        @keyframes czFloat3{0%,100%{transform:translate(0,0) scale(.95);opacity:.65}50%{transform:translate(90px,-90px) scale(1.4);opacity:1}}
        .cz-glow{position:absolute;top:34%;left:8%;width:min(560px,80%);height:280px;border-radius:50%;filter:blur(80px);background:radial-gradient(circle,rgba(94,92,230,.55),transparent 68%);pointer-events:none;animation:czBreathe 3.4s ease-in-out infinite}
        @keyframes czBreathe{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:.85;transform:scale(1.15)}}
        .cz-shimmer{background:linear-gradient(90deg,#2997FF 0%,#5E5CE6 22%,#BF5AF2 42%,#FF6B9D 60%,#00C8FF 82%,#2997FF 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:czShimmer 3s linear infinite}
        @keyframes czShimmer{0%{background-position:0% 50%}100%{background-position:220% 50%}}
        .cz-rise{opacity:0;transform:translateY(22px);animation:czRise .6s cubic-bezier(.16,1,.3,1) forwards}
        .cz-d1{animation-delay:.05s}.cz-d2{animation-delay:.14s}.cz-d3{animation-delay:.26s}.cz-d4{animation-delay:.38s}.cz-d5{animation-delay:.5s}
        @keyframes czRise{to{opacity:1;transform:translateY(0)}}
        .cz-pin{position:relative;display:inline-flex}
        .cz-pin::after{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(41,151,255,.75);animation:czPulse 1.5s ease-out infinite}
        .cz-pin::before{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(41,151,255,.55);animation:czPulse 1.5s ease-out .75s infinite}
        @keyframes czPulse{0%{transform:scale(.6);opacity:1}100%{transform:scale(2.6);opacity:0}}
        .cz-dot{width:9px;height:9px;border-radius:50%;background:#30D158;box-shadow:0 0 8px rgba(48,209,88,.9),0 0 0 0 rgba(48,209,88,.7);animation:czBlink 1.3s ease-out infinite}
        @keyframes czBlink{0%{box-shadow:0 0 8px rgba(48,209,88,.9),0 0 0 0 rgba(48,209,88,.7)}70%{box-shadow:0 0 8px rgba(48,209,88,.5),0 0 0 12px rgba(48,209,88,0)}100%{box-shadow:0 0 8px rgba(48,209,88,.9),0 0 0 0 rgba(48,209,88,0)}}
        @media (prefers-reduced-motion: reduce){
          .cz-aurora,.cz-glow,.cz-shimmer,.cz-rise,.cz-pin::after,.cz-pin::before,.cz-dot{animation:none!important}
          .cz-rise{opacity:1;transform:none}
        }
      `}} />

      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            name: `${s.shortTitle} a domicilio en ${c.name}`,
            serviceType: s.shortTitle,
            description: `${s.shortTitle} a domicilio en ${c.name}, ${c.sector}. ${s.description}`,
            provider: {
              '@type': 'LocalBusiness',
              '@id': 'https://fixday.cl/#business',
              name: 'FIXDAY',
              url: 'https://fixday.cl',
              telephone: '+56936649332',
            },
            areaServed: { '@type': 'City', name: c.name, containedInPlace: { '@type': 'State', name: 'Región Metropolitana' } },
            url,
            offers: { '@type': 'Offer', price: s.price.replace(/[^0-9]/g, ''), priceCurrency: 'CLP', availability: 'https://schema.org/InStock' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://fixday.cl' },
              { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://fixday.cl/servicios' },
              { '@type': 'ListItem', position: 3, name: s.shortTitle, item: `https://fixday.cl/servicios/${s.slug}` },
              { '@type': 'ListItem', position: 4, name: c.name, item: url },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
          },
        ],
      })}} />

      {/* Top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-svc-comuna" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href={`/zonas/${c.slug}`} style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← {c.name}</Link>
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
          <Link href={`/servicios/${s.slug}`} style={{ color: '#86868B', textDecoration: 'none' }}>{s.shortTitle}</Link>
          <span aria-hidden>/</span>
          <span style={{ color: '#2997FF', fontWeight: 600 }}>{c.name}</span>
        </nav>
      </div>

      {/* Hero animado */}
      <section className="cz-hero" style={{ padding: '48px 0 56px' }}>
        <div className="cz-aurora a1" />
        <div className="cz-aurora a2" />
        <div className="cz-aurora a3" />
        <div className="cz-glow" />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 65% at 50% 25%, rgba(0,0,0,0) 0%, rgba(0,0,0,.42) 100%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="cz-rise cz-d1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.28)', borderRadius: 980, padding: '7px 18px', fontSize: 11, fontWeight: 700, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            <span className="cz-pin" style={{ alignItems: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
            </span>
            {c.name} · {c.sector}
          </div>

          <h1 className="cz-rise cz-d2" style={{ fontSize: 'clamp(2.1rem,5.6vw,3.6rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-.035em', marginBottom: 20, maxWidth: 780 }}>
            {s.shortTitle}<br />
            <span className="cz-shimmer">a domicilio en {c.name}</span>
          </h1>

          <p className="cz-rise cz-d3" style={{ fontSize: '1.12rem', color: '#9A9AA0', lineHeight: 1.8, maxWidth: 620, marginBottom: 26 }}>
            {s.description.replace(/Santiago( y Región Metropolitana)?/g, c.name)} Un técnico llega a tu casa u oficina en <strong style={{ color: '#F5F5F7' }}>{c.name}</strong> y lo resuelve en el lugar.
          </p>

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
              Agendar {s.shortTitle.toLowerCase()} en {c.name}
            </a>
            <Link href={`/servicios/${s.slug}`} className="cz-cta"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', borderRadius: 980, padding: '15px 30px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Ver detalle del servicio
            </Link>
          </div>
        </div>
      </section>

      {/* Precio */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 56px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(41,151,255,.09), rgba(191,90,242,.06))', border: '1px solid rgba(41,151,255,.2)', borderRadius: 18, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 260 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(41,151,255,.14)', border: '1px solid rgba(41,151,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7' }}>{s.shortTitle} en {c.name}</div>
              <div style={{ fontSize: 13, color: '#86868B', marginTop: 2 }}>{s.priceNote}</div>
            </div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#F5F5F7', letterSpacing: '-.03em', whiteSpace: 'nowrap' }}>Desde {s.price}</div>
        </div>
      </div>

      {/* Cómo funciona */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>Cómo agendar en {c.name}</h2>
          <p style={{ color: '#636366', fontSize: 15, marginBottom: 36 }}>Tres pasos simples y tu equipo queda funcionando.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {STEPS.map(st => (
              <div key={st.n} style={{ background: '#0C0C0C', border: '1px solid rgba(255,255,255,.07)', borderRadius: 18, padding: '26px 24px' }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#0071E3,#BF5AF2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 16 }}>{st.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7', marginBottom: 7 }}>{st.title}</h3>
                <p style={{ fontSize: 13, color: '#636366', lineHeight: 1.7 }}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>¿Qué incluye {s.shortTitle.toLowerCase()} en {c.name}?</h2>
          <p style={{ color: '#636366', fontSize: 15, marginBottom: 28 }}>El servicio incluye desplazamiento a {c.name} sin costo adicional.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {s.includes.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', background: '#0C0C0C', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, padding: '14px 18px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6L9 17l-5-5"/></svg>
                <span style={{ fontSize: 14, color: '#C7C7CC', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 28 }}>Preguntas frecuentes · {s.shortTitle} en {c.name}</h2>
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

      {/* Interlinking: mismo servicio en comunas cercanas */}
      {nearbyLinks.length > 0 && (
        <section style={{ padding: '0 0 56px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6, color: '#F5F5F7' }}>{s.shortTitle} cerca de {c.name}</h2>
            <p style={{ color: '#636366', fontSize: 13.5, marginBottom: 20 }}>También hacemos {s.shortTitle.toLowerCase()} a domicilio en:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {nearbyLinks.map(n => (
                <Link key={n.slug} href={`/servicios/${s.slug}/${n.slug}`} className="cz-chip"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 980, padding: '9px 18px', fontSize: 13.5, color: '#C7C7CC', textDecoration: 'none', fontWeight: 500 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  {s.shortTitle} en {n.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interlinking: otros servicios en esta comuna */}
      <section style={{ padding: '0 0 72px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6, color: '#F5F5F7' }}>Otros servicios técnicos en {c.name}</h2>
          <p style={{ color: '#636366', fontSize: 13.5, marginBottom: 20 }}>Todo el soporte para tu computador, a domicilio en {c.name}:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {otherServices.map(os => (
              <Link key={os.slug} href={`/servicios/${os.slug}/${c.slug}`} className="cz-chip"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(41,151,255,.06)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 980, padding: '9px 18px', fontSize: 13.5, color: '#C7C7CC', textDecoration: 'none', fontWeight: 500 }}>
                {os.shortTitle} en {c.name}
              </Link>
            ))}
            <Link href={`/zonas/${c.slug}`} className="cz-chip"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.25)', borderRadius: 980, padding: '9px 18px', fontSize: 13.5, color: '#2997FF', textDecoration: 'none', fontWeight: 600 }}>
              Ver todo en {c.name} →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: '0 0 100px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(41,151,255,.08), rgba(191,90,242,.06))', border: '1px solid rgba(255,255,255,.09)', borderRadius: 24, padding: 'clamp(36px,6vw,56px) 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: 900, letterSpacing: '-.02em', marginBottom: 12 }}>
              {s.shortTitle} a domicilio en {c.name}
            </h2>
            <p style={{ color: '#86868B', fontSize: 15, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Escríbenos y agendamos tu {s.shortTitle.toLowerCase()} a domicilio en {c.name} para el horario que más te acomode.
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
          © {new Date().getFullYear()} FIXDAY · {s.shortTitle} a domicilio en {c.name} y toda la Región Metropolitana
        </p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>Inicio</Link>
          <Link href={`/servicios/${s.slug}`} style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>{s.shortTitle}</Link>
          <Link href={`/zonas/${c.slug}`} style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>{c.name}</Link>
        </div>
      </footer>
    </div>
  )
}
