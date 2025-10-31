export function startMatrix(){
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);
  const letters = 'アカサタナ0123456789HACKTIVATE';
  const font = 14;
  let cols = Math.floor(canvas.width / font);
  let drops = Array(cols).fill(1);
  setInterval(() => {
    ctx.fillStyle='rgba(0,0,0,0.06)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#00ff7f';
    ctx.font = font + 'px monospace';
    for (let i=0;i<drops.length;i++){
      const text = letters.charAt(Math.floor(Math.random()*letters.length));
      ctx.fillText(text, i*font, drops[i]*font);
      if (drops[i]*font > canvas.height && Math.random() > 0.975) drops[i]=0;
      drops[i]++;
    }
  }, 45);
}
