const uuid = require('uuid');
require('./desktop.less');

const Window = require('../window');

class DesktopManager {
  constructor(worker) {
    this.worker = worker;
    this.window = new Window();
    this.window.elm.className = 'background';
    this.elm = document.createElement('div');
    this.elm.className = 'shell';

    this.desktop = document.createElement('div');
    this.desktop.className = 'desktop';
    document.body.appendChild(this.elm);

    this.desktop.appendChild(this.window.elm);


    this.icons = document.createElement('div');
    this.icons.className = 'icons';
    this.desktop.appendChild(this.icons);

    this.elm.appendChild(this.desktop);
  }

  request(payload) {
    return this[payload.type](payload);
  }

  addIcon({ name }) {
    const id = uuid.v4();

    const icon = document.createElement('div');
    icon.innerHTML = name;
    this.icons.appendChild(icon);
    icon.addEventListener('click', () => {
      this.worker.postMessage({
        namespace: 'ui.desktop.icon',
        type: 'click',
        id,
      });
    });

    return id;
  }

  render({ tree }) {
    this.window.render(tree)
  }
}

module.exports = DesktopManager;
