import { welcomeContent } from "./welcome-content";

/**
 * Renders the welcome email from the editable copy in welcome-content.ts, the
 * recipient's personal referral link, and their unsubscribe URL. Returns the
 * subject plus HTML and plain-text bodies. No sending here - see app/lib/resend.ts.
 *
 * Table-based layout + inline CSS for Gmail / Apple Mail / Outlook.
 */

// Palette. ACCENT is the landing page's signature cream - swap this one value
// to re-skin the whole email with a different accent.
const BG = "#0A0A0A";
const CARD = "#161616";
const ACCENT = "#eeebe4";
const WHITE = "#ffffff";
const DIM = "#8a8a8a";
const ACCENT_INK = "#0A0A0A"; // text on top of the accent block

// Condensed, email-safe display stack (approximates the site's Bebas Neue).
const DISPLAY = "'Arial Narrow','Helvetica Neue',Arial,sans-serif";
const SANS = "'Helvetica Neue',Arial,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  const cardsHtml = c.cards
    .map(
      (card) => `
      <tr>
        <td style="padding:0 0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CARD};border-radius:16px;">
            <tr>
              <td style="padding:32px 28px;">
                <div style="font-family:${DISPLAY};font-size:56px;line-height:1;font-weight:700;color:${ACCENT};">${escapeHtml(card.number)}</div>
                <div style="font-family:${DISPLAY};font-size:26px;line-height:1.05;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${WHITE};padding:10px 0 12px;">${escapeHtml(card.name)}</div>
                <div style="font-family:${SANS};font-size:15px;line-height:1.6;color:${DIM};">${escapeHtml(card.body)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`,
    )
    .join("");

  const socialsHtml = c.footer.socials
    .map(
      (s) =>
        `<a href="${escapeHtml(s.url)}" style="display:inline-block;background:${CARD};border:1px solid #262626;color:${WHITE};text-decoration:none;font-family:${SANS};font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:12px 24px;border-radius:8px;margin:0 6px;">${escapeHtml(s.label)}</a>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${escapeHtml(c.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">

        <!-- HERO -->
        <tr>
          <td style="padding:8px 8px 4px;">
            <span style="font-family:${SANS};font-size:15px;font-weight:700;letter-spacing:0.5px;color:${WHITE};">${escapeHtml(c.wordmark)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 8px 0;">
            <div style="font-family:${DISPLAY};font-size:52px;line-height:0.98;font-weight:700;letter-spacing:0.01em;text-transform:uppercase;color:${WHITE};">${escapeHtml(c.hero.headline)}</div>
            <div style="font-family:${SANS};font-size:15px;line-height:1.5;color:${DIM};padding:18px 0 34px;">${escapeHtml(c.hero.sub)}</div>
          </td>
        </tr>

        <!-- QUEST CARDS -->
        ${cardsHtml}

        <!-- TAGLINE -->
        <tr>
          <td align="center" style="padding:18px 16px 34px;">
            <div style="font-family:${SANS};font-size:15px;line-height:1.5;color:${WHITE};">${escapeHtml(c.tagLine)}</div>
          </td>
        </tr>

        <!-- REFERRAL BLOCK -->
        <tr>
          <td style="padding:0 0 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ACCENT};border-radius:16px;">
              <tr>
                <td align="center" style="padding:36px 28px;">
                  <div style="font-family:${DISPLAY};font-size:30px;line-height:1.02;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;color:${ACCENT_INK};">${escapeHtml(c.referral.headline)}</div>
                  <div style="font-family:${SANS};font-size:15px;line-height:1.5;color:${ACCENT_INK};padding:12px 0 24px;">${escapeHtml(c.referral.line)}</div>
                  <a href="${waHref}" style="display:inline-block;background:${ACCENT_INK};color:${ACCENT};text-decoration:none;font-family:${SANS};font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 34px;border-radius:8px;">${escapeHtml(c.referral.buttonLabel)}</a>
                  <div style="font-family:${SANS};font-size:12px;color:${ACCENT_INK};opacity:0.7;padding:22px 0 4px;">${escapeHtml(c.referral.linkLabel)}</div>
                  <a href="${link}" style="font-family:${SANS};font-size:13px;color:${ACCENT_INK};word-break:break-all;">${link}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="padding:40px 16px 0;">
            <div style="font-family:${SANS};font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:${DIM};padding:0 0 16px;">${escapeHtml(c.footer.socialIntro)}</div>
            ${socialsHtml}
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:34px 16px 0;">
            <div style="font-family:${SANS};font-size:16px;line-height:1.5;color:${WHITE};">${escapeHtml(c.footer.outro)}</div>
            <div style="font-family:${SANS};font-size:16px;line-height:1.5;color:${WHITE};padding:4px 0 0;">${escapeHtml(c.footer.signoff)}</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:36px 16px 8px;">
            <a href="${unsub}" style="font-family:${SANS};font-size:12px;color:${DIM};text-decoration:underline;">${escapeHtml(c.footer.unsubscribeLabel)}</a>
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
    c.hero.headline,
    c.hero.sub,
    "",
    ...c.cards.flatMap((card) => [`${card.number}. ${card.name}`, card.body, ""]),
    c.tagLine,
    "",
    c.referral.headline,
    c.referral.line,
    `${c.referral.buttonLabel}: ${waHref}`,
    `${c.referral.linkLabel} ${referralLink}`,
    "",
    c.footer.socialIntro,
    ...c.footer.socials.map((s) => `${s.label} ${s.url}`),
    "",
    c.footer.outro,
    c.footer.signoff,
    "",
    `${c.footer.unsubscribeLabel}: ${unsubscribeUrl}`,
  ].join("\n");

  return { subject: c.subject, html, text };
}
