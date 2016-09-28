let setReady = null;

exports.ready = new Promise((resolve) => {
  addEventListener('message', ({data}) => {
    if (data.namespace === 'system.ready') {
      resolve();
    }
  });
});
