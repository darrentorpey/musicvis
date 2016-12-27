'use strict';

const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].bundle.js',
  },
  module: {
    // loaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /(node_modules|bower_components)/,
    //     loader: 'babel-loader',
    //     query: {
    //       presets: ['es2015-webpack']
    //     }
    //   }
    // ]
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }],
      },

      // Loaders for other file types can go here
    ],
  },
  watch: true
};
