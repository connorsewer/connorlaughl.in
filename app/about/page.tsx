import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Connor J. Laughlin",
  description:
    "The part around the work. Kristin, three dogs, a big family, Liverpool FC, golf, cooking, travel, and what's currently on the desk.",
};

const rooms = [
  {
    eyebrow: "Home",
    title: "Married Kristin in Rome.",
    body:
      "We got married in Rome in November 2025. Italian weddings have a way of stretching across days, and ours did, in the best way. Most of what's good in my life now traces back to Kristin. The easy stuff and the hard stuff, both.",
    state: "ON · 2025",
  },
  {
    eyebrow: "Dogs",
    title: "A three-dog household.",
    body:
      "Sophie is 16 and dignified. Henry is 2 and convinced he's the protagonist. Lulu is 3 months and learning that gravity exists. The energy ranges from wise elder to tiny chaos gremlin, sometimes inside the same hour.",
    state: "ACTIVE",
  },
  {
    eyebrow: "Family",
    title: "Oldest of five.",
    body:
      "I have four siblings and two parents who live a short drive away in the North Shore. Big family means a packed table at every holiday and someone always in the group chat. My nephew George is 5, and we've started building Lego sets together. Turns out 5 is the right age to be slightly competitive about following the instructions.",
    state: "CONSTANT",
  },
  {
    eyebrow: "Course",
    title: "Golf at a 7.8 index.",
    body:
      "Currently playing to a 7.8. Look me up on GHIN. Just put the new Titleist T-100 irons in the bag and they're already finding fairways I didn't know about. Best round? Doesn't matter much. Worst round? Healing slowly.",
    state: "7.8 · GHIN",
  },
  {
    eyebrow: "Kitchen",
    title: "Most nights, dinner.",
    body:
      "I cook for Kristin and me almost every night. It's the part of the day I get to slow down without trying. We also eat our way around Chicago when we can. There's no shortage of good rooms in this city, and we're making a small dent.",
    state: "DAILY",
  },
  {
    eyebrow: "Field",
    title: "Sport and the gym.",
    body:
      "Liverpool FC and Chicago sports, with all the unreasonable hope that requires. Lifting clears my head and keeps the rest of the machine from getting weird. The gym is calendar armor.",
    state: "ON ROTATION",
  },
];

const reading = [
  { title: "The Devil's Chessboard", author: "David Talbot" },
  {
    title: "The Art of Doing Science and Engineering",
    subtitle: "Learning to Learn",
    author: "Richard W. Hamming",
  },
  { title: "The Faith of Beasts", author: "James S.A. Corey" },
  { title: "Welcome to the Era of Experience", author: "Silver & Sutton" },
  { title: "Hyperion Cantos", author: "Dan Simmons" },
  { title: "Vineland", author: "Thomas Pynchon" },
];

const films = [
  "The Nice Guys (2016)",
  "Sorcerer (1975)",
  "Thief (1981)",
  "Barry Lyndon (1975)",
  "Man on Fire (2004)",
  "Michael Clayton (2007)",
];

const tv = [
  "Widow's Bay",
  "Andor, Seasons 1 and 2",
  "The Sopranos, Season 4",
  "The Expanse, Season 2",
  "Summer House, Season 10",
];

const playing = ["Marathon", "Diablo IV"];

const building = [
  "A handful of projects in Claude Code.",
  "Recruiter OS for my brother Ryan, who runs in executive search.",
  "Poking around at Hermes Agent.",
  "Furniture Kristin orders that shows up unannounced.",
  "Lego sets with my nephew George (age 5).",
];

const travel = [
  {
    place: "Rome, Florence, Milan, the Dolomites · Italy",
    note: "Wedding territory, plus where I started at the Vatican Museums.",
  },
  {
    place: "Banff · Canada",
    note: "Mountains big enough to make you quiet.",
  },
  {
    place: "London, Cambridge, Liverpool · UK",
    note: "Football and libraries. A lot of walking in between.",
  },
  {
    place: "Paris · France",
    note: "Eat slow. Walk slower.",
  },
  {
    place: "Santander · Spain",
    note: "Underrated coast, great seafood, no tourists.",
  },
  {
    place: "Dublin, Doonbeg, Lahinch · Ireland",
    note: "The greenest green I've ever seen, and some of the best golf there is.",
  },
  {
    place: "Tokyo · Japan",
    note: "Cleanest city I've ever been in. Dinner is a religion.",
  },
  {
    place: "Manila, Boracay · The Philippines",
    note: "Warm water, big family welcomes.",
  },
  {
    place: "Vienna · Austria",
    note: "Classical music in the right rooms.",
  },
];

