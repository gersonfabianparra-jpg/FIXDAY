import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FIXDAY — Un técnico en tu casa, hoy mismo. Santiago'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Imagen que se ve al compartir fixday.cl en WhatsApp, Facebook o Google.
 * Se lee en un recuadro chico, así que prioriza pocas ideas y letra grande.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#000', fontFamily: 'system-ui, sans-serif',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Luces de fondo */}
        <div style={{
          position: 'absolute', top: -160, left: -60, width: 700, height: 600,
          background: 'radial-gradient(ellipse, rgba(41,151,255,0.22) 0%, transparent 70%)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -200, right: -80, width: 700, height: 600,
          background: 'radial-gradient(ellipse, rgba(191,90,242,0.16) 0%, transparent 70%)', display: 'flex',
        }} />

        {/* Marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: 'linear-gradient(135deg, #0071E3, #2997FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 25, color: '#fff',
          }}>F</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>FIXDAY</span>
            <span style={{ fontSize: 12.5, color: '#2997FF', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
              Web + Técnico PC
            </span>
          </div>
        </div>

        {/* El mismo titular del sitio */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          fontSize: 68, fontWeight: 900, color: '#F5F5F7', textAlign: 'center',
          lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 22,
        }}>
          <span>Un técnico en tu casa.</span>
          <span style={{ color: '#2997FF' }}>Hoy mismo.</span>
        </div>

        {/* Prueba social real */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30,
          fontSize: 21, color: '#AEAEB2',
        }}>
          {/* Estrellas dibujadas: el generador de imágenes no trae el símbolo ★ */}
          <div style={{ display: 'flex', gap: 3 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FF9F0A">
                <path d="M12 2l2.9 6.26 6.6.72-4.9 4.45 1.36 6.57L12 16.7l-5.96 3.3 1.36-6.57L2.5 8.98l6.6-.72z" />
              </svg>
            ))}
          </div>
          <span style={{ color: '#fff', fontWeight: 800 }}>4.9</span>
          <span style={{ color: '#48484A' }}>·</span>
          <span>+100 clientes en la Región Metropolitana</span>
        </div>

        {/* Lo que ofrece */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 34 }}>
          {[
            { t: 'Reparación a domicilio', c: '#2997FF' },
            { t: 'Páginas web', c: '#BF5AF2' },
            { t: 'Agenda online', c: '#30D158' },
          ].map(s => (
            <div key={s.t} style={{
              background: `${s.c}1a`, border: `1px solid ${s.c}44`, borderRadius: 980,
              padding: '10px 22px', fontSize: 18, color: s.c, fontWeight: 700, display: 'flex',
            }}>{s.t}</div>
          ))}
        </div>

        {/* Cierre */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14, padding: '13px 26px', fontSize: 20, color: '#D1D1D6', fontWeight: 600,
        }}>
          <span style={{ color: '#fff', fontWeight: 800 }}>fixday.cl</span>
          <span style={{ color: '#48484A' }}>|</span>
          <span style={{ color: '#8E8E93' }}>Visita + diagnóstico $25.000</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
