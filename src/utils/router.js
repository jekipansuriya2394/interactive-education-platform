// Simple lightweight history-based router matching React 19 natively.
export const navigate = (path) => {
  const currentPathname = window.location.pathname;

  // Handle hash scroll redirection
  if (path.includes('#')) {
    const parts = path.split('#');
    const targetPathname = parts[0] || '/';
    const id = parts[1];

    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event('popstate'));

    // Retry scrolling until element is mounted in DOM
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

  // Standard route switching
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
