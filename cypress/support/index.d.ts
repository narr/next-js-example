// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface ConfigOptions {
    custom: {
      pages: {
        default: string;
        posts: string;
      };
      mockServerPort: number;
      waitTime: number;
    };
  }

  interface Chainable {
    waitForInitialUIRenderDone({
      url,
      reqBeforeCallback,
      reqAfterCallback,
      selectorToCheckUiRenderDone,
    }: {
      url: string;
      reqBeforeCallback?: (request: any, proxy: VoidFunction) => void;
      reqAfterCallback?: (request: any, response: any) => void;
      selectorToCheckUiRenderDone?: any[];
    }): VoidFunction;
  }
}
