const path = require('path');
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: { extends: path.join(__dirname, '.babelrc')}
      });
    config.plugins.push(new TSDocgenPlugin());
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
};
