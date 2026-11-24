import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  FiImage, FiAlertTriangle, FiX, FiChevronLeft, FiChevronRight,
  FiLoader, FiPlay, FiVideo, FiFolder, FiCalendar, FiArrowLeft,
  FiGrid, FiLayers, FiMaximize2
} from 'react-icons/fi';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl, getYouTubeEmbedUrl, isVideoMedia, isActualImage, getEmbedMediaUrl } from '../utils/imageUrl';

function GalleryImg({ src, alt, className, style }) {
  const embedSrc = getEmbedImageUrl(src);
  const [status, setStatus] = useState('loading');

  if (!embedSrc) return (
    <div style={{ background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 220, borderRadius: '1.5rem' }}>
      <FiImage size={36} color="#94a3b8" />
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-100" style={{ minHeight: status === 'loading' ? 180 : 'auto' }}>
      {status === 'loading' && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-3xl" />
      )}
      {status === 'error' ? (
        <div className="w-full h-44 bg-red-50 border border-red-100 flex flex-col items-center justify-center gap-2 text-center px-4 rounded-3xl">
          <FiAlertTriangle size={24} className="text-red-400" />
          <p className="text-xs text-red-500 font-semibold">Image could not be loaded</p>
        </div>
      ) : (
        <img
          src={embedSrc}
          alt={alt || 'Gallery Photo'}
          className={className || "w-full h-auto object-cover rounded-3xl group-hover:scale-[1.015] transition-transform duration-300 block"}
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
          style={style}
          loading="lazy"
        />
      )}
    </div>
  );
}

