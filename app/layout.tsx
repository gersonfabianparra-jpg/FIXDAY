import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import BusinessSchema from './components/BusinessSchema'
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'FIXDAY – Diseño y Personalización de Páginas Web',
    description:
      'Creamos tu página web desde cero o reorganizamos tu WordPress. Diseño profesional para negocios chilenos.',
    siteName: 'FIXDAY',
    locale: 'es_CL',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'FIXDAY – Diseño Web y Técnico a Domicilio' }],
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
        <BusinessSchema />
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
