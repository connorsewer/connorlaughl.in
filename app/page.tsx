import { client } from "@/lib/sanity";
import {
  heroContentQuery,
  featuredCaseStudiesQuery,
  proofPointsQuery,
  servicesQuery,
} from "@/lib/queries";
import { Header } from "@/components/Header";
import { ProofExplorer } from "@/components/ProofExplorer";
import { HeroAsciiVideo } from "@/components/HeroAsciiVideo";
import { caseStudies as localCaseStudies } from "@/content/case-studies";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connor J. Laughlin — VP Marketing & GTM",
  description:
    "Notes on the systems I've built. $15M influenced pipeline, 300% inbound growth, governed AI workflows, and the org designs underneath them.",
};

export const revalidate = 60;

const FALLBACK_HERO = {
  tagline: "VP Marketing / TSI / Chicago",
  headline: "I build revenue systems. Then I run them under load.",
  subheadline:
    "$15M influenced pipeline. 300% inbound growth. 40 to 60 meetings a month, every month. Built under real constraints, with audit trails. Each one shipped.",
  stats: [
    { value: "$15M+", label: "Pipeline influenced" },
    { value: "300%", label: "Inbound growth" },
    { value: "40–60", label: "Meetings / month" },
    { value: "2 hr", label: "Signal-to-meeting SLA" },
  ],
  primaryCTA: { text: "Read the files", link: "/case-studies" },
  secondaryCTA: { text: "By the numbers", link: "#proof" },
};

const FALLBACK_PROOF = [
  {
    _id: "p1",
    metric: "212% pipeline lift",
    title: "BDR Pod, signal to meeting in 2 hours",
    description:
      "Scaled one squad to four signal-driven pods with a 2-hour SLA on every inbound. Routing logic, governance, the whole thing.",
    state: "RUNNING",
    year: "2024",
  },
  {
    _id: "p2",
    metric: "10% payment lift",
    title: "Outcome-First repositioning, six business units",
    description:
      "Rewrote how six BUs talked about themselves. Service language out, outcome language in. Conversion moved.",
    state: "SHIPPED",
    year: "2024",
  },
  {
    _id: "p3",
    metric: "40% cycle reduction",
    title: "AI-native GTM engine, governed",
    description:
      "RFP automation with 99% compliance accuracy. Human in the loop. Audit trail per response. Vendor approvals in days, not weeks.",
    state: "RUNNING",
    year: "2024",
  },
  {
    _id: "p4",
    metric: "200+ assets / year",
    title: "Two-function marketing org, 7-day brief-to-ship",
    description:
      "Restructured the team so demand and brand each had one job. Shared workflow, enforced SLA, output you can count.",
    state: "RUNNING",
    year: "2024",
  },
];

const FALLBACK_SERVICES = [
  {
    _id: "s1",
    title: "GTM systems architecture",
    description:
      "Attribution. Routing. SLAs. The governance that keeps the whole thing honest. Designed, built, handed off documented.",
  },
  {
    _id: "s2",
    title: "AI-native operations",
    description:
      "Governed AI workflows for RFPs, outreach, and content. Human in the loop. Audit trail. No black boxes.",
  },
  {
    _id: "s3",
    title: "Org design and execution",
    description:
      "Restructure the team with clear lanes, enforced SLAs, output accountability. Marketing run as a product.",
  },
];

const TIMELINE = [
  { year: "2009–2012", role: "BD & Marketing", company: "Vatican Museums" },
  { year: "2012–2014", role: "Executive Search Associate", company: "Reilly Partners" },
  { year: "2013–2015", role: "Content Creator", company: "Brad's Deals" },
  {
    year: "2015–Present",
    role: "Digital Marketing Manager → VP, Marketing & GTM",
    company: "TSI",
  },
];

