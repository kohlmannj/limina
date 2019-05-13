const { defaults } = require('jest-config');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  cacheDirectory: '<rootDir>/.jest_cache',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!**/__stubs__/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/test-file-mock.js',
    '@storybook/addon-knobs': '<rootDir>/__mocks__/storybook-addon-knobs.js',
    '@storybook/react': '<rootDir>/__mocks__/storybook-react.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec|stories))\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  transform: {
    ...tsjPreset.transform,
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
