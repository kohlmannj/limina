/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

function getCommand(watch) {
  const tsc = path.join(__dirname, '..', 'node_modules', '.bin', 'tsc');

  const args = ['-p tsconfig.dts.json', '--outDir ./lib'];

  if (watch) {
    args.push('-w');
  }

  const command = `${tsc} ${args.join(' ')}`;
  console.log(command);
  return command;
}

function handleExit(code, errorCallback) {
  if (code !== 0) {
    if (errorCallback && typeof errorCallback === 'function') {
      errorCallback();
    }

    shell.exit(code);
  }
}

function tscfy(options = {}) {
  const { watch = false, silent = true, errorCallback } = options;
  const tsConfigFile = 'tsconfig.json';
  const tsDtsConfigFile = 'tsconfig.dts.json';

  if (!fs.existsSync(tsConfigFile)) {
    if (!silent) console.log(`No ${tsConfigFile}`);
    return;
  }

  if (!fs.existsSync(tsDtsConfigFile)) {
    if (!silent) console.log(`No ${tsDtsConfigFile}`);
    return;
  }

  const content = fs.readFileSync(tsConfigFile);
  const tsConfig = JSON.parse(content);

  if (tsConfig && tsConfig.lerna && tsConfig.lerna.disabled === true) {
    if (!silent) console.log('Lerna disabled');
    return;
  }

  const command = getCommand(watch);
  const { code } = shell.exec(command, { silent });

  handleExit(code, errorCallback);
}

module.exports = {
  tscfy,
};