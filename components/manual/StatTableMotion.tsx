"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { statFill, statTick } from "@/lib/motion-manual";

/**
 * Client wrapper that animates a `StatTable`.
 *
 * The table itself stays a server component and still never imports
 * `content/proof-metrics`: the caller resolves every gated value through
 * `renderableProofMetrics()` and passes strings in, and this wrapper only
 * reads what the server already rendered. It adds no markup a reader can see
 * and no width of its own.
 *
 * Two runners, both from lib/motion-manual.ts. `statFill` staggers the rows in
 * on entry; `statTick` counts the numeric readouts up to the strings that are
 * already in the DOM and then writes those strings back verbatim. Neither one
 * can produce a number the server did not send.
 *
 * Reduced motion: both runners return without registering an observer, and
 * every row is already at its final state, showing its final value.
 */
export function StatTableMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stopFill = statFill(ref.current);
    const stopTick = statTick(ref.current);
    return () => {
      stopFill();
      stopTick();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
