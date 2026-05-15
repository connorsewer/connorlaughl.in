"use client";

import { animate, stagger } from "motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { availability } from "@/content/hire-signal";
import { useClientMounted } from "@/hooks/useClientMounted";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

type NavItem = { href: string; label: string; matchPrefix?: boolean };

const NAV: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case studies", matchPrefix: true },
  { href: "/resume", label: "Resume" },
  { href: "/tools/revops-capacity-planner", label: "Tools", matchPrefix: true },
  { href: "/edge", label: "Edge" },
  { href: "/journal", label: "Journal", matchPrefix: true },
];

function pillForState(state: typeof availability.state) {
  switch (state) {
    case "available":
      return {
        dot: "bg-[color:var(--terminal-green)]",
        glow: "var(--terminal-green)",
        label: "Open to roles",
      };
    case "exploring":
      return {
        dot: "bg-accent",
        glow: "var(--accent)",
        label: "Exploring fits",
      };
    case "closed":
      return {
        dot: "bg-paper/40",
        glow: "transparent",
        label: "Closed",
      };
  }
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const mounted = useClientMounted();
  const reduced = usePrefersReducedMotion();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const pill = pillForState(availability.state);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const root = document.documentElement;
    const body = document.body;
    const prevRootOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - root.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(
      () => {
        closeRef.current?.focus();
      },
      reduced ? 0 : 120,
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusables = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevRootOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevPaddingRight;
      previousFocusRef.current?.focus?.();
    };
    // handleClose is stable via useCallback below; intentionally excluded to keep effect tied to `open`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reduced]);

  useEffect(() => {
    if (!open) return;
    if (reduced) return;
    const el = overlayRef.current;
    if (!el) return;

    const topbar = el.querySelectorAll<HTMLElement>("[data-anim='topbar']");
    const rows = el.querySelectorAll<HTMLElement>("[data-anim='row']");
    const metas = el.querySelectorAll<HTMLElement>("[data-anim='meta']");
    const foot = el.querySelector<HTMLElement>("[data-anim='foot']");

    if (topbar.length) {
      animate(
        topbar,
        { opacity: [0, 1] },
        { duration: DURATION.short, ease: EASE.outQuart, delay: 0.08 },
      );
    }
    if (rows.length) {
      animate(
        rows,
        {
          opacity: [0, 1],
          transform: ["translateY(28px)", "translateY(0px)"],
        },
        {
          duration: DURATION.medium,
          ease: EASE.outQuint,
          delay: stagger(STAGGER.med, { startDelay: 0.14 }),
        },
      );
    }
    if (metas.length) {
      animate(
        metas,
        {
          opacity: [0, 1],
          transform: ["translateY(16px)", "translateY(0px)"],
        },
        {
          duration: DURATION.short,
          ease: EASE.outQuart,
          delay: stagger(STAGGER.short, { startDelay: 0.36 }),
        },
      );
    }
    if (foot) {
      animate(
        foot,
        { opacity: [0, 1] },
        { duration: DURATION.short, ease: EASE.outQuart, delay: 0.48 },
      );
    }
  }, [open, reduced]);

  const handleClose = useCallback(async () => {
    const el = overlayRef.current;
    if (reduced || !el) {
      setOpen(false);
      return;
    }

    const content = el.querySelectorAll<HTMLElement>(
      "[data-anim='topbar'], [data-anim='row'], [data-anim='meta'], [data-anim='foot']",
    );
    const scrim = el.querySelector<HTMLElement>("[data-anim='scrim']");

    try {
      if (content.length) {
        await animate(
          content,
          { opacity: 0, transform: "translateY(8px)" },
          { duration: DURATION.quick, ease: EASE.outQuart },
        );
      }
      if (scrim) {
        await animate(
          scrim,
          { opacity: 0 },
          { duration: DURATION.quick, ease: EASE.outQuart },
        );
      }
    } catch {
      /* animation interrupted by unmount — fall through */
    }
    setOpen(false);
  }, [reduced]);

  const onLinkActivate = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-paper/70 hover:text-accent transition-colors inline-flex items-center gap-2"
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true" className="text-accent">
          ▢
        </span>
        Menu
      </button>

      {mounted && open
        ? createPortal(
            <div
              ref={overlayRef}
              id="mobile-nav-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-0 z-[80] md:hidden flex flex-col"
            >
              <div
                data-anim="scrim"
                aria-hidden="true"
                className="absolute inset-0 bg-ink"
              />

              <div
                data-anim="topbar"
                className="relative shrink-0 px-6 py-5 border-b border-rule"
                style={{ opacity: reduced ? 1 : 0 }}
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-pixel text-[11px] tracking-[0.3em] text-accent">
                      CJL
                    </span>
                    <span className="font-display text-lg tracking-tight text-paper">
                      Connor J. Laughlin
                    </span>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={handleClose}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/70 hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    Close
                    <span aria-hidden="true" className="text-accent text-base leading-none">
                      ×
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-y-auto overscroll-contain">
                <div className="px-6 pt-10 pb-12">
                  <p
                    data-anim="row"
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45 mb-6"
                    style={{ opacity: reduced ? 1 : 0 }}
                  >
                    Index
                    <span aria-hidden="true" className="text-paper/25 mx-2">
                      ·
                    </span>
                    Site map
                  </p>

                  <nav
                    aria-label="Mobile navigation"
                    className="border-t border-rule"
                  >
                    {NAV.map(({ href, label, matchPrefix }, i) => {
                      const active = matchPrefix
                        ? pathname.startsWith(href.split("#")[0])
                        : pathname === href;
                      const num = String(i + 1).padStart(2, "0");
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={onLinkActivate}
                          aria-current={active ? "page" : undefined}
                          data-anim="row"
                          className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 border-b border-rule"
                          style={{ opacity: reduced ? 1 : 0 }}
                        >
                          <span
                            className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                              active ? "text-accent" : "text-paper/40"
                            } group-hover:text-accent`}
                          >
                            {num}
                          </span>
                          <span
                            className={`font-display leading-[0.96] tracking-tight transition-colors ${
                              active ? "text-accent" : "text-paper"
                            } group-hover:text-accent`}
                            style={{
                              fontSize: "clamp(2.25rem, 10vw, 3.5rem)",
                            }}
                          >
                            {label}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                              active ? "text-accent" : "text-paper/35"
                            } group-hover:translate-x-1 group-hover:text-accent`}
                          >
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-12 grid grid-cols-1 gap-y-8">
                    <div
                      data-anim="meta"
                      style={{ opacity: reduced ? 1 : 0 }}
                    >
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45 mb-3">
                        Status
                      </p>
                      <Link
                        href="/#hire-signal"
                        onClick={onLinkActivate}
                        className="inline-flex items-center gap-3 font-display text-xl text-paper hover:text-accent transition-colors"
                      >
                        <span
                          aria-hidden="true"
                          className={`relative inline-block w-2.5 h-2.5 rounded-full ${pill.dot}`}
                          style={{ boxShadow: `0 0 12px ${pill.glow}` }}
                        >
                          <span
                            className={`absolute inset-0 rounded-full ${pill.dot} opacity-90 motion-safe:animate-ping`}
                          />
                        </span>
                        <span>{pill.label}</span>
                      </Link>
                      <p className="mt-2 text-sm leading-snug text-paper/65 max-w-[38ch]">
                        {availability.line}
                      </p>
                    </div>

                    <div
                      data-anim="meta"
                      style={{ opacity: reduced ? 1 : 0 }}
                    >
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45 mb-3">
                        Mode
                      </p>
                      <ThemeToggle />
                    </div>

                    <div
                      data-anim="meta"
                      style={{ opacity: reduced ? 1 : 0 }}
                    >
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45 mb-3">
                        Contact
                      </p>
                      <a
                        href="mailto:connor.laughlin@gmail.com"
                        className="font-display text-xl text-paper hover:text-accent transition-colors"
                      >
                        connor.laughlin@gmail.com
                      </a>
                    </div>
                  </div>

                  <p
                    data-anim="foot"
                    style={{ opacity: reduced ? 1 : 0 }}
                    className="mt-14 pt-6 border-t border-rule font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45"
                  >
                    [Fig. 00] Site index
                    <span aria-hidden="true" className="text-paper/25 mx-1.5">
                      ·
                    </span>
                    six pages
                  </p>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
