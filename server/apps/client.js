const webpack = require('webpack');
const path = require('path');
const config = require(path.join(__dirname, '../../client/webpack.config'));
const merge = require('lodash').merge;

const webpackConfig = merge(config, {
  context: path.join(__dirname, '../../client'),
  output: {
    path: path.join(__dirname, '../../build/client'),
    filename: 'client.js',
  },
});

const compiler = webpack(webpackConfig);

compiler.watch(200, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString());
  }
})
