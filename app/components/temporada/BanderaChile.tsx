/** Bandera de Chile dibujada: el emoji 🇨🇱 en Windows se ve como las letras "CL". */
export default function BanderaChile({ ancho = 26 }: { ancho?: number }) {
  const alto = Math.round(ancho * 2 / 3)
  return (
    <svg width={ancho} height={alto} viewBox="0 0 30 20" aria-hidden
      style={{ borderRadius: 3, flexShrink: 0, boxShadow: '0 0 0 1px rgba(255,255,255,.18)' }}>
      <rect width="30" height="20" fill="#D52B1E" />
      <rect width="30" height="10" fill="#fff" />
      <rect width="10" height="10" fill="#0039A6" />
      <path d="M5 2.2l.95 2.9h3.05l-2.47 1.8.95 2.9L5 8l-2.48 1.8.95-2.9L1 5.1h3.05z" fill="#fff" />
    </svg>
  )
}
