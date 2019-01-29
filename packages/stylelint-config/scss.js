const base = require('./base');

module.exports = {
  ...base,
  plugins: ['stylelint-scss'],
  rules: {
    ...base.rules,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
