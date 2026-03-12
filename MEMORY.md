# MEMORY.md - Curated Long-Term Memory

## System Notes

- **Cron sessions** (like hourly checkpoints) run in isolated sessions and cannot access main session history due to visibility restrictions. Checkpoints log this limitation but cannot extract conversation data.

## Last Updated
- 2026-03-12: Added preference for structured knowledge / skill-graph style memory and proactive capability architecture inspired by Ars Contexta + layered memory systems
- 2026-02-25: Created file, noted cron session visibility limitation

## Preferences & Direction
- Prefers structured knowledge over monolithic prompts/docs; sees value in "skill graphs"/knowledge graphs built from many small linked markdown files with progressive disclosure, descriptions/frontmatter, and maps of content.
- Interested in maximizing agent capabilities, autonomy, and proactive work through better memory architecture, retrieval, and operating practices rather than just larger context windows.
- Shared references for future implementation thinking: Microsoft Playwright CLI, Ars Contexta, and the concept of linked SKILL.md graphs.

## Recurring Issues
- GA4 daily report fails consistently (~08:30 CT) due to GA4_PROPERTY_ID env var not being set in the cron environment. This has been logged since 2026-02-25 with no fix implemented yet.
