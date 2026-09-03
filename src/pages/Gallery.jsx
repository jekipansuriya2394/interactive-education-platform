import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FiImage, FiAlertTriangle, FiX, FiChevronLeft, FiChevronRight, FiLoader, FiPlay, FiVideo } from 'react-icons/fi';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl, getYouTubeEmbedUrl, isVideoMedia } from '../utils/imageUrl';

function GalleryImg({ src, alt, className, style }) {
  const embedSrc = getEmbedImageUrl(src);
  const [status, setStatus] = useState('loading');

  if (!embedSrc) return (
    <div style={{ background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 220, borderRadius: '1.5rem' }}>
      <FiImage size={36} color="#94a3b8" />
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: status !== 'ok' ? 160 : 'auto', width: '100%' }}>
      {status !== 'error' && (
        <img
          src={embedSrc}
          alt={alt || 'Gallery Photo'}
          className={className || "w-full h-auto object-cover rounded-3xl group-hover:scale-[1.015] transition-transform duration-300"}
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
          style={style || { display: status === 'error' ? 'none' : 'block' }}
        />
      )}
      {status === 'loading' && (
        <div className="w-full rounded-3xl bg-slate-100 animate-pulse" style={{ height: 200 }} />
      )}
      {status === 'error' && (
        <div className="w-full rounded-3xl bg-red-50 border border-red-100 flex flex-col items-center justify-center gap-2 text-center px-4" style={{ height: 160 }}>
          <FiAlertTriangle size={24} className="text-red-400" />
          <p className="text-xs text-red-500 font-semibold">Image could not be loaded</p>
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [items, setItems] = useState(() => adminData.getData('gallery') || []);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [lightboxLoading, setLightboxLoading] = useState(true);
  const [lightboxError, setLightboxError] = useState(false);

  useEffect(() => {
    const refreshGallery = () => setItems(adminData.getData('gallery') || []);
    refreshGallery();
    const cleanup = adminData.initSync(refreshGallery);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  // Reset lightbox loading & error state whenever selectedIndex changes
  useEffect(() => {
    setLightboxLoading(true);
    setLightboxError(false);
  }, [selectedIndex]);

  const categories = ['All', 'Videos', 'Classrooms', 'Seminars', 'Activities', 'Events'];

  const filteredItems = activeFilter === 'All'
    ? items
    : activeFilter === 'Videos'
    ? items.filter(i => i.category === 'Videos' || i.mediaType === 'video' || isVideoMedia(i))
    : items.filter(i => i.category === activeFilter);

  const selectedItem = selectedIndex !== null && filteredItems[selectedIndex] ? filteredItems[selectedIndex] : null;

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
      if (e.key === 'ArrowLeft') setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      if (e.key === 'ArrowRight') setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, filteredItems.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  const getRawSrc = (item) => {
    if (!item) return '';
    return item.image || item.url || item.src || (typeof item === 'string' ? item : '');
  };

  const isItemVideo = selectedItem ? (selectedItem.mediaType === 'video' || selectedItem.category === 'Videos' || isVideoMedia(selectedItem)) : false;
  const rawVideoSrc = selectedItem ? (selectedItem.videoUrl || (isItemVideo ? getRawSrc(selectedItem) : '')) : '';
  const ytEmbedUrl = isItemVideo ? getYouTubeEmbedUrl(rawVideoSrc) : '';
  const currentEmbedSrc = selectedItem ? getEmbedImageUrl(getRawSrc(selectedItem)) : '';

  // Lightbox Modal JSX (Rendered directly at document.body via Portal to cover Navbar & full page)
  const lightboxModal = selectedItem ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
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
      {/* Prominent Red Close Button (Always visible at top right) */}
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

      {/* Previous Arrow */}
      {filteredItems.length > 1 && (
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
      {filteredItems.length > 1 && (
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
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8' }}>Loading Photo...</p>
          </div>
        )}

        {/* Error Display */}
        {lightboxError && (
          <div style={{ background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '32px', borderRadius: '24px', textAlign: 'center', maxWidth: '400px' }}>
            <FiAlertTriangle size={44} style={{ margin: '0 auto 12px', color: '#f59e0b' }} />
            <h3 style={{ fontWeight: 800, fontSize: '18px', margin: '0 0 4px', color: '#ffffff' }}>Image Preview Unavailable</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>{selectedItem.title || 'Selected Photo'}</p>
            <button
              onClick={() => setSelectedIndex(null)}
              style={{ padding: '8px 20px', background: '#1C2E60', color: '#ffffff', fontSize: '12px', fontWeight: 700, borderRadius: '30px', border: 'none', cursor: 'pointer' }}
            >
              Close Preview
            </button>
          </div>
        )}

        {/* Main Lightbox Photo or Video */}
        {!lightboxError && (
          isItemVideo ? (
            ytEmbedUrl ? (
              <iframe
                key={ytEmbedUrl}
                src={ytEmbedUrl}
                title={selectedItem.title || 'Campus Video'}
                style={{
                  width: '90vw',
                  maxWidth: '960px',
                  aspectRatio: '16/9',
                  borderRadius: '16px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}
                onLoad={() => setLightboxLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                key={rawVideoSrc}
                src={rawVideoSrc}
                controls
                autoPlay
                poster={currentEmbedSrc}
                onLoadedData={() => setLightboxLoading(false)}
                onError={() => {
                  setLightboxLoading(false);
                  setLightboxError(true);
                }}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '78vh',
                  borderRadius: '16px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}
              />
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
        {!lightboxLoading && !lightboxError && selectedItem.title && (
          <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '600px', background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)', padding: '10px 24px', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, margin: 0 }}>{selectedItem.title}</h3>
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

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">

      {/* Hero Header */}
      <section
        className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-gallery-hero.png')}')`, backgroundPosition: 'center 60%' }}
      >
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Life at Academy
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Our Campus Gallery
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Take a look at our classrooms, interactive board setups, counseling seminars, and mock practice halls.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center gap-3 flex-wrap">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveFilter(cat); setSelectedIndex(null); }}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
              activeFilter === cat
                ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-md'
                : 'bg-white text-zinc-500 border-slate-200 hover:text-[#0F172A] hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-24">
            <FiImage size={48} className="mx-auto text-zinc-300 mb-4" />
            <p className="text-zinc-400 font-semibold">No photos in this category yet.</p>
            <p className="text-zinc-400 text-xs mt-1">Photos can be added from the Admin Panel.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => {
              const isVid = item.mediaType === 'video' || item.category === 'Videos' || isVideoMedia(item);
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className="break-inside-avoid bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
                  title={isVid ? "Click to play video" : "Click to view full screen photo"}
                >
                  <div className="relative overflow-hidden">
                    <GalleryImg src={item.image || item.url || item.src} alt={item.title} />
                    {isVid && (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/60 group-hover:scale-110 transition-transform">
                            <FiPlay size={24} style={{ marginLeft: 2 }} />
                          </div>
                        </div>
                        <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                          <FiVideo size={12} /> Video
                        </span>
                      </>
                    )}
                  </div>
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

      {/* React Portal: Render Lightbox Modal directly at document.body to cover Navbar & entire viewport */}
      {typeof document !== 'undefined' && lightboxModal ? ReactDOM.createPortal(lightboxModal, document.body) : null}
    </div>
  );
}
