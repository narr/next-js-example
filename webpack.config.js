module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
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
            options: {
              presets: [['react-app', { flow: false, typescript: true }]],
            },
          },
        ],
      },
    ],
  },
};
