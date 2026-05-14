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
  | { type: "code"; lang?: string; text: string };

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
  const tokens = parseInline(src);
  return tokens.map((t, idx) => {
    const k = `${key}-${idx}`;
    if (t.type === "text") return <Fragment key={k}>{t.v}</Fragment>;
    if (t.type === "bold")
      return (
        <strong key={k} className="font-semibold text-paper">
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
          className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-paper/[0.05] text-paper/90"
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
        className="text-accent link-editorial"
      >
        {t.v}
      </a>
    );
  });
}

export function renderMarkdown(md: string): ReactNode {
  const blocks = tokenize(md);
  return (
    <div className="space-y-6 text-paper/85 leading-relaxed">
      {blocks.map((b, idx) => {
        const k = `b-${idx}`;
        if (b.type === "hr")
          return <hr key={k} className="my-10 border-t border-rule" />;
        if (b.type === "h1")
          return (
            <h1
              key={k}
              className="font-display text-4xl md:text-5xl leading-tight text-balance mt-12 first:mt-0"
            >
              {renderInline(b.text, k)}
            </h1>
          );
        if (b.type === "h2")
          return (
            <h2
              key={k}
              className="font-display text-3xl md:text-4xl leading-snug text-balance mt-12"
            >
              {renderInline(b.text, k)}
            </h2>
          );
        if (b.type === "h3")
          return (
            <h3
              key={k}
              className="font-display text-2xl leading-snug text-balance mt-10"
            >
              {renderInline(b.text, k)}
            </h3>
          );
        if (b.type === "h4")
          return (
            <h4
              key={k}
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mt-8"
            >
              {renderInline(b.text, k)}
            </h4>
          );
        if (b.type === "p")
          return (
            <p key={k} className="text-base md:text-lg">
              {renderInline(b.text, k)}
            </p>
          );
        if (b.type === "ul")
          return (
            <ul key={k} className="space-y-2 pl-4">
              {b.items.map((item, j) => (
                <li
                  key={`${k}-${j}`}
                  className="flex gap-3 text-base md:text-lg"
                >
                  <span aria-hidden="true" className="text-accent shrink-0 mt-1">
                    ·
                  </span>
                  <span>{renderInline(item, `${k}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        if (b.type === "ol")
          return (
            <ol key={k} className="space-y-2 pl-4 list-decimal list-inside">
              {b.items.map((item, j) => (
                <li
                  key={`${k}-${j}`}
                  className="text-base md:text-lg marker:text-accent marker:font-mono marker:text-sm"
                >
                  {renderInline(item, `${k}-${j}`)}
                </li>
              ))}
            </ol>
          );
        if (b.type === "blockquote")
          return (
            <blockquote
              key={k}
              className="border-l-2 border-accent pl-5 py-1 italic text-paper/75 leading-relaxed text-base md:text-lg"
            >
              {renderInline(b.text, k)}
            </blockquote>
          );
        return (
          <pre
            key={k}
            className="bg-paper/[0.04] border border-rule rounded-lg p-4 overflow-x-auto font-mono text-[12px] text-paper/80"
          >
            <code
              dangerouslySetInnerHTML={{ __html: escape(b.text) }}
            />
          </pre>
        );
      })}
    </div>
  );
}