function GalleryMediaThumb({ item, isVid }) {
  let videoSrc = item?.videoUrl || (isVid ? (item?.image || item?.url) : '');
  if (typeof videoSrc === 'string') {
    videoSrc = videoSrc.trim();
    if (videoSrc.startsWith('images/') || videoSrc.startsWith('videos/')) videoSrc = '/' + videoSrc;
  }
  const ytMatch = (videoSrc || '').match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const isShorts = (videoSrc || '').includes('/shorts/') || item?.aspectRatio === '9/16' || item?.aspectRatio === 'vertical';
  const isSquare = item?.aspectRatio === '1/1' || item?.aspectRatio === 'square';
  const isLandscape = item?.aspectRatio === '16/9';

  let frameStyle = {};
  if (isShorts) {
    frameStyle = { aspectRatio: '9/16', maxHeight: '520px' };
  } else if (isSquare) {
    frameStyle = { aspectRatio: '1/1' };
  } else if (isLandscape) {
    frameStyle = { aspectRatio: '16/9' };
  }

  // 1. YouTube link -> official high-res YouTube thumbnail
  if (ytMatch && ytMatch[1]) {
    const ytThumb = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    return (
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl" style={frameStyle}>
        <img
          src={ytThumb}
          alt={item.title || 'Video'}
          className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.02] transition-transform duration-300"
          style={isShorts || isSquare || isLandscape ? { height: '100%', objectFit: 'cover' } : { display: 'block' }}
          onError={(e) => {
            if (item.image && isActualImage(item.image) && e.target.src !== item.image) e.target.src = item.image;
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/60 group-hover:scale-110 transition-transform">
            <FiPlay size={24} style={{ marginLeft: 2 }} />
          </div>
        </div>
        <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md z-10">
          <FiVideo size={12} /> Video
        </span>
      </div>
    );
  }

  // 2. Video with custom image poster
  const imgStr = typeof item.image === 'string' ? item.image : (item.image?.image || '');
  if (isVid && imgStr && isActualImage(imgStr) && !imgStr.includes('bg-gallery-hero')) {
    return (
      <div className="relative overflow-hidden" style={frameStyle}>
        <GalleryImg src={imgStr} alt={item.title} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/60 group-hover:scale-110 transition-transform">
            <FiPlay size={24} style={{ marginLeft: 2 }} />
          </div>
        </div>
        <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md z-10">
          <FiVideo size={12} /> Video
        </span>
      </div>
    );
  }

  // 3. Native MP4 Video without custom thumbnail
  if (isVid && videoSrc && !videoSrc.startsWith('http')) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 group" style={frameStyle}>
        <video
          src={getEmbedMediaUrl(videoSrc)}
          muted
          playsInline
          preload="metadata"
          className="w-full h-auto object-cover rounded-3xl block group-hover:scale-[1.02] transition-transform duration-300 pointer-events-none"
          style={isShorts || isSquare || isLandscape ? { height: '100%', objectFit: 'cover' } : {}}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/60 group-hover:scale-110 transition-transform">
            <FiPlay size={24} style={{ marginLeft: 2 }} />
          </div>
        </div>
        <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md z-10">
          <FiVideo size={12} /> Video
        </span>
      </div>
    );
  }

  // 4. Default Photo card
  return (
    <div className="relative overflow-hidden">
      <GalleryImg src={item.image || item.url || item.src} alt={item.title} />
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [items, setItems] = useState(() => adminData.getData('gallery') || []);
  const [events, setEvents] = useState(() => adminData.getData('galleryEvents') || []);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [lightboxLoading, setLightboxLoading] = useState(true);
  const [lightboxError, setLightboxError] = useState(false);

  useEffect(() => {
    // 1. Subscribe to gallery changes
    const cleanupGallery = adminData.subscribe('gallery', (freshGallery) => {
      if (Array.isArray(freshGallery) && freshGallery.length > 0) {
        setItems(freshGallery);
      }
    });

    // 2. Subscribe to event album changes
    const cleanupEvents = adminData.subscribe('galleryEvents', (freshEvents) => {
      if (Array.isArray(freshEvents)) {
        setEvents(freshEvents);
      }
    });

    // 3. Fetch fresh data from server
    adminData.fetchKeyFromServer('gallery').then(fresh => {
      if (fresh && Array.isArray(fresh) && fresh.length > 0) {
        setItems(fresh);
      }
    });
    adminData.fetchKeyFromServer('galleryEvents').then(fresh => {
      if (fresh && Array.isArray(fresh) && fresh.length > 0) {
        setEvents(fresh);
      }
    });

    return () => {
      if (typeof cleanupGallery === 'function') cleanupGallery();
      if (typeof cleanupEvents === 'function') cleanupEvents();
    };
  }, []);

  // Reset lightbox loading & error state whenever selectedIndex changes
  useEffect(() => {
    setLightboxLoading(true);
    setLightboxError(false);
  }, [selectedIndex]);

  const categories = ['All', 'Event Albums', 'Videos', 'Classrooms', 'Seminars', 'Activities', 'Events'];

  // Current active media list for lightbox (either photos in selected event, or filtered gallery items)
  const currentMediaList = selectedEvent
    ? (selectedEvent.photos || [])
    : (
      activeFilter === 'All'
        ? items
        : activeFilter === 'Videos'
        ? items.filter(i => i.category === 'Videos' || i.mediaType === 'video' || isVideoMedia(i))
        : activeFilter === 'Event Albums'
        ? []
        : items.filter(i => i.category === activeFilter)
    );

  const selectedItem = selectedIndex !== null && currentMediaList[selectedIndex] ? currentMediaList[selectedIndex] : null;

  // Lock body scroll when full screen image lightbox is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedItem]);

  // Keyboard controls for lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') setSelectedIndex(prev => (prev > 0 ? prev - 1 : currentMediaList.length - 1));
      if (e.key === 'ArrowRight') setSelectedIndex(prev => (prev < currentMediaList.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, currentMediaList.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : currentMediaList.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex(prev => (prev < currentMediaList.length - 1 ? prev + 1 : 0));
  };

  const getRawSrc = (item) => {
    if (!item) return '';
    let src = item.videoUrl || item.image || item.url || item.src || (typeof item === 'string' ? item : '');
    if (typeof src === 'string') {
      src = src.trim();
      if (src.startsWith('images/') || src.startsWith('videos/')) src = '/' + src;
    }
    return src;
  };

  const isItemVideo = selectedItem ? (selectedItem.mediaType === 'video' || selectedItem.category === 'Videos' || !!selectedItem.videoUrl || isVideoMedia(selectedItem)) : false;
  let rawVideoSrc = selectedItem ? (selectedItem.videoUrl || (isItemVideo ? getRawSrc(selectedItem) : '')) : '';
  if (typeof rawVideoSrc === 'string') {
    rawVideoSrc = rawVideoSrc.trim();
    if (rawVideoSrc.startsWith('images/') || rawVideoSrc.startsWith('videos/')) rawVideoSrc = '/' + rawVideoSrc;
  }
  const ytEmbedUrl = isItemVideo ? getYouTubeEmbedUrl(rawVideoSrc) : '';
  const currentEmbedSrc = selectedItem ? getEmbedImageUrl(getRawSrc(selectedItem)) : '';
  const isVertical = selectedItem ? (
    selectedItem.aspectRatio === '9/16' ||
    selectedItem.aspectRatio === 'vertical' ||
    (rawVideoSrc && rawVideoSrc.includes('/shorts/'))
  ) : false;
  const isSquare = selectedItem ? (selectedItem.aspectRatio === '1/1' || selectedItem.aspectRatio === 'square') : false;

  // Lightbox Modal JSX
  const lightboxModal = selectedItem ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 2147483647,
        backgroundColor: 'rgba(0, 0, 0, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        userSelect: 'none'
      }}
      onClick={() => setSelectedIndex(null)}
    >
      {/* Prominent Red Close Button */}
      <button
        onClick={() => setSelectedIndex(null)}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 2147483647,
          background: '#DC2626',
          color: '#ffffff',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          borderRadius: '50px',
          padding: '8px 20px',
          fontSize: '14px',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 8px 24px rgba(220, 38, 38, 0.7)'
        }}
        aria-label="Close full screen view"
      >
        <FiX size={18} />
        <span>CLOSE</span>
      </button>

      {/* Counter Tag */}
      <div
        style={{
          position: 'fixed',
          top: '28px',
          left: '24px',
          zIndex: 2147483647,
          background: 'rgba(28, 46, 96, 0.85)',
          color: '#ffffff',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 700,
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {selectedEvent ? `${selectedEvent.name} • ` : ''}
        {selectedIndex + 1} / {currentMediaList.length}
      </div>

      {/* Previous Arrow */}
      {currentMediaList.length > 1 && (
        <button
          onClick={handlePrev}
          style={{
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2147483647,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(28, 46, 96, 0.85)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            color: '#ffffff',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
          }}
          aria-label="Previous photo"
        >
          <FiChevronLeft size={30} />
        </button>
      )}

      {/* Next Arrow */}
      {currentMediaList.length > 1 && (
        <button
          onClick={handleNext}
          style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2147483647,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(28, 46, 96, 0.85)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            color: '#ffffff',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
          }}
          aria-label="Next photo"
        >
          <FiChevronRight size={30} />
        </button>
      )}

      {/* Lightbox Content Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          minHeight: '320px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading Spinner */}
        {lightboxLoading && !lightboxError && (
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: '#ffffff' }}>
            <FiLoader size={40} className="animate-spin text-blue-400" />
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8' }}>Loading Media...</p>
          </div>
        )}

        {/* Error Display */}
        {lightboxError && (
          <div style={{ background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '32px', borderRadius: '24px', textAlign: 'center', maxWidth: '420px' }}>
            <FiAlertTriangle size={44} style={{ margin: '0 auto 12px', color: '#f59e0b' }} />
            <h3 style={{ fontWeight: 800, fontSize: '18px', margin: '0 0 4px', color: '#ffffff' }}>
              {isItemVideo ? 'Video Playback Issue' : 'Image Preview Unavailable'}
            </h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>{selectedItem.title || 'Selected Media'}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {isItemVideo && rawVideoSrc && (
                <a
                  href={rawVideoSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: '8px 20px', background: '#DC2626', color: '#ffffff', fontSize: '12px', fontWeight: 700, borderRadius: '30px', textDecoration: 'none' }}
                >
                  Play Video Directly
                </a>
              )}
              <button
                onClick={() => setSelectedIndex(null)}
                style={{ padding: '8px 20px', background: '#1C2E60', color: '#ffffff', fontSize: '12px', fontWeight: 700, borderRadius: '30px', border: 'none', cursor: 'pointer' }}
              >
                Close Preview
              </button>
            </div>
          </div>
        )}

        {/* Main Lightbox Photo or Video */}
        {!lightboxError && (
          isItemVideo ? (
            ytEmbedUrl ? (
              <div
                style={{
                  width: '90vw',
                  maxWidth: isVertical ? '420px' : (isSquare ? '600px' : '960px'),
                  aspectRatio: isVertical ? '9/16' : (isSquare ? '1/1' : '16/9'),
                  maxHeight: '82vh',
                  position: 'relative'
                }}
              >
                <iframe
                  key={ytEmbedUrl}
                  src={ytEmbedUrl}
                  title={selectedItem.title || 'Campus Video'}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onLoad={() => setLightboxLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                key={getEmbedMediaUrl(rawVideoSrc)}
                src={getEmbedMediaUrl(rawVideoSrc)}
                controls
                autoPlay
                playsInline
                preload="auto"
                poster={currentEmbedSrc && isActualImage(currentEmbedSrc) && !currentEmbedSrc.includes('bg-gallery-hero') ? currentEmbedSrc : undefined}
                onLoadedData={() => setLightboxLoading(false)}
                onCanPlay={() => setLightboxLoading(false)}
                onLoadedMetadata={() => setLightboxLoading(false)}
                onPlay={() => setLightboxLoading(false)}
                onError={() => {
                  setLightboxLoading(false);
                  setLightboxError(true);
                }}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '82vh',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  objectFit: 'contain',
                  background: '#000'
                }}
              >
                <source src={getEmbedMediaUrl(rawVideoSrc)} type="video/mp4" />
                <source src={getEmbedMediaUrl(rawVideoSrc)} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <img
              key={currentEmbedSrc}
              src={currentEmbedSrc}
              alt={selectedItem.title || 'Campus Photo'}
              onLoad={() => setLightboxLoading(false)}
              onError={() => {
                setLightboxLoading(false);
                setLightboxError(true);
              }}
              style={{
                maxWidth: '90vw',
                maxHeight: '78vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: lightboxLoading ? 0 : 1,
                transform: lightboxLoading ? 'scale(0.95)' : 'scale(1)',
                margin: '0 auto'
              }}
            />
          )
        )}

        {/* Photo Title Caption */}
        {!lightboxLoading && !lightboxError && (selectedItem.title || selectedItem.caption) && (
          <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '640px', background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(8px)', padding: '10px 24px', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, margin: 0 }}>
              {selectedItem.title || selectedItem.caption}
            </h3>
            {selectedItem.category && (
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#93c5fd', background: 'rgba(30, 58, 138, 0.8)', border: '1px solid rgba(96, 165, 250, 0.4)', padding: '2px 10px', borderRadius: '20px', marginTop: '6px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {selectedItem.category}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: Selected Event Photo Album View
  // ─────────────────────────────────────────────────────────────────────────────
  if (selectedEvent) {
    const eventPhotos = selectedEvent.photos || [];
    return (
      <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472] min-h-screen">
        {/* Event Header Banner */}
        <section
          className="py-16 text-white text-center relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${getEmbedImageUrl(selectedEvent.coverImage || eventPhotos[0]?.image || '/images/bg-gallery-hero.png')}')`,
            backgroundPosition: 'center 60%'
          }}
        >
          <div className="absolute inset-0 bg-[#1C2E60]/85 w-full h-full backdrop-blur-[2px]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Albums button */}
            <div className="flex justify-start mb-6">
              <button
                onClick={() => { setSelectedEvent(null); setSelectedIndex(null); }}
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all shadow-md border border-white/20 cursor-pointer"
              >
                <FiArrowLeft size={16} /> Back to Gallery
              </button>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest bg-red-500/20 text-red-300 px-3.5 py-1.5 rounded-full border border-red-500/30 mb-4">
              <FiFolder size={13} /> {selectedEvent.category || 'Event Album'} • {eventPhotos.length} Photos
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              {selectedEvent.name}
            </h1>

            {selectedEvent.date && (
              <p className="inline-flex items-center gap-1.5 text-zinc-300 text-sm font-medium mb-3">
                <FiCalendar size={14} className="text-amber-400" /> {selectedEvent.date}
              </p>
            )}

            {selectedEvent.description && (
              <p className="text-zinc-200 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto mt-2">
                {selectedEvent.description}
              </p>
            )}
          </div>
        </section>

        {/* Event Photos Masonry Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-[#1C2E60] flex items-center gap-2.5">
                <FiLayers className="text-[#DC2626]" /> Photos in this Event
              </h2>
              <p className="text-xs text-slate-500 mt-1">Click on any photo to open full-screen lightbox preview</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              {eventPhotos.length} Photo{eventPhotos.length === 1 ? '' : 's'}
            </span>
          </div>

          {eventPhotos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <FiImage size={48} className="mx-auto text-zinc-300 mb-3" />
              <p className="text-slate-600 font-bold">No photos added to this event yet.</p>
              <p className="text-slate-400 text-xs mt-1">Photos can be added to this event from the Admin Panel.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {eventPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className="break-inside-avoid mb-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
                  title="Click to view full photo"
                >
                  <div className="relative overflow-hidden">
                    <GalleryImg src={photo.image || photo.url} alt={photo.title} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-11 h-11 rounded-full bg-white text-[#1C2E60] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                        <FiMaximize2 size={18} />
                      </div>
                    </div>
                  </div>
                  {photo.title && (
                    <div className="px-5 py-3.5 bg-white border-t border-slate-100">
                      <p className="font-bold text-[#0f172a] text-sm">{photo.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {typeof document !== 'undefined' && lightboxModal ? ReactDOM.createPortal(lightboxModal, document.body) : null}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: Main Gallery View (Event Albums + Photos & Videos)
  // ─────────────────────────────────────────────────────────────────────────────
  const isViewingEventsOnly = activeFilter === 'Event Albums';

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">

      {/* Hero Header */}
      <section
        className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-gallery-hero.png')}')`, backgroundPosition: 'center 60%' }}
      >
        <div className="absolute inset-0 bg-[#1C2E60]/80 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Life at Academy
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Our Campus Gallery & Event Albums
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Explore our event photo groups, felicitation ceremonies, interactive classrooms, and campus moments.
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-white shadow-md">
              <FiFolder className="text-amber-400" size={16} />
              <span>{events.length} Event Albums</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-white shadow-md">
              <FiImage className="text-blue-400" size={16} />
              <span>{items.length} Campus Photos & Videos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center gap-3 flex-wrap">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveFilter(cat); setSelectedIndex(null); }}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
              activeFilter === cat
                ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-md scale-105'
                : 'bg-white text-zinc-500 border-slate-200 hover:text-[#0F172A] hover:border-slate-300'
            }`}
          >
            {cat === 'Event Albums' ? `🏆 ${cat} (${events.length})` : cat}
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          SECTION 1: Event Albums (Photo Groups)
          Show in 'All' or when 'Event Albums' / 'Events' filter is active
         ───────────────────────────────────────────────────────────────────────────── */}
      {(activeFilter === 'All' || activeFilter === 'Event Albums' || activeFilter === 'Events') && events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-10">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-[#1C2E60] flex items-center gap-2.5">
                <FiFolder className="text-[#DC2626]" /> Event Photo Albums
              </h2>
              <p className="text-xs text-slate-500 mt-1">Click any event album below to view all its photos</p>
            </div>
            {activeFilter !== 'Event Albums' && (
              <button
                onClick={() => setActiveFilter('Event Albums')}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
              >
                View all ({events.length}) albums →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {events.map((evt) => {
              const photoCount = evt.photos ? evt.photos.length : 0;
              const cover = evt.coverImage || (evt.photos && evt.photos[0]?.image) || '/images/bg-gallery-hero.png';
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="group relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Visual Stack Effect (giving an authentic physical photo album depth) */}
                  <div className="relative h-60 overflow-hidden bg-slate-900">
                    <img
                      src={getEmbedImageUrl(cover)}
                      alt={evt.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Photo count pill badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-black tracking-wide border border-white/20 flex items-center gap-1.5 shadow-lg">
                      <FiImage size={13} className="text-amber-400" />
                      <span>{photoCount} Photo{photoCount === 1 ? '' : 's'}</span>
                    </div>

                    {/* Category tag */}
                    <span className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {evt.category || 'Event'}
                    </span>

                    {/* Date at bottom of image */}
                    {evt.date && (
                      <div className="absolute bottom-3 left-4 text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <FiCalendar size={13} className="text-amber-400" /> {evt.date}
                      </div>
                    )}
                  </div>

                  {/* Album Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-lg text-[#1C2E60] group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2">
                        {evt.name}
                      </h3>
                      {evt.description && (
                        <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-[#DC2626] transition-colors">
                      <span className="flex items-center gap-1.5">
                        <FiFolder size={14} /> Open Album Group
                      </span>
                      <span>View {photoCount} Photos →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          SECTION 2: All Individual Photos & Videos Grid
          (Hidden if user strictly clicks 'Event Albums')
         ───────────────────────────────────────────────────────────────────────────── */}
      {!isViewingEventsOnly && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-[#1C2E60] flex items-center gap-2.5">
                <FiGrid className="text-[#DC2626]" /> {activeFilter === 'All' ? 'Campus Photos & Videos' : `${activeFilter} Photos`}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Click on any photo or video to view full screen</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              {currentMediaList.length} Item{currentMediaList.length === 1 ? '' : 's'}
            </span>
          </div>

          {currentMediaList.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <FiImage size={48} className="mx-auto text-zinc-300 mb-4" />
              <p className="text-zinc-600 font-bold">No photos in this category yet.</p>
              <p className="text-zinc-400 text-xs mt-1">Photos can be added from the Admin Panel.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {currentMediaList.map((item, idx) => {
                const isVid = item.mediaType === 'video' || item.category === 'Videos' || isVideoMedia(item);
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className="break-inside-avoid mb-6 bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
                    title={isVid ? "Click to play video" : "Click to view full screen photo"}
                  >
                    <GalleryMediaThumb item={item} isVid={isVid} />
                    {item.title && (
                      <div className="px-5 py-4">
                        <p className="font-bold text-[#0f172a] text-sm">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {item.category && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider">
                              {item.category}
                            </span>
                          )}
                          {isVid && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider">
                              Video
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* React Portal Lightbox Modal */}
      {typeof document !== 'undefined' && lightboxModal ? ReactDOM.createPortal(lightboxModal, document.body) : null}
    </div>
  );
}
