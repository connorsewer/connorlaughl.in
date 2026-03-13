# Discovery Triage Summary

## Scan scope

Scanned:
- `~/Downloads`
- `~/Desktop`
- `~/Documents`
- `~/clawd`

First-pass candidate count retained: **500**

## Counts by root

- `~/clawd`: 338
- `~/Desktop`: 64
- `~/Documents`: 61
- `~/Downloads`: 37

## Counts by extension

- `.md`: 456
- `.pdf`: 20
- `.docx`: 14
- `.json`: 10

## What this means

The richest immediate source is **`~/clawd`**, especially:
- runbooks
- roadmaps
- drafts
- graph notes
- portfolio/spec/strategy docs
- skill-source repos with potentially ingestible reference material

Desktop and Documents likely contain more externally-authored or one-off material.
Downloads appears smaller in this first pass, but likely contains higher-friction documents such as PDFs and docs worth selective extraction.

## Recommended ingestion order

### Tier 1 — High leverage and closest to active work
- `~/clawd/ops/runbooks/`
- `~/clawd/ops/roadmaps/`
- `~/clawd/ops/tmp/` (selectively)
- `~/clawd/graph/`
- `~/clawd/MEMORY.md`, `AGENTS.md`, system notes

### Tier 2 — Strategic / reusable authored content
- `~/clawd/PORTFOLIO-REDESIGN-SPEC.md`
- `~/clawd/OPTIMIZATION-SUMMARY.md`
- portfolio/case-study longform material
- content/case-study stubs and completed pieces

### Tier 3 — External/reference ecosystems
- selected `~/clawd/ops/skills-sources/...` docs that directly improve local agent architecture
- high-value docs in `~/Documents`
- selected PDFs/docx from `~/Downloads` and `~/Desktop`

## Next step

Seed the backlog with top-priority clusters and start transforming the highest-value sources into Obsidian notes with provenance.
