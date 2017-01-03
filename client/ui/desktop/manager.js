const uuid = require('uuid');

class DesktopManager {
  constructor(worker) {
    this.worker = worker;
  }

  request(payload) {
    return this[payload.type](payload);
  }

  addIcon({ name }) {
    const id = uuid.v4();

    const icon = document.createElement('div');
    icon.innerHTML = name;
    document.body.append(icon);
    icon.addEventListener('click', () => {
      this.worker.postMessage({
        namespace: 'ui.desktop.icon',
        type: 'click',
        id,
      });
    });

    return id;
  }
}

module.exports = DesktopManager;
