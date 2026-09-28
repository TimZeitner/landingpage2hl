import { supabase } from "../supabase";
import { FOUNDING_START, FOUNDING_GOAL } from "./founding";

/**
 * Reads the live founding count SERVER-SIDE, count only.
 *
 * Shown number = FOUNDING_START + (new signups since go-live), capped at
 * FOUNDING_GOAL. "New signups since go-live" = current total rows minus the
 * baseline captured at go-live.
 *
 * The baseline is the env var WAITLIST_BASELINE_COUNT (the row count at the
 * moment of merge). If it is not set, the baseline defaults to the current
 * total, so the kicker simply shows FOUNDING_START and does not move until the
 * baseline is configured. This is the safe default: it can never show a number
 * inflated by rows that already existed.
 *
 * Never throws (falls back to FOUNDING_START), never reads any email.
 * Requires the public.waitlist_count() function from migration 0003.
 */
export async function getFoundingCount(): Promise<number> {
  try {
    const { data, error } = await supabase.rpc("waitlist_count");
    const total = typeof data === "number" ? data : Number(data);
    if (error || !Number.isFinite(total)) return FOUNDING_START;

    const baselineEnv = process.env.WAITLIST_BASELINE_COUNT;
    const baseline =
      baselineEnv !== undefined && baselineEnv !== "" && Number.isFinite(Number(baselineEnv))
        ? Number(baselineEnv)
        : total;

    const shown = FOUNDING_START + Math.max(0, total - baseline);
    return Math.min(FOUNDING_GOAL, shown);
  } catch {
    return FOUNDING_START;
  }
}
