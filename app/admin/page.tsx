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

  const handleLogout = useCallback(async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }, [router])

  useEffect(() => {
    fetch('/api/admin/leads')
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setLeads(d.leads ?? [])
      })
      .catch(() => setError('No se pudo conectar con la base de datos.'))
      .finally(() => setLoading(false))
  }, [])

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
          <a href="/" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none' }}>← Volver al sitio</a>
          <button onClick={handleLogout} style={{ background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 8, padding: '7px 16px', color: '#FF453A', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 0' }}>

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
