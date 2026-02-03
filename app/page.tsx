import { client } from "@/lib/sanity";
import {
  heroContentQuery,
  featuredCaseStudiesQuery,
  proofPointsQuery,
  servicesQuery,
} from "@/lib/queries";
import { Header } from "@/components/Header";
import { ProofExplorer } from "@/components/ProofExplorer";
import { urlFor } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connor Laughlin | VP Marketing & GTM Systems Architect",
  description:
    "I build revenue systems that actually work. Operating proof: $15M+ influenced pipeline, 300% inbound growth, and AI-native GTM systems.",
};

export const revalidate = 60;

export default async function Home() {
  const hero = await client.fetch(heroContentQuery);
  const caseStudies = await client.fetch(featuredCaseStudiesQuery);
  const proofPoints = await client.fetch(proofPointsQuery);
  const services = await client.fetch(servicesQuery);

  // Fallback content if Sanity returns null
  const headline = hero?.headline || "I build revenue systems that actually work.";
  const subheadline =
    hero?.subheadline ||
    "Not decks. Not theory. Operating proof: $15M+ influenced pipeline, 300% inbound growth, and AI-native GTM systems.";
  const tagline = hero?.tagline || "VP Marketing @ TSI • GTM Systems Architect";
  const stats = hero?.stats || [
    { value: "$15M+", label: "Influenced Pipeline" },
    { value: "300%", label: "Inbound Growth" },
    { value: "40-60", label: "Meetings/Month" },
    { value: "2hr", label: "Signal-to-Meeting SLA" },
  ];
  const primaryCTA = hero?.primaryCTA || { text: "See Operating Proof →", link: "/case-studies" };
  const secondaryCTA = hero?.secondaryCTA || { text: "By The Numbers", link: "#proof" };

  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content">
        {/* DYNAMIC HERO SECTION */}
        <section
          aria-labelledby="hero-heading"
          className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-paper/5 pointer-events-none" />

          <div className="mx-auto max-w-6xl w-full relative">
            {/* Top tagline */}
            <div className="animate-fade-in">
              <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-6 uppercase block">
                {tagline}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
              {/* Main headline */}
              <div className="max-w-4xl">
                <h1
                  id="hero-heading"
                  className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-tight mb-8"
                >
                  <span className="block animate-slide-up">{headline}</span>
                </h1>

                <p className="text-xl md:text-2xl text-paper/60 max-w-2xl leading-relaxed text-balance animate-slide-up delay-200">
                  {subheadline}
                </p>

                {/* CTA Row */}
                <div className="flex flex-wrap gap-4 mt-10 animate-slide-up delay-400">
                  <a
                    href={primaryCTA.link}
                    className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-8 py-4 rounded-full hover:bg-paper transition-all"
                  >
                    {primaryCTA.text}
                  </a>
                  <a
                    href={secondaryCTA.link}
                    className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-8 py-4 rounded-full hover:border-accent transition-all"
                  >
                    {secondaryCTA.text}
                  </a>
                </div>
              </div>

              {/* Stats grid */}
              <aside className="flex flex-col gap-6 lg:w-72 animate-slide-in-right delay-300">
                {stats.map((stat: any, i: number) => (
                  <div
                    key={stat.label}
                    className="group border-l-2 border-rule hover:border-accent pl-4 transition-all"
                  >
                    <span className="font-display text-4xl group-hover:text-accent transition-colors">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-paper/40 uppercase block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </aside>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-1000">
            <div className="w-px h-16 bg-gradient-to-b from-paper/40 to-transparent" />
          </div>
        </section>

        {/* PROOF SECTION - The Story */}
        <section
          id="proof"
          className="py-32 px-6 bg-paper/[0.02] border-y border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  Operating Proof
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                  Systems I&apos;ve built
                  <br />
                  <span className="text-accent italic">
                    and the outcomes they produced.
                  </span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-paper/60 text-lg">
                  These aren&apos;t aspirational slides. These are governed systems
                  with enforced SLAs, audit trails, and measured outcomes. Built
                  under real constraints at real scale.
                </p>
              </div>
            </div>

            {/* Proof Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {proofPoints?.length > 0 ? (
                proofPoints.map((point: any) => (
                  <div
                    key={point._id}
                    className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]"
                  >
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      {point.metric}
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-paper/50 text-sm">{point.description}</p>
                  </div>
                ))
              ) : (
                // Fallback proof points
                <>
                  <div className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      212% pipeline growth
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      BDR Pod Transformation
                    </h3>
                    <p className="text-paper/50 text-sm">
                      Scaled from 1 to 4 signal-driven squads with 2-hour SLA
                    </p>
                  </div>
                  <div className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      10% payment lift
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      Outcome-First Repositioning
                    </h3>
                    <p className="text-paper/50 text-sm">
                      Repositioned 6 business units from service to outcome
                      language
                    </p>
                  </div>
                  <div className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      40% cycle reduction
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      AI-Native GTM Engine
                    </h3>
                    <p className="text-paper/50 text-sm">
                      Governed RFP automation with 99%+ compliance accuracy
                    </p>
                  </div>
                  <div className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      200+/yr output
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      Two-Function Marketing
                    </h3>
                    <p className="text-paper/50 text-sm">
                      7-day brief-to-ship SLA with governed workflow
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/case-studies"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent hover:text-paper transition-colors inline-flex items-center gap-2"
              >
                View Full Case Studies <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* WHAT I DO SECTION */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                Services
              </span>
              <h2 className="font-display text-4xl md:text-5xl">
                What I Actually Do
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services?.length > 0 ? (
                services.map((service: any) => (
                  <div
                    key={service._id}
                    className="p-6 border-l-2 border-rule hover:border-accent transition-all"
                  >
                    <h3 className="font-display text-xl mb-4">{service.title}</h3>
                    <p className="text-paper/50 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))
              ) : (
                // Fallback services
                <>
                  <div className="p-6 border-l-2 border-rule hover:border-accent transition-all">
                    <h3 className="font-display text-xl mb-4">
                      GTM Systems Architecture
                    </h3>
                    <p className="text-paper/50 text-sm leading-relaxed">
                      Design and implement revenue systems: attribution, routing,
                      SLAs, and the governance that keeps them honest.
                    </p>
                  </div>
                  <div className="p-6 border-l-2 border-rule hover:border-accent transition-all">
                    <h3 className="font-display text-xl mb-4">
                      AI-Native Operations
                    </h3>
                    <p className="text-paper/50 text-sm leading-relaxed">
                      Deploy governed AI workflows for RFPs, outreach, and
                      content—human-in-the-loop with full audit trails.
                    </p>
                  </div>
                  <div className="p-6 border-l-2 border-rule hover:border-accent transition-all">
                    <h3 className="font-display text-xl mb-4">
                      Org Design & Execution
                    </h3>
                    <p className="text-paper/50 text-sm leading-relaxed">
                      Restructure teams with clear lanes, enforced SLAs, and
                      output accountability. Marketing as product.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FULL CATALOGUE */}
        <section
          id="catalogue"
          aria-labelledby="catalogue-heading"
          className="py-32 px-6 bg-paper/[0.02] border-y border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  Archive
                </span>
                <h2 id="catalogue-heading" className="font-display text-3xl">
                  All Projects
                </h2>
              </div>
              <a
                href="/case-studies"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/60 hover:text-accent transition-colors"
              >
                View All →
              </a>
            </div>
            {caseStudies?.length > 0 && (
              <ProofExplorer
                items={caseStudies.filter((cs: any) => cs?.slug?.current).map((cs: any) => ({
                  slug: cs.slug.current,
                  title: cs.title,
                  label: cs.label,
                  deck: cs.deck,
                  outcome: cs.outcome,
                  stack: (cs.stack || []).join(', '),
                }))}
              />
            )}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-32 px-6"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-8 uppercase block">
              Get in Touch
            </span>
            <h2
              id="contact-heading"
              className="font-display text-5xl md:text-6xl mb-8"
            >
              Let&apos;s build systems
              <br />
              that <span className="italic text-accent">outperform</span>.
            </h2>
            <p className="text-paper/60 text-lg mb-12 max-w-xl mx-auto">
              For executive hiring or strategic consulting. I provide redacted
              walkthroughs of full GTM operating blueprints with governance,
              SLAs, and outcomes.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="mailto:connor.laughlin@gmail.com"
                className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-10 py-4 rounded-full hover:bg-paper transition-all"
              >
                Start a Conversation
              </a>
              <a
                href="https://linkedin.com/in/connorlaughlin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/60 hover:text-paper transition-colors px-6 py-4"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-rule px-6">
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 font-mono text-[9px] tracking-[0.3em] uppercase">
            <span>© 2026 Connor Laughlin</span>
            <span>Built with systems thinking</span>
            <span>TSI • Chicago • Remote</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
