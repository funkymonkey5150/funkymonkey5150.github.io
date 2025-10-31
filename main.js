import apps from './components/apps/apps-registry.js';
import { createWindowManager } from './wm.js';
import { startMatrix } from './matrix.js';

const wm = createWindowManager(document.getElementById('wm-root'));
const shortcutsHost = document.getElementById('shortcuts');

apps.filter(a => a.desktop_shortcut).forEach(app => {
  const div = document.createElement('div');
  div.className = 'shortcut';
  const img = document.createElement('img');
  img.src = app.icon || './assets/app.svg';
  img.alt = app.title;
  div.appendChild(img);
  const label = document.createElement('div');
  label.textContent = app.title;
  div.appendChild(label);
  div.onclick = () => wm.open(app);
  shortcutsHost.appendChild(div);
});

// auto-open terminal
const terminal = apps.find(a => a.id === 'terminal');
if (terminal) wm.open(terminal);

startMatrix();
