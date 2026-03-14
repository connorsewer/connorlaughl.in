# Infrastructure Blockers

## Active issues

### 1. Stale Telegram cron alerts
- Symptom: user still receives stale/no-progress cron updates
- Goal: identify and remove every remaining project-update alert job
- Status: active

### 2. ACP / Codex backend availability
- Symptom: ACP runtime backend not configured even after acpx plugin path patch and OpenClaw update
- Goal: make ACP runs work so Codex can be used through OpenClaw
- Status: active

### 3. qmd stability / vault coverage
- Symptom: wrapper/runtime mismatch fixed, but collection/index/query behavior still needs verification and stabilization
- Goal: stable local retrieval over vault + clawd
- Status: active

### 4. Obsidian vault file locking
- Symptom: intermittent `Unknown system error -11` on some existing files
- Goal: reduce impact or find a reliable workaround
- Status: active

### 5. TSI / job-search knowledge completeness
- Symptom: large high-value document set exists, but only a first slice has been extracted
- Goal: systematically ingest and map the full high-value professional domain
- Status: active
