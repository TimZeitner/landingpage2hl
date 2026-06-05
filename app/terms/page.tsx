import type { Metadata } from "next";
import { LegalPage, termsSections } from "../legal-content";

export const metadata: Metadata = {
  title: "Terms of Service - 2HL",
  description: "Terms of service for 2 Hours Left.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Terms of service for 2 Hours Left"
      sections={termsSections}
    />
  );
}
