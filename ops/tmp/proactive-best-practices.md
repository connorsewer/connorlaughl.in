# Proactive Capability Best Practices

## Goal

Increase useful initiative, continuity, and throughput without creating noise, overreach, or brittle automation.

## Operating principles

- prefer internal maintenance over unsolicited external action
- batch low-urgency checks
- escalate only when something is actionable, time-sensitive, or high-value
- convert repeated friction into structure
- write memory to files instead of trusting session continuity

## Heartbeat usage

Use heartbeat for batched, low-precision background work.

Good heartbeat tasks:
- check recent important emails or notifications
- review upcoming calendar windows
- maintain memory files
- promote repeated lessons into graph nodes or runbooks
- inspect project status at a high level

Heartbeat rules:
- avoid repeating checks too frequently
- avoid messaging when nothing changed
- prefer one useful summary over multiple tiny pings
- keep HEARTBEAT.md small and explicit

## Cron usage

Use cron for:
- exact reminders
- deadline-oriented prompts
- isolated recurring jobs
- periodic summaries where timing matters

Do not use cron when heartbeat batching is sufficient.

## Memory promotion rules

Promote information based on durability and reuse.

- daily event or one-off interaction -> `memory/YYYY-MM-DD.md`
- durable preference or standing fact -> `MEMORY.md`
- reusable method, claim, or design principle -> `graph/nodes/`
- navigational cluster or topic overview -> `graph/mocs/`
- repeated procedure -> `ops/runbooks/`

Promotion triggers:
- explained 2-3 times already
- reused across different tasks
- likely to matter again after session reset
- recurring failure or recurring success pattern

## Runbooks

Create runbooks when sequences become stable.

Good candidates:
- weekly memory review
- converting daily notes into graph nodes
- inbox / draft triage
- browser-based research workflow
- periodic project health review

A runbook should be short, ordered, and reusable.

## Subagent usage

Use subagents for:
- long-running synthesis
- parallel research or analysis
- isolated drafting
- repetitive transformations across many files

Avoid subagents for tiny edits or when orchestration overhead exceeds value.

## Browser and web workflows

Prefer concise, tool-native browser actions over verbose manual page-state dumps.

Good uses:
- authenticated research
- form completion
- website task execution
- capture of workflow/API behavior for later replay

If a web task repeats, move from browser-only execution toward:
1. runbook
2. capture/replay
3. stable skill/workflow

## Maintenance cadence

Daily:
- log important events and decisions
- capture durable insights while fresh

Every few days:
- review recent memory files
- promote recurring patterns into graph or runbooks
- prune stale or redundant notes

Weekly:
- review graph structure
- split oversized nodes
- improve MOCs
- identify opportunities for automation or reminders

## Anti-patterns

- over-automating before patterns are stable
- writing giant memory dumps
- creating too many folders too early
- sending frequent low-value status updates
- relying on implied memory instead of written memory

## Recommendation

Build a calm, compounding system:
- small durable notes
- explicit navigation
- selective proactive behavior
- regular maintenance
- promotion of repetition into structure
