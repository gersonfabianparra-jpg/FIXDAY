'use client'

import BanderaChile from './BanderaChile'
import { useTemporada } from './useTemporada'
import { AUSENCIA, vueltaCorta } from '@/lib/temporada'

const WA = 'https://wa.me/56936649332'

/** Aviso de ausencia por Fiestas Patrias. Desaparece solo al terminar la fecha. */
export default function AvisoAusencia({ comuna, slug }: { comuna?: string; slug?: string }) {
  const { listo, ausencia } = useTemporada()
  if (!listo || !ausencia) return null

  const vuelta = vueltaCorta()
  const dia = (f: string) => Number(f.slice(8, 10))
  const msgWa = `Hola FIXDAY 👋 Quiero agendar una visita${comuna ? ` en ${comuna}` : ''} para la semana del ${vuelta}.`

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '18px 24px 0' }}>
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 18,
        background: 'linear-gradient(120deg, rgba(0,57,166,.22) 0%, rgba(20,20,26,.9) 45%, rgba(213,43,30,.2) 100%)',
        border: '1px solid rgba(255,255,255,.12)', padding: '18px 20px',
      }}>
        {/* Franja tricolor superior */}
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, display: 'flex' }}>
          <span style={{ flex: 1, background: '#0039A6' }} />
          <span style={{ flex: 1, background: '#fff' }} />
          <span style={{ flex: 1, background: '#D52B1E' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <BanderaChile ancho={34} />
          <div style={{ flex: 1, minWidth: 230 }}>
            <div style={{ fontSize: 15.5, fontWeight: 800, color: '#F5F5F7', letterSpacing: '-.01em', marginBottom: 3 }}>
              ¡Felices Fiestas Patrias! Estoy fuera de Santiago del {dia(AUSENCIA.desde)} al {dia(AUSENCIA.hasta)} de septiembre.
            </div>
            <div style={{ fontSize: 13.5, color: '#AEAEB2', lineHeight: 1.55 }}>
              Te respondo igual por WhatsApp y te dejo agendado{comuna ? ` en ${comuna}` : ''} desde el <strong style={{ color: '#fff' }}>{vuelta}</strong>. La semana post 18 se llena rápido: asegura tu hora.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href={slug ? `/agendar?comuna=${slug}` : '/agendar'}
              style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', color: '#0A0A0F', borderRadius: 980, padding: '11px 18px', fontSize: 13.5, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Agendar para el {dia(AUSENCIA.vuelta)}
            </a>
            <a href={`${WA}?text=${encodeURIComponent(msgWa)}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(37,211,102,.14)', border: '1px solid rgba(37,211,102,.4)', color: '#7EE29B', borderRadius: 980, padding: '11px 16px', fontSize: 13.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
