---
title: Heartbeat for Batched Checks, Cron for Precise Timing
description: Use heartbeat for grouped periodic maintenance and cron for exact reminders or isolated recurring jobs.
when_to_use: Use when deciding how to automate proactive work.
status: active
links:
  - proactivity-needs-clear-bounds
  - operationalize-repeated-work
---

# Heartbeat for Batched Checks, Cron for Precise Timing

These two mechanisms do different jobs.

## Use heartbeat when

- several checks can be batched
- exact timing is not critical
- maintenance should happen with main-session context

## Use cron when

- exact timing matters
- the task is a standalone reminder
- the task should run in an isolated execution path
