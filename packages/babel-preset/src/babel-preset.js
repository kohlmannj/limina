const presetTypescript = require('@babel/preset-typescript');
const presetStage2 = require('@babel/preset-stage-2');
const presetEnv = require('@babel/preset-env');

module.exports = () => ({
  presets: [
    [presetEnv, { targets: 'last two versions' }],
    presetStage2,
    presetTypescript,
  ],
});
