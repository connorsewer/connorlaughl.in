import Link from "next/link";
import type { Metadata } from "next";

import { ColophonFooter, Masthead, Sheet } from "@/components/manual";

/**
 * 404 (spec §3, new in Phase 5).
 *
 * One mono line and one link back to the contents, in the manual's chrome so
 * a mistyped URL still reads as part of the book. Copy is the approved deck's
 * section 10, verbatim.
 */

export const metadata: Metadata = {
  title: "Page not in this manual | Connor J. Laughlin",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="manual-root flex min-h-screen flex-col bg-ground-grid">
      <Masthead compact />

      <main className="mx-auto w-full max-w-[68rem] flex-1 py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet id="main-content" as="section" className="px-5 py-16 sm:px-10 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-blueprint">
            Page not in this manual
          </p>
          <Link
            href="/#contents"
            className="mt-6 inline-block font-display text-[1.75rem] leading-tight text-body-ink underline decoration-blueprint underline-offset-[6px] transition-opacity hover:opacity-70 sm:text-[2rem]"
          >
            Back to contents
          </Link>
        </Sheet>
      </main>

      <ColophonFooter />
    </div>
  );
}
