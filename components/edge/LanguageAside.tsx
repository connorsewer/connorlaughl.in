type Props = {
  fig: string;
  principle: string;
  signature: string;
};

/**
 * Language aside. Fig-captioned sidebar block that carries the two
 * externally-facing lines per skill: a first-person principle (the
 * position the chapter publishes) and the concrete behavioral
 * signature (what this looks like in operator work). Reads as
 * paratext: a slightly tinted paper background, a thin walnut
 * hairline frame, and mono labels next to a GT Sectra body.
 *
 * data-cursor="quote" triggers the site's cursor "Quote" label on
 * hover so the aside reads as a magazine quote-box.
 */
export function LanguageAside({ fig, principle, signature }: Props) {
  const rows = [
    { label: "Principle", text: principle },
    { label: "Signature", text: signature },
  ];
  return (
    <aside
      data-cursor="quote"
      className="border border-paper/15 bg-paper/[0.025] p-6 md:p-8 max-w-[60ch] flex flex-col gap-5"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-paper/55 fig-num">
        [{fig}]
      </span>
      <dl className="flex flex-col gap-5">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[5.5rem_1fr] gap-3 md:gap-5 items-baseline"
          >
            <dt className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">
              {r.label}
            </dt>
            <dd className="font-display text-[0.9375rem] md:text-base leading-[1.5] text-paper/85">
              {r.text}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
