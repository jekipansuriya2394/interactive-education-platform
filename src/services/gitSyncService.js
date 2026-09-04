/**
 * gitSyncService.js — Noble Education GitOps CMS
 *
 * Handles all Git synchronization operations: committing content JSON files,
 * media uploads, and deployment status polling.
 *
 * Flow: Save → Worker API (JWT) → GitHub REST API → GitHub Actions → Live Site
 */

import { apiPost, apiGet, apiDelete, getWorkerUrl } from './apiClient.js';

// ─── Constants ───────────────────────────────────────────────────────────────
const GH_OWNER  = import.meta.env.VITE_GH_OWNER  || 'jekipansuriya2394';
const GH_REPO   = import.meta.env.VITE_GH_REPO   || 'interactive-education-platform';
const GH_BRANCH = import.meta.env.VITE_GH_BRANCH || 'main';

// ─── Core Commit Operations ───────────────────────────────────────────────────

/**
 * Commit a single JSON content file to the repository.
 *
 * @param {string} filePath      - Repo-relative path (e.g. 'content/home.json')
 * @param {object|string} content - Content to commit (objects will be JSON-stringified)
 * @param {string} [message]     - Custom commit message
 * @returns {Promise<object>}    - { success, commit: { sha, message, url } }
 */
export async function commitContent(filePath, content, message) {
  const contentStr = typeof content === 'string'
    ? content
    : JSON.stringify(content, null, 2);

  const commitMessage = message || `chore(cms): update ${filePath.split('/').pop()} via Admin Panel`;

  return apiPost('/api/git/commit', {
    filePath,
    content: contentStr,
    commitMessage,
    isBase64: false,
  });
}

/**
 * Commit multiple content files atomically in a single Git commit.
 * Uses the GitHub Tree API to avoid multiple sequential commits.
 *
 * @param {Array<{path: string, content: object|string}>} files - Files to commit
 * @param {string} [message] - Custom commit message
 * @returns {Promise<object>} - { success, commit: { sha, message } }
 */
export async function batchCommitContent(files, message) {
  const normalizedFiles = files.map(f => ({
    path: f.path,
    content: typeof f.content === 'string' ? f.content : JSON.stringify(f.content, null, 2),
  }));

  const commitMessage = message || `chore(cms): batch update ${normalizedFiles.length} file(s) via Admin Panel`;

  return apiPost('/api/git/batch-commit', {
    files: normalizedFiles,
    commitMessage,
  });
}

/**
 * Delete a file from the repository.
 *
 * @param {string} filePath     - Repo-relative path to delete
 * @param {string} [message]    - Custom commit message
 * @returns {Promise<object>}   - { success }
 */
export async function deleteFile(filePath, message) {
  const commitMessage = message || `chore(cms): delete ${filePath.split('/').pop()} via Admin Panel`;
  return apiDelete('/api/git/delete', { filePath, commitMessage });
}

// ─── Media Upload ─────────────────────────────────────────────────────────────

/**
 * Upload a media file (image, PDF, etc.) to the repository under public/images/.
 * The Worker handles WebP conversion for images before committing.
 *
 * @param {File} file         - Browser File object
 * @param {string} folder     - Sub-folder under public/images/ (e.g. 'gallery', 'faculty')
 * @returns {Promise<object>} - { success, path: '/images/folder/filename' }
 */
