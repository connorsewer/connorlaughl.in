type Props = {
  number: string;
  name: string;
  headingId: string;
};

/**
 * Chapter masthead. Giant two-digit number in GT Sectra Fine Black
 * with a stippled dithered drop-shadow plate offset down-right, and
 * the skill name underneath as the chapter's H2.
 *
 * The number is decorative (aria-hidden); the H2 carries an sr-only
 * "Chapter NN." prefix so screen readers announce the chapter index
 * when navigating headings.
 *
 * The dithered shadow is a radial-gradient pattern clipped to the
 * letterforms via background-clip: text. CSS-only letterpress.
 */
export function ChapterPlate({ number, name, headingId }: Props) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <span
        aria-hidden="true"
        className="relative inline-block font-display font-black leading-[0.85] text-[clamp(5.5rem,15vw,11rem)] text-paper select-none"
      >
        <span
          className="absolute inset-0"
          style={{
            transform: "translate(0.06em, 0.06em)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            backgroundImage:
              "radial-gradient(circle, var(--dither-shadow) 1px, transparent 1.5px)",
            backgroundSize: "0.06em 0.06em",
          }}
        >
          {number}
        </span>
        <span className="relative">{number}</span>
      </span>
      <h2
        id={headingId}
        className="font-display font-medium text-xl md:text-2xl leading-[1.2] tracking-tight text-balance text-paper max-w-[24ch]"
      >
        <span className="sr-only">Chapter {number}. </span>
        {name}
      </h2>
    </div>
  );
}
