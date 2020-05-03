import { Card } from './index';
import React from 'react';
import { mount } from 'cypress-react-unit-test';

describe('Card component', () => {
  const customConfigs = Cypress.config('custom');

  it(`should render correctly`, () => {
    mount(<Card title={'title test'} subTitle={'subTitle test'} />);
    cy.wait(customConfigs.waitTime).contains('title test').should('be.visible');
    cy.wait(customConfigs.waitTime)
      .contains('subTitle test')
      .should('be.visible');
  });
});

export {};
