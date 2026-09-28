import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./base.css";

// Self-hosted via next/font (no requests to fonts.googleapis.com). Exposed as
// a CSS variable that the landing page's styles consume via --f.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "2HL - 2 Hours Left",
  description: "A daily sidequest. Two hours to complete it. Create stories worth telling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
