---
title: Browser Tools Should Be Token Efficient
description: Browser-control surfaces should expose concise actions and just enough state, avoiding excessive page dumps when possible.
when_to_use: Use when evaluating browser automation interfaces or choosing how to drive web tasks.
status: active
links:
  - operationalize-repeated-work
---

# Browser Tools Should Be Token Efficient

The lesson from CLI-style browser tools is not "CLI good, MCP bad." It is that browser interfaces should minimize irrelevant context.

Good browser tooling gives the agent:

- concise action verbs
- stable element references
- targeted snapshots
- persistent sessions when needed
- enough observability to recover from failure
