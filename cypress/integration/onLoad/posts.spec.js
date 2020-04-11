/// <reference types="Cypress" />

describe('/posts - on load', () => {
  let mockConfigs;
  const customConfigs = Cypress.config('custom');

  before(() => {
    cy.fixture('mocks/mockConfigs.json').then(json => {
      mockConfigs = json;
    });
  });

  it(`should show UIs correctly after initial loading`, () => {
    let posts;

    cy.cc_waitForInitialUIRenderDone({
      url: customConfigs.pages.posts,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reqBeforeCallback: (request, proxy) => {
        if (request.url.match(/api\/posts/)) {
          request.headers[mockConfigs.customHeaderFilePath] = 'getAllPosts.js';
          request.headers[mockConfigs.customHeaderName] = 'ok';
        }
      },
      reqAfterCallback: (request, response) => {
        if (request.url.match(/api\/posts/)) {
          posts = JSON.parse(response.data);
        }
      },
      selectorToCheckUiRenderDone: ['.title', 'Welcome to Next.js!'],
    });

    cy.log(`**should show all posts**`);
    cy.get('[data-testid=post]').then($elements => {
      posts.forEach((post, index) => {
        expect($elements.eq(index).find('h2').text()).equal(post.title);
      });
    });
  });
});
