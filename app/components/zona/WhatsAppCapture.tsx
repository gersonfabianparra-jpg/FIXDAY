'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getCtx, trackEvent } from './track'

/**
 * Botón de WhatsApp que primero captura el contacto.
 *
 * Abre un paso rápido de 2 campos (más un teléfono opcional) y luego lleva a
 * WhatsApp con el mensaje ya escrito. Siempre deja una salida — "prefiero
 * escribir directo" — para no perder a quien no quiere llenar nada.
 */

interface Props {
  comuna: string
  waNumber: string
  section: string
  label: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const FIELD: React.CSSProperties = {
  width: '100%', background: '#0E0E12', border: '1px solid #26262B', borderRadius: 12,
  padding: '13px 15px', color: '#F5F5F7', fontSize: 15, outline: 'none',
  fontFamily: 'inherit', boxSizing: 'border-box',
}

export default function WhatsAppCapture({ comuna, waNumber, section, label, className, style, children }: Props) {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [name, setName] = useState('')
  const [problema, setProblema] = useState('')
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState('')
  const firstRef = useRef<HTMLInputElement>(null)
  const [montado, setMontado] = useState(false)
  useEffect(() => setMontado(true), [])

  const go = useCallback((msg: string) => {
    window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`
  }, [waNumber])

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    trackEvent('wa_click', comuna, section)
    trackEvent('form_open', comuna, section)
    setOpen(true)
  }

  const skip = () => {
    trackEvent('form_skip', comuna, section)
    go(`Hola FIXDAY, necesito un técnico a domicilio en ${comuna}`)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    if (name.trim().length < 2) { setErr('Escribe tu nombre para continuar.'); return }
    setErr(''); setSending(true)

    const ctx = getCtx()
    // keepalive + tope de espera: el dato se guarda aunque el navegador ya esté saliendo
    await Promise.race([
      fetch('/api/zona-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({ name, problema, phone, comuna, ...ctx, source: `${ctx.source} · ${section}` }),
      }).catch(() => {}),
      new Promise(r => setTimeout(r, 1500)),
    ])

    const msg = `Hola FIXDAY 👋 Soy ${name.trim()}, de ${comuna}.` +
      (problema.trim() ? ` Mi problema: ${problema.trim()}.` : '') +
      ' Necesito un técnico a domicilio.'
    go(msg)
  }

  // Cerrar con Escape y enfocar el primer campo
  useEffect(() => {
    if (!open) return
    const onKey = (ev: KeyboardEvent) => { if (ev.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstRef.current?.focus(), 60)
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(t) }
  }, [open])

  return (
    <>
      <a href={`https://wa.me/${waNumber}`} onClick={openModal} className={className} style={style}>
        {children ?? label}
      </a>

      {open && montado && createPortal(
        <div
          role="dialog" aria-modal="true" aria-label={`Agendar visita en ${comuna}`}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,.78)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18,
            overflowY: 'auto', animation: 'zcFade .22s ease both',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 430, background: '#0A0A0D',
              border: '1px solid #1F1F26', borderRadius: 24, padding: 26,
              boxShadow: '0 30px 90px rgba(0,0,0,.7)', animation: 'zcUp .3s cubic-bezier(.16,1,.3,1) both',
              position: 'relative', maxHeight: 'calc(100vh - 36px)', overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setOpen(false)} aria-label="Cerrar"
              style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', color: '#636366', fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: 4 }}
            >×</button>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(48,209,88,.1)', border: '1px solid rgba(48,209,88,.3)', borderRadius: 999, padding: '5px 12px', fontSize: 11, fontWeight: 800, color: '#30D158', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30D158' }} />
              Visita en {comuna}
            </div>

            <h3 style={{ fontSize: 21, fontWeight: 900, letterSpacing: '-.02em', margin: '0 0 6px', color: '#F5F5F7' }}>
              Cuéntanos en 10 segundos
            </h3>
            <p style={{ fontSize: 13.5, color: '#8E8E93', lineHeight: 1.6, margin: '0 0 20px' }}>
              Así llegamos preparados con las herramientas correctas y te damos un precio real al tiro.
            </p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <input
                ref={firstRef} value={name} onChange={e => setName(e.target.value)}
                placeholder="Tu nombre" style={FIELD} maxLength={80} autoComplete="name"
              />
              <input
                value={problema} onChange={e => setProblema(e.target.value)}
                placeholder="¿Qué le pasa a tu equipo?" style={FIELD} maxLength={200}
              />
              <input
                value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="Teléfono (opcional)" style={FIELD} maxLength={20}
                inputMode="tel" autoComplete="tel"
              />
              <p style={{ fontSize: 11.5, color: '#5A5A60', margin: '-2px 0 4px', lineHeight: 1.5 }}>
                El teléfono es opcional: solo lo usamos para avisarte si se libera un cupo antes.
              </p>

              {err && <p style={{ color: '#FF6B6B', fontSize: 13, margin: 0 }}>{err}</p>}

              <button
                type="submit" disabled={sending}
                style={{
                  background: sending ? '#1C6E33' : 'linear-gradient(135deg,#25D366,#1EBE5A)',
                  color: '#fff', border: 'none', borderRadius: 999, padding: '15px 20px',
                  fontSize: 15.5, fontWeight: 800, cursor: sending ? 'wait' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  fontFamily: 'inherit', marginTop: 2,
                }}
              >
                {sending ? 'Abriendo WhatsApp…' : (
                  <>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                    Continuar a WhatsApp
                  </>
                )}
              </button>

              <button
                type="button" onClick={skip}
                style={{ background: 'transparent', border: 'none', color: '#6E6E73', fontSize: 13, cursor: 'pointer', padding: '6px 0 0', fontFamily: 'inherit', textDecoration: 'underline' }}
              >
                Prefiero escribir directo
              </button>
            </form>

            <p style={{ fontSize: 11, color: '#48484A', textAlign: 'center', margin: '14px 0 0', lineHeight: 1.5 }}>
              Al continuar aceptas que te contactemos por WhatsApp sobre tu solicitud.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes zcFade{from{opacity:0}to{opacity:1}}
            @keyframes zcUp{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
          ` }} />
        </div>,
        document.body
      )}
    </>
  )
}
