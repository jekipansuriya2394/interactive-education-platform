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

export const normalizePathFromLocation = (pathname) => localPath(pathname || window.location.pathname);

