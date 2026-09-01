'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Lead {
  id: string
  created_at: string
  name: string
  phone: string
  email: string | null
  service: string
  message: string | null
}

const WA = (phone: string, name: string, service: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${name}! Vi tu solicitud de ${service}. ¿Cuándo te queda bien para la visita?`)}`

const SERVICE_COLORS: Record<string, string> = {
  'Mantención lógica y física': '#0071E3',
  'Respaldo de información':    '#34C759',
  'Recuperación de datos':      '#FF9F0A',
  'Instalación de Windows':     '#5E5CE6',
  'Optimización del sistema':   '#30D158',
  'Instalación WiFi / Repetidores': '#2997FF',
  'Otro / No sé qué tiene':    '#636366',
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
}

export default function AdminPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [mascotOn, setMascotOn] = useState(true)
  const [mascotSaving, setMascotSaving] = useState(false)
  const [carouselSecs, setCarouselSecs] = useState('6')
  const [reviewLimit, setReviewLimit] = useState('6')
  const [reviewSettingSaving, setReviewSettingSaving] = useState(false)

  const handleLogout = useCallback(async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }, [router])

  const loadLeads = useCallback((silent = false) => {
    if (!silent) setLoading(true)
    fetch('/api/admin/leads', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setLeads(d.leads ?? [])
      })
      .catch(() => setError('No se pudo conectar con la base de datos.'))
      .finally(() => { if (!silent) setLoading(false) })
  }, [])

  useEffect(() => {
    loadLeads()
    const interval = setInterval(() => loadLeads(true), 30_000)
    return () => clearInterval(interval)
  }, [loadLeads])

  useEffect(() => {
    fetch('/api/admin/settings?key=mascot_enabled')
      .then(r => r.json())
      .then(d => setMascotOn(d.value !== 'false'))
      .catch(() => {})
    fetch('/api/admin/settings?key=review_carousel_seconds')
      .then(r => r.json())
      .then(d => { if (d.value) setCarouselSecs(d.value) })
      .catch(() => {})
    fetch('/api/admin/settings?key=review_public_limit')
      .then(r => r.json())
      .then(d => { if (d.value) setReviewLimit(d.value) })
      .catch(() => {})
  }, [])

  const saveReviewSettings = async () => {
    setReviewSettingSaving(true)
    await Promise.all([
      fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'review_carousel_seconds', value: carouselSecs }) }),
      fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'review_public_limit', value: reviewLimit }) }),
    ]).catch(() => {})
    setReviewSettingSaving(false)
  }

  const toggleMascot = async () => {
    const next = !mascotOn
    setMascotOn(next)
    setMascotSaving(true)
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'mascot_enabled', value: String(next) }),
    }).catch(() => {})
    setMascotSaving(false)
  }

  const services = ['Todos', ...Array.from(new Set(leads.map(l => l.service)))]

  const visible = leads.filter(l => {
    const matchSearch = search === '' ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.service.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todos' || l.service === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F7', fontFamily: '-apple-system, sans-serif', padding: '0 0 80px' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.1)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>F</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>FIXDAY <span style={{ color: '#636366', fontWeight: 400, fontSize: 14 }}>/ Admin</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => loadLeads()} style={{ background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.25)', borderRadius: 8, padding: '6px 14px', color: '#2997FF', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>↻ Actualizar</button>
          <a href="/admin" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #2997FF', paddingBottom: 1 }}>Leads</a>
          <a href="/admin/reports" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Informes</a>
          <a href="/admin/reviews" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Reseñas</a>
          <a href="/admin/referidos" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Referidos</a>
          <a href="/" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none' }}>← Volver al sitio</a>
          <button onClick={handleLogout} style={{ background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 8, padding: '7px 16px', color: '#FF453A', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 0' }}>

        {/* Mascota Bix */}
        <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: mascotOn ? 'rgba(41,151,255,.12)' : 'rgba(255,255,255,.05)', border: `1px solid ${mascotOn ? 'rgba(41,151,255,.3)' : 'rgba(255,255,255,.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>Mascota Bix</div>
              <div style={{ fontSize: 12, color: '#636366' }}>{mascotOn ? 'Visible en el sitio público' : 'Oculta en el sitio público'}</div>
            </div>
          </div>
          <button
            onClick={toggleMascot}
            disabled={mascotSaving}
            style={{
              background: mascotOn ? '#2997FF' : 'rgba(255,255,255,.08)',
              border: mascotOn ? 'none' : '1px solid rgba(255,255,255,.12)',
              borderRadius: 980, padding: '8px 20px',
              color: mascotOn ? '#fff' : '#636366',
              fontSize: 13, fontWeight: 600, cursor: mascotSaving ? 'not-allowed' : 'pointer',
              opacity: mascotSaving ? 0.6 : 1, transition: 'all 0.2s',
            }}
          >
            {mascotSaving ? 'Guardando…' : mascotOn ? 'Activa' : 'Inactiva'}
          </button>
        </div>

        {/* Reseñas config */}
        <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,159,10,.1)', border: '1px solid rgba(255,159,10,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⭐</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>Configuración de Reseñas</div>
              <div style={{ fontSize: 12, color: '#636366' }}>Velocidad del carrusel y cantidad de reseñas visibles en el sitio</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#636366', display: 'block', marginBottom: 6, fontWeight: 600 }}>Segundos entre slides</label>
              <input
                type="number" min="2" max="30" value={carouselSecs}
                onChange={e => setCarouselSecs(e.target.value)}
                style={{ width: '100%', background: '#0A0A0A', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, padding: '8px 12px', color: '#F5F5F7', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
              <div style={{ fontSize: 11, color: '#3A3A3C', marginTop: 4 }}>Recomendado: 6–10 segundos</div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#636366', display: 'block', marginBottom: 6, fontWeight: 600 }}>Reseñas públicas máximas</label>
              <input
                type="number" min="1" max="20" value={reviewLimit}
                onChange={e => setReviewLimit(e.target.value)}
                style={{ width: '100%', background: '#0A0A0A', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, padding: '8px 12px', color: '#F5F5F7', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
              <div style={{ fontSize: 11, color: '#3A3A3C', marginTop: 4 }}>Cuántas se muestran en la home</div>
            </div>
          </div>
          <button
            onClick={saveReviewSettings}
            disabled={reviewSettingSaving}
            style={{ background: '#FF9F0A', border: 'none', borderRadius: 980, padding: '8px 20px', color: '#000', fontSize: 13, fontWeight: 700, cursor: reviewSettingSaving ? 'not-allowed' : 'pointer', opacity: reviewSettingSaving ? 0.6 : 1 }}
          >
            {reviewSettingSaving ? 'Guardando…' : 'Guardar configuración'}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Total leads', value: leads.length, color: '#2997FF' },
            { label: 'Este mes', value: leads.filter(l => new Date(l.created_at).getMonth() === new Date().getMonth()).length, color: '#30D158' },
            { label: 'Con email', value: leads.filter(l => l.email).length, color: '#FF9F0A' },
          ].map(s => (
            <div key={s.label} style={{ background: '#161616', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: '24px 28px' }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#636366', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre, teléfono o servicio…"
            style={{ flex: 1, minWidth: 220, background: '#161616', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '10px 16px', color: '#F5F5F7', fontSize: 14, outline: 'none' }}
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ background: '#161616', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '10px 16px', color: '#F5F5F7', fontSize: 14, outline: 'none' }}
          >
            {services.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        {loading && (
          <div style={{ textAlign: 'center', padding: 80, color: '#636366' }}>Cargando leads…</div>
        )}
        {error && (
          <div style={{ background: 'rgba(255,69,58,.1)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 12, padding: 24, color: '#FF453A', marginBottom: 24 }}>
            <strong>Error:</strong> {error}
            <p style={{ marginTop: 8, color: '#FF6961', fontSize: 13 }}>Asegúrate de haber configurado NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local</p>
          </div>
        )}
        {!loading && !error && visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: 80, color: '#636366' }}>
            {leads.length === 0 ? 'Aún no hay leads. Los formularios enviados aparecerán aquí.' : 'No hay resultados para tu búsqueda.'}
          </div>
        )}
        {!loading && visible.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {visible.map(lead => (
              <div key={lead.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 16, alignItems: 'center' }}>

                {/* Name + date */}
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#F5F5F7' }}>{lead.name}</div>
                  <div style={{ fontSize: 12, color: '#636366', marginTop: 4 }}>{fmtDate(lead.created_at)}</div>
                </div>

                {/* Contact */}
                <div>
                  <div style={{ fontSize: 14, color: '#F5F5F7' }}>{lead.phone}</div>
                  {lead.email && <div style={{ fontSize: 12, color: '#636366', marginTop: 2 }}>{lead.email}</div>}
                </div>

                {/* Service + message */}
                <div>
                  <span style={{ display: 'inline-block', background: `${SERVICE_COLORS[lead.service] ?? '#636366'}18`, color: SERVICE_COLORS[lead.service] ?? '#636366', border: `1px solid ${SERVICE_COLORS[lead.service] ?? '#636366'}40`, borderRadius: 980, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>
                    {lead.service}
                  </span>
                  {lead.message && (
                    <div style={{ fontSize: 12, color: '#86868B', marginTop: 6, lineHeight: 1.5, maxWidth: 260, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {lead.message}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={WA(lead.phone, lead.name, lead.service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: '#25D366', color: '#fff', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
