const WindowManager = require('../ui/window/manager');
const DesktopManager = require('../ui/desktop/manager');

const fields = {
  worker: Symbol(),
  namespaces: Symbol(),
};

class App {
  constructor(worker) {
    worker.onmessage = this.handleMessage.bind(this);

    this[fields.worker] = worker;
    this[fields.namespaces] = {
      'ui.window': new WindowManager(worker),
      'ui.desktop': new DesktopManager(worker),
    };

    worker.postMessage({
      namespace: 'system.ready',
      payload: {
      },
    });
  }

  handleMessage({ data }) {
    if (this[fields.namespaces][data.namespace]) {
      try {
        const response = this[fields.namespaces][data.namespace].request(data.payload);
        this[fields.worker].postMessage({
          namespace: data.namespace,
          seqId: data.seqId,
          payload: response,
          status: 'success',
        });
      } catch (err) {
        this[fields.worker].postMessage({
          namespace: data.namespace,
          seqId: data.seqId,
          status: 'failed',
        });
        console.error(err);
      }
    } else {
      this[fields.worker].postMessage({
        namespace: 'error.namespaceNotFound',
        seqId: data.seqId,
        status: 'failed',
      });
    }
  }
}

module.exports = App;
