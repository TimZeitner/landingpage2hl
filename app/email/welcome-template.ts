import { welcomeContent } from "./welcome-content";

/**
 * Renders the welcome email. Takes the editable copy from welcome-content.ts and
 * the recipient's personal referral link, and returns the subject plus HTML and
 * plain-text bodies. No sending happens here - see app/lib/resend.ts.
 */

// Brand colours (match the landing page).
const BG = "#050505";
const CARD = "#111111";
const BORDER = "#222222";
const TEXT = "#eeebe4";
const DIM = "#8a8a8a";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraph(text: string, color = TEXT): string {
  return `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${color};">${escapeHtml(text)}</p>`;
}

export function renderWelcomeEmail(referralLink: string): {
  subject: string;
  html: string;
  text: string;
} {
  const c = welcomeContent;
  const link = escapeHtml(referralLink);

  // WhatsApp share: inject the real link into the message, then URL-encode.
  const waMessage = c.whatsappMessage.replace("[LINK]", referralLink);
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

  const introHtml = c.intro.map((p) => paragraph(p)).join("");

  const sidequestsHtml = c.sidequests
    .map((sq) => {
      const bodyHtml = sq.body
        .map(
          (line) =>
            `<p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:${TEXT};">${escapeHtml(line)}</p>`,
        )
        .join("");
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CARD};border:1px solid ${BORDER};border-radius:12px;margin:0 0 16px;">
        <tr>
          <td style="padding:22px 22px 10px;">
            <p style="margin:0 0 14px;font-size:16px;font-weight:800;letter-spacing:0.04em;color:${TEXT};">${escapeHtml(sq.name)}</p>
            ${bodyHtml}
          </td>
        </tr>
      </table>`;
    })
    .join("");

  const afterHtml = c.afterSidequests.map((p) => paragraph(p)).join("");

  const socialsHtml = c.socials
    .map(
      (s) =>
        `<a href="${escapeHtml(s.url)}" style="display:inline-block;background:${CARD};border:1px solid ${BORDER};color:${TEXT};text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.06em;padding:12px 20px;border-radius:8px;margin:0 8px 8px 0;">${escapeHtml(s.label)}</a>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<title>${escapeHtml(c.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">
        <tr>
          <td style="padding:0 0 26px;">
            <span style="font-size:20px;font-weight:800;letter-spacing:0.5px;color:${TEXT};">${escapeHtml(c.wordmark)}</span>
          </td>
        </tr>
        <tr>
          <td>${introHtml}</td>
        </tr>
        <tr>
          <td style="padding:8px 0 4px;">${sidequestsHtml}</td>
        </tr>
        <tr>
          <td style="padding:12px 0 4px;">${afterHtml}</td>
        </tr>
        <tr>
          <td style="padding:6px 0 10px;">
            <a href="${waHref}" style="display:inline-block;background:${TEXT};color:${BG};text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:15px 30px;border-radius:8px;">${escapeHtml(c.referralButtonLabel)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0 30px;">
            <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.04em;color:${DIM};">${escapeHtml(c.personalLinkLabel)}</p>
            <a href="${link}" style="font-size:15px;color:${TEXT};word-break:break-all;">${link}</a>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid ${BORDER};padding:26px 0 0;">
            <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${DIM};">${escapeHtml(c.socialIntro)}</p>
            ${socialsHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 0 0;">
            <p style="margin:0 0 6px;font-size:16px;line-height:1.6;color:${TEXT};">${escapeHtml(c.outro)}</p>
            <p style="margin:0;font-size:16px;line-height:1.6;color:${TEXT};">${escapeHtml(c.signoff)}</p>
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
    ...c.intro,
    "",
    ...c.sidequests.flatMap((sq) => [sq.name, ...sq.body, ""]),
    ...c.afterSidequests,
    "",
    `${c.referralButtonLabel}: ${waHref}`,
    "",
    `${c.personalLinkLabel} ${referralLink}`,
    "",
    c.socialIntro,
    ...c.socials.map((s) => `${s.label} ${s.url}`),
    "",
    c.outro,
    c.signoff,
  ].join("\n");

  return { subject: c.subject, html, text };
}
