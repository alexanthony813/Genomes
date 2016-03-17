var ManifestPlugin = require('webpack-manifest-plugin');
var webpack = require('Webpack');
module.exports = {
  entry: [
    "webpack-hot-middleware/client",
    "./client/entry.js"
  ],
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
    new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};