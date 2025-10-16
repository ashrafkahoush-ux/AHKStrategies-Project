// cypress/e2e/hero_screenshot.cy.js
describe('Hero screenshot', () => {
  it('captures a high-res screenshot of the homepage hero', () => {
    // set higher viewport for a higher-res capture
    cy.viewport(1600, 1000);
    cy.visit('/');
    // wait for hero canvas to be present
    cy.get('.hero, .immersive', { timeout: 8000 }).should('exist');
    // prefer .hero if present, otherwise .immersive
    cy.get('.hero, .immersive').first().scrollIntoView().should('be.visible');
    // give animations a moment to settle
    cy.wait(600);
    // screenshot the hero element and force overwrite if exists
    cy.get('.hero, .immersive').first().screenshot('home-hero', { overwrite: true, capture: 'viewport' });
  });
});
