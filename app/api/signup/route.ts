import { NextResponse } from "next/server";
import { supabase } from "../../supabase";
import { sendWelcomeEmail, addToAudience } from "../../lib/resend";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://2hoursleft.com";

export async function POST(request: Request) {
  let body: {
    email?: string;
    ref?: string | null;
    utm_source?: string | null;
    utm_campaign?: string | null;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // 1. Waitlist insert (the source of truth). Must succeed.
  const { data, error } = await supabase.rpc("join_waitlist", {
    p_email: email,
    p_ref: body.ref ?? null,
    p_utm_source: body.utm_source ?? null,
    p_utm_campaign: body.utm_campaign ?? null,
  });

  const row = Array.isArray(data) ? data[0] : data;

  if (error || !row) {
    console.error("[signup] join_waitlist failed:", error);
    return NextResponse.json({ error: "signup_failed" }, { status: 500 });
  }

  // 2. Side effects (email + audience). These must NEVER block or fail the
  // signup - the helpers swallow and log their own errors, and we ignore the
  // result here. Only fire for brand-new signups, not repeat submissions.
  if (!row.already_joined) {
    const referralLink = `${SITE_URL}/?ref=${row.referral_code}`;
    await Promise.allSettled([
      sendWelcomeEmail(email, referralLink),
      addToAudience(email),
    ]);
  }

  // 3. Return the referral data the success screen needs.
  return NextResponse.json({
    referral_code: row.referral_code,
    referral_count: row.referral_count ?? 0,
    already_joined: row.already_joined ?? false,
  });
}
