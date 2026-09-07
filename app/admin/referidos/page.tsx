'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Referral {
  id: string
  created_at: string
  code: string
  ref_name: string
  ref_phone: string | null
  expires_at: string
  clicks: number
  redeemed: boolean
  redeemed_at: string | null
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function AdminReferidos() {
  const router = useRouter()
  const [rows, setRows] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback((silent = false) => {
    if (!silent) setLoading(true)
    fetch('/api/admin/referrals', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setRows(d.referrals ?? []) })
      .catch(() => setError('No se pudo cargar.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const togglePaid = async (r: Referral) => {
    setRows(rs => rs.map(x => x.id === r.id ? { ...x, redeemed: !x.redeemed } : x))
    await fetch('/api/admin/referrals', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: r.id, redeemed: !r.redeemed }),
    }).catch(() => load(true))
  }

  const logout = async () => { await fetch('/api/admin/auth', { method: 'DELETE' }); router.push('/admin/login') }

  const now = Date.now()
  const active = rows.filter(r => new Date(r.expires_at).getTime() >= now && !r.redeemed).length
  const totalClicks = rows.reduce((a, r) => a + (r.clicks || 0), 0)
  const pending = rows.filter(r => r.redeemed).length

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '28px 24px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 8 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>Referidos</h1>
          <button onClick={() => load()} style={{ background: 'rgba(41,151,255,.1)', border: '1px solid rgba(41,151,255,.25)', borderRadius: 8, padding: '6px 14px', color: '#2997FF', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>↻ Actualizar</button>
          <a href="/admin" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Leads</a>
          <a href="/admin/reports" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Informes</a>
          <a href="/admin/reviews" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Reseñas</a>
          <a href="/admin/referidos" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #2997FF', paddingBottom: 1 }}>Referidos</a>
          <a href="/admin/maipu" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Maipú</a>
          <button onClick={logout} style={{ marginLeft: 'auto', background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 8, padding: '7px 16px', color: '#FF453A', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Salir</button>
        </div>
        <p style={{ color: '#636366', fontSize: 14, marginTop: 4, marginBottom: 24 }}>Cada persona que recomienda genera un código. Cuando su referido agenda mencionando el código, aplícale el descuento y marca aquí como pagado.</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 26 }}>
          {[
            { n: rows.length, l: 'Códigos generados' },
            { n: active, l: 'Vigentes' },
            { n: totalClicks, l: 'Clics totales' },
            { n: pending, l: 'Marcados pagados' },
          ].map(s => (
            <div key={s.l} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#2997FF', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12.5, color: '#636366', marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {loading && <div style={{ color: '#636366', padding: 40, textAlign: 'center' }}>Cargando…</div>}
        {error && <div style={{ color: '#FF6B6B', background: 'rgba(255,69,58,.08)', border: '1px solid rgba(255,69,58,.2)', borderRadius: 12, padding: '16px 18px' }}>{error}</div>}

        {!loading && !error && rows.length === 0 && (
          <div style={{ color: '#636366', padding: 40, textAlign: 'center', background: '#0A0A0A', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16 }}>
            Aún no hay referidos. Comparte <strong style={{ color: '#2997FF' }}>fixday.cl/referidos</strong> con tus clientes.
          </div>
        )}

        {!loading && rows.length > 0 && (
          <div style={{ overflowX: 'auto', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720, fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: '#0D0D0D', textAlign: 'left', color: '#636366' }}>
                  <th style={th}>Fecha</th><th style={th}>Código</th><th style={th}>Quién refiere</th><th style={th}>Teléfono</th><th style={{ ...th, textAlign: 'center' }}>Clics</th><th style={th}>Estado</th><th style={{ ...th, textAlign: 'center' }}>Pagado</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => {
                  const expired = new Date(r.expires_at).getTime() < now
                  return (
                    <tr key={r.id} style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                      <td style={td}>{fmtDate(r.created_at)}</td>
                      <td style={{ ...td, fontWeight: 700, color: '#2997FF', letterSpacing: '.06em' }}>{r.code}</td>
                      <td style={{ ...td, color: '#F5F5F7', fontWeight: 600 }}>{r.ref_name}</td>
                      <td style={td}>
                        {r.ref_phone ? (
                          <a href={`https://wa.me/${r.ref_phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>{r.ref_phone}</a>
                        ) : '—'}
                      </td>
                      <td style={{ ...td, textAlign: 'center' }}>{r.clicks}</td>
                      <td style={td}>
                        {r.redeemed
                          ? <span style={badge('#BF5AF2')}>Pagado</span>
                          : expired ? <span style={badge('#636366')}>Expirado</span> : <span style={badge('#30D158')}>Vigente</span>}
                      </td>
                      <td style={{ ...td, textAlign: 'center' }}>
                        <input type="checkbox" checked={r.redeemed} onChange={() => togglePaid(r)} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#30D158' }} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const th: React.CSSProperties = { padding: '12px 14px', fontWeight: 600, whiteSpace: 'nowrap' }
const td: React.CSSProperties = { padding: '12px 14px', color: '#AEAEB2', whiteSpace: 'nowrap' }
const badge = (c: string): React.CSSProperties => ({ background: `${c}1e`, border: `1px solid ${c}55`, color: c, borderRadius: 980, padding: '3px 11px', fontSize: 11.5, fontWeight: 700 })
