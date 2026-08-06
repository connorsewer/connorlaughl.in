# Overnight log — Making Software redesign (2026-08-05)

Spec: `docs/superpowers/specs/2026-08-05-makingsoftware-redesign-design.md` (v3, `5da815c1`).
Rule reminder: no gated value or private vendor/system name may appear in this file. Generic descriptors only.

## Phase 0 — Reconcile + reference capture

- **Git state at start of overnight run:** branch `redesign/manual` (created off local `main` at `c3715337`). Local `main` is ahead 1 / behind 8 vs `origin/main` (measured live; HANDOFF's "behind 5" was stale). No pull/merge/rebase performed — drift reconciliation is Connor's morning decision.
- **Dirty files (5, all unstaged, Connor's workstream):** `HANDOFF.md`, `app/edge/opengraph-image.tsx`, `app/edge/page.tsx`, `components/edge/EdgeMobileChip.tsx`, `content/case-studies/one-tsi-revenue-infrastructure.md`. Backed up verbatim to `docs/superpowers/pre-redesign-dirty.patch` (427 lines) and committed. Restore any file with `git apply --include=<path> docs/superpowers/pre-redesign-dirty.patch` against `c3715337`-era content.
- Reference screenshots: captured to `docs/superpowers/reference/` (gitignored — third-party copyrighted pages, local scaffolding only).

## Decisions made overnight

(running list)

## Orphaned assets for Connor's cleanup call

(running list — nothing deleted overnight beyond what the spec's disposition table mandates)

## Phase status

- [x] Phase 0 (a) git state recorded, (b) dirty patch committed
- [ ] Phase 0 (c) reference captures
- [ ] Phase 1a spine + IA lock
- [ ] Phase 2 foundation
- [ ] Phase 1b copy deck
- [ ] Phase 3 cover
- [ ] Phase 4 chapter chrome + case studies
- [ ] Phase 5 remaining routes
- [ ] Phase 6a metadata surface
- [ ] Phase 6 hardening + final QA
