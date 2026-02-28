# Incidents / Self-healing Log

Format:
- YYYY-MM-DD — Symptom — Root cause — Fix — Prevention

---
- 2026-02-20 00:09 CT — ops/swarm/ directory deleted/missing — Unknown cause (possibly cleanup or repo reset) — Recreated state.json, swarm.json, and publish_swarm_activity.py from scratch — Add ops/swarm to git tracking or implement backup.

- **2026-02-20 08:30**: GA4 daily report failed - script not found at ops/scripts/ga4_report.py

- **2026-02-23 08:31**: GA4 daily report failed - script not found at ops/scripts/ga4_report.py

- **2026-02-25 08:30**: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set

- **2026-02-26 08:31**: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set

- **2026-02-27 08:31**: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set
- [2026-02-25T01:30:38Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T01:31:15Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T01:31:59Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T00:30:xxZ] singularity-executor: Convex query timeout (30s) - no approved approvals to execute
- [2026-02-25T07:45:38Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T08:30:xxZ] singularity-executor: Convex query timeout - no approved approvals to execute
