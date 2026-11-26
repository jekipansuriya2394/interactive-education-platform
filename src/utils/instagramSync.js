/**
 * instagramSync.js — Noble Education Instagram Auto-Sync Utility
 *
 * Provides functions to:
 * 1. Fetch latest Instagram posts via Instagram Graph API or JSON Feed (Behold / Curator / RSS)
 * 2. Parse and import Instagram Post/Reel URLs directly into the Gallery
 * 3. Handle Webhook payloads from automation services (Zapier, Make, Pabbly)
 * 4. Deduplicate and merge Instagram items into adminData.gallery
 */

import { adminData } from './adminData';

// Default Instagram configuration
export const DEFAULT_INSTAGRAM_CONFIG = {
  enabled: true,
  handle: 'nobleeducation_official',
  profileUrl: 'https://instagram.com/nobleeducation_official',
  syncMethod: 'webhook', // 'webhook' | 'graph_api' | 'feed_url'
  graphApiToken: '',
  feedUrl: '', // e.g. Behold.so JSON feed or custom proxy
  autoSyncOnVisit: true,
  lastSyncedAt: null,
  postsSynced: 0,
  webhookSecret: 'noble_ig_sync_2026'
};

/**
 * Extract Instagram shortcode from standard Instagram post/reel URLs
 * Supports:
 * - https://www.instagram.com/p/DF_12345/
 * - https://www.instagram.com/reel/DF_12345/
 * - https://instagr.am/p/DF_12345/
 */
