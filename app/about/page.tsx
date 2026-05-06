import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "About Connor Laughlin | Personal notes",
  description:
    "A brief personal note from Connor Laughlin: Kristin, Rome, three dogs, Liverpool FC, Chicago sports, gym time, movies, theatre, live music, and guitar.",
};

const personalNotes = [
  {
    number: "01",
    label: "Home",
    title: "Kristin and Rome",
    body: "I married my wife, Kristin, in Rome in November 2025. That sentence still feels slightly unreal in the best way.",
  },
  {
    number: "02",
    label: "Dogs",
    title: "A 3-dog household",
    body: "Our house runs on Sophie, Henry, and Lulu time. Sophie is 16, Henry is 2, and Lulu is 3 months, which means the energy range is basically wise elder to tiny chaos gremlin.",
  },
  {
    number: "03",
    label: "Rituals",
    title: "Sports and gym time",
    body: "I love Liverpool FC and Chicago sports, with all the unreasonable hope that requires. I also protect gym time pretty aggressively. Lifting clears my head and keeps the rest of the machine from getting weird.",
  },
  {
    number: "04",
    label: "Taste",
    title: "Movies, theatre, and music",
    body: "I love the arts: Criterion Collection nights, theatre, live music, and playing guitar badly enough to stay humble, but well enough to keep picking it back up.",
  },
];

const shortList = [
  "Liverpool FC match on whenever possible",
  "Chicago teams, because apparently character building is important",
  "The gym as calendar armor",
  "A Criterion shelf that keeps making quiet demands",
  "Theatre tickets, live music, and a guitar within reach",
];

export default function AboutPage() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content" className="min-h-screen px-6 pt-32 pb-20">
        <section aria-labelledby="about-heading" className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <span className="meta-label-accent mb-6 block">About</span>
              <h1
                id="about-heading"
                className="font-display text-[clamp(3.4rem,10vw,7rem)] leading-[0.9] tracking-tight"
              >
                The part
                <br />
                <span className="text-accent italic">around the work.</span>
              </h1>
            </div>

            <div className="max-w-2xl text-lg leading-relaxed text-paper/76 md:text-xl">
              <p>
                I spend a lot of time thinking about systems, stories, and how work actually gets done. Away from the laptop, life is smaller and better: Kristin, 3 dogs, football, movies, music, and getting to the gym before the day can talk me out of it.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {personalNotes.map((note) => (
              <article
                key={note.title}
                className="group relative overflow-hidden rounded-3xl border border-rule bg-paper/[0.018] p-7 transition-colors hover:border-accent/70"
              >
                <div className="absolute -right-2 -top-6 font-display text-[8rem] leading-none text-paper/[0.035] transition-colors group-hover:text-accent/[0.08]">
                  {note.number}
                </div>
                <div className="relative">
                  <span className="meta-label-accent mb-5 block">{note.label}</span>
                  <h2 className="font-display text-3xl leading-tight text-paper">
                    {note.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-paper/72 md:text-base">
                    {note.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <section
            aria-labelledby="personal-index-heading"
            className="mt-16 rounded-3xl border border-rule bg-ink/35 p-7 md:p-10"
          >
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="meta-label-accent mb-4 block">Personal index</span>
                <h2 id="personal-index-heading" className="font-display text-4xl leading-tight">
                  Things that keep me human.
                </h2>
              </div>

              <ul className="grid gap-4">
                {shortList.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-rule pb-4 text-paper/74 last:border-b-0 last:pb-0">
                    <span className="mt-1 text-accent">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/case-studies"
              className="rounded-full bg-accent px-8 py-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-all hover:bg-paper"
            >
              Read the work →
            </Link>
            <Link
              href="/"
              className="rounded-full border border-paper/40 px-8 py-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper/82 transition-all hover:border-accent hover:text-accent"
            >
              Back home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
