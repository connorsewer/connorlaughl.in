# Incidents / Self-healing Log

Format:
- YYYY-MM-DD — Symptom — Root cause — Fix — Prevention

---
- 2026-02-20 00:09 CT — ops/swarm/ directory deleted/missing — Unknown cause (possibly cleanup or repo reset) — Recreated state.json, swarm.json, and publish_swarm_activity.py from scratch — Add ops/swarm to git tracking or implement backup.

- **2026-02-20 08:30**: GA4 daily report failed - script not found at ops/scripts/ga4_report.py

- **2026-02-23 08:31**: GA4 daily report failed - script not found at ops/scripts/ga4_report.py

- **2026-02-24 08:31**: GA4 daily report - script created but GA4_PROPERTY_ID environment variable not set. Need to configure Google Analytics property ID for the Data API.
