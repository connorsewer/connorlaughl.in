"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PulseOnChange } from "@/components/PulseOnChange";

/**
 * Reverse-funnel calculator.
 *
 * Every numeral on this page is either reader-entered or derived from what the
 * reader entered, so nothing here is a claim about Connor's results and nothing
 * here routes through `content/proof-metrics.ts`. The defaults are round demo
 * numbers picked to be legible.
 *
 * Input state is the raw digit string, not a number: `Number("")` is `0`, which
 * used to snap a half-cleared field to zero mid-edit and cascade `Infinity`
 * through the memo. Display formatting is applied on the way out.
 */

type NumericKey =
  | "quotaAnnual"
  | "avgDealSize"
  | "winRate"
  | "sqlToOpp"
  | "mqlToSql"
  | "leadToMql"
  | "salesCycleDays";

type Inputs = Record<NumericKey, number>;
type RawInputs = Record<NumericKey, string>;

const DEFAULTS: Inputs = {
  quotaAnnual: 10_000_000,
  avgDealSize: 75_000,
  winRate: 22,
  sqlToOpp: 60,
  mqlToSql: 30,
  leadToMql: 18,
  salesCycleDays: 95,
};

const FIELDS: Array<{
  key: NumericKey;
  label: string;
  help: string;
  step: number;
  suffix?: string;
  prefix?: string;
}> = [
  {
    key: "quotaAnnual",
    label: "Annual revenue target",
    help: "Net-new ARR or revenue you owe the board this year.",
    step: 100_000,
    prefix: "$",
  },
  {
    key: "avgDealSize",
    label: "Average won deal size",
    help: "ACV or single-purchase value of a typical closed-won.",
    step: 1_000,
    prefix: "$",
  },
  {
    key: "winRate",
    label: "Opp to closed-won win rate",
    help: "Percent of qualified opportunities that close.",
    step: 1,
    suffix: "%",
  },
  {
    key: "sqlToOpp",
    label: "SQL to opportunity conversion",
    help: "Percent of SQLs that become qualified opportunities.",
    step: 1,
    suffix: "%",
  },
  {
    key: "mqlToSql",
    label: "MQL to SQL conversion",
    help: "Percent of MQLs that get accepted as SQLs.",
    step: 1,
    suffix: "%",
  },
  {
    key: "leadToMql",
    label: "Lead to MQL conversion",
    help: "Percent of new leads that meet MQL criteria.",
    step: 1,
    suffix: "%",
  },
  {
    key: "salesCycleDays",
    label: "Sales cycle",
    help: "Median days from opportunity created to closed-won.",
    step: 5,
    suffix: "days",
  },
];

const GROUPED = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Digits and one decimal point survive; separators are re-derived on display. */
function sanitize(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  return rest.length > 0 ? `${whole}.${rest.join("")}` : whole;
}

/** Raw digits in, grouped display out. A trailing point survives mid-typing. */
function group(raw: string): string {
  if (raw === "") return "";
  const [whole, fraction] = raw.split(".");
  const head = whole === "" ? "" : GROUPED.format(Number(whole));
  if (fraction === undefined) return head;
  return `${head}.${fraction}`;
}

function toNumber(raw: string): number {
  if (raw.trim() === "") return NaN;
  return Number(raw);
}

function rawFrom(values: Inputs): RawInputs {
  return Object.fromEntries(
    (Object.keys(values) as NumericKey[]).map((k) => [k, String(values[k])]),
  ) as RawInputs;
}

/** Grouped integer. Non-finite reads `n/a` rather than a broken cell. */
function fmtNumber(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "n/a";
  return GROUPED.format(Math.round(n));
}

function fmtCurrency(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "n/a";
  return `$${GROUPED.format(Math.round(n))}`;
}

/** Lining, tabular numerals. GT Sectra's old-style figures set `606` as `6o6`. */
const LINING = "[font-variant-numeric:lining-nums_tabular-nums]";

/**
 * Index in a grouped string that sits after `count` value characters. Group
 * separators are inserted on every render, so a caret restored by raw index
 * would drift; restoring it by digit count keeps it where the reader put it.
 */
