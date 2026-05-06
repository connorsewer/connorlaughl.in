import Link from "next/link";
import { client } from "@/lib/sanity";
import {
  featuredCaseStudiesQuery,
  proofPointsQuery,
  servicesQuery,
} from "@/lib/queries";
import { Header } from "@/components/Header";
import { FlagshipSystems } from "@/components/FlagshipSystems";
import { ProofExplorer } from "@/components/ProofExplorer";
import { caseStudies as localCaseStudies } from "@/content/case-studies";
import type { Metadata } from "next";

type HeroStat = { value: string; label: string };
type ProofPoint = { _id: string; metric: string; title: string; description: string };
type Service = { _id: string; title: string; description: string };
type CaseStudyCard = {
  slug?: { current?: string };
  title?: string;
  label?: string;
  deck?: string;
  outcome?: string;
  stack?: string[];
};
type CaseStudyCardWithSlug = CaseStudyCard & { slug: { current: string } };

function hasCurrentSlug(cs: CaseStudyCard): cs is CaseStudyCardWithSlug {
  return Boolean(cs?.slug?.current);
}

export const metadata: Metadata = {
  title: "Connor Laughlin | Marketing Executive & GTM Systems Engineer",
  description:
    "Connor Laughlin is a marketing executive and GTM systems builder who turns messy revenue operations, positioning, analytics, and AI workflows into measurable growth systems.",
};

export const revalidate = 60;

