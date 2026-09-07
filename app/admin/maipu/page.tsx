'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Panel de Maipú: control del cupón y los cupos, embudo de la página
 * y base de contactos lista para remarketing.
 */

const COMUNA = 'Maipú'
const CUPON_KEY = 'zona_cupon_maipu'
const CUPOS_KEY = 'zona_cupos_maipu'

interface Cupon { activo: boolean; codigo: string; monto: string; titulo: string; detalle: string; vence: string }
interface Cupos { activo: boolean; cuposHoy: number }
interface Lead {
  id: string; created_at: string; name: string; phone: string; email?: string
  service: string; message?: string; status?: string; comuna?: string
  source?: string; utm_source?: string; device?: string
}
interface Embudo { wa_click: number; form_open: number; form_skip: number; lead: number; cupon_copiado: number; movil: number; escritorio: number }

const CUPON_DEFAULT: Cupon = {
  activo: false, codigo: 'MAIPU5000', monto: '$5.000',
  titulo: 'Descuento exclusivo para vecinos de Maipú',
  detalle: 'Menciona el código al escribirnos y lo descontamos del total del servicio.',
  vence: '',
}
const ESTADOS = ['nuevo', 'contactado', 'agendado', 'cerrado', 'perdido']
const ESTADO_COLOR: Record<string, string> = {
  nuevo: '#2997FF', contactado: '#FF9F0A', agendado: '#BF5AF2', cerrado: '#30D158', perdido: '#636366',
}

const card: React.CSSProperties = { background: '#0C0C0E', border: '1px solid #1C1C1E', borderRadius: 18, padding: 24 }
const field: React.CSSProperties = {
  width: '100%', background: '#000', border: '1px solid #2A2A2E', borderRadius: 10,
  padding: '11px 13px', color: '#F5F5F7', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
}
const lbl: React.CSSProperties = { display: 'block', fontSize: 12, color: '#8E8E93', marginBottom: 6, fontWeight: 600 }

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)} type="button" aria-pressed={on}
      style={{
        width: 50, height: 29, borderRadius: 99, border: 'none', cursor: 'pointer', flexShrink: 0,
        background: on ? '#30D158' : '#39393D', position: 'relative', transition: 'background .2s',
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: on ? 24 : 3, width: 23, height: 23, borderRadius: '50%',
        background: '#fff', transition: 'left .2s cubic-bezier(.16,1,.3,1)',
      }} />
    </button>
  )
}

