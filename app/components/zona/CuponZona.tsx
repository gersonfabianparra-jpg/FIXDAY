'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from './track'

/**
 * Cupón exclusivo de la comuna. Se administra desde /admin/maipu:
 * si está apagado, esta sección simplemente no aparece en la página.
 */

interface Cupon {
  activo: boolean
  codigo: string
  monto: string
  titulo: string
  detalle: string
  vence: string // YYYY-MM-DD, vacío = sin vencimiento
}

export default function CuponZona({ comuna, settingKey }: { comuna: string; settingKey: string }) {
  const [cupon, setCupon] = useState<Cupon | null>(null)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    fetch(`/api/settings?key=${settingKey}`)
      .then(r => r.json())
      .then(d => {
        try {
          const p = JSON.parse(d.value)
          if (p && typeof p === 'object' && p.activo && p.codigo) setCupon(p as Cupon)
        } catch { /* apagado o sin configurar */ }
      })
      .catch(() => {})
  }, [settingKey])

  if (!cupon) return null

  const diasRestantes = (() => {
    if (!cupon.vence) return null
    const fin = new Date(`${cupon.vence}T23:59:59`)
    const dias = Math.ceil((fin.getTime() - Date.now()) / 86400000)
    return dias
  })()

  if (diasRestantes !== null && diasRestantes < 0) return null // venció: se oculta solo

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(cupon.codigo)
      setCopiado(true)
      trackEvent('cupon_copiado', comuna, 'cupon')
      setTimeout(() => setCopiado(false), 2200)
    } catch { /* navegador sin permiso de portapapeles */ }
  }

  return (
    <div style={{
      position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22,
      background: 'linear-gradient(120deg, rgba(255,159,10,.13), rgba(191,90,242,.1))',
      border: '1px dashed rgba(255,159,10,.45)', borderRadius: 22,
      padding: 'clamp(22px,3.4vw,32px)', overflow: 'hidden',
    }}>
      {/* Muescas laterales, para que se lea como un ticket */}
      <span style={{ position: 'absolute', left: -11, top: '50%', width: 22, height: 22, borderRadius: '50%', background: '#000', transform: 'translateY(-50%)' }} />
      <span style={{ position: 'absolute', right: -11, top: '50%', width: 22, height: 22, borderRadius: '50%', background: '#000', transform: 'translateY(-50%)' }} />

      <div style={{ flex: 1, minWidth: 240 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#FF9F0A', letterSpacing: '.11em', textTransform: 'uppercase', marginBottom: 9 }}>
          Solo para {comuna}
        </div>
        <h3 style={{ fontSize: 'clamp(1.25rem,2.8vw,1.6rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.22, margin: '0 0 9px', color: '#F5F5F7' }}>
          {cupon.titulo}
        </h3>
        <p style={{ fontSize: 14, color: '#9A9AA0', lineHeight: 1.6, margin: 0 }}>
          {cupon.detalle}
        </p>
        {diasRestantes !== null && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 13, fontSize: 12.5, fontWeight: 700, color: '#FF9F0A' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
            </svg>
            {diasRestantes === 0 ? 'Vence hoy' : diasRestantes === 1 ? 'Queda 1 día' : `Quedan ${diasRestantes} días`}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 190 }}>
        <div style={{ fontSize: 'clamp(1.9rem,5vw,2.6rem)', fontWeight: 900, letterSpacing: '-.04em', color: '#FF9F0A', lineHeight: 1 }}>
          {cupon.monto}
        </div>
        <button
          onClick={copiar}
          style={{
            display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer',
            background: copiado ? 'rgba(48,209,88,.16)' : 'rgba(255,255,255,.06)',
            border: `1.5px dashed ${copiado ? 'rgba(48,209,88,.6)' : 'rgba(255,159,10,.55)'}`,
            borderRadius: 12, padding: '12px 18px',
            color: copiado ? '#30D158' : '#F5F5F7',
            fontSize: 17, fontWeight: 900, letterSpacing: '.08em', fontFamily: 'inherit',
            transition: 'all .2s ease',
          }}
        >
          {copiado ? '¡Copiado!' : cupon.codigo}
          {!copiado && (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
        <span style={{ fontSize: 11.5, color: '#6E6E73' }}>Menciónalo al escribirnos</span>
      </div>
    </div>
  )
}
