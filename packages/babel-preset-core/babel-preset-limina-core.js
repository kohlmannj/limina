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
    '@babel/preset-typescript',
    ['@babel/preset-stage-2', { decoratorsLegacy: true }],
  ],
  plugins: [
    [
      'babel-plugin-emotion',
      env === 'production' ? { hoist: true } : { sourceMap: true, autoLabel: true },
    ],
  ],
});
