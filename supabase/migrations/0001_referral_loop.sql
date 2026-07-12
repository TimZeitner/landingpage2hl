-- 2HL waitlist: referral loop
-- Run this in the Supabase SQL editor (or via the Supabase CLI).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE throughout.

-- 1. New columns -------------------------------------------------------------
alter table public.waitlist
  add column if not exists referral_code   text,
  add column if not exists referred_by     text,
  add column if not exists referral_count  integer not null default 0;

-- Unique referral codes (partial: allows existing NULLs before backfill).
create unique index if not exists waitlist_referral_code_key
  on public.waitlist (referral_code)
  where referral_code is not null;

-- Fast lookups when crediting a referrer.
create index if not exists waitlist_referred_by_idx
  on public.waitlist (referred_by);

-- 2. Referral-code generator -------------------------------------------------
create or replace function public.generate_referral_code()
returns text
language plpgsql
as $$
declare
  code text;
begin
  loop
    -- 8-char uppercase hex, e.g. "A1B2C3D4".
    -- Uses core md5/random so it needs no extension (pgcrypto's
    -- gen_random_bytes is not on the default search_path in Supabase).
    code := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
    exit when not exists (select 1 from public.waitlist where referral_code = code);
  end loop;
  return code;
end;
$$;

-- Backfill codes for any rows that pre-date this migration.
update public.waitlist
set referral_code = public.generate_referral_code()
where referral_code is null;

-- 3. Signup RPC --------------------------------------------------------------
-- Handles everything atomically so the anon client never needs UPDATE rights:
--   * generates a unique referral_code for the new signup
--   * records referred_by from the ?ref code (only if that code exists)
--   * increments the referrer's referral_count
--   * ignores self-referrals and duplicate emails (no double counting)
-- Returns one row: (referral_code, referral_count, already_joined).
create or replace function public.join_waitlist(p_email text, p_ref text default null)
returns table (referral_code text, referral_count integer, already_joined boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email    text := lower(trim(p_email));
  v_ref      text := nullif(trim(p_ref), '');
  v_existing public.waitlist%rowtype;
  v_referrer public.waitlist%rowtype;
  v_code     text;
begin
  if v_email is null or v_email = '' or position('@' in v_email) = 0 then
    raise exception 'invalid_email';
  end if;

  -- Duplicate email: return the existing row, do NOT re-credit any referrer.
  select * into v_existing from public.waitlist where email = v_email;
  if found then
    return query select v_existing.referral_code, v_existing.referral_count, true;
    return;
  end if;

  -- Resolve the referrer. Ignore unknown codes and self-referrals.
  if v_ref is not null then
    select * into v_referrer from public.waitlist where referral_code = v_ref;
    if not found or v_referrer.email = v_email then
      v_ref := null;
    end if;
  end if;

  v_code := public.generate_referral_code();

  insert into public.waitlist (email, referral_code, referred_by, referral_count)
  values (v_email, v_code, v_ref, 0);

  if v_ref is not null then
    update public.waitlist
    set referral_count = referral_count + 1
    where referral_code = v_ref;
  end if;

  return query select v_code, 0, false;
end;
$$;

-- The public landing page uses the anon key, so allow it to call the RPC.
grant execute on function public.join_waitlist(text, text) to anon, authenticated;
