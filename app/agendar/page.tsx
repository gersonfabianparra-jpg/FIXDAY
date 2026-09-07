import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import { getComunaBySlug } from '../zonas/comunas'
import AgendaCliente from './AgendaCliente'

export const metadata: Metadata = {
  title: 'Agenda tu Visita Técnica a Domicilio | FIXDAY',
  description: 'Agenda en línea la visita de un técnico de computadores a domicilio en la Región Metropolitana. Elige el día y el horario que te acomode. Visita + diagnóstico $25.000.',
  alternates: { canonical: '/agendar' },
  openGraph: {
    title: 'Agenda tu visita técnica a domicilio | FIXDAY',
    description: 'Elige día y hora. Un técnico llega a tu casa u oficina en toda la Región Metropolitana.',
    url: 'https://fixday.cl/agendar',
    siteName: 'FIXDAY',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Agenda tu visita técnica con FIXDAY' }],
  },
}

export default function AgendarPage({ searchParams }: { searchParams: { comuna?: string } }) {
  // Permite preseleccionar la comuna al llegar desde una página de zona
  const comunaInicial = searchParams.comuna ? getComunaBySlug(searchParams.comuna)?.name : undefined

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://fixday.cl' },
          { '@type': 'ListItem', position: 2, name: 'Agendar visita', item: 'https://fixday.cl/agendar' },
        ],
      }) }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '14px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.82)', backdropFilter: 'blur(18px)', zIndex: 50 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
            <Logo id="lg-agendar" />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <a href="https://wa.me/56936649332?text=Hola%20FIXDAY%2C%20quiero%20agendar%20una%20visita"
            target="_blank" rel="noopener noreferrer"
            style={{ background: '#25D366', color: '#fff', borderRadius: 980, padding: '10px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            WhatsApp
          </a>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '18px 24px 0' }}>
        <nav aria-label="Ruta de navegación" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#636366' }}>
          <Link href="/" style={{ color: '#86868B', textDecoration: 'none' }}>Inicio</Link>
          <span aria-hidden>/</span>
          <span style={{ color: '#2997FF', fontWeight: 600 }}>Agendar visita</span>
        </nav>
      </div>

      <section style={{ padding: '38px 0 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <AgendaCliente comunaInicial={comunaInicial} />
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#3A3A3C', marginBottom: 8 }}>
          © {new Date().getFullYear()} FIXDAY · Técnico de computadores a domicilio en la Región Metropolitana
        </p>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', fontSize: 12.5 }}>
          <Link href="/" style={{ color: '#86868B', textDecoration: 'none' }}>Inicio</Link>
          <Link href="/zonas" style={{ color: '#86868B', textDecoration: 'none' }}>Zonas</Link>
          <Link href="/cotizador" style={{ color: '#86868B', textDecoration: 'none' }}>Cotizador</Link>
        </div>
      </footer>
    </div>
  )
}
