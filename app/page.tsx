import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HeroSignature } from "@/components/HeroSignature";
import { SplitText } from "@/components/SplitText";
import { ImpactLedger } from "@/components/ImpactLedger";
import { FigureMarquee } from "@/components/FigureMarquee";
import { Magnetic } from "@/components/Magnetic";
import { JsonLd, personSchema } from "@/components/JsonLd";
import { CountUp } from "@/components/CountUp";
import { HireSignal } from "@/components/HireSignal";
import { NowFeed } from "@/components/NowFeed";
import {
  hero,
  whatIBuild,
  impactLedgerCopy,
  signatureSystems,
  contact,
  timeline,
} from "@/content/homepage-copy";
import { heroProofStrip } from "@/content/proof-metrics";
import { getSignatureCaseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title:
    "Connor J. Laughlin | VP of Marketing & GTM (acting CMO), GTM Engineer",
  description:
    "Connor J. Laughlin is a Chicago-based VP of Marketing & GTM (acting CMO) and GTM Engineer who built revenue infrastructure, RevOps systems, governed AI workflows, and executive reporting behind $159.4M in influenced pipeline.",
};

export const revalidate = 60;

export default function Home() {
  const signatureCases = getSignatureCaseStudies();

  return (
    <div className="selection:bg-accent selection:text-ink">
      <JsonLd data={personSchema} />
      <Header />

      <main id="main-content">
        {/* HERO ============================================== */}
        <section
          aria-labelledby="hero-heading"
          className="min-h-screen px-6 pt-32 pb-20 relative overflow-hidden"
        >
          <div className="mx-auto max-w-6xl w-full relative">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              {/* Text, cols 1-6 */}
              <div className="lg:col-span-6 flex flex-col gap-10">
                <div className="animate-fade-in">
                  <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase">
                    {hero.eyebrow}
                  </span>
                </div>

                <SplitText
                  as="h1"
                  granularity="word"
                  className="font-display font-black text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[0.92] tracking-tight text-balance"
                  style={{ marginBottom: 0 }}
                >
                  {hero.headlinePrimary}
                </SplitText>

                <div className="space-y-5 animate-slide-up delay-200">
                  <p className="text-lg md:text-xl text-paper/75 max-w-xl leading-relaxed text-balance">
                    {hero.subheadPart1}
                  </p>
                  <p className="text-base md:text-lg text-paper/60 max-w-xl leading-relaxed">
                    {hero.subheadPart2}
                  </p>
                </div>

                {/* 5-stat proof strip with count-up motion */}
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 mt-2 animate-slide-up delay-300">
                  {heroProofStrip.map((stat, idx) => (
                    <li
                      key={stat.label}
                      className="border-l-2 border-rule pl-4 hover:border-accent transition-colors"
                    >
                      <span className="font-display text-2xl md:text-3xl block leading-tight tabular-nums">
                        <CountUp value={stat.value} delayMs={idx * 90} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-paper/55 uppercase block mt-1 leading-snug">
                        {stat.label}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.15em] text-paper/40 block mt-1 leading-snug">
                        {stat.context}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 mt-4 animate-slide-up delay-400">
                  <Magnetic>
                    <a
                      href={hero.primaryCta.href}
                      data-cursor="talk"
                      className="cta-scan font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-7 py-3.5 rounded-full hover:bg-paper transition-colors inline-block"
                    >
                      {hero.primaryCta.text}
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={hero.secondaryCta.href}
                      data-cursor="read"
                      className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-7 py-3.5 rounded-full hover:border-accent transition-colors inline-block"
                    >
                      {hero.secondaryCta.text}
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Signature WebGL rolodex, cols 7-12. Mouse-driven dither swell
                  on three base-art plates, dither-sweep crossfade every 5s.
                  Reduced motion shows the first plate as a static image. */}
              <div className="lg:col-span-6 lg:col-start-7 animate-fade-in delay-500">
                <HeroSignature
                  intervalSec={5}
                  aspect="16 / 9"
                  slides={[
                    {
                      src: "/hero/bdr-pod-base.webp",
                      alt: "BDR Pod signal-to-meeting system diagram, isometric technical drawing",
                      fig: "[Fig. 04]",
                      caption: "BDR Pod, signal-to-meeting system",
                    },
                    {
                      src: "/hero/mainframe-base.webp",
                      alt: "1970s mainframe terminal with operator, dithered halftone photograph",
                      fig: "[Fig. 08]",
                      caption: "AI operating system, 22-agent governance",
                    },
                    {
                      src: "/hero/org-chart-base.webp",
                      alt: "Marketing organization design blueprint, hierarchical box diagram",
                      fig: "[Fig. 06]",
                      caption: "Marketing org design, near-$0 to board",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-fade-in delay-1000 hidden lg:block">
            <div className="w-px h-14 bg-gradient-to-b from-paper/40 to-transparent" />
          </div>
        </section>

        {/* FIGURE MARQUEE ===========================================
            Press-release ticker of the work and the numbers underneath
            it. Stock-ticker cadence, paused on hover, reduced-motion safe. */}
        <FigureMarquee
          durationSec={42}
          items={[
            { fig: "[Fig. 01]", label: "Connor J. Laughlin, VP Marketing and GTM" },
            { fig: "$159.4M", label: "marketing-influenced pipeline" },
            { fig: "[Fig. 04]", label: "BDR Pod, signal to meeting in 2h" },
            { fig: "$52.5M", label: "net-new revenue contribution" },
            { fig: "[Fig. 08]", label: "AI operating system, 22 agents" },
            { fig: "35+", label: "RevOps KPI framework" },
            { fig: "[Fig. 06]", label: "Marketing org, near-$0 to board" },
            { fig: "7", label: "acquisitions integrated" },
            { fig: "[Fig. 05]", label: "Outcome-first messaging architecture" },
            { fig: "+1,073%", label: "MQL growth from baseline" },
            { fig: "[Fig. 07]", label: "GA4 governance, exploded view" },
            { fig: "$25M+", label: "margin contribution" },
          ]}
        />

        {/* WHAT I BUILD ============================================= */}
        <section
          aria-labelledby="what-i-build-heading"
          className="px-6 py-24 border-t border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 mb-14">
              <div className="lg:col-span-5">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  {whatIBuild.eyebrow}
                </span>
                <h2
                  id="what-i-build-heading"
                  className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
                >
                  {whatIBuild.heading}
                </h2>
              </div>
              <p className="lg:col-span-6 lg:col-start-7 text-paper/70 text-lg leading-relaxed self-end">
                {whatIBuild.intro}
              </p>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-rule">
              {whatIBuild.cards.map((card, i) => (
                <li
                  key={card.title}
                  className="bg-ink p-7 hover:bg-paper/[0.02] transition-colors flex flex-col gap-4"
                >
                  <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-paper/60 text-sm leading-relaxed">
                    {card.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* IMPACT LEDGER ===========================================
            The prior "Built from zero" section was deleted in B.4: its
            four bullets duplicated content the impact ledger and case
            studies already carry. The body line below preserves the
            "from near-zero" framing as a tight editorial intro. */}
        <section
          id="impact-ledger"
          aria-labelledby="impact-ledger-heading"
          className="px-6 py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 mb-14">
              <div className="lg:col-span-6">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  {impactLedgerCopy.eyebrow}
                </span>
                <h2
                  id="impact-ledger-heading"
                  className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
                >
                  {impactLedgerCopy.heading}
                </h2>
              </div>
              <p className="lg:col-span-5 lg:col-start-8 text-paper/65 text-lg leading-relaxed self-end">
                {impactLedgerCopy.intro}
              </p>
            </div>

            <ImpactLedger />
          </div>
        </section>

        {/* SIGNATURE SYSTEMS ======================================= */}
        <section
          id="systems"
          aria-labelledby="systems-heading"
          className="px-6 py-28 bg-paper/[0.02] border-y border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 mb-14">
              <div className="lg:col-span-6">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  {signatureSystems.eyebrow}
                </span>
                <h2
                  id="systems-heading"
                  className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
                >
                  {signatureSystems.heading}
                </h2>
              </div>
              <p className="lg:col-span-5 lg:col-start-8 text-paper/65 text-lg leading-relaxed self-end">
                {signatureSystems.intro}
              </p>
            </div>

            <ol className="grid md:grid-cols-2 gap-5">
              {signatureCases.map((cs, i) => (
                <li key={cs.slug}>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    data-cursor="open"
                    className="group flex flex-col gap-5 p-7 border border-rule hover:border-accent transition-colors h-full"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="status-pill pixel-flicker">
                        {cs.label}
                      </span>
                    </div>
                    <h3
                      className="font-display text-2xl md:text-[1.65rem] group-hover:text-accent transition-colors text-balance leading-tight"
                      style={{ viewTransitionName: `case-title-${cs.slug}` }}
                    >
                      {cs.title}
                    </h3>
                    <p className="text-paper/75 text-base leading-relaxed italic">
                      {cs.hook}
                    </p>
                    <dl className="grid grid-cols-1 gap-3 text-sm">
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase mb-1">
                          The problem
                        </dt>
                        <dd className="text-paper/70 leading-relaxed">
                          {cs.businessProblem}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase mb-1">
                          What I built
                        </dt>
                        <dd className="text-paper/70 leading-relaxed">
                          {cs.whatIBuilt}
                        </dd>
                      </div>
                    </dl>
                    <ul className="mt-1 flex flex-wrap gap-2 pt-2 border-t border-rule/60">
                      {cs.proofMetrics.slice(0, 3).map((m) => (
                        <li
                          key={`${cs.slug}-${m.label}`}
                          className="font-mono text-[10px] tracking-[0.12em] text-accent border border-rule/80 px-2.5 py-1 rounded-full"
                        >
                          {m.value} {m.label}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.22em] text-paper/55 uppercase">
                        What it proves
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.22em] text-accent">
                        Open <span aria-hidden="true">→</span>
                      </span>
                    </div>
                    <p className="text-paper/65 text-sm leading-relaxed -mt-3">
                      {cs.whatItProves}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex justify-end">
              <Link
                href="/case-studies"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent hover:text-paper transition-colors inline-flex items-center gap-2 link-editorial"
              >
                See all case studies <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT TEASER ============================================ */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-28 px-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  About
                </span>
                <h2
                  id="about-heading"
                  className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
                >
                  Connor J. Laughlin.
                </h2>
                <p className="font-mono text-[10px] tracking-[0.3em] text-paper/45 uppercase mt-6">
                  Chicago · VP of Marketing & GTM (acting CMO)
                </p>
              </div>

              <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-paper/75 text-lg leading-relaxed">
                <p>
                  Santa Clara Finance taught me how to build the model. Northwestern Journalism taught me how to tell the story. Together they let me design revenue architectures that hold up under analytical pressure and read well to a buyer.
                </p>
                <p>
                  The path was not a straight line. Business development at the Vatican Museums. Executive search at Reilly Partners. Content at Brad&apos;s Deals when it had 10 million monthly visitors. Then more than a decade at TSI inside a roughly $460M PE-backed enterprise, building the GTM operating layer from first digital hire to VP of Marketing & GTM (acting CMO).
                </p>
                <p>
                  <Link href="/about" className="text-accent link-editorial">
                    The personal version lives here
                  </Link>
                  . Kristin. Three dogs. A big family. Football, golf, cooking, travel.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 mt-16">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  Education
                </span>
                <ul className="space-y-5 text-sm">
                  <li className="border-l-2 border-rule pl-4">
                    <p className="font-display text-lg leading-tight">Santa Clara University</p>
                    <p className="text-paper/55 mt-1">B.S., Finance · Leavey School of Business</p>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-paper/40 uppercase mt-1">2006 to 2009</p>
                  </li>
                  <li className="border-l-2 border-rule pl-4">
                    <p className="font-display text-lg leading-tight">Northwestern University</p>
                    <p className="text-paper/55 mt-1">Medill School of Journalism · coursework</p>
                  </li>
                </ul>
                <ul className="flex flex-wrap gap-2 mt-6">
                  {["English (native)", "Italian", "Spanish"].map((lang) => (
                    <li key={lang} className="status-pill">
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  Career timeline
                </span>
                <ol className="space-y-px bg-rule">
                  {timeline.map((t, i) => (
                    <li
                      key={`${t.year}-${t.role}`}
                      className="bg-ink p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 hover:bg-paper/[0.02] transition-colors"
                    >
                      <span className="font-pixel text-[11px] tracking-[0.15em] text-accent shrink-0 md:w-12">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-paper/55 uppercase shrink-0 md:w-32">
                        {t.year}
                      </span>
                      <span className="font-display text-base md:text-lg flex-1">
                        {t.role}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-paper/55 uppercase">
                        {t.company}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* NOW ============================================= */}
        <NowFeed />

        {/* HIRE SIGNAL ============================================= */}
        <HireSignal />

        {/* CONTACT ================================================== */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-28 px-6 bg-paper/[0.02] border-t border-rule"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-8 uppercase block">
              {contact.eyebrow}
            </span>
            <h2
              id="contact-heading"
              className="font-display text-5xl md:text-6xl mb-8 leading-[1.05] text-balance"
            >
              {contact.heading}
            </h2>
            <p className="text-paper/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {contact.body}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href={contact.primaryCta.href}
                className="cta-scan font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-10 py-4 rounded-full hover:bg-paper transition-colors"
              >
                {contact.primaryCta.text}
              </a>
              <a
                href={contact.secondaryCta.href}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/70 hover:text-accent transition-colors px-6 py-4"
              >
                {contact.secondaryCta.text} <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="mt-8 text-paper/55 text-sm leading-relaxed max-w-xl mx-auto">
              {contact.advisoryLine}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/40">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                LinkedIn <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </section>

        <footer className="py-12 border-t border-rule px-6">
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 font-mono text-[9px] tracking-[0.3em] uppercase">
            <span>© 2026 Connor J. Laughlin</span>
            <span>Chicago</span>
            <span>Built in 2026</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
