# Cross-Session Continuity

## Goal

Preserve useful context across main session, cron jobs, delegated sessions, and restarts.

## Why this exists

Session history visibility is not always available across execution contexts. Shared files are the durable coordination layer.

## Read order when continuity matters

1. `ops/agent-state/current-focus.md`
2. `ops/agent-state/active-projects.md`
3. `ops/agent-state/open-loops.md`
4. `ops/agent-state/blockers.md`
5. relevant handoff note in `ops/handoffs/`
6. relevant durable memory or graph notes

## Update rules

Update shared state when:
- priorities change
- a project moves phases
- a blocker appears or clears
- a long-running thread creates useful next actions

## Use handoffs when

- a task spans sessions
- a cron or subagent should continue work later
- there are artifacts and next actions worth preserving

## Anti-patterns

- relying on memory of prior chats alone
- giant session dumps instead of concise state
- cron jobs assuming they can read main-session history
