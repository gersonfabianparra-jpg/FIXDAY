'use client'

import { useState } from 'react'

/** Botones para compartir el artículo (WhatsApp, X, Facebook) + copiar enlace. */
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const e = encodeURIComponent
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${e(`${title} ${url}`)}`, icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg> },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${e(title)}&url=${e(url)}`, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard no disponible */ }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, color: '#636366', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginRight: 2 }}>Compartir</span>
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Compartir en ${l.label}`}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#C7C7CC', textDecoration: 'none' }}>
          {l.icon}
        </a>
      ))}
      <button onClick={copy} aria-label="Copiar enlace"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 38, padding: '0 14px', borderRadius: 10, background: copied ? 'rgba(48,209,88,.12)' : 'rgba(255,255,255,.05)', border: `1px solid ${copied ? 'rgba(48,209,88,.35)' : 'rgba(255,255,255,.1)'}`, color: copied ? '#7EE29B' : '#C7C7CC', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        {copied ? (
          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>Copiado</>
        ) : (
          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copiar enlace</>
        )}
      </button>
    </div>
  )
}
