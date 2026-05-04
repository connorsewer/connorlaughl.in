import { flagshipSystems } from "@/content/flagship-systems";

export function FlagshipSystems() {
  return (
    <section
      id="flagship-systems"
      aria-labelledby="flagship-systems-heading"
      className="py-24 md:py-28 px-6 border-y border-rule bg-paper/[0.015]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 mb-16">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-4 uppercase block">
              Flagship Systems
            </span>
            <h2
              id="flagship-systems-heading"
              className="font-display text-4xl md:text-6xl leading-tight"
            >
              Proof that I build
              <br />
              <span className="text-accent italic">operating leverage.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-paper/72 text-lg leading-relaxed">
              The portfolio is organized around systems: how ambiguity becomes
              instrumented workflow, governed AI, accountable pipeline, and a
              market narrative sales teams can actually run.
            </p>
          </div>
        </div>

        <div className="grid gap-8">
          {flagshipSystems.map((system, index) => (
            <article
              key={system.slug}
              className="group grid lg:grid-cols-[0.45fr_1fr] gap-8 p-7 md:p-10 border border-rule bg-paper/[0.018] hover:border-accent/70 transition-all duration-300 hover:bg-paper/[0.035]"
            >
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase block mb-4">
                    0{index + 1} / {system.eyebrow}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight group-hover:text-accent transition-colors">
                    {system.title}
                  </h3>
                </div>
                <p className="text-paper/72 leading-relaxed">{system.thesis}</p>
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-paper/58 leading-relaxed border-l border-accent pl-4">
                  {system.interviewLine}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.25em] text-paper/58 uppercase mb-2">
                      Problem
                    </h4>
                    <p className="text-paper/70 text-sm leading-relaxed">
                      {system.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.25em] text-paper/58 uppercase mb-2">
                      System
                    </h4>
                    <p className="text-paper/70 text-sm leading-relaxed">
                      {system.system}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.25em] text-paper/58 uppercase mb-2">
                      Governance
                    </h4>
                    <p className="text-paper/70 text-sm leading-relaxed">
                      {system.governance}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-3">
                      Operating Proof
                    </h4>
                    <ul className="space-y-3">
                      {system.proof.map((proof) => (
                        <li
                          key={proof}
                          className="text-paper/76 text-sm leading-relaxed flex gap-3"
                        >
                          <span className="text-accent">→</span>
                          <span>{proof}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.25em] text-paper/58 uppercase mb-3">
                      Redacted Artifact Slots
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {system.artifacts.map((artifact) => (
                        <span
                          key={artifact}
                          className="font-mono text-[9px] tracking-[0.14em] uppercase border border-rule bg-ink/30 px-3 py-2 text-paper/62"
                        >
                          {artifact}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
