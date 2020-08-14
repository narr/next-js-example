describe('Card component', () => {
  const customConfigs = Cypress.config('custom');

  it(`should render correctly`, () => {
    cy.waitForInitialUIRenderDone({
      url: customConfigs.components['components-card--base'],
      selectorToCheckUiRenderDone: ['title test'],
    });

    cy.wait(customConfigs.logWaitTime)
      .contains('subTitle test')
      .should('be.visible');
  });
});

export {};
