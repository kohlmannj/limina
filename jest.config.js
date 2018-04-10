module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFiles: ['<rootDir>/scripts/babel-polyfill.js'],
  testMatch: ['**/__tests__/**/*.(j|t)s?(x)', '**/?(*.)(spec|test).(j|t)s?(x)'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
};
