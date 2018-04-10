module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  setupFiles: [
    '<rootDir>/utils/babel-polyfill.js'
  ]
}
