/**
 * Welcome email copy.
 *
 * This file holds ONLY the words in the welcome email. Edit any text here
 * without touching code - layout/assets live in welcome-template.ts and sending
 * in app/lib/resend.ts.
 *
 * A few fields have an `accent` companion: that exact substring is rendered in
 * the accent colour (and, where noted, linked). Keep the accent substring
 * identical to a piece of the main text.
 */
export const welcomeContent = {
  subject: "Your first sidequest is inside",

  // Preview text shown in the inbox list (optional).
  preheader: "Welcome to the crew. Your first 3 sidequests are inside.",

  // Intro block (centered).
  intro: {
    headline: "WELCOME TO THE CREW.",
    headlineAccent: "CREW.", // this part is shown in the accent colour
    sub: "You're one of us now. The ones who'd rather live the story than scroll it.",
    lead: "Here are your first 3 sidequests:",
  },

  // Line under the quest image. `accent` is shown in the accent colour and
  // linked to Instagram.
  capture: {
    text: "Capture it. Send us your best shots via Insta DM. The best ones get featured.",
    accent: "Insta DM",
  },

  // Referral block (accent-coloured section).
  referral: {
    headline: "SIDEQUESTS NEED WITNESSES",
    line: "Invite 3 friends. You ALL unlock early access.",
    buttonLabel: "INVITE YOUR CREW",
  },

  // Pre-filled WhatsApp message. Keep [LINK] where the personal link should go;
  // the template injects the real link and URL-encodes everything.
  whatsappMessage:
    "yo, I got us early access to 2HL. One sidequest a day, 2 hours to do it. Sign up with my link and we're all in day one: [LINK]",

  // Footer.
  footer: {
    socialIntro: "New sidequests drop daily",
    outro: "Go make a story worth telling.",
    signoff: "Tim",
    unsubscribeLabel: "Unsubscribe",
  },
};

export type WelcomeContent = typeof welcomeContent;
