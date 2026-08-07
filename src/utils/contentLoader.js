/**
 * Content Loader Utility
 * Reads directly from content/*.json schemas as source-of-truth.
 */

import websiteData from '../../content/website.json';
import homeData from '../../content/home.json';
import aboutData from '../../content/about.json';
import coursesData from '../../content/courses.json';
import galleryData from '../../content/gallery.json';
import facultyData from '../../content/faculty.json';
import testimonialsData from '../../content/testimonials.json';
import faqData from '../../content/faq.json';
import announcementData from '../../content/announcement.json';
import settingsData from '../../content/settings.json';
import footerData from '../../content/footer.json';
import contactData from '../../content/contact.json';
import seoData from '../../content/seo.json';
import navigationData from '../../content/navigation.json';
import popupData from '../../content/popup.json';
import socialData from '../../content/social.json';

const CONTENT_MAP = {
  website: websiteData,
  home: homeData,
  about: aboutData,
  courses: coursesData,
  gallery: galleryData,
  faculty: facultyData,
  testimonials: testimonialsData,
  faq: faqData,
  announcement: announcementData,
  settings: settingsData,
  footer: footerData,
  contact: contactData,
  seo: seoData,
  navigation: navigationData,
  popup: popupData,
  social: socialData
};

const CACHE_PREFIX = 'noble_content_cache_';

export function getContent(key) {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn(`Failed to read cached content for ${key}:`, e);
  }

  return CONTENT_MAP[key] || null;
}

export function saveContentCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('noble_content_updated', { detail: { key, data } }));
    return true;
  } catch (e) {
    console.error(`Failed to cache content for ${key}:`, e);
    return false;
  }
}

export function getAllContent() {
  const all = {};
  Object.keys(CONTENT_MAP).forEach(key => {
    all[key] = getContent(key);
  });
  return all;
}
