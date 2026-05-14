"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { availability } from "@/content/hire-signal";

type NavItem = { href: string; label: string; matchPrefix?: boolean };

const NAV: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case studies", matchPrefix: true },
  { href: "/resume", label: "Resume" },
  { href: "/tools/revops-capacity-planner", label: "Tools", matchPrefix: true },
  { href: "/#contact", label: "Contact" },
];

function pillForState(state: typeof availability.state) {
  switch (state) {
    case "available":
      return { dot: "bg-[color:var(--terminal-green)]", label: "Open to roles" };
    case "exploring":
      return { dot: "bg-accent", label: "Exploring fits" };
    case "closed":
      return { dot: "bg-paper/40", label: "Closed" };
  }
}

export function Header() {
  const pathname = usePathname();
  const pill = pillForState(availability.state);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-[60]">
      <a
        href="#main-content"
        className="skip-link font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between gap-5">
          <Link
            href="/"
            className="group flex items-baseline gap-2 shrink-0"
            aria-label="Connor J. Laughlin, home"
          >
            <span className="font-pixel text-[11px] tracking-[0.3em] text-accent transition-colors group-hover:text-paper">
              CJL
            </span>
            <span className="font-display text-lg tracking-tight">
              Connor J. Laughlin
            </span>
          </Link>

          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href="/#hire-signal"
              className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-paper/70 hover:text-paper transition-colors"
              aria-label={`Availability status: ${pill.label}`}
            >
              <span
                className={`relative inline-block w-2 h-2 rounded-full ${pill.dot}`}
                aria-hidden="true"
              >
                <span
                  className={`absolute inset-0 rounded-full ${pill.dot} opacity-60 motion-safe:animate-ping`}
                />
              </span>
              <span>{pill.label}</span>
            </Link>

            <span
              aria-hidden="true"
              className="hidden md:inline-block w-px h-4 bg-rule"
            />

            <nav
              className="hidden md:flex items-center gap-4 lg:gap-6 font-mono text-[10px] tracking-[0.2em] uppercase"
              aria-label="Main navigation"
            >
              {NAV.map(({ href, label, matchPrefix }) => {
                const active = matchPrefix
                  ? pathname.startsWith(href.split("#")[0])
                  : pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`transition-colors ${
                      active
                        ? "text-accent"
                        : "text-paper/65 hover:text-accent"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <span
              aria-hidden="true"
              className="hidden md:inline-block w-px h-4 bg-rule"
            />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
