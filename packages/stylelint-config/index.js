module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-idiomatic-order',
    'stylelint-config-standard',
    'stylelint-config-styled-components',
  ],
  rules: {
    indentation: 2,
    'order/properties-alphabetical-order': null,
    'selector-max-compound-selectors': 4,
    'value-list-max-empty-lines': null,
  },
};
