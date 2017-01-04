class WindowManager {
  constructor(worker) {
    this.worker = worker;

    this.elm = document.createElement('div');

    this._boundMove = this.move.bind(this);
    this._boundEndMove = this.endMove.bind(this);
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

    Object.keys(branch.props).forEach(key => {
      if (branch.props[key] && elm.getAttribute(key) !== branch.props[key]) {
          elm.setAttribute(key, branch.props[key]);
      }
    });

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

  startMove(e) {
    document.body.style.userSelect = 'none';
    this.mouseStart = {
      x: e.screenX,
      y: e.screenY,
    };
    this.elmStart = {
      x: this.elm.offsetLeft,
      y: this.elm.offsetTop,
    };
    document.documentElement.addEventListener('mousemove', this._boundMove);
    document.documentElement.addEventListener('mouseup', this._boundEndMove);
    document.body.append(this.elm);
  }

  move(e) {
    const x = this.elmStart.x + (e.screenX - this.mouseStart.x);
    const y = this.elmStart.y + (e.screenY - this.mouseStart.y);
    this.elm.style.left = `${x}px`;
    this.elm.style.top = `${y}px`;
  }

  endMove() {
    document.body.style.userSelect = 'inherit';
    document.documentElement.removeEventListener('mousemove', this._boundMove);
  }

  render(tree, addChrome) {
    const root = this._renderBranch(tree);
    if (!this.root) {

      if (addChrome) {
        this.elm.className = 'window';
        this.elm.innerHTML = `
          <div class="title">
            title
          </div>
          <div class="content">
          </div>
        `;
        this.title = this.elm.querySelector('.title');
        this.title.addEventListener('mousedown', this.startMove.bind(this));
        this.root = this.elm.querySelector('.content').createShadowRoot();
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
      } else {
        this.root = this.elm.createShadowRoot();
        this.root.appendChild(root);
        return this.elm;
      }
    }
  }
}

module.exports = WindowManager;
