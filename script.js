// MATRIX RAIN
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);
const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789HACKTIVATE';
const fontSize = 14;
let drops = [];
function initDrops() {
  drops = new Array(Math.floor(canvas.width / fontSize)).fill(1);
}
initDrops();
function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.09)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#00ff7f';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 45);

// TERMINAL + SPA ROUTER
const cmdInput = document.getElementById('cmdline');
const output = document.getElementById('output');
const consoleDiv = document.getElementById('console');
const navButtons = document.querySelectorAll('.nav button');
const panels = document.querySelectorAll('.panel');

const commands = {
  help: `Available commands:
  help        Show this help
  about       Open About panel
  projects    Open Projects panel
  contact     Open Contact panel
  download    Download README
  clear       Clear terminal
  launch      Simulate system launch`,
  about: `HACKTIVATE LABS — founder: Steve Plasencia.
AI + Automation + Web3 + Offensive Security.
Aliases: FunkyMonkey5150, Dappster, Crypto Head Hunter.`,
  projects: `Projects:
  - Rocket Rabbit AI — AI SaaS engine
  - The Staffing DAO — Web3 staffing
  - HACKTIVATE Tools — NetMapper, FuzzForge, TokenWatch, AI ReconX
  - Hardware: Pwnagotchi / Flipper Zero / ESP32`,
  contact: `Contact:
  Email: info@stevesjobbs.com
  Alt:   hacktivate5150@gmail.com
  Phone: 323-396-0096
  WhatsApp: 213-301-6016`
};

function printLine(text) {
  const d = document.createElement('div');
  d.textContent = text;
  output.appendChild(d);
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}
function activatePanel(id) {
  panels.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  navButtons.forEach(b => b.classList.remove('active'));
  const btn = document.querySelector('.nav button[data-target="'+id+'"]');
  if (btn) btn.classList.add('active');
}
function triggerDownload() {
  const content = `# HACKTIVATE\n\nSteve Plasencia — HACKTIVATE LABS\nAI • Security • Automation`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'HACKTIVATE_README.md';
  a.click();
}
function simulateLaunch() {
  printLine('Initializing HACKTIVATE systems...');
  setTimeout(() => printLine('Loading AI agents...'), 700);
  setTimeout(() => printLine('Provisioning secure automation nodes...'), 1350);
  setTimeout(() => printLine('Deploying staffing / Web3 modules...'), 2000);
  setTimeout(() => printLine('✅ All systems online. Welcome, Steve.'), 2600);
}
function runCommand(cmd) {
  cmd = cmd.trim();
  if (!cmd) return;
  printLine('$ ' + cmd);
  if (cmd === 'clear') {
    output.innerHTML = '';
    return;
  }
  if (cmd === 'about' || cmd === 'projects' || cmd === 'contact' || cmd === 'download') {
    activatePanel(cmd);
  }
  if (commands[cmd]) {
    printLine(commands[cmd]);
    if (cmd === 'download') triggerDownload();
  } else if (cmd === 'launch') {
    simulateLaunch();
  } else if (!(cmd === 'about' || cmd === 'projects' || cmd === 'contact')) {
    printLine('Command not found: ' + cmd);
  }
}
cmdInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    runCommand(cmdInput.value);
    cmdInput.value = '';
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const val = cmdInput.value;
    const opts = ['help','about','projects','contact','download','clear','launch'];
    const match = opts.find(o => o.startsWith(val));
    if (match) cmdInput.value = match;
  }
});
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    activatePanel(target);
  });
});
document.getElementById('downloadReadme').addEventListener('click', () => triggerDownload());
document.getElementById('downloadProfile').addEventListener('click', () => {
  const profile = `Steve Plasencia (HACKTIVATE)
SaaS • AI Agents • Web3 • Blockchain • Automation • Cybersecurity
Direct: 323-396-0096
Email: info@stevesjobbs.com
Aliases: FunkyMonkey5150 · Dappster · Crypto Head Hunter`;
  const blob = new Blob([profile], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'STEVE_HACKTIVATE_PROFILE.txt';
  a.click();
});
// form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    printLine('Submitting contact request...');
    try {
      const data = new FormData(form);
      await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      printLine('Contact request sent. You will be contacted securely.');
      form.reset();
    } catch (err) {
      printLine('Error sending request. Use: info@stevesjobbs.com');
    }
  });
}
consoleDiv.addEventListener('click', () => cmdInput.focus());
window.addEventListener('load', () => cmdInput.focus());
