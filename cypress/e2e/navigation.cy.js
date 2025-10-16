// cypress/e2e/navigation.cy.js

describe('AHKstrategies navigation and contact form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the home page and uses friendly hash routing', () => {
    cy.get('#page-home').should('be.visible');
    cy.get('[data-page="about"]').click();
    cy.url().should('include', '#/about');
    cy.get('#page-about').should('be.visible');
    // Middle East nav item exists and is emphasized
    cy.get('[data-page="middle-east"]').should('exist').and('have.class', 'nav-item--hub');
    cy.get('[data-page="middle-east"]').within(() => {
      cy.get('.nav-note').should('contain.text', 'Regional hub');
    });
  });

  it('navigates using keyboard and opens mobile menu', () => {
    // focus and press Enter on the contact nav item
    cy.get('[data-page="contact"]').focus().type('{enter}');
    cy.url().should('include', '#/contact');
    cy.get('#page-contact').should('be.visible');
    // also test navigation to Middle East via click
    cy.get('[data-page="middle-east"]').click();
    cy.url().should('include', '#/middle-east');
    cy.get('#page-middle-east').should('be.visible');
  });

  it('submits the contact form and shows modal', () => {
    cy.intercept('POST', '/submit', { statusCode: 200, body: { ok: true } }).as('submit');

    // go to contact
    cy.get('[data-page="contact"]').click();

    cy.get('#contact-form').within(() => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('textarea[name="message"]').type('Hello from Cypress');
      cy.get('button[type="submit"]').click();
    });

    cy.wait('@submit');
    cy.get('#modal').should('be.visible');
    cy.get('#modal-title').should('contain.text', 'Message Sent');
    cy.get('#modal-close').click();
    cy.get('#modal').should('not.be.visible');
  });

  it('passes a basic a11y scan (critical issues)', () => {
    // ensure axe is injected into the AUT before running the checks
    cy.injectAxe();
    // Run a stricter a11y scan: WCAG 2.1 AA, include critical + moderate impacts
    const options = {
      runOnly: {
        type: 'tag',
        values: ['wcag21aa']
      },
      // include only critical + moderate impacts for initial baseline
      includedImpacts: ['critical', 'moderate']
      // To tighten the gate in future, include 'serious' as well:
      // includedImpacts: ['critical', 'serious', 'moderate']
    };

    // Run checkA11y and capture results. If violations exist, save JSON to disk and fail.
    cy.checkA11y(null, options, (violations) => {
      // create results directory and write violations JSON for CI
      const out = { violations };
      cy.task('saveFile', { filename: 'cypress/results/a11y.json', data: JSON.stringify(out, null, 2) });
      if (violations && violations.length) {
        // fail the test with a readable message
        throw new Error(`Accessibility violations found: ${violations.length} (see cypress/results/a11y.json)`);
      }
    });
  });
});
