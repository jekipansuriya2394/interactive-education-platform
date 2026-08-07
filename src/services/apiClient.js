/**
 * API Client — Noble Education GitOps CMS
 *
 * Authenticated HTTP client for Cloudflare Worker endpoints.
 * Handles JWT token storage, refresh, retry logic, and error reporting.
 */

// ─── Config ──────────────────────────────────────────────────────────────────
const WORKER_URL_STORAGE_KEY = 'noble_cms_worker_url';
const TOKEN_SESSION_KEY      = 'noble_cms_jwt';
const TOKEN_STORAGE_KEY      = 'noble_cms_jwt_persist';

/** Resolve Worker base URL — from localStorage override, then VITE env var */
export function getWorkerUrl() {
  try {
    const override = localStorage.getItem(WORKER_URL_STORAGE_KEY);
    if (override && override.trim()) return override.trim().replace(/\/$/, '');
  } catch { /* ignore */ }
  return (import.meta.env.VITE_WORKER_URL || 'https://noble-cms-api.noble-edu-cms.workers.dev').replace(/\/$/, '');
}

/** Persist a custom Worker URL override (used by Settings panel) */
export function setWorkerUrl(url) {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem(WORKER_URL_STORAGE_KEY);
    } else {
      localStorage.setItem(WORKER_URL_STORAGE_KEY, url.trim().replace(/\/$/, ''));
    }
  } catch { /* ignore */ }
}

// ─── Token helpers ────────────────────────────────────────────────────────────

/** Read JWT from session (preferred) or localStorage fallback */
export function getAuthToken() {
  try {
    return (
      sessionStorage.getItem(TOKEN_SESSION_KEY) ||
      localStorage.getItem(TOKEN_STORAGE_KEY) ||
      null
    );
  } catch {
    return null;
  }
}

/** Persist JWT in both session and localStorage */
export function setAuthToken(token) {
  try {
    sessionStorage.setItem(TOKEN_SESSION_KEY, token);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch { /* ignore */ }
}

/** Remove JWT from all storage locations (logout) */
export function removeAuthToken() {
  try {
    sessionStorage.removeItem(TOKEN_SESSION_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch { /* ignore */ }
}

/** Decode JWT payload without verification (for display purposes only) */
export function decodeTokenPayload(token) {
  try {
    const [, payloadB64] = token.split('.');
    return JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

/** Check if stored JWT is expired */
export function isTokenExpired() {
  const token = getAuthToken();
  if (!token) return true;
  const payload = decodeTokenPayload(token);
  if (!payload || !payload.exp) return true;
  return Date.now() > payload.exp;
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

/**
 * Authenticated fetch to the Cloudflare Worker API.
 *
 * @param {string} endpoint   - API path (e.g. '/api/git/commit') or full URL
 * @param {object} options    - Standard fetch options + `retries` (default 2)
 * @returns {Promise<object>} - Parsed JSON response
 * @throws {Error}            - On HTTP error or network failure after retries
 */
export async function apiFetch(endpoint, options = {}) {
  const workerUrl = getWorkerUrl();
  const token     = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const requestConfig = { ...options, headers };
  const targetUrl = endpoint.startsWith('http')
    ? endpoint
    : `${workerUrl}${endpoint}`;

  const maxAttempts = (options.retries ?? 2) + 1;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(targetUrl, requestConfig);

      // If unauthorized, clear token so login page shows
      if (res.status === 401 && !endpoint.includes('/api/auth/login')) {
        removeAuthToken();
      }

      let data = {};
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { raw: text };
      }

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      return data;
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        // Exponential backoff: 500ms, 1000ms, 2000ms …
        await new Promise(r => setTimeout(r, 500 * Math.pow(2, attempt - 1)));
      }
    }
  }

  throw lastError;
}

// ─── Convenience methods ──────────────────────────────────────────────────────

/** GET request */
export const apiGet = (endpoint, opts = {}) =>
  apiFetch(endpoint, { method: 'GET', ...opts });

/** POST request with JSON body */
export const apiPost = (endpoint, body, opts = {}) =>
  apiFetch(endpoint, { method: 'POST', body: JSON.stringify(body), ...opts });

/** DELETE request with JSON body */
export const apiDelete = (endpoint, body, opts = {}) =>
  apiFetch(endpoint, { method: 'DELETE', body: JSON.stringify(body), ...opts });
