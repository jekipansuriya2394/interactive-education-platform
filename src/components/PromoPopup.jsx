import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigate } from '../utils/router';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl, handleImageError, FALLBACK_SLIDE_SVG } from '../utils/imageUrl';
import { jagannathPosterB64 } from '../data/jagannathB64';
import { neetRepeaterB64 } from '../data/neetRepeaterB64';
import { jeePyqB64 } from '../data/jeePyqB64';

export default function PromoPopup({ isLoading, currentPath }) {
  const [showPopup, setShowPopup] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [popupConfig, setPopupConfig] = useState(() => adminData.getData('popupConfig') || {});

  useEffect(() => { setShowPopup(true); }, [currentPath, isLoading]);

  useEffect(() => {
    const syncConfig = () => {
      setPopupConfig(adminData.getData('popupConfig') || {});
    };
    syncConfig();
    window.addEventListener('noble_admin_data_change', syncConfig);
    window.addEventListener('storage', syncConfig);
    return () => {
      window.removeEventListener('noble_admin_data_change', syncConfig);
      window.removeEventListener('storage', syncConfig);
    };
  }, []);

  const handleClosePopup = () => setShowPopup(false);

  const defaultSlides = [
    { id: '1', url: '/images/jagannath_rath_yatra.jpg', title: 'Jagannath Rath Yatra 2026 Blessings', sizePercent: 100 },
    { id: '2', url: '/images/neet_repeater_banner.jpg', title: 'NEET Repeater Batch Admission Open 2026', sizePercent: 100 },
    { id: '3', url: '/images/jee_mains_pyq_banner.jpg', title: 'JEE Mains & Advanced Special PYQ Batch', sizePercent: 100 }
  ];

  const rawSlides = popupConfig.images && Array.isArray(popupConfig.images) && popupConfig.images.length > 0
    ? popupConfig.images : defaultSlides;

  const slides = rawSlides.map(s => {
    let src = s.url || s.image || s;
    if (typeof src === 'string') {
      if (src === '/images/jagannath_rath_yatra.jpg' || src === '/images/popup_banner.jpg') src = jagannathPosterB64;
      else if (src === '/images/neet_repeater_banner.jpg') src = neetRepeaterB64;
      else if (src === '/images/jee_mains_pyq_banner.jpg') src = jeePyqB64;
      else if (!src.startsWith('data:')) src = getEmbedImageUrl(src);
    }
    return { ...s, displayUrl: src || FALLBACK_SLIDE_SVG, sizePercent: Number(s.sizePercent) || 100 };
  });

  const isEnabled = popupConfig.enabled !== false;
  const isAutoSlide = popupConfig.autoSlide !== false;
  const isVisible = showPopup && isEnabled && slides.length > 0 && !isLoading;

  useEffect(() => {
    if (isVisible) { document.body.style.overflow = 'hidden'; document.documentElement.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; };
  }, [isVisible]);

  useEffect(() => {
    if (!isEnabled || !isAutoSlide || slides.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, popupConfig.interval || 3500);
    return () => clearInterval(timer);
  }, [slides.length, isEnabled, isAutoSlide, popupConfig.interval]);

  if (!showPopup || !isEnabled || slides.length === 0) return null;

  const currentSlide = slides[currentIndex % slides.length] || slides[0];
  const nextSlide = (e) => { if (e) e.stopPropagation(); setDirection(1); setCurrentIndex(prev => (prev + 1) % slides.length); };
  const prevSlide = (e) => { if (e) e.stopPropagation(); setDirection(-1); setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length); };
  const redirectLink = currentSlide.link || popupConfig.link || '/contact';

  // Dynamic percentage sizing calculation
  const slideSizePercent = Number(currentSlide?.sizePercent) || 100;
  const globalPopupScale = Number(popupConfig.popupScalePercent || popupConfig.popupSize) || 100;
  const effectiveScale = (globalPopupScale * slideSizePercent) / 10000; // 1.0 = 100%

  // Compute responsive maximums based on scale percentage
  const modalMaxWidth = Math.min(Math.max(Math.round(500 * effectiveScale), 260), 960);
  const mobileWidthVw = Math.min(Math.max(Math.round(92 * effectiveScale), 60), 95);
  const modalMaxHeight = Math.min(Math.max(Math.round(78 * Math.sqrt(effectiveScale)), 50), 92);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 })
  };

  return (
    <>
      <style>{`
        .pp-backdrop {
          position: fixed; inset: 0;
          z-index: 2147483647;
          background: rgba(10, 20, 40, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; box-sizing: border-box;
          touch-action: none;
        }
        .pp-wrap {
          position: relative;
          width: 100%; max-width: 500px;
          z-index: 2147483647;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: none !important;
          box-shadow: none !important;
          transition: max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pp-close {
          position: absolute; top: -12px; right: -12px;
          z-index: 2147483648;
          width: 32px; height: 32px;
          min-width: 32px !important; min-height: 32px !important;
          max-width: 32px !important; max-height: 32px !important;
          border-radius: 50%;
          background: #1C2E60;
          border: 2px solid rgba(255,255,255,0.8);
          color: #fff; font-size: 13px; font-weight: 800;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 12px rgba(0,0,0,0.4);
          transition: all 0.25s ease;
          line-height: 1; padding: 0;
        }
        .pp-close:hover {
          transform: scale(1.1) rotate(90deg);
          background: #C9A84C;
        }
        .pp-card {
          position: relative; width: 100%;
          background: transparent;
          border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column;
          border: none !important;
          box-shadow: none !important;
        }
        .pp-img-wrap {
          position: relative; width: 100%;
          background: transparent; overflow: hidden;
          border-radius: 16px;
        }
        .pp-img {
          width: 100%; height: auto; max-height: 78vh;
          display: block; object-fit: contain;
          background: transparent;
          border-radius: 16px;
        }
        .pp-arrow {
          position: absolute; top: 50%;
          transform: translateY(-50%);
          z-index: 2147483648;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(28,46,96,0.8);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255,255,255,0.3);
          color: #fff; font-size: 18px; font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 3px 14px rgba(0,0,0,0.35);
        }
        .pp-arrow:hover {
          background: #C9A84C;
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-50%) scale(1.08);
        }
        .pp-arrow-prev { left: -52px; }
        .pp-arrow-next { right: -52px; }
        
        .pp-dots {
          position: relative;
          margin-top: 14px;
          display: flex; gap: 8px; align-items: center; justify-content: center;
          background: rgba(10,20,40,0.75);
          backdrop-filter: blur(8px);
          padding: 6px 16px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .pp-dot {
          width: 7px; height: 7px;
          min-height: 7px !important; max-height: 7px !important;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0; border: none; padding: 0;
        }
        .pp-dot:hover { background: rgba(255,255,255,0.5); }
        .pp-dot.active {
          width: 20px; border-radius: 10px;
          background: #C9A84C;
          box-shadow: 0 0 8px rgba(201,168,76,0.4);
        }

        @media (max-width: 600px) {
          .pp-wrap { max-width: 92vw; }
          .pp-close {
            top: -9px; right: -9px;
            width: 28px; height: 28px;
            min-width: 28px !important; min-height: 28px !important;
            max-width: 28px !important; max-height: 28px !important;
            font-size: 11px;
          }
          .pp-arrow { width: 32px; height: 32px; font-size: 15px; }
          .pp-arrow-prev { left: -12px; }
          .pp-arrow-next { right: -12px; }
          .pp-dots { margin-top: 10px; padding: 5px 12px; gap: 6px; }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="promo-popup-backdrop"
            className="pp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClosePopup}
          >
            <motion.div
              className="pp-wrap"
              style={{
                maxWidth: `min(${mobileWidthVw}vw, ${modalMaxWidth}px)`
              }}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300, mass: 0.7 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="pp-close" onClick={handleClosePopup} aria-label="Close">✕</button>

              {slides.length > 1 && (
                <>
                  <button className="pp-arrow pp-arrow-prev" onClick={prevSlide} aria-label="Previous">‹</button>
                  <button className="pp-arrow pp-arrow-next" onClick={nextSlide} aria-label="Next">›</button>
                </>
              )}

              <div className="pp-card">
                <a
                  href={redirectLink}
                  onClick={(e) => {
                    handleClosePopup();
                    if (redirectLink && redirectLink.startsWith('/')) { e.preventDefault(); navigate(redirectLink); }
                  }}
                  style={{ display: 'block', width: '100%', outline: 'none', textDecoration: 'none' }}
                >
                  <div className="pp-img-wrap">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      <motion.img
                        key={currentSlide.id || currentIndex}
                        className="pp-img"
                        src={currentSlide.displayUrl}
                        alt={currentSlide.title || 'Noble Education Announcement'}
                        style={{
                          maxHeight: `${modalMaxHeight}vh`
                        }}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ x: { type: 'spring', stiffness: 350, damping: 32 }, opacity: { duration: 0.2 } }}
                        onError={handleImageError}
                      />
                    </AnimatePresence>
                  </div>
                </a>
              </div>

              {/* Indicator dots placed OUTSIDE below the card */}
              {slides.length > 1 && (
                <div className="pp-dots">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`pp-dot ${idx === currentIndex % slides.length ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
