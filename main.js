// -------- MATRIX RAIN --------
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01ABCDEFGHIJKLMNPQRSTUVWXYZ#$%&@";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff7f";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}
drawMatrix();

// -------- DESKTOP MODEL --------
const shortcutsRoot = document.getElementById("shortcuts");
const wmRoot = document.getElementById("wm-root");
const taskItemsRoot = document.getElementById("task-items");
const clockEl = document.getElementById("clock");
const sysStatusEl = document.getElementById("sys-status");

const shortcutsData = [
  {
    id: "ai-tools-window",
    label: "AI Tools",
    icon: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
  {
    id: "security-window",
    label: "Security",
    icon: "https://cdn-icons-png.flaticon.com/512/483/483408.png",
  },
  {
    id: "content-window",
    label: "Content",
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827312.png",
  },
  {
    id: "system-window",
    label: "Monitor",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  },
];

const windowsData = [
  {
    id: "ai-tools-window",
    title: "AI Automation & Tools Hub",
    content: `
      <p><strong>AI Automation & Tools — Hacktivate Labs</strong></p>
      <p>This hub is for AI tools that save time, ship content faster, and automate workflows.</p>
      <ul>
        <li>⚙ Workflow & business automation (CRM, outreach, content ops)</li>
        <li>🎨 AI art / video / content generation</li>
        <li>🔐 Cyber / OSINT helpers & detectors</li>
        <li>📊 Planning, research & strategy tools</li>
      </ul>
      <p>Use this as your link panel to playlists, docs, and tool stacks.</p>
      <button class="btn" onclick="window.open('https://www.youtube.com','_blank')">
        Open AI Tools Playlist
      </button>
    `,
    x: 260,
    y: 120,
    visible: true,
  },
  {
    id: "security-window",
    title: "Security Console / Labs",
    content: `
      <p><strong>Network Security & Lab Ideas</strong></p>
      <p>Capture incident response flows, OSINT workflows, detection ideas, and lab concepts.</p>
      <ul>
        <li>📡 Engagement / scenario notes</li>
        <li>🕵 OSINT + AI investigation flows</li>
        <li>🛡 Detection engineering & blue team ideas</li>
      </ul>
      <textarea rows="7" style="width:100%;" placeholder="Draft playbooks, commands, or lab scenarios here..."></textarea>
    `,
    x: 120,
    y: 170,
    visible: false,
  },
  {
    id: "content-window",
    title: "Content / Hooks / Offers",
    content: `
      <p><strong>Creator / Brand Notes</strong></p>
      <p>Dump hooks, offers, TikTok scripts, YouTube titles, and LinkedIn post ideas.</p>
      <textarea rows="10" style="width:100%;" placeholder="Hooks, content frameworks, call-to-actions, brand ideas..."></textarea>
      <button class="btn" onclick="alert('This is where you’d wire in AI to refine content.');">
        Send to AI for Rewrite
      </button>
    `,
    x: 340,
    y: 210,
    visible: false,
  },
  {
    id: "system-window",
    title: "System Monitor",
    content: `
      <p><strong>Hacktivate OS — System Monitor</strong></p>
      <div class="sys-grid">
        <div class="sys-card">
          <div>CPU Usage</div>
          <div id="cpu-val">14%</div>
        </div>
        <div class="sys-card">
          <div>Memory</div>
          <div id="mem-val">42%</div>
        </div>
        <div class="sys-card">
          <div>Network</div>
          <div id="net-val">OK · 23ms</div>
        </div>
        <div class="sys-card">
          <div>Sessions</div>
          <div id="sess-val">3 active</div>
        </div>
      </div>
      <div class="sys-meta">
        <p>Fake metrics for vibe only — imagine this wired to real logs, uptime, and security signals.</p>
      </div>
    `,
    x: 520,
    y: 150,
    visible: false,
  },
];

const windowState = {};
windowsData.forEach(w => {
  windowState[w.id] = { visible: !!w.visible };
});

// -------- RENDER SHORTCUTS --------
function renderShortcuts() {
  shortcutsRoot.innerHTML = "";
  shortcutsData.forEach(sc => {
    const div = document.createElement("div");
    div.className = "shortcut";
    div.dataset.open = sc.id;
    div.innerHTML = `
      <img src="${sc.icon}" alt="${sc.label}">
      ${sc.label}
    `;
    shortcutsRoot.appendChild(div);
  });
}

// -------- RENDER WINDOWS --------
function renderWindows() {
  wmRoot.innerHTML = "";
  windowsData.forEach(win => {
    const el = document.createElement("section");
    el.className = "window";
    el.id = win.id;
    el.style.left = win.x + "px";
    el.style.top = win.y + "px";
    if (windowState[win.id].visible) {
      el.classList.add("visible");
    }

    el.innerHTML = `
      <header class="window-header">
        <span class="window-title">${win.title}</span>
        <div class="window-actions">
          <button class="minimize" data-min="${win.id}" title="Minimize">–</button>
          <button class="close" data-close="${win.id}" title="Close">✕</button>
        </div>
      </header>
      <div class="window-body">
        ${win.content}
      </div>
    `;
    wmRoot.appendChild(el);
    makeWindowDraggable(el);
  });
}

// -------- DRAGGABLE WINDOWS --------
function makeWindowDraggable(winEl) {
  const header = winEl.querySelector(".window-header");
  let isDown = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", e => {
    isDown = true;
    const rect = winEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    winEl.style.zIndex = String(Date.now());
  });

  document.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    const maxX = window.innerWidth - winEl.offsetWidth;
    const maxY = window.innerHeight - winEl.offsetHeight - 34; // above taskbar

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(46, Math.min(y, maxY));

    winEl.style.left = x + "px";
    winEl.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
  });
}

