import { get } from 'libs/base/request';
import Icon from './icon';

class Desktop {
  constructor() {
  }

  addIcon = (name, action) => Promise.resolve()
    .then(() => get('ui.desktop', {
      type: 'addIcon',
      name,
    }))
    .then((id) => {
      return new Icon(id, action);
    });

  render(body) {
    get('ui.desktop', {
      type: 'render',
      tree: body._render(undefined, undefined, 'desktop'),
    });
  }
}

export default new Desktop();
