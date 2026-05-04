"use client";

import { useState, useEffect } from "react";

const metrics = [
  { label: "Influenced Pipeline", value: 159.4, prefix: "$", suffix: "M", duration: 2000 },
  { label: "Lead Growth", value: 300, prefix: "", suffix: "%", duration: 1800 },
  { label: "Web Traffic Growth", value: 600, prefix: "", suffix: "%", duration: 2200 },
  { label: "AI Margin Impact", value: 25, prefix: "$", suffix: "M+", duration: 1600 },
  { label: "Meeting-to-SQL", value: 40, prefix: "", suffix: "%", duration: 1400 },
];

function AnimatedCounter({ value, prefix, suffix, duration }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  const display = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
  return <span>{prefix}{display}{suffix}</span>;
}

const caseStudies = [
  {
    id: 1,
    title: "The Architecture of Trust",
    subtitle: "Enterprise Brand Transformation",
    icon: "🏛️",
    challenge: "TSI ($454M revenue) was perceived as a legacy debt collection agency. The brand needed transformation to win C-suite buyers in regulated industries.",
    results: ["300% inbound lead growth", "600% YoY web traffic", "$159.4M influenced pipeline", "390 high-intent submissions in 3 months"],
    insight: "In regulated industries, compliance isn't a cost center — it's a product feature.",
    color: "#1B2A4A",
  },
  {
    id: 2,
    title: "The AI Revenue Engine",
    subtitle: "Manual GTM → Autonomous Pipeline",
    icon: "🤖",
    challenge: "Legacy sales relied on manual outreach and disconnected systems. Marketing ROI showed $0.00 due to attribution failures.",
    results: ["$25M+ incremental margin", "40-60 meetings/month (2-person pod)", "40% meeting-to-SQL conversion", "RFP time: 24hrs → 15min"],
    insight: "AI in GTM eliminates manual labor so humans can do high-value work.",
    color: "#0EA5E9",
  },
  {
    id: 3,
    title: "Smarter Recovery Starts Here",
    subtitle: "M&A Brand Integration in 12 Weeks",
    icon: "🔗",
    challenge: "Integrate a SaaS acquisition (DebtNext) with a legacy enterprise in 12 weeks without diluting either brand's value.",
    results: ["$1M+ ARR pipeline established", "35-50 meetings in first 6 weeks", "60M+ accounts on platform", "$1.5B annual payments processed"],
    insight: "In M&A, speed kills — but so does carelessness. Phased approach preserves what matters.",
    color: "#059669",
  },
  {
    id: 4,
    title: "Denials to Dollars",
    subtitle: "Healthcare Revenue Transformation",
    icon: "🏥",
    challenge: "Healthcare providers struggled with growing denials backlogs while needing to maintain patient trust and experience.",
    results: ["26 days faster appeal drafting", "~47% approval improvement", "$3M A/R reduction in 12 months", "95%+ patient CSAT"],
    insight: "Patients who feel respected pay more reliably. Doing right and doing profitable are the same thing.",
    color: "#7C3AED",
  },
];

const timeline = [
  { year: "2009-2012", role: "BD & Marketing Intern", company: "Vatican Museums", icon: "🇻🇦" },
  { year: "2012-2014", role: "Executive Search Associate", company: "Reilly Partners", icon: "🔍" },
  { year: "2013-2015", role: "Content Creator", company: "Brad's Deals", icon: "✍️" },
  { year: "2015-2017", role: "Digital Marketing Manager", company: "TSI", icon: "📊" },
  { year: "2017", role: "Senior Marketing Manager", company: "TSI", icon: "📈" },
  { year: "2017-2022", role: "Director of Marketing", company: "TSI", icon: "🎯" },
  { year: "2022-Present", role: "VP of Marketing & GTM", company: "TSI", icon: "🚀" },
];

