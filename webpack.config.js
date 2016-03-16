var ManifestPlugin = require('webpack-manifest-plugin')
var webpack = require('webpack');
​
module.exports = {
  entry: "./client/entry",
  output: {
    path: __dirname + '/public',
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