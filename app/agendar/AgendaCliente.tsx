'use client'

import { useEffect, useMemo, useState } from 'react'
import { COMUNAS } from '../zonas/comunas'
import { formatoLargo, nombreDia, numeroDia, mesCorto } from '@/lib/agenda'

interface BloqueDia { bloque: string; disponibles: number; libre: boolean }
interface Dia { fecha: string; bloques: BloqueDia[] }

const SERVICIOS = [
  'Mantención de PC', 'Instalación de Windows', 'Recuperación de datos',
  'Optimización del sistema', 'Respaldo de información', 'WiFi y repetidores',
  'No estoy seguro / otro',
]

const WA = 'https://wa.me/56936649332'

const field: React.CSSProperties = {
  width: '100%', background: '#0B0B0E', border: '1px solid #26262C', borderRadius: 12,
  padding: '13px 15px', color: '#F5F5F7', fontSize: 15, outline: 'none',
  fontFamily: 'inherit', boxSizing: 'border-box',
}
const lbl: React.CSSProperties = { display: 'block', fontSize: 12.5, color: '#8E8E93', marginBottom: 7, fontWeight: 600 }

export default function AgendaCliente({ comunaInicial }: { comunaInicial?: string }) {
  const [dias, setDias] = useState<Dia[]>([])
  const [cargando, setCargando] = useState(true)
  const [agendaAbierta, setAgendaAbierta] = useState(true)
  const [fallo, setFallo] = useState('')

  const [fecha, setFecha] = useState('')
  const [bloque, setBloque] = useState('')
  const [form, setForm] = useState({
    name: '', phone: '', email: '', comuna: comunaInicial ?? '',
    direccion: '', servicio: '', mensaje: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [listo, setListo] = useState<{ cuando: string; avisoCliente: boolean } | null>(null)

  useEffect(() => {
    fetch('/api/agenda')
      .then(r => r.json())
      .then(d => {
        setDias(d.dias ?? [])
        setAgendaAbierta(d.activo !== false)
        if (d.sinConexion) setFallo('agenda no disponible')
      })
      .catch(() => setFallo('agenda no disponible'))
      .finally(() => setCargando(false))
  }, [])

  const diaSel = useMemo(() => dias.find(d => d.fecha === fecha), [dias, fecha])

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (enviando) return
    if (!fecha || !bloque) { setError('Elige el día y el horario.'); return }
    if (form.name.trim().length < 2) { setError('Escribe tu nombre.'); return }
    if (form.phone.replace(/\D/g, '').length < 8) { setError('Escribe un teléfono válido.'); return }
    if (!form.comuna) { setError('Selecciona tu comuna.'); return }

    setError(''); setEnviando(true)
    try {
      const p = new URLSearchParams(window.location.search)
      const res = await fetch('/api/agenda', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form, fecha, bloque,
          source: '/agendar',
          utm_source: p.get('utm_source') || '',
          device: window.innerWidth < 768 ? 'movil' : 'escritorio',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No pudimos agendar tu hora.')
      setListo({ cuando: data.cuando, avisoCliente: Boolean(data.avisoCliente) })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado.')
    } finally {
      setEnviando(false)
    }
  }

  // ── Confirmación ──
  if (listo) {
    return (
      <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto', padding: '20px 0 40px' }}>
        <div style={{
          width: 76, height: 76, borderRadius: '50%', margin: '0 auto 24px',
          background: 'rgba(48,209,88,.12)', border: '2px solid rgba(48,209,88,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 900, letterSpacing: '-.03em', margin: '0 0 12px' }}>
          Recibimos tu solicitud
        </h1>
        <p style={{ color: '#AEAEB2', fontSize: 16, lineHeight: 1.7, margin: '0 0 8px' }}>
          Guardamos tu hora para el <strong style={{ color: '#F5F5F7' }}>{listo.cuando}</strong>.
        </p>
        <p style={{ color: '#8E8E93', fontSize: 14.5, lineHeight: 1.7, margin: '0 0 30px' }}>
          Te confirmaremos a la brevedad{form.email ? ' por correo' : ''} y por WhatsApp. Recuerda que la visita
          más el diagnóstico son $25.000, y se descuentan del total si haces la reparación con nosotros.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`${WA}?text=${encodeURIComponent(`Hola FIXDAY, acabo de agendar una visita para el ${listo.cuando}. Mi nombre es ${form.name}.`)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#25D366', color: '#fff', borderRadius: 980, padding: '15px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Avisar por WhatsApp
          </a>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)', color: '#fff', borderRadius: 980, padding: '15px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  // ── Agenda cerrada o sin conexión ──
  if (!cargando && (!agendaAbierta || fallo || !dias.length)) {
    return (
      <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto', padding: '30px 0' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 900, letterSpacing: '-.03em', margin: '0 0 12px' }}>
          Agenda por WhatsApp
        </h1>
        <p style={{ color: '#8E8E93', fontSize: 15.5, lineHeight: 1.7, margin: '0 0 26px' }}>
          En este momento no podemos mostrarte los horarios en línea. Escríbenos y coordinamos tu visita al tiro.
        </p>
        <a href={`${WA}?text=${encodeURIComponent('Hola FIXDAY, quiero agendar una visita técnica a domicilio')}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#25D366', color: '#fff', borderRadius: 980, padding: '15px 30px', fontSize: 15.5, fontWeight: 700, textDecoration: 'none' }}>
          Escribir por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <h1 style={{ fontSize: 'clamp(1.9rem,5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', lineHeight: 1.1, margin: '0 0 12px' }}>
        Agenda tu visita técnica
      </h1>
      <p style={{ color: '#8E8E93', fontSize: 16, lineHeight: 1.7, margin: '0 0 34px', maxWidth: 560 }}>
        Elige el día y la hora que te acomoden. Un técnico llega a tu casa u oficina en toda la Región Metropolitana.
        Visita + diagnóstico $25.000, que se descuentan si haces la reparación con nosotros.
      </p>

      {/* ── Paso 1: día ── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: fecha ? '#30D158' : '#2997FF', color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, letterSpacing: '-.01em' }}>Elige el día</h2>
        </div>

        {cargando ? (
          <p style={{ color: '#636366', fontSize: 14 }}>Cargando horarios disponibles…</p>
        ) : (
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'thin' }}>
            {dias.map(d => {
              const activo = d.fecha === fecha
              return (
                <button
                  key={d.fecha} type="button"
                  onClick={() => { setFecha(d.fecha); setBloque('') }}
                  style={{
                    flex: '0 0 auto', width: 92, padding: '14px 8px', borderRadius: 16, cursor: 'pointer',
                    background: activo ? 'linear-gradient(160deg,#0071E3,#2997FF)' : '#0C0C10',
                    border: `1px solid ${activo ? '#2997FF' : '#1F1F26'}`,
                    color: activo ? '#fff' : '#D1D1D6', fontFamily: 'inherit',
                    transition: 'all .18s ease', textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', opacity: .8, fontWeight: 700 }}>
                    {nombreDia(d.fecha).slice(0, 3)}
                  </div>
                  <div style={{ fontSize: 25, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-.03em' }}>{numeroDia(d.fecha)}</div>
                  <div style={{ fontSize: 11, opacity: .75, fontWeight: 600 }}>{mesCorto(d.fecha)}</div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Paso 2: horario ── */}
      {fecha && diaSel && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: bloque ? '#30D158' : '#2997FF', color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, letterSpacing: '-.01em' }}>Elige el horario</h2>
          </div>
          <p style={{ color: '#636366', fontSize: 13, margin: '0 0 14px 36px' }}>{formatoLargo(fecha)}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(155px,1fr))', gap: 10 }}>
            {diaSel.bloques.map(b => {
              const activo = b.bloque === bloque
              return (
                <button
                  key={b.bloque} type="button" disabled={!b.libre}
                  onClick={() => setBloque(b.bloque)}
                  style={{
                    padding: '15px 12px', borderRadius: 14, textAlign: 'left', fontFamily: 'inherit',
                    cursor: b.libre ? 'pointer' : 'not-allowed',
                    background: activo ? 'rgba(41,151,255,.14)' : b.libre ? '#0C0C10' : '#08080A',
                    border: `1px solid ${activo ? '#2997FF' : b.libre ? '#1F1F26' : '#141418'}`,
                    color: b.libre ? '#F5F5F7' : '#48484A',
                    transition: 'all .18s ease',
                  }}
                >
                  <div style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: '-.01em' }}>
                    {b.bloque.replace('-', ' a ')}
                  </div>
                  <div style={{ fontSize: 11.5, marginTop: 3, color: b.libre ? (b.disponibles === 1 ? '#FF9F0A' : '#30D158') : '#48484A', fontWeight: 600 }}>
                    {!b.libre ? 'No disponible' : b.disponibles === 1 ? 'Queda 1 cupo' : `${b.disponibles} cupos`}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Paso 3: datos ── */}
      {fecha && bloque && (
        <form onSubmit={enviar} style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#2997FF', color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, letterSpacing: '-.01em' }}>Tus datos</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl} htmlFor="ag-name">Nombre y apellido</label>
              <input id="ag-name" style={field} value={form.name} autoComplete="name"
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={lbl} htmlFor="ag-phone">Teléfono / WhatsApp</label>
              <input id="ag-phone" style={field} value={form.phone} inputMode="tel" autoComplete="tel"
                placeholder="+56 9 ..." onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label style={lbl} htmlFor="ag-email">Correo</label>
              <input id="ag-email" style={field} value={form.email} type="email" autoComplete="email"
                placeholder="para enviarte la confirmación" onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label style={lbl} htmlFor="ag-comuna">Comuna</label>
              <select id="ag-comuna" style={{ ...field, cursor: 'pointer' }} value={form.comuna}
                onChange={e => setForm({ ...form, comuna: e.target.value })}>
                <option value="">Selecciona tu comuna</option>
                {COMUNAS.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl} htmlFor="ag-dir">Dirección</label>
              <input id="ag-dir" style={field} value={form.direccion} autoComplete="street-address"
                placeholder="calle y número" onChange={e => setForm({ ...form, direccion: e.target.value })} />
            </div>
            <div>
              <label style={lbl} htmlFor="ag-serv">¿Qué necesitas?</label>
              <select id="ag-serv" style={{ ...field, cursor: 'pointer' }} value={form.servicio}
                onChange={e => setForm({ ...form, servicio: e.target.value })}>
                <option value="">Selecciona un servicio</option>
                {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={lbl} htmlFor="ag-msg">Cuéntanos el problema (opcional)</label>
            <textarea id="ag-msg" rows={3} style={{ ...field, resize: 'vertical' }} value={form.mensaje}
              placeholder="Ej: el notebook se apaga solo y hace ruido al encender"
              onChange={e => setForm({ ...form, mensaje: e.target.value })} />
          </div>

          {/* Resumen */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            background: 'rgba(41,151,255,.07)', border: '1px solid rgba(41,151,255,.25)',
            borderRadius: 14, padding: '14px 18px', marginBottom: 18,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.9" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span style={{ fontSize: 14.5, color: '#F5F5F7', fontWeight: 600 }}>
              {formatoLargo(fecha)} · {bloque.replace('-', ' a ')}
            </span>
          </div>

          {error && (
            <p style={{ color: '#FF6B6B', fontSize: 14, margin: '0 0 14px' }}>{error}</p>
          )}

          <button type="submit" disabled={enviando}
            style={{
              width: '100%', background: enviando ? '#1C4E8A' : 'linear-gradient(135deg,#0071E3,#2997FF)',
              color: '#fff', border: 'none', borderRadius: 999, padding: '17px 24px',
              fontSize: 16, fontWeight: 800, cursor: enviando ? 'wait' : 'pointer', fontFamily: 'inherit',
            }}>
            {enviando ? 'Agendando…' : 'Solicitar esta hora'}
          </button>
          <p style={{ fontSize: 12, color: '#5A5A60', textAlign: 'center', margin: '12px 0 0', lineHeight: 1.6 }}>
            Tu hora queda reservada y te confirmamos a la brevedad. Sin pago por adelantado.
          </p>
        </form>
      )}
    </div>
  )
}
