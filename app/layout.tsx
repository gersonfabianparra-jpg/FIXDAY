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
  title: 'FIXDAY – Diseño y Personalización de Páginas Web | Santiago, Chile',
  description:
    'Creamos y personalizamos páginas web profesionales para negocios chilenos. También reorganizamos y limpiamos sitios WordPress desordenados. Diseño moderno, entrega rápida y sin letra chica.',
  keywords:
    'diseño páginas web santiago, creación sitios web chile, personalización wordpress santiago, reorganizar wordpress, páginas web para negocios chile, diseño web profesional santiago, tiendas online chile, páginas web económicas santiago, técnico wordpress chile, arreglar página web wordpress',
  authors: [{ name: 'FIXDAY' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'FIXDAY – Diseño y Personalización de Páginas Web',
    description:
      'Creamos tu página web desde cero o reorganizamos tu WordPress. Diseño profesional para negocios chilenos.',
    siteName: 'FIXDAY',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIXDAY – Diseño y Personalización de Páginas Web',
    description: 'Páginas web profesionales y reorganización de WordPress para negocios en Chile.',
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
              '@type': ['LocalBusiness', 'ProfessionalService'],
              '@id': `${SITE_URL}/#business`,
              name: 'FIXDAY',
              alternateName: 'FIXDAY Diseño Web',
              description: 'Creamos y personalizamos páginas web profesionales para negocios chilenos. Especialistas en reorganización y limpieza de sitios WordPress desordenados. También ofrecemos soporte técnico a domicilio en la Región Metropolitana.',
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
      {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
          fbq('track','PageView');
        `}</Script>
      )}
      <body>{children}</body>
    </html>
  )
}
