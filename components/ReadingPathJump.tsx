"use client";

type Props = {
  tldrId: string;
  fivePartId: string;
  longformHref?: string;
};

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Update the URL hash without a full navigation
  if (typeof history !== "undefined") {
    history.replaceState(null, "", `#${id}`);
  }
}

export function ReadingPathJump({ tldrId, fivePartId, longformHref }: Props) {
  return (
    <nav
      aria-label="Reading depth"
      className="flex flex-wrap gap-2 mt-6"
    >
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/55 self-center mr-2">
        Read it in:
      </span>
      <button
        type="button"
        onClick={() => scrollToId(tldrId)}
        className="font-mono text-[10px] tracking-[0.2em] uppercase border border-rule px-3.5 py-2 rounded-full text-paper/75 hover:border-accent hover:text-accent transition-colors"
      >
        TLDR · 90 sec
      </button>
      <button
        type="button"
        onClick={() => scrollToId(fivePartId)}
        className="font-mono text-[10px] tracking-[0.2em] uppercase border border-rule px-3.5 py-2 rounded-full text-paper/75 hover:border-accent hover:text-accent transition-colors"
      >
        5-min case · 5 min
      </button>
      {longformHref ? (
        <a
          href={longformHref}
          className="font-mono text-[10px] tracking-[0.2em] uppercase border border-accent text-accent px-3.5 py-2 rounded-full hover:bg-accent hover:text-ink transition-colors"
        >
          Full walk-through · 15 min <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </nav>
  );
}
