/**
 * Utilidades de la agenda. Todo se calcula en hora de Chile:
 * el servidor de Vercel corre en UTC y, sin esto, "hoy" y los bloques
 * disponibles se correrían varias horas.
 */

export const TZ = 'America/Santiago'

export interface AgendaConfig {
  activo: boolean
  maxPorBloque: number
  diasAnticipacion: number
  diasHabiles: number[]   // 0 domingo … 6 sábado
  bloques: string[]       // '09:00-11:00'
}

export const AGENDA_DEFAULT: AgendaConfig = {
  activo: true,
  maxPorBloque: 2,
  diasAnticipacion: 21,
  diasHabiles: [1, 2, 3, 4, 5],
  bloques: ['09:00-11:00', '11:00-13:00', '15:00-17:00', '17:00-19:00'],
}

/** Fecha y hora actuales en Chile. */
export function ahoraEnChile(): { fecha: string; minutos: number } {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })
  const p = Object.fromEntries(f.formatToParts(new Date()).map(x => [x.type, x.value]))
  const hora = p.hour === '24' ? '00' : p.hour
  return {
    fecha: `${p.year}-${p.month}-${p.day}`,
    minutos: parseInt(hora, 10) * 60 + parseInt(p.minute, 10),
  }
}

/** Día de la semana (0-6) de una fecha 'YYYY-MM-DD', sin desfase de zona horaria. */
export function diaSemana(fecha: string): number {
  const [y, m, d] = fecha.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export function sumarDias(fecha: string, dias: number): string {
  const [y, m, d] = fecha.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d))
  t.setUTCDate(t.getUTCDate() + dias)
  return t.toISOString().slice(0, 10)
}

export function minutosDeBloque(bloque: string): number {
  const [hh, mm] = bloque.split('-')[0].split(':').map(Number)
  return hh * 60 + mm
}

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export function nombreDia(fecha: string): string { return DIAS[diaSemana(fecha)] }

export function formatoLargo(fecha: string): string {
  const [y, m, d] = fecha.split('-').map(Number)
  return `${DIAS[diaSemana(fecha)]} ${d} de ${MESES[m - 1]} de ${y}`
}

export function numeroDia(fecha: string): number { return Number(fecha.split('-')[2]) }
export function mesCorto(fecha: string): string { return MESES[Number(fecha.split('-')[1]) - 1].slice(0, 3) }

/** Margen mínimo para agendar el mismo día (2 horas). */
export const MARGEN_MINUTOS = 120

/** Datos mínimos de una cita para armar el mensaje al cliente. */
export interface CitaMensaje {
  id: string
  name: string
  fecha: string
  bloque: string
  comuna?: string
  direccion?: string
  servicio?: string
  valor?: string
}

/**
 * Mensaje de WhatsApp con la cita completa.
 * Lo usan el panel y el servidor, para que el cliente reciba siempre lo mismo.
 */
export function mensajeCita(c: CitaMensaje): string {
  const lugar = [c.direccion, c.comuna].filter(Boolean).join(', ')
  return `¡Hola ${c.name.split(' ')[0]}! 👋 Te confirmo tu visita técnica de FIXDAY:\n\n` +
    `📅 ${formatoLargo(c.fecha)}\n` +
    `🕐 Entre ${c.bloque.replace('-', ' y ')}\n` +
    (lugar ? `📍 ${lugar}\n` : '') +
    (c.servicio ? `🔧 ${c.servicio}\n` : '') +
    (c.valor ? `💵 Valor acordado: ${c.valor}\n` : '') +
    `\nAcá puedes ver tu cita y agregarla a tu calendario:\nhttps://fixday.cl/cita/${c.id}\n\n` +
    `Cualquier cambio me avisas por acá. ¡Nos vemos!`
}

/** Normaliza un teléfono chileno al formato que espera wa.me. */
export function numeroWhatsApp(phone: string): string {
  const d = phone.replace(/\D/g, '').replace(/^0+/, '')
  return d.startsWith('56') ? d : `56${d}`
}

export function linkWhatsApp(phone: string, texto: string): string {
  return `https://wa.me/${numeroWhatsApp(phone)}?text=${encodeURIComponent(texto)}`
}
