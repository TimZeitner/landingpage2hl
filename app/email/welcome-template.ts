import { welcomeContent } from "./welcome-content";

/**
 * Renders the welcome email from the editable copy in welcome-content.ts, the
 * recipient's personal referral link, and their unsubscribe URL. Returns the
 * subject plus HTML and plain-text bodies. No sending here - see app/lib/resend.ts.
 *
 * Table-based layout + inline CSS for Gmail / Apple Mail / Outlook.
 */

// Palette. Entire email background is pure black to match the image blacks.
const BLACK = "#000000";
const ACCENT = "#D9A431";
const WHITE = "#ffffff";
const GREY = "#8a8a8a";
const NEAR_WHITE = "#fffdf7"; // referral line on the accent block
const DARK_YELLOW = "#4a3a0c"; // personal link on the accent block

// Poppins with an email-safe fallback stack.
const FONT = "'Poppins',Helvetica,Arial,sans-serif";

// Assets are served from the public site.
const IMAGE_BASE = "https://2hoursleft.com/email";
const SITE_URL = "https://2hoursleft.com";

// Social profiles (handles from the codebase footer).
const INSTAGRAM_URL = "https://www.instagram.com/2hleft";
const TIKTOK_URL = "https://www.tiktok.com/@2hleft0";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Splits `text` around `accent` and wraps the accent part in a coloured (and
// optionally linked) span.
function withAccent(text: string, accent: string, href?: string): string {
  const idx = text.indexOf(accent);
  if (idx === -1) return escapeHtml(text);
  const before = escapeHtml(text.slice(0, idx));
  const after = escapeHtml(text.slice(idx + accent.length));
  const mid = escapeHtml(accent);
  const inner = href
    ? `<a href="${escapeHtml(href)}" style="color:${ACCENT};text-decoration:none;font-weight:600;">${mid}</a>`
    : `<span style="color:${ACCENT};">${mid}</span>`;
  return `${before}${inner}${after}`;
}

export function renderWelcomeEmail(
  referralLink: string,
  unsubscribeUrl: string,
): { subject: string; html: string; text: string } {
  const c = welcomeContent;
  const link = escapeHtml(referralLink);
  const unsub = escapeHtml(unsubscribeUrl);

  // WhatsApp share: inject the real link into the message, then URL-encode.
  const waMessage = c.whatsappMessage.replace("[LINK]", referralLink);
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

  const headlineHtml = withAccent(c.intro.headline, c.intro.headlineAccent);
  const captureHtml = withAccent(c.capture.text, c.capture.accent, INSTAGRAM_URL);

  const socialButton = (iconUrl: string, label: string, href: string) =>
    `<a href="${href}" style="display:inline-block;background:#111111;border:1px solid #262626;border-radius:10px;padding:11px 20px;text-decoration:none;margin:0 5px;">
      <img src="${iconUrl}" width="18" height="18" alt="${label}" style="vertical-align:middle;border:0;">
      <span style="font-family:${FONT};font-size:13px;font-weight:600;letter-spacing:0.04em;color:${WHITE};vertical-align:middle;padding-left:8px;">${label}</span>
    </a>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${escapeHtml(c.subject)}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
body { margin:0; padding:0; background:${BLACK}; }
img { border:0; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
</style>
</head>
<body style="margin:0;padding:0;background:${BLACK};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BLACK};">
  <tr>
    <td align="center" style="padding:0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${BLACK};">

        <!-- WORDMARK -->
        <tr>
          <td align="center" style="padding:36px 0 28px;">
            <a href="${SITE_URL}" style="font-family:${FONT};font-size:20px;font-weight:700;letter-spacing:-0.2px;color:${WHITE};text-decoration:none;">${escapeHtml(c.wordmark)}</a>
          </td>
        </tr>

        <!-- INTRO -->
        <tr>
          <td align="center" style="padding:0 24px;">
            <div style="font-family:${FONT};font-size:34px;line-height:1.1;font-weight:700;letter-spacing:-0.5px;color:${WHITE};">${headlineHtml}</div>
            <div style="font-family:${FONT};font-size:14px;line-height:1.6;font-weight:400;color:${GREY};padding:16px 0 0;max-width:440px;margin:0 auto;">${escapeHtml(c.intro.sub)}</div>
            <div style="font-family:${FONT};font-size:16px;line-height:1.5;font-weight:600;color:${WHITE};padding:22px 0 30px;">${escapeHtml(c.intro.lead)}</div>
          </td>
        </tr>

        <!-- QUEST IMAGE (full-bleed, links to Instagram) -->
        <tr>
          <td align="center" style="padding:0;font-size:0;line-height:0;">
            <a href="${INSTAGRAM_URL}"><img src="${IMAGE_BASE}/quests.jpg" width="600" alt="Your first 3 sidequests" style="display:block;width:100%;max-width:600px;height:auto;"></a>
          </td>
        </tr>

        <!-- CAPTURE LINE -->
        <tr>
          <td align="center" style="padding:28px 28px 34px;">
            <div style="font-family:${FONT};font-size:14px;line-height:1.6;color:${GREY};max-width:460px;margin:0 auto;">${captureHtml}</div>
          </td>
        </tr>

        <!-- REFERRAL BLOCK -->
        <tr>
          <td style="padding:0 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ACCENT};border-radius:14px;">
              <tr>
                <td align="center" style="padding:38px 28px;">
                  <div style="font-family:${FONT};font-size:26px;line-height:1.1;font-weight:700;letter-spacing:-0.4px;color:${WHITE};">${escapeHtml(c.referral.headline)}</div>
                  <div style="font-family:${FONT};font-size:15px;line-height:1.5;font-weight:400;color:${NEAR_WHITE};padding:12px 0 26px;">${escapeHtml(c.referral.line)}</div>
                  <a href="${waHref}" style="display:inline-block;background:${BLACK};color:${WHITE};text-decoration:none;font-family:${FONT};font-size:14px;font-weight:700;letter-spacing:0.06em;padding:16px 34px;border-radius:9px;">${escapeHtml(c.referral.buttonLabel)}</a>
                  <div style="font-family:${FONT};font-size:12px;color:${DARK_YELLOW};padding:22px 0 0;word-break:break-all;">
                    <a href="${link}" style="color:${DARK_YELLOW};text-decoration:none;">${link}</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="padding:44px 24px 0;">
            <div style="font-family:${FONT};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${GREY};padding:0 0 18px;">${escapeHtml(c.footer.socialIntro)}</div>
            ${socialButton(`${IMAGE_BASE}/icon-tiktok.png`, "TikTok", TIKTOK_URL)}
            ${socialButton(`${IMAGE_BASE}/icon-instagram.png`, "Instagram", INSTAGRAM_URL)}
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:36px 24px 0;">
            <div style="font-family:${FONT};font-size:16px;line-height:1.5;font-weight:600;color:${WHITE};">${escapeHtml(c.footer.outro)}</div>
            <div style="font-family:${FONT};font-size:16px;line-height:1.5;font-weight:600;color:${WHITE};padding:2px 0 0;">${escapeHtml(c.footer.signoff)}</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:34px 24px 44px;">
            <a href="${unsub}" style="font-family:${FONT};font-size:12px;color:${GREY};text-decoration:underline;">${escapeHtml(c.footer.unsubscribeLabel)}</a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    c.wordmark,
    "",
    c.intro.headline,
    c.intro.sub,
    c.intro.lead,
    "",
    "Your first 3 sidequests: " + `${IMAGE_BASE}/quests.jpg`,
    "",
    c.capture.text.replace(c.capture.accent, `${c.capture.accent} (${INSTAGRAM_URL})`),
    "",
    c.referral.headline,
    c.referral.line,
    `${c.referral.buttonLabel}: ${waHref}`,
    `Your personal link: ${referralLink}`,
    "",
    c.footer.socialIntro,
    `TikTok ${TIKTOK_URL}`,
    `Instagram ${INSTAGRAM_URL}`,
    "",
    c.footer.outro,
    c.footer.signoff,
    "",
    `${c.footer.unsubscribeLabel}: ${unsubscribeUrl}`,
  ].join("\n");

  return { subject: c.subject, html, text };
}
