import type { Act } from "@/content/soft-skills";

type Props = {
  act: Act;
};

/**
 * Act header inside the operator chapter.
 *
 * Manual treatment: blueprint rule, mono act label, display title, serif
 * framing paragraph. The framing paragraph is the approved deck's, carried on
 * `ACTS[*].subtitle`. Server component with no motion, so reduced-motion needs
 * no fallback here.
 */
export function ActDivider({ act }: Props) {
  return (
    <header className="border-t border-blueprint/40 pt-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
        Act {act.number}
      </p>
      <h2 className="mt-3 font-display text-[1.75rem] leading-tight text-body-ink sm:text-[2.125rem]">
        {act.title}
      </h2>
      <p className="manual-body mt-4 max-w-[68ch]">{act.subtitle}</p>
    </header>
  );
}
