import Link from "next/link";
import type { ReactNode } from "react";

import { personSchema } from "@/components/JsonLd";

/**
 * Manual masthead.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, top 160px —
 * pixel wordmark set large in blueprint at the left, right-aligned serif
 * tagline stacked over a second line, thin rule underneath. The compact mode
 * matches `chapter-1440.png` top-left, where the wordmark shrinks to a link
 * and the right slot carries the breadcrumb instead of the tagline.
 *
 * Server component. The wordmark is pre-split into `data-glyph` spans so a
 * client caller can run `wordmarkReveal()` from lib/motion-manual.ts over it
 * without re-rendering the markup.
 */

const WORDMARK = "CONNOR LAUGHLIN";

/** Contact target, reused from the schema module so there is one email in the tree. */
const CONTACT_HREF = personSchema.email;

type NavLink = { href: string; label: string };

const NAV: NavLink[] = [
  { href: "/#contents", label: "Contents" },
  { href: "/resume", label: "Resume" },
  { href: CONTACT_HREF, label: "Contact" },
];

export type MastheadProps = {
  /** Chapter mode: small wordmark, breadcrumb slot instead of the tagline. */
  compact?: boolean;
  /** Full mode only. Serif tagline, right-aligned under the wordmark line. */
  tagline?: ReactNode;
  /** Compact mode only. Breadcrumb node for the right slot. */
  breadcrumb?: ReactNode;
  className?: string;
};

function Wordmark({ compact }: { compact: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-wordmark
      className={
        compact
          ? "font-pixel text-[0.95rem] leading-none tracking-[0.14em] text-blueprint"
          : "font-pixel text-[8vw] leading-[0.9] tracking-[0.1em] text-blueprint sm:text-[3rem] lg:text-[3.5rem]"
      }
    >
      {Array.from(WORDMARK).map((glyph, i) => (
        <span key={`${glyph}-${i}`} data-glyph className="inline-block">
          {glyph === " " ? " " : glyph}
        </span>
      ))}
    </span>
  );
}

function Nav({ compact }: { compact: boolean }) {
  return (
    <nav
      aria-label="Manual navigation"
      className={`flex items-center gap-4 font-mono uppercase tracking-[0.2em] text-body-ink/70 ${
        compact ? "text-[9px]" : "text-[10px]"
      }`}
    >
      {NAV.map(({ href, label }) =>
        href.startsWith("mailto:") ? (
          <a key={href} href={href} className="transition-colors hover:text-blueprint">
            {label}
          </a>
        ) : (
          <Link key={href} href={href} className="transition-colors hover:text-blueprint">
            {label}
          </Link>
        ),
      )}
    </nav>
  );
}

export function Masthead({ compact = false, tagline, breadcrumb, className }: MastheadProps) {
  return (
    <header className={`w-full ${className ?? ""}`}>
      <a
        href="#main-content"
        className="sr-only font-mono text-[10px] uppercase tracking-[0.2em] text-blueprint focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-sheet focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      {compact ? (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 lg:px-10">
          <Link href="/" aria-label="Connor Laughlin, cover" className="shrink-0">
            <Wordmark compact />
          </Link>
          <div className="flex flex-1 items-center justify-end gap-6">
            {breadcrumb ? <div className="min-w-0">{breadcrumb}</div> : null}
            <Nav compact />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-6 pb-5 pt-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pt-10">
          <Link href="/" aria-label="Connor Laughlin, cover" className="shrink-0">
            <Wordmark compact={false} />
          </Link>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {tagline ? (
              <div className="font-serif-body text-[0.95rem] leading-snug text-body-ink lg:max-w-[38ch] lg:text-right">
                {tagline}
              </div>
            ) : null}
            <Nav compact={false} />
          </div>
        </div>
      )}
    </header>
  );
}
