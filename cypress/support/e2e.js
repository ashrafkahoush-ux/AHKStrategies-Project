// cypress/support/e2e.js
import 'cypress-axe';

// Optionally add global hooks
beforeEach(() => {
  cy.injectAxe();
});

