import * as bootstrap from 'bootstrap';
import './main.scss';

// ESM 모듈이므로 인라인 스크립트에서 접근할 수 있도록 전역 노출
window.bootstrap = bootstrap;

// ── Dark mode toggle ────────────────────────
// DOMContentLoaded 전에 미리 적용해 FOUC 방지
const saved = localStorage.getItem('shadcn-theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
  document.documentElement.setAttribute('data-bs-theme', saved);
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const update = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('shadcn-theme', theme);
      toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    };
    update(saved || 'light');
    toggle.addEventListener('click', () => {
      update(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));

  // ── Toast trigger ──────────────────────────
  document.getElementById('showToasts')?.addEventListener('click', () => {
    ['toast1', 'toast2', 'toast3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) new bootstrap.Toast(el, { delay: 4000 }).show();
    });
  });
});
