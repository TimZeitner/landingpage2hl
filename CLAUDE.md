# CLAUDE.md — 2HL

Read this fully before writing code. It contains hard rules that override any instruction to "just get it working."

---

## 🚨 HARD RULES — never break these

1. **The production branch is `codex/new-design`, not `main`.** `2hoursleft.com` is served from `codex/new-design`. Never push to or merge into `codex/new-design` (or `main`) without being told. Feature work happens on its own branch (e.g. `new-landing`) and ships only as a Vercel preview until the owner merges it themselves.
2. **Do not change the production Supabase schema.** No migrations run from here, no deletes, no updates to existing rows. Never read out or export the existing waitlist emails. Schema changes are written as **migration files** in `/supabase/migrations` only; the owner runs them.
3. **No email may reach a real person.** Sending is behind `EMAILS_ENABLED` and is currently off (see "Email"). This is not something to "temporarily enable for testing."
4. **Never commit `.env*` files or any key.** Check `.gitignore` first. Never put a secret in a `NEXT_PUBLIC_*` var.
5. If a task is ambiguous, **ask before building.** Don't guess, don't scaffold extras "in case."

---

## What this is

2HL is a social sidequest app. One sidequest a day: you do it, post up to 3 photos, and that unlocks your friends' posts. After posting you hand a friend their sidequest for tomorrow. Completed quests save to your profile.

**The app opens on 5 December 2026.** This repo is the pre-launch landing page at `2hoursleft.com`. It collects emails into the existing `waitlist` table for a capped group of **1,000** people: **"The Day Ones"** (the first 1,000).

### What Day Ones get (as promised on the page)
- In the app **two weeks before everyone else**.
- A **permanent Day One number** on their profile.
- **Day One rank**: anything we ever charge for, they get free for life.
- Ten Day Ones get one of **ten shirts that aren't for sale**.

There is **no** daily sidequest email, **no** group chat, and **no** "+25 places per referral" mechanic. If older notes mention those, they are wrong.

---

## ✍️ Copy rules

The landing copy is final and comes from the design file. Where any note here disagrees with the shipped page, **the page wins.**

- **"sidequest" is always one word.** Never "side quest" or "side-quest".
- **No dashes as punctuation in customer-facing copy** (no em or en dashes).
- First person, direct. No filler, no fake positivity.
- The product has **no timer**. Any reference to "two hours" is legacy 2HL branding, not a product feature.

---

## Stack

- Next.js (App Router) on Vercel.
- Supabase (Postgres), the existing production project. Public anon key only in the client; RLS is on and the tables are not publicly readable.
- Inter, self-hosted via `next/font` (no requests to `fonts.googleapis.com`).
- Resend is wired for a welcome email but is **switched off** (see below).

### Env vars (names only — never commit values)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
RESEND_API_KEY            # unused while EMAILS_ENABLED is off
RESEND_AUDIENCE_ID        # unused while EMAILS_ENABLED is off
EMAILS_ENABLED            # kill switch; not set = off. Nothing sends unless it is exactly "true"
WAITLIST_BASELINE_COUNT   # row count captured at go-live, for the founding-count kicker
```

---

## 🔒 Email — currently OFF

The signup route (`app/api/signup/route.ts`) can send a welcome email and add the contact to a Resend Audience via `app/lib/resend.ts` (`sendWelcomeEmail`, `addToAudience`). Both run **only if `process.env.EMAILS_ENABLED === "true"`**. That var is set nowhere, so **nothing is sent and no one is added to Resend, from any form.** Signups still save to the `waitlist` table as normal.

Do not add any other code path that calls `resend.emails.send` or `resend.contacts.*` outside this gate.

---

## Database

- **`waitlist`** (existing, do not alter): holds signups. Written to via the `join_waitlist` Postgres RPC (generates a unique `referral_code`, records `referred_by`/`utm_source`/`utm_campaign`, ignores duplicate emails). RLS is on; the anon key cannot read rows.
- **`public.waitlist_count()`** (migration `0003_waitlist_count.sql`): a `security definer` function that returns only the integer row count, so the landing page can show a live number without opening read access to the table or exposing any email.

Migrations live in `/supabase/migrations`. They are files only; the owner runs them.

---

## Landing page

- Route `/` → `app/page.tsx` (server component, reads the count) → `app/Landing.tsx` (client: the ported markup + the width fitter, countdown, quest rotation, shirt carousel, and scroll reveal). Styles in `app/landing.css`, scoped under `.lp`. Legal pages keep `app/globals.css`; each stylesheet loads only on its own routes.
- Images live in `/public/landing/` as real files (not base64), lazy-loaded below the hero.
- The kicker count = `FOUNDING_START` (`app/lib/founding.ts`, currently 731) + new signups since go-live, capped at `FOUNDING_GOAL` (1000). "Since go-live" = current total minus `WAITLIST_BASELINE_COUNT`. Change the starting number in one place: `app/lib/founding.ts`.
- Footer links point at the existing `/privacy`, `/terms`, `/legal` pages. Don't write legal text here.

---

## Rollback

Production is untouched: it is served from `codex/new-design`, and no feature branch merges into it without the owner. To discard this work, delete the feature branch; nothing in the production Supabase project was changed.
