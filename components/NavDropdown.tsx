"use client";

import { animate } from "motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { DURATION, EASE } from "@/lib/motion";

export type NavItem = {
  href: string;
  label: string;
  matchPrefix?: boolean;
};

function isActive(item: NavItem, pathname: string): boolean {
  return item.matchPrefix
    ? pathname.startsWith(item.href.split("#")[0])
    : pathname === item.href;
}

type Props = {
  /** Stable identifier shared with the parent's openId state. */
  id: string;
  /** Trigger label, rendered in the existing mono nav register. */
  label: string;
  items: NavItem[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

const HOVER_CLOSE_DELAY = 140;

export function NavDropdown({ id, label, items, openId, setOpenId }: Props) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const open = openId === id;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const openIdRef = useRef(openId);
  openIdRef.current = openId;

  const groupActive = items.some((i) => isActive(i, pathname));

  // Close on route change.
  useEffect(() => {
    if (open) setOpenId(null);
    // We want this to run on pathname change only — closing here lets a click
    // on a menu item dismiss the dropdown after navigation completes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Click outside + Escape.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        triggerRef.current?.contains(t) === false &&
        panelRef.current?.contains(t) === false
      ) {
        setOpenId(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenId(null);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpenId]);

  // Panel reveal animation.
  useEffect(() => {
    if (!open || reduced) return;
    const panel = panelRef.current;
    if (!panel) return;
    animate(
      panel,
      {
        opacity: [0, 1],
        transform: ["translateY(-6px)", "translateY(0px)"],
      },
      { duration: DURATION.quick, ease: EASE.outQuart },
    );
  }, [open, reduced]);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      // Only close if this dropdown is still the open one. If the parent has
      // already moved openId to another dropdown, leave it alone.
      if (openIdRef.current === id) setOpenId(null);
    }, HOVER_CLOSE_DELAY);
  };

  return (
    <div
      className="relative pb-3 -mb-3"
      onMouseEnter={() => {
        cancelClose();
        setOpenId(id);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors inline-flex items-center gap-1.5 ${
          groupActive || open
            ? "text-accent"
            : "text-paper/65 hover:text-accent"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpenId(open ? null : id)}
        onFocus={() => {
          cancelClose();
          setOpenId(id);
        }}
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          className={`text-[8px] leading-none transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="menu"
          aria-label={label}
          className="absolute top-full left-0 min-w-[13rem] border border-rule bg-ink py-2 z-[70]"
          style={{
            opacity: reduced ? 1 : 0,
            boxShadow: "0 8px 24px var(--dither-shadow)",
          }}
        >
          {items.map((item) => {
            const active = isActive(item, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                onClick={() => setOpenId(null)}
                className={`block px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  active
                    ? "text-accent"
                    : "text-paper/70 hover:text-accent hover:bg-paper/[0.04]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
