const presetTypescript = require('@babel/preset-typescript');
const presetStage1 = require('@babel/preset-stage-1');
const presetEnv = require('@babel/preset-env');

module.exports = () => ({
  presets: [[presetEnv, { targets: 'last two versions' }], presetStage1, presetTypescript],
});
