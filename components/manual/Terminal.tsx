"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { useClientMounted } from "@/hooks/useClientMounted";
import {
  TERMINAL_PROMPT,
  runCommand,
  type TerminalLine,
} from "@/lib/terminal-commands";

/**
 * The cover shell. A working command line, printed under the FAQ.
 *
 * Progressive enhancement, strictly: the component renders nothing until it
 * has hydrated, so the server HTML the crawlers and the no-JavaScript reader
 * get is the static `IN:`/`OUT:` FAQ and nothing else. Every word this
 * component prints is produced on the client, which also keeps it out of the
 * rendered-source word count the site claims.
 *
 * Chrome continues the FAQ box rather than starting a new one: same 1px ink
 * border, collapsed against the box above with a negative top margin, and a
 * recessed `--ground` fill so the shell reads as a well cut into the sheet.
 *
 * Keyboard is deliberately local. The input listens only while focused, so
 * nothing here takes a key away from the page. Escape gives the keyboard back.
 *
 * The command table lives in `lib/terminal-commands.ts`. It holds every string
 * this thing can print, and no business numerals appear in any of them.
 */

type PrintedLine = TerminalLine & { id: number };

const SEED: TerminalLine[] = [
  { kind: "out", text: "a working shell. type help for the verbs." },
];

export type TerminalProps = {
  className?: string;
};

export function Terminal({ className }: TerminalProps) {
  const mounted = useClientMounted();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const seq = useRef(SEED.length);
  const [lines, setLines] = useState<PrintedLine[]>(() =>
    SEED.map((line, i) => ({ ...line, id: i })),
  );
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [recall, setRecall] = useState<number | null>(null);
  const [misses, setMisses] = useState(0);
  const [caretAtEnd, setCaretAtEnd] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Newest output stays in view. The region scrolls, the page never does. */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const print = useCallback((incoming: TerminalLine[]) => {
    if (incoming.length === 0) return;
    setLines((prev) => [
      ...prev,
      ...incoming.map((line) => ({ ...line, id: seq.current++ })),
    ]);
  }, []);

  const submit = useCallback(() => {
    /* Read the field, not the state. A paste followed immediately by Enter can
       land both events before React has re-rendered, and the DOM is the one
       that is always current. */
    const trimmed = (inputRef.current?.value ?? value).trim();
    setValue("");
    setRecall(null);
    setCaretAtEnd(true);
    if (!trimmed) return;

    const result = runCommand(trimmed, {
      history,
      theme: resolvedTheme,
      misses,
    });

    const notFound = result.lines.some(
      (line) => line.kind === "err" && line.text.includes("command not found"),
    );
    if (notFound) setMisses((n) => n + 1);

    setHistory((prev) => [...prev, trimmed]);

    if (result.effect?.type === "clear") {
      setLines([]);
      return;
    }

    print([{ kind: "in", text: trimmed }, ...result.lines]);

    if (result.effect?.type === "theme") {
      setTheme(result.effect.value);
      return;
    }

    if (result.effect?.type === "navigate") {
      const { href } = result.effect;
      if (href.startsWith("#")) {
        document.getElementById(href.slice(1))?.scrollIntoView({ block: "start" });
      } else {
        router.push(href);
      }
    }
  }, [value, history, resolvedTheme, misses, print, router, setTheme]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        event.currentTarget.blur();
        return;
      }

      if (event.key === "ArrowUp") {
        if (history.length === 0) return;
        event.preventDefault();
        const next = recall === null ? history.length - 1 : Math.max(0, recall - 1);
        setRecall(next);
        setValue(history[next]);
        setCaretAtEnd(true);
        return;
      }

      if (event.key === "ArrowDown") {
        if (recall === null) return;
        event.preventDefault();
        const next = recall + 1;
        if (next >= history.length) {
          setRecall(null);
          setValue("");
        } else {
          setRecall(next);
          setValue(history[next]);
        }
        setCaretAtEnd(true);
      }
    },
    [history, recall],
  );

  if (!mounted) return null;

  return (
    <div
      className={`border border-body-ink bg-ground ${className ?? ""}`}
      onMouseUp={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        if (window.getSelection()?.toString()) return;
        inputRef.current?.focus();
      }}
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-grid-line px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-label-muted">
          Shell
        </span>
        <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.06em] text-label-muted">
          try: help
        </span>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Shell output"
        className="max-h-[19rem] overflow-y-auto overflow-x-auto px-4 py-3 font-mono text-[13px] leading-[1.65]"
      >
        {lines.map((line) => (
          <ShellLine key={line.id} line={line} />
        ))}
      </div>

      <form
        className="manual-shell-row flex items-baseline gap-2 overflow-x-auto border-t border-grid-line px-4 py-3 font-mono text-[13px] leading-[1.65]"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor="manual-shell-input" className="sr-only">
          Shell command
        </label>
        <span aria-hidden="true" className="shrink-0 select-none text-blueprint-bright">
          {TERMINAL_PROMPT}
        </span>

        <span className="manual-shell-field">
          <span aria-hidden="true" className="manual-shell-mirror">
            {value}
          </span>
          <input
            id="manual-shell-input"
            ref={inputRef}
            type="text"
            value={value}
            size={1}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-describedby="manual-shell-hint"
            className="manual-shell-input bg-transparent text-body-ink focus:outline-none"
            style={{ caretColor: caretAtEnd ? "transparent" : "var(--blueprint)" }}
            onChange={(event) => {
              setValue(event.target.value);
              setCaretAtEnd(
                event.target.selectionStart === event.target.value.length,
              );
            }}
            onSelect={(event) => {
              const el = event.currentTarget;
              setCaretAtEnd(el.selectionStart === el.value.length);
            }}
            onKeyDown={onKeyDown}
          />
        </span>

        {caretAtEnd ? <span aria-hidden="true" className="manual-caret" /> : null}

        <span id="manual-shell-hint" className="sr-only">
          Type a command and press Enter. Up and down arrows recall earlier
          commands. Escape returns the keyboard to the page.
        </span>
      </form>
    </div>
  );
}

function ShellLine({ line }: { line: PrintedLine }) {
  if (line.kind === "in") {
    return (
      <div className="whitespace-pre">
        <span aria-hidden="true" className="select-none text-blueprint-bright">
          {TERMINAL_PROMPT}{" "}
        </span>
        <span className="text-body-ink">{line.text}</span>
      </div>
    );
  }

  if (line.kind === "pre") {
    return (
      /* Tighter leading than the surrounding output: a drawing made of
         characters needs its rows to sit close enough to read as edges. */
      <pre
        className="my-2 font-mono leading-[1.15] text-blueprint-bright"
        aria-label="Isometric box, drawn in characters"
      >
        {line.text}
      </pre>
    );
  }

  if (line.kind === "link") {
    return (
      <div className="whitespace-pre">
        <a
          href={line.href}
          className="text-blueprint-bright underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {line.text}
        </a>
      </div>
    );
  }

  return (
    <div
      className={`whitespace-pre ${line.kind === "err" ? "text-body-ink" : "text-body-ink/75"}`}
    >
      {line.text || " "}
    </div>
  );
}