export default async function Home() {
  const hero = await client.fetch(heroContentQuery);
  const sanityCaseStudies = await client.fetch(featuredCaseStudiesQuery);
  const proofPoints = await client.fetch(proofPointsQuery);
  const services = await client.fetch(servicesQuery);

  const tagline = hero?.tagline || FALLBACK_HERO.tagline;
  const headline = hero?.headline || FALLBACK_HERO.headline;
  const subheadline = hero?.subheadline || FALLBACK_HERO.subheadline;
  const stats = hero?.stats || FALLBACK_HERO.stats;
  const primaryCTA = hero?.primaryCTA || FALLBACK_HERO.primaryCTA;
  const secondaryCTA = hero?.secondaryCTA || FALLBACK_HERO.secondaryCTA;

  const proof = proofPoints?.length > 0 ? proofPoints : FALLBACK_PROOF;
  const serviceList = services?.length > 0 ? services : FALLBACK_SERVICES;

  // Index section: Sanity first, fall back to local case-studies content
  const indexItems =
    sanityCaseStudies?.length > 0
      ? sanityCaseStudies
          .filter((cs: any) => cs?.slug?.current)
          .map((cs: any) => ({
            slug: cs.slug.current,
            title: cs.title,
            label: cs.label,
            deck: cs.deck,
            outcome: cs.outcome,
            stack: (cs.stack || []).join(", "),
          }))
      : localCaseStudies.map((cs) => ({
          slug: cs.slug,
          title: cs.title,
          label: cs.label,
          deck: cs.deck,
          outcome: cs.outcome,
          stack: cs.stack,
        }));

  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content">
        {/* HERO ============================================== */}
        <section
          aria-labelledby="hero-heading"
          className="min-h-screen px-6 pt-32 pb-20 relative overflow-hidden"
        >
          <div className="mx-auto max-w-6xl w-full relative">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              {/* Text — cols 1-6 */}
              <div className="lg:col-span-6 flex flex-col gap-10">
                <div className="animate-fade-in">
                  <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase">
                    {tagline}
                  </span>
                </div>

                <h1
                  id="hero-heading"
                  className="font-display text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[0.95] tracking-tight text-balance animate-slide-up"
                >
                  {headline}
                </h1>

                <p className="text-lg md:text-xl text-paper/65 max-w-xl leading-relaxed text-balance animate-slide-up delay-200">
                  {subheadline}
                </p>

                {/* Stats */}
                <ul className="grid grid-cols-2 gap-x-10 gap-y-6 mt-2 animate-slide-up delay-300">
                  {stats.map((stat: { value: string; label: string }) => (
                    <li
                      key={stat.label}
                      className="border-l-2 border-rule pl-4 hover:border-accent transition-colors"
                    >
                      <span className="font-display text-3xl block">{stat.value}</span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-paper/45 uppercase block mt-1">
                        {stat.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 mt-4 animate-slide-up delay-400">
                  <a
                    href={primaryCTA.link}
                    className="cta-scan font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-7 py-3.5 rounded-full hover:bg-paper transition-colors"
                  >
                    {primaryCTA.text}
                  </a>
                  <a
                    href={secondaryCTA.link}
                    className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-7 py-3.5 rounded-full hover:border-accent transition-colors"
                  >
                    {secondaryCTA.text}
                  </a>
                </div>
              </div>

              {/* Video — cols 7-12 */}
              <div className="lg:col-span-6 lg:col-start-7 animate-fade-in delay-500">
                <HeroAsciiVideo />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-fade-in delay-1000 hidden lg:block">
            <div className="w-px h-14 bg-gradient-to-b from-paper/40 to-transparent" />
          </div>
        </section>

        {/* WALL TEXT — museum first room ============================ */}
        <section aria-labelledby="wall-text" className="px-6 py-14 border-t border-rule">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase">
                How to read this
              </span>
              <p id="wall-text" className="sr-only">How to read this site</p>
            </div>
            <p className="lg:col-span-7 text-paper/75 text-lg leading-relaxed">
              This is a file room. Each page below is an artifact: a system that shipped, a memo from the desk, a frame around something that happened. Captions name the work. The numbers are real. The files open.
            </p>
          </div>
        </section>

        {/* SELECTED WORK ============================================ */}
        <section
          id="proof"
          aria-labelledby="proof-heading"
          className="py-32 px-6 bg-paper/[0.02] border-y border-rule relative"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-6">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  Selected work
                </span>
                <h2
                  id="proof-heading"
                  className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
                >
                  What I built. What it ran on. What it produced.
                </h2>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <p className="text-paper/65 text-lg leading-relaxed">
                  Each was a system before it was a slide. Each ran under SLA. Each was measured against something real.
                </p>
              </div>
            </div>

            <ul className="grid md:grid-cols-2 gap-5">
              {proof.map((point: any) => (
                <li
                  key={point._id}
                  className="group p-7 border border-rule hover:border-accent transition-colors hover:bg-paper/[0.02] flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
                      {point.metric}
                    </span>
                    <span className="status-pill pixel-flicker">
                      {point.state || "SHIPPED"}
                      <span aria-hidden="true" className="status-pill__sep">▌</span>
                      {point.year || "2024"}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl group-hover:text-accent transition-colors text-balance">
                    {point.title}
                  </h3>
                  <p className="text-paper/55 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex justify-end">
              <a
                href="/case-studies"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent hover:text-paper transition-colors inline-flex items-center gap-2 link-editorial"
              >
                Open the full file <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT ==================================================== */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-32 px-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  About
                </span>
                <h2
                  id="about-heading"
                  className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
                >
                  Vatican City to AI-native GTM.
                </h2>
                <p className="font-mono text-[10px] tracking-[0.3em] text-paper/45 uppercase mt-6">
                  Connor J. Laughlin · Chicago
                </p>
              </div>

              <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-paper/75 text-lg leading-relaxed">
                <p className="drop-cap">
                  I'm a marketing and go-to-market executive based in Chicago. The last decade has been spent building revenue engines from scratch, mostly inside one company that grew up around me. <Link href="/about" className="text-accent link-editorial">The personal version lives here</Link>.
                </p>
                <p>
                  The path was not a straight line. Business development at the Vatican Museums. Executive search at Reilly Partners. Content at Brad's Deals when it had 10 million monthly visitors. Then a decade at TSI ($454M enterprise), Digital Marketing Manager up to VP of Marketing & GTM. Zero to $159M in influenced pipeline. Manual outreach to AI agents producing 40 to 60 qualified meetings every month. A legacy "debt collection" brand to an AI-powered Revenue Operating System pitched to the C-suite.
                </p>
                <p>
                  What makes me tick is the seam between systems thinking and storytelling. Santa Clara Finance taught me how to build the model. Northwestern Journalism taught me how to tell the story. Together they let me design revenue architectures that hold up under analytical pressure and read well to a buyer.
                </p>
                <p>
                  I'm looking for the next thing. A VP, CMO, or Head of GTM role at a high-growth, AI-forward company where I can build the engine from the ground up. I'm drawn to companies where AI is the foundation, not a bolt-on.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 mt-20">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  Education
                </span>
                <ul className="space-y-5 text-sm">
                  <li className="border-l-2 border-rule pl-4">
                    <p className="font-display text-lg leading-tight">Santa Clara University</p>
                    <p className="text-paper/55 mt-1">B.S., Finance · Leavey School of Business</p>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-paper/40 uppercase mt-1">2006–2009</p>
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
                  {TIMELINE.map((t, i) => (
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

        {/* HOW I WORK =============================================== */}
        <section
          aria-labelledby="services-heading"
          className="py-32 px-6 bg-paper/[0.02] border-y border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-6">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-5 uppercase block">
                  How I work
                </span>
                <h2
                  id="services-heading"
                  className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
                >
                  What the work is.
                </h2>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <p className="text-paper/65 text-lg leading-relaxed">
                  Three lanes. They share a tool kit. Pick whichever you need most. The first call is free.
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-3 gap-px bg-rule">
              {serviceList.map((service: any, i: number) => (
                <li
                  key={service._id}
                  className="bg-ink p-8 hover:bg-paper/[0.02] transition-colors flex flex-col gap-4"
                >
                  <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl">{service.title}</h3>
                  <p className="text-paper/55 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* INDEX ==================================================== */}
        <section
          id="catalogue"
          aria-labelledby="catalogue-heading"
          className="py-32 px-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  Index
                </span>
                <h2 id="catalogue-heading" className="font-display text-3xl md:text-4xl">
                  Everything else.
                </h2>
              </div>
              <a
                href="/case-studies"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/60 hover:text-accent transition-colors"
              >
                See all <span aria-hidden="true">→</span>
              </a>
            </div>
            {indexItems.length > 0 && <ProofExplorer items={indexItems} />}
          </div>
        </section>

        {/* CONTACT ================================================== */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-32 px-6 bg-paper/[0.02] border-t border-rule"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-8 uppercase block">
              Get in touch
            </span>
            <h2
              id="contact-heading"
              className="font-display text-5xl md:text-6xl mb-8 leading-[1.05] text-balance"
            >
              Want one of these <span className="italic text-accent">built?</span>
            </h2>
            <p className="text-paper/65 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              I take a small number of advisory and execution engagements per year. Email me if you want to talk. I'll send back a redacted walkthrough of one of the systems above so you can see the shape of the work.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="mailto:connor.laughlin@gmail.com"
                className="cta-scan font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-10 py-4 rounded-full hover:bg-paper transition-colors"
              >
                Email me
              </a>
              <a
                href="https://linkedin.com/in/connorlaughlin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/60 hover:text-paper transition-colors px-6 py-4"
              >
                LinkedIn <span aria-hidden="true">→</span>
              </a>
            </div>
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
