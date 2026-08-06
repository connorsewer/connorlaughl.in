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
 * The scroll-spy is the `CaseStudyTOC` observer, unchanged: one
 * IntersectionObserver per id with a `-30% 0px -60% 0px` rootMargin, so a
 * heading lights up once it reaches the upper third of the viewport.
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

const LINK_BASE =
  "block font-serif-body text-[0.8125rem] leading-snug transition-colors";

const LINK_IDLE = "text-body-ink/75 hover:text-blueprint";

const LINK_ACTIVE = "text-blueprint";

/**
 * Scroll-spy over in-page ids. Returns the id nearest the reading position, or
 * the first id before any observer has fired. No-op when `ids` is empty, so the
 * route-mode sidebar pays nothing for it.
 */
function useScrollSpy(ids: string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) return;

    const observers: IntersectionObserver[] = [];
    for (const id of list) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [key]);

  return active;
}

function Marker({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-[0.5em] block h-[3px] w-[3px] shrink-0 rounded-full transition-colors ${
        active ? "bg-blueprint" : "bg-body-ink/35"
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
                <li key={id} className="flex items-start gap-2">
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
                <li key={entry.href} className="flex items-start gap-2">
                  <Marker active={isActive} />
                  <Link
                    href={entry.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${LINK_BASE} ${isActive ? LINK_ACTIVE : LINK_IDLE}`}
                  >
                    {entry.title}
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
