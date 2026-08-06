"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Chapter sidebar table of contents.
 *
 * Reference crop: `docs/superpowers/reference/chapter-1440.png`, left column —
 * numbered mono uppercase section headers ("1. PIXELS AND COLOR"), serif entry
 * links beneath each with a small bullet marker, and exactly one entry in
 * blueprint to mark the reader's position. Everything else is body ink. Blue
 * is reserved for links and labels; it never becomes a fill or a rule here.
 *
 * Two modes:
 *   - route mode (default) — the entry whose `href` equals `activeHref` is
 *     active. No JavaScript required for the active state.
 *   - anchor mode (`anchors` passed) — an in-page list rendered above the
 *     section list, with scroll-spy over the given element ids. Used by /edge,
 *     which is one long document rather than a set of routes. Consumers in
 *     pure anchor mode pass `sections={[]}`.
 *
 * The scroll-spy watches every anchor with one observer and answers from
 * measured position rather than from event order, so it resolves at the top of
 * the page, on the way back up, and inside a section taller than the band.
 *
 * Layout is the caller's job. `ChapterLayout` mounts this twice: once in a
 * sticky left column at xl+, once inside a `<details>` disclosure below xl.
 * Both instances are in the tab order and both are keyboard-operable.
 */

export type TocEntry = {
  num: string;
  title: string;
  href: string;
  dek?: string;
  words?: number;
};

export type TocSection = {
  num: number;
  title: string;
  entries: TocEntry[];
};

export type SidebarTOCProps = {
  sections: TocSection[];
  activeHref: string;
  anchors?: { id: string; label: string }[];
};

const SECTION_HEADER =
  "font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/80";

/* `py-1 -my-1` buys a ≥24px pointer target off a 13px line without opening
   the rail up: the box grows, the printed density does not. */
const LINK_BASE =
  "block -my-1 py-1 font-serif-body text-[0.8125rem] leading-snug transition-colors";

const LINK_IDLE = "text-body-ink/75 group-hover:text-blueprint";

const LINK_ACTIVE = "text-blueprint";

/** The reading line, as a fraction of viewport height. */
const READING_LINE = 0.3;

/**
 * Scroll-spy over in-page ids.
 *
 * One observer over every anchor, and the answer comes from measured position
 * rather than from which observer fired last. Event order is the wrong
 * authority: with a band this narrow two headings can sit inside it at once,
 * and scrolling up the later one wins, so the rail flickers between
 * neighbours. Reading rects instead makes the resolution monotone — the active
 * entry is the last heading above the reading line, and the first entry when
 * none is — which is also what fixes a section taller than the band and the
 * stale highlight at `scrollY = 0`.
 *
 * No-op when `ids` is empty, so the route-mode sidebar pays nothing for it.
 */
function useScrollSpy(ids: string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) return;

    const resolve = () => {
      const line = window.innerHeight * READING_LINE;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    /* The observer is a change signal, not the answer: it fires as a heading
       crosses either edge of the reading band, which brackets the line the
       resolver measures against. Rect reads happen only on those crossings,
       never on a scroll frame. */
    const observer = new IntersectionObserver(resolve, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: [0, 1],
    });
    for (const id of list) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    /* A scroll can also come to rest without crossing anything — a glide to an
       anchor lands the target above the band and generates no further event,
       which used to leave the rail one entry behind. Debounced rather than
       per-frame, so the rect reads still happen off the scroll path. */
    let settle = 0;
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(resolve, 120);
    };

    /* A deep link lands before any crossing has happened. */
    const raf = window.requestAnimationFrame(resolve);
    window.addEventListener("resize", resolve);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("resize", resolve);
      window.removeEventListener("scroll", onScroll);
    };
  }, [key]);

  return active;
}

/**
 * Position marker. A ruler rail marks a position with a tick, not with a dot,
 * so the idle state is a quarter-length stub that extends when it goes live.
 * `scaleX` on a fixed 12px bar, so nothing in the row reflows.
 */
function Marker({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-[0.85em] block h-px w-3 shrink-0 origin-left transition-[transform,background-color] ${
        active ? "scale-x-100 bg-blueprint" : "scale-x-[0.25] bg-body-ink/35 group-hover:scale-x-50"
      }`}
    />
  );
}

export function SidebarTOC({ sections, activeHref, anchors }: SidebarTOCProps) {
  const anchorIds = anchors?.map((a) => a.id) ?? [];
  const activeAnchor = useScrollSpy(anchorIds);

  return (
    <div className="flex flex-col gap-7">
      {anchors && anchors.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          <p className={SECTION_HEADER}>On this page</p>
          <ul className="flex flex-col gap-1.5">
            {anchors.map(({ id, label }) => {
              const isActive = activeAnchor === id;
              return (
                <li key={id} className="group flex items-start gap-2">
                  <Marker active={isActive} />
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`${LINK_BASE} ${isActive ? LINK_ACTIVE : LINK_IDLE}`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {sections.map((section) => (
        <div key={section.num} className="flex flex-col gap-2.5">
          <p className={SECTION_HEADER}>
            {section.num}. {section.title}
          </p>
          <ul className="flex flex-col gap-1.5">
            {section.entries.map((entry) => {
              const isActive = entry.href === activeHref;
              return (
                <li key={entry.href} className="group flex items-start gap-2">
                  <Marker active={isActive} />
                  <Link
                    href={entry.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${LINK_BASE} ${isActive ? LINK_ACTIVE : LINK_IDLE}`}
                  >
                    {/* Reference sets every sidebar entry as a sentence. */}
                    {entry.title.replace(/\.$/, "")}.
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
