# qmd Usage

## Stable local wrapper

Use this wrapper to ensure qmd runs under the intended Node 22 runtime instead of a conflicting Homebrew Node:

- `/Users/connorlaughlin/clawd/ops/bin/qmd22`

## Current collections

- `vault` -> `/Users/connorlaughlin/Documents/CJL Vault`
- `clawd` -> `/Users/connorlaughlin/clawd`

## Important collection safety

The `vault` collection excludes:
- `90 Sensitive/**`
- `.obsidian/**`

This prevents qmd from indexing sensitive private notes and Obsidian internals.

## Root contexts

- `vault`: Curated Obsidian vault with structured knowledge, MOCs, reusable notes, skill graph content, and source-note ingestion outputs.
- `clawd`: Assistant workspace with runbooks, roadmaps, memory files, graph notes, state files, scripts, and architecture docs.

## Useful commands

### Keyword search
/Users/connorlaughlin/clawd/ops/bin/qmd22 search "query" -c vault
/Users/connorlaughlin/clawd/ops/bin/qmd22 search "query" -c clawd

### Hybrid query
/Users/connorlaughlin/clawd/ops/bin/qmd22 query "query" -c vault
/Users/connorlaughlin/clawd/ops/bin/qmd22 query "query" -c clawd

### JSON output for agents
/Users/connorlaughlin/clawd/ops/bin/qmd22 query "query" --json -n 10 -c vault

### Get full doc
/Users/connorlaughlin/clawd/ops/bin/qmd22 get "qmd://vault/path/to/file.md" --full

## Current state

- direct runtime mismatch fixed via wrapper
- vault collection recreated cleanly
- vault now has broad file coverage
- embeddings still need a clean successful run
