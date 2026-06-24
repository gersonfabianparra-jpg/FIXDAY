import { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/components/Logo'

export const metadata: Metadata = {
  title: 'Diseño de Páginas Web Profesionales | FIXDAY Santiago',
  description: 'Creamos tu página web profesional en Santiago. Diseño moderno, optimizado para Google, con dominio y hosting incluido. Ideal para negocios, emprendimientos y profesionales. Desde $150.000.',
  keywords: 'diseño paginas web santiago, crear pagina web negocio chile, diseño web profesional santiago, pagina web barata santiago, web para emprendedores chile',
}

const WA = `https://wa.me/56936649332?text=${encodeURIComponent('Hola FIXDAY, quiero cotizar una página web para mi negocio')}`

const INCLUYE = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.7"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    title: 'Diseño moderno y profesional',
    desc: 'Sitio a medida, con tu identidad de marca. Nada de plantillas genéricas — cada proyecto se diseña desde cero.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.7"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    title: 'SEO incluido',
    desc: 'Optimizamos tu sitio para que aparezca en Google cuando te buscan. Títulos, descripciones, velocidad y estructura correcta.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.7"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
    title: 'Adaptado a celular',
    desc: 'Tu sitio se ve perfecto en cualquier dispositivo — celular, tablet o computador. El 70% de las visitas llegan desde el celular.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.7"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Dominio .cl o .com',
    desc: 'Registramos tu dominio (ej. tunegocio.cl) incluido el primer año. Tú eliges el nombre.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.7"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg>,
    title: 'Hosting por 1 año',
    desc: 'Alojamiento rápido y seguro incluido el primer año. Tu sitio disponible 24/7 sin que tengas que preocuparte de nada técnico.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 13 19.79 19.79 0 0 1 1.08 4.22 2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>,
    title: 'Soporte post-entrega',
    desc: 'Una vez publicado, te apoyamos con dudas y ajustes menores. No te dejamos solo después de entregar.',
  },
]

const TIPOS = [
  { emoji: '🍕', tipo: 'Restaurantes y delivery', ej: 'Carta online, horarios, pedidos por WhatsApp' },
  { emoji: '💆', tipo: 'Centros de salud y belleza', ej: 'Agenda online, servicios, equipo profesional' },
  { emoji: '🔧', tipo: 'Servicios técnicos', ej: 'Qué arreglas, zona de cobertura, contacto' },
  { emoji: '🏠', tipo: 'Arriendos e inmobiliarias', ej: 'Propiedades disponibles, contacto, fotos' },
  { emoji: '📚', tipo: 'Profesionales y consultores', ej: 'CV online, servicios, agenda de reuniones' },
  { emoji: '🛍️', tipo: 'Tiendas y emprendimientos', ej: 'Catálogo, precios, compra por WhatsApp' },
  { emoji: '🎓', tipo: 'Academias y clases', ej: 'Cursos, horarios, inscripciones online' },
  { emoji: '🏗️', tipo: 'Construcción y remodelación', ej: 'Proyectos realizados, presupuestos, contacto' },
]

const CLIENTES = [
  {
    name: 'Stockeo',
    url: 'https://stockeo.cl',
    category: 'Software de gestión',
    desc: 'Sistema para negocios y talleres: inventario, boletas con IVA, cotizaciones en PDF, órdenes de trabajo y reportes para el SII. Todo desde el celular.',
    screenshot: '/screenshots/stockeo.png',
    color: '#D4A017',
    border: 'rgba(212,160,23,.25)',
  },
  {
    name: 'PostMockup',
    url: 'https://www.postmockup.com',
    category: 'Herramienta web',
    desc: 'Crea mockups de comentarios de redes sociales (TikTok, Instagram, WhatsApp y más) de forma rápida y gratis.',
    screenshot: '/screenshots/postmockup.png',
    color: '#30D158',
    border: 'rgba(48,209,88,.2)',
  },
  {
    name: 'Cleans Chile',
    url: 'https://cleanschile.cl',
    category: 'Detailing automotriz',
    desc: 'Detailing premium a domicilio en Santiago. Nanotecnología y precisión para transformar tu vehículo.',
    screenshot: '/screenshots/cleanschile.png',
    color: '#2997FF',
    border: 'rgba(41,151,255,.2)',
  },
  {
    name: 'IT Parra',
    url: 'https://itparra.online/es/',
    category: 'CV / Portafolio',
    desc: 'Portafolio profesional de ingeniero en telecomunicaciones e infraestructura IT con más de 15 años de experiencia en Europa y Latinoamérica.',
    screenshot: '/screenshots/itparra.png',
    color: '#00D2B4',
    border: 'rgba(0,210,180,.2)',
  },
]

const PASOS = [
  {
    n: '01',
    title: 'Nos cuentas tu idea',
    desc: 'Escríbenos por WhatsApp o llena el formulario. Nos cuentas a qué te dedicas, qué necesitas mostrar y cómo quieres que se vea tu sitio.',
  },
  {
    n: '02',
    title: 'Diseñamos tu sitio',
    desc: 'En 5 a 7 días hábiles tendrás una versión para revisar. Hacemos los ajustes que necesites hasta que quede exactamente como lo imaginas.',
  },
  {
    n: '03',
    title: 'Lo publicamos',
    desc: 'Registramos tu dominio, configuramos el hosting y dejamos tu sitio en línea. Tú solo te preocupas de tu negocio.',
  },
]

