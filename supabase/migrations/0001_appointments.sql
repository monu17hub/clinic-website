-- Create appointments table for the clinic booking portal
-- Run this in Supabase SQL editor (or via supabase migrations CLI).

create extension if not exists pgcrypto;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  phone text not null,
  appointment_date date not null,
  appointment_time text not null,
  created_at timestamptz not null default now()
);

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

-- Enable RLS so the public can insert, and admin can view.
-- NOTE: This portal is currently implemented with a lightweight admin gate in the UI.
-- For stronger security, lock down SELECT with authenticated roles + RLS policies.
alter table public.appointments enable row level security;

-- Allow the booking form (anon) to insert.
drop policy if exists "appointments_insert_anon" on public.appointments;
create policy "appointments_insert_anon"
  on public.appointments
  for insert
  to anon
  with check (true);

-- Allow anyone to read for demo simplicity.
-- If you want to restrict reads to doctor-only, add Supabase Auth and role-based RLS.
drop policy if exists "appointments_select_anon" on public.appointments;
create policy "appointments_select_anon"
  on public.appointments
  for select
  to anon
  using (true);

