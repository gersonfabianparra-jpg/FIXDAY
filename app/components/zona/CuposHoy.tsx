'use client'

import { useEffect, useState } from 'react'

/**
 * Barra de disponibilidad en vivo.
 * El estado (abierto/cerrado) sale de la hora real; la cantidad de cupos la
 * defines tú desde /admin/maipu, así el número que ve el cliente es de verdad.
 */

interface Cfg { activo: boolean; cuposHoy: number }

interface Estado { abierto: boolean; titulo: string; detalle: string; color: string }

function calcular(): Estado {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()
  const day = d.getDay()
  const habil = day >= 1 && day <= 5
  const abierto = habil && (h > 8 || (h === 8 && m >= 0)) && h < 19

  if (abierto) {
    return { abierto: true, titulo: 'Atendiendo ahora', detalle: 'Agenda tu visita para hoy', color: '#30D158' }
  }
  if (habil && h < 8) {
    return { abierto: false, titulo: 'Abrimos hoy a las 08:00', detalle: 'Déjanos tu mensaje y partimos por ti', color: '#FF9F0A' }
  }
  if (habil) {
    return { abierto: false, titulo: 'Cerramos por hoy', detalle: 'Agenda ahora tu visita de mañana', color: '#FF9F0A' }
  }
  return { abierto: false, titulo: 'Fin de semana', detalle: 'Deja tu solicitud y partimos el lunes', color: '#FF9F0A' }
}

export default function CuposHoy({ comuna, settingKey }: { comuna: string; settingKey: string }) {
  const [estado, setEstado] = useState<Estado | null>(null)
  const [cfg, setCfg] = useState<Cfg | null>(null)

  useEffect(() => {
    setEstado(calcular())
    const id = setInterval(() => setEstado(calcular()), 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    fetch(`/api/settings?key=${settingKey}`)
      .then(r => r.json())
      .then(d => {
        try {
          const parsed = JSON.parse(d.value)
          if (parsed && typeof parsed === 'object') setCfg(parsed as Cfg)
        } catch { /* sin configurar: se muestra solo el estado horario */ }
      })
      .catch(() => {})
  }, [settingKey])

  if (!estado) return null // evita desajuste entre servidor y navegador

  const mostrarCupos = Boolean(cfg?.activo) && typeof cfg?.cuposHoy === 'number' && cfg.cuposHoy > 0
  const cupos = cfg?.cuposHoy ?? 0
  const pct = mostrarCupos ? Math.max(12, Math.min(100, (cupos / 5) * 100)) : 0

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      background: 'linear-gradient(135deg, rgba(48,209,88,.07), rgba(41,151,255,.05))',
      border: `1px solid ${estado.color}38`, borderRadius: 18, padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 200, flex: 1 }}>
        <span style={{ position: 'relative', display: 'inline-flex', width: 11, height: 11, flexShrink: 0 }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: estado.color,
            animation: estado.abierto ? 'zcPing 1.8s cubic-bezier(0,0,.2,1) infinite' : 'none', opacity: .75,
          }} />
          <span style={{ position: 'relative', width: 11, height: 11, borderRadius: '50%', background: estado.color }} />
        </span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#F5F5F7', letterSpacing: '-.01em' }}>
            {estado.titulo}
          </div>
          <div style={{ fontSize: 12.5, color: '#8E8E93', marginTop: 2 }}>{estado.detalle}</div>
        </div>
      </div>

      {mostrarCupos && (
        <div style={{ minWidth: 190, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
            <span style={{ fontSize: 12, color: '#8E8E93', fontWeight: 600 }}>
              Cupos para {comuna} hoy
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: estado.color }}>
              {cupos}
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${pct}%`, borderRadius: 99,
              background: `linear-gradient(90deg, ${estado.color}, #2997FF)`,
              transition: 'width .8s cubic-bezier(.16,1,.3,1)',
            }} />
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes zcPing{75%,100%{transform:scale(2.4);opacity:0}}
      ` }} />
    </div>
  )
}
