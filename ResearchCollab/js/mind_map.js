
/* ──────────────────────────────────────────────────────────────
   MINI MINDMAP LINES (hero mockup)
   ────────────────────────────────────────────────────────────── */
function drawMiniMapLines() {
  const svg = document.getElementById('mini-svg');
  const map = document.getElementById('mini-map');
  if (!svg || !map) return;
  const center = document.getElementById('mc');
  const nodes = ['mn1','mn2','mn3','mn4','mn5','mn6'];
  svg.innerHTML = '';
  const mr = map.getBoundingClientRect();
  const cr = center.getBoundingClientRect();
  const cx = cr.left - mr.left + cr.width/2;
  const cy = cr.top - mr.top + cr.height/2;
  nodes.forEach(id => {
    const n = document.getElementById(id);
    if (!n) return;
    const nr = n.getBoundingClientRect();
    const nx = nr.left - mr.left + nr.width/2;
    const ny = nr.top - mr.top + nr.height/2;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', nx); line.setAttribute('y2', ny);
    line.setAttribute('stroke', 'rgba(14,112,255,.25)');
    line.setAttribute('stroke-width', '1.5');
    svg.appendChild(line);
  });
}
setTimeout(drawMiniMapLines, 500);
window.addEventListener('resize', drawMiniMapLines);

/* ──────────────────────────────────────────────────────────────
   MIND MAP — Sidebar toggle
   ────────────────────────────────────────────────────────────── */
let sidebarOpen = true;
let nodePanelOpen = false;

function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  const sidebar = document.getElementById('map-sidebar');
  const openBtn = document.getElementById('sidebar-open-btn');
  const backdrop = document.getElementById('map-backdrop');
  sidebar.classList.toggle('closed', !sidebarOpen);
  if (openBtn) openBtn.style.display = sidebarOpen ? 'none' : 'grid';
  if (window.innerWidth <= 768) {
    if (backdrop) backdrop.classList.toggle('visible', sidebarOpen);
  }
  setTimeout(drawMapLines, 320);
}

function setMapState(state) {
  const sidebar = document.getElementById('map-sidebar');
  const panel = document.getElementById('node-panel');
  const backdrop = document.getElementById('map-backdrop');
  const openBtn = document.getElementById('sidebar-open-btn');
  const tabs = document.querySelectorAll('#screen-mindmap .state-tab');

  if (state === 'menu-open') {
    sidebarOpen = true;
    sidebar.classList.remove('closed');
    panel.classList.add('hidden');
    if(openBtn) openBtn.style.display='none';
    if(backdrop) backdrop.classList.remove('visible');
    tabs[0]?.classList.add('active'); tabs[1]?.classList.remove('active'); tabs[2]?.classList.remove('active');
  } else if (state === 'menu-closed') {
    sidebarOpen = false;
    sidebar.classList.add('closed');
    panel.classList.add('hidden');
    if(openBtn) openBtn.style.display='grid';
    if(backdrop) backdrop.classList.remove('visible');
    tabs[0]?.classList.remove('active'); tabs[1]?.classList.add('active'); tabs[2]?.classList.remove('active');
  } else if (state === 'node-selected') {
    sidebarOpen = true;
    sidebar.classList.remove('closed');
    panel.classList.remove('hidden');
    if(openBtn) openBtn.style.display='none';
    if(backdrop) backdrop.classList.remove('visible');
    tabs[0]?.classList.remove('active'); tabs[1]?.classList.remove('active'); tabs[2]?.classList.add('active');
  }
  setTimeout(drawMapLines, 320);
}

/* ──────────────────────────────────────────────────────────────
   MIND MAP — Draw SVG connector lines
   ────────────────────────────────────────────────────────────── */
function drawMapLines() {
  const svg = document.getElementById('map-svg');
  const canvas = document.getElementById('map-canvas');
  if (!svg || !canvas) return;
  svg.innerHTML = '';
  const cr = canvas.getBoundingClientRect();
  const central = document.getElementById('node-central');
  if (!central) return;
  const centralR = central.getBoundingClientRect();
  const cx = centralR.left - cr.left + centralR.width/2;
  const cy = centralR.top - cr.top + centralR.height/2;

  const connections = [
    {id:'node-1', cls:'branch-1-line'},
    {id:'node-2', cls:'branch-1-line'},
    {id:'node-3', cls:'branch-2-line'},
    {id:'node-4', cls:'branch-2-line'},
    {id:'node-5', cls:'branch-3-line'},
    {id:'node-6', cls:'branch-3-line'},
    {id:'node-7', cls:''},
    {id:'node-8', cls:''},
  ];

  connections.forEach(({id, cls}) => {
    const n = document.getElementById(id);
    if (!n) return;
    const nr = n.getBoundingClientRect();
    const nx = nr.left - cr.left + nr.width/2;
    const ny = nr.top - cr.top + nr.height/2;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', nx); line.setAttribute('y2', ny);
    if (cls) line.setAttribute('class', cls);
    svg.appendChild(line);
  });
}