class WindowManager {
  constructor(worker) {
    document.documentElement.addEventListener('click', (evt) => {
      if (evt.target.getAttribute('data-key')) {
        console.log(evt.target.getAttribute('data-key'));
        worker.postMessage({
          namespace: 'component.event',
          type: 'click',
          key: evt.target.getAttribute('data-key'),

        });
      }
    });
  }

  request(payload) {
    this[payload.type](payload);
  }

  _renderBranch(branch, parentNode) {
    let elm = document.querySelector(`*[data-key="${branch.key}"]`);

    if (!elm) {
      elm = document.createElement(branch.type);
      elm.setAttribute('data-key', branch.key);
    }

    if (branch.content) {
      elm.innerHTML = branch.content;
    }

    for (let i = 0; i < branch.children.length; i++) {
      const child = branch.children[i];
      elm.appendChild(this._renderBranch(child));
    }

    return elm;
  }

  render({ tree }) {
    const root = this._renderBranch(tree);
    document.body.appendChild(root);
  }
}

module.exports = WindowManager;
