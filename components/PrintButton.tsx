"use client";

type Props = {
  label?: string;
  className?: string;
};

export function PrintButton({
  label = "Print or save PDF",
  className = "font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-5 py-2.5 rounded-full hover:border-accent hover:text-accent transition-colors",
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
