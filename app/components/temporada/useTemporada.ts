'use client'

import { useEffect, useState } from 'react'
import { ausenciaActiva, fiestasActivas, FECHA_BUILD } from '@/lib/temporada'

/**
 * Estado de la temporada calculado en el navegador.
 * Las páginas de comuna son estáticas: si se calculara al compilar, el aviso
 * quedaría congelado. Aquí se evalúa con la fecha real de quien visita.
 */
export function useTemporada() {
  // Arranca con la fecha del despliegue (igual en servidor y navegador, sin
  // parpadeo) y se corrige con la fecha real apenas carga la página.
  const [estado, setEstado] = useState<{ listo: boolean; ausencia: boolean; fiestas: boolean }>(
    { listo: true, ausencia: ausenciaActiva(FECHA_BUILD), fiestas: fiestasActivas(FECHA_BUILD) },
  )
  useEffect(() => {
    const calcular = () => setEstado({ listo: true, ausencia: ausenciaActiva(), fiestas: fiestasActivas() })
    calcular()
    const id = setInterval(calcular, 10 * 60 * 1000)
    return () => clearInterval(id)
  }, [])
  return estado
}
