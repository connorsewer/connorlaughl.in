# Graph Conventions Review

## What is already good

- clear separation between MOCs and nodes
- frontmatter includes useful scan-time fields
- node titles are mostly claim-oriented
- the graph is biased toward progressive disclosure

## Recommended refinements

### 1. Make filename uniqueness a rule

Avoid duplicate filenames across the graph so short wiki links stay reliable.

### 2. Keep MOCs opinionated

A MOC should say why each linked note matters, not just list links.

### 3. Standardize frontmatter

Recommended minimal schema:

```yaml
---
title: Human-readable title
description: One-sentence summary.
when_to_use: Retrieval hint.
status: active
links:
  - related-note
---
```

Optional later:
- `updated:`
- `tags:`
- `supersedes:`

Do not add them until there is a real use case.

### 4. Prefer semantic prose links

Embed links in meaningful sentences instead of dumping them in bare lists whenever practical.

### 5. Keep one main claim per node

If a note needs several sections with unrelated ideas, split it.

### 6. Separate principle nodes from procedure notes

Keep:
- `graph/nodes/` for concepts, principles, patterns
- `ops/runbooks/` for execution sequences

### 7. Add "missing areas" sections to larger MOCs

This helps the graph evolve intentionally instead of only accreting.

## Naming guidance

Use:
- claim-like or method-like names for nodes
- area names for MOCs
- short but legible kebab-case filenames

Avoid:
- vague names like `notes.md`, `ideas.md`, `system.md`
- multiple concepts packed into a single file title

## Suggested next improvements

- revise MOCs so each bullet explains why to follow the note
- standardize short wiki links if filenames remain unique
- add one or two more MOCs only when a real cluster forms
- keep graph growth slower than memory growth; promote only durable knowledge
