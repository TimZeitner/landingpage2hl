import { Resend } from "resend";
import { renderWelcomeEmail } from "../email/welcome-template";

// Who the welcome email comes from. The domain (2hoursleft.com) must be
// verified in Resend for this to deliver. tim@ does not need a real mailbox -
// replies are routed to REPLY_TO (info@), which does.
const FROM = "Tim from 2HL <tim@2hoursleft.com>";
const REPLY_TO = "info@2hoursleft.com";

const apiKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;

// Test mode: while WELCOME_EMAIL_TEST_TO is set (e.g. to your own address), the
// welcome email is sent ONLY to that address - every other new signup still
// works but gets no email. Delete the env var to go live for everyone.
const testOnlyAddress = process.env.WELCOME_EMAIL_TEST_TO?.trim().toLowerCase();

// Only construct a client if the key is configured, so local/dev without a key
// simply skips email instead of crashing.
const resend = apiKey ? new Resend(apiKey) : null;

/**
 * Sends the welcome email. Never throws - returns true on success, false on any
 * failure (which is logged). Callers must not let this block the signup.
 */
export async function sendWelcomeEmail(to: string, referralLink: string): Promise<boolean> {
  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set - skipping welcome email");
    return false;
  }

  if (testOnlyAddress && to.toLowerCase() !== testOnlyAddress) {
    console.log(`[resend] test mode (WELCOME_EMAIL_TEST_TO) - skipping welcome email to ${to}`);
    return false;
  }

  try {
    const { subject, html, text } = renderWelcomeEmail(referralLink);
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      replyTo: REPLY_TO,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[resend] welcome email failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[resend] welcome email threw:", err);
    return false;
  }
}

/**
 * Adds the signup to a Resend Audience for later broadcasts. Never throws;
 * returns true on success, false otherwise (logged). Skipped if no audience id.
 */
export async function addToAudience(email: string): Promise<boolean> {
  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set - skipping audience add");
    return false;
  }
  if (!audienceId) {
    console.warn("[resend] RESEND_AUDIENCE_ID not set - skipping audience add");
    return false;
  }

  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
    if (error) {
      console.error("[resend] audience add failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[resend] audience add threw:", err);
    return false;
  }
}
