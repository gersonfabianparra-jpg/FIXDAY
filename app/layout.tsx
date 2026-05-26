import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_ID = 'G-YNG34YWWRL'

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
  verification: {
    google: 'b2iejJ6TyvO27tVj4_4kwJZ_Jyzq6QhrxfNuV8qv2lY',
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
              '@type': ['LocalBusiness', 'ComputerRepairService'],
              '@id': `${SITE_URL}/#business`,
              name: 'FIXDAY',
              alternateName: 'FIXDAY Técnico a Domicilio',
              description: 'Servicio técnico de computadores a domicilio en la Región Metropolitana de Santiago. Mantención, recuperación de datos, instalación de Windows, optimización y WiFi. Rápido, confiable y profesional.',
              url: SITE_URL,
              logo: `${SITE_URL}/icon.svg`,
              image: `${SITE_URL}/icon.svg`,
              telephone: '+56936649332',
              priceRange: '$$',
              currenciesAccepted: 'CLP',
              paymentAccepted: 'Efectivo, Transferencia bancaria',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -33.4569,
                longitude: -70.6483,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Santiago',
                addressRegion: 'Región Metropolitana',
                addressCountry: 'CL',
              },
              areaServed: [
                'Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Ñuñoa',
                'La Florida', 'Maipú', 'Puente Alto', 'San Miguel', 'La Reina',
                'Peñalolén', 'Macul', 'Lo Barnechea', 'Quilicura', 'Huechuraba',
                'Independencia', 'Recoleta', 'Conchalí', 'Cerro Navia', 'Quinta Normal',
                'Estación Central', 'San Joaquín', 'La Granja', 'San Ramón',
                'La Pintana', 'La Cisterna', 'El Bosque', 'Pedro Aguirre Cerda',
                'Lo Espejo', 'San Bernardo', 'Pudahuel', 'Cerrillos', 'Lo Prado',
                'Renca', 'Lampa', 'Colina', 'Tiltil', 'Buin',
              ].map(name => ({ '@type': 'City', name })),
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '19:00',
                },
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+56936649332',
                contactType: 'customer service',
                contactOption: 'TollFree',
                areaServed: 'CL',
                availableLanguage: 'Spanish',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servicios FIXDAY',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mantención Lógica y Física de Computadores', areaServed: 'Región Metropolitana' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Respaldo de Información', areaServed: 'Región Metropolitana' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recuperación de Datos', areaServed: 'Región Metropolitana' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Instalación de Windows a Domicilio', areaServed: 'Región Metropolitana' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Optimización de Sistema Operativo', areaServed: 'Región Metropolitana' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Instalación WiFi y Repetidores', areaServed: 'Región Metropolitana' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño de Páginas Web Profesionales', areaServed: 'Chile' } },
                ],
              },
              sameAs: [`https://wa.me/56936649332`, `https://www.instagram.com/fixdaycl`],
              mainEntityOfPage: `${SITE_URL}/blog`,
            }),
          }}
        />
      </head>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
      <body>{children}</body>
    </html>
  )
}
