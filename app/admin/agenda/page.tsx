'use client'

import { useCallback, useEffect, useState } from 'react'
import { AGENDA_DEFAULT, AgendaConfig, formatoLargo } from '@/lib/agenda'
import { COMUNAS } from '@/app/zonas/comunas'

const SERVICIOS = [
  'Mantención de PC', 'Instalación de Windows', 'Recuperación de datos',
  'Optimización del sistema', 'Respaldo de información', 'WiFi y repetidores',
  'Diagnóstico general', 'Otro',
]

const NUEVA_VACIA = {
  name: '', phone: '', email: '', fecha: '', bloque: '', bloqueLibre: '',
  comuna: '', direccion: '', servicio: '', valor: '', mensaje: '',
}

interface CitaCreada {
  url: string
  whatsapp: string
  texto: string
  correoCliente: boolean
  motivoCorreo?: string
  aviso: string | null
}

interface Reserva {
  id: string; created_at: string; fecha: string; bloque: string
  name: string; phone: string; email?: string; comuna?: string
  direccion?: string; servicio?: string; mensaje?: string
  status: string; admin_note?: string; valor?: string; origen?: string
}

const ESTADOS: Record<string, { label: string; color: string }> = {
  pendiente:  { label: 'Por confirmar', color: '#FF9F0A' },
  confirmada: { label: 'Confirmada',    color: '#30D158' },
  cancelada:  { label: 'Cancelada',     color: '#FF453A' },
  realizada:  { label: 'Realizada',     color: '#636366' },
}

const card: React.CSSProperties = { background: '#0C0C0E', border: '1px solid #1C1C1E', borderRadius: 18, padding: 22 }
const field: React.CSSProperties = {
  width: '100%', background: '#000', border: '1px solid #2A2A2E', borderRadius: 10,
  padding: '11px 13px', color: '#F5F5F7', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
}
const lbl: React.CSSProperties = { display: 'block', fontSize: 12, color: '#8E8E93', marginBottom: 6, fontWeight: 600 }
const DIAS = [['1','Lun'],['2','Mar'],['3','Mié'],['4','Jue'],['5','Vie'],['6','Sáb'],['0','Dom']]

