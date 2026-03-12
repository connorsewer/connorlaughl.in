# Proactive Messaging Jobs

## Rule

If the goal is to proactively notify Connor on Telegram, do **not** use a main-session `systemEvent` reminder.

Use:
- `sessionTarget: isolated`
- `payload.kind: agentTurn`
- `delivery.mode: announce`
- `delivery.channel: telegram`
- `delivery.to: 7879720980`

## Use main-session systemEvent only for

- internal nudges
- session-local reminders
- prompts that do not need external delivery

## Use proactive announce jobs for

- progress updates while Connor is away from the MacBook
- alerts
- scheduled summaries
- reminders that must reach Telegram without an open local session

## Anti-pattern

Bad pattern:
- `sessionTarget: main`
- `payload.kind: systemEvent`
- no delivery config

This wakes the assistant internally but does not proactively message Connor.

## Safe template

```json
{
  "schedule": { "kind": "every", "everyMs": 1800000 },
  "payload": {
    "kind": "agentTurn",
    "message": "Send Connor a concise proactive update. If nothing new, output NO_REPLY."
  },
  "sessionTarget": "isolated",
  "delivery": {
    "mode": "announce",
    "channel": "telegram",
    "to": "7879720980",
    "bestEffort": true
  }
}
```
