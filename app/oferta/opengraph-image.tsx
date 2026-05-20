import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FIXDAY — Visita + Diagnóstico $10.000'
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
        {/* Glow background */}
        <div style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(41,151,255,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Badge oferta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,59,48,0.15)',
          border: '1px solid rgba(255,59,48,0.4)',
          borderRadius: 980,
          padding: '8px 24px',
          fontSize: 18,
          fontWeight: 700,
          color: '#FF3B30',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 28,
        }}>
          ⏳ OFERTA DE LANZAMIENTO
        </div>

        {/* Título */}
        <div style={{
          fontSize: 58,
          fontWeight: 900,
          color: '#F5F5F7',
          textAlign: 'center',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <span>Visita a domicilio</span>
          <span style={{ color: '#2997FF' }}>+ diagnóstico técnico</span>
        </div>

        {/* Precio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <span style={{ fontSize: 32, color: '#444', textDecoration: 'line-through', fontWeight: 600 }}>$15.000</span>
          <span style={{ fontSize: 88, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>$10.000</span>
        </div>

        {/* Subtítulo */}
        <div style={{
          fontSize: 24,
          color: '#86868B',
          textAlign: 'center',
          marginBottom: 44,
        }}>
          Toda la Región Metropolitana · Sin traslados · Mismo día
        </div>

        {/* Logo + URL */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '14px 28px',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 9,
            background: 'linear-gradient(135deg, #0071E3, #2997FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 18, color: '#fff',
          }}>F</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>FIXDAY</span>
            <span style={{ fontSize: 14, color: '#2997FF', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>fixday.cl/oferta</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
