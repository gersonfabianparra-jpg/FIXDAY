import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
}

export default function ReporteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
