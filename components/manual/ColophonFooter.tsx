import { CheckerBand } from "@/components/manual/CheckerBand";

/**
 * Colophon footer.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, final band —
 * a checker rule, then centred mono lines describing what the thing is and
 * what it was made with.
 *
 * The credit line is a spec §3.9 requirement, not decoration: the design
 * language here follows Dan Hollick's Making Software, and the manual says so
 * by name on every page that carries a footer.
 */

const MAKING_SOFTWARE = "https://makingsoftware.com";

export type ColophonFooterProps = {
  className?: string;
};

export function ColophonFooter({ className }: ColophonFooterProps) {
  return (
    <footer className={`w-full ${className ?? ""}`}>
      <CheckerBand />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/70">
          Connor Laughlin · Chicago
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/55">
          Design language after{" "}
          <a
            href={MAKING_SOFTWARE}
            rel="noopener noreferrer"
            target="_blank"
            className="text-blueprint underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Dan Hollick&rsquo;s Making Software
          </a>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/55">
          Set in Geist Pixel, Geist Mono, GT Sectra Fine, and Newsreader
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/55">
          Built with Next.js and Tailwind
        </p>
      </div>
    </footer>
  );
}
