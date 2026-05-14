type Item = {
  fig: string;
  label: string;
};

type Props = {
  items: Item[];
  /** Seconds for one full loop. Lower = faster scroll. */
  durationSec?: number;
  className?: string;
};

/**
 * Infinite horizontal marquee of figure-number + label pairs. Used under
 * the hero to evoke a press-release stock ticker. Pure CSS animation;
 * hover pauses via group state. Reduced-motion shows the items static.
 *
 * The items array gets doubled in the DOM so the second loop seam is
 * invisible: when the translation reaches -50%, the second copy is
 * exactly where the first started.
 */
export function FigureMarquee({
  items,
  durationSec = 38,
  className = "",
}: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`marquee group overflow-hidden border-y border-rule/70 py-3 select-none ${className}`}
      aria-hidden="true"
    >
      <ol
        className="marquee-track flex items-center gap-10 whitespace-nowrap"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        {doubled.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase"
          >
            <span className="text-accent">{item.fig}</span>
            <span className="text-paper/60">{item.label}</span>
            <span aria-hidden="true" className="text-paper/25">
              ·
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
