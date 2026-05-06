"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] border-b border-rule bg-ink/92 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink/82 sm:py-4">
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="skip-link font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        Skip to content
      </a>
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex min-w-0 items-baseline gap-1.5 sm:gap-2"
            aria-label="Connor J. Laughlin - Home"
          >
            <span className="shrink-0 font-mono text-[10px] tracking-[0.26em] text-accent transition-colors group-hover:text-paper sm:text-[11px] sm:tracking-[0.3em]">
              CJL
            </span>
            <span className="truncate font-display text-lg tracking-tight sm:text-xl">Connor J. Laughlin</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav 
              className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.2em] uppercase"
              aria-label="Main navigation"
            >
              <Link
                href="/case-studies"
                className={`transition-colors ${
                  pathname.startsWith("/case-studies")
                    ? "text-accent" 
                    : "text-paper/60 hover:text-accent"
                }`}
                aria-current={pathname.startsWith("/case-studies") ? "page" : undefined}
              >
                Case studies
              </Link>
              <Link
                href="/#contact"
                className="text-paper/60 hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
