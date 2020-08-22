import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import 'loki/configure-react';
// NOTE: can add a global CSS

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  Story => (
    // https://github.com/vercel/next.js/issues/15543#issuecomment-664955766
    <RouterContext.Provider
      value={{
        prefetch: () => {
          return Promise.resolve();
        },
        push: () => {
          return Promise.resolve();
        },
        replace: () => {
          return Promise.resolve();
        },
      }}
    >
      <Story />
    </RouterContext.Provider>
  ),
];