// -------- TASKBAR --------
function renderTaskbar() {
  taskItemsRoot.innerHTML = "";
  windowsData.forEach(win => {
    const item = document.createElement("button");
    item.className = "task-item";
    if (windowState[win.id].visible) {
      item.classList.add("active");
    }
    item.dataset.toggle = win.id;
    item.textContent = win.title;
    taskItemsRoot.appendChild(item);
  });
}

// -------- INTERACTIONS --------
function wireInteractions() {
  // Shortcuts open window
  shortcutsRoot.addEventListener("click", e => {
    const sc = e.target.closest(".shortcut");
    if (!sc) return;
    const id = sc.dataset.open;
    toggleWindow(id, true);
  });

  // Window close / minimize
  wmRoot.addEventListener("click", e => {
    const closeBtn = e.target.closest("button[data-close]");
    if (closeBtn) {
      const id = closeBtn.dataset.close;
      toggleWindow(id, false);
      return;
    }
    const minBtn = e.target.closest("button[data-min]");
    if (minBtn) {
      const id = minBtn.dataset.min;
      minimizeWindow(id);
    }
  });

  // Taskbar toggles
  taskItemsRoot.addEventListener("click", e => {
    const target = e.target.closest(".task-item");
    if (!target) return;
    const id = target.dataset.toggle;
    const currentlyVisible = windowState[id].visible;
    toggleWindow(id, !currentlyVisible);
  });
}

function toggleWindow(id, show) {
  const winEl = document.getElementById(id);
  if (!winEl) return;
  if (show) {
    winEl.classList.add("visible");
    winEl.style.zIndex = String(Date.now());
    windowState[id].visible = true;
  } else {
    winEl.classList.remove("visible");
    windowState[id].visible = false;
  }
  renderTaskbar();
}

function minimizeWindow(id) {
  const winEl = document.getElementById(id);
  if (!winEl) return;
  winEl.classList.remove("visible");
  windowState[id].visible = false;
  renderTaskbar();
}

// -------- CLOCK + FAKE SYSTEM STATS --------
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  clockEl.textContent = `${hh}:${mm}`;
}
setInterval(updateClock, 1000);
updateClock();

function updateSysStats() {
  const cpu = (8 + Math.random() * 30).toFixed(0);
  const mem = (30 + Math.random() * 40).toFixed(0);
  const net = (10 + Math.random() * 40).toFixed(0);
  const sess = (1 + Math.random() * 4).toFixed(0);

  sysStatusEl.textContent = `NET: ${net}ms · CPU: ${cpu}%`;

  const cpuEl = document.getElementById("cpu-val");
  const memEl = document.getElementById("mem-val");
  const netEl = document.getElementById("net-val");
  const sessEl = document.getElementById("sess-val");
  if (cpuEl) cpuEl.textContent = `${cpu}%`;
  if (memEl) memEl.textContent = `${mem}%`;
  if (netEl) netEl.textContent = `OK · ${net}ms`;
  if (sessEl) sessEl.textContent = `${sess} active`;
}
setInterval(updateSysStats, 2000);
updateSysStats();

// -------- INIT --------
renderShortcuts();
renderWindows();
renderTaskbar();
wireInteractions();
