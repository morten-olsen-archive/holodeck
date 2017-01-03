const fields = {
  id: Symbol(),
  action: Symbol(),
};

class Icon {
  constructor(id, action) {
    this[fields.id] = id;
    this[fields.action] = action;

    addEventListener('message', ({data}) => {
      if (data.namespace === 'ui.desktop.icon' && data.type === 'click' && data.id === id) {
        action();
      }
    });
  }
}

export default Icon;
