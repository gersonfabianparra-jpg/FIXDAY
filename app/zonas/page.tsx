import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import MapaWrapper from './MapaWrapper'
import SectorsGrid from './SectorsGrid'

export const metadata: Metadata = {
  title: 'Zonas de cobertura — FIXDAY Técnico a Domicilio en Santiago',
  description: 'Atendemos toda la Región Metropolitana. Servicio técnico de computadores a domicilio en Providencia, Las Condes, Maipú, La Florida, Ñuñoa, Puente Alto y más de 40 comunas.',
  keywords: 'técnico computadores a domicilio providencia, reparación pc las condes, técnico pc maipú, reparación computador ñuñoa, técnico pc la florida, servicio técnico santiago centro',
}

const WA = `https://wa.me/56936649332?text=${encodeURIComponent('Hola FIXDAY, quiero agendar una visita técnica a domicilio')}`

export default function ZonasPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cz-cta{transition:transform .2s ease,box-shadow .2s ease}
        .cz-cta:hover{transform:translateY(-2px)}
      `}} />

      {/* Top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-zonas" />
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
          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#86868B', lineHeight: 1.8, marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>
            Atendemos más de <strong style={{ color: '#F5F5F7' }}>40 comunas</strong> de la Región Metropolitana. Sin traslados, sin esperas, en el horario que te acomode.
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
            {['+40 comunas', 'Visita el mismo día', '7 días de garantía', 'Sin traslados'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 980, padding: '7px 15px', fontSize: 12.5, color: '#C7C7CC', fontWeight: 500 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                {t}
              </span>
            ))}
          </div>

          <a href={WA} target="_blank" rel="noopener noreferrer" className="cz-cta"
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
            <MapaWrapper />
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

      {/* Cómo funciona */}
      <section style={{ padding: '20px 0 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>
              Cómo agendar tu visita
            </h2>
            <p style={{ color: '#636366', fontSize: 15 }}>Tres pasos simples y tu equipo queda funcionando.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {[
              { n: '1', title: 'Escríbenos por WhatsApp', desc: 'Cuéntanos qué le pasa a tu equipo. Te respondemos en menos de una hora.' },
              { n: '2', title: 'Coordinamos la visita', desc: 'Agendamos el mismo día o al día siguiente, en el horario que te acomode.' },
              { n: '3', title: 'Reparamos en tu casa', desc: 'Diagnóstico claro, presupuesto sin sorpresas y solución en el lugar.' },
            ].map(s => (
              <div key={s.n} style={{ background: '#0C0C0C', border: '1px solid rgba(255,255,255,.07)', borderRadius: 18, padding: '26px 24px' }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#0071E3,#BF5AF2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7', marginBottom: 7 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#636366', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectorsGrid />

          {/* SEO content block */}
          <div style={{ marginTop: 72, background: '#0A0A0A', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '44px 40px', maxWidth: 800, margin: '72px auto 0' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16, letterSpacing: '-.02em' }}>
              Técnico de computadores a domicilio en Santiago
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#86868B', lineHeight: 1.85, marginBottom: 20 }}>
              FIXDAY ofrece servicio técnico de computadores a domicilio en toda la Región Metropolitana. Nuestro técnico va directamente a tu casa o empresa, sin que tengas que trasladar tu equipo. Atendemos problemas de software, hardware, redes WiFi, recuperación de datos y mucho más.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#86868B', lineHeight: 1.85 }}>
              Visita a domicilio y diagnóstico técnico: <strong style={{ color: '#F5F5F7' }}>$20.000</strong>. Si reparamos tu equipo, ese valor se aplica al total del servicio. Horario de atención de lunes a viernes, de 8:00 a 19:00 hrs.
            </p>
          </div>

          {/* Precio destacado */}
          <div style={{ maxWidth: 800, margin: '32px auto 0' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(41,151,255,.09), rgba(191,90,242,.06))', border: '1px solid rgba(41,151,255,.2)', borderRadius: 18, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 240 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(41,151,255,.14)', border: '1px solid rgba(41,151,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F7' }}>Visita a domicilio + diagnóstico</div>
                  <div style={{ fontSize: 13, color: '#86868B', marginTop: 2 }}>Se aplica al total si realizamos la reparación.</div>
                </div>
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: '#F5F5F7', letterSpacing: '-.03em', whiteSpace: 'nowrap' }}>$20.000</div>
            </div>
          </div>

          {/* CTA final */}
          <div style={{ marginTop: 48 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(41,151,255,.08), rgba(191,90,242,.06))', border: '1px solid rgba(255,255,255,.09)', borderRadius: 24, padding: 'clamp(36px,6vw,52px) 24px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2rem)', fontWeight: 900, letterSpacing: '-.02em', marginBottom: 12 }}>
                ¿No ves tu comuna?
              </h2>
              <p style={{ color: '#86868B', fontSize: 15, marginBottom: 28, maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.7 }}>
                Escríbenos, probablemente igual llegamos. Atendemos toda la Región Metropolitana.
              </p>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="cz-cta"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '16px 36px', fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 28px rgba(37,211,102,.3)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                Consultar por WhatsApp
              </a>
            </div>
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
