import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const SITE_URL = 'https://fixday.cl'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'FIXDAY – Técnico Computadores a Domicilio | Región Metropolitana',
  description:
    'Servicio técnico de computadores a domicilio en Santiago y Región Metropolitana. Mantención, recuperación de datos, instalación de Windows, optimización y WiFi. Rápido, confiable y profesional.',
  keywords:
    'técnico computadores domicilio santiago, reparación pc domicilio, mantención computador santiago, recuperación datos santiago, instalación windows domicilio, optimización pc santiago, instalación wifi domicilio, técnico pc región metropolitana, servicio técnico a domicilio santiago, arreglo computador santiago',
  authors: [{ name: 'FIXDAY' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'FIXDAY – Técnico Computadores a Domicilio',
    description:
      'Tu computador reparado en casa. Servicio técnico profesional a domicilio en la Región Metropolitana.',
    siteName: 'FIXDAY',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIXDAY – Técnico Computadores a Domicilio',
    description: 'Tu computador reparado en casa. Profesional, rápido y a domicilio en Santiago.',
  },
  other: {
    'geo.region': 'CL-RM',
    'geo.placename': 'Santiago, Región Metropolitana, Chile',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': SITE_URL,
              name: 'FIXDAY',
              description:
                'Servicio técnico de computadores a domicilio en la Región Metropolitana de Santiago. Rápido, confiable y profesional.',
              url: SITE_URL,
              telephone: '+56936649332',
              priceRange: '$$',
              currenciesAccepted: 'CLP',
              paymentAccepted: 'Efectivo, Transferencia',
              areaServed: {
                '@type': 'State',
                name: 'Región Metropolitana',
                containedInPlace: { '@type': 'Country', name: 'Chile' },
              },
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Región Metropolitana',
                addressCountry: 'CL',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '20:00',
                },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servicios Técnicos a Domicilio',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mantención Lógica y Física de Computadores' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Respaldo y Recuperación de Datos' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Instalación de Windows a Domicilio' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Optimización de Sistema Operativo' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Instalación WiFi y Repetidores' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Servicio Técnico PC a Domicilio Santiago' } },
                ],
              },
              sameAs: [
                `https://wa.me/56936649332`,
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
