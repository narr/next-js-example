const webpackConfig = require('./webpack.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackConfig.resolve.alias,
    };
    return config;
  },
});
