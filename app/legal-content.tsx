import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  title?: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  description: string;
  sections: LegalSection[];
  updated?: string;
};

const contactLink = (
  <a href="mailto:info@2hoursleft.com">info@2hoursleft.com</a>
);

export const termsSections: LegalSection[] = [
  {
    body: (
      <>
        These Terms of Service ("Terms") apply to your use of{" "}
        <a href="https://2hoursleft.com">2hoursleft.com</a> and the 2 Hours Left waitlist. By
        accessing the website or joining the waitlist, you agree to these Terms. If you do not
        agree, please do not use the website or submit your email address.
      </>
    ),
  },
  {
    title: "1. Who we are",
    body: (
      <>
        2 Hours Left is an early-stage project currently being developed from the Netherlands. The
        project has not yet been incorporated as a separate legal entity. You can contact us at{" "}
        {contactLink}.
      </>
    ),
  },
  {
    title: "2. Purpose of the website",
    body: "The website 2hoursleft.com is a landing page for an upcoming app called 2 Hours Left. The website provides basic information about the app and allows visitors to join a waitlist by submitting their email address. The app is not yet publicly available. Joining the waitlist does not guarantee access to the app, early access, a specific launch date, or any specific feature.",
  },
  {
    title: "3. Waitlist registration",
    body: (
      <>
        <p>To join the waitlist, you must provide a valid email address. By joining the waitlist, you confirm that:</p>
        <ul>
          <li>the email address you provide is accurate;</li>
          <li>you own or are authorized to use that email address;</li>
          <li>you understand that we may contact you about the launch, early access, and important waitlist updates.</li>
        </ul>
        <p>You can request removal from the waitlist at any time by emailing {contactLink}.</p>
      </>
    ),
  },
  {
    title: "4. No guarantee of launch or availability",
    body: "2 Hours Left is currently in development. We may change, delay, pause, or cancel the launch at any time. We may also change the name, design, features, pricing, availability, or functionality of the app before launch. Nothing on the website should be interpreted as a binding promise that the app will launch on a specific date or include specific features.",
  },
  {
    title: "5. Acceptable use",
    body: (
      <>
        <p>You agree not to misuse the website or waitlist form. You must not:</p>
        <ul>
          <li>submit false, misleading, or unauthorized information;</li>
          <li>use automated systems, bots, or scripts to submit email addresses;</li>
          <li>attempt to interfere with the website's operation or security;</li>
          <li>attempt to access data, systems, or infrastructure without permission;</li>
          <li>use the website for unlawful, harmful, abusive, or fraudulent purposes.</li>
        </ul>
        <p>We may remove email addresses from the waitlist if we believe they were submitted in violation of these Terms.</p>
      </>
    ),
  },
  {
    title: "6. Intellectual property",
    body: "All content on the website, including text, branding, design, logos, visuals, names, and concepts, belongs to 2 Hours Left or its creators, unless stated otherwise. You may view the website for personal, non-commercial use. You may not copy, reproduce, distribute, modify, or use our branding or content for commercial purposes without our prior written permission.",
  },
  {
    title: "7. Third-party services",
    body: (
      <>
        We may use third-party service providers to operate the website and waitlist, such as hosting
        providers or database providers. Your use of the website may therefore involve technical
        interaction with third-party infrastructure. Our handling of personal data is explained in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </>
    ),
  },
  {
    title: "8. No professional advice",
    body: "The information on this website is provided for general informational purposes only. It does not constitute legal, financial, business, employment, or professional advice.",
  },
  {
    title: "9. Disclaimer",
    body: 'The website is provided on an "as is" and "as available" basis. We aim to keep the website accurate and available, but we do not guarantee that the website will always be available or error-free, that the waitlist form will always work without interruption, or that the information on the website will always be complete, current, or accurate.',
  },
  {
    title: "10. Limitation of liability",
    body: "To the maximum extent permitted by law, 2 Hours Left and the people involved in developing the project will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the website or waitlist. Nothing in these Terms excludes or limits liability where it would be unlawful to do so.",
  },
  {
    title: "11. Privacy",
    body: (
      <>
        When you submit your email address, we process your personal data as described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>. By joining the waitlist, you confirm that you
        have read and understood the Privacy Policy.
      </>
    ),
  },
  {
    title: "12. Changes to these Terms",
    body: 'We may update these Terms from time to time. If we make changes, we will update the "Last updated" date at the top of this page. The latest version will apply to your use of the website.',
  },
  {
    title: "13. Governing law",
    body: "These Terms are governed by the laws of the Netherlands. Any disputes arising from or relating to these Terms or the website will be handled by the competent courts of the Netherlands, unless mandatory consumer protection laws provide otherwise.",
  },
  {
    title: "14. Contact",
    body: <>For questions about these Terms, contact us at {contactLink}.</>,
  },
];

