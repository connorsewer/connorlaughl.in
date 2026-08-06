# Wave C — phase log

Running record for
[the Wave C spec](../specs/2026-08-06-visual-elevation-design.md). One section
per build phase, written as the phase closes. A failed gate stops the wave and
is recorded here rather than waived.

Public-repo file: no gated value, no vendor, employer or client name, no
metric. Numbers here are build and performance measurements only.

---

## Phase 0 — sequencing assertion

Both assertions pass. Wave C may start.

**Assertion 1: `voice:scan` clean against a prod-mode build.**

- `npm run build` on `redesign/manual`, then `npx next start -p 3117`. Port
  3117 was confirmed free before the start and the listening PID was confirmed
  to be this session's own process. Port 3000 was not used and no pre-existing
  listener was trusted.
- `node scripts/voice-scan.mjs --base http://localhost:3117` →
  `Voice scan passed: 24 route(s) scanned, 0 route(s) still on the baseline.`
- `scripts/voice-scan-baseline.json` is `{}`, so "passed" means empty rather
  than baselined-over.

**Assertion 2: Wave B claim-scope commit present on `redesign/manual`.**

All three named commits verified as ancestors of `HEAD`:

| Hash | Subject |
|---|---|
| `a1da60a4` | `fix(claims): enforce claim-scope decisions on chapter proof blocks` |
| `595e4bb6` | `fix(copy): wave B style rewrite (edge signatures, chapter slots, parallelisms, captions)` |
| `eadd8e0c` | `fix(copy): wave B round-1 fixes, Connor-attested facts sourced` |

`npm run proof:guard` also passes: 4 renderers against a floor of 4.

---

