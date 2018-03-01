const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpack = require("webpack");
const BomPlugin = require('webpack-utf8-bom');

module.exports = env => {
  return {
    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loader: 'url-loader'
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
        }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(
        {
          clearConsole: env === "development"
        }
      ),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new BomPlugin(false)
    ]
  };
};
