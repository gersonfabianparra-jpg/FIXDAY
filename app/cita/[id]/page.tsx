import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import { getSupabase } from '@/lib/supabase'
import { obtenerReserva } from '@/lib/store'
import { formatoLargo, TZ } from '@/lib/agenda'

export const dynamic = 'force-dynamic'

const WA = 'https://wa.me/56936649332'

/** Enlace para agregar la visita al calendario del cliente. */
function linkCalendario(fecha: string, bloque: string, comuna: string, direccion: string): string {
  const [ini, fin] = bloque.split('-')
  const stamp = (h: string) => `${fecha.replace(/-/g, '')}T${h.trim().padStart(5, '0').replace(':', '')}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Visita técnica FIXDAY',
    dates: `${stamp(ini)}/${stamp(fin)}`,
    details: 'Visita técnica a domicilio de FIXDAY. Cualquier cambio, escríbenos al WhatsApp +56 9 3664 9332.',
    location: [direccion, comuna, 'Región Metropolitana'].filter(Boolean).join(', '),
    ctz: TZ,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

const ESTADOS: Record<string, { texto: string; color: string; fondo: string }> = {
  confirmada: { texto: 'Visita confirmada', color: '#30D158', fondo: 'rgba(48,209,88,.12)' },
  pendiente:  { texto: 'Por confirmar',     color: '#FF9F0A', fondo: 'rgba(255,159,10,.12)' },
  realizada:  { texto: 'Visita realizada',  color: '#2997FF', fondo: 'rgba(41,151,255,.12)' },
  cancelada:  { texto: 'Visita cancelada',  color: '#FF453A', fondo: 'rgba(255,69,58,.12)' },
}

export default async function CitaPage({ params }: { params: { id: string } }) {
  const db = getSupabase()
  if (!db) notFound()

  const cita = await obtenerReserva(db, params.id).catch(() => null)
  if (!cita) notFound()

  const est = ESTADOS[cita.status] ?? ESTADOS.pendiente
  const cancelada = cita.status === 'cancelada'
  const [ini, fin] = cita.bloque.split('-')
  const diaTexto = formatoLargo(cita.fecha)
  const [diaSemana, ...restoFecha] = diaTexto.split(' ')

  const dato = (etiqueta: string, valor: string, destacado = false) => (
    <div style={{ padding: '15px 0', borderBottom: '1px solid #17171B' }}>
      <div style={{ fontSize: 11.5, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: 5 }}>
        {etiqueta}
      </div>
      <div style={{ fontSize: destacado ? 19 : 15.5, color: destacado ? '#30D158' : '#F5F5F7', fontWeight: destacado ? 800 : 600, lineHeight: 1.45 }}>
        {valor}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 20px 60px' }}>

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit', marginBottom: 30 }}>
          <Logo id="lg-cita" />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-.02em' }}>FIXDAY</div>
            <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
          </div>
        </Link>

        <div style={{ background: '#0A0A0D', border: '1px solid #1C1C21', borderRadius: 24, overflow: 'hidden' }}>

          {/* Encabezado con el estado */}
          <div style={{ background: est.fondo, borderBottom: `1px solid ${est.color}33`, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: est.color, flexShrink: 0 }} />
            <span style={{ fontSize: 14.5, fontWeight: 800, color: est.color, letterSpacing: '-.01em' }}>{est.texto}</span>
          </div>

          <div style={{ padding: '26px 24px 28px' }}>
            <p style={{ margin: '0 0 4px', fontSize: 15, color: '#8E8E93' }}>
              Hola {cita.name.split(' ')[0]},
            </p>
            <h1 style={{ margin: '0 0 24px', fontSize: 'clamp(1.5rem,5vw,1.95rem)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.2 }}>
              {cancelada ? 'Esta visita fue cancelada' : 'Tu visita técnica está agendada'}
            </h1>

            {/* Fecha destacada */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
              background: 'linear-gradient(135deg, rgba(41,151,255,.1), rgba(191,90,242,.07))',
              border: '1px solid rgba(41,151,255,.25)', borderRadius: 18, padding: '20px 22px', marginBottom: 8,
              opacity: cancelada ? .5 : 1,
            }}>
              <div>
                <div style={{ fontSize: 12.5, color: '#2997FF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  {diaSemana}
                </div>
                <div style={{ fontSize: 'clamp(1.35rem,4.6vw,1.7rem)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.25, marginTop: 2 }}>
                  {restoFecha.join(' ')}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 11.5, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700 }}>Horario</div>
                <div style={{ fontSize: 'clamp(1.15rem,4vw,1.4rem)', fontWeight: 900, letterSpacing: '-.02em', marginTop: 2 }}>
                  {ini} – {fin}
                </div>
              </div>
            </div>

            {([
              ['Dirección', [cita.direccion, cita.comuna].filter(Boolean).join(', ') || 'La coordinamos contigo'],
              ['Servicio', cita.servicio || 'Diagnóstico general'],
            ] as Array<[string, string]>).map(([k, v]) => <div key={k}>{dato(k, v)}</div>)}

            {cita.valor
              ? dato('Valor acordado', cita.valor, true)
              : dato('Valor', '$25.000 la visita + diagnóstico · se descuenta del total si haces la reparación')}

            {cita.mensaje && dato('Lo que revisaremos', cita.mensaje)}

            {!cancelada && (
              <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', marginTop: 24 }}>
                <a href={linkCalendario(cita.fecha, cita.bloque, cita.comuna ?? '', cita.direccion ?? '')}
                  target="_blank" rel="noopener noreferrer"
                  style={{ flex: '1 1 190px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: 'linear-gradient(135deg,#0071E3,#2997FF)', color: '#fff', borderRadius: 999, padding: '15px 20px', fontSize: 14.5, fontWeight: 800, textDecoration: 'none' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Agregar al calendario
                </a>
                <a href={`${WA}?text=${encodeURIComponent(`Hola FIXDAY, tengo una consulta sobre mi visita del ${diaTexto}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ flex: '1 1 150px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#25D366', color: '#fff', borderRadius: 999, padding: '15px 20px', fontSize: 14.5, fontWeight: 800, textDecoration: 'none' }}>
                  Escribirnos
                </a>
              </div>
            )}

            {cancelada && (
              <div style={{ marginTop: 24 }}>
                <Link href="/agendar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#0071E3,#2997FF)', color: '#fff', borderRadius: 999, padding: '15px 26px', fontSize: 14.5, fontWeight: 800, textDecoration: 'none' }}>
                  Agendar una nueva visita
                </Link>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid #17171B', padding: '18px 24px', background: '#08080A' }}>
            <p style={{ margin: 0, fontSize: 12.5, color: '#6E6E73', lineHeight: 1.6 }}>
              Te avisaremos por WhatsApp cuando el técnico vaya en camino. Si necesitas cambiar la hora,
              escríbenos al <strong style={{ color: '#8E8E93' }}>+56 9 3664 9332</strong> con anticipación.
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11.5, color: '#3A3A3C', marginTop: 22 }}>
          FIXDAY · Técnico de computadores a domicilio · Región Metropolitana
        </p>
      </div>
    </div>
  )
}
