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
            <span className="meta-label-accent mb-4 block">
              Flagship Systems
            </span>
            <h2
              id="flagship-systems-heading"
              className="font-display text-4xl md:text-6xl leading-tight"
            >
              Systems I&apos;ve built
              <br />
              <span className="text-accent italic">and what they prove.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-paper/72 text-lg leading-relaxed">
              These are the systems that explain how I work. Each one started
              as a messy business problem, then became a repeatable operating
              model with owners, rules, proof, and a clearer next step.
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
                  <span className="meta-label-accent block mb-4">
                    0{index + 1} / {system.eyebrow}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight group-hover:text-accent transition-colors">
                    {system.title}
                  </h3>
                </div>
                <p className="text-paper/72 leading-relaxed">{system.thesis}</p>
                <div className="border border-rule bg-ink/[0.16] p-4">
                  <h4 className="meta-label-accent mb-2">
                    In plain English
                  </h4>
                  <p className="text-paper/76 text-sm leading-relaxed">
                    {system.plainEnglish}
                  </p>
                </div>
                <p className="meta-label-subtle leading-relaxed border-l border-accent pl-4">
                  {system.interviewLine}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <h4 className="meta-label-muted mb-2">
                      Problem
                    </h4>
                    <p className="text-paper/70 text-sm leading-relaxed">
                      {system.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="meta-label-muted mb-2">
                      System
                    </h4>
                    <p className="text-paper/70 text-sm leading-relaxed">
                      {system.system}
                    </p>
                  </div>
                  <div>
                    <h4 className="meta-label-muted mb-2">
                      Governance
                    </h4>
                    <p className="text-paper/70 text-sm leading-relaxed">
                      {system.governance}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="meta-label-accent mb-3">
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
                    <h4 className="meta-label-muted mb-3">
                      Redacted System Artifacts
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {system.artifacts.map((artifact) => (
                        <span
                          key={artifact}
                          className="meta-label-subtle border border-rule bg-ink/30 px-3 py-2"
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
