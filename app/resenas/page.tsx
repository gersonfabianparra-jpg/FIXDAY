import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'

export const metadata: Metadata = {
  title: 'Déjanos tu Reseña en Google | FIXDAY',
  description: 'Tu opinión nos ayuda a mejorar y a que más personas nos encuentren. Deja tu reseña en Google en menos de 1 minuto.',
  alternates: { canonical: '/resenas' },
}

const REVIEW_LINK = 'https://g.page/r/CTqzZD_Jn7yPEBM/review'
const WA = `https://wa.me/56936649332?text=${encodeURIComponent('Hola FIXDAY, quiero agendar una visita técnica a domicilio')}`

export default function ResenasPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg,#4285F4,#34A853,#FBBC05,#EA4335,#4285F4)' }} />

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-resenas" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-.02em' }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>← Inicio</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '72px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(66,133,244,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative' }}>
          {/* Google logo grande */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ width: 80, height: 80, borderRadius: 22, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 40px rgba(255,255,255,.1)' }}>
              <svg width="44" height="44" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
          </div>

          {/* Estrellas animadas */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="32" height="32" viewBox="0 0 24 24" fill="#FBBC05"
                style={{ animation: `starPop .4s ease ${i * .08}s both` }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>

          <h1 style={{ fontSize: 'clamp(1.7rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: 16 }}>
            ¿Te ayudamos bien?<br />
            <span style={{ background: 'linear-gradient(135deg,#4285F4,#34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Cuéntaselo a Google
            </span>
          </h1>

          <p style={{ color: '#86868B', fontSize: '1rem', lineHeight: 1.75, marginBottom: 36 }}>
            Tu reseña ayuda a más personas en Santiago a encontrar un técnico confiable — y nos motiva a seguir mejorando cada día.
          </p>

          {/* CTA principal */}
          <a
            href={REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: '#1a1a1a', borderRadius: 980, padding: '16px 32px', fontSize: '1rem', fontWeight: 800, textDecoration: 'none', boxShadow: '0 0 40px rgba(66,133,244,.2)', marginBottom: 14 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Dejar mi reseña ahora
          </a>
          <div style={{ fontSize: 12, color: '#3A3A3C' }}>Abre Google directamente · Solo toma 1 minuto</div>
        </div>
      </section>

      {/* Cómo hacerlo */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#636366', letterSpacing: '.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 24 }}>Cómo dejar tu reseña</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { n: '1', t: 'Haz clic en el botón', d: 'Presiona "Dejar mi reseña ahora" — te llevará directo a Google.' },
              { n: '2', t: 'Elige las estrellas', d: 'Selecciona cuántas estrellas merece el servicio que recibiste.' },
              { n: '3', t: 'Escribe tu experiencia', d: 'Cuenta brevemente qué problema tenías y cómo te ayudamos. ¡Listo!' },
            ].map(({ n, t, d }) => (
              <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#4285F4,#34A853)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: '#fff', flexShrink: 0 }}>
                  {n}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F5F5F7', marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* También por WhatsApp */}
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', background: 'linear-gradient(135deg, rgba(37,211,102,.08), rgba(37,211,102,.03))', border: '1px solid rgba(37,211,102,.2)', borderRadius: 20, padding: '28px 24px', textAlign: 'center' }}>
          <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F5F5F7', marginBottom: 8 }}>¿Aún no has usado nuestros servicios?</p>
          <p style={{ color: '#636366', fontSize: '0.85rem', marginBottom: 20, lineHeight: 1.6 }}>Agenda tu visita técnica a domicilio en toda la Región Metropolitana.</p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 980, padding: '12px 24px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Agendar por WhatsApp
          </a>
        </div>
      </section>

      <style>{`
        @keyframes starPop {
          from { opacity:0; transform: scale(.4) rotate(-20deg); }
          to   { opacity:1; transform: scale(1) rotate(0deg); }
        }
      `}</style>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>© {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Región Metropolitana, Chile</div>
        <div style={{ marginTop: 10 }}>
          <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>← Volver al inicio</Link>
        </div>
      </footer>
    </div>
  )
}
