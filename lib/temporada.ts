/**
 * Temporadas y ausencias con fecha de inicio y término.
 *
 * Todo lo que depende de esto (título del home, avisos en comunas, agenda)
 * se activa y se apaga solo según la fecha en Chile, así el sitio vuelve a la
 * normalidad aunque nadie alcance a desplegar un cambio.
 */

import { ahoraEnChile, formatoLargo } from './agenda'

/** Días en que no hay visitas a domicilio. Fechas inclusivas, YYYY-MM-DD. */
export const AUSENCIA = {
  desde: '2026-09-13',
  hasta: '2026-09-20',
  /** Primer día hábil de vuelta. */
  vuelta: '2026-09-21',
  motivo: 'Fiestas Patrias',
}

/** Ambiente dieciochero en el sitio. */
export const FIESTAS_PATRIAS = {
  desde: '2026-09-13',
  hasta: '2026-09-20',
}

export function hoyChile(): string {
  return ahoraEnChile().fecha
}

export function enRango(fecha: string, r: { desde: string; hasta: string }): boolean {
  return fecha >= r.desde && fecha <= r.hasta
}

/** true si esta fecha cae dentro de la ausencia (sirve para bloquear la agenda). */
export function diaBloqueado(fecha: string): boolean {
  return enRango(fecha, AUSENCIA)
}

export function ausenciaActiva(fecha = hoyChile()): boolean {
  return enRango(fecha, AUSENCIA)
}

export function fiestasActivas(fecha = hoyChile()): boolean {
  return enRango(fecha, FIESTAS_PATRIAS)
}

/** "lunes 21 de septiembre" (sin el año, para textos cortos). */
export function vueltaCorta(): string {
  return formatoLargo(AUSENCIA.vuelta).replace(/ de \d{4}$/, '')
}

/** Fecha (Chile) en que se compiló el sitio. Idéntica en servidor y navegador. */
export const FECHA_BUILD = process.env.NEXT_PUBLIC_FECHA_BUILD ?? '2000-01-01'
