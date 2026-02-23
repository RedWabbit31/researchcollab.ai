
/* ──────────────────────────────────────────────────────────────
   OUTLINE — Sidebar toggle
   ────────────────────────────────────────────────────────────── */
let outlineSidebarOpen = true;

function toggleOutlineSidebar() {
  outlineSidebarOpen = !outlineSidebarOpen;
  setOutlineState(outlineSidebarOpen ? 'menu-open' : 'menu-closed');
}

function setOutlineState(state) {
  const sidebar = document.getElementById('outline-sidebar');
  const backdrop = document.getElementById('outline-backdrop');
  const tabs = document.querySelectorAll('#screen-outline .state-tab');
  outlineSidebarOpen = state === 'menu-open';
  sidebar.classList.toggle('closed', !outlineSidebarOpen);
  if(window.innerWidth <= 768 && backdrop) {
    backdrop.classList.toggle('visible', outlineSidebarOpen);
  }
  tabs[0]?.classList.toggle('active', outlineSidebarOpen);
  tabs[1]?.classList.toggle('active', !outlineSidebarOpen);
}