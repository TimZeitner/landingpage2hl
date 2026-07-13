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

export function renderWelcomeEmail(referralLink: string): {
  subject: string;
  html: string;
  text: string;
} {
  const c = welcomeContent;
  const link = escapeHtml(referralLink);

  const introHtml = c.intro
    .map(
      (p) =>
        `<p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:${TEXT};">${escapeHtml(p)}</p>`,
    )
    .join("");

  const sidequestsHtml = c.sidequests
    .map(
      (q) =>
        `<p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:${TEXT};">${escapeHtml(q)}</p>`,
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
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
        <tr>
          <td style="padding:0 0 24px;">
            <span style="font-size:22px;font-weight:800;letter-spacing:2px;color:${TEXT};">${escapeHtml(c.wordmark)}</span>
          </td>
        </tr>
        <tr>
          <td>
            ${introHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:4px 0 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CARD};border:1px solid ${BORDER};border-radius:12px;">
              <tr>
                <td style="padding:20px 22px;">
                  ${sidequestsHtml}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 0 4px;">
            <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:${TEXT};">${escapeHtml(c.afterSidequests)}</p>
            <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:${TEXT};">${escapeHtml(c.referralIntro)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 8px;">
            <a href="${link}" style="display:inline-block;background:${TEXT};color:${BG};text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:14px 28px;border-radius:8px;">${escapeHtml(c.referralButtonLabel)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0 28px;">
            <a href="${link}" style="font-size:13px;color:${DIM};word-break:break-all;">${link}</a>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid ${BORDER};padding:24px 0 0;">
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
    ...c.intro,
    "",
    ...c.sidequests,
    "",
    c.afterSidequests,
    "",
    c.referralIntro,
    referralLink,
    "",
    c.outro,
    c.signoff,
  ].join("\n");

  return { subject: c.subject, html, text };
}
