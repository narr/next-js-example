// https://babeljs.io/docs/en/configuration#babelconfigjson
module.exports = function (api) {
  api.cache(true);

  const plugins = [];
  if (process.env.COVERAGE) {
    plugins.push([
      'istanbul',
      {
        exclude: ['**/.storybook', '**/*.stories.*', '**/*.cspec.*'],
      },
    ]);
  }
  return {
    presets: [
      [
        'next/babel',
        {
          'preset-env': {
            targets: {
              browsers: ['last 2 Chrome versions'],
            },
          },
        },
      ],
    ],
    plugins,
  };
};
