'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from './posts'

const CATEGORY_COLOR: Record<string, string> = {
  'Mantención': '#2997FF',
  'Windows': '#30D158',
  'Recuperación de datos': '#BF5AF2',
  'Hardware': '#FF9F0A',
  'Redes WiFi': '#64D2FF',
}

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  'Mantención': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  'Windows': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      <path d="M7 10l2 2 4-4"/>
    </svg>
  ),
  'Recuperación de datos': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  'Hardware': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>
    </svg>
  ),
  'Redes WiFi': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6s4-6 11-6 11 6 11 6"/><path d="M5 10s2.5-4 7-4 7 4 7 4"/>
      <path d="M9 14s1.5-2 3-2 3 2 3 2"/><line x1="12" y1="20" x2="12" y2="18"/>
    </svg>
  ),
}

const ALL = 'Todos'

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const categories = [ALL, ...Array.from(new Set(posts.map(p => p.category)))]
  const filtered = activeCategory === ALL ? posts : posts.filter(p => p.category === activeCategory)
  const [featured, ...rest] = filtered

  return (
    <div style={{ paddingBottom: 80 }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-hero { animation: fadeUp .5s ease both; }
        .blog-card { animation: fadeUp .5s ease both; }
        .blog-card:hover .card-arrow { transform: translateX(4px); }
        .cat-btn { transition: all .2s; }
        .cat-btn:hover { opacity: 1 !important; }
      `}</style>

      {/* Hero section */}
      <section style={{ padding: '56px 0 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(41,151,255,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div className="blog-hero" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Blog técnico
          </div>
          <h1 className="blog-hero" style={{ fontSize: 'clamp(1.9rem,4.5vw,3rem)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.08, marginBottom: 16, animationDelay: '.05s' }}>
            Guías para tu<br />
            <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>computador</span>
          </h1>
          <p className="blog-hero" style={{ color: '#636366', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32, animationDelay: '.1s' }}>
            {posts.length} artículos escritos por nuestro equipo técnico — soluciones reales a problemas reales.
          </p>

          {/* Category filter */}
          <div className="blog-hero" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, animationDelay: '.15s' }}>
            {categories.map(cat => {
              const color = cat === ALL ? '#2997FF' : (CATEGORY_COLOR[cat] || '#2997FF')
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  className="cat-btn"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: active ? `${color}20` : 'rgba(255,255,255,.04)',
                    border: `1px solid ${active ? `${color}50` : 'rgba(255,255,255,.1)'}`,
                    borderRadius: 980,
                    padding: '7px 16px',
                    fontSize: 12,
                    fontWeight: 700,
                    color: active ? color : '#636366',
                    cursor: 'pointer',
                    opacity: active ? 1 : 0.7,
                    letterSpacing: '.04em',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* Featured card */}
        {featured && visible && (
          <Link
            href={`/blog/${featured.slug}`}
            className="blog-card"
            style={{
              textDecoration: 'none',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 0,
              background: hovered === featured.slug ? 'rgba(41,151,255,.05)' : '#0D0D0D',
              border: `1px solid ${hovered === featured.slug ? 'rgba(41,151,255,.3)' : 'rgba(255,255,255,.08)'}`,
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 24,
              animationDelay: '.1s',
              transition: 'border-color .25s, background .25s',
            }}
            onMouseEnter={() => setHovered(featured.slug)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ padding: '32px 32px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: CATEGORY_COLOR[featured.category] || '#2997FF',
                  background: `${CATEGORY_COLOR[featured.category] || '#2997FF'}18`,
                  border: `1px solid ${CATEGORY_COLOR[featured.category] || '#2997FF'}35`,
                  borderRadius: 980, padding: '4px 12px', letterSpacing: '.08em', textTransform: 'uppercase',
                }}>
                  {featured.category}
                </span>
                <span style={{ fontSize: 11, color: '#3A3A3C', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3A3A3C" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {featured.readTime} min
                </span>
                <span style={{ fontSize: 11, color: '#3A3A3C', marginLeft: 'auto' }}>
                  {new Date(featured.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', fontWeight: 900, color: '#F5F5F7', lineHeight: 1.2, marginBottom: 12, letterSpacing: '-.02em' }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#86868B', lineHeight: 1.7, marginBottom: 24, maxWidth: 520 }}>
                {featured.description}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.25)', borderRadius: 980, padding: '9px 20px', fontSize: 13, fontWeight: 700, color: '#2997FF' }}>
                Leer artículo
                <span className="card-arrow" style={{ transition: 'transform .2s' }}>→</span>
              </div>
            </div>
            <div style={{
              width: 160,
              background: `linear-gradient(135deg, ${CATEGORY_COLOR[featured.category] || '#2997FF'}15, ${CATEGORY_COLOR[featured.category] || '#2997FF'}05)`,
              borderLeft: `1px solid ${CATEGORY_COLOR[featured.category] || '#2997FF'}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: CATEGORY_COLOR[featured.category] || '#2997FF',
            }}>
              <div style={{ opacity: .4, transform: 'scale(2.2)' }}>
                {CATEGORY_ICON[featured.category]}
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        {visible && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
            {rest.map((post, i) => {
              const color = CATEGORY_COLOR[post.category] || '#2997FF'
              const isHov = hovered === post.slug
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    background: isHov ? `${color}06` : '#0D0D0D',
                    border: `1px solid ${isHov ? `${color}35` : 'rgba(255,255,255,.07)'}`,
                    borderRadius: 18,
                    overflow: 'hidden',
                    animationDelay: `${.12 + i * .06}s`,
                    transition: 'border-color .25s, background .25s, transform .25s',
                    transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHovered(post.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Card header with icon */}
                  <div style={{
                    height: 88,
                    background: `linear-gradient(135deg, ${color}14, ${color}06)`,
                    borderBottom: `1px solid ${color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 20px',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ color, opacity: isHov ? 1 : .7, transition: 'opacity .2s, transform .2s', transform: isHov ? 'scale(1.1)' : 'scale(1)' }}>
                      {CATEGORY_ICON[post.category]}
                    </div>
                    <div style={{
                      position: 'absolute', right: -20, bottom: -20,
                      width: 80, height: 80, borderRadius: '50%',
                      background: `${color}10`,
                    }} />
                    <span style={{
                      fontSize: 10, fontWeight: 700, color,
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                      borderRadius: 980, padding: '3px 10px',
                      letterSpacing: '.08em', textTransform: 'uppercase',
                      position: 'relative',
                    }}>
                      {post.category}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '18px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F5F5F7', lineHeight: 1.4, marginBottom: 8, letterSpacing: '-.01em' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: '#636366', lineHeight: 1.65, flex: 1, marginBottom: 16 }}>
                      {post.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 10, color: '#3A3A3C', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3A3A3C" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {post.readTime} min
                        </span>
                        <span style={{ fontSize: 10, color: '#3A3A3C' }}>
                          {new Date(post.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                        Leer
                        <span className="card-arrow" style={{ transition: 'transform .2s' }}>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* CTA bottom */}
        <div style={{ marginTop: 60, textAlign: 'center', padding: '40px 24px', background: 'linear-gradient(135deg, rgba(0,113,227,.08), rgba(191,90,242,.05))', border: '1px solid rgba(41,151,255,.15)', borderRadius: 20 }}>
          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#F5F5F7', marginBottom: 8, letterSpacing: '-.02em' }}>¿Tu PC tiene alguno de estos problemas?</p>
          <p style={{ color: '#636366', fontSize: '0.88rem', marginBottom: 20 }}>Un técnico certificado va a tu casa y lo resuelve hoy.</p>
          <a
            href={`https://wa.me/56936649332?text=${encodeURIComponent('Hola FIXDAY, leí su blog y necesito ayuda con mi computador')}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 980, padding: '12px 26px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
