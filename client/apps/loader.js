const App = require('./app');

module.exports = (name) => new Promise(resolve => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    blob = new Blob([xhr.responseText], {type: 'application/javascript'});
    const worker = new Worker(URL.createObjectURL(blob));
    const app = new App(worker);
    resolve(app);
  }
  xhr.open('GET', `/apps/${name}/app.js`, true);
  xhr.send();
});
