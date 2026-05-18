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
