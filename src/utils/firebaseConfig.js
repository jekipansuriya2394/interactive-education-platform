// Cloud Database Config for Noble Education Admin Panel
// Firebase Realtime Database URL for global multi-device live synchronization

const STORAGE_KEY = 'noble_admin_firebase_url';
export const ENV_FIREBASE_URL = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_RTDB_URL ? import.meta.env.VITE_FIREBASE_RTDB_URL : '';
export const DEFAULT_FIREBASE_URL = ENV_FIREBASE_URL || 'https://noble-education-website-default-rtdb.firebaseio.com';

export function getFirebaseUrl() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) {
      const clean = saved.trim().replace(/\/$/, '');
      // Automatically purge old dead placeholder URL
      if (clean.includes('noble-education-default-rtdb')) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        return clean;
      }
    }
  } catch {}
  if (ENV_FIREBASE_URL && ENV_FIREBASE_URL.trim() && !ENV_FIREBASE_URL.includes('noble-education-default-rtdb')) {
    return ENV_FIREBASE_URL.trim().replace(/\/$/, '');
  }
  return DEFAULT_FIREBASE_URL;
}

export function setFirebaseUrl(url) {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, url.trim().replace(/\/$/, ''));
    }
    return true;
  } catch {
    return false;
  }
}

export async function testFirebaseConnection(customUrl) {
  const rawUrl = (customUrl || getFirebaseUrl() || '').trim();
  const url = rawUrl.replace(/\/$/, '');
  
  if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return { ok: false, message: 'Invalid URL format. Must start with https://' };
  }
  
  try {
    const testPayload = { _ping: Date.now() };
    const res = await fetch(`${url}/_test_connection.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });
    
    if (res.ok) {
      return { ok: true, message: 'Connected successfully! Realtime sync is active and live.' };
    }
    if (res.status === 401 || res.status === 403) {
      return { ok: false, message: 'Permission Denied. Please ensure your Firebase Rules allow read/write: { ".read": true, ".write": true }' };
    }
    if (res.status === 404) {
      return { ok: false, message: 'Database not found (404). Please verify your Firebase Realtime Database URL.' };
    }
    return { ok: false, message: `Server returned HTTP status ${res.status}` };
  } catch (err) {
    return { ok: false, message: `Connection error: ${err.message || 'Network request failed'}` };
  }
}
