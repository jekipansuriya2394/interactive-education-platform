/**
 * Neutral SVG Data URI fallback banner to show when a custom link fails to load.
 * Prevents showing Slide #1 repeatedly on broken custom image links.
 */
export const FALLBACK_SLIDE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230f172a"/><rect x="20" y="20" width="760" height="460" rx="16" fill="none" stroke="%23334155" stroke-width="3"/><circle cx="400" cy="210" r="44" fill="%231e293b" stroke="%2338bdf8" stroke-width="2"/><text x="400" y="218" font-family="sans-serif" font-size="32" text-anchor="middle">🖼️</text><text x="400" y="310" font-family="sans-serif" font-size="22" font-weight="bold" fill="%23f8fafc" text-anchor="middle">Noble Education Announcement</text><text x="400" y="345" font-family="sans-serif" font-size="14" fill="%2394a3b8" text-anchor="middle">Custom Image Banner</text></svg>`;

/**
 * Converts any cloud storage or video share URL into a directly embeddable image URL.
 * Handles Google Drive, YouTube Videos/Shorts, Dropbox, OneDrive, Imgur.
 */
export function getEmbedImageUrl(raw) {
  if (!raw) return FALLBACK_SLIDE_SVG;
  const url = raw.trim();

  // Local public assets (starting with '/') should be served under Vite base URL
  if (url.startsWith('/')) {
    try {
      const base = import.meta.env.BASE_URL || '/';
      const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
      return cleanBase + url;
    } catch {}
  }


  // Skip data URIs (base64 uploads from device) — already embeddable
  if (url.startsWith('data:')) return url;

  // ── YouTube Video / Shorts Thumbnail ──────────────────────────────────────
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;
  }

  // ── Google Drive ─────────────────────────────────────────────────────────
  let gdId = null;

  // Match /file/d/FILE_ID or /open?id=FILE_ID or /uc?id=FILE_ID or /d/FILE_ID
  const gdRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?.*?id=)|lh3\.googleusercontent\.com\/d\/|wsrv\.nl\/\?url=.*?id=)([a-zA-Z0-9_-]+)/;
  const gdM = url.match(gdRegex);
  if (gdM && gdM[1]) {
    gdId = gdM[1];
  }

  if (!gdId) {
    const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);
    if (idParamMatch) gdId = idParamMatch[1];
  }

  // Raw Google Drive File ID (28-45 characters)
  if (!gdId && /^[a-zA-Z0-9_-]{28,45}$/.test(url)) {
    gdId = url;
  }

  if (gdId) {
    // Primary Google Drive image proxy (wsrv.nl global Cloudflare CDN worker)
    return `https://wsrv.nl/?url=https://drive.google.com/uc?id=${gdId}`;
  }

  // ── Dropbox ──────────────────────────────────────────────────────────────
  if (url.includes('dropbox.com')) {
    return url
      .replace(/[?&]dl=0/, (m) => m.replace('dl=0', 'dl=1'))
      .replace(/[?&]raw=0/, (m) => m.replace('raw=0', 'raw=1'));
  }

  // ── OneDrive ─────────────────────────────────────────────────────────────
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
    try {
      const encoded = btoa(url)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
      return `https://api.onedrive.com/v1.0/shares/u!${encoded}/root/content`;
    } catch {
      return url;
    }
  }

  // ── Imgur ────────────────────────────────────────────────────────────────
  const imgurMatch = url.match(/imgur\.com\/(?:a\/)?([a-zA-Z0-9]{5,8})/);
  if (imgurMatch && !url.includes('i.imgur.com')) {
    return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
  }

  // Plain direct image URL — return as-is
  return url;
}

/**
 * Robust image error handler with multi-stage fallback for Google Drive links.
 */
export function handleImageError(e) {
  const currentSrc = e.target.src || '';

  // Fallback Stage 1: Try Google lh3 CDN endpoint
  if (currentSrc.includes('wsrv.nl/?url=https://drive.google.com/uc?id=')) {
    const gdId = currentSrc.split('id=')[1]?.split('&')[0];
    if (gdId) {
      e.target.src = `https://lh3.googleusercontent.com/d/${gdId}`;
      return;
    }
  }

  // Fallback Stage 2: Try Google Drive thumbnail endpoint
  if (currentSrc.includes('lh3.googleusercontent.com/d/')) {
    const fileId = currentSrc.split('lh3.googleusercontent.com/d/')[1]?.split('?')[0];
    if (fileId) {
      e.target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      return;
    }
  }

  e.target.onerror = null;
  e.target.src = FALLBACK_SLIDE_SVG;
}

/**
 * Detects the source type of a URL for display purposes.
 */
export function detectImageUrlSource(url) {
  if (!url) return null;
  if (url.startsWith('data:video/')) return 'video';
  if (url.startsWith('data:')) return 'upload';
  if (/drive\.google\.com|googleusercontent\.com|wsrv\.nl/.test(url)) return 'googledrive';
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/dropbox\.com/.test(url)) return 'dropbox';
  if (/1drv\.ms|onedrive\.live\.com/.test(url)) return 'onedrive';
  if (/imgur\.com|imgbb\.com|ibb\.co|postimages\.org|cloudinary\.com/.test(url)) return 'direct';
  if (/\.(jpg|jpeg|png|webp|gif|bmp|svg)(\?|$)/i.test(url)) return 'direct';
  return 'unknown';
}

/**
 * Converts a YouTube URL (watch, shorts, youtu.be) into an embeddable iframe URL
 */
export function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  return '';
}

/**
 * Checks if a given item, URL, or data URI is video content
 */
export function isVideoMedia(item) {
  if (!item) return false;
  if (typeof item === 'object') {
    if (item.mediaType === 'video' || (item.videoUrl && item.videoUrl.trim())) return true;
    item = item.image || item.url || '';
  }
  if (typeof item !== 'string') return false;
  if (item.startsWith('data:video/')) return true;
  if (/\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(item)) return true;
  if (/youtube\.com|youtu\.be|vimeo\.com/.test(item)) return true;
  return false;
}

