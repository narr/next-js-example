describe('CurvedLineChart', () => {
  const customConfigs = Cypress.config('custom');

  it(`should render correctly`, () => {
    cy.waitForInitialUIRenderDone({
      url: customConfigs.components['components-curvedlinechart--base'],
    });

    cy.wait(customConfigs.logWaitTime).get('svg').should('be.visible');
    cy.get('svg').toMatchSnapshot();
  });
});

export {};
