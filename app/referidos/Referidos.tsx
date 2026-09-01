'use client'

import { useState } from 'react'

const BENEFICIO = '$5.000'

interface Generated { code: string; link: string; expiresAt: string; expiresDays: number }

export default function Referidos() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')
  const [gen, setGen] = useState<Generated | null>(null)
  const [copied, setCopied] = useState(false)

  const mensaje = gen
    ? `¡Hola! Te recomiendo FIXDAY 🔧 — técnico de computadores a domicilio y páginas web en Santiago. `
      + `Entra a mi invitación y tienes ${BENEFICIO} de descuento (yo también gano). 👉 ${gen.link}`
    : ''

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading'); setErr('')
    try {
      const res = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo generar tu enlace.')
      setGen(data)
      setStatus('done')
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Error inesperado.')
      setStatus('error')
    }
  }

  const share = () => window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener')
  const copy = async () => { try { await navigator.clipboard.writeText(gen!.link); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {} }

  const expiresLabel = gen ? new Date(gen.expiresAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long' }) : ''

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Cómo funciona */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 32 }}>
        {[
          { n: '1', t: 'Genera tu enlace', d: 'Con tu nombre y teléfono, te damos un link único.' },
          { n: '2', t: 'Compártelo', d: `Tu amigo entra y recibe ${BENEFICIO} de descuento.` },
          { n: '3', t: 'Ambos ganan', d: `Cuando él agenda, tú también ganas ${BENEFICIO}.` },
        ].map(s => (
          <div key={s.n} style={{ background: '#0C0C0C', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: '20px 18px' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#0071E3,#BF5AF2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 12 }}>{s.n}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F7', marginBottom: 5 }}>{s.t}</div>
            <div style={{ fontSize: 12.5, color: '#8A8A8F', lineHeight: 1.55 }}>{s.d}</div>
          </div>
        ))}
      </div>

      {/* Generador */}
      <div style={{ background: 'linear-gradient(135deg, rgba(41,151,255,.1), rgba(191,90,242,.08))', border: '1px solid rgba(41,151,255,.25)', borderRadius: 22, padding: 'clamp(24px,4vw,34px)' }}>
        {status === 'done' && gen ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16, color: '#7EE29B', fontSize: 14, fontWeight: 600 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              ¡Tu enlace está listo!
            </div>
            <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '14px 16px', marginBottom: 8, fontSize: 15, fontWeight: 700, color: '#2997FF', wordBreak: 'break-all' }}>
              {gen.link}
            </div>
            <div style={{ fontSize: 12.5, color: '#636366', marginBottom: 18 }}>Válido hasta el <strong style={{ color: '#8A8A8F' }}>{expiresLabel}</strong> · {gen.expiresDays} días</div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={share} style={{ flex: 1, minWidth: 180, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#25D366', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 20px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(37,211,102,.28)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                Compartir por WhatsApp
              </button>
              <button onClick={copy} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: copied ? 'rgba(48,209,88,.14)' : 'rgba(255,255,255,.06)', color: copied ? '#7EE29B' : '#C7C7CC', border: `1px solid ${copied ? 'rgba(48,209,88,.35)' : 'rgba(255,255,255,.12)'}`, borderRadius: 12, padding: '14px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {copied ? 'Copiado ✓' : 'Copiar link'}
              </button>
            </div>
            <button onClick={() => { setStatus('idle'); setGen(null); setName(''); setPhone('') }} style={{ display: 'block', margin: '16px auto 0', background: 'none', border: 'none', color: '#636366', fontSize: 13, cursor: 'pointer' }}>
              Generar otro enlace
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#F5F5F7', marginBottom: 8 }}>Tu nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Ej: María González" aria-label="Tu nombre"
              style={inp} />
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#F5F5F7', margin: '16px 0 8px' }}>Tu WhatsApp <span style={{ color: '#636366', fontWeight: 400 }}>(para pagarte tu beneficio)</span></label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+56 9 XXXX XXXX" inputMode="tel" aria-label="Tu teléfono"
              style={inp} />
            {status === 'error' && <div style={{ fontSize: 12.5, color: '#FF6B6B', marginTop: 12 }}>{err}</div>}
            <button type="submit" disabled={status === 'loading'}
              style={{ width: '100%', marginTop: 20, background: '#2997FF', color: '#fff', border: 'none', borderRadius: 12, padding: '15px', fontSize: 15, fontWeight: 700, cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? .7 : 1 }}>
              {status === 'loading' ? 'Generando…' : 'Generar mi enlace de referido'}
            </button>
            <div style={{ fontSize: 11.5, color: '#636366', marginTop: 14, lineHeight: 1.5 }}>
              Tu enlace es único y válido por 30 días. El descuento se aplica al confirmar el servicio.
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

const inp: React.CSSProperties = { width: '100%', background: 'rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: '#F5F5F7', outline: 'none' }
