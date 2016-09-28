const webpack = require('webpack');
const merge = require('lodash').merge;
const path = require('path');

const fields = {
  name: Symbol(),
  path: Symbol(),
  config: Symbol(),
  compiler: Symbol(),
  package: Symbol(),
};

class App {
  constructor(config) {
    this[fields.path] = path.dirname(config);
    this[fields.package] = require(path.join(this[fields.path], 'package.json'));
    this[fields.name] = this[fields.package].name;
    this[fields.config] = merge(require(config), {
      context: this[fields.path],
      output: {
        path: path.join(__dirname, '../../build/apps', this[fields.name]),
        filename: 'app.js',
      },
    });
    this[fields.compiler] = merge(webpack(this[fields.config]));
    this[fields.compiler].watch(200, (err, stats) => {
      if (err) {
        console.log(err);
      } else {
        console.log(stats.toString());
      }
    });
  }
}

module.exports = App;
