'use client'

import { useEffect, useState } from 'react'

/**
 * Prueba social de barrio: cobertura por sector y opiniones REALES de la
 * comuna. Las reseñas salen de la base de datos (solo las ya aprobadas);
 * si todavía no hay opiniones de esta comuna, se muestran las más recientes
 * con su ubicación real. Nunca se inventan testimonios.
 */

interface Review {
  id: string
  client_name: string
  client_location?: string
  rating: number
  review_text: string
  service?: string
}

interface Props {
  comuna: string
  sectores: string[]
  hitos: string[]
  llegada: string
}

function normaliza(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function PruebaSocialLocal({ comuna, sectores, hitos, llegada }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [esLocal, setEsLocal] = useState(false)

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => {
        const all: Review[] = Array.isArray(d.reviews) ? d.reviews : []
        const locales = all.filter(r => r.client_location && normaliza(r.client_location).includes(normaliza(comuna)))
        if (locales.length) { setReviews(locales.slice(0, 3)); setEsLocal(true) }
        else { setReviews(all.slice(0, 3)); setEsLocal(false) }
      })
      .catch(() => {})
  }, [comuna])

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>
        Llegamos a todo {comuna}
      </h2>
      <p style={{ color: '#8E8E93', fontSize: 15, marginBottom: 26, lineHeight: 1.6 }}>
        {llegada} Cubrimos los sectores de la comuna, no solo el centro.
      </p>

      {/* Sectores de cobertura */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 22 }}>
        {sectores.map(s => (
          <span key={s} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: '#101014', border: '1px solid #22222A', borderRadius: 999,
            padding: '9px 15px', fontSize: 13.5, color: '#D1D1D6', fontWeight: 600,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {s}
          </span>
        ))}
      </div>

      {/* Referencias urbanas */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 11, flexWrap: 'wrap',
        background: '#0C0C10', border: '1px solid #1C1C22', borderRadius: 16,
        padding: '15px 18px', marginBottom: 34,
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 1, flexShrink: 0 }}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
        <p style={{ margin: 0, fontSize: 13.5, color: '#9A9AA0', lineHeight: 1.65, flex: 1, minWidth: 220 }}>
          Nos movemos por referencias que conoces: <strong style={{ color: '#D1D1D6', fontWeight: 600 }}>{hitos.join(' · ')}</strong>.
          Dinos tu sector y coordinamos la hora exacta de llegada.
        </p>
      </div>

      {/* Opiniones reales */}
      {reviews.length > 0 && (
        <>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-.01em', marginBottom: 4, color: '#F5F5F7' }}>
            {esLocal ? `Lo que dicen en ${comuna}` : 'Lo que dicen nuestros clientes'}
          </h3>
          <p style={{ fontSize: 12.5, color: '#636366', marginBottom: 18 }}>
            {esLocal
              ? `Opiniones verificadas de clientes de ${comuna}.`
              : 'Opiniones verificadas de clientes de la Región Metropolitana.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(255px,1fr))', gap: 14 }}>
            {reviews.map(r => (
              <div key={r.id} style={{
                background: '#0C0C10', border: '1px solid #1C1C22', borderRadius: 18, padding: 20,
              }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 10, color: '#FF9F0A', fontSize: 13, letterSpacing: 1 }}>
                  {'★'.repeat(Math.max(1, Math.min(5, r.rating)))}
                </div>
                <p style={{ fontSize: 14, color: '#D1D1D6', lineHeight: 1.65, margin: '0 0 14px' }}>
                  “{r.review_text}”
                </p>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5F5F7' }}>{r.client_name}</div>
                {r.client_location && (
                  <div style={{ fontSize: 12, color: '#636366', marginTop: 2 }}>{r.client_location}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
