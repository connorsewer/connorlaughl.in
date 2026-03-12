# Active Projects

## Purpose

Shared list of active projects and their current state for cross-session continuity.

## Projects

### 1. Obsidian knowledge graph / skill graph
- Status: active
- Goal: turn the vault into a portable, markdown-native knowledge system readable by humans and agentic tools
- Current work: tool notes, capability notes, skill-family notes, playbooks, MOCs, named skill notes

### 2. Cross-session continuity architecture
- Status: active
- Goal: ensure main session, cron, subagents, and future sessions can coordinate through shared durable state
- Current work: create `ops/agent-state/`, `ops/handoffs/`, and write placement/update rules

### 3. Runtime stability hardening
- Status: active
- Goal: reduce gateway/subagent instability during heavier workloads
- Current work: diagnose crash/restart symptoms, reduce subagent concurrency, document incident patterns, inspect config/log behavior
