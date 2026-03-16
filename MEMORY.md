# MEMORY.md - Curated Long-Term Memory

## System Notes
- 2026-03-16: Hourly checkpoint at 05:37 CT again confirmed isolated cron sessions cannot read `agent:main:main` via `sessions_history`; no new durable context was accessible from the API.

- 2026-03-14: Hourly checkpoint at 19:37 CT again confirmed isolated cron sessions cannot read `agent:main:main` via `sessions_history` because visibility is restricted to the current session tree; no additional durable context was accessible from the API.
- **Cron sessions** (like hourly checkpoints) run in isolated sessions and cannot access main session history due to visibility restrictions. Checkpoints log this limitation but cannot extract conversation data.
- Isolated cron checkpoints can sometimes recover continuity by reading local session logs under `~/.openclaw/agents/main/sessions/` when `sessions_history` is blocked, but this is only a fallback and not equivalent to direct session-history access.

## Last Updated
- 2026-03-14: Added durable project priorities/blockers for the Obsidian knowledge-graph effort and noted local session-log fallback for isolated checkpoints
- 2026-03-12: Added preference for structured knowledge / skill-graph style memory and proactive capability architecture inspired by Ars Contexta + layered memory systems
- 2026-02-25: Created file, noted cron session visibility limitation

## Preferences & Direction
- Prefers structured knowledge over monolithic prompts/docs; sees value in "skill graphs"/knowledge graphs built from many small linked markdown files with progressive disclosure, descriptions/frontmatter, and maps of content.
- Interested in maximizing agent capabilities, autonomy, and proactive work through better memory architecture, retrieval, and operating practices rather than just larger context windows.
- Shared references for future implementation thinking: Microsoft Playwright CLI, Ars Contexta, and the concept of linked SKILL.md graphs.
- Wants the Obsidian / knowledge-graph project handled systematically and methodically, with blocker-driven execution instead of vague status updates.
- Wants TSI and job-search materials treated as a first-class, exhaustive ingestion lane.

## Recurring Issues
- GA4 daily report fails consistently (~08:30 CT) due to GA4_PROPERTY_ID env var not being set in the cron environment. This has been logged since 2026-02-25 with no fix implemented yet.
- Telegram cron/update noise became a trust-eroding issue during the Obsidian project; stale proactive jobs and delivery mismatches should be treated as blockers, not minor annoyances.
- ACP runtime backend is not configured, which blocks Codex/ACP swarm usage until fixed.
- qmd vault indexing / retrieval stability remains unreliable, including cases where the `vault` collection reports zero files.
- Intermittent Obsidian vault locking remains an unresolved infrastructure blocker.

## Active Projects
- Obsidian / knowledge-graph work should be managed as an explicit blocker queue in this order: stale Telegram cron alerts → ACP/Codex enablement → qmd stability → Obsidian vault locking → TSI/job-search ingestion completeness.
- `obsidian-skill-graph-build`: finish first-pass ingestion of the highest-value `clawd` and Downloads materials into structured Obsidian clusters and define completion criteria.
- `cross-session-continuity-system`: keep handoff examples and registry/state files current so work survives context turnover.
- `runtime-stability-hardening`: continue investigating qmd failures, skill-path warnings, and runtime/vault instability.

## Workspace Artifacts
- Durable files created for the March 13 Obsidian/TSI push include `ops/issues/infrastructure-blockers.md`, `ops/handoffs/2026-03-13_context-consolidation.md`, `ops/handoffs/2026-03-13_direct-ingestion-progress.md`, `ops/handoffs/2026-03-13_tsi-jobsearch-priority.md`, `ops/runbooks/qmd-usage.md`, and TSI/job-search backlog + triage files under `ops/ingestion/`.
- Vault artifacts created for that push include `Documents/CJL Vault/04 Domains/Career/MOC - TSI and Job Search.md`, `Documents/CJL Vault/04 Domains/Career/TSI and Job Search - Ingestion backlog.md`, and TSI/FACS knowledge notes under `Documents/CJL Vault/04 Domains/Knowledge Systems/`.

## People
- Relevant recurring stakeholders in the current Obsidian / job-search context: Connor, TSI, Spring Health, Gian, and Mika.
