const path = require('path');

module.exports = {
  entry: './public/sw.js',
  output: {
    filename: 'sw.js',
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'production',
  target: 'webworker',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
