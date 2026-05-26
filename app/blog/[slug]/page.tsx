import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Logo from '@/app/components/Logo'
import { POSTS, getPostBySlug } from '../posts'

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | FIXDAY Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://fixday.cl/blog/${post.slug}`,
      siteName: 'FIXDAY',
      locale: 'es_CL',
      type: 'article',
      publishedTime: post.date,
    },
  }
}

const WA = `https://wa.me/56936649332?text=${encodeURIComponent('Hola FIXDAY, leí su blog y necesito ayuda técnica con mi computador')}`

const CATEGORY_COLOR: Record<string, string> = {
  'Mantención': '#2997FF',
  'Windows': '#30D158',
  'Recuperación de datos': '#BF5AF2',
  'Hardware': '#FF9F0A',
  'Redes WiFi': '#64D2FF',
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const color = CATEGORY_COLOR[post.category] || '#2997FF'
  const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'FIXDAY', url: 'https://fixday.cl' },
            publisher: { '@type': 'Organization', name: 'FIXDAY', logo: { '@type': 'ImageObject', url: 'https://fixday.cl/icon.svg' } },
            url: `https://fixday.cl/blog/${post.slug}`,
          }),
        }}
      />

      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-post" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <Link href="/blog" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Blog</Link>
        </div>
      </nav>

      <article style={{ maxWidth: 720, margin: '0 auto', padding: '52px 24px 80px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}18`, border: `1px solid ${color}30`, borderRadius: 980, padding: '4px 12px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
              {post.category}
            </span>
            <span style={{ fontSize: 12, color: '#3A3A3C' }}>
              {new Date(post.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime} min de lectura
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-.03em', marginBottom: 16, color: '#F5F5F7' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#86868B', lineHeight: 1.7 }}>
            {post.description}
          </p>
          <div style={{ height: 1, background: 'rgba(255,255,255,.07)', marginTop: 32 }} />
        </header>

        {/* Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{ fontSize: '1rem', lineHeight: 1.8, color: '#D1D1D6' }}
        />

        {/* CTA */}
        <div style={{ marginTop: 56, background: 'linear-gradient(135deg, rgba(0,113,227,.12), rgba(191,90,242,.08))', border: '1px solid rgba(41,151,255,.2)', borderRadius: 20, padding: '32px 28px', textAlign: 'center' }}>
          <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#F5F5F7', marginBottom: 8, letterSpacing: '-.02em' }}>¿Necesitas ayuda con tu computador?</p>
          <p style={{ color: '#86868B', fontSize: '0.9rem', marginBottom: 24 }}>Un técnico certificado va a tu casa en toda la Región Metropolitana.</p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 980, padding: '13px 28px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Contactar por WhatsApp
          </a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#636366', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 20 }}>Otros artículos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '14px 18px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F5F5F7' }}>{r.title}</span>
                  <span style={{ fontSize: 13, color: '#2997FF', fontWeight: 600, flexShrink: 0, marginLeft: 12 }}>Leer →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <style>{`
        .post-content h2 { font-size: 1.3rem; font-weight: 800; color: #F5F5F7; margin: 36px 0 14px; letter-spacing: -.02em; }
        .post-content h3 { font-size: 1.05rem; font-weight: 700; color: #F5F5F7; margin: 28px 0 10px; }
        .post-content p { margin: 0 0 16px; }
        .post-content ul, .post-content ol { padding-left: 24px; margin: 0 0 16px; }
        .post-content li { margin-bottom: 8px; }
        .post-content strong { color: #F5F5F7; font-weight: 700; }
        .post-content code { background: rgba(41,151,255,.1); border: 1px solid rgba(41,151,255,.2); borderRadius: 4px; padding: 2px 7px; font-size: .88em; color: #2997FF; font-family: monospace; }
        .post-content a { color: #2997FF; }
      `}</style>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile</div>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 20 }}>
          <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>← Inicio</Link>
          <Link href="/blog" style={{ fontSize: 13, color: '#636366', textDecoration: 'none' }}>Blog</Link>
        </div>
      </footer>
    </div>
  )
}
