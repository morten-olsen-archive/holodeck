const glob = require('glob');
const path = require('path');
const App = require('./app');

const dir = path.join(__dirname, '../../apps/*/webpack.config.js');
const appDirs = glob.sync(dir);
const apps = appDirs.map(ad => new App(ad));

module.exports = apps;
