[Uploading HACKTIVATE_README.md…]()
# 🚀 HACKTIVATE MATRIX TERMINAL

Welcome to **HACKTIVATE LABS – AI • Security • Automation**  
Created by **Steve Plasencia (@FunkyMonkey5150)**

This repository contains a **Matrix-style hacker terminal** website built for GitHub Pages.  
When deployed, users interact with a simulated terminal UI with commands like:
```
help, about, projects, contact, download, clear, launch
```

---

## 🧠 Features
- **Matrix rain animation** background (JavaScript Canvas)
- **Terminal interface** for navigation (SPA router)
- **Custom SVG HACKTIVATE wordmark**
- **Serverless contact form** (Formspree-ready)
- **Auto dark-mode aesthetic** with neon-glass UI
- **Instant deploy on GitHub Pages**

---

## 📦 File Structure
```
hacktivate-matrix-v2/
├── index.html
├── style.css
├── script.js
└── assets/
    └── favicon.svg
```

---

## 🚀 How to Launch

1. **Download ZIP** and extract it locally.  
2. Go to [GitHub](https://github.com/) → Create a **new public repository**.  
3. Name it either:
   - `hacktivate-matrix` (URL will be https://username.github.io/hacktivate-matrix), or
   - `username.github.io` (URL will be https://username.github.io).  
4. Upload:
   - `index.html`
   - `style.css`
   - `script.js`
   - `assets` folder  
5. **Commit changes**  
6. Go to **Settings → Pages → Deploy from branch → main / root**  
7. Visit your new live Matrix terminal 🌌  

---

## ⚙️ Customization

### 📨 Contact Form
Replace this line in `index.html` with your Formspree endpoint:
```html
<form id="contactForm" action="https://formspree.io/f/your-form-id" method="POST">
```

### 🧠 Matrix Speed & Color
Change speed or color inside `script.js`:
```js
ctx.fillStyle = '#00ff7f';  // color
setInterval(drawMatrix, 45); // lower = faster
```

---

## 🧩 Credits
- Design + Development: **Steve Plasencia (HACKTIVATE LABS)**
- License: MIT
- Version: v2.0 (Matrix UI Release)

---

### ⚔️ Philosophy
> *Adapt or perish. Automate or vanish.*  
> *We don’t just protect systems. We Hacktivate them.*

---

💻 **Website:** [https://stevesjobbs.com](https://stevesjobbs.com)  
📧 **info@stevesjobbs.com**  
📞 **323‑396‑0096**  
🐦 **@hacktivate5150**  
