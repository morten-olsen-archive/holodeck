import Window from 'libs/ui/window';
import Desktop from 'libs/ui/desktop';

import Demo from 'components/demo';

const ready = require('libs/base/system').ready;
ready.then(() => {
  Desktop.addIcon('hello1', () => {
    Window.create().then((window) => {
      window.render(new Demo())
    });
  });

  Desktop.addIcon('hello2', () => {
    Window.create().then((window) => {
      window.render(new Demo())
    });
  });
});
