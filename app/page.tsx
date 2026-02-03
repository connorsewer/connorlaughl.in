import { Header } from "@/components/Header";
import { ProofExplorer } from "@/components/ProofExplorer";
import { caseStudies } from "@/content/case-studies";

export default function Home() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />
      
      <main id="main-content">
        {/* HERO SECTION */}
        <section aria-labelledby="hero-heading" className="min-h-screen flex flex-col justify-center px-6 pt-20">
          <div className="mx-auto max-w-6xl w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
              <div className="max-w-3xl">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-6 uppercase block">
                  The Architecture of Trust
                </span>
                <h1 id="hero-heading" className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] tracking-tight mb-8">
                  GTM Ops <br />
                  & Systems <br />
                  <span className="text-accent italic">Architecture.</span>
                </h1>
                <p className="text-xl md:text-2xl text-paper/60 max-w-xl leading-tight text-balance">
                  I build AI-native revenue systems for high-stakes B2B. Moving legacy friction into digital-first leverage.
                </p>
              </div>
              
              <div className="hidden lg:block w-px h-64 bg-rule" role="separator" aria-hidden="true"></div>
              
              <aside aria-labelledby="stats-heading" className="flex flex-col gap-8 lg:w-64">
                <h2 id="stats-heading" className="sr-only">Key Metrics</h2>
                <div>
                  <span className="font-display text-4xl mb-1 block">$15M+</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-paper/40 uppercase block">Influenced Pipeline</span>
                </div>
                <div>
                  <span className="font-display text-4xl mb-1 block">300%</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-paper/40 uppercase block">Inbound Growth</span>
                </div>
                <div className="pt-4 border-t border-rule space-y-3">
                  <a 
                    href="#catalogue" 
                    className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase hover:text-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded inline-block"
                  >
                    Explore Index ↓
                  </a>
                  <div>
                    <a 
                      href="/case-studies" 
                      className="font-mono text-[10px] tracking-[0.2em] text-paper/60 uppercase hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded inline-block"
                    >
                      View Archive →
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CATALOGUE SECTION */}
        <section id="catalogue" aria-labelledby="catalogue-heading" className="py-32 px-6 bg-paper/[0.02] border-y border-rule">
          <h2 id="catalogue-heading" className="sr-only">Project Catalogue</h2>
          <div className="mx-auto max-w-6xl">
            <ProofExplorer items={caseStudies} />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" aria-labelledby="contact-heading" className="py-32 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-8 uppercase block">
              Get in Touch
            </span>
            <h2 id="contact-heading" className="font-display text-5xl md:text-7xl mb-12 italic">Request a Deep Dive</h2>
            <p className="text-paper/60 text-lg mb-12 text-balance">
              For executive hiring and strategic consulting. I provide redacted walkthroughs of full GTM operating blueprints.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="mailto:connor.laughlin@gmail.com"
                className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper px-10 py-4 rounded-full hover:bg-paper hover:text-ink transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                Email
              </a>
              <a 
                href="https://linkedin.com/in/connorlaughlin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/60 hover:text-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded px-4 py-2"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-rule px-6">
          <div className="mx-auto max-w-6xl flex justify-between items-center opacity-30 font-mono text-[9px] tracking-[0.3em] uppercase">
            <span>© 2026 CJL</span>
            <span>Built on Trust</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