export default async function Home() {
  const caseStudies = await client.fetch(featuredCaseStudiesQuery);
  const proofPoints = await client.fetch(proofPointsQuery);
  const services = await client.fetch(servicesQuery);

  // Keep the homepage positioning local-first so stale CMS copy cannot override the GTM Engineer narrative.
  const headline = "Marketing executive. GTM systems engineer.";
  const subheadline =
    "I can set the GTM strategy in the boardroom and build the system that makes it real. I turn scattered marketing, sales, data, and AI workflows into operating systems with clear ownership, trusted pipeline, governed automation, and measurable growth.";
  const tagline = "VP Marketing / Acting CMO • Revenue Systems • Governed AI";
  const stats: HeroStat[] = [
    { value: "13+", label: "Years Enterprise GTM" },
    { value: "4", label: "Promotions" },
    { value: "VP", label: "Marketing / GTM Operator" },
    { value: "AI", label: "Systems Builder" },
  ];
  const primaryCTA = { text: "See the Systems →", link: "#flagship-systems" };
  const secondaryCTA = { text: "What I Actually Do", link: "#what-that-means" };
  const operatingModes = [
    {
      title: "Executive marketing leadership",
      description:
        "Brand, demand generation, content, sales enablement, budget cases, team design, agency management, and executive reporting.",
    },
    {
      title: "Revenue systems engineering",
      description:
        "Funnel definitions, attribution, CRM workflows, routing rules, SLAs, KPI architecture, and pipeline accountability.",
    },
    {
      title: "Governed AI operations",
      description:
        "AI-assisted research, content, RFP, reporting, and workflow automation with human review gates and quality standards.",
    },
  ];
  const evolution = [
    {
      step: "Writer and researcher",
      description: "Learned how to make complex ideas clear, credible, and useful.",
    },
    {
      step: "First digital marketing hire",
      description:
        "Built the early web, SEO, analytics, campaign, and attribution foundation from zero.",
    },
    {
      step: "VP / acting CMO operator",
      description:
        "Led marketing and GTM across a complex PE-backed enterprise with multiple verticals, brands, stakeholders, and regulated markets.",
    },
    {
      step: "GTM systems engineer",
      description:
        "Built the systems underneath growth: RevOps accountability, AI workflows, structured content engines, buyer intelligence, and executive reporting.",
    },
  ];
  const usefulWhen = [
    "Your story is too complicated for sales to repeat consistently.",
    "Your pipeline reporting is hard to trust.",
    "Marketing ships activity, but leadership cannot see the revenue system.",
    "AI experiments are happening, but there is no governance or workflow design.",
    "Sales and marketing disagree on definitions, handoffs, and ownership.",
    "Acquired brands or products need one coherent GTM motion.",
    "You need a VP-level operator who can still get hands-on with systems, copy, data, and automation.",
  ];
  const catalogueItems = caseStudies?.length > 0
    ? caseStudies.filter(hasCurrentSlug).map((cs: CaseStudyCardWithSlug) => ({
        slug: cs.slug.current,
        title: cs.title || "Untitled system",
        label: cs.label || "Operating Proof",
        deck: cs.deck || "Redacted system brief.",
        outcome: cs.outcome || "Outcome details available in the full dossier.",
        scope: "",
        stack: (cs.stack || []).join(", "),
        governance: "",
        businessProblem: cs.deck || "Business problem details available in the full dossier.",
        whatIBuilt: "Build details available in the full dossier.",
        whatChanged: cs.outcome || "Outcome details available in the full dossier.",
        whyItMattered: "Business context available in the full dossier.",
        whatItProves: "Operating proof available in the full dossier.",
        bullets: [],
        interviewLine: "",
      }))
    : localCaseStudies.slice(0, 6);

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

                <p className="text-xl md:text-2xl text-paper/72 max-w-2xl leading-relaxed text-balance animate-slide-up delay-200">
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
              <aside className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-80 animate-slide-in-right delay-300 border border-rule bg-paper/[0.02] p-5">
                {stats.map((stat: HeroStat) => (
                  <div
                    key={stat.label}
                    className="group border-l-2 border-rule hover:border-accent pl-4 transition-all"
                  >
                    <span className="font-display text-4xl group-hover:text-accent transition-colors">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-paper/58 uppercase block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </aside>
            </div>
          </div>

        </section>

        <section
          id="what-that-means"
          aria-labelledby="what-that-means-heading"
          className="py-24 md:py-28 px-6 border-t border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 mb-14">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  What that actually means
                </span>
                <h2
                  id="what-that-means-heading"
                  className="font-display text-4xl md:text-5xl leading-tight"
                >
                  I lead the strategy,
                  <br />
                  <span className="text-accent italic">then build the machine.</span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-paper/72 text-lg leading-relaxed">
                  A lot of people can lead campaigns. Some can build dashboards.
                  A few can write a good narrative. My work is connecting all of
                  it into one operating system, so the team knows what to say,
                  what to measure, who owns the next step, and where AI can
                  remove drag without creating risk.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {operatingModes.map((mode) => (
                <div
                  key={mode.title}
                  className="p-7 border border-rule bg-paper/[0.018] hover:border-accent/70 transition-all"
                >
                  <h3 className="font-display text-2xl mb-4">{mode.title}</h3>
                  <p className="text-paper/70 text-sm leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="through-line-heading"
          className="py-24 md:py-28 px-6 bg-paper/[0.02] border-y border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  The through-line
                </span>
                <h2
                  id="through-line-heading"
                  className="font-display text-4xl md:text-5xl leading-tight mb-6"
                >
                  The pattern
                  <br />
                  <span className="text-accent italic">behind the work.</span>
                </h2>
                <p className="text-paper/72 text-lg leading-relaxed">
                  The common thread is turning ambiguity into a system people
                  can run. That started with writing and digital marketing, then
                  became enterprise GTM leadership, RevOps accountability, and
                  AI-native workflow design.
                </p>
              </div>

              <ol className="grid gap-5">
                {evolution.map((item, index) => (
                  <li
                    key={item.step}
                    className="grid sm:grid-cols-[72px_1fr] gap-5 p-6 border border-rule bg-ink/[0.12]"
                  >
                    <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl mb-2">{item.step}</h3>
                      <p className="text-paper/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <FlagshipSystems />

        {/* PROOF SECTION - The Story */}
        <section
          id="proof"
          className="py-24 md:py-28 px-6 bg-paper/[0.02] border-y border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  Operating Proof
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                  Operating outcomes
                  <br />
                  <span className="text-accent italic">
                    after the systems shipped.
                  </span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-paper/72 text-lg">
                  Each example starts with a business problem, then shows what
                  I built, what changed, and what the work proves about how I
                  operate.
                </p>
              </div>
            </div>

            {/* Proof Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {proofPoints?.length > 0 ? (
                proofPoints.map((point: ProofPoint) => (
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
                    <p className="text-paper/68 text-sm">{point.description}</p>
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
                    <p className="text-paper/68 text-sm">
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
                    <p className="text-paper/68 text-sm">
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
                    <p className="text-paper/68 text-sm">
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
                    <p className="text-paper/68 text-sm">
                      7-day brief-to-ship SLA with governed workflow
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/case-studies"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent hover:text-paper transition-colors inline-flex items-center gap-2"
              >
                View Full Case Studies <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* BEST-FIT PROBLEMS SECTION */}
        <section className="py-24 md:py-28 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 mb-14">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  I&apos;m useful when
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                  The opportunity is real,
                  <br />
                  <span className="text-accent italic">but the system is underbuilt.</span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-paper/72 text-lg leading-relaxed">
                  I am strongest in messy GTM environments where the story
                  needs work, pipeline is hard to trust, the team is stretched,
                  and leaders need someone who can operate at VP level without
                  floating above the details.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {usefulWhen.map((item, index) => (
                <div
                  key={item}
                  className={`flex gap-4 p-5 border border-rule bg-paper/[0.018] ${
                    index === usefulWhen.length - 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <span className="text-accent mt-1">→</span>
                  <p className="text-paper/72 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            {services?.length > 0 && (
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                {services.map((service: Service) => (
                  <div
                    key={service._id}
                    className="p-6 border-l-2 border-rule hover:border-accent transition-all"
                  >
                    <h3 className="font-display text-xl mb-4">{service.title}</h3>
                    <p className="text-paper/68 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FULL CATALOGUE */}
        <section
          id="catalogue"
          aria-labelledby="catalogue-heading"
          className="py-24 md:py-28 px-6 bg-paper/[0.02] border-y border-rule"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  Systems Portfolio
                </span>
                <h2 id="catalogue-heading" className="font-display text-3xl">
                  Operating proof
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/72 hover:text-accent transition-colors"
              >
                View All →
              </Link>
            </div>
            <ProofExplorer items={catalogueItems} />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-24 md:py-28 px-6"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-8 uppercase block">
              Get in Touch
            </span>
            <h2
              id="contact-heading"
              className="font-display text-5xl md:text-6xl mb-8"
            >
              Lead the strategy.
              <br />
              Build the <span className="italic text-accent">system</span>.
            </h2>
            <p className="text-paper/72 text-lg mb-12 max-w-xl mx-auto">
              I&apos;m looking for roles and advisory work where strategy and
              systems both matter: VP Marketing, CMO, Head of GTM, VP RevOps,
              Head of Growth, or GTM Engineer roles at AI-native B2B SaaS,
              complex enterprise software, and PE-backed growth companies.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="mailto:connor.laughlin@gmail.com"
                className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-10 py-4 rounded-full hover:bg-paper transition-all"
              >
                Let&apos;s Talk
              </a>
              <a
                href="https://linkedin.com/in/connorlaughlin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/72 hover:text-paper transition-colors px-6 py-4"
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
