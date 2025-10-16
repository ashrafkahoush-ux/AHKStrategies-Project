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
