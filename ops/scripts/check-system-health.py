#!/usr/bin/env python3
from pathlib import Path

ERR = Path.home() / '.openclaw' / 'logs' / 'gateway.err.log'
LOG = Path.home() / '.openclaw' / 'logs' / 'gateway.log'

signals = []

if ERR.exists():
    text = ERR.read_text(errors='ignore')[-50000:]
    for needle in ['SIGABRT', 'FATAL ERROR', 'v8::', 'node::NodeMainInstance', 'Resource deadlock avoided']:
        if needle in text:
            signals.append(f'err:{needle}')

if LOG.exists():
    text = LOG.read_text(errors='ignore')[-50000:]
    for needle in ['Removed stale session lock', 'rate_limit failure', 'Skipping skill path that resolves outside its configured root']:
        if needle in text:
            signals.append(f'log:{needle}')

if not signals:
    print('system health: no tracked signals')
else:
    print('system health signals:')
    for s in signals:
        print(f'- {s}')
