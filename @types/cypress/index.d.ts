declare namespace Cypress {
  interface ResolvedConfigOptions {
    custom: {
      components: {
        [k: string]: string;
      };
      logWaitTime: number;
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
      reqBeforeCallback?: (request: any) => void;
      reqAfterCallback?: (request: any, response: any) => void;
      selectorToCheckUiRenderDone?: any[];
    }): VoidFunction;
  }
}
