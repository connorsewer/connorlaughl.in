import Link from "next/link";
import { nowEntries } from "@/content/now-feed";

const KIND_LABEL: Record<string, string> = {
  building: "Building",
  reading: "Reading",
  shipping: "Shipped",
  learning: "Learning",
};

const KIND_DOT: Record<string, string> = {
  building: "bg-accent",
  reading: "bg-paper/55",
  shipping: "bg-[var(--terminal-green)]",
  learning: "bg-paper/35",
};

function fmt(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NowFeed() {
  return (
    <section
      aria-labelledby="now-heading"
      className="py-24 px-6 border-t border-rule"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-5">
              Now
            </span>
            <h2
              id="now-heading"
              className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
            >
              What I am building and reading right now.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-paper/70 text-lg leading-relaxed">
              The case studies are the past tense. This is the present. New
              entries show up here when something ships or starts.
            </p>
          </div>
        </div>

        <ol className="grid md:grid-cols-2 gap-px bg-rule">
          {nowEntries.map((entry) => (
            <li
              key={`${entry.kind}-${entry.title}-${entry.date}`}
              className="bg-ink p-6 flex flex-col gap-3 hover:bg-paper/[0.02] transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-2 w-2 rounded-full ${KIND_DOT[entry.kind] ?? "bg-paper/40"}`}
                  />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/65">
                    {KIND_LABEL[entry.kind] ?? entry.kind}
                  </span>
                </span>
                <time
                  dateTime={entry.date}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45"
                >
                  {fmt(entry.date)}
                </time>
              </div>
              <h3 className="font-display text-lg leading-snug">
                {entry.title}
              </h3>
              <p className="text-paper/70 text-sm leading-relaxed">
                {entry.body}
              </p>
              {entry.ref ? (
                entry.ref.startsWith("/") ? (
                  <Link
                    href={entry.ref}
                    className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent hover:text-paper transition-colors mt-auto"
                  >
                    Open <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <a
                    href={entry.ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent hover:text-paper transition-colors mt-auto"
                  >
                    Open <span aria-hidden="true">→</span>
                  </a>
                )
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
