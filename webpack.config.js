var ManifestPlugin = require('webpack-manifest-plugin');
var webpack = require('Webpack');
module.exports = {
  entry: "./client/entry.js",
  output: {
    path: __dirname + '/server/static/scripts',
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      }
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};