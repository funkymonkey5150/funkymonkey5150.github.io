import { displayTerminal } from './terminal.js';
import { displayAbout } from './about.js';
import { displayGedit } from './gedit.js';
import { displayGithub } from './github.js';
import { displayMetasploit } from './metasploit.js';
import { displayNmap } from './nmap.js';
import { displayReelify } from './reelify.js';
import { displayPwnagotchi } from './pwnagotchi.js';
import { displayFlipper } from './flipper.js';
import { displaySysmon } from './sysmon.js';
import { displaySSHClient } from './ssh-client.js';
import { displayExploitDb } from './exploit-db.js';

const apps = [
  { id: 'terminal', title: 'Terminal', icon: './assets/app.svg', desktop_shortcut: true, screen: displayTerminal },
  { id: 'about', title: 'About Steve', icon: './assets/app.svg', desktop_shortcut: true, screen: displayAbout },
  { id: 'gedit', title: 'Contact / Notes', icon: './assets/app.svg', desktop_shortcut: true, screen: displayGedit },
  { id: 'github', title: 'GitHub', icon: './assets/app.svg', desktop_shortcut: false, screen: displayGithub },
  { id: 'reelify', title: 'Reelify AI', icon: './assets/app.svg', desktop_shortcut: false, screen: displayReelify },
  { id: 'metasploit', title: 'Metasploit', icon: './assets/app.svg', desktop_shortcut: false, screen: displayMetasploit },
  { id: 'nmap', title: 'Nmap', icon: './assets/app.svg', desktop_shortcut: false, screen: displayNmap },
  { id: 'pwnagotchi', title: 'Pwnagotchi Lab', icon: './assets/app.svg', desktop_shortcut: false, screen: displayPwnagotchi },
  { id: 'flipper', title: 'Flipper Zero', icon: './assets/app.svg', desktop_shortcut: false, screen: displayFlipper },
  { id: 'sysmon', title: 'System Monitor', icon: './assets/app.svg', desktop_shortcut: false, screen: displaySysmon },
  { id: 'ssh', title: 'SSH Client', icon: './assets/app.svg', desktop_shortcut: false, screen: displaySSHClient },
  { id: 'exploit-db', title: 'Exploit DB', icon: './assets/app.svg', desktop_shortcut: false, screen: displayExploitDb },
];

export default apps;
