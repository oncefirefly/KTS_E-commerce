/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

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
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
  ].filter(Boolean),

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@components': path.join(appPath, '/components'),
      '@config': path.join(appPath, '/config/'),
      '@styles': path.join(appPath, '/styles/'),
      '@utils': path.join(appPath, '/utils'),
      '@store': path.join(appPath, '/store'),
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
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
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
