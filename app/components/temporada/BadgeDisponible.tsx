'use client'

import { useTemporada } from './useTemporada'
import { vueltaCorta } from '@/lib/temporada'

/** Insignia del hero de comuna: "Disponibles hoy" o, durante la ausencia, la fecha de vuelta. */
export default function BadgeDisponible({ comuna }: { comuna: string }) {
  const { ausencia } = useTemporada()

  if (ausencia) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,159,10,.1)', border: '1px solid rgba(255,159,10,.35)', borderRadius: 980, padding: '7px 15px', fontSize: 12.5, color: '#FFB340', fontWeight: 600 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF9F0A' }} />
        Agenda abierta desde el {vueltaCorta()}
      </span>
    )
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(48,209,88,.08)', border: '1px solid rgba(48,209,88,.28)', borderRadius: 980, padding: '7px 15px', fontSize: 12.5, color: '#7EE29B', fontWeight: 600 }}>
      <span className="cz-dot" />
      Disponibles hoy en {comuna}
    </span>
  )
}
