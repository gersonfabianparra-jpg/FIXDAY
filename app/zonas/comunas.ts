export interface Comuna {
  slug: string
  name: string
  sector: string
  nearby: string[]
}

export const COMUNAS: Comuna[] = [
  // Centro
  { slug: 'santiago',         name: 'Santiago',           sector: 'Sector Centro',       nearby: ['Independencia','Recoleta','Quinta Normal','Estación Central'] },
  { slug: 'independencia',    name: 'Independencia',       sector: 'Sector Centro',       nearby: ['Santiago','Recoleta','Conchalí','Quilicura'] },
  { slug: 'recoleta',         name: 'Recoleta',            sector: 'Sector Centro',       nearby: ['Independencia','Santiago','Conchalí','Huechuraba'] },
  { slug: 'conchali',         name: 'Conchalí',            sector: 'Sector Centro',       nearby: ['Independencia','Recoleta','Renca','Huechuraba'] },
  { slug: 'cerro-navia',      name: 'Cerro Navia',         sector: 'Sector Centro',       nearby: ['Quinta Normal','Lo Prado','Pudahuel','Renca'] },
  { slug: 'quinta-normal',    name: 'Quinta Normal',       sector: 'Sector Centro',       nearby: ['Santiago','Cerro Navia','Lo Prado','Estación Central'] },
  { slug: 'estacion-central', name: 'Estación Central',    sector: 'Sector Centro',       nearby: ['Santiago','Quinta Normal','Cerrillos','Maipú'] },
  // Oriente
  { slug: 'providencia',      name: 'Providencia',         sector: 'Sector Oriente',      nearby: ['Las Condes','Ñuñoa','Santiago','La Reina'] },
  { slug: 'las-condes',       name: 'Las Condes',          sector: 'Sector Oriente',      nearby: ['Providencia','Vitacura','Lo Barnechea','La Reina'] },
  { slug: 'vitacura',         name: 'Vitacura',            sector: 'Sector Oriente',      nearby: ['Las Condes','Lo Barnechea','Providencia'] },
  { slug: 'lo-barnechea',     name: 'Lo Barnechea',        sector: 'Sector Oriente',      nearby: ['Vitacura','Las Condes','Colina'] },
  { slug: 'nunoa',            name: 'Ñuñoa',               sector: 'Sector Oriente',      nearby: ['Providencia','La Reina','Macul','San Joaquín'] },
  { slug: 'la-reina',         name: 'La Reina',            sector: 'Sector Oriente',      nearby: ['Las Condes','Ñuñoa','Peñalolén','Macul'] },
  { slug: 'penalolen',        name: 'Peñalolén',           sector: 'Sector Oriente',      nearby: ['La Reina','La Florida','Macul','La Pintana'] },
  // Sur-Oriente
  { slug: 'la-florida',       name: 'La Florida',          sector: 'Sector Sur-Oriente',  nearby: ['Peñalolén','Puente Alto','Macul','La Pintana'] },
  { slug: 'macul',            name: 'Macul',               sector: 'Sector Sur-Oriente',  nearby: ['Ñuñoa','La Reina','La Florida','San Joaquín'] },
  { slug: 'san-joaquin',      name: 'San Joaquín',         sector: 'Sector Sur-Oriente',  nearby: ['Macul','Ñuñoa','San Miguel','La Granja'] },
  { slug: 'la-granja',        name: 'La Granja',           sector: 'Sector Sur-Oriente',  nearby: ['San Joaquín','La Florida','San Ramón','La Pintana'] },
  { slug: 'san-ramon',        name: 'San Ramón',           sector: 'Sector Sur-Oriente',  nearby: ['La Granja','La Pintana','El Bosque','La Cisterna'] },
  { slug: 'la-pintana',       name: 'La Pintana',          sector: 'Sector Sur-Oriente',  nearby: ['La Granja','San Ramón','Puente Alto','El Bosque'] },
  { slug: 'puente-alto',      name: 'Puente Alto',         sector: 'Sector Sur-Oriente',  nearby: ['La Florida','La Pintana','San Bernardo'] },
  // Sur
  { slug: 'san-miguel',       name: 'San Miguel',          sector: 'Sector Sur',          nearby: ['La Cisterna','San Joaquín','Pedro Aguirre Cerda','Lo Espejo'] },
  { slug: 'la-cisterna',      name: 'La Cisterna',         sector: 'Sector Sur',          nearby: ['San Miguel','San Ramón','El Bosque','Lo Espejo'] },
  { slug: 'el-bosque',        name: 'El Bosque',           sector: 'Sector Sur',          nearby: ['La Cisterna','San Ramón','Pedro Aguirre Cerda','San Bernardo'] },
  { slug: 'pedro-aguirre-cerda', name: 'Pedro Aguirre Cerda', sector: 'Sector Sur',       nearby: ['San Miguel','Lo Espejo','El Bosque','La Cisterna'] },
  { slug: 'lo-espejo',        name: 'Lo Espejo',           sector: 'Sector Sur',          nearby: ['San Miguel','Pedro Aguirre Cerda','El Bosque','Cerrillos'] },
  { slug: 'san-bernardo',     name: 'San Bernardo',        sector: 'Sector Sur',          nearby: ['El Bosque','La Pintana','Puente Alto','Buin'] },
  { slug: 'buin',             name: 'Buin',                sector: 'Sector Sur',          nearby: ['San Bernardo','Paine'] },
  // Poniente
  { slug: 'maipu',            name: 'Maipú',               sector: 'Sector Poniente',     nearby: ['Pudahuel','Cerrillos','Estación Central','Lo Prado'] },
  { slug: 'pudahuel',         name: 'Pudahuel',            sector: 'Sector Poniente',     nearby: ['Maipú','Cerro Navia','Lo Prado','Quilicura'] },
  { slug: 'cerrillos',        name: 'Cerrillos',           sector: 'Sector Poniente',     nearby: ['Maipú','Lo Espejo','Estación Central','Pudahuel'] },
  { slug: 'lo-prado',         name: 'Lo Prado',            sector: 'Sector Poniente',     nearby: ['Cerro Navia','Quinta Normal','Pudahuel','Maipú'] },
  { slug: 'renca',            name: 'Renca',               sector: 'Sector Poniente',     nearby: ['Quilicura','Conchalí','Pudahuel','Cerro Navia'] },
  { slug: 'quilicura',        name: 'Quilicura',           sector: 'Sector Poniente',     nearby: ['Renca','Conchalí','Huechuraba','Lampa'] },
  { slug: 'lampa',            name: 'Lampa',               sector: 'Sector Norte',        nearby: ['Quilicura','Colina','Tiltil','Huechuraba'] },
  // Norte
  { slug: 'huechuraba',       name: 'Huechuraba',          sector: 'Sector Norte',        nearby: ['Quilicura','Conchalí','Recoleta','Colina'] },
  { slug: 'colina',           name: 'Colina',              sector: 'Sector Norte',        nearby: ['Huechuraba','Lo Barnechea','Lampa','Tiltil'] },
  { slug: 'til-til',          name: 'Til Til',             sector: 'Sector Norte',        nearby: ['Colina','Lampa'] },
]

export function getComunaBySlug(slug: string): Comuna | undefined {
  return COMUNAS.find(c => c.slug === slug)
}
