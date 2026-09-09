import type { Metadata } from 'next'

export const metadata: Metadata = {
  // La cita lleva datos del cliente: no debe aparecer en buscadores
  robots: { index: false, follow: false, nocache: true },
}

export default function CitaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
