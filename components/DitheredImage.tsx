import Image from "next/image";

type Ratio = "1:1" | "16:9" | "4:3" | "2:3" | "3:2";

const ratioToAspect: Record<Ratio, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "2:3": "aspect-[2/3]",
  "3:2": "aspect-[3/2]",
};

type Props = {
  fig: number;
  caption: string;
  alt: string;
  ratio?: Ratio;
  src?: string;
  mode?: "image" | "placeholder";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function DitheredImage({
  fig,
  caption,
  alt,
  ratio = "16:9",
  src,
  mode,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: Props) {
  const figLabel = `Fig. ${fig.toString().padStart(2, "0")}`;
  const resolvedMode = mode ?? (src ? "image" : "placeholder");

  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="dither-frame w-full">
        <div className={`frame-well relative w-full overflow-hidden bg-ink ${ratioToAspect[ratio]}`}>
          {resolvedMode === "image" && src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          ) : (
            <div
              aria-label={alt}
              role="img"
              className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(0deg,transparent_0,transparent_3px,rgba(7,7,7,0.04)_3px,rgba(7,7,7,0.04)_4px)]"
            >
              <span className="font-pixel text-paper/40 text-xs tracking-[0.2em] uppercase">
                [{figLabel.toUpperCase()} — image pending]
              </span>
            </div>
          )}
        </div>
      </div>
      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.2em] uppercase text-paper/55">
        <span className="fig-num">{figLabel}</span>
        <span aria-hidden="true">·</span>
        <span className="normal-case tracking-wide text-paper/65">{caption}</span>
      </figcaption>
    </figure>
  );
}
