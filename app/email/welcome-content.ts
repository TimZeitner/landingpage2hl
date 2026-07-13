/**
 * Welcome email copy.
 *
 * This file holds ONLY the words in the welcome email. You can edit any of the
 * text below without touching any code - the layout/sending logic lives
 * elsewhere (welcome-template.ts + app/lib/resend.ts).
 *
 * Notes:
 * - `subject` is the email subject line.
 * - `intro` / `sidequests` are arrays: each item is its own paragraph / line.
 * - The referral link is inserted automatically by the template wherever the
 *   button appears - you don't need to paste a link in here.
 */
export const welcomeContent = {
  subject: "Your first sidequest is inside",

  // Short line shown as the email preview text in most inboxes (optional).
  preheader: "Waitlist secured. Three starter sidequests inside.",

  // Small wordmark at the top of the email.
  wordmark: "2HL",

  // Opening paragraphs (one string = one paragraph).
  intro: [
    "You're in. Waitlist secured, early access loading — the app drops September 2026.",
    "But you didn't sign up to wait, so here's your starter pack: three sidequests to run before launch. Two hours each. That's the rule, that's the whole game.",
  ],

  // The three starter sidequests (one string = one line).
  sidequests: [
    "Sidequest 1 — [PLACEHOLDER — final quest coming]",
    "Sidequest 2 — [PLACEHOLDER — final quest coming]",
    "Sidequest 3 — [PLACEHOLDER — final quest coming]",
  ],

  // Line right after the three sidequests.
  afterSidequests: "Do one this week. Film it. Tag @2hoursleft — best ones get featured.",

  // Text that introduces the referral link (the button is added after this).
  referralIntro:
    "And one more thing: sidequests need witnesses. Invite 3 friends with your personal link and you ALL unlock early access:",

  // Label on the referral button.
  referralButtonLabel: "Invite your crew",

  // Closing line + sign-off.
  outro: "Go make a story worth telling.",
  signoff: "— Tim",
};

export type WelcomeContent = typeof welcomeContent;
