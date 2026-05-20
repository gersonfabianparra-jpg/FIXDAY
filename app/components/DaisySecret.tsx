'use client'

import { useState, useEffect } from 'react'

export default function DaisySecret() {
  const [clicks, setClicks] = useState(0)
  const [open, setOpen] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number }[]>([])

  useEffect(() => {
    if (clicks >= 5) {
      setOpen(true)
      setClicks(0)
      setHearts(
        Array.from({ length: 18 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          size: 14 + Math.random() * 22,
          delay: Math.random() * 3,
        }))
      )
    }
  }, [clicks])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <>
      {/* Botón secreto — esquina inferior izquierda */}
      <span
        onClick={() => setClicks(c => c + 1)}
        style={{
          position: 'fixed', bottom: 16, left: 18,
          width: 22, height: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.15)',
          cursor: 'default', zIndex: 9998, userSelect: 'none', WebkitUserSelect: 'none',
          letterSpacing: 0, lineHeight: 1,
        }}
      >D</span>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0010 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Corazones flotantes */}
          <style>{`
            @keyframes float-heart {
              0%   { transform: translateY(110vh) scale(0.4); opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 0.7; }
              100% { transform: translateY(-10vh) scale(1.1); opacity: 0; }
            }
            @keyframes pulse-msg {
              0%, 100% { transform: scale(1); }
              50%       { transform: scale(1.018); }
            }
          `}</style>

          {hearts.map(h => (
            <span key={h.id} style={{
              position: 'absolute',
              left: `${h.x}%`,
              bottom: '-10%',
              fontSize: h.size,
              animation: `float-heart ${5 + h.delay * 1.5}s ${h.delay}s ease-in infinite`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}>
              {['❤️','💜','💙','🩷','✨'][h.id % 5]}
            </span>
          ))}

          {/* Mensaje */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 520,
              margin: '0 24px',
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 28,
              padding: '52px 44px',
              textAlign: 'center',
              animation: 'pulse-msg 4s ease-in-out infinite',
              backdropFilter: 'blur(20px)',
              position: 'relative', zIndex: 1,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>💍</div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
              color: '#BF5AF2', marginBottom: 18,
            }}>
              Para Daisy, con todo mi amor
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', fontWeight: 800,
              lineHeight: 1.2, letterSpacing: '-.02em', color: '#F5F5F7',
              marginBottom: 24,
            }}>
              Hola mi amor,<br />eres lo mejor<br />que me ha pasado.
            </h2>
            <p style={{
              fontSize: '0.97rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.85,
              marginBottom: 28,
            }}>
              Si estás viendo esto, quiero que sepas que cada día a tu lado
              es el más bonito de mi vida. Estoy feliz, orgulloso y emocionado
              de que seas mi <strong style={{ color: '#fff' }}>futura esposa</strong>.{' '}
              Te amo más de lo que las palabras pueden decir. 💜
            </p>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #BF5AF2, #2997FF)',
              borderRadius: 980, padding: '10px 28px',
              fontSize: '0.9rem', fontWeight: 700, color: '#fff',
              letterSpacing: '.04em',
            }}>
              Para siempre tuyo ❤️
            </div>
            <div style={{ marginTop: 32, fontSize: 11, color: 'rgba(255,255,255,.2)' }}>
              Toca en cualquier lugar para cerrar
            </div>
          </div>
        </div>
      )}
    </>
  )
}
