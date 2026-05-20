'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

const COVERED = new Set([
  'Santiago','Independencia','Recoleta','Conchalí','Cerro Navia',
  'Quinta Normal','Estación Central','Providencia','Las Condes',
  'Vitacura','Lo Barnechea','Ñuñoa','La Reina','Peñalolén',
  'La Florida','Macul','San Joaquín','La Granja','San Ramón',
  'La Pintana','Puente Alto','San Miguel','La Cisterna','El Bosque',
  'Pedro Aguirre Cerda','Lo Espejo','San Bernardo','Buin','Maipú',
  'Pudahuel','Cerrillos','Lo Prado','Renca','Quilicura','Lampa',
  'Huechuraba','Colina','Tiltil',
])

// Normaliza ignorando tildes y espacios
function norm(s: string) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '')
}
const coveredNorm = new Set(Array.from(COVERED).map(norm))

const GEOJSON_URL = '/rm-comunas.geojson'

export default function MapaZonas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then(L => {
      const map = L.map(containerRef.current!, {
        center: [-33.5, -70.65],
        zoom: 10,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      })
      mapRef.current = map

      // Mapa oscuro sin labels de calles — comunas destacan más
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.control.attribution({ position: 'bottomleft', prefix: '' })
        .addAttribution('<span style="color:#333">© OpenStreetMap · © CARTO</span>')
        .addTo(map)

      fetch(GEOJSON_URL)
        .then(r => r.json())
        .then((data: GeoJSON.FeatureCollection) => {
          L.geoJSON(data, {
            style(feature) {
              const name: string = (feature?.properties as Record<string, string>)?.Comuna ?? ''
              const covered = coveredNorm.has(norm(name))
              return covered
                ? { fillColor: '#2997FF', fillOpacity: 0.45, color: '#2997FF', weight: 1.5 }
                : { fillColor: '#111827', fillOpacity: 0.6, color: 'rgba(255,255,255,0.07)', weight: 0.5 }
            },
            onEachFeature(feature, layer) {
              const name: string = (feature?.properties as Record<string, string>)?.Comuna ?? ''
              const covered = coveredNorm.has(norm(name))

              layer.bindTooltip(
                `<div style="display:flex;align-items:center;gap:6px">
                  <div style="width:8px;height:8px;border-radius:50%;background:${covered ? '#2997FF' : '#444'};flex-shrink:0"></div>
                  <span>${name}</span>
                  ${covered ? '<span style="color:#2997FF;font-size:10px;margin-left:2px">✓</span>' : ''}
                </div>`,
                { permanent: false, direction: 'top', className: 'fd-tip' }
              )

              if (covered) {
                layer.on('mouseover', () => (layer as L.Path).setStyle({ fillOpacity: 0.7, color: '#BF5AF2', weight: 2 }))
                layer.on('mouseout',  () => (layer as L.Path).setStyle({ fillOpacity: 0.45, color: '#2997FF', weight: 1.5 }))
              } else {
                layer.on('mouseover', () => (layer as L.Path).setStyle({ fillOpacity: 0.75 }))
                layer.on('mouseout',  () => (layer as L.Path).setStyle({ fillOpacity: 0.6 }))
              }
            },
          }).addTo(map)
        })
        .catch(console.error)
    })

    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <>
      <style>{`
        .fd-tip {
          background: rgba(8,9,15,0.95) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: #F5F5F7 !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          padding: 6px 12px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,.6) !important;
          white-space: nowrap !important;
        }
        .fd-tip::before { display: none !important; }
        .leaflet-container { background: #08090F !important; font-family: -apple-system, sans-serif !important; }
        .leaflet-control-zoom {
          border: 1px solid rgba(255,255,255,.1) !important;
          border-radius: 10px !important;
          overflow: hidden !important;
          box-shadow: none !important;
        }
        .leaflet-control-zoom a {
          color: rgba(255,255,255,.7) !important;
          background: rgba(10,10,15,.9) !important;
          border-bottom: 1px solid rgba(255,255,255,.08) !important;
          width: 32px !important; height: 32px !important;
          line-height: 32px !important;
        }
        .leaflet-control-zoom a:hover { background: rgba(41,151,255,.25) !important; color: #fff !important; }
        .leaflet-control-attribution { background: transparent !important; font-size: 9px !important; }
      `}</style>
      <div ref={containerRef} style={{ height: '100%', width: '100%', background: '#08090F' }} />
    </>
  )
}
