/**
 * authService.js — Noble Education GitOps CMS
 *
 * Manages authentication state: login, logout, session validation,
 * role-based access control, and audit log helpers.
 */

import { apiPost, apiGet, setAuthToken, removeAuthToken, getAuthToken, decodeTokenPayload, isTokenExpired } from './apiClient.js';

// ─── Role Hierarchy ───────────────────────────────────────────────────────────
export const ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN:      'admin',
  EDITOR:     'editor',
  VIEWER:     'viewer',
};

const ROLE_WEIGHTS = {
  superadmin: 4,
  admin:      3,
  editor:     2,
  viewer:     1,
};

/**
 * Check if a role has at least the required permission level.
 * @param {string} userRole     - The user's current role
 * @param {string} requiredRole - The minimum required role
 */
export function hasPermission(userRole, requiredRole) {
  return (ROLE_WEIGHTS[userRole] || 0) >= (ROLE_WEIGHTS[requiredRole] || 0);
}

// ─── Session Management ───────────────────────────────────────────────────────

let _currentUser = null;

/**
 * Restore user session from stored JWT (called on app start).
 * Returns null if no valid session exists.
 *
 * @returns {{ username: string, role: string } | null}
 */
export function restoreSession() {
  if (isTokenExpired()) {
    removeAuthToken();
    _currentUser = null;
    return null;
  }
  const token   = getAuthToken();
  const payload = decodeTokenPayload(token);
  if (!payload) {
    removeAuthToken();
    return null;
  }
  _currentUser = { username: payload.sub, role: payload.role };
  return _currentUser;
}

/** Return the currently logged-in user or null */
export function getCurrentUser() {
  return _currentUser;
}

/** Return true if there is a valid, non-expired session */
export function isAuthenticated() {
  return !isTokenExpired() && !!_currentUser;
}

// ─── Auth Operations ──────────────────────────────────────────────────────────

/**
 * Log in to the admin panel via the Cloudflare Worker.
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ success: boolean, user: { username, role }, token: string }>}
 */
export async function login(username, password) {
  const data = await apiPost('/api/auth/login', { username, password });
  if (data.success && data.token) {
    setAuthToken(data.token);
    _currentUser = data.user;
    writeAuditLog('login', `User "${username}" logged in successfully`);
  }
  return data;
}

/**
 * Verify current JWT with the Worker (server-side validation).
 *
 * @returns {Promise<boolean>}
 */
export async function verifySession() {
  try {
    const data = await apiGet('/api/auth/verify');
    if (data.valid) {
      _currentUser = data.user;
      return true;
    }
  } catch { /* network error — keep existing session if token not expired */ }
  return !isTokenExpired();
}

/**
 * Log out: remove stored token and clear in-memory user state.
 */
export function logout() {
  if (_currentUser) {
    writeAuditLog('logout', `User "${_currentUser.username}" logged out`);
  }
  removeAuthToken();
  _currentUser = null;
}

// ─── Audit Log ────────────────────────────────────────────────────────────────

const AUDIT_LOG_KEY = 'noble_cms_audit_log';
const MAX_LOG_ENTRIES = 200;

/**
 * Write an entry to the local audit log (stored in localStorage).
 * Note: This is local-only. A future enhancement would push to GitHub via Worker.
 *
 * @param {'login'|'logout'|'save'|'delete'|'upload'|'deploy'|'error'} action
 * @param {string} details
 */
export function writeAuditLog(action, details) {
  try {
    const existing = readAuditLog();
    const entry = {
      id:        crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      action,
      details,
      user:      _currentUser?.username || 'unknown',
      role:      _currentUser?.role     || 'unknown',
      timestamp: new Date().toISOString(),
    };
    const updated = [entry, ...existing].slice(0, MAX_LOG_ENTRIES);
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
    return entry;
  } catch {
    return null;
  }
}

/**
 * Read all audit log entries.
 * @returns {Array<object>}
 */
export function readAuditLog() {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clear all audit log entries.
 */
export function clearAuditLog() {
  try {
    localStorage.removeItem(AUDIT_LOG_KEY);
  } catch { /* ignore */ }
}
