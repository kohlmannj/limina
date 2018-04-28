const path = require('path');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: { extends: path.join(__dirname, '.babelrc') },
      },
      { loader: 'react-docgen-typescript-loader' },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
