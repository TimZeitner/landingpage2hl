-- Live founding-count for the landing page kicker ("Dec 05, 731/1000 in.").
--
-- Returns ONLY the total number of rows in the waitlist as a single integer.
-- SECURITY DEFINER lets the public/anon key read this ONE number without any
-- read access to the waitlist rows themselves: RLS on the table stays exactly
-- as it is, and no email is ever exposed. It grants execute on the function
-- only, never SELECT on the table.
--
-- Run this yourself in the Supabase SQL editor. It creates nothing else and
-- touches no existing table, column or row.

create or replace function public.waitlist_count()
returns integer
language sql
security definer
stable
set search_path = public
as $$
  select count(*)::int from public.waitlist;
$$;

grant execute on function public.waitlist_count() to anon, authenticated;
