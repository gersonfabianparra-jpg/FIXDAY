'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Report {
  id: string
  created_at: string
  report_number: number
  client_name: string
  client_phone: string
  equipment_type: string
  brand_model?: string
  total_cost?: number
  warranty_days: number
  status: string
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
}

function fmtCost(n?: number) {
  if (!n) return '—'
  return `$${n.toLocaleString('es-CL')}`
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  completado:      { label: 'Completado',      color: '#30D158' },
  en_proceso:      { label: 'En proceso',       color: '#FF9F0A' },
  pendiente:       { label: 'Pendiente',        color: '#636366' },
  sin_reparacion:  { label: 'Sin reparación',   color: '#FF453A' },
}

export default function ReportsPage() {
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const handleLogout = useCallback(async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }, [router])

  useEffect(() => {
    fetch('/api/admin/reports')
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setReports(d.reports ?? [])
      })
      .catch(() => setError('No se pudo conectar con la base de datos.'))
      .finally(() => setLoading(false))
  }, [])

  const visible = reports.filter(r => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      r.client_name.toLowerCase().includes(q) ||
      r.client_phone.includes(q) ||
      r.equipment_type.toLowerCase().includes(q) ||
      (r.brand_model ?? '').toLowerCase().includes(q)
    )
  })

  const shareWA = (r: Report) => {
    const url = `https://fixday.cl/reporte/${r.id}`
    const msg = `Hola ${r.client_name}! Te comparto tu informe técnico FIXDAY N°${String(r.report_number).padStart(3, '0')}:\n\n${url}\n\n¡Gracias por confiar en nosotros! 🔧`
    window.open(`https://wa.me/${r.client_phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F7', fontFamily: '-apple-system, sans-serif', padding: '0 0 80px' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.1)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>F</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>FIXDAY <span style={{ color: '#636366', fontWeight: 400, fontSize: 14 }}>/ Admin</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/admin" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Leads</Link>
          <Link href="/admin/reports" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #2997FF', paddingBottom: 1 }}>Informes</Link>
          <Link href="/admin/reviews" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Reseñas</Link>
          <Link href="/admin/maipu" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Maipú</Link>
          <a href="/" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none' }}>← Volver al sitio</a>
          <button onClick={handleLogout} style={{ background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 8, padding: '7px 16px', color: '#FF453A', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 0' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.02em' }}>Informes técnicos</h1>
            <p style={{ color: '#636366', fontSize: 14, marginTop: 4 }}>{reports.length} informe{reports.length !== 1 ? 's' : ''} en total</p>
          </div>
          <Link
            href="/admin/reports/new"
            style={{ background: '#2997FF', color: '#fff', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            + Nuevo informe
          </Link>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 24 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por cliente, equipo o modelo…"
            style={{ width: '100%', maxWidth: 440, background: '#161616', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '10px 16px', color: '#F5F5F7', fontSize: 14, outline: 'none' }}
          />
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 80, color: '#636366' }}>Cargando informes…</div>}
        {error && (
          <div style={{ background: 'rgba(255,69,58,.1)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 12, padding: 24, color: '#FF453A' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {!loading && !error && visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: 80, color: '#636366' }}>
            {reports.length === 0 ? (
              <>
                <p style={{ fontSize: 18, marginBottom: 16 }}>Aún no hay informes</p>
                <Link href="/admin/reports/new" style={{ color: '#2997FF', fontSize: 14 }}>Crear el primer informe →</Link>
              </>
            ) : 'No hay resultados para tu búsqueda.'}
          </div>
        )}
        {!loading && visible.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {visible.map(report => {
              const st = STATUS_MAP[report.status] ?? { label: report.status, color: '#636366' }
              return (
                <div key={report.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: '20px 24px', display: 'grid', gridTemplateColumns: '110px 1fr 1fr auto', gap: 16, alignItems: 'center' }}>

                  {/* Number + date */}
                  <div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 20, color: '#2997FF' }}>
                      #{String(report.report_number).padStart(3, '0')}
                    </div>
                    <div style={{ fontSize: 11, color: '#636366', marginTop: 3 }}>{fmtDate(report.created_at)}</div>
                  </div>

                  {/* Client */}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: '#F5F5F7' }}>{report.client_name}</div>
                    <div style={{ fontSize: 12, color: '#636366', marginTop: 2 }}>{report.client_phone}</div>
                  </div>

                  {/* Equipment + cost + status */}
                  <div>
                    <div style={{ fontSize: 14, color: '#F5F5F7' }}>
                      {report.equipment_type}{report.brand_model ? ` · ${report.brand_model}` : ''}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 5, alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: '#30D158', fontWeight: 600 }}>{fmtCost(report.total_cost)}</span>
                      <span style={{ background: `${st.color}18`, color: st.color, border: `1px solid ${st.color}40`, borderRadius: 980, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                        {st.label}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <a
                      href={`/reporte/${report.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: 'rgba(41,151,255,.12)', color: '#2997FF', border: '1px solid rgba(41,151,255,.3)', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
                    >
                      Ver informe
                    </a>
                    <button
                      onClick={() => shareWA(report)}
                      style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
