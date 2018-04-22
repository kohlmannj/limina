/* eslint-env node */
const presetTypescript = require('@babel/preset-typescript');
const presetStage1 = require('@babel/preset-stage-1');
const presetEnv = require('@babel/preset-env');
const emotionPlugin = require('babel-plugin-emotion');

const env = process.env.BABEL_ENV || process.env.NODE_ENV;

module.exports = () => ({
  presets: [
    [
      presetEnv,
      {
        modules: 'umd',
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
    presetStage1,
    presetTypescript,
  ],
  plugins: [
    [emotionPlugin, env === 'production' ? { hoist: true } : { sourceMap: true, autoLabel: true }],
  ],
});
