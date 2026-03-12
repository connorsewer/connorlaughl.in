# Blockers

## Purpose

List current blockers or frictions so future sessions can work around them quickly.

## Current blockers

### 1. Cron/session visibility restrictions
- Cron/isolated sessions cannot freely read main-session history via `sessions_history`
- Workaround: use shared files as the continuity layer

### 2. Gateway/runtime instability under load
- Symptoms observed: crash/restart, stale session locks, flaky subagent behavior, doctor crash
- Mitigation already applied: reduced subagent concurrency from 8 to 4

### 3. Skill-path warning noise
- Gateway logs show repeated skill path warnings about paths resolving outside configured roots
- Needs targeted cleanup/inspection

### 4. Obsidian vault file locking on some files
- Some existing files intermittently return resource deadlock errors
- Workaround: create new notes or retry later; cleanest fix may require environmental change
