# AHKstrategies — Project

Status: ![CI](https://github.com/ahkstrategies/dns-setup/actions/workflows/e2e.yml/badge.svg)

Quickstart
---------

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

Detached server
---------------

On Windows you can run the provided helper:

```powershell
npm run start:detached
# uses scripts/runDetached.ps1
```

Run E2E locally via Node runner
--------------------------------

This project includes a small Node runner that starts the server, waits for `/health`, runs Cypress, and stops the server. Use:

```powershell
npm run e2e
```

CI (GitHub Actions)
--------------------

The workflow `.github/workflows/e2e.yml` runs on push and pull_request to `master`, on Ubuntu and Windows, using Node 20. It runs `npm ci` and `npm run e2e`.

Troubleshooting
---------------

- Port in use: If port 8080 is already used, either stop the process holding it or set `PORT` to another port and run the server with that env var (update the Cypress baseUrl accordingly).
- Remote push: this environment cannot push to remote repos; commit locally and push from a developer machine with proper credentials.

Patches
-------

This repository keeps a canonical patch for distribution in `patches/`. The current canonical patch is:

```
patches/0001-chore-ci-add-GitHub-Actions-e2e-workflow-Node-e2e-ru.patch
```

CI Badge
--------

The badge at the top of this README points at the expected workflow — update the repo owner/name in the badge URL if you move the project to a different remote.
# AHKstrategies project

Quick start:

1) Install dependencies
   npm install

2) Install Cypress browser binaries (optional, cypress will do this on first run):
   npx cypress install

3) Start the server in one terminal:
   npm run start:server

4) Run tests in another terminal:
   npm test

The server serves the static site and accepts POST /submit which writes to submissions/.
