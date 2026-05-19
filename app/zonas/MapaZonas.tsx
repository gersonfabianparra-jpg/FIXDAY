'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

const COVERED = [
  'Santiago','Independencia','Recoleta','Conchalí','Cerro Navia',
  'Quinta Normal','Estación Central','Providencia','Las Condes',
  'Vitacura','Lo Barnechea','Ñuñoa','La Reina','Peñalolén',
  'La Florida','Macul','San Joaquín','La Granja','San Ramón',
  'La Pintana','Puente Alto','San Miguel','La Cisterna','El Bosque',
  'Pedro Aguirre Cerda','Lo Espejo','San Bernardo','Buin','Maipú',
  'Pudahuel','Cerrillos','Lo Prado','Renca','Quilicura','Lampa',
  'Huechuraba','Colina','Til Til',
]

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}
const coveredSet = new Set(COVERED.map(norm))

function getName(props: Record<string, string>): string {
  return props.NOM_COM ?? props.nom_com ?? props.NOMBRE ?? props.nombre ?? props.comuna ?? props.COMUNA ?? ''
}

function getRegion(props: Record<string, string>): string | number {
  return props.REGION ?? props.region ?? props.cod_reg ?? props.codregion ?? props.COD_REGI ?? ''
}

export default function MapaZonas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then(L => {
      const map = L.map(containerRef.current!, {
        center: [-33.48, -70.65],
        zoom: 10,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      })
      mapRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.control.attribution({ position: 'bottomleft', prefix: '' })
        .addAttribution('<span style="color:#444">© OpenStreetMap · © CARTO</span>')
        .addTo(map)

      fetch('https://raw.githubusercontent.com/robervidal/chile-geojson/master/geojson/comunas.geojson')
        .then(r => r.json())
        .then((data: GeoJSON.FeatureCollection) => {
          const rm = data.features.filter(f => {
            const r = String(getRegion(f.properties as Record<string, string>))
            return r === '13' || r.includes('Metropolitana') || r.includes('metropolitana')
          })

          L.geoJSON({ type: 'FeatureCollection', features: rm } as GeoJSON.FeatureCollection, {
            style(feature) {
              const name = getName(feature?.properties as Record<string, string> ?? {})
              const covered = coveredSet.has(norm(name))
              return {
                fillColor: covered ? '#2997FF' : '#1a1a2e',
                fillOpacity: covered ? 0.28 : 0.4,
                color: covered ? '#2997FF' : 'rgba(255,255,255,0.06)',
                weight: covered ? 1.5 : 0.5,
              }
            },
            onEachFeature(feature, layer) {
              const name = getName(feature?.properties as Record<string, string> ?? {})
              const covered = coveredSet.has(norm(name))
              layer.bindTooltip(name || '?', {
                permanent: false,
                direction: 'center',
                className: 'fd-tip',
              })
              if (covered) {
                layer.on('mouseover', () => (layer as L.Path).setStyle({ fillOpacity: 0.55, color: '#BF5AF2', weight: 2 }))
                layer.on('mouseout', () => (layer as L.Path).setStyle({ fillOpacity: 0.28, color: '#2997FF', weight: 1.5 }))
              }
            },
          }).addTo(map)
        })
        .catch(console.error)
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <>
      <style>{`
        .fd-tip {
          background: rgba(8,9,15,0.92) !important;
          border: 1px solid rgba(41,151,255,0.35) !important;
          color: #F5F5F7 !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          padding: 5px 12px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,.5) !important;
          white-space: nowrap !important;
        }
        .fd-tip::before { display: none !important; }
        .leaflet-container { background: #08090F !important; font-family: -apple-system, sans-serif !important; }
        .leaflet-control-zoom {
          border: 1px solid rgba(255,255,255,.1) !important;
          background: transparent !important;
          border-radius: 10px !important;
          overflow: hidden !important;
          box-shadow: none !important;
        }
        .leaflet-control-zoom a {
          color: rgba(255,255,255,.6) !important;
          background: rgba(10,10,15,.85) !important;
          border-bottom: 1px solid rgba(255,255,255,.08) !important;
          width: 32px !important; height: 32px !important;
          line-height: 32px !important;
          font-size: 16px !important;
        }
        .leaflet-control-zoom a:hover { background: rgba(41,151,255,.2) !important; color: #fff !important; }
        .leaflet-control-attribution { background: transparent !important; font-size: 9px !important; }
      `}</style>
      <div
        ref={containerRef}
        style={{ height: '100%', width: '100%', background: '#08090F' }}
      />
    </>
  )
}
