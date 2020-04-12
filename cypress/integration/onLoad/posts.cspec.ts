/// <reference types="Cypress" />

describe('/posts - on load', () => {
  let mockConfigs: { customHeaderFilePath: string; customHeaderName: string };
  const customConfigs = Cypress.config('custom');

  before(() => {
    cy.fixture('mocks/mockConfigs.json').then(json => {
      mockConfigs = json;
    });
  });

  it(`should show UIs correctly after initial loading`, () => {
    let posts: Array<{ title: string }>;

    cy.waitForInitialUIRenderDone({
      url: customConfigs.pages.posts,
      reqBeforeCallback: request => {
        if (request.url.match(/\/posts/)) {
          // NOTE: if URL is https://jsonplaceholder.typicode.com/posts
          // change to '/api/posts' to use mock data
          request.url = '/api/posts';
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

export {};
