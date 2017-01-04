import { get } from 'libs/base/request';
import uuid from 'uuid';

const domNodes = {};

const fields = {
  domKey: Symbol(),
  content: Symbol(),
  type: Symbol(),
  render: Symbol(),
  prevResponse: Symbol(),
};

class Component {
  constructor(props) {
    this[fields.domKey] = uuid.v4();
    this.state = {};
    this.props = props;
    this[fields.prevResponse] = [];
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState);
    if (!this.shouldComponentUpdate || this.shouldComponentUpdate()) {
      if (this.windowId === 'desktop') {
        get('ui.desktop', {
          type: 'render',
          root: this.domKey,
          tree: this._render(undefined, undefined, 'desktop'),
        });
      } else {
        get('ui.window', {
          type: 'render',
          root: this.domKey,
          id: this.windowId,
          tree: this._render(undefined, undefined, this.windowId),
        });
      }
    }
  }

  get domKey() {
    return this[fields.domKey];
  }

  _setProps(props) {
    this.props = props;
  }

  _render(parent, index, windowId) {
    const output = this.render();
    this[fields.type] = output.type;
    this[fields.props] = output.fields;
    const className = output.className;

    if (output.children) {
      output.children.forEach((c, i) => {
        if (
          !this[fields.prevResponse][i]
          || this[fields.prevResponse][i].type !== c.type
        ) {
          this[fields.prevResponse][i] = {
            type: c.type,
          };
          if (typeof c.type === 'string') {
            this[fields.prevResponse][i].instance = new DOMNode(c.type, c.props);
          } else {
            this[fields.prevResponse][i].instance = new c.type(c.props);
            this.windowId = windowId;
          }
        } else {
          this[fields.prevResponse][i].instance._setProps(c.props);
        }
      });
      this[fields.prevResponse] = this[fields.prevResponse]
        .splice(0, output.children.length);

    }

    return {
      type: this[fields.type],
      key: this.domKey,
      className: className,
      props: output.props,
      content: output.content,
      children: this[fields.prevResponse].map((c, i) => c.instance._render(this, i, windowId)),
    }
  }
}

addEventListener('message', ({data}) => {
  if (data.namespace === 'component.event') {
    const elm = domNodes[data.key];
    if (elm) {
      elm._handleEvent(data.type, data.evt);
    }
  }
});

class DOMNode extends Component {
  constructor(type, props) {
    super(props);
    this[fields.type] = type;
    domNodes[this.domKey] = this;
  }

  _handleEvent(type, evt) {
    if (this.props['on' + type]) {
      this.props['on' + type](evt);
    }
  }

  render() {
    const { content, ...props } = this.props;
    if(this)
    return {
      type: this[fields.type],
      content,
      props: JSON.parse(JSON.stringify(props)),
    };
  }
}

export default Component;
