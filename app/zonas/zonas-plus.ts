/**
 * Contenido y funcionalidades reforzadas por comuna.
 *
 * Cada comuna presente en ZONAS_PLUS muestra contenido local único (sectores,
 * hitos urbanos y texto de llegada propio) más las piezas de conversión:
 * barra de estado en vivo, captura de contacto en WhatsApp y cupón.
 *
 * El cupón y los cupos se administran por comuna con `cuponKey` / `cuposKey`:
 * si no están configurados en `settings`, el cupón simplemente no aparece y la
 * barra muestra solo el estado horario. Nada se rompe por no configurarlos.
 *
 * Los sectores y los hitos son referencias urbanas REALES de cada comuna: son
 * el contenido que diferencia cada página para Google (evita el casi-duplicado).
 */

export interface ZonaPlus {
  /** Sectores/barrios de la comuna donde se ofrece cobertura. */
  sectores: string[]
  /** Referencias urbanas conocidas, para que se lea local de verdad. */
  hitos: string[]
  /** Texto corto sobre el tiempo/forma de llegada (propio de la comuna). */
  llegada: string
  /** Clave en `settings` del cupón administrable. */
  cuponKey: string
  /** Clave en `settings` de los cupos diarios. */
  cuposKey: string
}

/** Genera las claves de settings estándar para una comuna. */
const keys = (slug: string) => ({
  cuponKey: `zona_cupon_${slug}`,
  cuposKey: `zona_cupos_${slug}`,
})

