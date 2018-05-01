/* eslint-env node */
module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx,ts,tsx}',
    '!**/__stubs__/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/test-file-mock.ts',
    '@storybook/addon-knobs': '<rootDir>/__mocks__/storybook-addon-knobs.ts',
    '@storybook/react': '<rootDir>/__mocks__/storybook-react.ts',
  },
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest.setup.js',
  testMatch: ['**/__tests__/**/*.(j|t)s?(x)', '**/?(*.)(spec|test|story|stories).(j|t)s?(x)'],
  testPathIgnorePatterns: ['__old__', '/node_modules/'],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
    '^.+\\.md?$': 'markdown-loader-jest',
  },
};
