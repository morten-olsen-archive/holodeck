import { get } from 'libs/base/request';

const fields = {
  options: Symbol(),
};

class Window {
  constructor(options) {
    this[fields.options] = options;
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
      tree: body._render(),
    });
  }

  body() {}
}

Window.create = () => Promise.resolve()
  /*.then(() => Request.get({
    namespace: 'ui.window',
    type: 'create',
  }))*/
  .then((response) => {
    return new Window(response);
  });

export default Window;
