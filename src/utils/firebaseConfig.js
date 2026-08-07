// Cloud Database Config for Noble Education Admin Panel
// Firebase Realtime Database URL for global multi-device sync

const STORAGE_KEY = 'noble_admin_firebase_url';
export const DEFAULT_FIREBASE_URL = 'https://noble-education-default-rtdb.firebaseio.com';

export function getFirebaseUrl() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim().replace(/\/$/, '');
  } catch {}
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
