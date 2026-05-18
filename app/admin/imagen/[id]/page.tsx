'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ImagenPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [downloading, setDownloading] = useState(false)
  const [imgUrl] = useState(`/api/og/review/${params.id}`)

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const download = async () => {
    setDownloading(true)
    try {
      const res = await fetch(imgUrl)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fixday-resena-${params.id.slice(0, 8)}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F7', fontFamily: '-apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.1)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>F</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>FIXDAY <span style={{ color: '#636366', fontWeight: 400, fontSize: 14 }}>/ Imagen Instagram</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/admin/reviews" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>← Volver a reseñas</Link>
          <button onClick={handleLogout} style={{ background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 8, padding: '7px 16px', color: '#FF453A', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>

        {/* Download button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 4 }}>Imagen para Instagram</div>
            <div style={{ fontSize: 13, color: '#636366' }}>1080 × 1080 px · Lista para publicar</div>
          </div>
          <button
            onClick={download}
            disabled={downloading}
            style={{
              background: downloading ? 'rgba(48,209,88,.08)' : '#30D158',
              border: downloading ? '1px solid rgba(48,209,88,.3)' : 'none',
              borderRadius: 12, padding: '13px 28px',
              color: downloading ? '#30D158' : '#fff',
              fontSize: 15, fontWeight: 700, cursor: downloading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: downloading ? 0.7 : 1,
              transition: 'all 0.2s',
            }}
          >
            {downloading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                Descargando…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar imagen
              </>
            )}
          </button>
        </div>

        {/* Image preview */}
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 32px 80px rgba(0,0,0,.6)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgUrl}
            alt="Imagen Instagram"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: 20, fontSize: 13, color: '#48484A', textAlign: 'center' }}>
          Tip: descarga la imagen y publícala en Instagram, Facebook o WhatsApp como historia o post.
        </div>
      </div>
    </div>
  )
}
