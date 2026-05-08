type Props = {
  rows?: number;
  cols?: number;
  density?: "sparse" | "medium" | "dense";
  className?: string;
};

const palettes: Record<NonNullable<Props["density"]>, string[]> = {
  sparse: ["·", " ", " ", " ", "─", " ", " ", "·", " "],
  medium: ["·", "·", " ", "─", " ", "│", "·", " ", "┼"],
  dense: ["·", "▒", "─", "│", "┼", "·", "░", "▒", "·"],
};

function generate(rows: number, cols: number, density: NonNullable<Props["density"]>) {
  const palette = palettes[density];
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const idx = (r * 7 + c * 13) % palette.length;
      line += palette[idx];
      line += " ";
    }
    lines.push(line.trimEnd());
  }
  return lines.join("\n");
}

export function TerminalGrid({
  rows = 24,
  cols = 60,
  density = "medium",
  className = "",
}: Props) {
  const text = generate(rows, cols, density);
  return (
    <pre aria-hidden="true" className={`terminal-grid ${className}`}>
      {text}
    </pre>
  );
}
