const webpackConfig = require('../webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async baseConfig => {
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      ...webpackConfig.resolve.alias,
    };
    return baseConfig;
  },
};
