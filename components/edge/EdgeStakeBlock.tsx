import { SplitText } from "@/components/SplitText";

/**
 * Stake block. Single mono-italic editorial line that sits between the
 * hero and the chapter run. Letters reveal word-by-word on viewport entry.
 *
 * The two sentences split on a period for a deliberate beat, and the
 * second sentence sits in the accent color so the bottleneck idea reads
 * as the page's stake.
 */
export function EdgeStakeBlock() {
  return (
    <section
      aria-label="Stake"
      className="px-6 py-16 md:py-24 border-y border-rule"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-balance text-2xl md:text-4xl leading-[1.2] text-paper/90">
          <SplitText
            as="span"
            granularity="word"
            className="font-display font-light italic"
          >
            Generation is cheap.
          </SplitText>{" "}
          <SplitText
            as="span"
            granularity="word"
            delay={0.35}
            className="font-display font-light italic text-accent"
          >
            The bottleneck is recognition.
          </SplitText>
        </p>
      </div>
    </section>
  );
}
