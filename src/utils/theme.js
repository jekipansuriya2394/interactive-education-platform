// Theme Manager Utility - Handles Light & Dark theme modes with real-time sync
const THEME_KEY = 'noble_website_theme';

export const themeManager = {
  getTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {
      console.error('Error reading theme', e);
    }
    return 'light';
  },

  setTheme(mode) {
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch (e) {
      console.error('Error saving theme', e);
    }
    this.applyTheme(mode);
    window.dispatchEvent(new CustomEvent('noble_theme_change', { detail: { theme: mode } }));
  },

  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  },

  applyTheme(mode) {
    const current = mode || this.getTheme();
    const root = document.documentElement;
    if (current === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  },

  initSync(callback) {
    this.applyTheme();
    const handler = (e) => {
      const activeTheme = e.detail?.theme || this.getTheme();
      this.applyTheme(activeTheme);
      if (callback) callback(activeTheme);
    };
    window.addEventListener('noble_theme_change', handler);
    window.addEventListener('storage', (e) => {
      if (e.key === THEME_KEY) {
        const newTheme = e.newValue || 'light';
        this.applyTheme(newTheme);
        if (callback) callback(newTheme);
      }
    });
    return () => window.removeEventListener('noble_theme_change', handler);
  }
};
