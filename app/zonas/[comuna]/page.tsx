import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { COMUNAS, getComunaBySlug } from '../comunas'

export function generateStaticParams() {
  return COMUNAS.map(c => ({ comuna: c.slug }))
}

export async function generateMetadata({ params }: { params: { comuna: string } }): Promise<Metadata> {
  const c = getComunaBySlug(params.comuna)
  if (!c) return {}
  return {
    title: `Técnico Computadores a Domicilio en ${c.name} | FIXDAY`,
    description: `Servicio técnico de computadores a domicilio en ${c.name}. Mantención, recuperación de datos, instalación de Windows, optimización y WiFi. Visita + diagnóstico $15.000. Rápido, confiable y profesional.`,
    alternates: { canonical: `/zonas/${c.slug}` },
    openGraph: {
      title: `Técnico a Domicilio en ${c.name} | FIXDAY`,
      description: `Reparación de computadores en ${c.name}. Servicio profesional, rápido y transparente.`,
    },
  }
}

const SERVICES = [
  { title: 'Mantención de PC', desc: 'Limpieza interna, pasta térmica, drivers y sistema operativo.', price: '$25.000' },
  { title: 'Instalación de Windows', desc: 'Windows 10 u 11, drivers, antivirus y programas esenciales.', price: '$30.000' },
  { title: 'Recuperación de datos', desc: 'Discos dañados, formateados o con particiones corruptas.', price: '$35.000' },
  { title: 'Optimización del sistema', desc: 'Eliminamos malware y procesos que frenan tu equipo.', price: '$20.000' },
  { title: 'Respaldo de información', desc: 'Copia segura de tus archivos, fotos y documentos.', price: '$15.000' },
  { title: 'WiFi y repetidores', desc: 'Configuración de router y cobertura completa en tu hogar.', price: '$30.000' },
]

const WA_BASE = 'https://wa.me/56936649332?text='

export default function ComunaPage({ params }: { params: { comuna: string } }) {
  const c = getComunaBySlug(params.comuna)
  if (!c) notFound()

  const waMsg = encodeURIComponent(`Hola FIXDAY, necesito un técnico a domicilio en ${c.name}`)

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'FIXDAY',
        description: `Servicio técnico de computadores a domicilio en ${c.name}, ${c.sector}.`,
        url: `https://fixday.cl/zonas/${c.slug}`,
        telephone: '+56936649332',
        areaServed: { '@type': 'City', name: c.name, containedInPlace: { '@type': 'State', name: 'Región Metropolitana' } },
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '19:00' }],
        priceRange: '$$',
      })}} />

      {/* Top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <svg viewBox="0 0 42 42" fill="none" style={{ width: 34, height: 34 }}>
              <defs>
                <linearGradient id="nbg" x1="1" y1="1" x2="41" y2="41" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#0A0D18"/><stop offset="100%" stopColor="#060608"/></linearGradient>
                <linearGradient id="ngd" x1="4" y1="21" x2="38" y2="21" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#2997FF"/><stop offset="100%" stopColor="#BF5AF2"/></linearGradient>
              </defs>
              <rect x="1" y="1" width="40" height="40" rx="8" fill="url(#nbg)" stroke="url(#ngd)" strokeWidth="1.5"/>
              <path d="M 4 12 L 21 12 L 21 16 L 10 16 L 10 19 L 17 19 L 17 23 L 10 23 L 10 30 L 4 30 Z" fill="url(#ngd)"/>
              <path d="M 21 12 L 26 12 Q 38 12 38 21 Q 38 30 26 30 L 21 30 L 21 26 L 26 26 Q 32 26 32 21 Q 32 16 26 16 L 21 16 Z" fill="url(#ngd)"/>
              <line x1="21" y1="12" x2="21" y2="30" stroke="#08090F" strokeWidth="1.5"/>
            </svg>
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

      {/* Hero */}
      <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(41,151,255,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            {c.sector} · Santiago
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: 20, maxWidth: 700 }}>
            Técnico de computadores<br />
            <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              a domicilio en {c.name}
            </span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#86868B', lineHeight: 1.8, maxWidth: 600, marginBottom: 16 }}>
            Servicio técnico profesional en <strong style={{ color: '#F5F5F7' }}>{c.name}</strong>. Vamos a tu casa u oficina, revisamos tu equipo y lo dejamos funcionando. Sin traslados, sin esperas.
          </p>
          <p style={{ fontSize: '0.95rem', color: '#636366', marginBottom: 36 }}>
            También atendemos: {c.nearby.join(', ')} y toda la Región Metropolitana.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2997FF', color: '#fff', borderRadius: 980, padding: '14px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              Agendar visita en {c.name}
            </a>
            <Link href="/#contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', borderRadius: 980, padding: '14px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Formulario de contacto
            </Link>
          </div>
        </div>
      </section>

      {/* Precio visita */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ background: 'rgba(41,151,255,.06)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 16, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span style={{ fontSize: 14, color: '#C7C7CC' }}>
            <strong style={{ color: '#F5F5F7' }}>Visita a domicilio en {c.name} + diagnóstico: $15.000</strong>
            {' '}— si realizamos la reparación, ese valor se aplica al total del servicio.
          </span>
        </div>
      </div>

      {/* Servicios */}
      <section style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>
            Servicios técnicos en {c.name}
          </h2>
          <p style={{ color: '#636366', fontSize: 15, marginBottom: 36 }}>
            Todos los servicios incluyen desplazamiento a {c.name} sin costo adicional.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{ background: '#111', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7' }}>{s.title}</h3>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#2997FF', whiteSpace: 'nowrap', marginLeft: 12 }}>Desde {s.price}</span>
                </div>
                <p style={{ fontSize: 13, color: '#636366', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué FIXDAY en esta comuna */}
      <section style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 24 }}>
              ¿Por qué elegir FIXDAY en {c.name}?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {[
                { icon: '📍', title: `Llegamos a ${c.name}`, desc: 'Vamos directo a tu dirección. Sin que tengas que movilizar tu equipo.' },
                { icon: '⚡', title: 'Respuesta rápida', desc: 'Coordinamos visita el mismo día o al día siguiente según disponibilidad.' },
                { icon: '🛡️', title: '7 días de garantía', desc: 'Si el problema vuelve en 7 días, regresamos sin costo adicional.' },
                { icon: '💬', title: 'Diagnóstico claro', desc: 'Te explicamos el problema antes de cobrar cualquier reparación.' },
              ].map(f => (
                <div key={f.title}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#F5F5F7' }}>{f.title}</h4>
                  <p style={{ fontSize: 13, color: '#636366', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: '0 0 100px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, marginBottom: 12 }}>
            ¿Tu computador tiene problemas en {c.name}?
          </h2>
          <p style={{ color: '#636366', fontSize: 15, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Escríbenos y agendamos una visita técnica a domicilio en {c.name} para el horario que más te acomode.
          </p>
          <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '16px 36px', fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 28px rgba(37,211,102,.3)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Contactar por WhatsApp
          </a>
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
