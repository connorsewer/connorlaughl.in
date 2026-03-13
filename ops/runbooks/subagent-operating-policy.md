# Subagent Operating Policy

## Purpose

Use delegated sessions deliberately and safely.

## Use subagents when

- the task is long-running
- work can be parallelized cleanly
- isolation helps
- the expected output is an artifact, draft, or structured result

## Do not use subagents when

- the task is tiny
- orchestration overhead exceeds the work
- the gateway/runtime looks unstable

## Rules

- keep concurrency moderate
- verify outputs on disk or via explicit artifacts
- require handoffs for meaningful delegated work
- prefer model selection by task type
- reduce delegation if stability worsens
