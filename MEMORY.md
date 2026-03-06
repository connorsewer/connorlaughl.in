# MEMORY.md - Curated Long-Term Memory

## System Notes

- **Cron sessions** (like hourly checkpoints) run in isolated sessions and cannot access main session history due to visibility restrictions. Checkpoints log this limitation but cannot extract conversation data.

## Last Updated
- 2026-02-25: Created file, noted cron session visibility limitation

## Recurring Issues
- GA4 daily report fails consistently (~08:30 CT) due to GA4_PROPERTY_ID env var not being set in the cron environment. This has been logged since 2026-02-25 with no fix implemented yet.
