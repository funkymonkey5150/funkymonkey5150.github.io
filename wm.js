export function createWindowManager(root){
  let z = 20;
  function makeDraggable(win){
    const header = win.querySelector('.window-header');
    let down = false, ox = 0, oy = 0;
    header.addEventListener('mousedown', e => {
      down = true;
      ox = e.clientX - win.offsetLeft;
      oy = e.clientY - win.offsetTop;
      win.style.zIndex = ++z;
    });
    document.addEventListener('mousemove', e => {
      if (!down) return;
      win.style.left = (e.clientX - ox) + 'px';
      win.style.top  = (e.clientY - oy) + 'px';
    });
    document.addEventListener('mouseup', () => down = false);
  }
  function open(app){
    const win = document.createElement('div');
    win.className = 'window';
    win.innerHTML = `
      <div class="window-header">
        <div class="window-title">${app.title}</div>
        <div class="window-actions">
          <button data-act="min">–</button>
          <button data-act="max">□</button>
          <button data-act="close">×</button>
        </div>
      </div>
      <div class="window-body"></div>
    `;
    const body = win.querySelector('.window-body');
    const view = app.screen ? app.screen() : document.createTextNode('No view');
    if (view instanceof Node) body.appendChild(view); else body.innerHTML = view;
    root.appendChild(win);
    win.style.zIndex = ++z;
    makeDraggable(win);

    win.querySelector('[data-act="close"]').onclick = () => win.remove();
    win.querySelector('[data-act="max"]').onclick = () => {
      const isMax = win.dataset.max === '1';
      if (isMax){
        win.style.top='120px';win.style.left='240px';win.style.width='540px';win.style.height='';
        win.dataset.max='0';
      } else {
        win.style.top='48px';win.style.left='0';win.style.width='100%';win.style.height='calc(100% - 50px)';
        win.dataset.max='1';
      }
    };
    win.querySelector('[data-act="min"]').onclick = () => { win.style.display='none'; };
  }
  return { open };
}
