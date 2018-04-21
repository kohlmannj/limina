const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader")
      });
    config.plugins.push(new TSDocgenPlugin());
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
};
