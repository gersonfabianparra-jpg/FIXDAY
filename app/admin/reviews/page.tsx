'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Review {
  id: string
  created_at: string
  client_name: string
  client_location?: string
  rating: number
  review_text: string
  service?: string
  status: 'pending' | 'approved' | 'rejected'
}

type Tab = 'pending' | 'approved' | 'rejected' | 'all'

const REVIEW_LINK = 'https://fixday.cl/opinion'

function Stars({ n }: { n: number }) {
  return (
    <span style={{ color: '#FF9F0A', fontSize: 14, letterSpacing: 1 }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  )
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function AdminReviewsPage() {
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('pending')
  const [updating, setUpdating] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleLogout = useCallback(async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }, [router])

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/reviews')
      .then(r => r.json())
      .then(d => setReviews(d.reviews ?? []))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const update = async (id: string, status: Review['status']) => {
    setUpdating(id)
    await fetch('/api/admin/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setUpdating(null)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(REVIEW_LINK)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const counts = {
    pending:  reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    all:      reviews.length,
  }

  const visible = tab === 'all' ? reviews : reviews.filter(r => r.status === tab)

  const tabStyle = (t: Tab): React.CSSProperties => ({
    background: tab === t ? 'rgba(41,151,255,.15)' : 'transparent',
    color: tab === t ? '#2997FF' : '#636366',
    border: `1px solid ${tab === t ? 'rgba(41,151,255,.35)' : 'rgba(255,255,255,.08)'}`,
    borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600,
    cursor: 'pointer',
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
          <Link href="/admin" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Leads</Link>
          <Link href="/admin/reports" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>Informes</Link>
          <Link href="/admin/reviews" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #2997FF', paddingBottom: 1 }}>Reseñas</Link>
          <a href="/" style={{ color: '#2997FF', fontSize: 14, textDecoration: 'none' }}>← Volver al sitio</a>
          <button onClick={handleLogout} style={{ background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 8, padding: '7px 16px', color: '#FF453A', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 0' }}>

        {/* Share link card */}
        <div style={{ background: 'rgba(41,151,255,.06)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 16, padding: '20px 24px', marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2997FF', marginBottom: 4 }}>Link para reseñas de clientes</div>
            <div style={{ fontSize: 14, color: '#636366', fontFamily: 'monospace' }}>{REVIEW_LINK}</div>
          </div>
          <button
            onClick={copyLink}
            style={{ background: copied ? 'rgba(48,209,88,.15)' : 'rgba(41,151,255,.15)', border: `1px solid ${copied ? 'rgba(48,209,88,.3)' : 'rgba(41,151,255,.3)'}`, borderRadius: 9, padding: '9px 18px', color: copied ? '#30D158' : '#2997FF', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
          >
            {copied ? '✓ Copiado' : 'Copiar link'}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 32 }}>
          {([['pending','Pendientes','#FF9F0A'],['approved','Aprobadas','#30D158'],['rejected','Rechazadas','#FF453A'],['all','Total','#2997FF']] as const).map(([k,label,color]) => (
            <div key={k} style={{ background: '#161616', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: '18px 20px', cursor: 'pointer' }} onClick={() => setTab(k)}>
              <div style={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1 }}>{counts[k]}</div>
              <div style={{ fontSize: 12, color: '#636366', marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {(['pending','approved','rejected','all'] as Tab[]).map(t => (
            <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>
              {t === 'pending' ? 'Pendientes' : t === 'approved' ? 'Aprobadas' : t === 'rejected' ? 'Rechazadas' : 'Todas'}
              {counts[t] > 0 && <span style={{ marginLeft: 6, background: 'rgba(255,255,255,.1)', borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{counts[t]}</span>}
            </button>
          ))}
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 80, color: '#636366' }}>Cargando reseñas…</div>}

        {!loading && visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: 80, color: '#636366' }}>
            {tab === 'pending' ? 'No hay reseñas pendientes 🎉' : `No hay reseñas ${tab === 'approved' ? 'aprobadas' : tab === 'rejected' ? 'rechazadas' : ''} aún.`}
          </div>
        )}

        {!loading && visible.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {visible.map(r => (
              <div key={r.id} style={{ background: '#161616', border: `1px solid ${r.status === 'pending' ? 'rgba(255,159,10,.2)' : r.status === 'approved' ? 'rgba(48,209,88,.15)' : 'rgba(255,255,255,.07)'}`, borderRadius: 16, padding: '22px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#1A1A2E,#2997FF33)', border: '1px solid rgba(41,151,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#2997FF', flexShrink: 0 }}>
                      {r.client_name[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{r.client_name}</div>
                      <div style={{ fontSize: 12, color: '#636366', marginTop: 2 }}>
                        {[r.client_location, r.service, fmtDate(r.created_at)].filter(Boolean).join(' · ')}
                      </div>
                    </div>
                    <Stars n={r.rating} />
                  </div>

                  {/* Status badge */}
                  <span style={{
                    background: r.status === 'approved' ? 'rgba(48,209,88,.12)' : r.status === 'pending' ? 'rgba(255,159,10,.12)' : 'rgba(255,255,255,.06)',
                    color: r.status === 'approved' ? '#30D158' : r.status === 'pending' ? '#FF9F0A' : '#636366',
                    border: `1px solid ${r.status === 'approved' ? 'rgba(48,209,88,.25)' : r.status === 'pending' ? 'rgba(255,159,10,.25)' : 'rgba(255,255,255,.1)'}`,
                    borderRadius: 980, padding: '4px 12px', fontSize: 11, fontWeight: 700,
                  }}>
                    {r.status === 'approved' ? 'Aprobada' : r.status === 'pending' ? 'Pendiente' : 'Rechazada'}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: '#AEAEB2', lineHeight: 1.75, margin: '0 0 18px', paddingLeft: 54 }}>
                  &ldquo;{r.review_text}&rdquo;
                </p>

                <div style={{ display: 'flex', gap: 8, paddingLeft: 54, flexWrap: 'wrap' }}>
                  {r.status !== 'approved' && (
                    <button
                      disabled={updating === r.id}
                      onClick={() => update(r.id, 'approved')}
                      style={{ background: '#30D158', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 12, fontWeight: 700, cursor: updating === r.id ? 'not-allowed' : 'pointer', opacity: updating === r.id ? 0.6 : 1 }}
                    >
                      ✓ Aprobar
                    </button>
                  )}
                  {r.status !== 'rejected' && (
                    <button
                      disabled={updating === r.id}
                      onClick={() => update(r.id, 'rejected')}
                      style={{ background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 8, padding: '8px 18px', fontSize: 12, fontWeight: 600, color: '#FF453A', cursor: updating === r.id ? 'not-allowed' : 'pointer', opacity: updating === r.id ? 0.6 : 1 }}
                    >
                      Rechazar
                    </button>
                  )}
                  {r.status !== 'pending' && (
                    <button
                      disabled={updating === r.id}
                      onClick={() => update(r.id, 'pending')}
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '8px 18px', fontSize: 12, fontWeight: 600, color: '#636366', cursor: updating === r.id ? 'not-allowed' : 'pointer' }}
                    >
                      Mover a pendiente
                    </button>
                  )}
                  {r.status === 'approved' && (
                    <a
                      href={`/api/og/review/${r.id}`}
                      download={`reseña-${r.client_name.replace(/\s+/g,'-').toLowerCase()}.png`}
                      style={{ background: 'rgba(191,90,242,.12)', border: '1px solid rgba(191,90,242,.3)', borderRadius: 8, padding: '8px 18px', fontSize: 12, fontWeight: 600, color: '#BF5AF2', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Imagen Instagram
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
