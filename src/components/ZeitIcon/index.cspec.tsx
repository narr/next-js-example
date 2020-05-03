import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { ZeitIcon } from './index';
import { test } from './test';

describe('ZeitIcon component', () => {
  const customConfigs = Cypress.config('custom');

  it(`test a simple function`, () => {
    expect(test(1, 2)).equal(3);
  });

  it(`should render correctly`, () => {
    mount(<ZeitIcon />);
    cy.wait(customConfigs.waitTime).get('svg').should('be.visible');
  });
});

export {};