export function extractInstagramShortcode(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(/(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match && match[1] ? match[1] : null;
}

/**
 * Format a raw Instagram post object into a standard Gallery item
 */
export function formatInstagramToGalleryItem(post) {
  if (!post) return null;
  const id = post.id || ('ig_' + (post.shortcode || Date.now()));
  const shortcode = post.shortcode || extractInstagramShortcode(post.permalink || post.url);
  const permalink = post.permalink || post.url || (shortcode ? `https://www.instagram.com/p/${shortcode}/` : 'https://instagram.com/nobleeducation_official');
  
  // High quality Instagram image / thumbnail
  let image = post.media_url || post.imageUrl || post.image || '';
  if (!image && shortcode) {
    image = `https://www.instagram.com/p/${shortcode}/media/?size=l`;
  }

  const isVideo = post.media_type === 'VIDEO' || post.isVideo || (permalink && permalink.includes('/reel/'));
  const caption = (post.caption || post.title || 'Noble Education Instagram Update').trim();
  const cleanTitle = caption.length > 90 ? caption.substring(0, 87) + '...' : caption;

  return {
    id: String(id),
    title: cleanTitle,
    caption: caption,
    category: 'Instagram',
    mediaType: isVideo ? 'video' : 'photo',
    image: image,
    videoUrl: isVideo ? (post.videoUrl || permalink) : '',
    permalink: permalink,
    isInstagram: true,
    aspectRatio: isVideo ? '9/16' : '1/1',
    createdAt: post.timestamp || post.createdAt || new Date().toISOString()
  };
}

/**
 * Import a single Instagram Post or Reel directly by URL
 */
export async function importInstagramByUrl(url, captionOverride = '') {
  const shortcode = extractInstagramShortcode(url);
  if (!shortcode) {
    throw new Error('Invalid Instagram URL. Please enter a valid post or reel link (e.g. https://www.instagram.com/p/ABC123xyz/)');
  }

  const permalink = `https://www.instagram.com/p/${shortcode}/`;
  const isReel = url.includes('/reel/');

  // Standard Instagram media embed fallback
  const directImageUrl = `https://www.instagram.com/p/${shortcode}/media/?size=l`;

  const newItem = {
    id: `ig_${shortcode}`,
    title: captionOverride.trim() || `Noble Education Instagram ${isReel ? 'Reel' : 'Post'}`,
    caption: captionOverride.trim() || `View this update on @nobleeducation_official`,
    category: 'Instagram',
    mediaType: isReel ? 'video' : 'photo',
    image: directImageUrl,
    videoUrl: isReel ? permalink : '',
    permalink: permalink,
    isInstagram: true,
    aspectRatio: isReel ? '9/16' : '1/1',
    createdAt: new Date().toISOString()
  };

  // Merge into existing gallery
  const currentGallery = adminData.getData('gallery') || [];
  const exists = currentGallery.some(item => item.id === newItem.id || item.permalink === permalink);

  let updatedGallery;
  if (exists) {
    updatedGallery = currentGallery.map(item => (item.id === newItem.id || item.permalink === permalink) ? { ...item, ...newItem } : item);
  } else {
    updatedGallery = [newItem, ...currentGallery];
  }

  await adminData.setDataAsync('gallery', updatedGallery);
  return newItem;
}

/**
 * Fetch and sync latest posts from an external JSON feed or Instagram Graph API
 */
export async function syncInstagramFeed() {
  const config = adminData.getData('instagramConfig') || DEFAULT_INSTAGRAM_CONFIG;
  if (!config.enabled) return { success: false, message: 'Instagram sync is disabled in settings.' };

  let rawPosts = [];

  // Option 1: Custom JSON feed URL (e.g. Behold.so / Curator.io / RSS proxy)
  if (config.feedUrl && config.feedUrl.trim()) {
    try {
      const res = await fetch(config.feedUrl.trim());
      if (!res.ok) throw new Error(`Feed HTTP error ${res.status}`);
      const data = await res.json();
      rawPosts = Array.isArray(data) ? data : (data.posts || data.data || data.items || []);
    } catch (err) {
      console.warn('[instagramSync] Failed fetching custom feed URL:', err);
    }
  }

  // Option 2: Instagram Graph API (if Long-Lived Token provided)
  if (rawPosts.length === 0 && config.graphApiToken && config.graphApiToken.trim()) {
    try {
      const endpoint = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${encodeURIComponent(config.graphApiToken.trim())}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`Graph API error ${res.status}`);
      const data = await res.json();
      rawPosts = data.data || [];
    } catch (err) {
      console.warn('[instagramSync] Failed fetching Instagram Graph API:', err);
    }
  }

  if (rawPosts.length === 0) {
    return {
      success: false,
      message: 'No new posts found or feed/token not configured yet. Configure Webhook or Feed URL in Admin Panel.'
    };
  }

  // Format incoming posts
  const formattedItems = rawPosts.map(p => {
    return formatInstagramToGalleryItem({
      id: p.id,
      caption: p.caption,
      media_type: p.media_type,
      media_url: p.media_url || p.thumbnail_url,
      permalink: p.permalink,
      timestamp: p.timestamp
    });
  }).filter(Boolean);

  if (formattedItems.length === 0) {
    return { success: false, message: 'Could not format posts from Instagram feed.' };
  }

  // Merge into gallery
  const currentGallery = adminData.getData('gallery') || [];
  const existingMap = new Map();
  currentGallery.forEach(item => {
    if (item.permalink) existingMap.set(item.permalink, item);
    if (item.id) existingMap.set(item.id, item);
  });

  const newItemsToAdd = [];
  for (const item of formattedItems) {
    if (!existingMap.has(item.permalink) && !existingMap.has(item.id)) {
      newItemsToAdd.push(item);
    }
  }

  if (newItemsToAdd.length > 0) {
    const updatedGallery = [...newItemsToAdd, ...currentGallery];
    await adminData.setDataAsync('gallery', updatedGallery);
  }

  // Update config stats
  const updatedConfig = {
    ...config,
    lastSyncedAt: new Date().toISOString(),
    postsSynced: (config.postsSynced || 0) + newItemsToAdd.length
  };
  await adminData.setDataAsync('instagramConfig', updatedConfig);

  return {
    success: true,
    addedCount: newItemsToAdd.length,
    totalCount: formattedItems.length,
    message: newItemsToAdd.length > 0
      ? `Successfully synced ${newItemsToAdd.length} new Instagram post(s)!`
      : 'Gallery is already up-to-date with your latest Instagram posts.'
  };
}
