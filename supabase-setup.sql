-- Ejecuta este script en el SQL Editor de tu proyecto Supabase
-- https://supabase.com/dashboard → Tu proyecto → SQL Editor

create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  email       text,
  service     text not null,
  message     text
);

-- Índice para ordenar por fecha rápido
create index if not exists leads_created_at_idx on leads (created_at desc);

-- Solo el service role puede leer/escribir (la página pública NO puede leer leads)
alter table leads enable row level security;

create policy "service role full access"
  on leads
  for all
  using (true)
  with check (true);

-- ─────────────────────────────────────────────────────────────
-- Programa de referidos
-- ─────────────────────────────────────────────────────────────
create table if not exists referrals (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  code         text not null unique,      -- código único del link (ej. A7X9K2)
  ref_name     text not null,             -- quién refiere
  ref_phone    text,                      -- para pagarle su beneficio
  expires_at   timestamptz not null,      -- el link caduca en esta fecha
  clicks       integer not null default 0,-- veces que se abrió el link
  redeemed     boolean not null default false, -- lo marca el admin al pagar
  redeemed_at  timestamptz
);

create index if not exists referrals_code_idx on referrals (code);
create index if not exists referrals_created_at_idx on referrals (created_at desc);

alter table referrals enable row level security;

create policy "service role full access referrals"
  on referrals
  for all
  using (true)
  with check (true);
