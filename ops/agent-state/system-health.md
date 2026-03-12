# System Health

## Purpose

Track runtime stability signals, recurring operational issues, and mitigation status.

## Current status
- Gateway instability observed under heavier parallelization on 2026-03-12
- Subagent/session behavior became unreliable during/after gateway restart window
- `openclaw doctor --non-interactive` crashed with SIGABRT during diagnosis
- Subagent concurrency reduced from 8 to 4 as a mitigation

## Open issues
- Skill-path warning noise in gateway logs
- Cron/main-session visibility restriction remains a structural limitation
- Some Obsidian files still experience intermittent deadlock/lock behavior

## Mitigations in place
- Shared cross-session state bus in `ops/agent-state/`
- Handoff folder and templates in `ops/handoffs/`
- Proactive delivery rules documented
- Stable-parallelization playbook documented
