-- 2HL waitlist: UTM attribution
-- Run this AFTER 0001_referral_loop.sql.
-- Adds utm_source / utm_campaign and extends join_waitlist to store them.

-- 1. New columns -------------------------------------------------------------
alter table public.waitlist
  add column if not exists utm_source   text,
  add column if not exists utm_campaign text;

-- 2. Replace join_waitlist with a UTM-aware version --------------------------
-- Drop the 2-arg version from 0001 so there is a single, unambiguous function.
drop function if exists public.join_waitlist(text, text);

create or replace function public.join_waitlist(
  p_email        text,
  p_ref          text default null,
  p_utm_source   text default null,
  p_utm_campaign text default null
)
returns table (referral_code text, referral_count integer, already_joined boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email    text := lower(trim(p_email));
  v_ref      text := nullif(trim(p_ref), '');
  v_source   text := nullif(trim(p_utm_source), '');
  v_campaign text := nullif(trim(p_utm_campaign), '');
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

  insert into public.waitlist (
    email, referral_code, referred_by, referral_count, utm_source, utm_campaign
  )
  values (v_email, v_code, v_ref, 0, v_source, v_campaign);

  if v_ref is not null then
    update public.waitlist
    set referral_count = referral_count + 1
    where referral_code = v_ref;
  end if;

  return query select v_code, 0, false;
end;
$$;

grant execute on function public.join_waitlist(text, text, text, text) to anon, authenticated;
