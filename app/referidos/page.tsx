import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import Referidos from './Referidos'

export const metadata: Metadata = {
  title: 'Recomienda FIXDAY y ganen ambos | Programa de Referidos',
  description: 'Recomienda FIXDAY a tus amigos: ellos reciben $5.000 de descuento y tú también. Técnico de computadores a domicilio y diseño web en la Región Metropolitana.',
  alternates: { canonical: '/referidos' },
  openGraph: {
    title: 'Recomienda FIXDAY y ganen ambos',
    description: 'Tú ganas $5.000 y tu amigo también. Programa de referidos de FIXDAY.',
    url: 'https://fixday.cl/referidos',
    siteName: 'FIXDAY',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Programa de referidos FIXDAY' }],
  },
  twitter: { card: 'summary_large_image', title: 'Recomienda FIXDAY y ganen ambos', description: 'Tú ganas $5.000 y tu amigo también.' },
}

export default function ReferidosPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-ref" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Inicio</Link>
        </div>
      </nav>

      <section style={{ padding: '52px 0 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 380, background: 'radial-gradient(ellipse, rgba(191,90,242,.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(191,90,242,.12)', border: '1px solid rgba(191,90,242,.3)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#D9A6F7', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Programa de referidos
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: 16 }}>
            Recomienda FIXDAY<br />
            <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>y ganan los dos.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#86868B', lineHeight: 1.7 }}>
            Tu amigo recibe <strong style={{ color: '#F5F5F7' }}>$5.000 de descuento</strong> en su reparación, y tú recibes otros <strong style={{ color: '#F5F5F7' }}>$5.000</strong> en tu próximo servicio. Así de simple.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div style={{ padding: '0 24px' }}>
          <Referidos />
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile</div>
      </footer>
    </div>
  )
}