export async function uploadMedia(file, folder = 'uploads') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        // Strip data URL prefix → pure base64
        const base64 = e.target.result.split(',')[1];
        const ext    = file.name.split('.').pop().toLowerCase();

        // Sanitize filename: lowercase, replace spaces with dashes, keep ext
        const safeName = file.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9._-]/g, '')
          .substring(0, 80);

        const result = await apiPost('/api/media/upload', {
          folderPath:    folder,
          fileName:      safeName,
          base64Content: base64,
          mimeType:      file.type,
        });

        resolve(result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// ─── Deployment Status ────────────────────────────────────────────────────────

/**
 * Fetch recent GitHub Actions workflow runs for the repository.
 * Falls back seamlessly to the direct public GitHub Actions API if worker is unavailable.
 *
 * @returns {Promise<object>} - { success, runs: [...] }
 */
export async function getDeploymentStatus() {
  // 1. Try Cloudflare Worker endpoint first
  try {
    const data = await apiGet('/api/git/status', { retries: 0 });
    if (data && Array.isArray(data.runs) && data.runs.length > 0) {
      return { success: true, runs: data.runs, source: 'worker' };
    }
  } catch {
    // Cloudflare Worker not configured, token expired, or CORS restricted
  }

  // 2. Direct GitHub Actions REST API fallback (Public repository, native CORS: *)
  try {
    const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/actions/runs?per_page=8`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (res.ok) {
      const data = await res.json();
      const runs = (data.workflow_runs || []).map(r => ({
        id: r.id,
        status: r.status,
        conclusion: r.conclusion,
        name: r.name,
        created_at: r.created_at,
        updated_at: r.updated_at,
        html_url: r.html_url,
        head_sha: r.head_sha
      }));
      return { success: true, runs, source: 'github' };
    }
  } catch (e) {
    console.warn('Direct GitHub Actions API fetch failed:', e);
  }

  return { success: false, runs: [] };
}

/**
 * Fetch recent commit history.
 * Falls back seamlessly to the direct public GitHub Commits API if worker is unavailable.
 *
 * @returns {Promise<object>} - { success, commits: [...] }
 */
export async function getCommitLog() {
  // 1. Try Cloudflare Worker endpoint first
  try {
    const data = await apiGet('/api/git/log', { retries: 0 });
    if (data && Array.isArray(data.commits) && data.commits.length > 0) {
      return { success: true, commits: data.commits, source: 'worker' };
    }
  } catch {
    // Cloudflare Worker not configured, token expired, or CORS restricted
  }

  // 2. Direct GitHub Commits REST API fallback (Public repository, native CORS: *)
  try {
    const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/commits?per_page=12`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (res.ok) {
      const data = await res.json();
      const commits = (data || []).map(c => ({
        sha: c.sha,
        message: c.commit?.message || '',
        author: c.commit?.author?.name || c.author?.login || 'Admin',
        date: c.commit?.author?.date || '',
        url: c.html_url
      }));
      return { success: true, commits, source: 'github' };
    }
  } catch (e) {
    console.warn('Direct GitHub Commits API fetch failed:', e);
  }

  return { success: false, commits: [] };
}

// ─── Specialized Content Savers ──────────────────────────────────────────────

/** Save hero / home section content */
export const saveHomeContent    = (data) => commitContent('content/home.json', data);

/** Save about page content */
export const saveAboutContent   = (data) => commitContent('content/about.json', data);

/** Save courses list */
export const saveCoursesContent = (data) => commitContent('content/courses.json', data);

/** Save gallery images list */
export const saveGalleryContent = (data) => commitContent('content/gallery.json', data);

/** Save faculty profiles */
export const saveFacultyContent = (data) => commitContent('content/faculty.json', data);

/** Save testimonials */
export const saveTestimonialsContent = (data) => commitContent('content/testimonials.json', data);

/** Save FAQ items */
export const saveFaqContent     = (data) => commitContent('content/faq.json', data);

/** Save contact information */
export const saveContactContent = (data) => commitContent('content/contact.json', data);

/** Save footer content */
export const saveFooterContent  = (data) => commitContent('content/footer.json', data);

/** Save popup configuration */
export const savePopupContent   = (data) => commitContent('content/popup.json', data);

/** Save SEO metadata */
export const saveSeoContent     = (data) => commitContent('content/seo.json', data);

/** Save announcement banners */
export const saveAnnouncementContent = (data) => commitContent('content/announcement.json', data);

/** Save navigation links */
export const saveNavContent     = (data) => commitContent('content/navigation.json', data);

/** Save site-wide settings (name, tagline, logo, etc.) */
export const saveWebsiteContent = (data) => commitContent('content/website.json', data);

/** Save social media links */
export const saveSocialContent  = (data) => commitContent('content/social.json', data);

/**
 * Save a single blog post.
 * Each post is stored as content/blog/{slug}.json
 *
 * @param {string} slug     - URL-friendly post identifier
 * @param {object} postData - Full post data object
 */
export function saveBlogPost(slug, postData) {
  return commitContent(`content/blog/${slug}.json`, postData, `chore(cms): ${postData.status === 'published' ? 'publish' : 'update draft of'} blog post "${postData.title}"`);
}

/**
 * Delete a blog post from the repository.
 *
 * @param {string} slug - Post slug to delete
 */
export function deleteBlogPost(slug) {
  return deleteFile(`content/blog/${slug}.json`, `chore(cms): delete blog post "${slug}"`);
}

// ─── Health check ─────────────────────────────────────────────────────────────

/**
 * Check if the Cloudflare Worker backend is online and reachable.
 * Handles both CORS JSON response and network reachability probe.
 *
 * @returns {Promise<{ok: boolean, latencyMs: number, data: object}>}
 */
export async function checkWorkerHealth() {
  const start = Date.now();
  const workerUrl = getWorkerUrl();

  // 1. Try standard JSON health check
  try {
    const data = await apiGet('/api/health', { retries: 0 });
    return { ok: !!data.ok, latencyMs: Date.now() - start, data };
  } catch {
    // 2. If standard fetch failed due to CORS or auth, probe network reachability
    try {
      await fetch(`${workerUrl}/api/health`, { method: 'GET', mode: 'no-cors' });
      return {
        ok: true,
        latencyMs: Date.now() - start,
        data: { ok: true, note: 'Server Online' }
      };
    } catch {
      return { ok: false, latencyMs: Date.now() - start, data: null };
    }
  }
}
