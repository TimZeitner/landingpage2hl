import type { Metadata } from "next";
import { LegalPage, privacySections } from "../legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy - 2HL",
  description: "Privacy policy for 2 Hours Left.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Privacy policy for 2 Hours Left"
      sections={privacySections}
      updated="July 2026"
    />
  );
}
