import type { Metadata } from "next";
import { LegalPage, legalNoticeSections } from "../legal-content";

export const metadata: Metadata = {
  title: "Legal Notice - 2HL",
  description: "Legal notice for 2 Hours Left.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Legal Notice"
      description="Legal notice for 2 Hours Left"
      sections={legalNoticeSections}
    />
  );
}
