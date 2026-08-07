import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Case studies in GTM systems Connor J. Laughlin built and ran. Now consolidated under /work.",
  robots: { index: false, follow: true },
};

export default function ProofPage() {
  redirect("/work");
}
