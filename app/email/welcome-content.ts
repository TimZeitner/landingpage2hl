/**
 * Welcome email copy.
 *
 * This file holds ONLY the words in the welcome email. Edit any text here
 * without touching code - layout lives in welcome-template.ts and sending in
 * app/lib/resend.ts.
 *
 * The referral link is injected automatically by the template (into both the
 * WhatsApp button and the visible "personal link" line). Leave [LINK] where it
 * belongs in `whatsappMessage`.
 */
export const welcomeContent = {
  subject: "Your first sidequest is inside",

  // Preview text shown in the inbox list (optional).
  preheader: "3 sidequests. 2 hours each. Go.",

  // Small lowercase wordmark at the very top.
  wordmark: "2hoursleft",

  // Hero block.
  hero: {
    headline: "3 SIDEQUESTS. 2 HOURS EACH. GO.",
    sub: "You're in. Day one. I don't forget day one.",
  },

  // The three quest cards. `number` is the big accent numeral, `name` the bold
  // caps title, `body` the one-paragraph description.
  cards: [
    {
      number: "1",
      name: "THE COLOR HUNT",
      body: "Everyone picks one color. Two hours to shoot 9 photos of it around your city. Best grid wins a free drink from everyone.",
    },
    {
      number: "2",
      name: "THE SUNDOWN COUNCIL",
      body: "Best sunset spot in your city. Phones in the middle. Until the sun's gone, you plan your group's wildest mission ever and lock a real date in the calendar. DM us the idea @2hoursleft. The best ones go in the app.",
    },
    {
      number: "3",
      name: "THE GAUNTLET",
      body: "Pub crawl, but every bar is a challenge: no hands, no talking, order for the guy to your left, hold an accent, stranger picks your drink. Fail = you buy the round.",
    },
  ],

  // Centered line under the cards.
  tagLine: "Film it. Tag @2hoursleft. I watch every single one.",

  // Referral block (accent section).
  referral: {
    headline: "SIDEQUESTS NEED WITNESSES",
    line: "Invite 3 friends, you ALL unlock early access.",
    buttonLabel: "Invite your crew",
    linkLabel: "Your personal link:",
  },

  // Pre-filled WhatsApp message. Keep [LINK] where the personal link should go -
  // the template inserts the real link and URL-encodes everything.
  whatsappMessage:
    "yo, I got us early access to 2HL. One sidequest a day, 2 hours to do it. Sign up with my link and we're all in day one: [LINK]",

  // Footer.
  footer: {
    socialIntro: "New sidequests drop daily",
    socials: [
      { label: "TikTok", url: "https://www.tiktok.com/@2hleft_" },
      { label: "Instagram", url: "https://www.instagram.com/2hleft" },
    ],
    outro: "Go make a story worth telling.",
    signoff: "- Tim",
    unsubscribeLabel: "Unsubscribe",
  },
};

export type WelcomeContent = typeof welcomeContent;
