import { ZeitIcon } from './index';
import React from 'react';

describe('ZeitIcon component', () => {
  const customConfigs = Cypress.config('custom');

  it(`should render correctly`, () => {
    cy.mount(<ZeitIcon />);
    cy.wait(customConfigs.waitTime).get('svg').should('be.visible');
  });
});

export {};
