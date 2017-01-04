import { get } from 'libs/base/request';

const fields = {
  options: Symbol(),
};

class Window {
  constructor(id) {
    this[fields.options] = {
      id,
    };
  }

  show = () => Promise.resolve()
    .then(() => Request.get('ui.window', {
      id: this[fields.options].id,
      type: 'show',
    }))
    .then((response) => {
      return this;
    });

  render(body) {
    get('ui.window', {
      type: 'render',
      id: this[fields.options].id,
      tree: body._render(undefined, undefined, this[fields.options].id),
    });
  }
}

Window.create = () => Promise.resolve()
  .then(() => get('ui.window', {
    type: 'create',
  }))
  .then((id) => {
    return new Window(id);
  });

export default Window;
