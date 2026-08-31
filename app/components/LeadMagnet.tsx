'use client'

import { useState } from 'react'

const DOWNLOAD = '/guia-fixday-senales-pc.pdf'

/** Bloque de captura de correo a cambio de una guía descargable (lead magnet). */
export default function LeadMagnet({ comuna }: { comuna?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading'); setErr('')
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, comuna }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo procesar. Intenta de nuevo.')
      setStatus('done')
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Error inesperado.')
      setStatus('error')
    }
  }

  return (
    <div style={{
      display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(41,151,255,.1), rgba(191,90,242,.08))',
      border: '1px solid rgba(41,151,255,.25)', borderRadius: 22, padding: 'clamp(26px,4vw,38px)',
    }}>
      {/* Mockup de la guía */}
      <div style={{ flexShrink: 0, width: 96, height: 124, borderRadius: 10, background: '#0A0F1E', border: '1px solid rgba(41,151,255,.3)', boxShadow: '0 12px 30px rgba(0,0,0,.4)', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#fff' }}>F</div>
        <div style={{ height: 6, width: '85%', borderRadius: 3, background: 'rgba(41,151,255,.5)', marginTop: 4 }} />
        <div style={{ height: 4, width: '70%', borderRadius: 2, background: 'rgba(255,255,255,.15)' }} />
        <div style={{ height: 4, width: '78%', borderRadius: 2, background: 'rgba(255,255,255,.12)' }} />
        <div style={{ height: 4, width: '60%', borderRadius: 2, background: 'rgba(255,255,255,.12)' }} />
        <div style={{ marginTop: 'auto', fontSize: 8, fontWeight: 700, color: '#2997FF', letterSpacing: '.04em' }}>GUÍA PDF</div>
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, minWidth: 260 }}>
        <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, color: '#BF5AF2', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Descarga gratis</div>
        <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.7rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.2, marginBottom: 10, color: '#F5F5F7' }}>
          10 señales de que tu PC necesita mantención
        </h2>
        <p style={{ fontSize: 14, color: '#9A9AA0', lineHeight: 1.65, marginBottom: 18 }}>
          Guía en PDF, gratis. Aprende a detectar los problemas a tiempo y evita reparaciones caras. Te la enviamos al instante.
        </p>

        {status === 'done' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14, color: '#7EE29B', fontSize: 14, fontWeight: 600 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              ¡Listo! Tu guía está disponible.
            </div>
            <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#2997FF', color: '#fff', borderRadius: 980, padding: '13px 26px', fontSize: 14.5, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Descargar la guía (PDF)
            </a>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com" aria-label="Tu correo"
              style={{ flex: 1, minWidth: 200, background: 'rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 12, padding: '13px 16px', fontSize: 14.5, color: '#F5F5F7', outline: 'none' }}
            />
            <button type="submit" disabled={status === 'loading'}
              style={{ background: '#2997FF', color: '#fff', border: 'none', borderRadius: 12, padding: '13px 24px', fontSize: 14.5, fontWeight: 700, cursor: status === 'loading' ? 'wait' : 'pointer', whiteSpace: 'nowrap', opacity: status === 'loading' ? .7 : 1 }}>
              {status === 'loading' ? 'Enviando…' : 'Quiero la guía'}
            </button>
            {status === 'error' && <div style={{ width: '100%', fontSize: 12.5, color: '#FF6B6B' }}>{err}</div>}
            <div style={{ width: '100%', fontSize: 11.5, color: '#636366', marginTop: 2 }}>
              Sin spam. Usamos tu correo solo para enviarte la guía y consejos ocasionales de FIXDAY.
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
