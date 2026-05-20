'use client'

import Link from 'next/link'
import { COMUNAS } from './comunas'

const SECTORS = [
  {
    name: 'Sector Centro',
    desc: 'Atendemos el corazón de Santiago y sus alrededores con tiempos de respuesta rápidos.',
    comunas: ['Santiago','Independencia','Recoleta','Conchalí','Cerro Navia','Quinta Normal','Estación Central'],
  },
  {
    name: 'Sector Oriente',
    desc: 'Cobertura completa en las comunas del sector oriente, incluyendo las comunas altas.',
    comunas: ['Providencia','Las Condes','Vitacura','Lo Barnechea','Ñuñoa','La Reina','Peñalolén'],
  },
  {
    name: 'Sector Sur-Oriente',
    desc: 'Llegamos a La Florida y todas las comunas del sector sur-oriente de Santiago.',
    comunas: ['La Florida','Macul','San Joaquín','La Granja','San Ramón','La Pintana','Puente Alto'],
  },
  {
    name: 'Sector Sur',
    desc: 'Cobertura total en el sector sur, desde San Miguel hasta San Bernardo.',
    comunas: ['San Miguel','La Cisterna','El Bosque','Pedro Aguirre Cerda','Lo Espejo','San Bernardo','Buin'],
  },
  {
    name: 'Sector Poniente',
    desc: 'Atendemos Maipú y todas las comunas del poniente con rapidez y profesionalismo.',
    comunas: ['Maipú','Pudahuel','Cerrillos','Lo Prado','Renca','Pudahuel','Quilicura','Lampa'],
  },
  {
    name: 'Sector Norte',
    desc: 'Presencia en el sector norte de la Región Metropolitana.',
    comunas: ['Quilicura','Huechuraba','Colina','Til Til','Lampa','Lo Barnechea'],
  },
]

export default function SectorsGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
      {SECTORS.map(sector => (
        <div key={sector.name} style={{ background: '#111', border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: '32px 28px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2997FF', marginBottom: 8, letterSpacing: '-.01em' }}>
            {sector.name}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#636366', lineHeight: 1.7, marginBottom: 22 }}>
            {sector.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sector.comunas.map(c => {
              const slug = COMUNAS.find(x => x.name === c)?.slug
              return slug ? (
                <Link key={c} href={`/zonas/${slug}`}
                  style={{ background: 'rgba(41,151,255,.07)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 8, padding: '5px 12px', fontSize: '0.82rem', fontWeight: 500, color: '#C7C7CC', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(41,151,255,.18)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(41,151,255,.07)'; e.currentTarget.style.color = '#C7C7CC' }}>
                  {c}
                </Link>
              ) : (
                <span key={c} style={{ background: 'rgba(41,151,255,.07)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 8, padding: '5px 12px', fontSize: '0.82rem', fontWeight: 500, color: '#C7C7CC' }}>
                  {c}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
