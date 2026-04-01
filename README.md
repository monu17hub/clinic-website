# Clinic Website (React + Tailwind + Supabase)

This is a simple, clean clinic site with:
- Home page (clinic + doctor info, timings)
- Appointment booking form (writes to Supabase)
- Admin page (lists all appointments)

## 1) Configure Supabase

Create a table by running the SQL in:
- `supabase/migrations/0001_appointments.sql`

It creates `public.appointments` and enables RLS so the public can insert.

## 2) Set environment variables

Create `.env.local` based on `.env.local.example`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- (optional) `VITE_ADMIN_PASSCODE`

## 3) Run locally

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open: `http://localhost:5173`

## Admin security note

The `/admin` page includes a lightweight passcode gate (optional).
For production, implement proper Supabase Auth + RLS so only the doctor role can `select` appointments.

