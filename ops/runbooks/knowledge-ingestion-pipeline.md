# Knowledge Ingestion Pipeline

## Goal

Find high-value documents across the MacBook, classify them, and progressively transform the useful ones into Obsidian-ready structured knowledge.

## Principles

- discover broadly, ingest selectively
- preserve provenance
- prefer summaries and structured notes over raw dumps
- keep the vault usable, not bloated

## Stages

### 1. Discovery
Scan likely high-value locations such as:
- `~/Downloads`
- `~/Desktop`
- `~/Documents`
- `~/clawd`

### 2. Triage
Classify candidates into:
- ignore / trash
- archive only
- raw reference
- summarize into note
- decompose into note cluster

### 3. Transformation
For selected items:
- extract metadata
- summarize or analyze
- create linked notes in Obsidian
- record source paths for provenance

### 4. Maintenance
- revisit backlog regularly
- merge duplicates
- improve links and MOCs
- archive low-value leftovers
