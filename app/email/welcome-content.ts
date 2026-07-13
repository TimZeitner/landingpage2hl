/**
 * Welcome email copy.
 *
 * This file holds ONLY the words in the welcome email. Edit any text here
 * without touching code - layout lives in welcome-template.ts and sending in
 * app/lib/resend.ts.
 *
 * Notes:
 * - Arrays: each item is its own paragraph / line.
 * - The referral link is injected automatically by the template (into both the
 *   WhatsApp button and the visible "personal link" line). You never paste a
 *   link in here - just leave [LINK] where it belongs in `whatsappMessage`.
 */
export const welcomeContent = {
  subject: "Your first sidequest is inside",

  // Preview text shown in the inbox list (optional).
  preheader: "You're in. Your first 3 sidequests are inside.",

  // Plain lowercase wordmark at the top.
  wordmark: "2hoursleft",

  // Opening lines (one string = one paragraph).
  intro: [
    "You're IN. Day one. I don't forget day one.",
    "The app drops September 2026, but you're not here to wait, so HERE ARE YOUR FIRST 3 SIDEQUESTS:",
  ],

  // The three starter sidequests. Each is its own visual block: `name` is the
  // bold header, `body` is its paragraphs.
  sidequests: [
    {
      name: "SIDEQUEST 1: THE COLOR HUNT",
      body: [
        "Everyone picks one color before leaving the house. Then the timer starts: TWO HOURS.",
        "Hunt your city for your color. Nine photos, one grid, only your color allowed.",
        "Timer dies, everyone presents, the group votes.",
        "Most aesthetic grid wins a free drink from EVERY single person in the group. One winner, everybody pays.",
        "You will never look at your city the same way again.",
      ],
    },
    {
      name: "SIDEQUEST 2: THE SUNDOWN COUNCIL",
      body: [
        "Find the best sunset spot your city's got. Rooftop, hill, bridge, riverbank. That's your headquarters tonight.",
        "Get your crew up there before golden hour, and when the sky starts turning, phones go in the middle, face down.",
        "Now the real mission starts: until the sun is gone, you brainstorm the wildest sidequest your group could EVER pull off.",
        "A road trip with no destination. Sleeping on a mountain. Visiting the friend who moved away, unannounced. Dream stupidly big.",
        'Then, before anyone goes home: pick THE one, open the calendar, and lock a date every single one of you can make. Not "soon." A DATE.',
        "That's how a sunset turns into your group's next legendary story.",
        "And listen: DM us your idea on Instagram @2hoursleft. If it's good, we're putting it in the app, and your crew's quest becomes a mission for thousands of people.",
      ],
    },
    {
      name: "SIDEQUEST 3: THE GAUNTLET",
      body: [
        "A pub crawl where every bar is a challenge. Fail one, you buy the round.",
        "Bar 1: finish your drink with no hands.",
        "Bar 2: total silence. Order, pay, drink. One word and you're done.",
        "Bar 3: everyone orders for the person to their left. No questions, no vetoes.",
        "Bar 4: pick an accent, keep it the whole bar. Break character, break your wallet.",
        "Bar 5: a stranger picks your drink. You drink it. Yes, that one too.",
        "Five bars. Five ways to lose. One legendary night.",
      ],
    },
  ],

  // Lines after the three sidequests, leading into the referral ask.
  afterSidequests: [
    "Do one this week. Film it. Tag @2hoursleft and I'll personally watch every single one. The best ones get featured.",
    "One more thing, and this one matters: sidequests need witnesses.",
    "Invite 3 friends with your personal link and you ALL unlock early access:",
  ],

  // Label on the WhatsApp share button.
  referralButtonLabel: "Invite your crew",

  // Pre-filled WhatsApp message. Keep [LINK] where the personal link should go -
  // the template inserts the real link and URL-encodes everything.
  whatsappMessage:
    "yo, I got us early access to 2HL. One sidequest a day, 2 hours to do it. Sign up with my link and we're all in day one: [LINK]",

  // Label shown right before the visible, copy-able personal link.
  personalLinkLabel: "Your personal link:",

  // Intro line above the social buttons.
  socialIntro: "New sidequest ideas drop daily until launch, right here:",

  // Social buttons at the bottom. Edit label + url together.
  socials: [
    { label: "TikTok: @2hleft_", url: "https://www.tiktok.com/@2hleft_" },
    { label: "Instagram: @2hleft", url: "https://www.instagram.com/2hleft" },
  ],

  // Closing line + sign-off.
  outro: "Go make a story worth telling.",
  signoff: "Tim",
};

export type WelcomeContent = typeof welcomeContent;
