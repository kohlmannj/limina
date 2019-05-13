const testFiles = [
  '**/__{mocks,stubs,tests}__/**/*.{js,jsx,ts,tsx}',
  '**/*.spec.{js,jsx,ts,tsx}',
  '**/*.stories.{js,jsx,ts,tsx}',
  '**/*.test.{js,jsx,ts,tsx}',
  'jest.*.js',
  'rollup.config.js',
  'webpack.config.js',
];

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  env: { jest: true },
  plugins: ['jest', 'json', '@typescript-eslint', 'emotion'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error',
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: testFiles,
        peerDependencies: true,
        dependencies: testFiles,
      },
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: '*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
