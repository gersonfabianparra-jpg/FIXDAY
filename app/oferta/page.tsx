import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'

export const metadata: Metadata = {
  title: 'Oferta de Lanzamiento — Visita + Diagnóstico $10.000 | FIXDAY',
  description: 'Por tiempo limitado: visita a domicilio + diagnóstico técnico por solo $10.000 (valor normal $15.000). Técnico certificado en toda la Región Metropolitana.',
  openGraph: {
    title: 'FIXDAY — Visita + Diagnóstico $10.000 🔧',
    description: 'Oferta de lanzamiento: técnico a domicilio en toda la RM. Diagnóstico incluido, sin traslados, mismo día.',
    url: 'https://fixday.cl/oferta',
    siteName: 'FIXDAY',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIXDAY — Visita + Diagnóstico $10.000 🔧',
    description: 'Oferta de lanzamiento: técnico a domicilio en toda la RM. Sin traslados, mismo día.',
  },
}

const WA = `https://wa.me/56936649332?text=${encodeURIComponent('Hola FIXDAY, vi la oferta de lanzamiento y quiero agendar una visita técnica a domicilio')}`

export default function OfertaPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>

      {/* Top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-oferta" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-.02em', color: '#fff', lineHeight: 1 }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ background: '#25D366', color: '#fff', borderRadius: 980, padding: '10px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            Agendar ahora
          </a>
        </div>
      </nav>

      {/* Hero oferta */}
      <section style={{ padding: '72px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(41,151,255,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* Badge oferta */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,59,48,.1)', border: '1px solid rgba(255,59,48,.3)', borderRadius: 980, padding: '7px 18px', fontSize: 12, fontWeight: 700, color: '#FF3B30', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 28 }}>
            ⏳ Oferta de lanzamiento — por tiempo limitado
          </div>

          <h1 style={{ fontSize: 'clamp(2rem,5.5vw,3.8rem)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-.03em', marginBottom: 20, color: '#F5F5F7' }}>
            Visita a domicilio<br />
            <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              + diagnóstico técnico
            </span>
          </h1>

          {/* Precio tachado → precio oferta */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
            <span style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', color: '#3A3A3C', textDecoration: 'line-through', fontWeight: 600 }}>$15.000</span>
            <span style={{ fontSize: 'clamp(2.8rem,7vw,5rem)', fontWeight: 900, color: '#F5F5F7', letterSpacing: '-.04em', lineHeight: 1 }}>$10.000</span>
          </div>

          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', color: '#86868B', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 40px' }}>
            Un técnico certificado va a tu casa, revisa tu equipo y te entrega un diagnóstico con el problema y el presupuesto. <strong style={{ color: '#F5F5F7' }}>El valor se aplica al total si realizamos la reparación.</strong>
          </p>

          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '16px 36px', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Quiero esta oferta →
          </a>
          <div style={{ marginTop: 14, fontSize: 12, color: '#3A3A3C' }}>Sin compromiso · Respuesta en menos de 1 hora · Lunes a viernes</div>
        </div>
      </section>

      {/* Qué incluye */}
      <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 700, marginBottom: 28, color: '#F5F5F7', letterSpacing: '-.02em' }}>¿Qué incluye la visita?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {[
              { icon: '🔍', t: 'Diagnóstico completo', d: 'Revisamos software y hardware. Te explicamos exactamente qué tiene tu equipo.' },
              { icon: '📋', t: 'Presupuesto sin letra chica', d: 'Antes de tocar nada te decimos el costo total. Sin sorpresas.' },
              { icon: '🏠', t: 'Vamos a tu casa', d: 'No necesitas trasladar nada. Atendemos en toda la Región Metropolitana.' },
              { icon: '⚡', t: 'Mismo día o siguiente', d: 'Coordinamos rápido. Atendemos de lunes a viernes en el horario que te acomode.' },
            ].map(({ icon, t, d }) => (
              <div key={t} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '22px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F5F5F7', marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: '0.8rem', color: '#636366', lineHeight: 1.6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 28, textAlign: 'center' }}>
          {[
            { n: '+150', l: 'Equipos reparados' },
            { n: '98%', l: 'Clientes satisfechos' },
            { n: '38', l: 'Comunas atendidas' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2997FF', letterSpacing: '-.03em' }}>{n}</div>
              <div style={{ fontSize: '0.8rem', color: '#636366', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: '60px 0 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ color: '#636366', fontSize: '0.95rem', marginBottom: 24, lineHeight: 1.7 }}>
            Esta oferta es por tiempo limitado. Escríbenos ahora y agenda tu visita con el precio especial.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '16px 36px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Agendar por $10.000
          </a>
          <div style={{ marginTop: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>← Ver todos los servicios</Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile</div>
      </footer>
    </div>
  )
}
