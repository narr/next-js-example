/// <reference types="Cypress" />

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-react-unit-test';
// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// @ workaround for an issue - https://github.com/cypress-io/cypress/issues/521
before(() => {
  const baseUrl = Cypress.config('baseUrl');
  if (baseUrl == null) {
    return;
  }
  const xHookUrl = `${baseUrl}/assets/js/xhook.min.js`;
  cy.request(xHookUrl).then(response => {
    cy.window().then(win => {
      // NOTE: to share xhookResponse with test window even after it refreshes
      // As parent window is not refreshed and doesn't lose the data after "it" block
      // the child window(test window) can access it by "win.parent.xhookResponse"
      win.parent.xhookResponse = response.body;
    });
  });
});
// @
