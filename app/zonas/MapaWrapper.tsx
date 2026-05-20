'use client'

import dynamic from 'next/dynamic'

const MapaZonas = dynamic(() => import('./MapaZonas'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#636366', fontSize: 13 }}>Cargando mapa…</div>
    </div>
  ),
})

export default function MapaWrapper() {
  return <MapaZonas />
}