const skills = [
  { name: "Go-to-Market Strategy", level: 98 },
  { name: "AI Systems (n8n, RAG, Agents)", level: 95 },
  { name: "Brand & Content Strategy", level: 97 },
  { name: "Revenue Operations", level: 93 },
  { name: "Marketing Automation", level: 92 },
  { name: "Sales Enablement", level: 90 },
  { name: "Data Analytics (GA4, Power BI)", level: 88 },
  { name: "Team Leadership", level: 96 },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const [expandedCase, setExpandedCase] = useState(null);
  const [animateMetrics] = useState(true);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "cases", label: "Case Studies" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-lg font-bold text-sky-400">CJL</span>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  activeTab === item.id
                    ? "bg-sky-500/20 text-sky-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* HOME */}
        {activeTab === "home" && (
          <div>
            {/* Hero */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950"></div>
              <div className="absolute top-20 right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center max-w-4xl px-6">
                <p className="text-sky-400 text-sm font-medium tracking-widest uppercase mb-4">Connor J. Laughlin</p>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  I Build{" "}
                  <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    Revenue Machines
                  </span>
                </h1>
                <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Marketing & GTM Executive who transformed a $454M enterprise from legacy brand to AI-powered Revenue Operating System. Now seeking to build the next one.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab("cases")}
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-medium transition-all"
                  >
                    View Case Studies
                  </button>
                  <button
                    onClick={() => setActiveTab("resume")}
                    className="px-6 py-3 border border-slate-600 hover:border-sky-400 text-slate-300 hover:text-white rounded-lg font-medium transition-all"
                  >
                    View Resume
                  </button>
                </div>
              </div>
            </section>

            {/* Metrics Bar */}
            <section className="bg-slate-900 border-y border-slate-800 py-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-sky-400">
                        {animateMetrics ? (
                          <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} duration={m.duration} />
                        ) : (
                          <span>{m.prefix}0{m.suffix}</span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Value Props */}
            <section className="py-20 max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">What I Bring</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Builder Mentality",
                    icon: "🔧",
                    desc: "Every system I operate, I created from zero. I don't inherit playbooks — I write them. From messaging architectures to revenue funnel KPIs to AI agent workflows.",
                  },
                  {
                    title: "AI-Native Operator",
                    icon: "🤖",
                    desc: "I deploy production AI agents, not just prompts. n8n workflows, CustomGPT + RAG pipelines, MCP servers, automated signal-to-meeting systems. The future of GTM is agentic, and I'm already there.",
                  },
                  {
                    title: "Revenue Architect",
                    icon: "📐",
                    desc: "Finance degree + Journalism training. I build the data model AND tell the story. 35+ KPI frameworks, reverse-funnel calculators, and 50+ page messaging architectures that actually drive pipeline.",
                  },
                ].map((card, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-sky-500/50 transition-all">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{card.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Case Study Previews */}
            <section className="py-16 bg-slate-900/50">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Proof of Impact</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudies.map((cs) => (
                    <button
                      key={cs.id}
                      onClick={() => { setActiveTab("cases"); setExpandedCase(cs.id); }}
                      className="text-left bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-sky-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{cs.icon}</span>
                        <div>
                          <h3 className="font-semibold group-hover:text-sky-400 transition-colors">{cs.title}</h3>
                          <p className="text-sm text-slate-500">{cs.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{cs.challenge}</p>
                      <div className="flex flex-wrap gap-2">
                        {cs.results.slice(0, 2).map((r, i) => (
                          <span key={i} className="text-xs bg-sky-500/10 text-sky-400 px-2 py-1 rounded">{r}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-2">About Me</h1>
            <p className="text-sky-400 mb-8">The arc from Vatican City to AI-native GTM.</p>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                I&apos;m a marketing and go-to-market executive based in Chicago who has spent the last decade building revenue engines from scratch. My career took an unconventional path — from business development at the Vatican Museums, to executive search at Reilly Partners, to content creation at Brad&apos;s Deals (10M+ monthly visitors), to a decade-long transformation at TSI where I rose from Digital Marketing Manager to VP of Marketing & GTM.
              </p>
              <p>
                At TSI, a $454M enterprise, I didn&apos;t inherit a marketing function — I built one. From zero to $159.4M in influenced pipeline, from manual outreach to production AI agents generating 40-60 qualified meetings per month, from a legacy &quot;debt collection&quot; brand to an AI-powered Revenue Operating System positioned for the C-suite.
              </p>
              <p>
                What makes me tick is the intersection of systems thinking and storytelling. My Santa Clara Finance degree taught me how to build the model. My Northwestern Journalism training taught me how to tell the story. Together, they let me design revenue architectures that are both analytically rigorous and narratively compelling.
              </p>
              <p>
                I&apos;m now looking for my next challenge: a VP/CMO/Head of GTM role at a high-growth, AI-forward company where I can build the revenue engine from the ground up. I&apos;m especially drawn to companies where AI isn&apos;t a feature — it&apos;s the foundation.
              </p>
            </div>

            {/* Education */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-semibold mb-1">Santa Clara University</h3>
                <p className="text-sky-400 text-sm">Leavey School of Business</p>
                <p className="text-slate-400 text-sm">B.S., Finance | 2006-2009</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-semibold mb-1">Northwestern University</h3>
                <p className="text-sky-400 text-sm">Medill School of Journalism</p>
                <p className="text-slate-400 text-sm">Journalism Coursework</p>
              </div>
            </div>

            {/* Languages */}
            <div className="mt-8 flex gap-4">
              {["English (Native)", "Italian", "Spanish"].map((lang, i) => (
                <span key={i} className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-400">{lang}</span>
              ))}
            </div>

            {/* Timeline */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Career Timeline</h2>
              <div className="space-y-4">
                {timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="text-2xl w-10 text-center">{t.icon}</div>
                    <div className="w-28 text-sm text-slate-500 font-mono">{t.year}</div>
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-3 group-hover:border-sky-500/50 transition-all">
                      <span className="font-medium">{t.role}</span>
                      <span className="text-slate-500 ml-2">@ {t.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CASE STUDIES */}
        {activeTab === "cases" && (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-2">Case Studies</h1>
            <p className="text-sky-400 mb-12">Four stories of revenue transformation.</p>

            <div className="space-y-6">
              {caseStudies.map((cs) => (
                <div key={cs.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCase(expandedCase === cs.id ? null : cs.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{cs.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold">{cs.title}</h3>
                        <p className="text-sm text-slate-500">{cs.subtitle}</p>
                      </div>
                    </div>
                    <span className={`text-2xl text-slate-500 transition-transform ${expandedCase === cs.id ? "rotate-45" : ""}`}>+</span>
                  </button>

                  {expandedCase === cs.id && (
                    <div className="px-6 pb-6 border-t border-slate-800 pt-6">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Challenge</h4>
                        <p className="text-slate-300">{cs.challenge}</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Results</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {cs.results.map((r, i) => (
                            <div key={i} className="bg-slate-800 rounded-lg p-3 text-center">
                              <span className="text-sky-400 font-semibold text-sm">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border-l-4" style={{ borderColor: cs.color }}>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Key Insight</h4>
                        <p className="text-slate-300 italic">{cs.insight}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESUME */}
        {activeTab === "resume" && (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold">Resume</h1>
                <p className="text-sky-400">Interactive career overview</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
              <div className="grid gap-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-56 text-sm text-slate-400">{skill.name}</span>
                    <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-500 w-10 text-right">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "VP of Marketing & GTM",
                    company: "TSI — Transworld Systems Inc.",
                    period: "Feb 2022 – Present",
                    highlights: [
                      "Led cross-functional GTM for $454M enterprise; generated $159.4M influenced pipeline",
                      "Deployed AI-native systems (n8n agents, CustomGPT + RAG) driving 40-60 meetings/month",
                      "Architected brand transformation and 50+ page messaging framework across 6 BUs",
                      "Drove $25M+ incremental margin through AI platform deployment",
                    ],
                  },
                  {
                    title: "Director of Marketing",
                    company: "TSI — Transworld Systems Inc.",
                    period: "Aug 2017 – Jan 2022",
                    highlights: [
                      "Built first content marketing and inbound lead gen program from scratch",
                      "Led marketing automation replatforming and M&A brand integration",
                    ],
                  },
                  {
                    title: "Digital Marketing Manager → Senior Manager",
                    company: "TSI — Transworld Systems Inc.",
                    period: "May 2015 – Aug 2017",
                    highlights: ["Initiated digital transformation; built first web presence and SEO programs"],
                  },
                  {
                    title: "Content Creator",
                    company: "Brad's Deals",
                    period: "Feb 2013 – Apr 2015",
                    highlights: ["Editorial lead for consumer blog with 10M+ monthly visitors"],
                  },
                  {
                    title: "Executive Search Associate",
                    company: "Reilly Partners",
                    period: "2012 – 2014",
                    highlights: ["C-level search research and candidate narrative development for Fortune 500 clients"],
                  },
                  {
                    title: "BD & Marketing Intern",
                    company: "Patrons of the Arts in the Vatican Museums",
                    period: "2009 – 2012",
                    highlights: ["International nonprofit business development and donor communications"],
                  },
                ].map((exp, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-sky-400 text-sm">{exp.company}</p>
                      </div>
                      <span className="text-xs text-slate-500 font-mono whitespace-nowrap ml-4">{exp.period}</span>
                    </div>
                    <ul className="space-y-1">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="text-sm text-slate-400 flex items-start gap-2">
                          <span className="text-sky-500 mt-1 text-xs">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === "contact" && (
          <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Let&apos;s Build Something</h1>
            <p className="text-slate-400 mb-12">
              I&apos;m exploring VP/CMO/Head of GTM opportunities at AI-forward companies.
              If you&apos;re building something ambitious, I&apos;d love to hear about it.
            </p>

            <div className="grid gap-4 mb-12">
              {[
                { label: "Email", value: "connor.laughlin@gmail.com", icon: "📧" },
                { label: "Phone", value: "+1 925-451-7011", icon: "📱" },
                { label: "LinkedIn", value: "linkedin.com/in/connorlaughlin", icon: "🔗" },
                { label: "Location", value: "Chicago, Illinois", icon: "📍" },
              ].map((c, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="text-left">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{c.label}</p>
                    <p className="text-white">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-sky-500/10 to-violet-500/10 border border-sky-500/20 rounded-xl p-8">
              <p className="text-lg font-medium mb-2">Currently Open To</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["VP Marketing", "CMO", "Head of GTM", "VP Revenue Ops", "AI Strategy Lead"].map((role, i) => (
                  <span key={i} className="bg-sky-500/20 text-sky-400 px-3 py-1.5 rounded-lg text-sm">{role}</span>
                ))}
              </div>
              <p className="text-slate-500 text-sm mt-4">AI-forward unicorns, enterprise SaaS, and high-growth startups</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>Connor J. Laughlin — Builder. Storyteller. Revenue Architect.</p>
        <p className="mt-1">Chicago, IL | connor.laughlin@gmail.com</p>
      </footer>
    </div>
  );
}
