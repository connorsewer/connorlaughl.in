"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-[60]">
      <a
        href="#main-content"
        className="skip-link font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between gap-6">
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

          <div className="flex items-center gap-7">
            <nav
              className="hidden md:flex items-center gap-7 font-mono text-[10px] tracking-[0.2em] uppercase"
              aria-label="Main navigation"
            >
              <Link
                href="/about"
                className={`transition-colors ${
                  pathname === "/about"
                    ? "text-accent"
                    : "text-paper/65 hover:text-accent"
                }`}
                aria-current={pathname === "/about" ? "page" : undefined}
              >
                About
              </Link>
              <Link
                href="/case-studies"
                className={`transition-colors ${
                  pathname.startsWith("/case-studies")
                    ? "text-accent"
                    : "text-paper/65 hover:text-accent"
                }`}
                aria-current={
                  pathname.startsWith("/case-studies") ? "page" : undefined
                }
              >
                Case studies
              </Link>
              <Link
                href="/#contact"
                className="text-paper/65 hover:text-accent transition-colors"
              >
                Contact
              </Link>
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
