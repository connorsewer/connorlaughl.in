import { Fragment, type ReactNode } from "react";

/**
 * Minimal markdown renderer for long-form case-study pages.
 *
 * Supports: ATX headings (# through ####), paragraphs, ordered and unordered
 * lists, blockquotes, horizontal rules, fenced code blocks, inline bold,
 * inline italic, inline code, links, and line breaks.
 *
 * No external dependency, no innerHTML. Intended for trusted in-repo content.
 */

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "hr" }
  | { type: "code"; lang?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

function tokenize(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (/^---+\s*$/.test(line) || /^\*{3,}\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || undefined;
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: "code", lang, text: buf.join("\n") });
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length as 1 | 2 | 3 | 4;
      const text = heading[2].trim();
      const type = (`h${level}` as const) as Block["type"];
      blocks.push({ type, text } as Block);
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "blockquote", text: buf.join(" ") });
      continue;
    }

    // Pipe-table:
    //   | Col1 | Col2 |
    //   |------|------|
    //   | A    | B    |
    // The separator row is required and must contain only -, :, |, and spaces.
    if (
      line.startsWith("|") &&
      i + 1 < lines.length &&
      /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(lines[i + 1])
    ) {
      const headers = splitTableRow(line);
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^([*-]|\d+\.)\s+/.test(line)) {
      const items: string[] = [];
      const ordered = /^\d+\.\s+/.test(line);
      const re = ordered ? /^\d+\.\s+/ : /^[*-]\s+/;
      while (i < lines.length && re.test(lines[i])) {
        items.push(lines[i].replace(re, "").trim());
        i += 1;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    const buf: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,4}\s|>\s|---|\*{3,}|```|([*-]|\d+\.)\s)/.test(lines[i])) {
      buf.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: "p", text: buf.join(" ") });
  }

  return blocks;
}

function splitTableRow(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

/**
 * Swap the green check emoji and a handful of other emojis for editorial
 * glyphs that match the typographic register. ASCII-safe replacements only;
 * everything else passes through.
 */
function deEmoji(src: string): string {
  return src
    .replace(/✅/g, "▪") // green check -> filled square bullet
    .replace(/❌/g, "×") // red X -> multiplication sign
    .replace(/⚠️?/g, "⚠"); // warning -> bare warning glyph
}

/**
 * Source markdown carries its own item glyph on some lists (a literal `✅`,
 * which `deEmoji` turns into `▪`). The renderer injects the manual's own `·`
 * marker, so a source glyph would print a second bullet. Stripped at render
 * rather than in the source files, matching the `stripLeadingH1` pattern: the
 * markdown stays a portable document, the page carries one marker.
 */
function stripLeadingMarker(item: string): string {
  return item.replace(/^\s*[▪•‣]\s*/, "");
}

/** `**Role:** …` — the leading metadata paragraph on a longform chapter. */
const META_LEAD = /^\*\*(?:Role|Timeline|Challenge)\s*:\*\*/;
/** `**Tag:** #One #Two` — the closing hashtag paragraph. */
const KEYWORDS_LEAD = /^\*\*Tags?\s*:\*\*/;

type Definition = { label: string; value: string };

/**
 * Splits `**Role:** a **Timeline:** b **Challenge:** c` into label/value
 * pairs. Returns null unless the run actually opens with one of the metadata
 * labels, so ordinary bold-led prose is untouched.
 */
function parseDefinitions(text: string): Definition[] | null {
  if (!META_LEAD.test(text)) return null;
  const re = /\*\*([^*:]+):\*\*\s*/g;
  const out: Definition[] = [];
  let open: { label: string; from: number } | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (open) out.push({ label: open.label, value: text.slice(open.from, m.index).trim() });
    open = { label: m[1].trim(), from: re.lastIndex };
  }
  if (open) out.push({ label: open.label, value: text.slice(open.from).trim() });
  return out.length > 0 ? out : null;
}

/**
 * Keyword tokens from the closing `**Tag:**` paragraph. The `#` glyphs are
 * dropped at render — raw hashtags read as a social-post signature at the foot
 * of a printed page — while every word survives, which is what the build-time
 * word count is computed against.
 */
