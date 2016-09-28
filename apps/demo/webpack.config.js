const path = require('path');

module.exports = {
  name: 'demo',
  entry: './app.js',
  devtool: 'inline-source-map',
  resolve: {
    root: __dirname,
    alias: {
      libs: path.join(__dirname, '../../libs')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  }
};
