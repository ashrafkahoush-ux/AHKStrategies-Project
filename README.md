# AHKStrategies — Project

Status: ![CI](https://github.com/ahkstrategies/dns-setup/actions/workflows/e2e.yml/badge.svg)

Quickstart
----------

Prerequisites: Node 20+, npm, and (optionally) PowerShell on Windows.

1. Install dependencies

```powershell
npm ci
```

2. Start server (foreground)

```powershell
npm run start:server
# open http://localhost:8080
```

3. Run tests (headless)

```powershell
npm test
```

Detached server (Windows)
-------------------------

On Windows you can run the provided helper:

```powershell
npm run start:detached
# uses scripts/runDetached.ps1
```

Run E2E locally via Node runner
------------------------------

This project includes a small Node runner that starts the server, waits for `/health`, runs Cypress, and stops the server.

```powershell
npm run e2e
```

CI (GitHub Actions)
--------------------

The workflow is in `.github/workflows/e2e.yml` and runs on push and pull_request. It starts the server, runs the Cypress E2E and accessibility checks, and uploads results.

Troubleshooting
---------------

- Port in use: If port 8080 is already used, either stop the process holding it or set `PORT` to another port and run the server with that env var (update the Cypress baseUrl accordingly).
- Remote push: if you see remote errors, ensure the remote repo exists under your account and you have correct auth (SSH key or HTTPS credentials).

Patches
-------

This repository keeps a canonical patch for distribution in `patches/` when appropriate.

License / Notes
---------------

This project is a small single-file SPA with an Express server for local testing and CI-driven Cypress E2E. Use the `scripts/` helpers to run the server and tests on Windows and CI.
# AHKStrategies — Project

Status: ![CI](https://github.com/ahkstrategies/dns-setup/actions/workflows/e2e.yml/badge.svg)

Quickstart
---------

Prerequisites: Node 20+, npm, and (optionally) PowerShell on Windows.

1. Install dependencies

```powershell
npm ci
