import type { Metadata } from "next";
import Landing from "./Landing";
import { getFoundingCount } from "./lib/count";

// Read the live founding count on every request (server-side, count only).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "2HL | There is no replay.",
  description: "Be early or cry later. You don't get another version of this year. Life is live.",
  openGraph: {
    title: "2HL | There is no replay.",
    description: "Be early or cry later. You don't get another version of this year. Life is live.",
  },
};

export default async function Page() {
  const initialCount = await getFoundingCount();
  return <Landing initialCount={initialCount} />;
}
