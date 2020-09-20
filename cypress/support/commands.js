/// <reference types="Cypress" />

import 'cypress-plugin-snapshots/commands';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })

Cypress.Commands.add(
  'waitForInitialUIRenderDone',
  ({
    url,
    reqBeforeCallback,
    reqAfterCallback,
    selectorToCheckUiRenderDone,
  }) => {
    cy.setCookie('no_mock_api', 'false');
    cy.visit(url, {
      onBeforeLoad: win => {
        win.eval(window.parent.xhookResponse);

        if (reqBeforeCallback) {
          win.xhook.before(request => {
            reqBeforeCallback(request);
          });
        }

        if (reqAfterCallback) {
          win.xhook.after((request, response) => {
            reqAfterCallback(request, response);
          });
        }
      },
    });

    if (selectorToCheckUiRenderDone) {
      cy.contains(...selectorToCheckUiRenderDone)
        .should('be.visible')
        .log('**Initial UI render is done**');
    }
  }
);

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
