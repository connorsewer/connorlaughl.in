"use client";

import { ReactLenis } from "lenis/react";
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
        touchMultiplier: 1.4,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
