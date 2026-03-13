# Deterministic Monitoring Loop

## Goal

Monitor active work and runtime state cheaply and reliably without spending model tokens on questions a script can answer.

## Checks to prefer

- Does the process/session exist?
- Did expected files appear?
- Did a task update its registry state?
- Did CI or validation state change?
- Did a known blocker clear or worsen?

## Escalate only when

- a task is stuck
- a task failed repeatedly
- an expected artifact is missing
- human attention is actually needed

## Why this matters

Cheap deterministic checks should do most of the babysitting. Agent intervention should focus on interpretation and recovery, not polling.
