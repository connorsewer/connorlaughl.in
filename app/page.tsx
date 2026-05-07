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
import { VisualAsset } from "@/components/VisualAsset";
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
    "Connor Laughlin is a marketing executive and GTM systems builder who turns messy revenue operations, positioning, analytics, and AI workflows into operating models teams can run.",
};

export const revalidate = 60;

export default async function Home() {
  const caseStudies = await client.fetch(featuredCaseStudiesQuery);
  const proofPoints = await client.fetch(proofPointsQuery);
  const services = await client.fetch(servicesQuery);

  // Keep the homepage positioning local-first so stale CMS copy cannot override the GTM Engineer narrative.
  const headline = ["Marketing executive.", "GTM systems engineer."];
  const subheadline =
    "I can set the GTM strategy in the boardroom and build the workflows that make it real. I turn scattered marketing, sales, data, and AI work into clear ownership, cleaner pipeline, reviewable automation, and growth a team can actually manage.";
  const tagline = "VP Marketing / Acting CMO • Revenue systems • Governed AI";
  const stats: HeroStat[] = [
    { value: "13+", label: "Years in enterprise GTM" },
    { value: "4", label: "Promotions" },
    { value: "VP", label: "Marketing and GTM operator" },
    { value: "AI", label: "Systems builder" },
  ];
  const primaryCTA = { text: "See the systems →", link: "#flagship-systems" };
  const secondaryCTA = { text: "What I actually do", link: "#what-that-means" };
  const operatingModes = [
    {
      title: "Executive marketing leadership",
      description:
        "Brand, demand generation, content, sales enablement, budget cases, team design, agency management, and executive reporting.",
    },
    {
      title: "Revenue systems engineering",
      description:
        "Funnel definitions, attribution, CRM workflows, routing rules, SLAs, KPI math, and pipeline accountability.",
    },
    {
      title: "Governed AI operations",
      description:
        "AI-assisted research, content, RFP, reporting, and workflow automation with human review gates and quality checks.",
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
        "Built the systems underneath growth: RevOps accountability, AI workflows, content engines, buyer intelligence, and executive reporting.",
    },
  ];
  const usefulWhen = [
    "Your story is too complicated for sales to repeat consistently.",
    "Your pipeline reporting is hard to trust.",
    "Marketing ships activity, and leadership still cannot see the revenue system.",
    "AI experiments are happening without governance or workflow design.",
    "Sales and marketing disagree on definitions, handoffs, and ownership.",
    "Acquired brands or products need one coherent GTM motion.",
    "You need a VP-level operator who can still get hands-on with systems, copy, data, and automation.",
  ];
  const catalogueItems = caseStudies?.length > 0
    ? caseStudies.filter(hasCurrentSlug).map((cs: CaseStudyCardWithSlug) => ({
        slug: cs.slug.current,
        title: cs.title || "Untitled system",
        label: cs.label || "Work proof",
        deck: cs.deck || "Redacted system brief.",
        outcome: cs.outcome || "Outcome details available in the case study.",
        scope: "",
        stack: (cs.stack || []).join(", "),
        governance: "",
        businessProblem: cs.deck || "Business problem details available in the case study.",
        whatIBuilt: "Build details available in the case study.",
        whatChanged: cs.outcome || "Outcome details available in the case study.",
        whyItMattered: "Business context available in the case study.",
        whatItProves: "Operating proof available in the case study.",
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
          className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-14 relative overflow-hidden sm:pt-20 sm:pb-0"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-paper/5 pointer-events-none" />

          <div className="mx-auto max-w-6xl w-full relative">
            {/* Top tagline */}
            <div className="animate-fade-in">
              <span className="meta-label-accent mb-6 block max-w-[17rem] sm:max-w-none">
                {tagline}
              </span>
            </div>

            <div className="flex flex-col justify-between gap-12 mb-16 lg:flex-row lg:items-center">
              {/* Main headline */}
              <div className="max-w-4xl lg:max-w-3xl">
                <h1
                  id="hero-heading"
                  className="font-display text-[clamp(2.75rem,12.5vw,6.5rem)] leading-[0.96] tracking-tight mb-8 sm:leading-[0.9] lg:text-[clamp(4.25rem,6.2vw,5.6rem)]"
                >
                  {headline.map((line) => (
                    <span key={line} className="block animate-slide-up lg:whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </h1>

                <p className="text-lg text-paper/78 max-w-2xl leading-relaxed text-balance animate-slide-up delay-200 sm:text-xl md:text-2xl md:text-paper/72">
                  {subheadline}
                </p>

                {/* CTA Row */}
                <div className="flex flex-wrap gap-4 mt-10 animate-slide-up delay-400">
                  <a
                    href={primaryCTA.link}
                    className="w-full rounded-full bg-accent px-8 py-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-all hover:bg-paper sm:w-auto sm:tracking-[0.2em]"
                  >
                    {primaryCTA.text}
                  </a>
                  <a
                    href={secondaryCTA.link}
                    className="w-full rounded-full border border-paper/40 px-8 py-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper/82 transition-all hover:border-accent hover:text-accent sm:w-auto sm:tracking-[0.2em]"
                  >
                    {secondaryCTA.text}
                  </a>
                </div>
              </div>

              <aside className="w-full animate-slide-in-right delay-300 lg:w-[24rem] xl:w-[27rem]">
                <VisualAsset
                  src="/visuals/dithered/01-homepage-hero-artifact.webp"
                  mobileSrc="/visuals/exported/01-homepage-hero-artifact-mobile.webp"
                  alt=""
                  width={1122}
                  height={1402}
                  mobileWidth={720}
                  mobileHeight={900}
                  priority
                  className="aspect-[4/5] rounded-[2rem] border border-rule bg-paper/[0.025] shadow-editorial"
                  imageClassName="opacity-[0.86] mix-blend-normal"
                />
                <div className="mt-5 grid grid-cols-2 gap-4 border border-rule bg-paper/[0.02] p-5">
                  {stats.map((stat: HeroStat) => (
                    <div
                      key={stat.label}
                      className="group border-l-2 border-rule pl-4 transition-all hover:border-accent"
                    >
                      <span className="font-display text-4xl transition-colors group-hover:text-accent">
                        {stat.value}
                      </span>
                      <span className="meta-label-subtle block">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
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
                  I connect the parts that usually live in different rooms: the story, the funnel math, the CRM rules, the sales handoff, and the AI review path. The goal is simple. The team knows what to say, what to measure, who owns the next step, and where automation can remove drag without creating risk.
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
                  The common thread is turning ambiguity into work people can run. It started with writing and digital marketing, then became enterprise GTM leadership, RevOps accountability, and AI workflow design.
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
                  Work proof
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                  What changed
                  <br />
                  <span className="text-accent italic">
                    after the work shipped.
                  </span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-paper/72 text-lg">
                  Each example shows the mess I walked into, what I changed, and what the business could do afterward.
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
                      Pipeline discipline
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      BDR pod rebuild
                    </h3>
                    <p className="text-paper/68 text-sm">
                      Signal follow-up moved into a tighter SLA-driven rhythm
                    </p>
                  </div>
                  <div className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      Outcome proof
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      Outcome-first repositioning
                    </h3>
                    <p className="text-paper/68 text-sm">
                      Rewrote 6 business-unit stories around buyer outcomes and proof
                    </p>
                  </div>
                  <div className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      AI workflow control
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      Governed AI GTM engine
                    </h3>
                    <p className="text-paper/68 text-sm">
                      RFP and outbound drafts moved through approval gates before release
                    </p>
                  </div>
                  <div className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                      Ship rhythm
                    </span>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                      Two-function marketing
                    </h3>
                    <p className="text-paper/68 text-sm">
                      7-day brief-to-ship SLA with clearer intake and review rules
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
                View case studies <span>→</span>
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
                  <span className="text-accent italic">and the system is underbuilt.</span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-paper/72 text-lg leading-relaxed">
                  I am strongest in messy GTM environments where the story needs work, pipeline is hard to trust, the team is stretched, and leaders need a VP-level operator who still gets into the details.
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
                  Systems portfolio
                </span>
                <h2 id="catalogue-heading" className="font-display text-3xl">
                  Operating proof
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/72 hover:text-accent transition-colors"
              >
                View all →
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
              Get in touch
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
                Let&apos;s talk
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
            <span>Built by Connor Laughlin</span>
            <span>TSI • Chicago • Remote</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
