import Link from "next/link";

import { renderProofAnchor, type ProofAnchor } from "@/content/soft-skills";

type Props = {
  proof: ProofAnchor[];
};

/**
 * Proof list under an operator chapter.
 *
 * Every anchor still resolves through `renderProofAnchor()`, so the posture
 * model decides whether the internal name or the categorical phrase renders.
 * Anchors carrying a deep link become quiet blueprint links to the matching
 * chapter. Manual treatment: thin blueprint rule, mono label, serif list.
 */
export function ProofBlock({ proof }: Props) {
  /* Keys are the public categorical phrase, never the internal name. React
     keys serialize into the streamed payload, so an internal identifier used
     as a key would ship in page source even though it never renders. */
  const items = proof
    .map((p) => ({ key: p.categoricalPhrase, rendered: renderProofAnchor(p) }))
    .filter(
      (p): p is { key: string; rendered: NonNullable<ReturnType<typeof renderProofAnchor>> } =>
        p.rendered !== null,
    );

  if (items.length === 0) return null;

  return (
    <div className="mt-8 border-t border-grid-line pt-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/55">
        Proof
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((p) => (
          <li
            key={p.key}
            className="flex items-baseline gap-3 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85"
          >
            <span aria-hidden="true" className="shrink-0 text-body-ink/35">
              &middot;
            </span>
            {p.rendered.href ? (
              <Link
                href={p.rendered.href}
                className="text-blueprint underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {p.rendered.text}
              </Link>
            ) : (
              <span>{p.rendered.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
