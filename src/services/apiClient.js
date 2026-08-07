/**
 * API Client Utility
 * Handles authenticated API calls with token headers and retry logic.
 */

const WORKER_URL_KEY = 'noble_cms_worker_url';
export const DEFAULT_WORKER_URL = 'https://noble-cms-api.noble-education.workers.dev';

export function getWorkerUrl() {
  try {
    const saved = localStorage.getItem(WORKER_URL_KEY);
    if (saved && saved.trim()) return saved.trim().replace(/\/$/, '');
  } catch {}
  return DEFAULT_WORKER_URL;
}

export function setWorkerUrl(url) {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem(WORKER_URL_KEY);
    } else {
      localStorage.setItem(WORKER_URL_KEY, url.trim().replace(/\/$/, ''));
    }
  } catch {}
}

export function getAuthToken() {
  try {
    return sessionStorage.getItem('noble_cms_token') || localStorage.getItem('noble_cms_token');
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  try {
    sessionStorage.setItem('noble_cms_token', token);
    localStorage.setItem('noble_cms_token', token);
  } catch {}
}

export function removeAuthToken() {
  try {
    sessionStorage.removeItem('noble_cms_token');
    localStorage.removeItem('noble_cms_token');
  } catch {}
}

export async function apiFetch(endpoint, options = {}) {
  const workerUrl = getWorkerUrl();
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  const targetUrl = endpoint.startsWith('http') ? endpoint : `${workerUrl}${endpoint}`;

  let attempts = 0;
  const maxAttempts = options.retries || 2;

  while (attempts <= maxAttempts) {
    try {
      const response = await fetch(targetUrl, config);
      
      if (response.status === 401 && !endpoint.includes('/api/auth/login')) {
        removeAuthToken();
      }

      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (err) {
      attempts++;
      if (attempts > maxAttempts) {
        throw err;
      }
      await new Promise(r => setTimeout(r, 1000 * attempts));
    }
  }
}
