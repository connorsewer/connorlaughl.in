import { redirect } from "next/navigation";
import type { Metadata } from "next";

/**
 * Legacy about route (re-story design, decision 6). The chapter was promoted
 * out of the appendix and lives at /story.
 */

export const metadata: Metadata = {
  title: "Story",
  description: "The about chapter now lives at /story.",
  robots: { index: false, follow: true },
};

export default function AboutRedirect() {
  redirect("/story");
}
