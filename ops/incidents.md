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

- **2026-02-28 08:31**: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set
- **2026-03-01 08:30**: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set

- **2026-03-07 08:31**: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set (recurring since 2026-02-25)
- **2026-03-02 08:30**: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set
- [2026-02-25T01:30:38Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T01:31:15Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T01:31:59Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T00:30:xxZ] singularity-executor: Convex query timeout (30s) - no approved approvals to execute
- [2026-02-25T07:45:38Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Command '['npx', 'convex', 'run', 'approvals:listApproved', '{"limit": 20}']' timed out after 30 seconds
- [2026-02-25T08:30:xxZ] singularity-executor: Convex query timeout - no approved approvals to execute
2026-03-03 08:31: GA4 report failed - GA4_PROPERTY_ID environment variable not set
2026-03-04 08:32: GA4 report failed - GA4_PROPERTY_ID environment variable not set
2026-03-05 08:31: GA4 report failed - GA4_PROPERTY_ID environment variable not set
2026-03-06 08:31: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set
2026-03-08: GA4 daily report failed - GA4_PROPERTY_ID environment variable not set
2026-03-10 08:40 - GA4 report failed: GA4_PROPERTY_ID not set
2026-03-11 13:51 CDT — GA4 daily report failed: GA4_PROPERTY_ID environment variable not set
2026-03-12 08:15 CDT — singularity approvals executor wrapper error — zsh read-only variable 'status' in cron wrapper after underlying script reported no approved approvals — reran underlying approved-actions script directly; avoid assigning to reserved zsh variable name `status`
2026-03-12 08:32 CT — GA4 daily report cron failed: GA4_PROPERTY_ID environment variable not set.
2026-03-13 08:30 CT - GA4 daily report cron failed: GA4_PROPERTY_ID environment variable not set.
2026-03-14 08:31 CT - GA4 daily report cron failed: GA4_PROPERTY_ID environment variable not set.
- [2026-03-14T18:01:33Z] singularity-executor: Failed to fetch approvals: Failed to run Convex query: Convex error: ✖ Error fetching GET  https://api.convex.dev/api/deployment/uncommon-walrus-373/team_and_project 401 Unauthorized: AuthenticationFailed: A valid access token is required for this command.
Authenticate with `npx convex dev`
2026-03-15 08:30 CT - GA4 daily report cron failed: GA4_PROPERTY_ID environment variable not set.
2026-03-15 15:05 CT - Swarm→Convex publish failed: ops/swarm/state.json is malformed JSON (unterminated string at line 275 column 17), so publish_swarm_activity.py could not build payload.

2026-03-15 15:21 CT - publish_swarm_activity.py failed: JSONDecodeError reading ops/swarm/state.json (Unterminated string at line 277 column 17 / char 30920).
2026-03-15 15:35 CT — publish_swarm_activity.py failed: Convex publish aborted because ops/swarm/state.json is invalid JSON (Unterminated string at line 277 column 17).
