import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Almacenamiento con respaldo automático.
 *
 * Lo ideal es la tabla `bookings`, pero mientras no se ejecute el SQL de
 * migración no existe. En ese caso todo se guarda en `settings` (que sí
 * existe: es una tabla clave/valor) usando claves con prefijo. El sistema
 * funciona igual, y cuando la tabla dedicada aparezca la empieza a usar sola.
 */

const PREFIJO = 'booking_'
const TABLA_INEXISTENTE = '42P01'

export interface Reserva {
  id: string
  created_at: string
  fecha: string
  bloque: string
  name: string
  phone: string
  email?: string | null
  comuna?: string
  direccion?: string
  servicio?: string
  mensaje?: string
  status: string
  confirmed_at?: string | null
  admin_note?: string
  source?: string
  utm_source?: string | null
  device?: string
}

export type Modo = 'tabla' | 'respaldo'

function esTablaFaltante(error: { code?: string } | null): boolean {
  return error?.code === TABLA_INEXISTENTE
}

/** Indica si la tabla dedicada ya existe. */
export async function modoAlmacenamiento(db: SupabaseClient): Promise<Modo> {
  const { error } = await db.from('bookings').select('id', { head: true, count: 'exact' }).limit(1)
  return esTablaFaltante(error) ? 'respaldo' : 'tabla'
}

export async function listarReservas(db: SupabaseClient): Promise<{ reservas: Reserva[]; modo: Modo }> {
  const { data, error } = await db.from('bookings').select('*').order('fecha', { ascending: true }).limit(500)
  if (!error) return { reservas: (data ?? []) as Reserva[], modo: 'tabla' }
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const { data: filas } = await db.from('settings').select('key, value').like('key', `${PREFIJO}%`)
  const reservas: Reserva[] = []
  for (const f of filas ?? []) {
    try { reservas.push(JSON.parse(f.value) as Reserva) } catch { /* fila corrupta: se ignora */ }
  }
  reservas.sort((a, b) => (a.fecha + a.bloque).localeCompare(b.fecha + b.bloque))
  return { reservas, modo: 'respaldo' }
}

/** Reservas activas de un día y bloque (para controlar los cupos). */
export async function contarEnBloque(db: SupabaseClient, fecha: string, bloque: string): Promise<number> {
  const { count, error } = await db
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('fecha', fecha).eq('bloque', bloque)
    .in('status', ['pendiente', 'confirmada'])
  if (!error) return count ?? 0
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const { reservas } = await listarReservas(db)
  return reservas.filter(r => r.fecha === fecha && r.bloque === bloque && ['pendiente', 'confirmada'].includes(r.status)).length
}

/** Ocupación de todos los días del rango, para pintar el calendario. */
export async function ocupacionEntre(db: SupabaseClient, desde: string, hasta: string):
  Promise<{ ocupacion: Record<string, number>; modo: Modo }> {
  const { data, error } = await db
    .from('bookings').select('fecha, bloque')
    .gte('fecha', desde).lte('fecha', hasta)
    .in('status', ['pendiente', 'confirmada'])

  const acumular = (filas: Array<{ fecha: string; bloque: string }>) => {
    const o: Record<string, number> = {}
    for (const f of filas) o[`${f.fecha}|${f.bloque}`] = (o[`${f.fecha}|${f.bloque}`] ?? 0) + 1
    return o
  }

  if (!error) return { ocupacion: acumular(data ?? []), modo: 'tabla' }
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const { reservas } = await listarReservas(db)
  const activas = reservas.filter(r =>
    r.fecha >= desde && r.fecha <= hasta && ['pendiente', 'confirmada'].includes(r.status))
  return { ocupacion: acumular(activas), modo: 'respaldo' }
}

export async function crearReserva(db: SupabaseClient, datos: Omit<Reserva, 'id' | 'created_at'>):
  Promise<{ id: string; modo: Modo }> {
  const { data, error } = await db.from('bookings').insert(datos).select('id').single()
  if (!error) return { id: data!.id as string, modo: 'tabla' }
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const id = crypto.randomUUID()
  const reserva: Reserva = { ...datos, id, created_at: new Date().toISOString() }
  const { error: err2 } = await db.from('settings').insert({ key: `${PREFIJO}${id}`, value: JSON.stringify(reserva) })
  if (err2) throw new Error(err2.message)
  return { id, modo: 'respaldo' }
}

export async function obtenerReserva(db: SupabaseClient, id: string): Promise<Reserva | null> {
  const { data, error } = await db.from('bookings').select('*').eq('id', id).single()
  if (!error) return data as Reserva
  if (!esTablaFaltante(error)) return null

  const { data: fila } = await db.from('settings').select('value').eq('key', `${PREFIJO}${id}`).single()
  if (!fila) return null
  try { return JSON.parse(fila.value) as Reserva } catch { return null }
}

export async function actualizarReserva(db: SupabaseClient, id: string, patch: Partial<Reserva>): Promise<void> {
  const { error } = await db.from('bookings').update(patch).eq('id', id)
  if (!error) return
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const actual = await obtenerReserva(db, id)
  if (!actual) throw new Error('No se encontró la hora')
  const { error: err2 } = await db.from('settings')
    .update({ value: JSON.stringify({ ...actual, ...patch }) })
    .eq('key', `${PREFIJO}${id}`)
  if (err2) throw new Error(err2.message)
}

