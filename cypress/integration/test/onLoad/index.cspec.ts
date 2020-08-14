describe('/ - on load', () => {
  const customConfigs = Cypress.config('custom');

  it(`should show UIs correctly after initial loading`, () => {
    cy.waitForInitialUIRenderDone({
      url: customConfigs.components['test-homepage--base'],
      selectorToCheckUiRenderDone: ['Welcome to Next.js!'],
    });

    cy.log(`**should show all link titles below**`).wait(
      customConfigs.logWaitTime
    );
    cy.contains('h3', 'Documentation').should('be.visible');
    cy.contains('h3', 'Learn').should('be.visible');
    cy.contains('h3', 'Modal').should('be.visible');
    cy.contains('h3', 'Posts').should('be.visible');
  });
});

export {};
