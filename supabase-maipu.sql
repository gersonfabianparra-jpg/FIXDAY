-- ═══════════════════════════════════════════════════════════════════════════
-- FIXDAY · Captación y remarketing por zona (Maipú)
-- Ejecuta este script en Supabase → SQL Editor → Run
-- Es seguro correrlo más de una vez: no borra ni pisa datos existentes.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Tabla de ajustes (por si aún no existe) ─────────────────────────────
create table if not exists settings (
  key   text primary key,
  value text
);

alter table settings enable row level security;

do $$ begin
  create policy "service role full access settings"
    on settings for all using (true) with check (true);
exception when duplicate_object then null; end $$;


-- ── 2. Enriquecer LEADS para poder segmentar y hacer seguimiento ───────────
-- Hoy la comuna va escrita dentro del texto del servicio, así que no se puede
-- filtrar bien. Estas columnas la vuelven un dato real y consultable.
alter table leads add column if not exists comuna       text;
alter table leads add column if not exists source       text;   -- de qué página vino
alter table leads add column if not exists status       text not null default 'nuevo';
alter table leads add column if not exists utm_source   text;
alter table leads add column if not exists utm_medium   text;
alter table leads add column if not exists utm_campaign text;
alter table leads add column if not exists device       text;   -- movil | escritorio
alter table leads add column if not exists referrer     text;
alter table leads add column if not exists admin_note   text;
alter table leads add column if not exists contacted_at timestamptz;

create index if not exists leads_comuna_idx on leads (comuna);
create index if not exists leads_status_idx on leads (status);

-- Rellena la comuna de los leads antiguos que la traen en el texto del servicio
update leads
   set comuna = 'Maipú'
 where comuna is null
   and (service ilike '%maipú%' or service ilike '%maipu%' or message ilike '%maipú%');


-- ── 3. Eventos de zona: el embudo real de la página ────────────────────────
-- Registra qué pasa antes del contacto (clics, formularios abiertos, cupones
-- copiados). Sin datos personales: sirve para medir, no para identificar.
create table if not exists zone_events (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  comuna       text not null,
  event        text not null,   -- wa_click | form_open | form_skip | lead | cupon_copiado
  section      text,            -- en qué parte de la página ocurrió
  device       text,
  referrer     text,
  utm_source   text,
  utm_campaign text
);

create index if not exists zone_events_comuna_idx     on zone_events (comuna);
create index if not exists zone_events_created_at_idx on zone_events (created_at desc);
create index if not exists zone_events_event_idx      on zone_events (event);

alter table zone_events enable row level security;

do $$ begin
  create policy "service role full access zone_events"
    on zone_events for all using (true) with check (true);
exception when duplicate_object then null; end $$;


-- ── 4. Valores iniciales del panel de Maipú ────────────────────────────────
-- El cupón arranca APAGADO: lo activas tú desde /admin/maipu
insert into settings (key, value) values
  ('zona_cupon_maipu', '{"activo":false,"codigo":"MAIPU5000","monto":"$5.000","titulo":"Descuento exclusivo para vecinos de Maipú","detalle":"Menciona el código al escribirnos y lo descontamos del total del servicio.","vence":""}')
on conflict (key) do nothing;

insert into settings (key, value) values
  ('zona_cupos_maipu', '{"activo":true,"cuposHoy":3}')
on conflict (key) do nothing;


-- ═══════════════════════════════════════════════════════════════════════════
-- 5. AGENDAMIENTO POR CALENDARIO
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists bookings (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  fecha        date not null,             -- día de la visita
  bloque       text not null,             -- franja horaria, ej. '09:00-11:00'
  name         text not null,
  phone        text not null,
  email        text,
  comuna       text,
  direccion    text,
  servicio     text,
  mensaje      text,
  status       text not null default 'pendiente', -- pendiente|confirmada|cancelada|realizada
  confirmed_at timestamptz,
  admin_note   text,
  source       text,
  utm_source   text,
  device       text
);

-- Citas creadas por el administrador (cliente que cerró por WhatsApp)
alter table bookings add column if not exists valor  text;   -- monto acordado, ej. "$45.000"
alter table bookings add column if not exists origen text;   -- 'web' | 'interna'

create index if not exists bookings_fecha_idx   on bookings (fecha);
create index if not exists bookings_status_idx  on bookings (status);
create index if not exists bookings_created_idx on bookings (created_at desc);

alter table bookings enable row level security;

do $$ begin
  create policy "service role full access bookings"
    on bookings for all using (true) with check (true);
exception when duplicate_object then null; end $$;

-- Configuración de la agenda (editable después desde /admin/agenda)
insert into settings (key, value) values
  ('agenda_config', '{"activo":true,"maxPorBloque":2,"diasAnticipacion":21,"diasHabiles":[1,2,3,4,5],"bloques":["09:00-11:00","11:00-13:00","15:00-17:00","17:00-19:00"]}')
on conflict (key) do nothing;
