// Simple lightweight history-based router matching React 19 natively.
const BASE = import.meta.env.BASE_URL || '/';
const BASE_STRIP = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;

function buildHref(path) {
  if (!path) return BASE_STRIP || '/';
  // Leave full URLs alone
  if (/^https?:\/\//.test(path)) return path;
  // If already absolute with base, return as-is
  if (BASE_STRIP !== '/' && path.startsWith(BASE_STRIP)) return path;
  // Ensure leading slash
  const p = path.startsWith('/') ? path : '/' + path;
  return (BASE_STRIP === '/' ? '' : BASE_STRIP) + p;
}

function localPath(pathname) {
  if (!pathname) return '/';
  let p = pathname;
  if (BASE_STRIP !== '/' && p.startsWith(BASE_STRIP)) {
    p = p.slice(BASE_STRIP.length) || '/';
  }
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1 && p.endsWith('/')) {
    p = p.slice(0, -1);
  }
  return p;
}

export const navigate = (path) => {
  // If navigating to a hash route like #/admin, normalize to /admin
  if (path.startsWith('#/')) {
    path = path.slice(1);
  }

  // Handle hash scroll redirection
  if (path.includes('#')) {
    const parts = path.split('#');
    const targetPathname = parts[0] || '/';
    const id = parts[1];

    const href = buildHref(targetPathname || '/');
    window.history.pushState({}, '', href + (id ? '#' + id : ''));
    window.dispatchEvent(new Event('popstate'));

    let attempts = 0;
    const scrollToTarget = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 15) {
        attempts++;
        setTimeout(scrollToTarget, 100);
      }
    };
    setTimeout(scrollToTarget, 100);
    return;
  }

  const href = buildHref(path);
  window.history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const normalizePathFromLocation = (pathname) => {
  if (typeof window !== 'undefined' && window.location.hash) {
    const rawHash = window.location.hash; // e.g. "#/admin", "#admin", "#inquiry-form"

    // If hash starts with "#/" (standard hash routing like #/admin or #/about)
    if (rawHash.startsWith('#/')) {
      const route = rawHash.slice(1); // e.g. "/admin"
      return localPath(route);
    }

    // Also support #admin, #about, #courses, #results, etc.
    const cleanHash = rawHash.replace(/^#/, '');
    const knownRoutes = [
      'admin', 'about', 'courses', 'admission-guidance', 'results',
      'gallery', 'student-corner', 'online-test', 'contact', 'blog', 'school'
    ];
    if (knownRoutes.some(r => cleanHash === r || cleanHash.startsWith(r + '/') || cleanHash.startsWith(r + '?'))) {
      return '/' + cleanHash;
    }
  }

  return localPath(pathname || (typeof window !== 'undefined' ? window.location.pathname : '/'));
};

