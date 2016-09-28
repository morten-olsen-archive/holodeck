import Window from 'libs/ui/window';
import Demo from 'components/demo';
const ready = require('libs/base/system').ready;
ready.then(() => {
  Window.create().then((window) => {
    window.render(new Demo())
  });
});
