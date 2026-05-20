import { Metadata } from 'next'
import Link from 'next/link'
import nextDynamic from 'next/dynamic'
import { COMUNAS } from './comunas'

export const dynamic = 'force-dynamic'

const MapaZonas = nextDynamic(() => import('./MapaZonas'), { ssr: false, loading: () => (
  <div style={{ height: '100%', background: '#0a0a0a', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ color: '#636366', fontSize: 13 }}>Cargando mapa…</div>
  </div>
) })

export const metadata: Metadata = {
  title: 'Zonas de cobertura — FIXDAY Técnico a Domicilio en Santiago',
  description: 'Atendemos toda la Región Metropolitana. Servicio técnico de computadores a domicilio en Providencia, Las Condes, Maipú, La Florida, Ñuñoa, Puente Alto y más de 40 comunas.',
  keywords: 'técnico computadores a domicilio providencia, reparación pc las condes, técnico pc maipú, reparación computador ñuñoa, técnico pc la florida, servicio técnico santiago centro',
}

const SECTORS = [
  {
    name: 'Sector Centro',
    desc: 'Atendemos el corazón de Santiago y sus alrededores con tiempos de respuesta rápidos.',
    comunas: ['Santiago','Independencia','Recoleta','Conchalí','Cerro Navia','Quinta Normal','Estación Central'],
  },
  {
    name: 'Sector Oriente',
    desc: 'Cobertura completa en las comunas del sector oriente, incluyendo las comunas altas.',
    comunas: ['Providencia','Las Condes','Vitacura','Lo Barnechea','Ñuñoa','La Reina','Peñalolén'],
  },
  {
    name: 'Sector Sur-Oriente',
    desc: 'Llegamos a La Florida y todas las comunas del sector sur-oriente de Santiago.',
    comunas: ['La Florida','Macul','San Joaquín','La Granja','San Ramón','La Pintana','Puente Alto'],
  },
  {
    name: 'Sector Sur',
    desc: 'Cobertura total en el sector sur, desde San Miguel hasta San Bernardo.',
    comunas: ['San Miguel','La Cisterna','El Bosque','Pedro Aguirre Cerda','Lo Espejo','San Bernardo','Buin'],
  },
  {
    name: 'Sector Poniente',
    desc: 'Atendemos Maipú y todas las comunas del poniente con rapidez y profesionalismo.',
    comunas: ['Maipú','Pudahuel','Cerrillos','Lo Prado','Renca','Pudahuel','Quilicura','Lampa'],
  },
  {
    name: 'Sector Norte',
    desc: 'Presencia en el sector norte de la Región Metropolitana.',
    comunas: ['Quilicura','Huechuraba','Colina','Til Til','Lampa','Lo Barnechea'],
  },
]

const WA = `https://wa.me/56936649332?text=${encodeURIComponent('Hola FIXDAY, quiero agendar una visita técnica a domicilio')}`

export default function ZonasPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>

      {/* Top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: '#fff' }}>F</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-.02em', color: '#fff', lineHeight: 1 }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ background: '#2997FF', color: '#fff', borderRadius: 980, padding: '10px 22px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            Agendar visita
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '88px 0 72px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(41,151,255,.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.22)', borderRadius: 980, padding: '7px 18px', fontSize: 12, fontWeight: 600, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 28 }}>
            Región Metropolitana
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: 20, color: '#F5F5F7' }}>
            Llevamos el taller<br />
            <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              a tu comuna
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#86868B', lineHeight: 1.8, marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
            Atendemos más de <strong style={{ color: '#F5F5F7' }}>40 comunas</strong> de la Región Metropolitana. Sin traslados, sin esperas, en el horario que te acomode.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#2997FF', color: '#fff', borderRadius: 980, padding: '14px 32px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Consultar disponibilidad
          </a>
        </div>
      </section>

      {/* Mapa */}
      <section style={{ padding: '0 0 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ position: 'relative', height: 480, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,.09)' }}>
            <MapaZonas />
            {/* Leyenda */}
            <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 1000, background: 'rgba(8,9,15,.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: 'rgba(41,151,255,.35)', border: '1.5px solid #2997FF' }} />
                <span style={{ color: '#F5F5F7', fontWeight: 600 }}>Comunas atendidas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: 'rgba(26,26,46,.7)', border: '0.5px solid rgba(255,255,255,.1)' }} />
                <span style={{ color: '#636366' }}>Fuera de cobertura</span>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#3A3A3C', marginTop: 12 }}>
            Pasa el cursor sobre una comuna para ver su nombre · Scroll desactivado — usa los botones +/−
          </p>
        </div>
      </section>

      {/* Sector grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {SECTORS.map(sector => (
              <div key={sector.name} style={{ background: '#111', border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: '32px 28px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2997FF', marginBottom: 8, letterSpacing: '-.01em' }}>
                  {sector.name}
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#636366', lineHeight: 1.7, marginBottom: 22 }}>
                  {sector.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {sector.comunas.map(c => {
                    const slug = COMUNAS.find(x => x.name === c)?.slug
                    return slug ? (
                      <Link key={c} href={`/zonas/${slug}`} style={{ background: 'rgba(41,151,255,.07)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 8, padding: '5px 12px', fontSize: '0.82rem', fontWeight: 500, color: '#C7C7CC', textDecoration: 'none', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(41,151,255,.18)'; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(41,151,255,.07)'; e.currentTarget.style.color = '#C7C7CC' }}>
                        {c}
                      </Link>
                    ) : (
                      <span key={c} style={{ background: 'rgba(41,151,255,.07)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 8, padding: '5px 12px', fontSize: '0.82rem', fontWeight: 500, color: '#C7C7CC' }}>
                        {c}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* SEO content block */}
          <div style={{ marginTop: 72, background: '#0A0A0A', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '44px 40px', maxWidth: 800, margin: '72px auto 0' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16, letterSpacing: '-.02em' }}>
              Técnico de computadores a domicilio en Santiago
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#86868B', lineHeight: 1.85, marginBottom: 20 }}>
              FIXDAY ofrece servicio técnico de computadores a domicilio en toda la Región Metropolitana. Nuestro técnico va directamente a tu casa o empresa, sin que tengas que trasladar tu equipo. Atendemos problemas de software, hardware, redes WiFi, recuperación de datos y mucho más.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#86868B', lineHeight: 1.85 }}>
              Visita a domicilio y diagnóstico técnico: <strong style={{ color: '#F5F5F7' }}>$15.000</strong>. Si reparamos tu equipo, ese valor se aplica al total del servicio. Horario de atención de lunes a viernes, de 8:00 a 19:00 hrs.
            </p>
          </div>

          {/* CTA final */}
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <p style={{ color: '#636366', fontSize: 15, marginBottom: 20 }}>¿No ves tu comuna? Escríbenos, probablemente igual llegamos.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#25D366', color: '#fff', borderRadius: 980, padding: '14px 32px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              Consultar por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '28px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>
          © {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile
        </div>
        <Link href="/" style={{ display: 'inline-block', marginTop: 6, fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </footer>
    </div>
  )
}
