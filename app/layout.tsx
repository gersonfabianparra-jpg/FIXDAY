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
  title: 'FIXDAY – Diseño Web y Técnico de Computadores a Domicilio | Santiago',
  description:
    'Páginas web profesionales que venden y servicio técnico de computadores a domicilio en Santiago. Diseño moderno con entrega en 5–7 días y técnico a domicilio en toda la Región Metropolitana. Sin letra chica.',
  keywords:
    'diseño páginas web santiago, creación sitios web chile, tiendas online woocommerce, técnico computadores a domicilio santiago, reparación de computadores región metropolitana, mantención de pc a domicilio, recuperación de datos santiago, instalación de windows a domicilio, personalización wordpress santiago, diseño web profesional santiago',
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
    title: 'FIXDAY – Páginas web que venden. Computadores que rinden.',
    description:
      'Diseño web profesional y servicio técnico de computadores a domicilio en Santiago y toda la Región Metropolitana.',
    siteName: 'FIXDAY',
    locale: 'es_CL',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'FIXDAY – Diseño Web y Técnico a Domicilio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIXDAY – Páginas web que venden. Computadores que rinden.',
    description: 'Diseño web profesional y técnico de computadores a domicilio en la Región Metropolitana.',
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
