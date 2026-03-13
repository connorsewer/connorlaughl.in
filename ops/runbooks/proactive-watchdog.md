# Proactive Watchdog

## Goal

Use shared state plus lightweight checks to proactively notify Connor when something materially changes, without spamming routine noise.

## Inputs

- `ops/agent-state/task-registry.json`
- `ops/agent-state/system-health.md`
- `ops/agent-state/monitor-state.json`

## Notify when

- a task becomes blocked or failed
- a new crash-like runtime signal appears
- a previously running task completes and is worth surfacing
- human attention is truly needed

## Do not notify for

- unchanged routine state
- generic background activity
- known low-grade noise unless it worsens materially

## Rule

The watchdog should be selective, stateful, and quiet by default.
