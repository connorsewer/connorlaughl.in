#!/usr/bin/env python3
import json
from pathlib import Path

p = Path('/Users/connorlaughlin/clawd/ops/agent-state/task-registry.json')
if not p.exists():
    print('task registry missing')
    raise SystemExit(1)

data = json.loads(p.read_text())
tasks = data.get('tasks', [])
print(f'tasks: {len(tasks)}')
for t in tasks:
    print(f"- {t.get('id')}: {t.get('status')} | next: {t.get('nextAction')}")