export default function MaipuPanel() {
  const [cupon, setCupon] = useState<Cupon>(CUPON_DEFAULT)
  const [cupos, setCupos] = useState<Cupos>({ activo: true, cuposHoy: 3 })
  const [embudo, setEmbudo] = useState<Embudo | null>(null)
  const [origenes, setOrigenes] = useState<Record<string, number>>({})
  const [leads, setLeads] = useState<Lead[]>([])
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('Todos')

  const loadSetting = async <T,>(key: string, fallback: T): Promise<T> => {
    try {
      const r = await fetch(`/api/admin/settings?key=${key}`)
      const d = await r.json()
      const p = JSON.parse(d.value)
      return (p && typeof p === 'object') ? p as T : fallback
    } catch { return fallback }
  }

  const load = useCallback(async () => {
    setLoading(true)
    setCupon(await loadSetting(CUPON_KEY, CUPON_DEFAULT))
    setCupos(await loadSetting(CUPOS_KEY, { activo: true, cuposHoy: 3 }))
    try {
      const r = await fetch(`/api/admin/zona?comuna=${encodeURIComponent(COMUNA)}`)
      const d = await r.json()
      if (!r.ok) setError(d.error || 'No se pudieron cargar los datos.')
      else { setEmbudo(d.embudo); setOrigenes(d.origenes ?? {}); setLeads(d.leads ?? []); setError('') }
    } catch { setError('Sin conexión con el servidor.') }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async (key: string, value: unknown, texto: string) => {
    setMsg('')
    const r = await fetch('/api/admin/settings', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: JSON.stringify(value) }),
    })
    setMsg(r.ok ? `${texto} guardado ✓` : 'No se pudo guardar')
    setTimeout(() => setMsg(''), 3000)
  }

  const cambiarEstado = async (id: string, status: string) => {
    setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l))
    await fetch('/api/admin/zona', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  }

  const visibles = filtro === 'Todos' ? leads : leads.filter(l => (l.status ?? 'nuevo') === filtro)

  /** Exporta los contactos para subirlos como público de remarketing. */
  const exportarCSV = () => {
    const filas = [
      ['nombre', 'telefono', 'email', 'comuna', 'estado', 'problema', 'origen', 'fecha'],
      ...visibles.map(l => [
        l.name, l.phone, l.email ?? '', l.comuna ?? COMUNA, l.status ?? 'nuevo',
        (l.message ?? '').replace(/[\r\n]+/g, ' '), l.utm_source || l.source || 'directo',
        new Date(l.created_at).toLocaleDateString('es-CL'),
      ]),
    ]
    const csv = filas.map(f => f.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `fixday-contactos-maipu-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px 80px' }}>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginBottom: 30 }}>
          <a href="/admin" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Leads</a>
          <a href="/admin/reports" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Informes</a>
          <a href="/admin/reviews" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Reseñas</a>
          <a href="/admin/referidos" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Referidos</a>
          <a href="/admin/maipu" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #2997FF', paddingBottom: 1 }}>Maipú</a>
          <a href="/zonas/maipu" target="_blank" rel="noopener noreferrer" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', marginLeft: 'auto' }}>Ver la página ↗</a>
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-.03em', margin: '0 0 6px' }}>Panel de Maipú</h1>
        <p style={{ color: '#8E8E93', fontSize: 14.5, margin: '0 0 28px' }}>
          Tu comuna con más contactos. Aquí controlas la oferta que ve la gente y sigues a cada persona que dejó sus datos.
        </p>

        {error && (
          <div style={{ ...card, borderColor: 'rgba(255,159,10,.4)', background: 'rgba(255,159,10,.07)', marginBottom: 22 }}>
            <strong style={{ color: '#FF9F0A', fontSize: 14 }}>Atención:</strong>
            <span style={{ color: '#D1D1D6', fontSize: 14 }}> {error}</span>
          </div>
        )}
        {msg && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1C1C1E', border: '1px solid #30D158', color: '#30D158', padding: '12px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600, zIndex: 99 }}>
            {msg}
          </div>
        )}

        {/* ── Embudo ── */}
        <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 14px' }}>Últimos 30 días en la página de Maipú</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 14 }}>
          {[
            { l: 'Quisieron escribir', v: embudo?.wa_click ?? 0, c: '#2997FF', h: 'Clics en botones de WhatsApp' },
            { l: 'Dejaron sus datos', v: embudo?.lead ?? 0, c: '#30D158', h: 'Completaron el paso rápido' },
            { l: 'Se saltaron el paso', v: embudo?.form_skip ?? 0, c: '#FF9F0A', h: 'Fueron directo a WhatsApp' },
            { l: 'Copiaron el cupón', v: embudo?.cupon_copiado ?? 0, c: '#BF5AF2', h: 'Interés en la oferta' },
          ].map(k => (
            <div key={k.l} style={{ ...card, padding: 18 }} title={k.h}>
              <div style={{ fontSize: 30, fontWeight: 900, color: k.c, lineHeight: 1, letterSpacing: '-.03em' }}>{k.v}</div>
              <div style={{ fontSize: 12.5, color: '#8E8E93', marginTop: 7, fontWeight: 600 }}>{k.l}</div>
              <div style={{ fontSize: 11, color: '#48484A', marginTop: 3 }}>{k.h}</div>
            </div>
          ))}
        </div>
        {embudo && (embudo.wa_click > 0) && (
          <p style={{ fontSize: 13, color: '#8E8E93', margin: '0 0 12px' }}>
            De cada 10 personas que quisieron escribirte, <strong style={{ color: '#30D158' }}>
              {Math.round((embudo.lead / Math.max(1, embudo.wa_click)) * 10)}</strong> te dejaron sus datos.
            {' '}Tráfico: {embudo.movil} desde el celular · {embudo.escritorio} desde computador.
          </p>
        )}
        {Object.keys(origenes).length > 0 && (
          <div style={{ ...card, marginBottom: 30, padding: 18 }}>
            <div style={{ fontSize: 12.5, color: '#8E8E93', fontWeight: 700, marginBottom: 10 }}>De dónde llegan</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
              {Object.entries(origenes).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                <span key={k} style={{ background: '#151518', border: '1px solid #26262A', borderRadius: 999, padding: '6px 13px', fontSize: 12.5, color: '#D1D1D6' }}>
                  {k} <strong style={{ color: '#2997FF' }}>{v}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Cupón ── */}
        <div style={{ ...card, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px' }}>Cupón exclusivo de Maipú</h2>
              <p style={{ fontSize: 13, color: '#8E8E93', margin: 0 }}>
                {cupon.activo ? 'Visible ahora en la página.' : 'Apagado: la sección no aparece en la página.'}
              </p>
            </div>
            <Toggle on={cupon.activo} onChange={v => setCupon({ ...cupon, activo: v })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, marginBottom: 14 }}>
            <div><label style={lbl}>Código</label>
              <input style={field} value={cupon.codigo} onChange={e => setCupon({ ...cupon, codigo: e.target.value.toUpperCase() })} /></div>
            <div><label style={lbl}>Monto visible</label>
              <input style={field} value={cupon.monto} onChange={e => setCupon({ ...cupon, monto: e.target.value })} /></div>
            <div><label style={lbl}>Vence (opcional)</label>
              <input style={field} type="date" value={cupon.vence} onChange={e => setCupon({ ...cupon, vence: e.target.value })} /></div>
          </div>
          <div style={{ marginBottom: 14 }}><label style={lbl}>Título</label>
            <input style={field} value={cupon.titulo} onChange={e => setCupon({ ...cupon, titulo: e.target.value })} /></div>
          <div style={{ marginBottom: 18 }}><label style={lbl}>Detalle</label>
            <input style={field} value={cupon.detalle} onChange={e => setCupon({ ...cupon, detalle: e.target.value })} /></div>

          <button onClick={() => save(CUPON_KEY, cupon, 'Cupón')}
            style={{ background: '#2997FF', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 26px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Guardar cupón
          </button>
        </div>

        {/* ── Cupos ── */}
        <div style={{ ...card, marginBottom: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px' }}>Cupos disponibles hoy</h2>
              <p style={{ fontSize: 13, color: '#8E8E93', margin: 0 }}>
                Se muestra en la barra del hero. Pon el número real según tu agenda: si lo apagas, solo se ve el horario.
              </p>
            </div>
            <Toggle on={cupos.activo} onChange={v => setCupos({ ...cupos, activo: v })} />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ width: 130 }}>
              <label style={lbl}>Cupos</label>
              <input style={field} type="number" min={0} max={20} value={cupos.cuposHoy}
                onChange={e => setCupos({ ...cupos, cuposHoy: parseInt(e.target.value || '0', 10) })} />
            </div>
            <button onClick={() => save(CUPOS_KEY, cupos, 'Cupos')}
              style={{ background: '#2997FF', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 26px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Guardar cupos
            </button>
          </div>
        </div>

        {/* ── Contactos ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, flex: 1, minWidth: 180 }}>
            Contactos de Maipú <span style={{ color: '#636366', fontWeight: 600 }}>({visibles.length})</span>
          </h2>
          <select value={filtro} onChange={e => setFiltro(e.target.value)}
            style={{ ...field, width: 'auto', padding: '9px 12px', cursor: 'pointer' }}>
            {['Todos', ...ESTADOS].map(s => <option key={s} value={s}>{s === 'Todos' ? 'Todos los estados' : s}</option>)}
          </select>
          <button onClick={exportarCSV} disabled={!visibles.length}
            style={{ background: visibles.length ? '#1C1C1E' : '#141416', border: '1px solid #2A2A2E', color: visibles.length ? '#F5F5F7' : '#48484A', borderRadius: 999, padding: '10px 20px', fontSize: 13.5, fontWeight: 600, cursor: visibles.length ? 'pointer' : 'default', fontFamily: 'inherit' }}>
            ↓ Exportar CSV
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#636366', fontSize: 14 }}>Cargando…</p>
        ) : !visibles.length ? (
          <div style={{ ...card, textAlign: 'center', padding: 40 }}>
            <p style={{ color: '#8E8E93', fontSize: 14.5, margin: 0 }}>
              Todavía no hay contactos guardados de Maipú.
            </p>
            <p style={{ color: '#636366', fontSize: 13, margin: '8px 0 0' }}>
              Aparecerán aquí en cuanto alguien complete el paso rápido antes de ir a WhatsApp.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {visibles.map(l => (
              <div key={l.id} style={{ ...card, padding: 18, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 210 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 700 }}>{l.name}</div>
                  <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 3 }}>
                    {l.phone !== '—' ? l.phone : 'sin teléfono'} · {new Date(l.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {l.message && <div style={{ fontSize: 13, color: '#AEAEB2', marginTop: 6, lineHeight: 1.5 }}>{l.message}</div>}
                  <div style={{ fontSize: 11, color: '#48484A', marginTop: 5 }}>
                    {l.utm_source || 'directo'} · {l.device || '—'}
                  </div>
                </div>
                <select
                  value={l.status ?? 'nuevo'} onChange={e => cambiarEstado(l.id, e.target.value)}
                  style={{ ...field, width: 'auto', padding: '8px 11px', cursor: 'pointer', color: ESTADO_COLOR[l.status ?? 'nuevo'], fontWeight: 700, fontSize: 13 }}
                >
                  {ESTADOS.map(s => <option key={s} value={s} style={{ color: '#F5F5F7' }}>{s}</option>)}
                </select>
                {l.phone !== '—' && (
                  <a
                    href={`https://wa.me/${l.phone.replace(/\D/g, '').replace(/^0+/, '').replace(/^(?!56)/, '56')}?text=${encodeURIComponent(`Hola ${l.name}, te escribo de FIXDAY por tu solicitud de técnico a domicilio en Maipú.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ background: '#25D366', color: '#fff', borderRadius: 999, padding: '9px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
