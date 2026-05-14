import { availability, roles, fitNotes } from "@/content/hire-signal";

const INTENSITY_LABEL: Record<typeof roles[number]["intensity"], string> = {
  open: "Open now",
  warm: "Warm fit",
  selective: "Selective",
};

const INTENSITY_DOT: Record<typeof roles[number]["intensity"], string> = {
  open: "bg-accent",
  warm: "bg-paper/60",
  selective: "bg-paper/30",
};

export function HireSignal() {
  return (
    <section
      id="hire-signal"
      aria-labelledby="hire-signal-heading"
      className="py-24 px-6 border-t border-rule scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-5">
              Hire signal
            </span>
            <h2
              id="hire-signal-heading"
              className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
            >
              What I am open to right now.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end space-y-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  availability.state === "available"
                    ? "bg-accent shadow-[0_0_12px_var(--accent)]"
                    : availability.state === "exploring"
                      ? "bg-paper/60"
                      : "bg-paper/25"
                } animate-pulse motion-reduce:animate-none`}
              />
              <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-paper/80">
                {availability.state === "available"
                  ? "Available"
                  : availability.state === "exploring"
                    ? "Exploring"
                    : "Closed"}
              </span>
            </div>
            <p className="text-paper/75 text-base leading-relaxed">
              {availability.line}
            </p>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-rule">
          {roles.map((role) => (
            <li
              key={role.title}
              className="bg-ink p-6 hover:bg-paper/[0.02] transition-colors flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-2 w-2 rounded-full ${INTENSITY_DOT[role.intensity]}`}
                  />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/65">
                    {INTENSITY_LABEL[role.intensity]}
                  </span>
                </span>
              </div>
              <h3 className="font-display text-xl leading-snug">
                {role.title}
              </h3>
              <p className="text-paper/65 text-sm leading-relaxed">
                {role.note}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-8 flex flex-wrap gap-2">
          {fitNotes.map((note) => (
            <li
              key={note}
              className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper/70 border border-rule px-2.5 py-1 rounded-full"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
