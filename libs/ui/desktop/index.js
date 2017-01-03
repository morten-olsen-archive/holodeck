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
}

export default new Desktop();
