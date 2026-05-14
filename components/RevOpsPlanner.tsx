"use client";

import { useMemo, useState } from "react";

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
    <div className="grid lg:grid-cols-2 gap-10">
      <form
        className="space-y-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Reverse funnel capacity inputs"
      >
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/70 block mb-1.5">
              {f.label}
            </span>
            <div className="flex items-baseline gap-2 border-b border-rule hover:border-accent transition-colors py-1.5">
              {f.prefix ? (
                <span className="font-display text-2xl text-paper/55">
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
                className="flex-1 bg-transparent font-display text-2xl text-paper focus:outline-none"
              />
              {f.suffix ? (
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/55">
                  {f.suffix}
                </span>
              ) : null}
            </div>
            <span className="text-paper/55 text-xs leading-relaxed block mt-1">
              {f.help}
            </span>
          </label>
        ))}

        <button
          type="button"
          onClick={() => setV(DEFAULTS)}
          className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/65 hover:text-accent transition-colors"
        >
          Reset to demo inputs <span aria-hidden="true">↺</span>
        </button>
      </form>

      <output
        className="space-y-6"
        aria-live="polite"
        aria-label="Required volumes and capacity"
      >
        <ResultCard
          eyebrow="Deals required"
          value={fmtNumber(result.dealsToHit)}
          context={`To hit ${fmtCurrency(v.quotaAnnual)} at ${fmtCurrency(v.avgDealSize)} ACV.`}
        />
        <ResultCard
          eyebrow="Qualified opportunities required"
          value={fmtNumber(result.oppsNeeded)}
          context={`Yields ~${fmtNumber(result.oppsPerMonth)} per month with a ${v.winRate}% win rate.`}
        />
        <ResultCard
          eyebrow="SQLs required"
          value={fmtNumber(result.sqlsNeeded)}
          context={`At ${v.sqlToOpp}% SQL to opp conversion.`}
        />
        <ResultCard
          eyebrow="MQLs required"
          value={fmtNumber(result.mqlsNeeded)}
          context={`At ${v.mqlToSql}% MQL to SQL conversion.`}
        />
        <ResultCard
          eyebrow="Leads required"
          value={fmtNumber(result.leadsNeeded)}
          context={`~${fmtNumber(result.leadsPerMonth)} per month at ${v.leadToMql}% lead to MQL.`}
        />
        <ResultCard
          eyebrow="Implied pipeline coverage"
          value={fmtCurrency(result.pipelineCoverage)}
          context="Top-of-pipeline dollar value needed at current win rate to cover the target."
        />
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
    <div className="border border-rule rounded-2xl p-5 bg-ink/55">
      <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">
        {eyebrow}
      </div>
      <div className="font-display text-3xl md:text-4xl leading-tight mt-2">
        {value}
      </div>
      <p className="text-paper/65 text-sm leading-relaxed mt-2">{context}</p>
    </div>
  );
}
