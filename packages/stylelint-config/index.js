module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-styled-components',
  ],
  rules: {
    'declaration-colon-space-after': null,
    'declaration-empty-line-before': 'never',
    'order/properties-alphabetical-order': null,
    'selector-max-compound-selectors': 4,
    indentation: 2,
  },
};