function parseKeywords(text: string): string[] | null {
  if (!KEYWORDS_LEAD.test(text)) return null;
  const words = text
    .replace(KEYWORDS_LEAD, "")
    .split(/\s+/)
    .map((w) => w.replace(/^#+/, "").trim())
    .filter((w) => w.length > 0);
  return words.length > 0 ? words : null;
}

function escape(s: string): string {
  return s.replace(/[&<>]/g, (c) => {
    if (c === "&") return "&amp;";
    if (c === "<") return "&lt;";
    return "&gt;";
  });
}

type InlineToken =
  | { type: "text"; v: string }
  | { type: "bold"; v: string }
  | { type: "italic"; v: string }
  | { type: "code"; v: string }
  | { type: "link"; v: string; href: string };

function parseInline(src: string): InlineToken[] {
  const out: InlineToken[] = [];
  let buf = "";
  let i = 0;

  const flushText = () => {
    if (buf.length > 0) {
      out.push({ type: "text", v: buf });
      buf = "";
    }
  };

  while (i < src.length) {
    const ch = src[i];

    if (ch === "`") {
      flushText();
      const end = src.indexOf("`", i + 1);
      if (end > 0) {
        out.push({ type: "code", v: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if (ch === "[") {
      const closeBracket = src.indexOf("]", i + 1);
      const openParen = closeBracket > 0 ? src[closeBracket + 1] : "";
      if (closeBracket > 0 && openParen === "(") {
        const closeParen = src.indexOf(")", closeBracket + 2);
        if (closeParen > 0) {
          flushText();
          out.push({
            type: "link",
            v: src.slice(i + 1, closeBracket),
            href: src.slice(closeBracket + 2, closeParen),
          });
          i = closeParen + 1;
          continue;
        }
      }
    }

    if (ch === "*" && src[i + 1] === "*") {
      const end = src.indexOf("**", i + 2);
      if (end > 0) {
        flushText();
        out.push({ type: "bold", v: src.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }

    if (ch === "*" || ch === "_") {
      const end = src.indexOf(ch, i + 1);
      if (end > 0 && /\S/.test(src[i + 1] ?? "")) {
        flushText();
        out.push({ type: "italic", v: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    buf += ch;
    i += 1;
  }
  flushText();
  return out;
}

function renderInline(src: string, key: string): ReactNode[] {
  const tokens = parseInline(deEmoji(src));
  return tokens.map((t, idx) => {
    const k = `${key}-${idx}`;
    if (t.type === "text") return <Fragment key={k}>{t.v}</Fragment>;
    if (t.type === "bold")
      return (
        <strong key={k} className="font-semibold text-body-ink">
          {t.v}
        </strong>
      );
    if (t.type === "italic")
      return (
        <em key={k} className="italic">
          {t.v}
        </em>
      );
    if (t.type === "code")
      return (
        <code
          key={k}
          className="font-mono text-[0.85em] px-1.5 py-0.5 bg-ground border border-grid-line text-body-ink"
        >
          {t.v}
        </code>
      );
    return (
      <a
        key={k}
        href={t.href}
        target={t.href.startsWith("http") ? "_blank" : undefined}
        rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-blueprint underline underline-offset-4 hover:opacity-70"
      >
        {t.v}
      </a>
    );
  });
}

export function renderMarkdown(md: string): ReactNode {
  const blocks = tokenize(md);

  /**
   * The leading `h2` on a longform chapter is the article's subtitle, not a
   * section head, so it sets in the dek register instead of one step under the
   * title. Style only: it is still an `h2` in the outline.
   */
  const firstH2 = blocks.findIndex((b) => b.type === "h2");

  /**
   * The drop cap goes on the first paragraph of running prose. That is not the
   * metadata run, not the keyword row, and not a wholly bold line, all three of
   * which are labels rather than body copy.
   */
  const firstProse = blocks.findIndex(
    (b) =>
      b.type === "p" &&
      !/^\*\*[^*]+\*\*[.:]?$/.test(b.text.trim()) &&
      parseDefinitions(b.text) === null &&
      parseKeywords(b.text) === null,
  );

  return (
    <div className="space-y-6 max-w-[68ch] text-body-ink">
      {blocks.map((b, idx) => {
        const k = `b-${idx}`;
        if (b.type === "hr")
          return <hr key={k} className="my-10 border-t border-grid-line" />;
        if (b.type === "h1")
          return (
            <h1
              key={k}
              className="font-display text-body-ink text-4xl md:text-5xl leading-tight text-balance mt-12 first:mt-0"
            >
              {renderInline(b.text, k)}
            </h1>
          );
        if (b.type === "h2")
          return idx === firstH2 ? (
            <h2
              key={k}
              className="font-serif-body text-body-ink/75 text-[1.0625rem] md:text-[1.125rem] leading-relaxed text-balance mt-4 max-w-[54ch]"
            >
              {renderInline(b.text, k)}
            </h2>
          ) : (
            <h2
              key={k}
              className="font-display text-body-ink text-[1.5rem] md:text-[1.75rem] leading-snug text-balance mt-12"
            >
              {renderInline(b.text, k)}
            </h2>
          );
        if (b.type === "h3")
          return (
            <h3
              key={k}
              className="font-display text-body-ink text-xl leading-snug text-balance mt-10"
            >
              {renderInline(b.text, k)}
            </h3>
          );
        if (b.type === "h4")
          return (
            <h4
              key={k}
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-blueprint mt-8"
            >
              {renderInline(b.text, k)}
            </h4>
          );
        if (b.type === "p") {
          const definitions = parseDefinitions(b.text);
          if (definitions)
            return (
              <dl
                key={k}
                className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-y border-grid-line py-5 sm:grid-cols-[8rem_minmax(0,1fr)]"
              >
                {definitions.map((d, j) => (
                  <Fragment key={`${k}-d-${j}`}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-label-muted sm:pt-[0.35em]">
                      {d.label}
                    </dt>
                    <dd className="font-serif-body text-[1rem] leading-relaxed text-body-ink">
                      {renderInline(d.value, `${k}-dd-${j}`)}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            );

          const keywords = parseKeywords(b.text);
          if (keywords)
            return (
              <p
                key={k}
                className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-rule-hair pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-label-muted"
              >
                <span className="text-blueprint">Keywords</span>
                {/* The space is a whitespace-only flex text node: it is not
                    laid out, but it keeps the row readable to copy-paste and
                    to a screen reader. */}
                {keywords.map((w, j) => (
                  <Fragment key={`${k}-kw-${j}`}>
                    {" "}
                    <span>{w}</span>
                  </Fragment>
                ))}
              </p>
            );

          return (
            <p
              key={k}
              className={`manual-body mt-5${idx === firstProse ? " manual-dropcap" : ""}`}
            >
              {renderInline(b.text, k)}
            </p>
          );
        }
        if (b.type === "ul")
          return (
            <ul key={k} className="space-y-2 pl-4">
              {b.items.map((item, j) => (
                <li key={`${k}-${j}`} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="text-blueprint shrink-0 mt-[0.45em] leading-none"
                  >
                    ·
                  </span>
                  <span className="manual-body">
                    {renderInline(stripLeadingMarker(deEmoji(item)), `${k}-${j}`)}
                  </span>
                </li>
              ))}
            </ul>
          );
        if (b.type === "ol")
          return (
            <ol key={k} className="space-y-2 pl-4">
              {b.items.map((item, j) => (
                <li key={`${k}-${j}`} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-[0.45em] font-mono text-[11px] leading-none tabular-nums text-blueprint"
                  >
                    {j + 1}.
                  </span>
                  <span className="manual-body">{renderInline(item, `${k}-${j}`)}</span>
                </li>
              ))}
            </ol>
          );
        if (b.type === "blockquote")
          return (
            <blockquote
              key={k}
              className="border-l-2 border-blueprint pl-5 py-1 font-serif-body italic text-body-ink/80 leading-relaxed text-base md:text-lg"
            >
              {renderInline(b.text, k)}
            </blockquote>
          );
        if (b.type === "code")
          return (
            <pre
              key={k}
              className="bg-ground border border-grid-line p-4 overflow-x-auto font-mono text-[12px] text-body-ink"
            >
              <code
                dangerouslySetInnerHTML={{ __html: escape(b.text) }}
              />
            </pre>
          );

        // table
        return (
          <div
            key={k}
            className="overflow-x-auto -mx-2 my-2 max-w-none"
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-blueprint/40">
                  {b.headers.map((h, j) => (
                    <th
                      key={`${k}-th-${j}`}
                      scope="col"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/70 text-left px-3 py-2.5"
                    >
                      {renderInline(h, `${k}-th-${j}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr
                    key={`${k}-tr-${ri}`}
                    className="border-b border-grid-line last:border-b-0"
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={`${k}-td-${ri}-${ci}`}
                        className="px-3 py-2.5 align-top font-serif-body text-[0.9375rem] leading-relaxed text-body-ink [font-variant-numeric:lining-nums_tabular-nums]"
                      >
                        {renderInline(cell, `${k}-td-${ri}-${ci}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
