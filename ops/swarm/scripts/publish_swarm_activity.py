#!/usr/bin/env python3
"""Publish a snapshot of local swarm state to Convex for MCOS Live tab.

Calls api.swarm.publishState mutation with:
  state = ops/swarm/state.json
  swarm = ops/swarm/swarm.json

Usage:
  cd ~/clawd
  source .venv/bin/activate
  python3 ops/swarm/scripts/publish_swarm_activity.py

Requires:
  ~/clawd/.env with CONVEX_DEPLOYMENT_URL (or reads from mcOS-deploy/.env.local)
"""

import json
import os
import urllib.request
import urllib.error
from datetime import datetime, timezone

from dotenv import load_dotenv

ROOT = os.path.expanduser('~/clawd')
STATE_PATH = os.path.join(ROOT, 'ops/swarm/state.json')
SWARM_PATH = os.path.join(ROOT, 'ops/swarm/swarm.json')
MCOS_ENV_LOCAL = os.path.join(ROOT, 'mcOS-deploy/.env.local')


def _read_json(path: str):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def _post(url: str, body: dict):
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.status, json.loads(resp.read().decode())


def main():
    # Load env from clawd .env first, fallback to mcOS-deploy .env.local
    load_dotenv(os.path.join(ROOT, '.env'))
    convex_url = os.getenv('CONVEX_DEPLOYMENT_URL')
    
    if not convex_url:
        # Try mcOS-deploy/.env.local
        if os.path.exists(MCOS_ENV_LOCAL):
            load_dotenv(MCOS_ENV_LOCAL)
            convex_url = os.getenv('CONVEX_DEPLOYMENT_URL') or os.getenv('NEXT_PUBLIC_CONVEX_URL')
        else:
            convex_url = os.getenv('NEXT_PUBLIC_CONVEX_URL')

    if not convex_url:
        raise SystemExit('Missing CONVEX_DEPLOYMENT_URL in ~/clawd/.env or ~/clawd/mcOS-deploy/.env.local')

    payload = {
        'source': 'publish_swarm_activity.py',
        'payload': {
            'state': _read_json(STATE_PATH),
            'swarm': _read_json(SWARM_PATH),
        },
    }

    try:
        status, response = _post(
            f"{convex_url}/api/mutation",
            {
                'path': 'swarm:publishState',
                'args': payload,
                'format': 'json',
            },
        )
        if response.get('status') == 'success':
            print(f'✅ Published swarm state to Convex')
        else:
            print(f'❌ Convex returned error: {response}')
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ''
        print(f'❌ Convex HTTP {e.code}: {body}')


if __name__ == '__main__':
    main()
