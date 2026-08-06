import Link from "next/link";
import type { ReactNode } from "react";

import { personSchema } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ThemeToggle";
import { XRayToggle } from "@/components/manual/XRayMode";

/**
 * Manual masthead.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, top 160px —
 * pixel wordmark set large in blueprint at the left, right-aligned serif
 * tagline stacked over a second line, thin rule underneath. The compact mode
 * matches `chapter-1440.png` top-left, where the wordmark shrinks to a link
 * and the tagline drops. The breadcrumb is NOT in here: it is its own rail
 * above the sheet (see `Breadcrumb`), which is where the reference puts it.
 *
 * Server component. The wordmark is pre-split into `data-glyph` spans so a
 * client caller can run `wordmarkReveal()` from lib/motion-manual.ts over it
 * without re-rendering the markup.
 */

const WORDMARK = "CONNOR J. LAUGHLIN";

/** Contact target, reused from the schema module so there is one email in the tree. */
const CONTACT_HREF = personSchema.email;

type NavLink = { href: string; label: string };

/** The manual's three standing links. Exported so the chapter shell can fold
    them into its contents disclosure at widths where the masthead nav hides. */
export const MANUAL_NAV: NavLink[] = [
  { href: "/#contents", label: "Contents" },
  { href: "/resume", label: "Resume" },
  { href: CONTACT_HREF, label: "Contact" },
];

export type MastheadProps = {
  /** Chapter mode: small wordmark, breadcrumb slot instead of the tagline. */
  compact?: boolean;
  /** Full mode only. Serif tagline, right-aligned under the wordmark line. */
  tagline?: ReactNode;
  className?: string;
};

function Wordmark({ compact }: { compact: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-wordmark
      data-xray="wordmark"
      className={
        compact
          ? "font-pixel whitespace-nowrap text-[0.95rem] leading-none tracking-[0.14em] text-blueprint"
          : /* The name is one word to a reader and it has to stay one line.
               At 8vw the eighteenth glyph fell off a 390 viewport and the
               wordmark broke as `CONNOR J. LAUGHLI / N`, which is the first
               thing a phone visitor saw. The pixel face advances 0.6em plus
               0.1em of tracking, so eighteen glyphs need 12.6em: 6.6vw keeps
               that inside a 390 column and the ceiling is the size the cover
               already set at lg. */
            "font-pixel whitespace-nowrap text-[clamp(1.4rem,6.6vw,3.5rem)] leading-[0.9] tracking-[0.1em] text-blueprint"
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

/**
 * One standing-nav link. `mailto:` cannot go through the router, and both the
 * masthead and the chapter shell's contents disclosure need the same branch,
 * so it lives here beside `MANUAL_NAV` rather than twice.
 *
 * `-my-1.5 py-1.5` takes a 10px mono line to a ≥24px pointer target without
 * changing where anything prints.
 */
export function ManualNavLink({ href, label, className }: NavLink & { className?: string }) {
  const cls = `manual-link -my-1.5 inline-block py-1.5 transition-colors hover:text-blueprint ${className ?? ""}`;
  return href.startsWith("mailto:") ? (
    <a href={href} className={cls}>
      {label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

function Nav({ compact }: { compact: boolean }) {
  return (
    <nav
      aria-label="Manual navigation"
      className={`items-center gap-4 font-mono uppercase tracking-[0.2em] text-body-ink/70 ${
        compact ? "hidden text-[9px] lg:flex" : "flex text-[10px]"
      }`}
    >
      {MANUAL_NAV.map((link) => (
        <ManualNavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}

export function Masthead({ compact = false, tagline, className }: MastheadProps) {
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
          <Link href="/" aria-label="Connor J. Laughlin, cover" className="shrink-0">
            <Wordmark compact />
          </Link>
          <div className="flex items-center gap-5">
            <Nav compact />
            <ThemeToggle />
            <XRayToggle />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-6 pb-5 pt-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pt-10">
          <Link href="/" aria-label="Connor J. Laughlin, cover" className="shrink-0">
            <Wordmark compact={false} />
          </Link>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {tagline ? (
              /* Balanced so the role line stops leaving `CHICAGO.` alone on a
                 line of its own at both 390 and 1440. */
              <div className="text-balance font-serif-body text-[0.95rem] leading-snug text-body-ink lg:max-w-[38ch] lg:text-right">
                {tagline}
              </div>
            ) : null}
            <div className="flex items-center gap-5">
              <Nav compact={false} />
              <ThemeToggle />
              <XRayToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
