"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Global Lenis smooth-scroll. Mounts ReactLenis at the root of the tree.
 *
 * Reduced motion: bypasses Lenis entirely and renders children plain so
 * native browser scrolling is used.
 *
 * Easing is exponential out (the same curve as motion.dev's `outExpo`).
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
      }}
    >
      <AnchorGlide />
      {children}
    </ReactLenis>
  );
}

/** Clearance under the compact masthead, in px. */
const ANCHOR_OFFSET = -96;

/**
 * Hands same-page hash links to Lenis.
 *
 * `lenis/dist/lenis.css` forces `scroll-behavior: auto !important` on `html`,
 * so without this every in-page anchor — the cover contents link, the colophon,
 * the eleven sidebar anchors on the essays route — jumps instantly while the
 * rest of the document glides. One behaviour is fine; two is a fault.
 *
 * The skip link is excluded on purpose: landing at once is the accessibility
 * contract there, not a rough edge. Cross-route hashes are left to the router.
 *
 * Capture phase, so a `next/link` never gets to run its own navigation for a
 * hash that resolves on the page already showing.
 *
 * Reduced motion: this only mounts inside the Lenis branch, which reduced-motion
 * readers never reach, so they keep the native instant jump.
 */
function AnchorGlide() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#main-content") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (url.hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      lenis.scrollTo(target, { offset: ANCHOR_OFFSET });
      window.history.pushState(null, "", url.hash);

      /* Native hash navigation moves focus as well as the viewport. Doing the
         scroll by hand means doing the focus by hand, or a keyboard reader
         glides somewhere and then tabs from where they were. */
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
          once: true,
        });
      }
      (target as HTMLElement).focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}
