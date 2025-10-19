// cypress/e2e/hero_screenshot_mobile.cy.js
describe('Hero mobile screenshot', () => {
  it('captures a mobile screenshot of the homepage hero', () => {
    cy.viewport(390, 844); // typical mobile
    cy.visit('/');
    cy.get('.hero, .immersive', { timeout: 8000 }).should('exist');
    cy.get('.hero, .immersive').first().scrollIntoView().should('be.visible');
    cy.wait(600);
    cy.get('.hero, .immersive').first().screenshot('home-hero-mobile', { overwrite: true, capture: 'viewport' });
  });
});

