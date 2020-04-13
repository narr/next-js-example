// https://babeljs.io/docs/en/configuration#babelconfigjson
module.exports = function (api) {
  api.cache(true);

  const plugins = [];
  if (process.env.CYPRESS_coverage) {
    plugins.push('istanbul');
  }
  return {
    presets: ['next/babel'],
    plugins,
  };
};
