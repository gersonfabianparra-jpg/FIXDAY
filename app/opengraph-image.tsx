import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FIXDAY — Técnico Computadores a Domicilio en Santiago'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(41,151,255,0.15) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 36,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 13,
            background: 'linear-gradient(135deg, #0071E3, #2997FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 26, color: '#fff',
          }}>F</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>FIXDAY</span>
            <span style={{ fontSize: 13, color: '#2997FF', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</span>
          </div>
        </div>

        {/* Título */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 60,
          fontWeight: 900,
          color: '#F5F5F7',
          textAlign: 'center',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          marginBottom: 20,
        }}>
          <span>Tu computador reparado</span>
          <span style={{ color: '#2997FF' }}>en tu casa</span>
        </div>

        {/* Descripción */}
        <div style={{
          fontSize: 22,
          color: '#86868B',
          textAlign: 'center',
          marginBottom: 40,
          maxWidth: 700,
        }}>
          Servicio técnico profesional a domicilio en toda la Región Metropolitana
        </div>

        {/* Pills de servicios */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {['Windows', 'Recuperación datos', 'WiFi', 'Mantención', 'Optimización'].map(s => (
            <div key={s} style={{
              background: 'rgba(41,151,255,0.1)',
              border: '1px solid rgba(41,151,255,0.25)',
              borderRadius: 980,
              padding: '8px 18px',
              fontSize: 16,
              color: '#2997FF',
              fontWeight: 600,
              display: 'flex',
            }}>{s}</div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: 20,
          color: '#636366',
          fontWeight: 600,
        }}>
          🌐 fixday.cl
        </div>
      </div>
    ),
    { ...size }
  )
}
