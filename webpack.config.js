/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: appPath,

  target: !isProd ? 'web' : 'browserslist',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',

  output: {
    filename: 'bundle.js',
    path: buildPath,
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      components: path.join(appPath, 'components'),
      config: path.join(appPath, 'config'),
      styles: path.join(appPath, 'styles'),
      utils: path.join(appPath, 'utils'),
      store: path.join(appPath, 'store'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              debug: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
};
