const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');
const appVersion = require('./package.json').version;
const languages = require('./app/i18n/languages.json');

const staticFolder = path.resolve(__dirname, 'assets');
const momentFilter = languages.map(lang => lang.iso).join('|');

module.exports = {
  entry: [
    './app/index.jsx'
  ],
  output: {
    path: staticFolder,
    publicPath: '/assets/',
    filename: `app.${appVersion}.js`
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve('./app'),
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /(\.jsx|\.js)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.svg$/, loader: 'url-loader?limit=10' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpeg' },
      {
        test: /(\.scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            {
              loader: 'sass-loader?sourceMap',
              options: {
                data: `@import "${path.resolve(__dirname, 'app/theme.scss')}";`
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(momentFilter)),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      template: 'content/index-prod.html',
      inject: true,
      appVersion
    }),
    new ExtractTextPlugin({ filename: `style.${appVersion}.css`, allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __USE_GA__: config.GA_Enabled,
      __GA_ID__: `'${config.GA_Tracking_ID}'`
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
