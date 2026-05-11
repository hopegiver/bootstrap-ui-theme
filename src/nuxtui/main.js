import * as bootstrap from 'bootstrap';
import './main.scss';

// ── Dark mode toggle ────────────────────────
const saved = localStorage.getItem('nuxtui-theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const update = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('nuxtui-theme', theme);
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  update(saved || 'light');
  toggle.addEventListener('click', () => {
    update(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));

  document.querySelectorAll('.chip-close').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.chip')?.remove());
  });

  const toastBtn = document.getElementById('toastBtn');
  if (toastBtn) {
    toastBtn.addEventListener('click', () => {
      const toastEl = document.getElementById('toastMain');
      if (toastEl) bootstrap.Toast.getOrCreateInstance(toastEl).show();
    });
  }
});
