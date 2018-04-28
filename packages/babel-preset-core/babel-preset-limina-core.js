/* eslint-env node */
const env = process.env.BABEL_ENV || process.env.NODE_ENV;

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'umd',
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
    ['@babel/preset-stage-1', { decoratorsLegacy: true }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    [
      'babel-plugin-emotion',
      env === 'production' ? { hoist: true } : { sourceMap: true, autoLabel: true },
    ],
  ],
});
