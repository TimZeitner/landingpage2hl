import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://jnrvcqnhwpqjkomtyzls.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_wLCf0LFNislKKAT9tXlSeA_TOISbkYx";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
