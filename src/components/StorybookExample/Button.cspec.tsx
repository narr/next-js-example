describe('Storybook example component', () => {
  const customConfigs = Cypress.config('custom');

  it(`should render correctly`, () => {
    cy.waitForInitialUIRenderDone({
      url: customConfigs.components['example-button--primary'],
      selectorToCheckUiRenderDone: [/button/i],
    });
  });
});

export {};
