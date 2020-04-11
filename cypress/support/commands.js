/// <reference types="Cypress" />

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

// NOTE: cc: custom command
Cypress.Commands.add(
  'cc_waitForInitialUIRenderDone',
  ({
    url,
    reqBeforeCallback,
    reqAfterCallback,
    selectorToCheckUiRenderDone,
  }) => {
    const customConfigs = Cypress.config('custom');
    cy.setCookie('mock_server', 'true');
    cy.visit(url, {
      onBeforeLoad: win => {
        win.eval(window.parent.xhookResponse);

        if (reqBeforeCallback) {
          win.xhook.before(request => {
            request.withCredentials = false;
            const proxy = () => {
              // NOTE: proxy a request (xhr or fetch) to Cypress sever port if
              // the html is served from a different server
              if (request.url.indexOf(customConfigs.mockServerPort) < 0) {
                request.url = request.url.replace(
                  /:[0-9]+\//,
                  `:${customConfigs.mockServerPort}/`
                );
              }
            };
            reqBeforeCallback(request, proxy);
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
