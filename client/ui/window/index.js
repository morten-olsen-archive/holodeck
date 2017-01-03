class WindowManager {
  constructor(worker) {
    this.worker = worker;
  }

  request(payload) {
    this[payload.type](payload);
  }

  _renderBranch(branch, parentNode) {
    let elm = this.root && this.root.querySelector(`*[data-key="${branch.key}"]`);

    if (!elm) {
      elm = document.createElement(branch.type);
      elm.setAttribute('data-key', branch.key);
    }

    if (branch.content && elm.innerHTML !== branch.content) {
      elm.innerHTML = branch.content;
    }

    if (elm.className !== branch.className) {
      elm.className = branch.className || '';
    }

    for (let i = 0; i < branch.children.length; i++) {
      const child = branch.children[i];
      const childElm = this._renderBranch(child);
      if (!elm.contains(childElm)) {
        elm.appendChild(childElm);
      }
    }

    const children = elm.children;
    if (children.length !== branch.children.length) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const keys = branch.children.map(c => c.key);
        if (!keys.includes(child.getAttribute('data-key'))) {
          child.remove();
        }
      }
    }

    return elm;
  }

  render(tree) {
    const root = this._renderBranch(tree);
    if (!this.root) {
      this.elm = document.createElement('div');
      this.root = this.elm.createShadowRoot();
      document.body.appendChild(this.elm);
      this.root.appendChild(root);
      this.root.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('data-key')) {
          this.worker.postMessage({
            namespace: 'component.event',
            type: 'click',
            key: evt.target.getAttribute('data-key'),
          });
        }
      });
    }
  }
}

module.exports = WindowManager;
