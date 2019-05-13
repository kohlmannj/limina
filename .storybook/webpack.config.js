module.exports = ({ config }) => {
  config.module.rules.push(
    // {
    //   test: /\.stories\.tsx?$/,
    //   use: [
    //     {
    //       loader: '@storybook/addon-storysource/loader',
    //       options: {
    //         parser: 'typescript',
    //         prettierConfig: {
    //           bracketSpacing: true,
    //           printWidth: 100,
    //           singleQuote: true,
    //           tabWidth: 2,
    //           trailingComma: 'es5',
    //         },
    //       },
    //     },
    //   ],
    //   enforce: 'pre',
    // },
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            /** @see https://github.com/TypeStrong/ts-loader#projectreferences-boolean-defaultfalse */
            projectReferences: true,
            /** @see https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalse */
            transpileOnly: true,
          },
        },
        // Optional
        {
          loader: 'react-docgen-typescript-loader',
        },
      ],
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
