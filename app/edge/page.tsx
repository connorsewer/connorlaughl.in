import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { EdgeHero } from "@/components/edge/EdgeHero";
import { EdgeStakeBlock } from "@/components/edge/EdgeStakeBlock";
import { EdgeChapters } from "@/components/edge/EdgeChapters";
import { EdgeClosing } from "@/components/edge/EdgeClosing";
import { EdgeMobileChip } from "@/components/edge/EdgeMobileChip";
import { EdgeReadingProgress } from "@/components/edge/EdgeReadingProgress";
import { HireSignal } from "@/components/HireSignal";

export const metadata: Metadata = {
  title:
    "Edge — Taste applied at velocity | Connor J. Laughlin",
  description:
    "Eleven operating-edge skills reframed as AI-native advantages, around the umbrella thesis: taste applied at velocity.",
};

export const revalidate = 60;

/**
 * /edge — the canonical positioning route.
 *
 * Published as a single editorial essay. Hero thesis, stake block,
 * eleven numbered chapters grouped into three acts (rendered in a
 * later commit), closing pull-quote, and the standard hire-signal
 * carry. Sticky chapter index attaches in the chapter commit.
 */
export default function EdgePage() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />
      <EdgeMobileChip />
      <EdgeReadingProgress />

      <main id="main-content">
        <EdgeHero />
        <EdgeStakeBlock />
        <EdgeChapters />
        <EdgeClosing />

        <HireSignal />
      </main>

      <footer className="py-12 border-t border-rule px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 font-mono text-[9px] tracking-[0.3em] uppercase">
          <span>© 2026 Connor J. Laughlin</span>
          <span>Chicago</span>
          <span>Built in 2026</span>
        </div>
      </footer>
    </div>
  );
}