const PREGUNTAS = [
  {
    q: '¿Cuánto demora en estar listo?',
    a: 'Entre 5 y 10 días hábiles dependiendo del contenido y complejidad. Proyectos más grandes pueden tomar hasta 3 semanas.',
  },
  {
    q: '¿Qué pasa después del primer año de hosting?',
    a: 'El hosting y dominio se renuevan anualmente. Te avisamos con anticipación para que decidas si continuar — no hay cobros automáticos.',
  },
  {
    q: '¿Puedo actualizar el contenido yo mismo?',
    a: 'Sí. En proyectos con panel de administración puedes editar textos e imágenes fácilmente. También puedes pedirnos cambios directamente.',
  },
  {
    q: '¿Qué necesito tener listo para empezar?',
    a: 'Tu logo (si tienes), fotos del negocio, los textos que quieres mostrar y el nombre de dominio que prefieres. Nosotros te guiamos en todo el proceso.',
  },
  {
    q: '¿Hacen tiendas online con pago en línea?',
    a: 'Sí. Podemos integrar pasarelas de pago como Transbank o MercadoPago. El precio varía según la complejidad — cotiza sin compromiso.',
  },
]

export default function PaginasWebPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>

      {/* Top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0071E3,#2997FF,#BF5AF2,#2997FF,#0071E3)' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '16px 0', position: 'sticky', top: 0, background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo id="lg-webpages" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-.02em', color: '#fff', lineHeight: 1 }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Técnico a domicilio</div>
            </div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/zonas" style={{ fontSize: 13, color: '#86868B', textDecoration: 'none', fontWeight: 500 }}>Zonas</Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ background: '#2997FF', color: '#fff', borderRadius: 980, padding: '10px 22px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Cotizar ahora
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '96px 0 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(191,90,242,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(191,90,242,.08)', border: '1px solid rgba(191,90,242,.22)', borderRadius: 980, padding: '7px 18px', fontSize: 12, fontWeight: 600, color: '#BF5AF2', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 28 }}>
            Diseño web profesional
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-.03em', marginBottom: 24, color: '#F5F5F7' }}>
            Tu negocio merece<br />
            <span style={{ background: 'linear-gradient(135deg,#2997FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              estar en internet
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: '#86868B', lineHeight: 1.8, maxWidth: 580, margin: '0 auto 48px' }}>
            Creamos tu página web desde cero: diseño moderno, optimizado para Google, adaptado al celular y publicado con dominio y hosting incluido.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#2997FF', color: '#fff', borderRadius: 980, padding: '15px 34px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
              Cotizar por WhatsApp
            </a>
            <a href="#incluye" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: '#F5F5F7', borderRadius: 980, padding: '15px 30px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Ver qué incluye ↓
            </a>
          </div>
          {/* Precio destacado */}
          <div style={{ marginTop: 48, display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(41,151,255,.06)', border: '1px solid rgba(41,151,255,.15)', borderRadius: 16, padding: '14px 28px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#2997FF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>
            <span style={{ fontSize: 14, color: '#86868B' }}>Plan Principal</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#F5F5F7', letterSpacing: '-.02em' }}>$150.000</span>
            <span style={{ fontSize: 13, color: '#636366' }}>· dominio + hosting primer año incluido</span>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section id="incluye" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ display: 'inline-block', background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Todo incluido</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: '#F5F5F7', margin: 0 }}>
              Sin cobros ocultos,<br />sin sorpresas
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
            {INCLUYE.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#F5F5F7', marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#636366', lineHeight: 1.75 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de negocio */}
      <section style={{ padding: '80px 0', background: '#050505' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ display: 'inline-block', background: 'rgba(191,90,242,.08)', border: '1px solid rgba(191,90,242,.18)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#BF5AF2', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>¿Para quién?</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: '#F5F5F7', margin: 0 }}>
              Para todo tipo<br />de negocio
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {TIPOS.map(({ emoji, tipo, ej }) => (
              <div key={tipo} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '22px 22px' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{emoji}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F5F5F7', marginBottom: 6 }}>{tipo}</div>
                <div style={{ fontSize: '0.8rem', color: '#636366', lineHeight: 1.6 }}>{ej}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ display: 'inline-block', background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Proceso</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: '#F5F5F7', margin: 0 }}>
              Simple y rápido
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PASOS.map(({ n, title, desc }, i) => (
              <div key={n} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '28px 32px' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'rgba(41,151,255,.18)', letterSpacing: '-.04em', flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#F5F5F7', marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: '0.9rem', color: '#636366', lineHeight: 1.75 }}>{desc}</div>
                </div>
                {i < PASOS.length - 1 && (
                  <div style={{ marginLeft: 'auto', flexShrink: 0, color: '#2997FF', fontSize: 20, alignSelf: 'center' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos realizados */}
      <section style={{ padding: '80px 0', background: '#050505' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ display: 'inline-block', background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Portafolio</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: '#F5F5F7', margin: '0 0 14px' }}>
              Proyectos realizados
            </h2>
            <p style={{ color: '#636366', fontSize: '0.95rem', margin: 0 }}>Negocios chilenos que ya tienen su presencia digital con FIXDAY.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, maxWidth: 780, margin: '0 auto' }}>
            {CLIENTES.map(({ name, url, category, desc, screenshot, color, border }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ background: '#0D0D0D', border: `1px solid ${border}`, borderRadius: 20, overflow: 'hidden' }}>
                  {/* Browser chrome */}
                  <div style={{ background: '#1A1A1A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBC2E', flexShrink: 0 }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
                    <div style={{ flex: 1, background: '#2C2C2E', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#636366', marginLeft: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{url.replace('https://', '')}</div>
                  </div>
                  {/* Screenshot */}
                  <div style={{ height: 190, overflow: 'hidden' }}>
                    <img src={screenshot} alt={`${name} - captura de pantalla`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} loading="lazy" />
                  </div>
                  {/* Info */}
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: '#F5F5F7' }}>{name}</span>
                      <span style={{ background: `${color}18`, border: `1px solid ${border}`, borderRadius: 980, padding: '3px 10px', fontSize: 10, fontWeight: 700, color, letterSpacing: '.07em', textTransform: 'uppercase' }}>{category}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#636366', lineHeight: 1.65, margin: '0 0 14px' }}>{desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color, fontWeight: 600 }}>
                      Ver sitio
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section style={{ padding: '80px 0', background: '#000' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', background: 'rgba(41,151,255,.08)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Tarifas</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: '#F5F5F7', margin: '0 0 12px' }}>
              Precio claro
            </h2>
            <p style={{ color: '#636366', fontSize: '0.95rem', margin: 0 }}>Todo incluido. Sin cobros extra al final.</p>
          </div>

          <div style={{ background: 'linear-gradient(145deg, #0A1628, #0D0D0D)', border: '1.5px solid rgba(41,151,255,.35)', borderRadius: 24, padding: '40px 36px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg,#2997FF,#BF5AF2)', color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 18px', borderRadius: 980, letterSpacing: '.1em', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
              Plan Principal
            </div>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#F5F5F7', letterSpacing: '-.03em', lineHeight: 1 }}>$150.000</div>
              <div style={{ fontSize: '0.88rem', color: '#636366', marginTop: 8 }}>Sitio web profesional completo y publicado</div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Diseño moderno y personalizado',
                'Hasta 5 secciones (inicio, servicios, sobre nosotros, contacto…)',
                'Adaptado a celular, tablet y computador',
                'Formulario de contacto integrado',
                'Botón de WhatsApp directo',
                'SEO básico para aparecer en Google',
                'Dominio .cl o .com por 1 año',
                'Hosting por 1 año',
                'Soporte post-entrega',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.9rem', color: '#C7C7CC' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', background: '#2997FF', color: '#fff', borderRadius: 14, padding: '15px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
              Quiero mi página web →
            </a>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#3A3A3C', marginTop: 14, marginBottom: 0 }}>Entrega en 5 a 7 días hábiles · Respuesta en menos de 1 hora</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ display: 'inline-block', background: 'rgba(191,90,242,.08)', border: '1px solid rgba(191,90,242,.18)', borderRadius: 980, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#BF5AF2', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Preguntas frecuentes</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, letterSpacing: '-.03em', color: '#F5F5F7', margin: 0 }}>
              Resolvemos tus dudas
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PREGUNTAS.map(({ q, a }) => (
              <div key={q} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '24px 26px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F5F5F7', marginBottom: 10 }}>{q}</div>
                <div style={{ fontSize: '0.875rem', color: '#636366', lineHeight: 1.75 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: '80px 0 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: 'linear-gradient(145deg, #0A1628, #0D0D0D)', border: '1px solid rgba(41,151,255,.2)', borderRadius: 28, padding: '56px 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 800, letterSpacing: '-.03em', color: '#F5F5F7', marginBottom: 16 }}>
              ¿Listo para tener<br />tu página web?
            </h2>
            <p style={{ color: '#636366', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 32 }}>
              Escríbenos y te cotizamos en menos de 24 horas. Sin compromiso.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '16px 36px', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
              Cotizar por WhatsApp
            </a>
            <div style={{ marginTop: 20, fontSize: 12, color: '#3A3A3C' }}>Respuesta en menos de 1 hora · Lunes a viernes</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '28px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A3A3C' }}>
          © {new Date().getFullYear()} FIXDAY · Técnico a domicilio · Diseño web · Región Metropolitana, Chile
        </div>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 20 }}>
          <Link href="/" style={{ fontSize: 13, color: '#2997FF', textDecoration: 'none' }}>← Volver al inicio</Link>
          <Link href="/zonas" style={{ fontSize: 13, color: '#636366', textDecoration: 'none' }}>Zonas de cobertura</Link>
          <a href="https://www.instagram.com/fixdaycl" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#636366', textDecoration: 'none' }}>Instagram</a>
        </div>
      </footer>
    </div>
  )
}
