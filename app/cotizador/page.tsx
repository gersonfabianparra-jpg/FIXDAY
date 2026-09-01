import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import Cotizador from './Cotizador'

export const metadata: Metadata = {
  title: 'Cotizador: ¿Cuánto cuesta arreglar tu PC o tu web? | FIXDAY',
  description: 'Calcula en segundos cuánto cuesta reparar tu computador o crear tu página web. Estimado al instante y sin compromiso. Técnico a domicilio en la Región Metropolitana.',
  alternates: { canonical: '/cotizador' },
  openGraph: {
    title: 'Cotizador FIXDAY · ¿Cuánto cuesta arreglar tu PC?',
    description: 'Calcula tu presupuesto en segundos. Reparación a domicilio y diseño web en la Región Metropolitana.',
    url: 'https://fixday.cl/cotizador',
    siteName: 'FIXDAY',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Cotizador FIXDAY' }],
  },
  twitter: { card: 'summary_large_image', title: 'Cotizador FIXDAY', description: 'Calcula cuánto cuesta arreglar tu PC o crear tu web.' },
}

export default function CotizadorPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cot-opt { transition: transform .18s ease, border-color .18s ease, background .18s ease; }
        .cot-opt:hover { transform: translateY(-2px); border-color: rgba(41,151,255,.4); background: #1a1a1a; }
      `}} />

      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-cot" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Inicio</Link>
        </div>
      </nav>

      <section style={{ padding: '52px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 380, background: 'radial-gradient(ellipse, rgba(41,151,255,.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.25)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Estimado gratis · 30 segundos
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: 16 }}>
            ¿Cuánto cuesta<br />
            <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>arreglar tu problema?</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#86868B', lineHeight: 1.7, marginBottom: 8 }}>
            Responde un par de preguntas y te damos un estimado al instante. Sin registrarte, sin compromiso.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div style={{ padding: '0 24px' }}>
          <Cotizador />
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile</div>
      </footer>
    </div>
  )
}
