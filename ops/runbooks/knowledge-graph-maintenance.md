# Knowledge Graph Maintenance

## Promote into graph when

- a principle gets reused
- a workflow is repeated
- a failure mode recurs
- a preference needs to persist
- a long note contains more than one idea

## Refactor when

- a node exceeds one main idea
- titles stop being legible at scan speed
- a MOC becomes a directory dump
- links exist without explaining why to follow them

## Placement

- daily event -> `memory/YYYY-MM-DD.md`
- durable fact or preference -> `MEMORY.md`
- reusable concept or method -> `graph/nodes/`
- navigational overview -> `graph/mocs/`
- operational sequence -> `ops/runbooks/`

## Retrieval order

1. Start with `graph/index.md`
2. Read the most relevant MOC
3. Follow targeted node links
4. Read full node content only as needed
5. Update graph after repeated use or friction