type Photo = {
  src: string;
  alt: string;
  fig: number;
  caption: string;
  ratio?: string; // legacy, unused. Frame sizes from PHOTO_DIMS.
  span: 4 | 6 | 8 | 12;
};

// Actual webp pixel dimensions per source. Frame matches each image exactly.
const PHOTO_DIMS: Record<string, [number, number]> = {
  "/about/anfield.webp": [1400, 1750],
  "/about/car-sandwiches.webp": [1400, 1750],
  "/about/castel-bride.webp": [1400, 934],
  "/about/colosseum.webp": [1400, 788],
  "/about/dog-asleep.webp": [1400, 2488],
  "/about/family-rome.webp": [1400, 1750],
  "/about/music-box.webp": [1400, 2488],
  "/about/phone-booth.webp": [1400, 1750],
  "/about/tweeds.webp": [1400, 1750],
  "/about/wedding-courtyard.webp": [1400, 1750],
  "/about/wedding-toast.webp": [1400, 1750],
};

const photos: Photo[] = [
  {
    src: "/about/wedding-toast.webp",
    alt: "Connor giving a toast at the wedding reception, rendered in stippled black-and-white.",
    fig: 14,
    caption: "Toast · Reception · 2025",
    ratio: "4/5",
    span: 4,
  },
  {
    src: "/about/anfield.webp",
    alt: "Connor at the Shankly Gates of Anfield, wearing a Liverpool FC scarf.",
    fig: 15,
    caption: "Anfield · You'll Never Walk Alone · 2019",
    ratio: "4/5",
    span: 4,
  },
  {
    src: "/about/dog-asleep.webp",
    alt: "Lulu, the youngest dog at 8 weeks, asleep on a herringbone blanket in the back of the car.",
    fig: 16,
    caption: "Lulu · 8 weeks old",
    ratio: "9/16",
    span: 4,
  },
  {
    src: "/about/family-rome.webp",
    alt: "Connor and Kristin laughing with their young godson Lenox in Rome at sunset.",
    fig: 17,
    caption: "With godson Lenox · Rome · Sundown",
    ratio: "4/5",
    span: 4,
  },
  {
    src: "/about/colosseum.webp",
    alt: "The Colosseum at dusk through cypress trees in Rome.",
    fig: 18,
    caption: "Colosseum at dusk · Rome",
    ratio: "16/9",
    span: 8,
  },
  {
    src: "/about/wedding-courtyard.webp",
    alt: "Connor and Kristin in formal dress under a wrought-iron lamp post in a Roman courtyard.",
    fig: 19,
    caption: "Wedding rehearsal · Vatican City · 2025",
    ratio: "4/5",
    span: 4,
  },
  {
    src: "/about/music-box.webp",
    alt: "The neon Music Box theatre marquee in Chicago at night, advertising One Battle After Another in 70mm.",
    fig: 20,
    caption: "Music Box Theater · OBAA 70mm · Opening Night",
    ratio: "9/16",
    span: 4,
  },
  {
    src: "/about/castel-bride.webp",
    alt: "Bride and groom standing near Castel Sant'Angelo in Rome with a vintage car blurring past.",
    fig: 21,
    caption: "Castel Sant'Angelo · Rome · 2025",
    ratio: "3/2",
    span: 8,
  },
  {
    src: "/about/car-sandwiches.webp",
    alt: "Connor and Kristin eating sandwiches in the front seat of the car on a road trip.",
    fig: 22,
    caption: "Road trip lunch · Two halves",
    ratio: "4/5",
    span: 4,
  },
  {
    src: "/about/phone-booth.webp",
    alt: "Connor leaning on a sticker-covered phone booth in Florence on a sunny afternoon.",
    fig: 23,
    caption: "Phone booth · Florence",
    ratio: "4/5",
    span: 4,
  },
  {
    src: "/about/tweeds.webp",
    alt: "A close-up of tweed and herringbone jackets hanging in a Savile Row shop.",
    fig: 24,
    caption: "Tweeds · Detail · Savile Row",
    ratio: "4/5",
    span: 4,
  },
];

const spanClass: Record<Photo["span"], string> = {
  4: "md:col-span-6 lg:col-span-4",
  6: "md:col-span-6 lg:col-span-6",
  8: "md:col-span-12 lg:col-span-8",
  12: "md:col-span-12 lg:col-span-12",
};