export const privacySections: LegalSection[] = [
  {
    body: (
      <>
        This Privacy Policy explains how 2 Hours Left ("2 Hours Left", "we", "us", or "our")
        collects, uses, stores, and protects personal data when you visit{" "}
        <a href="https://2hoursleft.com">2hoursleft.com</a> and sign up for our waitlist.
      </>
    ),
  },
  {
    body: "2 Hours Left is an early-stage project currently being developed from the Netherlands. The project has not yet been incorporated as a separate legal entity.",
  },
  {
    body: <>For questions about this Privacy Policy or your personal data, contact us at {contactLink}.</>,
  },
  {
    title: "1. Who we are",
    body: '2 Hours Left operates the website 2hoursleft.com. At this stage, the website is used to provide information about our upcoming app and to allow visitors to join a waitlist. For the purposes of the General Data Protection Regulation ("GDPR"), the person or team responsible for 2 Hours Left acts as the data controller for the personal data collected through this website.',
  },
  {
    title: "2. What personal data we collect",
    body: (
      <>
        <p>When you join the waitlist, we collect and store:</p>
        <ul>
          <li>your email address;</li>
          <li>
            referral data: a unique referral code we generate for you, and - if you arrived through
            someone else's referral link - the referral code of the person who referred you, plus a
            count of how many friends have joined using your link;
          </li>
          <li>
            campaign parameters (UTM): if you reach the site through a tagged link, for example from
            one of our TikTok videos, we store the <code>utm_source</code> and{" "}
            <code>utm_campaign</code> values from that link so we can see which content brought you
            here.
          </li>
        </ul>
        <p>
          We also use privacy-friendly, anonymized usage analytics (see section 7, "Analytics").
          We do not intentionally collect special categories of personal data, such as health data,
          religious beliefs, political opinions, or similar sensitive information.
        </p>
      </>
    ),
  },
  {
    title: "3. How we collect your data",
    body: "We collect your email address directly from you when you enter it into the waitlist form and submit it. Referral codes and UTM parameters are read automatically from the web address (URL) of the link you use to reach the site - for example a friend's referral link, or a link in one of our TikTok posts. By submitting the form, you confirm that the email address belongs to you or that you are authorized to use it.",
  },
  {
    title: "4. Why we use your data",
    body: (
      <>
        <p>We use the data described above to:</p>
        <ul>
          <li>add you to the 2 Hours Left waitlist;</li>
          <li>notify you when 2 Hours Left launches;</li>
          <li>send early access invitations;</li>
          <li>send important waitlist-related updates;</li>
          <li>
            run our referral programme - generate your personal link, count how many friends you
            invite, and unlock early access for you and them;
          </li>
          <li>
            understand which content and campaigns bring people to the waitlist (using UTM
            parameters), so we can improve our marketing;
          </li>
          <li>respond to requests you send us about your data.</li>
        </ul>
        <p>We do not sell, rent, or trade your email address. We do not use your email address for unrelated third-party marketing.</p>
      </>
    ),
  },
  {
    title: "5. Legal basis for processing",
    body: <>We process your email address based on your consent under Article 6(1)(a) GDPR. You give this consent when you voluntarily submit your email address to join the waitlist. You can withdraw your consent at any time by contacting us at {contactLink}. Withdrawing consent does not affect the lawfulness of processing that happened before the withdrawal.</>,
  },
  {
    title: "6. Email communication",
    body: (
      <>
        <p>Because the waitlist exists to notify you about 2 Hours Left, we may send you emails related to:</p>
        <ul>
          <li>your waitlist registration;</li>
          <li>product updates;</li>
          <li>launch updates;</li>
          <li>early access;</li>
          <li>important availability updates.</li>
        </ul>
        <p>We aim to keep these emails limited and relevant. You can unsubscribe or request deletion at any time by emailing {contactLink}.</p>
      </>
    ),
  },
  {
    title: "7. Analytics",
    body: (
      <>
        <p>
          We use Vercel Analytics to understand how visitors use the website - for example how many
          people visit, and which actions are common (such as completing a signup or sharing a
          referral link).
        </p>
        <p>
          Vercel Analytics is designed to be privacy-friendly. In its basic mode it does not use
          cookies and does not require a cookie banner. It measures aggregated, anonymized usage and
          does not build advertising profiles about you. When you complete a signup, we send Vercel
          Analytics an event that may include the <code>utm_source</code> and{" "}
          <code>utm_campaign</code> of the link you arrived from, so we can see which content drove
          signups. We do not send your email address to Vercel Analytics.
        </p>
      </>
    ),
  },
  {
    title: "8. Referral programme",
    body: (
      <>
        <p>
          Our waitlist includes a referral feature. After you sign up, you receive a personal
          referral link that contains a unique code. If a friend joins using your link, we store the
          connection between their signup and your code, and increase your referral count.
        </p>
        <p>
          This means we store who referred whom, using referral codes rather than sharing your
          personal details between users. We do not share this referral data with any third parties
          for their own purposes, and we do not sell it. It is used only to run the "invite friends
          to unlock early access" mechanic.
        </p>
      </>
    ),
  },
  {
    title: "9. Where and how we store your data",
    body: "We use Supabase to store waitlist data, including your email address, your referral code, any referral code that referred you, your referral count, and the utm_source and utm_campaign values described above. Supabase acts as a data processor on our behalf. We aim to store waitlist data on servers located within the European Union or European Economic Area where technically available. Before publishing this policy, we will verify that our Supabase project is hosted in an appropriate region.",
  },
  {
    title: "10. Who we share your data with",
    body: (
      <>
        <p>We share your data only with service providers that help us operate the website and waitlist:</p>
        <ul>
          <li>Supabase - waitlist database storage (data processor);</li>
          <li>Vercel - website hosting and privacy-friendly usage analytics (data processor).</li>
        </ul>
        <p>
          We do not allow these providers to use your data for their own marketing purposes. We do
          not sell or trade your personal data, and we do not share your referral or UTM data with
          any third party for advertising. We may disclose data if required by law, regulation, legal
          process, or a competent authority.
        </p>
      </>
    ),
  },
  {
    title: "11. International transfers",
    body: "Our goal is to keep waitlist data within the EU/EEA where possible. Some providers, such as Vercel, may process limited data (for example anonymized analytics) outside the EU/EEA. Where personal data is transferred outside the EU/EEA, we rely on appropriate safeguards as required by the GDPR.",
  },
  {
    title: "12. Data retention",
    body: <>We keep your email address only for as long as necessary for the waitlist purpose. Unless you request deletion earlier, we will delete your email address no later than 90 days after the public launch of 2 Hours Left, unless you create an account and become an app user, you separately consent to receive further communications, or we are legally required to keep certain information for longer. Your referral and UTM data are stored alongside your waitlist entry and are deleted together with it. You can request deletion at any time by emailing {contactLink}.</>,
  },
  {
    title: "13. Security",
    body: "We take reasonable technical and organizational measures to protect your personal data against unauthorized access, loss, misuse, alteration, or disclosure. However, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security, but we work to protect your data using appropriate measures.",
  },
  {
    title: "14. Your GDPR rights",
    body: (
      <>
        <p>Under the GDPR, you may have the right to:</p>
        <ul>
          <li>access the personal data we hold about you;</li>
          <li>correct inaccurate or incomplete data;</li>
          <li>request deletion of your data;</li>
          <li>restrict how we process your data;</li>
          <li>object to certain processing;</li>
          <li>receive your data in a portable format;</li>
          <li>withdraw your consent at any time;</li>
          <li>lodge a complaint with a supervisory authority.</li>
        </ul>
        <p>To exercise your rights, email us at {contactLink}. We will respond within 30 days, unless a longer period is permitted by law.</p>
      </>
    ),
  },
  {
    title: "15. Complaints",
    body: (
      <>
        If you believe we have not handled your personal data correctly, you have the right to lodge
        a complaint with the Dutch Data Protection Authority:{" "}
        <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
          autoriteitpersoonsgegevens.nl
        </a>.
      </>
    ),
  },
  {
    title: "16. Changes to this Privacy Policy",
    body: "We may update this Privacy Policy from time to time, for example if we change our waitlist system, launch the app, add or change analytics, or start processing additional data. The latest version will always be available on this page with the updated date at the top.",
  },
  {
    title: "17. Contact",
    body: <>For privacy questions, deletion requests, or any other data-related request, contact us at {contactLink}.</>,
  },
];

