---
title: Graph Schema
description: Minimal conventions for filenames, frontmatter, links, and note roles in the workspace knowledge graph.
when_to_use: Use when creating or refactoring graph notes, MOCs, or related runbooks.
status: active
---

# Graph Schema

## File roles

- `graph/index.md` — top-level graph entry point
- `graph/mocs/` — navigational maps of content
- `graph/nodes/` — atomic reusable concepts, methods, and claims
- `ops/runbooks/` — step-by-step procedures

## Filename rules

- use descriptive kebab-case
- keep filenames globally unique where practical
- prefer claim-like names for nodes
- prefer area/topic names for MOCs
- avoid vague names like `notes.md`, `ideas.md`, or `system.md`

## Frontmatter

Use this minimal schema for graph notes:

```yaml
---
title: Human-readable title
description: One-sentence scan-friendly summary.
when_to_use: Short retrieval hint.
status: active
links:
  - related-note-path
---
```

## Writing rules

- one main idea per node
- MOCs should explain why each linked note matters
- prefer semantic links in prose over bare related-link dumps
- move procedures into `ops/runbooks/`, not `graph/nodes/`
- split oversized notes instead of turning them into mini-wikis

## Retrieval rule

Use progressive disclosure:
1. `graph/index.md`
2. relevant MOC
3. targeted nodes
4. full read only as needed
