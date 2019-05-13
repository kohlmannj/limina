module.exports = {
  extends: [
    'stylelint-config-idiomatic-order',
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'declaration-empty-line-before': null,
    'declaration-block-semicolon-newline-after': null,
    'declaration-colon-newline-after': null,
    indentation: 2,
    'order/properties-alphabetical-order': null,
    'selector-max-compound-selectors': 4,
    'value-list-max-empty-lines': null,
  },
};
