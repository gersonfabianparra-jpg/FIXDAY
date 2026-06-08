import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Logo from '@/app/components/Logo'
import MetaPixelEvent from '@/app/components/MetaPixelEvent'
import { SERVICES, getServiceBySlug } from '../services'
import { getPostBySlug } from '@/app/blog/posts'

export function generateStaticParams() {
  return SERVICES.map(s => ({ servicio: s.slug }))
}

export async function generateMetadata({ params }: { params: { servicio: string } }): Promise<Metadata> {
  const s = getServiceBySlug(params.servicio)
  if (!s) return {}
  return {
    title: `${s.title} | FIXDAY`,
    description: s.description,
    alternates: { canonical: `/servicios/${s.slug}` },
    openGraph: {
      title: s.title,
      description: s.description,
      url: `https://fixday.cl/servicios/${s.slug}`,
      siteName: 'FIXDAY',
      locale: 'es_CL',
      type: 'website',
    },
  }
}

const WA_BASE = 'https://wa.me/56936649332?text='

export default function ServicioPage({ params }: { params: { servicio: string } }) {
  const s = getServiceBySlug(params.servicio)
  if (!s) notFound()

  const waMsg = encodeURIComponent(`Hola FIXDAY, necesito el servicio de ${s.shortTitle} a domicilio`)
  const relatedPosts = s.relatedBlogSlugs.map(slug => getPostBySlug(slug)).filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <MetaPixelEvent event="ViewContent" params={{ content_name: s.shortTitle, content_category: 'Servicio técnico', currency: 'CLP', value: parseInt(s.price.replace(/\D/g, ''), 10) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.shortTitle,
            description: s.description,
            provider: {
              '@type': 'LocalBusiness',
              name: 'FIXDAY',
              url: 'https://fixday.cl',
              telephone: '+56936649332',
              areaServed: { '@type': 'State', name: 'Región Metropolitana' },
            },
            areaServed: { '@type': 'State', name: 'Región Metropolitana' },
            url: `https://fixday.cl/servicios/${s.slug}`,
            offers: {
              '@type': 'Offer',
              price: s.price.replace(/[^0-9]/g, ''),
              priceCurrency: 'CLP',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-servicio" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Inicio</Link>
            <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', borderRadius: 980, padding: '10px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Agendar visita
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '64px 0 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(41,151,255,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Servicio a domicilio · Región Metropolitana
          </div>
          <h1 style={{ fontSize: 'clamp(1.7rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: 16 }}>
            {s.title}
          </h1>
          <p style={{ color: '#86868B', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
            {s.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#F5F5F7', letterSpacing: '-.04em', lineHeight: 1 }}>{s.price}</div>
              <div style={{ fontSize: 12, color: '#636366', marginTop: 4 }}>desde</div>
            </div>
            <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 980, padding: '14px 30px', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
              Agendar por WhatsApp
            </a>
          </div>
          <p style={{ fontSize: 11, color: '#3A3A3C', marginTop: 14 }}>{s.priceNote}</p>
        </div>
      </section>

      {/* Qué incluye */}
      <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F5F5F7', marginBottom: 24, letterSpacing: '-.02em' }}>¿Qué incluye el servicio?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {s.includes.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(41,151,255,.15)', border: '1px solid rgba(41,151,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="10" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3 3 7-7" stroke="#2997FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontSize: '0.9rem', color: '#D1D1D6', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F5F5F7', marginBottom: 24, letterSpacing: '-.02em' }}>Preguntas frecuentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {s.faq.map(({ q, a }) => (
              <details key={q} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, fontSize: '0.9rem', color: '#F5F5F7', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q}
                  <span style={{ color: '#2997FF', fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: '0 20px 16px', fontSize: '0.85rem', color: '#86868B', lineHeight: 1.7 }}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedPosts.length > 0 && (
        <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F5F5F7', marginBottom: 20, letterSpacing: '-.02em' }}>Artículos relacionados</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {relatedPosts.map(post => post && (
                <Link key={post.slug} href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '14px 18px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F5F5F7' }}>{post.title}</span>
                  <span style={{ fontSize: 13, color: '#2997FF', fontWeight: 600, flexShrink: 0, marginLeft: 12 }}>Leer →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section style={{ padding: '52px 0 72px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ color: '#636366', fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.7 }}>
            Atendemos de lunes a viernes de 8:00 a 19:00 hrs en toda la Región Metropolitana. Respondemos en menos de 1 hora.
          </p>
          <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 980, padding: '14px 30px', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none' }}>
            Agendar {s.shortTitle}
          </a>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>← Inicio</Link>
            <Link href="/zonas" style={{ fontSize: 13, color: '#636366', textDecoration: 'none' }}>Ver zonas</Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile</div>
      </footer>
    </div>
  )
}
