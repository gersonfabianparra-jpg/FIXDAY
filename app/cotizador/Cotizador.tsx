'use client'

import { useState } from 'react'

const WA = '56936649332'

type Track = 'pc' | 'web'

interface Option { id: string; label: string; desc: string; price: number; icon: string }

const PC_OPTIONS: Option[] = [
  { id: 'lento', label: 'Está lento', desc: 'Demora en encender, se traba, va pesado', price: 20000, icon: '🐢' },
  { id: 'no-enciende', label: 'No enciende', desc: 'No prende, pantalla negra, se apaga solo', price: 25000, icon: '⚡' },
  { id: 'virus', label: 'Tiene virus', desc: 'Publicidad, programas raros, todo lento', price: 20000, icon: '🦠' },
  { id: 'datos', label: 'Recuperar archivos', desc: 'Borré/perdí fotos o documentos importantes', price: 35000, icon: '💾' },
  { id: 'windows', label: 'Instalar Windows', desc: 'Formatear, dejar el sistema como nuevo', price: 30000, icon: '🪟' },
  { id: 'mantencion', label: 'Mantención / limpieza', desc: 'Limpieza interna, pasta térmica, prevención', price: 25000, icon: '🧰' },
  { id: 'wifi', label: 'WiFi / internet', desc: 'Señal débil, configurar router o repetidor', price: 30000, icon: '📶' },
]

const WEB_OPTIONS: Option[] = [
  { id: 'landing', label: 'Una página (landing)', desc: 'Un sitio de una página para presentar tu negocio', price: 200000, icon: '📄' },
  { id: 'sitio', label: 'Sitio completo', desc: 'Varias secciones: inicio, servicios, contacto, blog', price: 200000, icon: '🌐' },
  { id: 'tienda', label: 'Tienda online', desc: 'Catálogo y pagos en línea (Webpay/MercadoPago)', price: 450000, icon: '🛒' },
]

const clp = (n: number) => '$' + n.toLocaleString('es-CL')

export default function Cotizador() {
  const [track, setTrack] = useState<Track | null>(null)
  const [choice, setChoice] = useState<Option | null>(null)

  const reset = () => { setTrack(null); setChoice(null) }

  // Resultado
  if (choice && track) {
    const isPc = track === 'pc'
    const total = choice.price
    const waMsg = encodeURIComponent(
      `Hola FIXDAY 👋 Usé el cotizador y necesito: ${choice.label}${isPc ? ` (${choice.desc})` : ''}. ` +
      `El estimado fue ${isPc ? 'desde ' : 'desde '}${clp(total)}. ¿Podemos coordinar?`
    )
    return (
      <div style={card}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 6 }}>{choice.icon}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Tu estimado</div>
          <div style={{ fontSize: 15, color: '#C7C7CC', marginBottom: 6 }}>{choice.label}</div>
          <div style={{ fontSize: 'clamp(2.6rem,8vw,3.6rem)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1, background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            desde {clp(total)}
          </div>
        </div>

        {isPc ? (
          <div style={breakdown}>
            <Row label="Visita + diagnóstico a domicilio" value={clp(20000)} note="se descuenta si reparas" />
            <Row label={choice.label} value={`desde ${clp(total)}`} />
            <div style={{ fontSize: 12.5, color: '#8A8A8F', lineHeight: 1.6, marginTop: 10 }}>
              El valor final depende del diagnóstico. Te confirmamos el precio exacto antes de reparar — sin sorpresas.
            </div>
          </div>
        ) : (
          <div style={breakdown}>
            <Row label={choice.label} value={`desde ${clp(total)}`} note="incluye dominio + hosting 1 año" />
            <div style={{ fontSize: 12.5, color: '#8A8A8F', lineHeight: 1.6, marginTop: 10 }}>
              El valor final depende del alcance del proyecto. Te enviamos una propuesta a tu medida, sin compromiso.
            </div>
          </div>
        )}

        <a href={`https://wa.me/${WA}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" style={ctaBtn}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
          Agendar por WhatsApp con este estimado
        </a>
        <button onClick={reset} style={resetBtn}>← Cotizar otra cosa</button>
      </div>
    )
  }

  // Paso 2: elegir problema/servicio
  if (track) {
    const opts = track === 'pc' ? PC_OPTIONS : WEB_OPTIONS
    return (
      <div style={card}>
        <button onClick={() => setTrack(null)} style={backLink}>← Volver</button>
        <h2 style={stepTitle}>{track === 'pc' ? '¿Qué le pasa a tu computador?' : '¿Qué tipo de sitio necesitas?'}</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setChoice(o)} className="cot-opt" style={optBtn}>
              <span style={{ fontSize: 26, flexShrink: 0 }}>{o.icon}</span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: '#F5F5F7' }}>{o.label}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: '#8A8A8F', marginTop: 2 }}>{o.desc}</span>
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2997FF', whiteSpace: 'nowrap' }}>desde {clp(o.price)}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Paso 1: elegir vía
  return (
    <div style={card}>
      <h2 style={stepTitle}>¿En qué te ayudamos?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
        <button onClick={() => setTrack('pc')} className="cot-opt" style={{ ...bigBtn }}>
          <span style={{ fontSize: 40 }}>🖥️</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#F5F5F7' }}>Reparar mi computador</span>
          <span style={{ fontSize: 12.5, color: '#8A8A8F' }}>Técnico a domicilio en la RM</span>
        </button>
        <button onClick={() => setTrack('web')} className="cot-opt" style={{ ...bigBtn }}>
          <span style={{ fontSize: 40 }}>🌐</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#F5F5F7' }}>Crear mi página web</span>
          <span style={{ fontSize: 12.5, color: '#8A8A8F' }}>Diseño profesional para tu negocio</span>
        </button>
      </div>
    </div>
  )
}

function Row({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <span style={{ fontSize: 13.5, color: '#C7C7CC' }}>{label}{note && <span style={{ display: 'block', fontSize: 11.5, color: '#636366' }}>{note}</span>}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F7', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  )
}

const card: React.CSSProperties = { maxWidth: 560, margin: '0 auto', background: '#0C0C0C', border: '1px solid rgba(255,255,255,.09)', borderRadius: 24, padding: 'clamp(24px,4vw,36px)' }
const stepTitle: React.CSSProperties = { fontSize: 'clamp(1.3rem,3vw,1.7rem)', fontWeight: 900, letterSpacing: '-.02em', marginBottom: 22, color: '#F5F5F7', textAlign: 'center' }
const bigBtn: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', background: '#151515', border: '1px solid rgba(255,255,255,.1)', borderRadius: 18, padding: '28px 20px', cursor: 'pointer' }
const optBtn: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', background: '#151515', border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, padding: '14px 16px', cursor: 'pointer', width: '100%' }
const breakdown: React.CSSProperties = { margin: '24px 0', background: 'rgba(41,151,255,.05)', border: '1px solid rgba(41,151,255,.15)', borderRadius: 16, padding: '18px 20px' }
const ctaBtn: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '15px 24px', fontSize: 15, fontWeight: 700, textDecoration: 'none', marginTop: 8, boxShadow: '0 10px 30px rgba(37,211,102,.3)' }
const resetBtn: React.CSSProperties = { display: 'block', margin: '16px auto 0', background: 'none', border: 'none', color: '#636366', fontSize: 13, cursor: 'pointer' }
const backLink: React.CSSProperties = { background: 'none', border: 'none', color: '#2997FF', fontSize: 13, cursor: 'pointer', marginBottom: 16, padding: 0 }
