# Obsidian Layout Plan

## Recommendation

Use `/Users/connorlaughlin/clawd` itself as the Obsidian vault.

Why:
- markdown files remain the source of truth
- agent and human edit the same files
- git history stays attached to the real workspace
- no duplication or sync drift between "vault" and "repo"

## Core folders

- `MEMORY.md` — curated long-term memory
- `memory/` — daily logs and event notes
- `graph/index.md` — graph entry point
- `graph/mocs/` — navigational maps of content
- `graph/nodes/` — atomic reusable concepts, claims, and methods
- `ops/runbooks/` — operational procedures
- `ops/tmp/` — scratch synthesis and temporary planning docs
- `ops/drafts/` — incomplete outbound or work-product drafts

## Naming conventions

- Prefer descriptive kebab-case filenames
- Prefer claim-like names for reusable concepts
- Keep MOC names domain-oriented, not generic
- One main idea per node

Examples:
- `graph/nodes/progressive-disclosure-is-a-capability-multiplier.md`
- `graph/mocs/memory-systems.md`
- `ops/runbooks/knowledge-graph-maintenance.md`

## Frontmatter standard

Use this minimal schema for graph notes:

```yaml
---
title: Human-readable title
description: One-sentence scan-friendly summary.
when_to_use: Short instruction for retrieval/loading.
status: active
links:
  - related-note-path
---
```

Guidelines:
- `description` should help decide relevance before full read
- `when_to_use` should function like a retrieval hint
- `links` should only include strongly related destinations
- avoid large metadata taxonomies early on

## Wikilink conventions

Inside Obsidian, prefer wiki links for graph traversal.

Patterns:
- from MOCs: `[[../nodes/layered-memory-beats-bigger-context]]`
- from nodes: `[[progressive-disclosure-is-a-capability-multiplier]]`

If Obsidian link resolution gets awkward, standardize on either:
- relative-path wiki links everywhere, or
- unique filenames with short wiki links everywhere

My recommendation: keep filenames globally unique and use short wiki links in prose when possible.

## Minimal plugin list

Start lean.

Recommended:
- Core Obsidian only
- Optional: Dataview, only if it becomes clearly useful
- Optional: QuickAdd or Templates, only after patterns stabilize

Do not start with a large plugin stack.

## Vault settings to favor

- turn on backlinks
- show frontmatter in source mode when editing
- enable file recovery / versioning if desired, but rely on git for real history
- keep attachment sprawl minimal

## Migration guidance

1. Open this repo as an Obsidian vault
2. Verify wikilinks render cleanly
3. Adjust link style if needed for reliable navigation
4. Keep all new durable knowledge in existing canonical folders
5. Only create new top-level folders if a stable pattern emerges

## Rule

Obsidian is the interface. The files are the system.
