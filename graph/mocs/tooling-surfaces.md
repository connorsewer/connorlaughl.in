---
title: Tooling Surfaces
description: Map for choosing the right execution surface: memory, cron, heartbeat, browser, subagents, files, or direct reply.
when_to_use: Use when deciding how a task should be executed or automated.
status: active
links:
  - ../nodes/heartbeat-for-batched-checks-cron-for-precise-timing
  - ../nodes/browser-tools-should-be-token-efficient
  - ../nodes/operationalize-repeated-work
---

# Tooling Surfaces

Choosing the right surface is part of capability.

## Surface selection

- [[../nodes/heartbeat-for-batched-checks-cron-for-precise-timing]]
- [[../nodes/browser-tools-should-be-token-efficient]]
- [[../nodes/operationalize-repeated-work]]

## Rule of thumb

- Files for durable memory
- MOCs for navigation
- Cron for precise reminders or isolated recurring jobs
- Heartbeats for batched checks and background maintenance
- Browser tools for interactive web execution
- Subagents for long or multi-phase work
