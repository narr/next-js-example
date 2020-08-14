describe('/posts - on load', () => {
  const customConfigs = Cypress.config('custom');

  it(`should show UIs correctly after initial loading`, () => {
    let posts: Array<{
      title: string;
      userId: number;
      id: number;
      body: string;
    }>;

    cy.waitForInitialUIRenderDone({
      url: customConfigs.components['test-postspage--base'],
      reqAfterCallback: (request, response) => {
        if (request.url.match(/api\/posts/)) {
          posts = [
            {
              userId: 1,
              id: 1,
              title: 'sunt aut facere repellat',
              body:
                'quia et suscipit\nsuscipit recusandae consequuntur expedita',
            },
            {
              userId: 1,
              id: 2,
              title: 'qui est',
              body: 'est rerum tempore vitae\nsequi',
            },
          ];
          response.text = posts;
        }
      },
      selectorToCheckUiRenderDone: ['.title', 'Welcome to Next.js!'],
    });

    cy.log(`**should show all posts**`).wait(customConfigs.logWaitTime);
    cy.get('[data-testid=post]').then($elements => {
      posts.forEach((post, index) => {
        expect($elements.eq(index).find('h2').text()).equal(post.title);
      });
    });
  });
});

export {};
