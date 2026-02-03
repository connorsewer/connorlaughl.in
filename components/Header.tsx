"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/proof") return pathname === "/proof" || pathname.startsWith("/case-studies");
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] py-6">
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="skip-link font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        Skip to content
      </a>
      
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between border-b border-rule pb-4">
          <Link 
            href="/" 
            className="group flex items-baseline gap-2"
            aria-label="Connor J. Laughlin - Home"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-accent transition-colors group-hover:text-paper">
              CJL
            </span>
            <span className="font-display text-lg tracking-tight">Connor J. Laughlin</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav 
              className="flex items-center gap-8 font-mono text-[10px] tracking-[0.2em] uppercase"
              aria-label="Main navigation"
            >
              <Link
                href="/proof"
                className={`transition-colors ${
                  isActive("/proof") 
                    ? "text-accent" 
                    : "text-paper/60 hover:text-accent"
                }`}
                aria-current={isActive("/proof") ? "page" : undefined}
              >
                Index
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
