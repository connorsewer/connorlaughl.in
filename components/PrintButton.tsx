"use client";

type Props = {
  label?: string;
  className?: string;
};

export function PrintButton({
  label = "Print this page",
  className = "border border-body-ink/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink transition-colors hover:border-blueprint hover:text-blueprint",
}: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className={className}
    >
      {label}
    </button>
  );
}
