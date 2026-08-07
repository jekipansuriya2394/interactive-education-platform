/**
 * contentLoader.js — Noble Education GitOps CMS
 *
 * Content abstraction layer. Reads from content/*.json (bundled at build time
 * as the canonical source of truth), with localStorage as a volatile runtime
 * cache for data fetched from the Cloudflare Worker after deploy.
 *
 * Priority chain:
 *   1. Runtime localStorage cache (set after Worker fetch)
 *   2. Build-time bundled JSON (always available, never stale from last deploy)
 */

import websiteData     from '../../content/website.json';
import homeData        from '../../content/home.json';
import aboutData       from '../../content/about.json';
import coursesData     from '../../content/courses.json';
import galleryData     from '../../content/gallery.json';
import facultyData     from '../../content/faculty.json';
import testimonialsData from '../../content/testimonials.json';
import faqData         from '../../content/faq.json';
import announcementData from '../../content/announcement.json';
import settingsData    from '../../content/settings.json';
import footerData      from '../../content/footer.json';
import contactData     from '../../content/contact.json';
import seoData         from '../../content/seo.json';
import navigationData  from '../../content/navigation.json';
import popupData       from '../../content/popup.json';
import socialData      from '../../content/social.json';

/** Canonical build-time content map (from last deploy) */
const CONTENT_MAP = {
  website:      websiteData,
  home:         homeData,
  about:        aboutData,
  courses:      coursesData,
  gallery:      galleryData,
  faculty:      facultyData,
  testimonials: testimonialsData,
  faq:          faqData,
  announcement: announcementData,
  settings:     settingsData,
  footer:       footerData,
  contact:      contactData,
  seo:          seoData,
  navigation:   navigationData,
  popup:        popupData,
  social:       socialData,
};

const CACHE_PREFIX     = 'noble_content_cache_';
const BLOG_CACHE_KEY   = 'noble_blog_posts_cache';

// ─── Core content access ──────────────────────────────────────────────────────

/**
 * Get content for a section key.
 * Prefers the runtime localStorage cache, falls back to the bundled JSON.
 *
 * @param {string} key - One of the CONTENT_MAP keys
 * @returns {object|null}
 */
export function getContent(key) {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + key);
    if (cached) return JSON.parse(cached);
  } catch { /* ignore */ }
  return CONTENT_MAP[key] ?? null;
}

/**
 * Persist a content object to the runtime cache.
 * Fires a 'noble_content_updated' CustomEvent for live reactive components.
 *
 * @param {string}  key  - Section key
 * @param {object}  data - Updated content object
 * @returns {boolean}    - true on success
 */
export function saveContentCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('noble_content_updated', { detail: { key, data } }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Return all sections merged (runtime cache + bundled fallbacks).
 * @returns {object}
 */
export function getAllContent() {
  const all = {};
  Object.keys(CONTENT_MAP).forEach(key => { all[key] = getContent(key); });
  return all;
}

/**
 * Clear all runtime content caches (force re-read from bundled JSON).
 */
export function clearContentCache() {
  try {
    Object.keys(CONTENT_MAP).forEach(key =>
      localStorage.removeItem(CACHE_PREFIX + key)
    );
    localStorage.removeItem(BLOG_CACHE_KEY);
  } catch { /* ignore */ }
}

// ─── Blog content ─────────────────────────────────────────────────────────────

/**
 * Get blog posts from the adminData store (local) or runtime cache.
 * Posts are written by the Admin Panel into adminData under key 'blogPosts'.
 *
 * @returns {Array<object>}
 */
export function getBlogPosts() {
  try {
    const cached = localStorage.getItem(BLOG_CACHE_KEY);
    if (cached) {
      const posts = JSON.parse(cached);
      if (Array.isArray(posts)) return posts;
    }
  } catch { /* ignore */ }

  // Fall back to adminData blogPosts key
  try {
    const raw = localStorage.getItem('noble_admin_blogPosts');
    if (raw) {
      const posts = JSON.parse(raw);
      if (Array.isArray(posts)) return posts;
    }
  } catch { /* ignore */ }

  return [];
}

/**
 * Get a single blog post by slug.
 * @param {string} slug
 * @returns {object|null}
 */
export function getBlogPost(slug) {
  const posts = getBlogPosts();
  return posts.find(p => p.slug === slug) ?? null;
}

/**
 * Persist blog posts to the runtime cache.
 * @param {Array<object>} posts
 */
export function saveBlogPostsCache(posts) {
  try {
    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('noble_content_updated', { detail: { key: 'blog', data: posts } }));
  } catch { /* ignore */ }
}

// ─── SEO helpers ─────────────────────────────────────────────────────────────

/**
 * Apply SEO meta tags for a given page key or custom data.
 * Call this in page useEffect hooks.
 *
 * @param {string|object} pageKeyOrData - section key string OR full meta object
 */
export function applySEO(pageKeyOrData) {
  try {
    const seo  = getContent('seo') || {};
    const site = getContent('website') || {};

    let meta = {};
    if (typeof pageKeyOrData === 'string') {
      meta = seo.pages?.[pageKeyOrData] || seo.default || {};
    } else {
      meta = pageKeyOrData || {};
    }

    const title       = meta.title       || seo.default?.title || site.name || 'Noble Education';
    const description = meta.description || seo.default?.description || '';
    const ogImage     = meta.ogImage     || seo.default?.ogImage || site.logoUrl || '';

    document.title = title;

    setMeta('description',          description);
    setMeta('og:title',             title,       'property');
    setMeta('og:description',       description, 'property');
    setMeta('og:image',             ogImage,     'property');
    setMeta('og:type',              meta.ogType || 'website', 'property');
    setMeta('twitter:card',         meta.twitterCard || 'summary_large_image');
    setMeta('twitter:title',        title);
    setMeta('twitter:description',  description);
    if (meta.canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', meta.canonical);
    }
  } catch { /* Silently fail — SEO is non-critical */ }
}

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}='${name}']`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
