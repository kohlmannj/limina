module.exports = ({ config }) => {
  config.module.rules.push({
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
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
