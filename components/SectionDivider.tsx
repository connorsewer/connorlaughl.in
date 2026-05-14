import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  fig: string;
  caption: string;
  /** Aspect ratio of the divider strip. Defaults to 16:4 (a thin band). */
  aspect?: string;
};

/**
 * Section divider plate. Lighter than the .dither-frame used on featured
 * figures: a thin 1px ink stroke around the image with the fig caption
 * underneath, set inside the same 6rem outer gutter as the rest of the
 * page so it reads as a page break in a reference manual.
 *
 * Use sparingly: at most one between major homepage sections.
 */
export function SectionDivider({
  src,
  alt,
  fig,
  caption,
  aspect = "16 / 4",
}: Props) {
  return (
    <div className="px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <figure className="flex flex-col gap-3">
          <div
            className="relative w-full overflow-hidden border border-rule bg-ink"
            style={{ aspectRatio: aspect }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/55 flex flex-wrap items-baseline gap-x-3">
            <span className="fig-num">{fig}</span>
            <span aria-hidden="true">·</span>
            <span className="normal-case tracking-wide text-paper/65">
              {caption}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
