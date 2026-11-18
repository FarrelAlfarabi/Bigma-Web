-- Bigma website "Form Kebutuhan": storage + insert-only public function.
-- Run once in the Supabase SQL editor (or via the MCP). Nothing here is a secret.
-- Table lives in its own schema that the API does not expose. The public (anon) can only call
-- the function below, never read or write the table directly.
create schema if not exists bigma_site;
revoke all on schema bigma_site from anon, authenticated;

create table if not exists bigma_site.kebutuhan_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  nama          text not null check (char_length(nama) between 1 and 120),
  whatsapp      text not null check (char_length(whatsapp) between 8 and 20),
  usaha         text check (char_length(usaha) <= 160),
  bidang        text,
  masalah       text[] not null default '{}',
  tujuan        text[] not null default '{}',
  ide           text[] not null default '{}',
  pengguna      text,
  perangkat     text,
  waktu         text,
  dana          text,
  catatan       text check (char_length(catatan) <= 1000),
  saran         text[] not null default '{}',
  sumber        text,
  persetujuan   boolean not null default true,
  status        text not null default 'baru'
);
alter table bigma_site.kebutuhan_submissions enable row level security;
revoke all on bigma_site.kebutuhan_submissions from anon, authenticated;
-- No policies on purpose: only the project owner (dashboard / service role) can read.

create or replace function public.submit_kebutuhan(payload jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  wa text := regexp_replace(coalesce(payload->>'whatsapp',''), '[^0-9+]', '', 'g');
  nm text := left(btrim(coalesce(payload->>'nama','')), 120);
  arr_masalah text[]; arr_tujuan text[]; arr_ide text[]; arr_saran text[];
begin
  -- honeypot: bots fill the hidden field; pretend success, store nothing
  if coalesce(payload->>'website','') <> '' then return true; end if;
  if payload->>'persetujuan' is distinct from 'true' then raise exception 'consent required'; end if;
  if nm = '' or char_length(wa) < 8 or char_length(wa) > 20 then raise exception 'invalid contact'; end if;
  -- rate limit: 40 submissions per hour overall, and 3 per hour per WhatsApp number
  if (select count(*) from bigma_site.kebutuhan_submissions where created_at > now() - interval '1 hour') >= 40 then
    raise exception 'rate limited';
  end if;
  if (select count(*) from bigma_site.kebutuhan_submissions where whatsapp = wa and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'rate limited';
  end if;

  select coalesce(array_agg(left(x,120)), '{}') into arr_masalah from jsonb_array_elements_text(coalesce(payload->'masalah','[]'::jsonb)) x;
  select coalesce(array_agg(left(x,120)), '{}') into arr_tujuan  from jsonb_array_elements_text(coalesce(payload->'tujuan','[]'::jsonb)) x;
  select coalesce(array_agg(left(x,160)), '{}') into arr_ide     from jsonb_array_elements_text(coalesce(payload->'ide','[]'::jsonb)) x;
  select coalesce(array_agg(left(x,120)), '{}') into arr_saran   from jsonb_array_elements_text(coalesce(payload->'saran','[]'::jsonb)) x;

  insert into bigma_site.kebutuhan_submissions
    (nama, whatsapp, usaha, bidang, masalah, tujuan, ide, pengguna, perangkat, waktu, dana, catatan, saran, sumber)
  values
    (nm, wa, left(payload->>'usaha',160), left(payload->>'bidang',120), arr_masalah, arr_tujuan, arr_ide,
     left(payload->>'pengguna',120), left(payload->>'perangkat',120), left(payload->>'waktu',120),
     left(payload->>'dana',120), left(payload->>'catatan',1000), arr_saran, left(payload->>'sumber',40));
  return true;
end $$;

revoke all on function public.submit_kebutuhan(jsonb) from public;
grant execute on function public.submit_kebutuhan(jsonb) to anon;
