"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AudienceTag, CaseStudy } from "@/content/case-studies";
import { renderableProofMetrics } from "@/content/proof-metrics";

type Props = {
  studies: CaseStudy[];
  audienceTags: AudienceTag[];
};

const PARAM = "fit";

function parseSelection(value: string | null, tags: AudienceTag[]): AudienceTag[] {
  if (!value) return [];
  const parts = value.split(",").map((s) => s.trim()).filter(Boolean);
  const allowed = new Set(tags);
  return parts.filter((p): p is AudienceTag => allowed.has(p as AudienceTag));
}

export function CaseStudyArchive({ studies, audienceTags }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const raw = searchParams?.get(PARAM) ?? null;
  const selected = useMemo(
    () => parseSelection(raw, audienceTags),
    [raw, audienceTags],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tag of audienceTags) {
      map[tag] = studies.filter((cs) => cs.audienceFit.includes(tag)).length;
    }
    return map;
  }, [studies, audienceTags]);

  const filtered = useMemo(() => {
    if (selected.length === 0) return studies;
    return studies.filter((cs) =>
      selected.every((tag) => cs.audienceFit.includes(tag)),
    );
  }, [studies, selected]);

  const setSelection = useCallback(
    (next: AudienceTag[]) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (next.length === 0) {
        params.delete(PARAM);
      } else {
        params.set(PARAM, next.join(","));
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const toggle = useCallback(
    (tag: AudienceTag) => {
      const has = selected.includes(tag);
      setSelection(has ? selected.filter((t) => t !== tag) : [...selected, tag]);
    },
    [selected, setSelection],
  );

  return (
    <div className="flex flex-col gap-10">
      <div
        role="toolbar"
        aria-label="Filter case studies by reader need. Multiple filters apply as AND."
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => setSelection([])}
          aria-pressed={selected.length === 0}
          className={`font-mono text-[10px] tracking-[0.2em] uppercase border px-3.5 py-2 rounded-full transition-colors ${
            selected.length === 0
              ? "border-accent text-accent bg-accent/10"
              : "border-rule text-paper/65 hover:border-accent hover:text-accent"
          }`}
        >
          All <span className="opacity-60">({studies.length})</span>
        </button>
        {audienceTags.map((tag) => {
          const pressed = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              aria-pressed={pressed}
              className={`font-mono text-[10px] tracking-[0.2em] uppercase border px-3.5 py-2 rounded-full transition-colors ${
                pressed
                  ? "border-accent text-accent bg-accent/10"
                  : "border-rule text-paper/65 hover:border-accent hover:text-accent"
              }`}
            >
              {tag} <span className="opacity-60">({counts[tag] ?? 0})</span>
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/45"
      >
        Showing {filtered.length} of {studies.length} case studies
        {selected.length > 0 ? ` for ${selected.join(" + ")}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="border border-rule rounded-2xl p-8 bg-ink/55">
          <p className="text-paper/80 text-base leading-relaxed">
            No case studies match this combination yet.
          </p>
          <button
            type="button"
            onClick={() => setSelection([])}
            className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-accent hover:text-paper transition-colors"
          >
            Reset filters <span aria-hidden="true">↺</span>
          </button>
        </div>
      ) : (
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((study, i) => (
            <li key={study.slug}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex flex-col gap-4 p-7 border border-rule hover:border-accent transition-colors h-full"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="status-pill pixel-flicker">
                    {study.label}
                  </span>
                </div>
                <h2 className="font-display text-2xl group-hover:text-accent transition-colors text-balance leading-tight">
                  {study.title}
                </h2>
                <p className="text-paper/75 text-base leading-relaxed italic">
                  {study.hook}
                </p>
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase mb-1">
                      The problem
                    </dt>
                    <dd className="text-paper/70 leading-relaxed line-clamp-3">
                      {study.businessProblem}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase mb-1">
                      What I built
                    </dt>
                    <dd className="text-paper/70 leading-relaxed line-clamp-3">
                      {study.whatIBuilt}
                    </dd>
                  </div>
                </dl>
                <ul className="mt-1 flex flex-wrap gap-2 pt-3 border-t border-rule/60">
                  {renderableProofMetrics(study.proofMetrics).slice(0, 3).map((m) => (
                    <li
                      key={`${study.slug}-${m.label}`}
                      className="font-mono text-[10px] tracking-[0.12em] text-accent border border-rule/80 px-2.5 py-1 rounded-full"
                    >
                      {m.value} {m.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-paper/55 uppercase">
                    Role fit
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-accent">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </div>
                <ul className="flex flex-wrap gap-1.5 -mt-3">
                  {study.audienceFit.map((tag) => (
                    <li
                      key={`${study.slug}-fit-${tag}`}
                      className="font-mono text-[9px] tracking-[0.15em] uppercase text-paper/55 border border-rule/60 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
