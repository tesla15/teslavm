const gui = require('nw.gui');
const { platform } = require('process');
const win = gui.Window.get();

win.onRestore.addListener(() => { maximized=false; });

const titlebar = new Titlebar({
  backgroundColor: '#FFFFFF',
  platform: platform,
  height: 30,
  maximizable: false,
  onMinimize: () => win.minimize(),
  onClose: () => win.close(),
});