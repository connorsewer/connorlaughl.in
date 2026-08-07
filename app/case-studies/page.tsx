import { redirect } from "next/navigation";
import type { Metadata } from "next";

/**
 * Legacy index route (re-story design, decision 6). The Section 1 index moved
 * to /work; chapter URLs under /case-studies/[slug] are frozen and unaffected.
 */

export const metadata: Metadata = {
  title: "Work",
  description: "The Section 1 index now lives at /work.",
  robots: { index: false, follow: true },
};

export default function CaseStudiesIndexRedirect() {
  redirect("/work");
}
