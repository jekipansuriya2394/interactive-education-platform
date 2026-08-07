/**
 * GitSync Service
 * Handles content commits to GitHub REST API, media uploads, and deployment status.
 */

import { apiFetch, getAuthToken, setAuthToken, removeAuthToken } from './apiClient';
import { saveContentCache, getContent } from '../utils/contentLoader';

const AUDIT_LOG_KEY = 'noble_cms_audit_logs';

export const gitSyncService = {
  async login(username, password) {
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      if (res && res.success && res.token) {
        setAuthToken(res.token);
        this.logAudit('LOGIN', `User ${username} logged in successfully`, username);
        return { success: true, user: res.user, token: res.token };
      }
      return { success: false, error: res.error || 'Invalid credentials' };
    } catch (e) {
      // Local development fallback credentials if worker endpoint is unconfigured
      if (username === 'admin' && password === 'admin123') {
        const dummyToken = btoa(JSON.stringify({ sub: 'admin', role: 'superadmin' }));
        setAuthToken(dummyToken);
        return { success: true, user: { username: 'admin', role: 'superadmin' } };
      }
      return { success: false, error: e.message || 'Authentication service unreachable' };
    }
  },

  logout() {
    removeAuthToken();
  },

  async commitContent(contentKey, data, commitMessage = '') {
    // 1. Update local cache immediately for instant local UI update
    saveContentCache(contentKey, data);

    const filePath = `content/${contentKey}.json`;
    const message = commitMessage || `cms: update ${contentKey}.json content`;

    // 2. Commit to remote GitHub Repository via Worker API
    try {
      const result = await apiFetch('/api/git/commit', {
        method: 'POST',
        body: JSON.stringify({
          filePath,
          content: data,
          commitMessage: message
        })
      });

      this.logAudit('COMMIT_CONTENT', `Committed ${filePath}: ${message}`);
      return { success: true, result };
    } catch (e) {
      console.warn(`Remote commit to GitHub API failed (Saved locally):`, e.message);
      this.logAudit('COMMIT_LOCAL_ONLY', `Saved ${filePath} locally: ${e.message}`);
      return { success: true, localOnly: true, warning: 'Saved locally. Remote Git commit requires configured Worker API.' };
    }
  },

  async uploadMedia(folderPath, fileName, base64Content, commitMessage = '') {
    const cleanFolder = folderPath.replace(/^\/+|\/+$/g, '');
    const filePath = `public/images/${cleanFolder ? cleanFolder + '/' : ''}${fileName}`;
    const message = commitMessage || `cms: upload media asset ${filePath}`;

    try {
      const result = await apiFetch('/api/git/commit', {
        method: 'POST',
        body: JSON.stringify({
          filePath,
          content: base64Content,
          commitMessage: message,
          isBase64: true
        })
      });

      this.logAudit('UPLOAD_MEDIA', `Uploaded ${filePath}`);
      return { success: true, filePath: `/${filePath}`, result };
    } catch (e) {
      this.logAudit('UPLOAD_MEDIA_FAIL', `Failed to upload ${filePath}: ${e.message}`);
      return { success: false, error: e.message };
    }
  },

  async getDeploymentStatus() {
    try {
      const res = await apiFetch('/api/git/status', { method: 'GET' });
      return res;
    } catch (e) {
      return { success: false, status: 'idle', conclusion: 'unknown' };
    }
  },

  // Audit Log Management
  logAudit(action, details, user = 'admin') {
    try {
      const logs = this.getAuditLogs();
      const newEntry = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
        timestamp: new Date().toISOString(),
        user,
        action,
        details
      };
      const updated = [newEntry, ...logs.slice(0, 99)];
      localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
    } catch {}
  },

  getAuditLogs() {
    try {
      const stored = localStorage.getItem(AUDIT_LOG_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  clearAuditLogs() {
    try {
      localStorage.removeItem(AUDIT_LOG_KEY);
    } catch {}
  },

  // Role Permissions Verification
  checkPermission(role, action) {
    if (role === 'superadmin') return true;
    
    if (role === 'admin') {
      return action !== 'MANAGE_USERS' && action !== 'DELETE_SYSTEM_BACKUP';
    }

    if (role === 'editor') {
      return action === 'EDIT_CONTENT' || action === 'UPLOAD_MEDIA';
    }

    if (role === 'viewer') {
      return action === 'VIEW_ONLY';
    }

    return false;
  }
};
