/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 300,
  // Fecha del despliegue (hora de Chile), igual en servidor y navegador: permite
  // que las páginas estáticas nazcan con la temporada correcta, sin parpadeo.
  env: {
    NEXT_PUBLIC_FECHA_BUILD: new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date()),
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',       value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
