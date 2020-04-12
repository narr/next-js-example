import { ZeitIcon } from './index';
import React from 'react';

describe('ZeitIcon component', () => {
  const customConfigs = Cypress.config('custom');

  // it.only(`test`, () => {
  //   expect(true).equal(true);
  // });

  it(`should render correctly`, () => {
    cy.mount(<ZeitIcon />);
    cy.wait(customConfigs.waitTime).get('svg').should('be.visible');
  });
});

export {};