export default function AgendaAdmin() {
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [config, setConfig] = useState<AgendaConfig>(AGENDA_DEFAULT)
  const [hoy, setHoy] = useState('')
  const [dominioOk, setDominioOk] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState('pendiente')
  const [nuevaOpen, setNuevaOpen] = useState(false)
  const [nueva, setNueva] = useState(NUEVA_VACIA)
  const [creando, setCreando] = useState(false)
  const [errorNueva, setErrorNueva] = useState('')
  const [creada, setCreada] = useState<CitaCreada | null>(null)
  const [copiado, setCopiado] = useState(false)

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const r = await fetch('/api/admin/agenda')
      const d = await r.json()
      if (!r.ok) setError(d.error || 'No se pudo cargar la agenda.')
      else {
        setReservas(d.reservas ?? []); setConfig(d.config ?? AGENDA_DEFAULT)
        setHoy(d.hoy ?? ''); setDominioOk(Boolean(d.dominioVerificado)); setError('')
      }
    } catch { setError('Sin conexión con el servidor.') }
    setCargando(false)
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const avisar = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3500) }

  const cambiar = async (id: string, status: string) => {
    setReservas(rs => rs.map(r => r.id === id ? { ...r, status } : r))
    const res = await fetch('/api/admin/agenda', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    const d = await res.json().catch(() => ({}))
    if (status === 'confirmada') {
      avisar(d.correoCliente
        ? 'Confirmada · correo enviado al cliente ✓'
        : `Confirmada, pero el correo no salió: ${d.motivoCorreo ?? 'motivo desconocido'}`)
    } else avisar('Actualizada ✓')
  }

  const crearCita = async (e: React.FormEvent) => {
    e.preventDefault()
    if (creando) return
    const bloque = nueva.bloque === 'otro' ? nueva.bloqueLibre : nueva.bloque
    if (!nueva.name.trim() || !nueva.phone.trim() || !nueva.fecha || !bloque) {
      setErrorNueva('Completa nombre, teléfono, fecha y horario.')
      return
    }
    setErrorNueva(''); setCreando(true)
    try {
      const r = await fetch('/api/admin/agenda', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nueva, bloque }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'No se pudo crear la cita.')
      setCreada({ url: d.url, whatsapp: d.whatsapp, texto: d.texto, correoCliente: d.correoCliente, motivoCorreo: d.motivoCorreo, aviso: d.aviso })
      setNueva(NUEVA_VACIA)
      cargar()
    } catch (err) {
      setErrorNueva(err instanceof Error ? err.message : 'Error inesperado.')
    } finally {
      setCreando(false)
    }
  }

  const copiarMensaje = async () => {
    if (!creada) return
    try {
      await navigator.clipboard.writeText(creada.texto)
      setCopiado(true); setTimeout(() => setCopiado(false), 2200)
    } catch { /* el navegador no dio permiso al portapapeles */ }
  }

  const eliminar = async (id: string) => {
    setReservas(rs => rs.filter(r => r.id !== id))
    await fetch('/api/admin/agenda', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    avisar('Hora eliminada ✓')
  }

  const guardarConfig = async () => {
    const r = await fetch('/api/admin/settings', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'agenda_config', value: JSON.stringify(config) }),
    })
    avisar(r.ok ? 'Configuración guardada ✓' : 'No se pudo guardar')
  }

  const visibles = reservas
    .filter(r => filtro === 'Todas' ? true : r.status === filtro)
    .sort((a, b) => filtro === 'pendiente' ? a.fecha.localeCompare(b.fecha) : b.fecha.localeCompare(a.fecha))

  const pendientes = reservas.filter(r => r.status === 'pendiente').length
  const proximas = reservas.filter(r => r.status === 'confirmada' && r.fecha >= hoy).length

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px 80px' }}>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginBottom: 30 }}>
          <a href="/admin" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Leads</a>
          <a href="/admin/reports" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Informes</a>
          <a href="/admin/reviews" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Reseñas</a>
          <a href="/admin/referidos" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Referidos</a>
          <a href="/admin/maipu" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Maipú</a>
          <a href="/admin/agenda" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #2997FF', paddingBottom: 1 }}>Agenda</a>
          <a href="/agendar" target="_blank" rel="noopener noreferrer" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', marginLeft: 'auto' }}>Ver la página ↗</a>
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-.03em', margin: '0 0 6px' }}>Agenda</h1>
        <p style={{ color: '#8E8E93', fontSize: 14.5, margin: '0 0 24px' }}>
          {pendientes > 0
            ? <><strong style={{ color: '#FF9F0A' }}>{pendientes} hora{pendientes > 1 ? 's' : ''} esperando tu confirmación</strong> · {proximas} visita{proximas !== 1 ? 's' : ''} confirmada{proximas !== 1 ? 's' : ''} por delante.</>
            : `${proximas} visita${proximas !== 1 ? 's' : ''} confirmada${proximas !== 1 ? 's' : ''} por delante.`}
        </p>

        {error && (
          <div style={{ ...card, borderColor: 'rgba(255,159,10,.4)', background: 'rgba(255,159,10,.07)', marginBottom: 20 }}>
            <strong style={{ color: '#FF9F0A', fontSize: 14 }}>Atención:</strong>
            <span style={{ color: '#D1D1D6', fontSize: 14 }}> {error}</span>
          </div>
        )}
        {!error && !dominioOk && (
          <div style={{ ...card, borderColor: 'rgba(255,159,10,.35)', background: 'rgba(255,159,10,.06)', marginBottom: 20 }}>
            <strong style={{ color: '#FF9F0A', fontSize: 14 }}>El cliente no está recibiendo correos.</strong>
            <span style={{ color: '#D1D1D6', fontSize: 14 }}> Falta verificar el dominio fixday.cl en Resend y definir EMAIL_FROM en Vercel. Tú sí recibes los avisos.</span>
          </div>
        )}
        {msg && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1C1C1E', border: '1px solid #30D158', color: '#30D158', padding: '12px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600, zIndex: 99 }}>
            {msg}
          </div>
        )}

        {/* ── Nueva cita (cerrada por WhatsApp) ── */}
        <div style={{ ...card, marginBottom: 18, padding: nuevaOpen ? 24 : 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px' }}>Agendar una cita tú mismo</h2>
              <p style={{ fontSize: 13, color: '#8E8E93', margin: 0 }}>
                Para el cliente que cerró contigo por WhatsApp. Queda confirmada y le llega su comprobante.
              </p>
            </div>
            <button onClick={() => { setNuevaOpen(!nuevaOpen); setCreada(null); setErrorNueva('') }}
              style={{ background: nuevaOpen ? '#1C1C1E' : 'linear-gradient(135deg,#0071E3,#2997FF)', color: '#fff', border: nuevaOpen ? '1px solid #2A2A2E' : 'none', borderRadius: 999, padding: '12px 24px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {nuevaOpen ? 'Cerrar' : '+ Nueva cita'}
            </button>
          </div>

          {/* Resultado: la cita quedó creada */}
          {creada && (
            <div style={{ marginTop: 20, background: 'rgba(48,209,88,.07)', border: '1px solid rgba(48,209,88,.35)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: '#30D158', marginBottom: 6 }}>
                Cita creada y confirmada
              </div>
              <p style={{ fontSize: 13.5, color: '#AEAEB2', margin: '0 0 4px', lineHeight: 1.6 }}>
                {creada.correoCliente
                  ? 'Ya le llegó el comprobante por correo.'
                  : `No se envió correo: ${creada.motivoCorreo ?? 'motivo desconocido'}.`}
                {' '}Mándale también el mensaje por WhatsApp:
              </p>
              {creada.aviso && (
                <p style={{ fontSize: 12.5, color: '#FF9F0A', margin: '8px 0 0', fontWeight: 600 }}>⚠ {creada.aviso}</p>
              )}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
                <a href={creada.whatsapp} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 999, padding: '12px 22px', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
                  Enviar por WhatsApp
                </a>
                <button onClick={copiarMensaje}
                  style={{ background: '#1C1C1E', border: '1px solid #2A2A2E', color: copiado ? '#30D158' : '#F5F5F7', borderRadius: 999, padding: '12px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {copiado ? '¡Copiado!' : 'Copiar mensaje'}
                </button>
                <a href={creada.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', border: '1px solid #2A2A2E', color: '#2997FF', borderRadius: 999, padding: '12px 20px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  Ver el comprobante ↗
                </a>
              </div>
            </div>
          )}

          {/* Formulario */}
          {nuevaOpen && (
            <form onSubmit={crearCita} style={{ marginTop: 22 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={lbl}>Nombre del cliente *</label>
                  <input style={field} value={nueva.name} onChange={e => setNueva({ ...nueva, name: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Teléfono *</label>
                  <input style={field} value={nueva.phone} placeholder="+56 9 ..." inputMode="tel"
                    onChange={e => setNueva({ ...nueva, phone: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Correo (para enviarle el comprobante)</label>
                  <input style={field} type="email" value={nueva.email}
                    onChange={e => setNueva({ ...nueva, email: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Fecha *</label>
                  <input style={field} type="date" value={nueva.fecha}
                    onChange={e => setNueva({ ...nueva, fecha: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Horario *</label>
                  <select style={{ ...field, cursor: 'pointer' }} value={nueva.bloque}
                    onChange={e => setNueva({ ...nueva, bloque: e.target.value })}>
                    <option value="">Selecciona</option>
                    {config.bloques.map(b => <option key={b} value={b}>{b.replace('-', ' a ')}</option>)}
                    <option value="otro">Otro horario…</option>
                  </select>
                </div>
                {nueva.bloque === 'otro' && (
                  <div>
                    <label style={lbl}>Horario acordado *</label>
                    <input style={field} value={nueva.bloqueLibre} placeholder="20:00-21:30"
                      onChange={e => setNueva({ ...nueva, bloqueLibre: e.target.value })} />
                  </div>
                )}
                <div>
                  <label style={lbl}>Comuna</label>
                  <select style={{ ...field, cursor: 'pointer' }} value={nueva.comuna}
                    onChange={e => setNueva({ ...nueva, comuna: e.target.value })}>
                    <option value="">Selecciona</option>
                    {COMUNAS.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Dirección</label>
                  <input style={field} value={nueva.direccion} placeholder="calle y número"
                    onChange={e => setNueva({ ...nueva, direccion: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Servicio</label>
                  <select style={{ ...field, cursor: 'pointer' }} value={nueva.servicio}
                    onChange={e => setNueva({ ...nueva, servicio: e.target.value })}>
                    <option value="">Selecciona</option>
                    {SERVICIOS.map(x => <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Valor acordado</label>
                  <input style={field} value={nueva.valor} placeholder="$45.000"
                    onChange={e => setNueva({ ...nueva, valor: e.target.value })} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Qué hay que hacer (lo ve el cliente)</label>
                <textarea rows={2} style={{ ...field, resize: 'vertical' }} value={nueva.mensaje}
                  placeholder="Ej: cambio de disco a SSD y limpieza interna"
                  onChange={e => setNueva({ ...nueva, mensaje: e.target.value })} />
              </div>

              {errorNueva && <p style={{ color: '#FF6B6B', fontSize: 14, margin: '0 0 12px' }}>{errorNueva}</p>}

              <button type="submit" disabled={creando}
                style={{ background: creando ? '#1C4E8A' : 'linear-gradient(135deg,#0071E3,#2997FF)', color: '#fff', border: 'none', borderRadius: 999, padding: '14px 30px', fontSize: 15, fontWeight: 800, cursor: creando ? 'wait' : 'pointer', fontFamily: 'inherit' }}>
                {creando ? 'Creando…' : 'Crear cita y avisar al cliente'}
              </button>
            </form>
          )}
        </div>

        {/* ── Filtros ── */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {['pendiente', 'confirmada', 'realizada', 'cancelada', 'Todas'].map(f => (
            <button key={f} onClick={() => setFiltro(f)}
              style={{
                background: filtro === f ? '#1C1C1E' : 'transparent',
                border: `1px solid ${filtro === f ? '#2997FF' : '#26262A'}`,
                color: filtro === f ? '#F5F5F7' : '#8E8E93',
                borderRadius: 999, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>
              {f === 'Todas' ? 'Todas' : ESTADOS[f].label}
              {f === 'pendiente' && pendientes > 0 && (
                <span style={{ marginLeft: 7, background: '#FF9F0A', color: '#000', borderRadius: 999, padding: '1px 7px', fontSize: 11, fontWeight: 800 }}>{pendientes}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Reservas ── */}
        {cargando ? (
          <p style={{ color: '#636366', fontSize: 14 }}>Cargando…</p>
        ) : !visibles.length ? (
          <div style={{ ...card, textAlign: 'center', padding: 40, marginBottom: 34 }}>
            <p style={{ color: '#8E8E93', fontSize: 14.5, margin: 0 }}>No hay horas en este estado.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 34 }}>
            {visibles.map(r => {
              const est = ESTADOS[r.status] ?? ESTADOS.pendiente
              const pasada = r.fecha < hoy
              return (
                <div key={r.id} style={{ ...card, padding: 18, opacity: pasada && r.status !== 'pendiente' ? .62 : 1 }}>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <div style={{
                      background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.3)', borderRadius: 14,
                      padding: '10px 14px', textAlign: 'center', minWidth: 92, flexShrink: 0,
                    }}>
                      <div style={{ fontSize: 11, color: '#2997FF', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                        {formatoLargo(r.fecha).split(' ')[0].slice(0, 3)}
                      </div>
                      <div style={{ fontSize: 23, fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.2 }}>{r.fecha.slice(8, 10)}</div>
                      <div style={{ fontSize: 11, color: '#8E8E93' }}>{r.bloque.split('-')[0]}</div>
                    </div>

                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 800 }}>{r.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: est.color, background: `${est.color}1c`, border: `1px solid ${est.color}44`, borderRadius: 999, padding: '2px 10px' }}>
                          {est.label}
                        </span>
                        {r.origen === 'interna' && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#BF5AF2', background: 'rgba(191,90,242,.12)', border: '1px solid rgba(191,90,242,.3)', borderRadius: 999, padding: '2px 9px' }}>
                            agendada por ti
                          </span>
                        )}
                        {pasada && r.status === 'pendiente' && (
                          <span style={{ fontSize: 11, color: '#FF453A', fontWeight: 700 }}>· fecha ya pasó</span>
                        )}
                      </div>
                      <div style={{ fontSize: 13.5, color: '#AEAEB2', lineHeight: 1.6 }}>
                        {r.bloque.replace('-', ' a ')} · {r.comuna ?? 'sin comuna'}{r.direccion ? `, ${r.direccion}` : ''}
                      </div>
                      <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 3 }}>
                        {r.phone}{r.email ? ` · ${r.email}` : ' · sin correo'}
                      </div>
                      {(r.servicio || r.valor) && (
                        <div style={{ fontSize: 13, marginTop: 5, fontWeight: 600, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          {r.servicio && <span style={{ color: '#2997FF' }}>{r.servicio}</span>}
                          {r.valor && <span style={{ color: '#30D158' }}>{r.valor}</span>}
                        </div>
                      )}
                      {r.mensaje && <div style={{ fontSize: 13, color: '#AEAEB2', marginTop: 6, lineHeight: 1.55 }}>{r.mensaje}</div>}
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      {r.status === 'pendiente' && (
                        <>
                          <button onClick={() => cambiar(r.id, 'confirmada')}
                            style={{ background: '#30D158', color: '#04210C', border: 'none', borderRadius: 999, padding: '10px 18px', fontSize: 13.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Confirmar
                          </button>
                          <button onClick={() => cambiar(r.id, 'cancelada')}
                            style={{ background: 'transparent', color: '#FF453A', border: '1px solid rgba(255,69,58,.4)', borderRadius: 999, padding: '10px 16px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Rechazar
                          </button>
                        </>
                      )}
                      {(r.status === 'cancelada' || r.status === 'realizada') && (
                        <button onClick={() => eliminar(r.id)}
                          style={{ background: 'transparent', color: '#636366', border: '1px solid #2A2A2E', borderRadius: 999, padding: '10px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Eliminar
                        </button>
                      )}
                      {r.status === 'confirmada' && (
                        <button onClick={() => cambiar(r.id, 'realizada')}
                          style={{ background: '#1C1C1E', color: '#F5F5F7', border: '1px solid #2A2A2E', borderRadius: 999, padding: '10px 18px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Marcar realizada
                        </button>
                      )}
                      <a href={`/cita/${r.id}`} target="_blank" rel="noopener noreferrer"
                        style={{ background: 'transparent', border: '1px solid #2A2A2E', color: '#2997FF', borderRadius: 999, padding: '10px 14px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                        Comprobante
                      </a>
                      <a href={`https://wa.me/${r.phone.replace(/\D/g, '').replace(/^0+/, '').replace(/^(?!56)/, '56')}?text=${encodeURIComponent(`Hola ${r.name}, te escribo de FIXDAY por tu visita del ${formatoLargo(r.fecha)} entre ${r.bloque.replace('-', ' y ')}.`)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ background: '#25D366', color: '#fff', borderRadius: 999, padding: '10px 16px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Configuración ── */}
        <div style={card}>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px' }}>Cómo funciona tu agenda</h2>
          <p style={{ fontSize: 13, color: '#8E8E93', margin: '0 0 20px' }}>
            Esto define los horarios que ve el cliente en la web.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button onClick={() => setConfig({ ...config, activo: !config.activo })} type="button"
              style={{ width: 50, height: 29, borderRadius: 99, border: 'none', cursor: 'pointer', background: config.activo ? '#30D158' : '#39393D', position: 'relative', flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: 3, left: config.activo ? 24 : 3, width: 23, height: 23, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
            </button>
            <span style={{ fontSize: 14, color: '#D1D1D6' }}>
              {config.activo ? 'Agenda abierta: se pueden reservar horas.' : 'Agenda cerrada: la página ofrece solo WhatsApp.'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={lbl}>Visitas por bloque</label>
              <input style={field} type="number" min={1} max={10} value={config.maxPorBloque}
                onChange={e => setConfig({ ...config, maxPorBloque: parseInt(e.target.value || '1', 10) })} />
            </div>
            <div>
              <label style={lbl}>Días de anticipación</label>
              <input style={field} type="number" min={1} max={60} value={config.diasAnticipacion}
                onChange={e => setConfig({ ...config, diasAnticipacion: parseInt(e.target.value || '7', 10) })} />
            </div>
            <div>
              <label style={lbl}>Bloques (uno por línea)</label>
              <textarea style={{ ...field, resize: 'vertical', minHeight: 92 }} value={config.bloques.join('\n')}
                onChange={e => setConfig({ ...config, bloques: e.target.value.split('\n').map(x => x.trim()).filter(Boolean) })} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Días que atiendes</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DIAS.map(([n, txt]) => {
                const num = Number(n)
                const on = config.diasHabiles.includes(num)
                return (
                  <button key={n} type="button"
                    onClick={() => setConfig({
                      ...config,
                      diasHabiles: on ? config.diasHabiles.filter(d => d !== num) : [...config.diasHabiles, num].sort(),
                    })}
                    style={{
                      background: on ? 'rgba(41,151,255,.15)' : 'transparent',
                      border: `1px solid ${on ? '#2997FF' : '#26262A'}`,
                      color: on ? '#F5F5F7' : '#636366',
                      borderRadius: 10, padding: '9px 15px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                    {txt}
                  </button>
                )
              })}
            </div>
          </div>

          <button onClick={guardarConfig}
            style={{ background: '#2997FF', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 26px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Guardar configuración
          </button>
        </div>
      </div>
    </div>
  )
}
