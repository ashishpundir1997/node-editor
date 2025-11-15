// ThemeToggle.js
// Simple light/dark mode toggle using data-theme attribute on <html>
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <button
      type="button"
      onClick={toggle}
      style={{
        background: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        color: 'var(--text-dim)',
        fontSize: '.7rem',
        fontWeight: 600,
        padding: '.5rem .75rem',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.4rem',
        letterSpacing: '.5px'
      }}
      title="Toggle light/dark theme"
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};
