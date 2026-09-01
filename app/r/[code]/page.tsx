import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import { getSupabase } from '@/lib/supabase'
import TrackClick from './TrackClick'

export const dynamic = 'force-dynamic'

const WA = '56936649332'
const BENEFICIO = '$5.000'

export const metadata: Metadata = {
  title: 'Te invitaron a FIXDAY · $5.000 de descuento',
  description: 'Un amigo te recomendó FIXDAY. Agenda tu servicio técnico a domicilio o tu página web con $5.000 de descuento.',
  robots: { index: false, follow: true },
}

interface Referral { code: string; ref_name: string; expires_at: string }

async function getReferral(code: string): Promise<{ ref: Referral | null; expired: boolean }> {
  const db = getSupabase()
  if (!db) return { ref: null, expired: false }
  const { data } = await db
    .from('referrals')
    .select('code, ref_name, expires_at')
    .eq('code', code.toUpperCase())
    .maybeSingle()
  if (!data) return { ref: null, expired: false }
  const expired = new Date(data.expires_at).getTime() < Date.now()
  return { ref: data as Referral, expired }
}

export default async function ReferralLanding({ params }: { params: { code: string } }) {
  const { ref, expired } = await getReferral(params.code)
  const valid = ref && !expired

  const waMsg = encodeURIComponent(
    `Hola FIXDAY 👋 Vengo referido por ${ref?.ref_name ?? 'un amigo'} (código ${params.code.toUpperCase()}). ` +
    `Quiero agendar y usar mi ${BENEFICIO} de descuento.`
  )

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', display: 'flex', flexDirection: 'column' }}>
      {valid && <TrackClick code={params.code.toUpperCase()} />}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo id="lg-r" />
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
            <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 620, height: 380, background: 'radial-gradient(ellipse, rgba(41,151,255,.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {valid ? (
          <div style={{ maxWidth: 480, textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🎁</div>
            <div style={{ display: 'inline-block', background: 'rgba(48,209,88,.1)', border: '1px solid rgba(48,209,88,.3)', borderRadius: 980, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: '#7EE29B', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 22 }}>
              Invitación válida
            </div>
            <h1 style={{ fontSize: 'clamp(1.7rem,5vw,2.6rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-.03em', marginBottom: 16 }}>
              <span style={{ color: '#F5F5F7' }}>{ref!.ref_name}</span> te invitó a FIXDAY
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#86868B', lineHeight: 1.7, marginBottom: 12 }}>
              Tienes <strong style={{ color: '#F5F5F7' }}>{BENEFICIO} de descuento</strong> en tu servicio técnico a domicilio o tu página web. Solo agenda por WhatsApp — el código ya va incluido.
            </p>
            <div style={{ fontSize: 13, color: '#636366', marginBottom: 32 }}>Código: <strong style={{ color: '#2997FF', letterSpacing: '.1em' }}>{params.code.toUpperCase()}</strong></div>

            <a href={`https://wa.me/${WA}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '16px 34px', fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 30px rgba(37,211,102,.3)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Agendar con mi descuento
            </a>
            <div style={{ marginTop: 18 }}>
              <Link href="/" style={{ fontSize: 13, color: '#636366', textDecoration: 'none' }}>Ver todo lo que hace FIXDAY →</Link>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 440, textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>{expired ? '⌛' : '🔍'}</div>
            <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.1rem)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-.02em', marginBottom: 14 }}>
              {expired ? 'Esta invitación expiró' : 'Invitación no encontrada'}
            </h1>
            <p style={{ fontSize: '1.02rem', color: '#86868B', lineHeight: 1.7, marginBottom: 30 }}>
              {expired
                ? 'El enlace de referido ya no está vigente. Pídele a tu amigo que genere uno nuevo — ¡igual te atendemos con gusto!'
                : 'No pudimos validar este enlace. Puede estar mal copiado. De todas formas, escríbenos y te ayudamos.'}
            </p>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hola FIXDAY 👋 quiero agendar un servicio.')}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#2997FF', color: '#fff', borderRadius: 980, padding: '14px 30px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              Escríbenos igual
            </a>
            <div style={{ marginTop: 18 }}>
              <Link href="/referidos" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>Crear mi propia invitación →</Link>
            </div>
          </div>
        )}
      </main>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '20px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Región Metropolitana, Chile</div>
      </footer>
    </div>
  )
}
