import { getSupabase } from '@/lib/supabase'
import { unstable_cache } from 'next/cache'

const SITE_URL = 'https://fixday.cl'

/**
 * Lee el promedio y la cantidad de reseñas aprobadas desde Supabase.
 * Cacheado 1h. Si no hay DB configurada o no hay reseñas, devuelve null
 * para que el schema se emita sin aggregateRating (sin romper nada).
 */
const getRatingAggregate = unstable_cache(
  async (): Promise<{ count: number; avg: number } | null> => {
    try {
      const sb = getSupabase()
      if (!sb) return null
      const { data, error } = await sb
        .from('reviews')
        .select('rating')
        .eq('status', 'approved')
      if (error || !data || data.length === 0) return null
      const ratings = data.map(r => Number(r.rating) || 0).filter(n => n > 0)
      if (ratings.length === 0) return null
      const avg = Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      return { count: ratings.length, avg }
    } catch {
      return null
    }
  },
  ['reviews-aggregate'],
  { revalidate: 3600, tags: ['reviews'] },
)

export default async function BusinessSchema() {
  const rating = await getRatingAggregate()

  const business: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#business`,
    name: 'FIXDAY',
    alternateName: 'FIXDAY Diseño Web',
    description:
      'Creamos y personalizamos páginas web profesionales para negocios chilenos. Especialistas en reorganización y limpieza de sitios WordPress desordenados. También ofrecemos soporte técnico a domicilio en la Región Metropolitana.',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
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
    sameAs: ['https://wa.me/56936649332', 'https://www.instagram.com/fixdaycl'],
    mainEntityOfPage: `${SITE_URL}/blog`,
  }

  if (rating) {
    business.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.avg.toFixed(1),
      reviewCount: rating.count,
      bestRating: '5',
      worstRating: '1',
    }
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'FIXDAY',
    alternateName: 'FIXDAY Diseño Web y Técnico a Domicilio',
    inLanguage: 'es-CL',
    publisher: { '@id': `${SITE_URL}/#business` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
