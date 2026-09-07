/**
 * Contenido y funcionalidades reforzadas por comuna.
 *
 * Solo las comunas presentes en ZONAS_PLUS muestran las piezas extra
 * (cupos en vivo, prueba social local y cupón). El resto de las comunas
 * mantiene la página estándar. Hoy: Maipú, que es la que más contactos genera.
 */

export interface ZonaPlus {
  /** Sectores de la comuna donde se ofrece cobertura. */
  sectores: string[]
  /** Referencias urbanas conocidas, para que se lea local de verdad. */
  hitos: string[]
  /** Texto corto sobre el tiempo de llegada. */
  llegada: string
  /** Clave en `settings` del cupón administrable. */
  cuponKey: string
  /** Clave en `settings` de los cupos diarios. */
  cuposKey: string
}

export const ZONAS_PLUS: Record<string, ZonaPlus> = {
  maipu: {
    sectores: [
      'Maipú Centro',
      'Ciudad Satélite',
      'Rinconada de Maipú',
      'El Abrazo',
      'Los Héroes',
      'Sol Poniente',
      'Pehuén',
      'Longitudinal',
      'Tres Poniente',
      'Santiago Bueras',
    ],
    hitos: [
      'Plaza de Maipú',
      'Templo Votivo',
      'Metro Plaza de Maipú',
      'Mall Arauco Maipú',
      'Hospital El Carmen',
    ],
    llegada: 'Salimos hacia Maipú el mismo día que agendas.',
    cuponKey: 'zona_cupon_maipu',
    cuposKey: 'zona_cupos_maipu',
  },
}

export function getZonaPlus(slug: string): ZonaPlus | null {
  return ZONAS_PLUS[slug] ?? null
}