function caretAfterDigits(display: string, count: number): number {
  let seen = 0;
  for (let i = 0; i < display.length; i += 1) {
    if (/[\d.]/.test(display[i])) {
      seen += 1;
      if (seen === count) return i + 1;
    }
  }
  return display.length;
}

function digitsBeforeCaret(el: HTMLInputElement): number {
  const head = el.value.slice(0, el.selectionStart ?? el.value.length);
  return (head.match(/[\d.]/g) ?? []).length;
}

export function RevOpsPlanner() {
  const [raw, setRaw] = useState<RawInputs>(() => rawFrom(DEFAULTS));
  const [summary, setSummary] = useState("");
  const summaryId = useId();

  const fieldRefs = useRef<Partial<Record<NumericKey, HTMLInputElement | null>>>({});
  const pendingCaret = useRef<{ key: NumericKey; digits: number } | null>(null);

  useLayoutEffect(() => {
    const pending = pendingCaret.current;
    if (!pending) return;
    pendingCaret.current = null;
    const el = fieldRefs.current[pending.key];
    if (!el) return;
    const at = caretAfterDigits(el.value, pending.digits);
    el.setSelectionRange(at, at);
  }, [raw]);

  const v = useMemo(() => {
    const out = {} as Inputs;
    for (const key of Object.keys(raw) as NumericKey[]) out[key] = toNumber(raw[key]);
    return out;
  }, [raw]);

  const result = useMemo(() => {
    const winRate = v.winRate / 100;
    const sqlToOpp = v.sqlToOpp / 100;
    const mqlToSql = v.mqlToSql / 100;
    const leadToMql = v.leadToMql / 100;

    const dealsToHit = v.avgDealSize > 0 ? v.quotaAnnual / v.avgDealSize : 0;
    const oppsNeeded = winRate > 0 ? dealsToHit / winRate : Infinity;
    const sqlsNeeded = sqlToOpp > 0 ? oppsNeeded / sqlToOpp : Infinity;
    const mqlsNeeded = mqlToSql > 0 ? sqlsNeeded / mqlToSql : Infinity;
    const leadsNeeded = leadToMql > 0 ? mqlsNeeded / leadToMql : Infinity;

    const pipelineCoverage = (dealsToHit * v.avgDealSize) / winRate;
    const oppsPerMonth = oppsNeeded / 12;
    const leadsPerMonth = leadsNeeded / 12;

    return {
      dealsToHit,
      oppsNeeded,
      sqlsNeeded,
      mqlsNeeded,
      leadsNeeded,
      pipelineCoverage,
      oppsPerMonth,
      leadsPerMonth,
    };
  }, [v]);

  /**
   * One sentence, announced once the reader stops typing. The whole output
   * region used to be `aria-live`, so every keystroke re-read all six cards.
   */
  useEffect(() => {
    const id = window.setTimeout(() => {
      setSummary(
        `Recalculated. Pipeline coverage required is ${fmtCurrency(
          result.pipelineCoverage,
        )}, from ${fmtNumber(result.leadsNeeded)} leads and ${fmtNumber(
          result.oppsNeeded,
        )} opportunities.`,
      );
    }, 700);
    return () => window.clearTimeout(id);
  }, [result]);

  const step = (key: NumericKey, by: number) =>
    setRaw((prev) => {
      const current = toNumber(prev[key]);
      const base = isNaN(current) ? 0 : current;
      return { ...prev, [key]: String(Math.max(0, base + by)) };
    });

  return (
    <div className="flex flex-col gap-12">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Inputs">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
          Inputs
        </h2>

        {FIELDS.map((f) => {
          const display = group(raw[f.key]);
          const width = Math.max(display.length, 2) + 0.5;
          return (
            <div key={f.key}>
              <label
                htmlFor={`${summaryId}-${f.key}`}
                className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/65"
              >
                {f.label}
              </label>
              <div className="flex w-full items-baseline gap-2 border border-grid-line bg-sheet px-3 py-2 transition-colors hover:border-blueprint focus-within:border-blueprint">
                {f.prefix ? (
                  <span aria-hidden="true" className="font-mono text-lg text-body-ink/55">
                    {f.prefix}
                  </span>
                ) : null}
                <input
                  id={`${summaryId}-${f.key}`}
                  ref={(el) => {
                    fieldRefs.current[f.key] = el;
                  }}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  aria-describedby={`${summaryId}-${f.key}-help`}
                  value={display}
                  onChange={(e) => {
                    pendingCaret.current = {
                      key: f.key,
                      digits: digitsBeforeCaret(e.target),
                    };
                    setRaw((prev) => ({ ...prev, [f.key]: sanitize(e.target.value) }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      step(f.key, f.step);
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      step(f.key, -f.step);
                    }
                  }}
                  style={{ width: `${width}ch` }}
                  className={`min-w-0 max-w-full bg-transparent font-mono text-lg text-body-ink ${LINING} focus:outline-none`}
                />
                {f.suffix ? (
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/65"
                  >
                    {f.suffix}
                  </span>
                ) : null}
              </div>
              <span
                id={`${summaryId}-${f.key}-help`}
                className="mt-1 block font-serif-body text-xs leading-relaxed text-body-ink/60"
              >
                {f.help}
              </span>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => setRaw(rawFrom(DEFAULTS))}
          className="border border-grid-line bg-sheet px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/75 transition-colors hover:border-blueprint hover:text-blueprint active:translate-y-px"
        >
          Reset to demo inputs <span aria-hidden="true">↺</span>
        </button>
      </form>

      <div>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
          Required volumes
        </h2>

        <p aria-live="polite" className="sr-only">
          {summary}
        </p>

        <output className="mt-4 block" aria-label="Required volumes">
          <div className="border border-grid-line bg-sheet px-5 py-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-blueprint">
              Pipeline coverage required
            </div>
            <div
              className={`mt-3 font-mono text-4xl leading-none text-body-ink md:text-6xl ${LINING}`}
            >
              <PulseOnChange value={fmtCurrency(result.pipelineCoverage)}>
                {fmtCurrency(result.pipelineCoverage)}
              </PulseOnChange>
            </div>
            <p className="mt-3 max-w-[52ch] font-serif-body text-sm leading-relaxed text-body-ink/70">
              Top-of-pipeline dollar value needed at the current win rate to cover the
              target.
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ResultCard
              eyebrow="Deals to hit target"
              value={fmtNumber(result.dealsToHit)}
              context={`To hit ${fmtCurrency(v.quotaAnnual)} at ${fmtCurrency(
                v.avgDealSize,
              )} ACV.`}
            />
            <ResultCard
              eyebrow="Opportunities needed"
              value={fmtNumber(result.oppsNeeded)}
              context={`Yields about ${fmtNumber(
                result.oppsPerMonth,
              )} per month at a ${fmtNumber(v.winRate)}% win rate.`}
            />
            <ResultCard
              eyebrow="SQLs needed"
              value={fmtNumber(result.sqlsNeeded)}
              context={`At ${fmtNumber(v.sqlToOpp)}% SQL to opp conversion.`}
            />
            <ResultCard
              eyebrow="MQLs needed"
              value={fmtNumber(result.mqlsNeeded)}
              context={`At ${fmtNumber(v.mqlToSql)}% MQL to SQL conversion.`}
            />
            <ResultCard
              eyebrow="Leads needed"
              value={fmtNumber(result.leadsNeeded)}
              context={`About ${fmtNumber(result.leadsPerMonth)} per month at ${fmtNumber(
                v.leadToMql,
              )}% lead to MQL.`}
            />
          </div>
        </output>
      </div>
    </div>
  );
}

function ResultCard({
  eyebrow,
  value,
  context,
}: {
  eyebrow: string;
  value: string;
  context: string;
}) {
  return (
    <div className="border border-grid-line bg-sheet px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-blueprint">
        {eyebrow}
      </div>
      <div className={`mt-2 font-mono text-2xl leading-tight text-body-ink md:text-3xl ${LINING}`}>
        <PulseOnChange value={value}>{value}</PulseOnChange>
      </div>
      <p className="mt-2 font-serif-body text-sm leading-relaxed text-body-ink/70">
        {context}
      </p>
    </div>
  );
}
