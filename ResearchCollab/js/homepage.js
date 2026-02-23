
/* ──────────────────────────────────────────────────────────────
   HOMEPAGE — Canvas node network effect
   ────────────────────────────────────────────────────────────── */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randomNode() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + 1.5
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: 255 }, randomNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Update
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    // Edges
    const DIST = 230;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(14,112,255,${.12 * (1 - d/DIST)})`;
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }
    // Dots
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(14,112,255,.25)';
      ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', () => { init(); });
})();

/* Auth canvas (same but dimmer on dark bg) */
function initAuthCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animId;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  function rn() { return { x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*2+1 }; }
  function init() { resize(); nodes = Array.from({length:40},rn); }
  function draw() {
    ctx.clearRect(0,0,W,H);
    nodes.forEach(n => { n.x+=n.vx; n.y+=n.vy; if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1; });
    for(let i=0;i<nodes.length;i++){for(let j=i+1;j<nodes.length;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.strokeStyle=`rgba(255,255,255,${.07*(1-d/120)})`;ctx.lineWidth=.7;ctx.stroke();}}}
    nodes.forEach(n=>{ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.15)';ctx.fill();});
    requestAnimationFrame(draw);
  }
  init(); draw(); window.addEventListener('resize', ()=>init());
}
initAuthCanvas('auth-canvas');
initAuthCanvas('auth-canvas-2');

/* ──────────────────────────────────────────────────────────────
   HOMEPAGE — Mobile menu
   ────────────────────────────────────────────────────────────── */
let mobileMenuOpen = false;
function toggleMobileMenu(force) {
  const menu = document.getElementById('hp-mobile-menu');
  const btn = document.getElementById('hp-hamburger');
  mobileMenuOpen = force !== undefined ? force : !mobileMenuOpen;
  menu.style.display = mobileMenuOpen ? 'block' : 'none';
  document.querySelectorAll('#screen-homepage .state-tab').forEach((t,i) => {
    t.classList.toggle('active', i === (mobileMenuOpen ? 1 : 0));
  });
}