export default function AboutPage() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content" className="min-h-screen pt-32 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          {/* HERO ============================================ */}
          <section
            aria-labelledby="about-heading"
            className="grid lg:grid-cols-12 gap-12 items-end"
          >
            <div className="lg:col-span-7 flex flex-col gap-10">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase">
                  About
                </span>
                <h1
                  id="about-heading"
                  className="mt-6 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] tracking-tight text-balance"
                >
                  The part{" "}
                  <span className="italic text-accent">around the work.</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-paper/70 leading-relaxed text-balance max-w-2xl">
                I spend a lot of time thinking about systems, stories, and how work moves. Away from the laptop, life is smaller and better. Kristin. Three dogs. A big family a short drive away. Football, golf, music, movies. The kitchen. The road.
              </p>

              <ul className="flex flex-wrap gap-2">
                {["English (native)", "Italian", "Spanish"].map((lang) => (
                  <li key={lang} className="status-pill">
                    {lang}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="lg:col-span-5 flex flex-col gap-3">
              <div className="dither-frame w-full">
                <div
                  className="frame-well relative w-full overflow-hidden bg-ink"
                  style={{ aspectRatio: "941 / 1672" }}
                >
                  <Image
                    src="/about/connor-kristin-dogs.webp"
                    alt="Connor and Kristin holding two of their dogs, Henry and Sophie, at Lago di Braies in the Italian Dolomites."
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.2em] uppercase text-paper/55">
                <span className="fig-num">Fig. 12</span>
                <span aria-hidden="true">·</span>
                <span className="normal-case tracking-wide text-paper/65">
                  Kristin, Henry, Sophie · Lago di Braies, 2025
                </span>
              </figcaption>
            </figure>
          </section>

          {/* OPENING NOTE ====================================== */}
          <section className="mt-24 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 lg:col-start-3 space-y-6 text-paper/78 text-lg leading-relaxed">
              <p className="drop-cap">
                The short version: Chicago, by way of a few unexpected stops. Vatican Museums for a college internship that turned into something longer. Executive search for a couple of years. Content at Brad&rsquo;s Deals when it was running ten million visitors a month. A decade at TSI that started as a marketing manager job and turned into building a function from the ground up.
              </p>
              <p>
                I&rsquo;m the oldest of five. Four siblings, two parents who live a short drive away in the North Shore Chicago suburbs. Holidays are loud. Group chats are louder. My nephew George is 5 and convinced he runs the Lego shop. He may be right.
              </p>
              <p>
                The longer version is mostly about people. The team I get to work with. The friends who keep me honest. Kristin, who sees things faster than I do and tells me when I&rsquo;m wrong with great precision. The three dogs who think of the calendar as a suggestion.
              </p>
              <p>
                I read a lot. I write more than I publish. I&rsquo;ve been told I think out loud, which I take as both a compliment and a warning. If we ever sit down for a coffee, I&rsquo;ll probably ask what you&rsquo;re working on before you finish your first sentence.
              </p>
            </div>
          </section>

          {/* CURRENTLY ======================================== */}
          <section
            aria-labelledby="currently-heading"
            className="mt-24"
          >
            <div className="grid lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase block mb-4">
                  Currently
                </span>
                <h2
                  id="currently-heading"
                  className="font-display text-3xl md:text-4xl leading-[1.05] text-balance"
                >
                  A snapshot of right now.
                </h2>
                <p className="mt-4 text-paper/55 text-sm font-mono tracking-[0.1em] uppercase">
                  Updated when something changes.
                </p>
              </div>

              <p className="lg:col-span-7 lg:col-start-6 text-paper/70 text-lg leading-relaxed self-end">
                What&rsquo;s open on the desk, what&rsquo;s been on the screen, what I&rsquo;m playing, and what I&rsquo;m building when nobody&rsquo;s billing for it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
              {/* Reading */}
              <div className="bg-ink p-7 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                    01
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-paper/55 uppercase">
                    Reading
                  </span>
                </div>
                <ul className="space-y-3 text-sm">
                  {reading.map((b) => (
                    <li key={b.title} className="leading-snug">
                      <span className="font-display text-base text-paper/90 block">
                        {b.title}
                        {b.subtitle ? (
                          <span className="text-paper/55"> : {b.subtitle}</span>
                        ) : null}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.15em] text-paper/45 uppercase mt-0.5 block">
                        {b.author}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Watching */}
              <div className="bg-ink p-7 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                    02
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-paper/55 uppercase">
                    Watching
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-paper/40 uppercase mb-2">
                    Films
                  </p>
                  <ul className="space-y-1.5 text-sm text-paper/85 leading-snug mb-5">
                    {films.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-paper/40 uppercase mb-2">
                    TV
                  </p>
                  <ul className="space-y-1.5 text-sm text-paper/85 leading-snug">
                    {tv.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Playing */}
              <div className="bg-ink p-7 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                    03
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-paper/55 uppercase">
                    Playing
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-paper/85 leading-snug">
                  {playing.map((p) => (
                    <li key={p} className="font-display text-lg">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-paper/45 text-xs leading-relaxed mt-auto">
                  Marathon for the slow-burn extraction sessions. Diablo IV for the loop.
                </p>
              </div>

              {/* Building */}
              <div className="bg-ink p-7 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                    04
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-paper/55 uppercase">
                    Building
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-paper/85 leading-snug">
                  {building.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent shrink-0 mt-0.5">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ROOMS ============================================ */}
          <section
            aria-labelledby="rooms-heading"
            className="mt-24"
          >
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase block mb-4">
                  Rooms
                </span>
                <h2
                  id="rooms-heading"
                  className="font-display text-3xl md:text-4xl leading-[1.05] text-balance"
                >
                  How the rest of the days run.
                </h2>
              </div>
            </div>

            <ul className="grid md:grid-cols-2 gap-px bg-rule">
              {rooms.map((r, i) => (
                <li
                  key={r.title}
                  className="bg-ink p-7 md:p-8 hover:bg-paper/[0.02] transition-colors flex flex-col gap-4 relative overflow-hidden group"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 -right-2 font-display text-[7rem] leading-none text-paper/[0.04] group-hover:text-accent/[0.08] transition-colors pointer-events-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center justify-between gap-3 relative">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
                      {r.eyebrow}
                    </span>
                    <span className="status-pill pixel-flicker">{r.state}</span>
                  </div>
                  <h3 className="relative font-display text-2xl md:text-3xl leading-tight text-balance">
                    {r.title}
                  </h3>
                  <p className="relative text-paper/65 text-base leading-relaxed">
                    {r.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* PHOTOGRAPHS ===================================== */}
          <section
            aria-labelledby="photographs-heading"
            className="mt-24"
          >
            <div className="grid lg:grid-cols-12 gap-12 mb-10">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase block mb-4">
                  Photographs
                </span>
                <h2
                  id="photographs-heading"
                  className="font-display text-3xl md:text-4xl leading-[1.05] text-balance"
                >
                  A few rolls of film.
                </h2>
              </div>
              <p className="lg:col-span-7 lg:col-start-6 text-paper/65 text-base leading-relaxed self-end">
                Wedding, family, football, the road. Mostly recent, mostly Rome, mostly the people in the rest of the page made into pictures.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {photos.map((p) => {
                const figLabel = `Fig. ${p.fig.toString().padStart(2, "0")}`;
                const [pw, ph] = PHOTO_DIMS[p.src] ?? [1400, 1750];
                return (
                  <li key={p.src} className={`flex flex-col gap-3 ${spanClass[p.span]}`}>
                    <figure className="flex flex-col gap-3">
                      <div className="dither-frame w-full">
                        <div className="frame-well relative w-full">
                          <Image
                            src={p.src}
                            alt={p.alt}
                            width={pw}
                            height={ph}
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="block w-full h-auto"
                          />
                        </div>
                      </div>
                      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55">
                        <span className="fig-num">{figLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="normal-case tracking-wide text-paper/65">
                          {p.caption}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* TRAVEL =========================================== */}
          <section
            aria-labelledby="travel-heading"
            className="mt-24"
          >
            <div className="grid lg:grid-cols-12 gap-12 mb-10">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase block mb-4">
                  Travel
                </span>
                <h2
                  id="travel-heading"
                  className="font-display text-3xl md:text-4xl leading-[1.05] text-balance"
                >
                  Maps and stamps.
                </h2>
                <p className="mt-4 text-paper/55 text-base leading-relaxed">
                  A short list of places I&rsquo;d happily go back to. Mostly road trips and long flights, all with a notebook in the bag.
                </p>
              </div>

              <dl className="lg:col-span-7 lg:col-start-6 grid gap-px bg-rule">
                {travel.map((t) => (
                  <div
                    key={t.place}
                    className="bg-ink py-5 px-6 grid md:grid-cols-[14rem_1fr] gap-2 md:gap-8 hover:bg-paper/[0.02] transition-colors"
                  >
                    <dt className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase self-start">
                      {t.place}
                    </dt>
                    <dd className="text-paper/80 text-base leading-relaxed">
                      {t.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* CTA ============================================== */}
          <section className="mt-24 flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/case-studies"
              className="cta-scan font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-8 py-4 rounded-full hover:bg-paper transition-colors text-center"
            >
              Read the work <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-colors text-center text-paper/85"
            >
              Back home
            </Link>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-rule px-6 mt-16">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 font-mono text-[9px] tracking-[0.3em] uppercase">
          <span>© 2026 Connor J. Laughlin</span>
          <span>Chicago</span>
          <span>Built in 2026</span>
        </div>
      </footer>
    </div>
  );
}
