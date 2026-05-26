import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import { POSTS } from './posts'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog Técnico | Consejos para tu PC y WiFi — FIXDAY',
  description: 'Artículos sobre mantención de computadores, instalación de Windows, recuperación de datos y WiFi. Consejos prácticos del equipo técnico de FIXDAY Santiago.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog FIXDAY — Consejos para tu PC',
    description: 'Guías prácticas: PC lento, instalar Windows 11, recuperar datos, disco duro y WiFi.',
    url: 'https://fixday.cl/blog',
    siteName: 'FIXDAY',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-blog" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Inicio</Link>
        </div>
      </nav>

      <BlogClient posts={POSTS} />

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile</div>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 20 }}>
          <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>← Inicio</Link>
          <Link href="/zonas" style={{ fontSize: 13, color: '#636366', textDecoration: 'none' }}>Zonas</Link>
          <a href="https://www.instagram.com/fixdaycl" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#636366', textDecoration: 'none' }}>Instagram</a>
        </div>
      </footer>
    </div>
  )
}
