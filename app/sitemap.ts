import { MetadataRoute } from 'next'
import { COMUNAS } from './zonas/comunas'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fixday.cl'
  const now = new Date()

  const comunaPages: MetadataRoute.Sitemap = COMUNAS.map(c => ({
    url: `${base}/zonas/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/zonas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/paginas-web`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/oferta`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...comunaPages,
  ]
}
