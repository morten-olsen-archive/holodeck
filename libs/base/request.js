const waiting = {};
let currentId = 1;

addEventListener('message', ({data}) => {
  if (data.seqId) {
    const item = waiting[data.seqId];
    if (item) {
      if (data.status === 'success') {
        item.resolve(data.payload);
      } else {
        item.reject(data.payload);
      }
      delete waiting[data.seqId]
    }
  } else {

  }
});

export const get = (namespace, payload) => new Promise((resolve, reject) => {
  const seqId = currentId++;
  postMessage({
    namespace,
    payload,
    seqId,
  });
  waiting[seqId] = {
    resolve,
    reject,
  };
});
