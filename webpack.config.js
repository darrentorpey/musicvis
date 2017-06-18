const path = require('path');
const webpack = require('webpack');
const basePath = path.join(__dirname, 'src');

module.exports = {
  context: basePath,
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [
      basePath,
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  'chrome': 59
                },
              }]
            ],
          }
        }],
      },

      // Loaders for other file types can go here
    ],
  },
  watch: true
};
