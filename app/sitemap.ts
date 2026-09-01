import { MetadataRoute } from 'next'
import { COMUNAS } from './zonas/comunas'
import { POSTS } from './blog/posts'
import { SERVICES } from './servicios/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fixday.cl'
  const now = new Date()

  const comunaPages: MetadataRoute.Sitemap = COMUNAS.map(c => ({
    url: `${base}/zonas/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = POSTS.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const servicePages: MetadataRoute.Sitemap = SERVICES.map(s => ({
    url: `${base}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Servicio × comuna: 6 servicios × 40 comunas = 240 landing pages long-tail
  const servicioComunaPages: MetadataRoute.Sitemap = SERVICES.flatMap(s =>
    COMUNAS.map(c => ({
      url: `${base}/servicios/${s.slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  )

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/zonas`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/paginas-web`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/resenas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/oferta`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/cotizador`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/referidos`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...servicePages,
    ...servicioComunaPages,
    ...comunaPages,
    ...blogPages,
  ]
}
