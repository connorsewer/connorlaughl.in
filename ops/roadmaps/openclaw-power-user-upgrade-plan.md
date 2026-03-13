# OpenClaw Power-User Upgrade Plan

## Objective

Increase capability, continuity, proactivity, reliability, and multi-agent effectiveness through explicit system design.

## Phase 1 — Continuity foundation (implemented)

- shared cross-session state in `ops/agent-state/`
- handoff folder and templates in `ops/handoffs/`
- continuity runbook
- task registry foundation
- deterministic task-registry check script

## Phase 2 — Knowledge operating system (in progress)

- markdown-native graph in workspace and Obsidian
- tool notes, capability notes, skill-family notes, playbooks, MOCs
- named skill documentation
- agent-readable markdown conventions

## Phase 3 — Runtime hardening (in progress)

- incident documentation
- system-health tracking
- reduced subagent concurrency
- diagnosis runbooks
- identify and reduce noisy warning sources

## Phase 4 — Deterministic monitoring (next)

- registry-aware watchdog script
- gateway/log health script
- proactive notification criteria
- task stuck / artifact missing heuristics

## Phase 5 — Smarter delegation (next)

- model-by-task routing policy
- delegated-work verification policy
- stable parallelization thresholds
- retry-with-better-context loop

## Phase 6 — Proactive work discovery (later)

- recurring scans for open loops, recent notes, runtime issues, and project status
- selective alerting when something actually needs attention

## Success criteria

- important work survives restarts and session boundaries
- delegated work is verifiable, not mysterious
- proactive updates actually reach the user
- runtime instability becomes visible and actionable
- the vault and workspace stay readable by humans and agents alike
