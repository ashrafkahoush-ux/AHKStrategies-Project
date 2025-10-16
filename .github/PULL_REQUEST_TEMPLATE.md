## Summary

This PR finalizes the cross-platform e2e CI and testing workflow and documents how to run tests locally and in CI.

### Key changes

- Cross-platform e2e runner (`scripts/e2e.js`) used by CI and `npm run e2e`.
- Health-gated server start: CI waits for `http://localhost:$PORT/health` before running tests.
- Cypress tests: navigation, contact form submit, and accessibility checks.
- Detached server helper for local development (`scripts/runDetached.ps1`) and `scripts/run_and_test.ps1` for local runs.
- `.gitignore` includes `node_modules/` to prevent accidental commits.
- CI matrix runs Ubuntu + Windows runners.

## How to run locally

1. Install deps: `npm ci`
2. Start the server in the foreground and run Cypress: `& './scripts/run_and_test.ps1'` (PowerShell)
3. Or start detached then run tests: `npm run start:detached` then `npm test`

## CI behavior

- The workflow starts the server, waits for `/health`, runs the cross-platform e2e runner, then generates an accessibility report (WCAG 2.1 AA, impacts: critical + moderate).
- If axe violations are found, the job fails and the `cypress/results` artifacts (JSON + HTML) are uploaded for inspection.

## Notes

Leave `PATCHES.md` as-is; patch artifacts were created to support scenarios where pushing from this environment is not possible.
