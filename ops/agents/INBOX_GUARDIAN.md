# INBOX GUARDIAN - Agent Definition

Monitors Gmail for new important messages (LinkedIn, Indeed, Glassdoor) every 15 minutes.

## Process
1. Search Gmail for messages from linkedin.com, indeed.com, glassdoor.com (newer_than:1h)
2. Compare against processedIds in state.json
3. For new messages:
   - Categorize: jobs/urgent/shipping/promo
   - Generate draft reply stub if from recruiter
   - Save to ops/drafts/
4. Update state.json with processed IDs
5. Alert if URGENT (3+ recruiters in 24h, job offer, security issue)

## State Location
~/.clawdbot/inbox-guardian/state.json

## Rules
- NEVER send messages automatically
- All drafts go to ops/drafts/ first
- Use MiniMax-M2.5 for generation
