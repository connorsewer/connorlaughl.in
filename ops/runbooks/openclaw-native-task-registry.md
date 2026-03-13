# OpenClaw-native Task Registry

## Goal

Track delegated, monitored, and proactive work in a durable machine-readable form.

## Recommended file

- `ops/agent-state/task-registry.json`

## Each task should track

- `id`
- `title`
- `type` (research|build|review|ops|cron|monitoring)
- `status` (queued|running|blocked|done|failed)
- `owner` (main|cron|subagent|session key)
- `modelOrAgent`
- `artifacts`
- `startedAt`
- `updatedAt`
- `nextAction`
- `notifyOnComplete`
- `retries`
- `notes`

## Why this matters

The registry becomes the shared ledger for active work across sessions and automation.
