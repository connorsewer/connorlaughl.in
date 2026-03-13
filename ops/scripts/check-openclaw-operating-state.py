#!/usr/bin/env python3
import json
from pathlib import Path

base = Path('/Users/connorlaughlin/clawd/ops/agent-state')
required = [
    'current-focus.md',
    'active-projects.md',
    'open-loops.md',
    'blockers.md',
    'system-health.md',
    'task-registry.json',
]
missing = [name for name in required if not (base / name).exists()]
print('operating state check')
if missing:
    print('missing:')
    for m in missing:
        print(f'- {m}')
else:
    print('all core state files present')

registry = base / 'task-registry.json'
if registry.exists():
    data = json.loads(registry.read_text())
    tasks = data.get('tasks', [])
    print(f'task count: {len(tasks)}')
    blocked = [t for t in tasks if t.get('status') in ('blocked', 'failed')]
    if blocked:
        print('attention needed:')
        for t in blocked:
            print(f"- {t.get('id')}: {t.get('status')}")
