/* eslint-env node */
module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest.setup.js',
  testMatch: ['**/__tests__/**/*.(j|t)s?(x)', '**/?(*.)(spec|test).(j|t)s?(x)'],
  testPathIgnorePatterns: ['__old__', '/node_modules/'],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
};
