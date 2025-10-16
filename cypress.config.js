const fs = require('fs');
const path = require('path');

module.exports = {
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // task: saveFile - write a file to the workspace for CI/artifacts
      on('task', {
        saveFile({ filename, data }) {
          const outDir = path.resolve(process.cwd(), path.dirname(filename));
          try {
            fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.resolve(process.cwd(), filename), data, 'utf8');
            return null;
          } catch (err) {
            console.error('saveFile error', err);
            throw err;
          }
        }
      });
      return config;
    }
  }
};
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}'
  }
});
