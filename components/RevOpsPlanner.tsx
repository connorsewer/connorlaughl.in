"use client";

import { useMemo, useState } from "react";
import { PulseOnChange } from "@/components/PulseOnChange";

type NumericKey =
  | "quotaAnnual"
  | "avgDealSize"
  | "winRate"
  | "sqlToOpp"
  | "mqlToSql"
  | "leadToMql"
  | "salesCycleDays";

type Inputs = Record<NumericKey, number>;

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
    label: "Sales cycle (days)",
    help: "Median days from opportunity created to closed-won.",
    step: 5,
    suffix: "days",
  },
];

function fmtNumber(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "-";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return Math.round(n).toLocaleString("en-US");
}

function fmtCurrency(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "-";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function RevOpsPlanner() {
  const [v, setV] = useState<Inputs>(DEFAULTS);

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

    const pipelineCoverage = dealsToHit * v.avgDealSize / winRate;
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

  return (
    <div className="flex flex-col gap-10">
      <form
        className="space-y-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Inputs"
      >
        <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
          Inputs
        </h2>
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/65">
              {f.label}
            </span>
            <div className="flex items-baseline gap-2 border-b border-grid-line py-1.5 transition-colors hover:border-blueprint">
              {f.prefix ? (
                <span className="font-display text-2xl text-body-ink/50">
                  {f.prefix}
                </span>
              ) : null}
              <input
                type="number"
                inputMode="decimal"
                step={f.step}
                min={0}
                value={Number.isFinite(v[f.key]) ? v[f.key] : 0}
                onChange={(e) =>
                  setV((prev) => ({
                    ...prev,
                    [f.key]: Number(e.target.value),
                  }))
                }
                className="flex-1 bg-transparent font-display text-2xl text-body-ink focus:outline-none"
              />
              {f.suffix ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/50">
                  {f.suffix}
                </span>
              ) : null}
            </div>
            <span className="mt-1 block font-serif-body text-xs leading-relaxed text-body-ink/60">
              {f.help}
            </span>
          </label>
        ))}

        <button
          type="button"
          onClick={() => setV(DEFAULTS)}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/65 transition-colors hover:text-blueprint"
        >
          Reset to demo inputs <span aria-hidden="true">↺</span>
        </button>
      </form>

      <output
        className="block"
        aria-live="polite"
        aria-label="Required volumes"
      >
        <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
          Required volumes
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ResultCard
          eyebrow="Deals to hit target"
          value={fmtNumber(result.dealsToHit)}
          context={`To hit ${fmtCurrency(v.quotaAnnual)} at ${fmtCurrency(v.avgDealSize)} ACV.`}
        />
        <ResultCard
          eyebrow="Opportunities needed"
          value={fmtNumber(result.oppsNeeded)}
          context={`Yields ~${fmtNumber(result.oppsPerMonth)} per month with a ${v.winRate}% win rate.`}
        />
        <ResultCard
          eyebrow="SQLs needed"
          value={fmtNumber(result.sqlsNeeded)}
          context={`At ${v.sqlToOpp}% SQL to opp conversion.`}
        />
        <ResultCard
          eyebrow="MQLs needed"
          value={fmtNumber(result.mqlsNeeded)}
          context={`At ${v.mqlToSql}% MQL to SQL conversion.`}
        />
        <ResultCard
          eyebrow="Leads needed"
          value={fmtNumber(result.leadsNeeded)}
          context={`~${fmtNumber(result.leadsPerMonth)} per month at ${v.leadToMql}% lead to MQL.`}
        />
        <ResultCard
          eyebrow="Pipeline coverage required"
          value={fmtCurrency(result.pipelineCoverage)}
          context="Top-of-pipeline dollar value needed at current win rate to cover the target."
        />
        </div>
      </output>
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
    <div className="border border-grid-line bg-ground px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-blueprint">
        {eyebrow}
      </div>
      <div className="mt-2 font-display text-3xl leading-tight tabular-nums text-body-ink md:text-4xl">
        <PulseOnChange value={value}>{value}</PulseOnChange>
      </div>
      <p className="mt-2 font-serif-body text-sm leading-relaxed text-body-ink/70">{context}</p>
    </div>
  );
}