/* ────────────────────────────────────────────────────────────────────────────
 * Leads y embudo, con el mismo criterio: si faltan las columnas o la tabla
 * nuevas, se guarda con lo que ya existe en la base.
 * ──────────────────────────────────────────────────────────────────────────── */

const COLUMNA_FALTANTE = new Set(['42703', 'PGRST204'])

function esColumnaFaltante(error: { code?: string } | null): boolean {
  return Boolean(error?.code && COLUMNA_FALTANTE.has(error.code))
}

export interface LeadNuevo {
  name: string
  phone: string
  email?: string | null
  service: string
  message: string
  comuna?: string
  source?: string
  device?: string
  referrer?: string
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}

/** Guarda un lead. Si la tabla aún no tiene las columnas nuevas, conserva los datos en el texto. */
export async function guardarLead(db: SupabaseClient, lead: LeadNuevo): Promise<Modo> {
  const { error } = await db.from('leads').insert({ ...lead, status: 'nuevo' })
  if (!error) return 'tabla'
  if (!esColumnaFaltante(error)) throw new Error(error.message)

  const extra = [
    lead.comuna ? `Comuna: ${lead.comuna}` : '',
    lead.source ? `Origen: ${lead.source}` : '',
    lead.utm_source ? `Campaña: ${lead.utm_source}` : '',
    lead.device ? `Dispositivo: ${lead.device}` : '',
  ].filter(Boolean).join(' · ')

  const { error: err2 } = await db.from('leads').insert({
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? null,
    service: lead.service,
    message: extra ? `${lead.message}\n\n${extra}` : lead.message,
  })
  if (err2) throw new Error(err2.message)
  return 'respaldo'
}

export interface EventoZona {
  comuna: string
  event: string
  section?: string
  device?: string
  referrer?: string
  utm_source?: string | null
  utm_campaign?: string | null
}

/** Registra un evento del embudo; sin la tabla, acumula contadores en settings. */
export async function registrarEvento(db: SupabaseClient, evento: EventoZona): Promise<Modo> {
  const { error } = await db.from('zone_events').insert(evento)
  if (!error) return 'tabla'
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const clave = `zone_stats_${evento.comuna}`
  const { data } = await db.from('settings').select('value').eq('key', clave).single()

  let stats: Record<string, number> = {}
  try { stats = JSON.parse(data?.value ?? '{}') } catch { stats = {} }
  stats[evento.event] = (stats[evento.event] ?? 0) + 1
  if (evento.device) stats[evento.device] = (stats[evento.device] ?? 0) + 1

  await db.from('settings').upsert({ key: clave, value: JSON.stringify(stats) }, { onConflict: 'key' })
  return 'respaldo'
}

/** Totales del embudo de una comuna. */
export async function leerEmbudo(db: SupabaseClient, comuna: string, desde: string):
  Promise<{ embudo: Record<string, number>; origenes: Record<string, number>; modo: Modo }> {
  const { data, error } = await db
    .from('zone_events').select('event, device, utm_source')
    .eq('comuna', comuna).gte('created_at', desde)

  if (!error) {
    const embudo: Record<string, number> = {}
    const origenes: Record<string, number> = {}
    for (const e of data ?? []) {
      embudo[e.event] = (embudo[e.event] ?? 0) + 1
      if (e.device) embudo[e.device] = (embudo[e.device] ?? 0) + 1
      const k = e.utm_source || 'directo / orgánico'
      origenes[k] = (origenes[k] ?? 0) + 1
    }
    return { embudo, origenes, modo: 'tabla' }
  }
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const { data: fila } = await db.from('settings').select('value').eq('key', `zone_stats_${comuna}`).single()
  let embudo: Record<string, number> = {}
  try { embudo = JSON.parse(fila?.value ?? '{}') } catch { embudo = {} }
  return { embudo, origenes: {}, modo: 'respaldo' }
}

/** Leads de una comuna, aunque la columna `comuna` todavía no exista. */
export async function leadsDeComuna(db: SupabaseClient, comuna: string) {
  const { data, error } = await db
    .from('leads').select('*').eq('comuna', comuna)
    .order('created_at', { ascending: false }).limit(300)
  if (!error) return { leads: data ?? [], modo: 'tabla' as Modo }
  if (!esColumnaFaltante(error)) throw new Error(error.message)

  const { data: todos } = await db
    .from('leads').select('*').order('created_at', { ascending: false }).limit(500)
  const patron = comuna.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const coincide = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(patron)
  const leads = (todos ?? []).filter(l => coincide(`${l.service ?? ''} ${l.message ?? ''}`))
  return { leads, modo: 'respaldo' as Modo }
}

/** Elimina una reserva definitivamente. */
export async function eliminarReserva(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from('bookings').delete().eq('id', id)
  if (!error) return
  if (!esTablaFaltante(error)) throw new Error(error.message)

  const { error: err2 } = await db.from('settings').delete().eq('key', `${PREFIJO}${id}`)
  if (err2) throw new Error(err2.message)
}
