module.exports = {
  entry: './client.js',
  resolve: {
    root: __dirname,
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    }]
  }
};
