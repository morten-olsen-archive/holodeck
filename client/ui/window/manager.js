require('./window.less');
const uuid = require('uuid');
const Window = require('./index');

class WindowManager {
  constructor(worker) {
    this.worker = worker;
    this.windows = {};
  }

  request(payload) {
    return this[payload.type](payload);
  }

  create() {
    const id = uuid.v4();
    this.windows[id] = new Window(this.worker);
    return id;
  }

  render({ id, tree }) {
    this.windows[id].render(tree, true);
  }
}

module.exports = WindowManager;