export const ZONAS_PLUS: Record<string, ZonaPlus> = {
  // ─────────────────────────── Sector Centro ───────────────────────────
  santiago: {
    sectores: ['Barrio Lastarria', 'Barrio Brasil', 'Barrio Yungay', 'Barrio República', 'Barrio Concha y Toro', 'Parque Almagro'],
    hitos: ['Plaza de Armas', 'Cerro Santa Lucía', 'Mercado Central', 'Metro Universidad de Chile', 'Estación Mapocho'],
    llegada: 'Nos movemos por todo el centro de Santiago el mismo día que agendas.',
    ...keys('santiago'),
  },
  independencia: {
    sectores: ['Barrio La Chimba', 'Vega Central', 'Vivaceta', 'Einstein', 'Hipódromo Chile'],
    hitos: ['Vega Central', 'Hospital San José', 'Metro Cementerios', 'Estadio Santa Laura', 'Facultad de Medicina U. de Chile'],
    llegada: 'Llegamos a Independencia cruzando el Mapocho apenas coordinamos la hora.',
    ...keys('independencia'),
  },
  recoleta: {
    sectores: ['Patronato', 'Bellavista', 'Cerro Blanco', 'Einstein', 'Dorsal'],
    hitos: ['Barrio Patronato', 'Cerro San Cristóbal', 'Cementerio General', 'La Vega', 'Metro Cerro Blanco'],
    llegada: 'Recorremos Recoleta desde Patronato hasta Dorsal el mismo día.',
    ...keys('recoleta'),
  },
  conchali: {
    sectores: ['El Cortijo', 'Juanita Aguirre', 'La Palmilla', 'Vespucio Norte'],
    hitos: ['Zócalo de Conchalí', 'Metro Cardenal Caro', 'Autopista Vespucio Norte', 'Estadio Municipal de Conchalí'],
    llegada: 'Salimos hacia Conchalí por Vespucio Norte apenas agendas.',
    ...keys('conchali'),
  },
  'cerro-navia': {
    sectores: ['Las Viñitas', 'Villa Los Héroes', 'Sara Gajardo', 'La Estrella'],
    hitos: ['Costanera Sur del Mapocho', 'Av. Mapocho', 'Parque Las Palmeras', 'Puente Carrascal'],
    llegada: 'Llegamos a Cerro Navia por la ribera del Mapocho el mismo día.',
    ...keys('cerro-navia'),
  },
  'quinta-normal': {
    sectores: ['Barrio Matucana', 'Lo Besa', 'Nogales', 'Simón Bolívar'],
    hitos: ['Parque Quinta Normal', 'Museo de la Memoria', 'Metro Quinta Normal', 'Matucana 100'],
    llegada: 'Vamos a Quinta Normal desde Matucana hasta Nogales apenas coordinamos.',
    ...keys('quinta-normal'),
  },
  'estacion-central': {
    sectores: ['Barrio Meiggs', 'Las Rejas', 'Villa Francia', 'Robert Kennedy'],
    hitos: ['Estación Central (USACH)', 'Metro Universidad de Santiago', 'Mall Plaza Alameda', 'Barrio Meiggs'],
    llegada: 'Recorremos Estación Central desde la Alameda hasta Las Rejas el mismo día.',
    ...keys('estacion-central'),
  },

  // ─────────────────────────── Sector Oriente ──────────────────────────
  providencia: {
    sectores: ['Barrio Italia', 'Manuel Montt', 'Los Leones', 'Pedro de Valdivia', 'Barrio Bellavista'],
    hitos: ['Costanera Center', 'Parque Bustamante', 'Metro Los Leones', 'Parque de las Esculturas', 'Providencia con Suecia'],
    llegada: 'Llegamos a Providencia por el eje Providencia–Apoquindo apenas agendas.',
    ...keys('providencia'),
  },
  'las-condes': {
    sectores: ['El Golf', 'Apoquindo', 'Escuela Militar', 'Los Dominicos', 'San Damián', 'Nueva Las Condes'],
    hitos: ['Parque Araucano', 'Mall Apumanque', 'Metro Escuela Militar', 'Pueblito Los Dominicos', 'Barrio El Golf'],
    llegada: 'Vamos a Las Condes por Apoquindo o Kennedy el mismo día que coordinamos.',
    ...keys('las-condes'),
  },
  vitacura: {
    sectores: ['Santa María de Manquehue', 'Nueva Costanera', 'Jardín del Este', 'Lo Curro'],
    hitos: ['Parque Bicentenario', 'Nueva Costanera', 'Av. Kennedy', 'Mall Alto Las Condes'],
    llegada: 'Llegamos a Vitacura por Av. Kennedy o Vitacura apenas agendas.',
    ...keys('vitacura'),
  },
  'lo-barnechea': {
    sectores: ['La Dehesa', 'El Arrayán', 'Los Trapenses', 'Cerro 18'],
    hitos: ['Mall Portal La Dehesa', 'El Arrayán', 'Camino a Farellones', 'Comercio de La Dehesa'],
    llegada: 'Subimos a Lo Barnechea, La Dehesa y El Arrayán el mismo día que agendas.',
    ...keys('lo-barnechea'),
  },
  nunoa: {
    sectores: ['Plaza Ñuñoa', 'Villa Frei', 'Suárez Mujica', 'Estadio Nacional', 'Irarrázaval'],
    hitos: ['Plaza Ñuñoa', 'Estadio Nacional', 'Metro Ñuñoa', 'Villa Frei', 'Av. Irarrázaval'],
    llegada: 'Recorremos Ñuñoa desde Plaza Ñuñoa hasta Villa Frei apenas coordinamos.',
    ...keys('nunoa'),
  },
  'la-reina': {
    sectores: ['Villa La Reina', 'Príncipe de Gales', 'Larraín', 'Nueva Oriente'],
    hitos: ['Plaza Egaña', 'Mall Plaza Egaña', 'Metro Plaza Egaña', 'Parque Mahuida'],
    llegada: 'Llegamos a La Reina por Larraín o Príncipe de Gales el mismo día.',
    ...keys('la-reina'),
  },
  penalolen: {
    sectores: ['Lo Hermida', 'Peñalolén Alto', 'San Luis', 'La Faena', 'Grecia'],
    hitos: ['Parque Quebrada de Macul', 'Av. Grecia', 'Comunidad Ecológica', 'Universidad Adolfo Ibáñez'],
    llegada: 'Vamos a Peñalolén desde Grecia hasta Peñalolén Alto apenas agendas.',
    ...keys('penalolen'),
  },

  // ───────────────────────── Sector Sur-Oriente ────────────────────────
  'la-florida': {
    sectores: ['Bellavista de La Florida', 'Vicente Valdés', 'Walker Martínez', 'Rojas Magallanes', 'Trinidad'],
    hitos: ['Mall Plaza Vespucio', 'Metro Bellavista de La Florida', 'Metro Vicente Valdés', 'Av. Vicuña Mackenna'],
    llegada: 'Recorremos La Florida por Vicuña Mackenna y Vespucio el mismo día.',
    ...keys('la-florida'),
  },
  macul: {
    sectores: ['Santa Julia', 'Los Presidentes', 'Villa Macul', 'Exequiel González Cortés'],
    hitos: ['Estadio Monumental', 'Metro Macul', 'Av. Quilín', 'Av. Américo Vespucio'],
    llegada: 'Llegamos a Macul por Quilín o Vespucio apenas coordinamos la hora.',
    ...keys('macul'),
  },
  'san-joaquin': {
    sectores: ['La Legua', 'La Castrina', 'Vicuña Mackenna', 'San Joaquín Centro'],
    hitos: ['Metro San Joaquín', 'Campus San Joaquín UC', 'Parque La Castrina', 'Av. Vicuña Mackenna'],
    llegada: 'Vamos a San Joaquín por Vicuña Mackenna el mismo día que agendas.',
    ...keys('san-joaquin'),
  },
  'la-granja': {
    sectores: ['Malaquías Concha', 'Granja Sur', 'Santo Tomás', 'Vespucio'],
    hitos: ['Av. Américo Vespucio', 'Parque Brasil', 'Av. Santa Rosa', 'Estadio Municipal La Granja'],
    llegada: 'Llegamos a La Granja por Santa Rosa o Vespucio apenas coordinamos.',
    ...keys('la-granja'),
  },
  'san-ramon': {
    sectores: ['La Bandera', 'San Ramón Centro', 'La Cisterna Oriente', 'Vespucio'],
    hitos: ['Feria La Bandera', 'Av. Santa Rosa', 'Av. Américo Vespucio', 'Población La Bandera'],
    llegada: 'Vamos a San Ramón por Santa Rosa hasta La Bandera el mismo día.',
    ...keys('san-ramon'),
  },
  'la-pintana': {
    sectores: ['El Castillo', 'Santo Tomás', 'Pablo de Rokha', 'San Rafael'],
    hitos: ['Av. Santa Rosa', 'Parque Mapuhue', 'Plaza de La Pintana', 'Bosque Santiago'],
    llegada: 'Llegamos a La Pintana por Santa Rosa hasta El Castillo apenas agendas.',
    ...keys('la-pintana'),
  },
  'puente-alto': {
    sectores: ['Puente Alto Centro', 'Bajos de Mena', 'Las Vizcachas', 'El Peñón', 'San Gerónimo'],
    hitos: ['Metro Plaza de Puente Alto', 'Mall Plaza Tobalaba', 'Av. Concha y Toro', 'Puente sobre el Maipo'],
    llegada: 'Recorremos Puente Alto desde la Plaza hasta Bajos de Mena el mismo día.',
    ...keys('puente-alto'),
  },

  // ─────────────────────────── Sector Sur ──────────────────────────────
  'san-miguel': {
    sectores: ['Gran Avenida', 'El Llano', 'Ciudad del Niño', 'San Miguel Centro'],
    hitos: ['Metro El Llano', 'Metro San Miguel', 'Gran Avenida', 'Parque El Llano'],
    llegada: 'Llegamos a San Miguel por Gran Avenida el mismo día que coordinamos.',
    ...keys('san-miguel'),
  },
  'la-cisterna': {
    sectores: ['El Parrón', 'La Cisterna Centro', 'José Miguel Carrera'],
    hitos: ['Intermodal La Cisterna', 'Metro La Cisterna', 'Gran Avenida', 'Av. Américo Vespucio'],
    llegada: 'Vamos a La Cisterna por Gran Avenida y Vespucio apenas agendas.',
    ...keys('la-cisterna'),
  },
  'el-bosque': {
    sectores: ['El Bosque Centro', 'San Leonardo', 'Santa Marta', 'Gran Avenida Sur'],
    hitos: ['Gran Avenida', 'Base Aérea El Bosque', 'Av. José Miguel Carrera', 'Plaza de El Bosque'],
    llegada: 'Llegamos a El Bosque por Gran Avenida hacia el sur el mismo día.',
    ...keys('el-bosque'),
  },
  'pedro-aguirre-cerda': {
    sectores: ['La Victoria', 'Santa Adriana', 'Dávila', 'Lo Valledor'],
    hitos: ['Lo Valledor', 'Metro Cerrillos', 'Av. Departamental', 'Club Hípico'],
    llegada: 'Vamos a Pedro Aguirre Cerda por Departamental hasta Lo Valledor apenas agendas.',
    ...keys('pedro-aguirre-cerda'),
  },
  'lo-espejo': {
    sectores: ['José María Caro', 'La Feria', 'Santa Adriana', 'Clara Estrella'],
    hitos: ['Población José María Caro', 'Av. Central', 'Av. Américo Vespucio', 'Ruta 5 Sur'],
    llegada: 'Llegamos a Lo Espejo por Vespucio y Av. Central el mismo día.',
    ...keys('lo-espejo'),
  },
  'san-bernardo': {
    sectores: ['San Bernardo Centro', 'Nos', 'El Manzano', 'Lo Herrera'],
    hitos: ['Plaza de San Bernardo', 'Metrotren Nos', 'Mall Plaza Sur', 'Av. Colón'],
    llegada: 'Recorremos San Bernardo desde la Plaza hasta Nos apenas coordinamos.',
    ...keys('san-bernardo'),
  },
  buin: {
    sectores: ['Buin Centro', 'Alto Jahuel', 'Linderos', 'Maipo'],
    hitos: ['Buin Zoo', 'Plaza de Buin', 'Estación Buin (Metrotren)', 'Ruta 5 Sur'],
    llegada: 'Bajamos a Buin y Alto Jahuel por la Ruta 5 Sur el mismo día que agendas.',
    ...keys('buin'),
  },

  // ─────────────────────────── Sector Poniente ─────────────────────────
  maipu: {
    sectores: ['Maipú Centro', 'Ciudad Satélite', 'Rinconada de Maipú', 'El Abrazo', 'Los Héroes', 'Sol Poniente', 'Pehuén', 'Longitudinal', 'Tres Poniente', 'Santiago Bueras'],
    hitos: ['Plaza de Maipú', 'Templo Votivo', 'Metro Plaza de Maipú', 'Mall Arauco Maipú', 'Hospital El Carmen'],
    llegada: 'Salimos hacia Maipú el mismo día que agendas.',
    ...keys('maipu'),
  },
  pudahuel: {
    sectores: ['Pudahuel Sur', 'Ciudad de los Valles', 'Barrancas', 'Lo Boza', 'Enea'],
    hitos: ['Aeropuerto Arturo Merino Benítez', 'Metro Pudahuel', 'Costanera Norte', 'Enea'],
    llegada: 'Llegamos a Pudahuel por la Costanera Norte hasta Ciudad de los Valles el mismo día.',
    ...keys('pudahuel'),
  },
  cerrillos: {
    sectores: ['Cerrillos Centro', 'Maestranza', 'Los Cerrillos', 'Pedro Aguirre Cerda poniente'],
    hitos: ['Parque Bicentenario Cerrillos', 'Metro Cerrillos', 'Ex Aeropuerto Cerrillos', 'Mall Plaza Alameda'],
    llegada: 'Vamos a Cerrillos por Pedro Aguirre Cerda apenas coordinamos la hora.',
    ...keys('cerrillos'),
  },
  'lo-prado': {
    sectores: ['Lo Prado Centro', 'San Daniel', 'San Pablo', 'Vespucio'],
    hitos: ['Metro Lo Prado', 'Metro San Pablo', 'Av. San Pablo', 'Túnel Lo Prado'],
    llegada: 'Llegamos a Lo Prado por San Pablo y Vespucio el mismo día que agendas.',
    ...keys('lo-prado'),
  },
  renca: {
    sectores: ['Huamachuco', 'Lo Velásquez', 'Bulnes', 'Cerro Renca'],
    hitos: ['Parque Cerro Renca', 'Av. Américo Vespucio', 'Autopista Central', 'Ribera del Mapocho'],
    llegada: 'Vamos a Renca por Vespucio y la Autopista Central apenas agendas.',
    ...keys('renca'),
  },
  quilicura: {
    sectores: ['Quilicura Centro', 'Valle Lo Campino', 'Lo Cruzat', 'San Ignacio', 'Ciudad Empresarial'],
    hitos: ['Autopista Vespucio Norte', 'Ciudad Empresarial', 'Av. Manuel Antonio Matta', 'Parque Industrial'],
    llegada: 'Llegamos a Quilicura por Vespucio Norte hasta Lo Campino el mismo día.',
    ...keys('quilicura'),
  },
  lampa: {
    sectores: ['Lampa Centro', 'Batuco', 'Valle Grande', 'Larapinta', 'Chicauma'],
    hitos: ['Laguna de Batuco', 'Valle Grande', 'Autopista Los Libertadores', 'Larapinta'],
    llegada: 'Salimos a Lampa y Valle Grande por Los Libertadores el mismo día que agendas.',
    ...keys('lampa'),
  },

  // ─────────────────────────── Sector Norte ────────────────────────────
  huechuraba: {
    sectores: ['Ciudad Empresarial', 'La Pincoya', 'El Barrero', 'Recreo'],
    hitos: ['Ciudad Empresarial', 'Mall Plaza Norte', 'Autopista Vespucio Norte', 'Cerro San Cristóbal (ladera norte)'],
    llegada: 'Llegamos a Huechuraba por Vespucio Norte hasta Ciudad Empresarial el mismo día.',
    ...keys('huechuraba'),
  },
  colina: {
    sectores: ['Colina Centro', 'Chicureo', 'Piedra Roja', 'Las Canteras', 'Esmeralda'],
    hitos: ['Chicureo', 'Piedra Roja', 'Autopista Los Libertadores', 'Hacienda Chicureo'],
    llegada: 'Subimos a Colina y Chicureo por Los Libertadores el mismo día que agendas.',
    ...keys('colina'),
  },
  'til-til': {
    sectores: ['Til Til Centro', 'Montenegro', 'Rungue', 'Polpaico', 'Huechún'],
    hitos: ['Estación Til Til', 'Polpaico', 'Ruta 5 Norte', 'Montenegro'],
    llegada: 'Vamos a Til Til y Polpaico por la Ruta 5 Norte coordinando la hora contigo.',
    ...keys('til-til'),
  },
}

export function getZonaPlus(slug: string): ZonaPlus | null {
  return ZONAS_PLUS[slug] ?? null
}
