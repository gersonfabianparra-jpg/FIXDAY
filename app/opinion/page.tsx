'use client'

import { useState } from 'react'

const SERVICES = [
  'Mantención lógica y física',
  'Respaldo de información',
  'Recuperación de datos',
  'Instalación de Windows',
  'Optimización del sistema',
  'Instalación WiFi / Repetidores',
  'Otro',
]

function StarSelector({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '2px 3px',
            fontSize: 36, lineHeight: 1,
            color: n <= (hover || value) ? '#FF9F0A' : 'rgba(255,255,255,.15)',
            transition: 'color 0.15s ease, transform 0.15s ease',
            transform: n <= (hover || value) ? 'scale(1.12)' : 'scale(1)',
          }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

const LABELS = ['', 'Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente']

export default function OpinionPage() {
  const [rating, setRating] = useState(0)
  const [form, setForm] = useState({ client_name: '', client_location: '', service: '', review_text: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!rating) { setError('Por favor selecciona una calificación'); return }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar')
      setStatus('error')
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.11)',
    borderRadius: 11, padding: '13px 16px', color: '#F5F5F7',
    fontFamily: '-apple-system, sans-serif', fontSize: 15, outline: 'none',
  }
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 600, color: '#636366',
    marginBottom: 8, letterSpacing: '.06em',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08090F', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', color: '#F5F5F7', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 80px' }}>

      {/* Top gradient bar */}
      <div style={{ width: '100%', height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)', marginBottom: 48, flexShrink: 0 }} />

      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#fff' }}>F</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-.02em', lineHeight: 1 }}>FIXDAY</div>
          <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
        </div>
      </div>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', maxWidth: 440, padding: '20px 0' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🙏</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', marginBottom: 14 }}>¡Gracias por tu reseña!</h2>
          <p style={{ color: '#636366', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            La revisaremos y si todo está bien la publicaremos en nuestro sitio web muy pronto.
          </p>
          <a href="https://fixday.cl" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none' }}>
            ← Volver a fixday.cl
          </a>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: 480 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 12 }}>
              Cuéntanos tu<br />
              <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>experiencia</span>
            </h1>
            <p style={{ color: '#636366', fontSize: 14, lineHeight: 1.7 }}>
              Tu opinión ayuda a otros clientes a confiar en FIXDAY.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#111214', border: '1px solid rgba(255,255,255,.08)', borderRadius: 24, padding: '36px 32px' }}>

            {/* Stars */}
            <div style={{ marginBottom: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#636366', letterSpacing: '.06em', marginBottom: 14 }}>
                ¿Cómo calificarías nuestro servicio?
              </div>
              <StarSelector value={rating} onChange={setRating} />
              {rating > 0 && (
                <div style={{ fontSize: 13, color: '#FF9F0A', fontWeight: 600, marginTop: 10, letterSpacing: '.02em' }}>
                  {LABELS[rating]}
                </div>
              )}
            </div>

            {/* Fields */}
            <div style={{ marginBottom: 18 }}>
              <label style={lbl}>Tu nombre *</label>
              <input style={inp} required value={form.client_name} onChange={set('client_name')} placeholder="Nombre completo" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
              <div>
                <label style={lbl}>Comuna</label>
                <input style={inp} value={form.client_location} onChange={set('client_location')} placeholder="Ej: Providencia" />
              </div>
              <div>
                <label style={lbl}>Servicio recibido</label>
                <select style={{ ...inp, appearance: 'none' } as React.CSSProperties} value={form.service} onChange={set('service')}>
                  <option value="">Seleccionar…</option>
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={lbl}>Tu reseña *</label>
              <textarea
                style={{ ...inp, minHeight: 110, resize: 'vertical' } as React.CSSProperties}
                required
                value={form.review_text}
                onChange={set('review_text')}
                placeholder="Cuéntanos cómo fue tu experiencia con FIXDAY…"
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(255,69,58,.1)', border: '1px solid rgba(255,69,58,.28)', borderRadius: 10, padding: '12px 16px', color: '#FF453A', fontSize: 13, marginBottom: 18 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%', background: status === 'loading' ? '#333' : 'linear-gradient(135deg,#0071E3,#2997FF)',
                color: '#fff', border: 'none', borderRadius: 12, padding: '15px',
                fontSize: 15, fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                letterSpacing: '.01em',
              }}
            >
              {status === 'loading' ? 'Enviando…' : '✓ Enviar mi reseña'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
