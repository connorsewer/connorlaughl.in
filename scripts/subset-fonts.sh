#!/usr/bin/env bash
# Re-subset GT Sectra Fine TTFs to woff2. Requires `uv`.
# Output: public/fonts/gt-sectra-fine/*.woff2 (overwrites in place).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
cd "$ROOT"
uv run --with "fonttools>=4.50" --with "brotli>=1.0" scripts/subset-fonts.py
