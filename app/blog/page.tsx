import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import { POSTS } from './posts'

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

const CATEGORY_COLOR: Record<string, string> = {
  'Mantención': '#2997FF',
  'Windows': '#30D158',
  'Recuperación de datos': '#BF5AF2',
  'Hardware': '#FF9F0A',
  'Redes WiFi': '#64D2FF',
}

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-blog" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Volver al inicio</Link>
        </div>
      </nav>

      <section style={{ padding: '60px 0 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Blog técnico
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Guías y consejos para<br /><span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>tu computador</span>
          </h1>
          <p style={{ color: '#636366', fontSize: '1rem', lineHeight: 1.7 }}>
            Artículos prácticos escritos por nuestro equipo técnico. Diagnósticos, soluciones y consejos para mantener tu equipo funcionando bien.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {POSTS.map(post => {
              const color = CATEGORY_COLOR[post.category] || '#2997FF'
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '24px 22px', transition: 'border-color .2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}18`, border: `1px solid ${color}30`, borderRadius: 980, padding: '4px 10px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 11, color: '#3A3A3C' }}>{post.readTime} min</span>
                  </div>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#F5F5F7', lineHeight: 1.4, marginBottom: 10, letterSpacing: '-.01em' }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                    {post.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: '#3A3A3C' }}>
                      {new Date(post.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span style={{ fontSize: 13, color: '#2997FF', fontWeight: 600 }}>Leer →</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

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
