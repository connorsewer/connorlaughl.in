"use client";

import { Header } from "@/components/Header";
import { ProofExplorer } from "@/components/ProofExplorer";
import { caseStudies } from "@/content/case-studies";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: "$15M+", label: "Influenced Pipeline" },
    { value: "300%", label: "Inbound Growth" },
    { value: "40-60", label: "Meetings/Month" },
    { value: "2hr", label: "Signal-to-Meeting SLA" },
  ];

  const proofPoints = [
    {
      title: "BDR Pod Transformation",
      metric: "212% pipeline growth",
      desc: "Scaled from 1 to 4 signal-driven squads with 2-hour SLA",
    },
    {
      title: "Outcome-First Repositioning", 
      metric: "10% payment lift",
      desc: "Repositioned 6 business units from service to outcome language",
    },
    {
      title: "AI-Native GTM Engine",
      metric: "40% cycle reduction", 
      desc: "Governed RFP automation with 99%+ compliance accuracy",
    },
    {
      title: "Two-Function Marketing",
      metric: "200+/yr output",
      desc: "7-day brief-to-ship SLA with governed workflow",
    },
  ];

  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />
      
      <main id="main-content">
        {/* DYNAMIC HERO SECTION */}
        <section aria-labelledby="hero-heading" className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-paper/5 pointer-events-none" />
          
          <div className="mx-auto max-w-6xl w-full relative">
            {/* Top tagline with animation */}
            <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-6 uppercase block">
                VP Marketing @ TSI • GTM Systems Architect
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
              {/* Main headline with staggered animation */}
              <div className="max-w-4xl">
                <h1 id="hero-heading" className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-tight mb-8">
                  <span className={`block transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    I build revenue
                  </span>
                  <span className={`block transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    systems that
                  </span>
                  <span className={`block text-accent italic transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    actually work.
                  </span>
                </h1>
                
                <p className={`text-xl md:text-2xl text-paper/60 max-w-2xl leading-relaxed text-balance transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Not decks. Not theory. Operating proof: $15M+ influenced pipeline, 
                  300% inbound growth, and AI-native GTM systems I built while running 
                  marketing at a $1B+ revenue company.
                </p>

                {/* CTA Row */}
                <div className={`flex flex-wrap gap-4 mt-10 transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <a 
                    href="/case-studies"
                    className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-8 py-4 rounded-full hover:bg-paper transition-all"
                  >
                    See Operating Proof →
                  </a>
                  <a 
                    href="#proof"
                    className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-8 py-4 rounded-full hover:border-accent transition-all"
                  >
                    By The Numbers
                  </a>
                </div>
              </div>
              
              {/* Stats grid */}
              <aside className={`flex flex-col gap-6 lg:w-72 transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                {stats.map((stat, i) => (
                  <div key={stat.label} className="group border-l-2 border-rule hover:border-accent pl-4 transition-all">
                    <span className="font-display text-4xl group-hover:text-accent transition-colors">{stat.value}</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-paper/40 uppercase block">{stat.label}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-px h-16 bg-gradient-to-b from-paper/40 to-transparent" />
          </div>
        </section>

        {/* PROOF SECTION - The Story */}
        <section id="proof" className="py-32 px-6 bg-paper/[0.02] border-y border-rule">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
                  Operating Proof
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                  Systems I've built<br />
                  <span className="text-accent italic">and the outcomes they produced.</span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-paper/60 text-lg">
                  These aren't aspirational slides. These are governed systems with 
                  enforced SLAs, audit trails, and measured outcomes. Built under real 
                  constraints at real scale.
                </p>
              </div>
            </div>

            {/* Proof Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {proofPoints.map((point, i) => (
                <div 
                  key={point.title}
                  className="group p-8 border border-rule hover:border-accent transition-all duration-300 hover:bg-paper/[0.02]"
                >
                  <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase mb-4 block">
                    {point.metric}
                  </span>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-paper/50 text-sm">
                    {point.desc}
                  </p>
                </div>
              ))}
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
              {[
                {
                  title: "GTM Systems Architecture",
                  desc: "Design and implement revenue systems: attribution, routing, SLAs, and the governance that keeps them honest.",
                },
                {
                  title: "AI-Native Operations", 
                  desc: "Deploy governed AI workflows for RFPs, outreach, and content—human-in-the-loop with full audit trails.",
                },
                {
                  title: "Org Design & Execution",
                  desc: "Restructure teams with clear lanes, enforced SLAs, and output accountability. Marketing as product.",
                },
              ].map((service, i) => (
                <div key={service.title} className="p-6 border-l-2 border-rule hover:border-accent transition-all">
                  <h3 className="font-display text-xl mb-4">{service.title}</h3>
                  <p className="text-paper/50 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FULL CATALOGUE */}
        <section id="catalogue" aria-labelledby="catalogue-heading" className="py-32 px-6 bg-paper/[0.02] border-y border-rule">
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
            <ProofExplorer items={caseStudies} />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" aria-labelledby="contact-heading" className="py-32 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-8 uppercase block">
              Get in Touch
            </span>
            <h2 id="contact-heading" className="font-display text-5xl md:text-6xl mb-8">
              Let's build systems<br />that <span className="italic text-accent">outperform</span>.
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