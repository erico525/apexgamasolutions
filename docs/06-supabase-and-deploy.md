# Supabase Contact Form + Vercel Deploy
### Apex Gama Defense Solutions

The website is static. The only dynamic piece is the **contact form**, which
writes each inquiry to a Supabase table. This document has (1) the database
setup, (2) the two values to hand back for the form code, and (3) the Vercel
deploy steps.

---

## 1. Create the table (Supabase → SQL Editor → New query → paste → Run)

```sql
-- Website contact-form submissions
create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null check (char_length(name) between 1 and 200),
  organization text check (char_length(organization) <= 200),
  email        text not null check (char_length(email) between 3 and 320),
  phone        text check (char_length(phone) <= 60),
  topic        text check (char_length(topic) <= 120),
  message      text not null check (char_length(message) between 1 and 5000)
);

-- Lock the table with Row Level Security
alter table public.contact_submissions enable row level security;

-- Allow the public (anon) role to INSERT ONLY.
-- There is no SELECT policy, so the public key cannot read submissions.
create policy "anon can insert contact submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);
```

**Why this is safe:** the site ships the Supabase **anon (public) key** in the
browser — that is what it is designed for. Security comes from RLS: the anon
role can only *insert*. You read submissions in the Supabase **Table Editor**
(the dashboard uses privileged access that bypasses RLS). **Never** put the
`service_role` key in the website.

## 2. Hand back two values (Supabase → Project Settings → API)

1. **Project URL** — e.g. `https://abcd1234.supabase.co`
2. **anon public** key — the long key labeled `anon` / `public`
   (NOT `service_role`)

These go into `assets/js/contact.js`. They are public-safe to commit.

## 3. Optional — email alert on each new lead

Two easy routes (set up later; not required to launch):
- **Supabase → Database → Webhooks:** fire on `INSERT` to `contact_submissions`
  to a webhook (e.g., a Zapier/Make hook or your own endpoint) that emails you.
- **Supabase Edge Function + an email API (e.g., Resend):** trigger on insert
  and send yourself the submission. Ask and I'll write the function.

Until then, new inquiries appear in the Supabase **Table Editor**.

---

## 4. Deploy on Vercel

1. **Vercel → Add New → Project → Import Git Repository** → pick
   `erico525/apexgamasolutions`.
2. **Framework Preset:** *Other*. **Build Command:** leave empty.
   **Output Directory:** leave default (root). Click **Deploy**.
3. **Production branch:** the site currently lives on
   `claude/apex-gama-website-design-65hmtz`. In **Settings → Git**, set the
   Production Branch to that branch (or ask me to merge it into `main` for a
   cleaner setup and use `main`).
4. **Custom domain:** **Settings → Domains → Add** `www.apexgamasolutions.com`
   and `apexgamasolutions.com`. Vercel shows the exact DNS records to add at
   your registrar (typically an `A` record on the apex → `76.76.21.21` and a
   `CNAME` on `www` → `cname.vercel-dns.com`). Set `www` as primary; the apex
   redirects to it. HTTPS is automatic.

*(The repo's `CNAME` and `.nojekyll` files are for GitHub Pages and are simply
ignored by Vercel — harmless. Remove them if you settle on Vercel for good.)*

## 5. Verify after deploy

- `https://www.apexgamasolutions.com` loads; apex redirects to `www`.
- Submit the contact form → a row appears in Supabase → Table Editor →
  `contact_submissions`.
- Company page shows the founder photo; capability statement opens and prints.
