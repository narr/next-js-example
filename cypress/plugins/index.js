/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const coverageTask = require('@cypress/code-coverage/task');
const wp = require('@cypress/webpack-preprocessor');
const { initPlugin: snapshot } = require('cypress-plugin-snapshots/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  coverageTask(on, config);

  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.js', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
        ],
      },
    },
  };
  on('file:preprocessor', wp(options));

  // NOTE: https://github.com/cypress-io/cypress/issues/6540#issuecomment-641087834
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu');
      return launchOptions;
    }
  });

  snapshot(on, config);

  // NOTE: IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
};
