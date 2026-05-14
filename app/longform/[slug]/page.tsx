import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { renderMarkdown } from "@/lib/markdown";
import {
  longformMap,
  longformSlugs,
  readLongform,
} from "@/content/longform-map";

const TITLE_MAP: Record<string, { title: string; deck: string }> = {
  "revenue-operating-system-from-zero": {
    title: "Revenue Operating System from Zero",
    deck: "The full walk-through of how I built the GTM infrastructure behind $159.4M in influenced pipeline.",
  },
  "signal-based-demand-engine": {
    title: "Signal-Based Demand Engine",
    deck: "How I turned website signals into a sales-action workflow with a 2-hour SLA.",
  },
  "outcome-first-narrative-architecture": {
    title: "Outcome-First Narrative Architecture",
    deck: "The system behind a messaging rebuild across five regulated business lines.",
  },
  "post-acquisition-saas-bridge": {
    title: "Post-Acquisition SaaS GTM Bridge",
    deck: "How an acquired SaaS capability got positioned, sold, and connected to the platform story.",
  },
};

export async function generateStaticParams() {
  return longformSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = TITLE_MAP[slug];
  if (!meta) {
    return { title: "Long form not found | Connor J. Laughlin" };
  }
  return {
    title: `${meta.title} (long form) | Connor J. Laughlin`,
    description: meta.deck,
  };
}

export default async function LongformPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const md = readLongform(slug);
  if (!md) return notFound();
  const meta = TITLE_MAP[slug];

  return (
    <div className="min-h-screen">
      <Header />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-6 pt-10 md:pt-14 pb-24"
      >
        <article className="rounded-3xl border border-rule bg-ink/35 px-6 md:px-10 py-10 md:py-12">
          <header className="flex items-center justify-between gap-6 flex-wrap">
            <Link
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/70 hover:text-paper transition-colors"
              href="/case-studies"
            >
              <span aria-hidden="true">←</span> Case studies
            </Link>
            <span className="status-pill pixel-flicker">Long form</span>
          </header>

          <div className="mt-8">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-accent">
              {meta?.title ? "Long form" : "Reading"}
            </span>
            {meta ? (
              <>
                <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-balance">
                  {meta.title}
                </h1>
                <p className="mt-4 text-paper/75 text-lg leading-relaxed italic">
                  {meta.deck}
                </p>
              </>
            ) : null}
          </div>

          <div className="rule mt-8" role="separator" />

          <div className="mt-8">{renderMarkdown(md)}</div>

          <div className="rule mt-12" role="separator" />

          <section className="mt-8 flex flex-col md:flex-row gap-4">
            <Link
              href="/#contact"
              className="cta-scan font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-7 py-3.5 rounded-full hover:bg-paper transition-colors text-center"
            >
              Talk about a role
            </Link>
            <Link
              href="/case-studies"
              className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-7 py-3.5 rounded-full hover:border-accent hover:text-accent transition-colors text-center text-paper/85"
            >
              Back to case studies
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

void longformMap;
