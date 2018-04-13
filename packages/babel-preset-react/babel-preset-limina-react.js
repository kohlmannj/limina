/* eslint-env node */
const presetLimina = require('babel-preset-limina');
const presetReact = require('@babel/preset-react');

module.exports = () => ({
  presets: [presetLimina, presetReact],
});