export const legalNoticeSections: LegalSection[] = [
  {
    body: "2 Hours Left is an early-stage project currently being developed from the Netherlands. The project has not yet been incorporated as a separate legal entity.",
  },
  {
    body: (
      <>
        <strong>Website:</strong> <a href="https://2hoursleft.com">2hoursleft.com</a>
        <br />
        <strong>Contact:</strong> {contactLink}
      </>
    ),
  },
  {
    body: "This website is used to provide information about the upcoming 2 Hours Left app and to allow visitors to join the waitlist.",
  },
  {
    body: "Once the project is registered as a formal business entity, this page will be updated with the applicable business registration details, including registered legal name, business address, Chamber of Commerce number, and VAT identification number where applicable.",
  },
];

export function LegalPage({ title, description, sections, updated = "April 2026" }: LegalPageProps) {
  return (
    <div className="legal-shell">
      <header className="legal-header">
        <Link className="legal-logo" href="/" aria-label="2HL home">
          <img src="/images/2hl-logo-wide.png" alt="2HL" />
        </Link>
      </header>
      <main className="legal-main">
        <Link className="legal-back" href="/">
          &lt;- Back
        </Link>
        <h1>{title}</h1>
        <p className="legal-date">Last updated: {updated}</p>
        <div className="legal-content" aria-label={description}>
          {sections.map((section, index) => (
            <section className="legal-section" key={`${section.title ?? "intro"}-${index}`}>
              {section.title ? <h2>{section.title}</h2> : null}
              <div>{section.body}</div>
            </section>
          ))}
        </div>
      </main>
      <footer>
        <Link className="footer-mega" href="/" aria-label="2HL home">
          <img src="/images/2hl-logo-wide.png" alt="2HL" />
        </Link>
        <div className="footer-links" aria-label="Footer links">
          <Link className="footer-link" href="/privacy">Privacy</Link>
          <Link className="footer-link" href="/terms">Terms</Link>
          <Link className="footer-link" href="/legal">Legal Notice</Link>
          <a className="footer-link" href="https://www.tiktok.com/@2hleft0">TikTok</a>
          <a className="footer-link" href="https://www.instagram.com/2hleft/">Instagram</a>
          <a className="footer-link" href="mailto:info@2hoursleft.com">Contact</a>
        </div>
        <div className="footer-copy">(c) 2026 2HL - 2hoursleft.com</div>
      </footer>
    </div>
  );
}
