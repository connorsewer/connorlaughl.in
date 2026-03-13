# Gateway / Sessions / Subagents Diagnosis (2026-03-12)

## Observed symptoms

- gateway disconnected during a period of increased parallelization attempts
- subagent/session spawns returned transcript-repair warnings instead of trustworthy completions
- `openclaw status` appeared to hang longer than expected during diagnosis

## Evidence from logs

### 1. Gateway crash / restart
`~/.openclaw/logs/gateway.err.log` shows a Node/V8 stack trace consistent with a crash before restart.

### 2. Dead session locks
After restart, gateway removed stale session lock files under:
- `~/.openclaw/agents/main/sessions/*.jsonl.lock`

This suggests an unclean shutdown left session locks behind.

### 3. High retry / rate-limit noise
`gateway.log` contains repeated:
- rate_limit failure in `read`
- rate_limit failure in `memory_search`
- rate_limit failure in `web_fetch`

This likely increased system churn during an already busy period.

### 4. Skill path warnings
Repeated log lines:
- `Skipping skill path that resolves outside its configured root.`

This may not be the direct cause of the crash, but it suggests skill-path config or skill discovery state worth cleaning up.

### 5. Browser relay token issue
Also observed:
- Chrome extension relay init failed because gateway auth token was missing for that profile path.

Likely unrelated to the subagent issue, but worth documenting.

## Current hypothesis

The subagent/session problems were probably not a pure subagent feature failure. More likely they were downstream effects of gateway instability caused by memory pressure plus retry-heavy activity during a period of aggressive parallelization.

## Practical mitigation

- avoid spawning multiple subagents during gateway instability
- prefer direct execution until gateway health is stable
- reduce noisy retry-heavy operations during large builds
- clean up skill-path config if misconfigured
- inspect whether any hook/config behavior is amplifying startup/session load

## Next steps

1. inspect `skills` config schema and current config
2. inspect relevant hook config/schema
3. consider a small operational runbook note in the vault for stable parallelization
4. only apply config changes after targeted inspection
