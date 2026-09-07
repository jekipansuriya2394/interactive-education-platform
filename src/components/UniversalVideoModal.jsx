import React, { useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { FiVideo, FiPlay } from 'react-icons/fi';
import { getYouTubeEmbedUrl, getEmbedMediaUrl, isVideoMedia } from '../utils/imageUrl';

export default function UniversalVideoModal({ item, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  let rawVideoSrc = item.videoUrl || (isVideoMedia(item) ? (item.image || item.url) : '');
  if (typeof rawVideoSrc === 'string') {
    rawVideoSrc = rawVideoSrc.trim();
    if (rawVideoSrc.startsWith('images/') || rawVideoSrc.startsWith('videos/')) {
      rawVideoSrc = '/' + rawVideoSrc;
    }
  }

  const ytEmbedUrl = getYouTubeEmbedUrl(rawVideoSrc);
  const isShorts = (rawVideoSrc || '').includes('/shorts/') || item.aspectRatio === '9/16' || item.aspectRatio === 'vertical';

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl w-full ${
          isShorts ? 'max-w-md' : 'max-w-4xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-white/10 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0">
              <FiPlay className="text-sm ml-0.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white truncate">
                {item.title || item.name || 'Video Preview'}
              </h3>
              {(item.category || item.tagline || item.school || item.schoolName) && (
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block truncate">
                  {item.category || item.tagline || item.school || item.schoolName}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-md flex-shrink-0"
            aria-label="Close Video"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        {/* Video Frame */}
        <div 
          className="relative w-full bg-black flex items-center justify-center overflow-hidden"
          style={{ aspectRatio: isShorts ? '9/16' : '16/9', maxHeight: '75vh' }}
        >
          {ytEmbedUrl ? (
            <iframe
              src={ytEmbedUrl}
              title={item.title || item.name || 'YouTube Video Player'}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              controls
              autoPlay
              playsInline
              preload="auto"
              className="w-full h-full object-contain bg-black"
            >
              <source src={getEmbedMediaUrl(rawVideoSrc)} type="video/mp4" />
              <source src={getEmbedMediaUrl(rawVideoSrc)} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Footer Details */}
        {(item.description || item.desc || item.details) && (
          <div className="p-4 bg-slate-950/60 border-t border-white/10 text-slate-300 text-xs font-light leading-relaxed">
            {item.description || item.desc || item.details}
          </div>
        )}
      </div>
    </div>
  );
}
