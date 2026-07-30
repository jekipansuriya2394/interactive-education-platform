import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPhone, FiBookOpen, FiActivity, FiCompass, FiUsers, FiAward, FiMessageCircle, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { navigate } from '../utils/router';
import { coursesData } from '../data/coursesData';
import { statsData } from '../data/statsData';
import { featuresData } from '../data/featuresData';
import { contactData } from '../data/contactData';

import { inquiryService } from '../utils/inquiryService';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeCourseCategory, setActiveCourseCategory] = useState("All");
  const [homeFormSent, setHomeFormSent] = useState(false);
  const [homeFormData, setHomeFormData] = useState({ name: '', phone: '', program: 'School Coaching (8th-10th)', message: '' });
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoDir, setVideoDir] = useState(1);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [testimonialDir, setTestimonialDir] = useState(1);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);


  // Load dynamic data from adminData utility with real-time sync
  const [stats, setStats] = useState(() => adminData.getData('stats') || statsData);
  const [features, setFeatures] = useState(() => adminData.getData('features') || featuresData);
  const [contact, setContact] = useState(() => adminData.getData('contactInfo') || contactData);
  const [testimonials, setTestimonials] = useState(() => adminData.getData('testimonials') || []);
  const [videoLectures, setVideoLectures] = useState(() => adminData.getData('videoLectures') || []);
  const [pageImages, setPageImages] = useState(() => adminData.getData('pageImages') || {});
  const [homePhotos, setHomePhotos] = useState(() => {
    const pageImgs = adminData.getData('pageImages') || {};
    if (pageImgs.home && pageImgs.home.length > 0) return pageImgs.home;
    return adminData.getData('gallery') || [];
  });
  const [results, setResults] = useState(() => adminData.getData('results') || []);
  const [banners, setBanners] = useState(() => adminData.getData('heroBanners') || []);

  useEffect(() => {
    const refreshData = () => {
      setStats(adminData.getData('stats') || statsData);
      setFeatures(adminData.getData('features') || featuresData);
      setContact(adminData.getData('contactInfo') || contactData);
      setTestimonials(adminData.getData('testimonials') || []);
      setVideoLectures(adminData.getData('videoLectures') || []);
      setResults(adminData.getData('results') || []);
      const pageImgs = adminData.getData('pageImages') || {};
      setPageImages(pageImgs);
      if (pageImgs.home && pageImgs.home.length > 0) {
        setHomePhotos(pageImgs.home);
      } else {
        setHomePhotos(adminData.getData('gallery') || []);
      }
      const loadedBanners = adminData.getData('heroBanners') || [];
      if (loadedBanners.length > 0) {
        setBanners(loadedBanners);
      }
    };
    refreshData();
    const cleanup = adminData.initSync(refreshData);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const itemsPerPage = 3;
  const totalVideoPages = Math.max(1, Math.ceil(videoLectures.length / itemsPerPage));
  const currentVideoPage = videoIndex % totalVideoPages;

  // Auto slide video lectures slider ONLY if more than 3 videos exist
  useEffect(() => {
    if (videoLectures.length <= 3) return;
    const timer = setInterval(() => {
      setVideoDir(1);
      setVideoIndex(prev => (prev + 1) % Math.ceil(videoLectures.length / 3));
    }, 5000);
    return () => clearInterval(timer);
  }, [videoLectures.length]);

  const nextVideo = () => {
    if (videoLectures.length <= 3) return;
    setVideoDir(1);
    setVideoIndex(prev => (prev + 1) % totalVideoPages);
  };

  const prevVideo = () => {
    if (videoLectures.length <= 3) return;
    setVideoDir(-1);
    setVideoIndex(prev => (prev - 1 + totalVideoPages) % totalVideoPages);
  };

  // Auto slide single testimonial in center (left-to-right) every 4.5 seconds
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1 || isTestimonialHovered) return;
    const timer = setInterval(() => {
      setTestimonialDir(1);
      setActiveTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials?.length, isTestimonialHovered]);

  const nextTestimonial = () => {
    if (!testimonials || testimonials.length <= 1) return;
    setTestimonialDir(1);
    setActiveTestimonialIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (!testimonials || testimonials.length <= 1) return;
    setTestimonialDir(-1);
    setActiveTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleHomeInquiry = (e) => {
    e.preventDefault();
    inquiryService.saveInquiry({
      name: homeFormData.name,
      phone: homeFormData.phone,
      program: homeFormData.program,
      message: homeFormData.message || "Quick submission from Home page"
    });
    setHomeFormSent(true);
    setHomeFormData({ name: '', phone: '', program: 'School Coaching (8th-10th)', message: '' });
  };

  const activeHero = (banners && banners.length > 0) ? (banners[activeBanner] || banners[0]) : {};

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners?.length]);

  const courseCategories = ["All", "school", "science", "competitive", "engineering"];

  const filteredCourses = activeCourseCategory === "All"
    ? coursesData.slice(0, 8)
    : coursesData.filter(c => c.category === activeCourseCategory);

  // Helper to split title and highlight the requested word
  const renderHighlightedTitle = (banner) => {
    if (!banner || !banner.title) {
      return (
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2 leading-tight text-white">
          Noble Education Coaching
        </h1>
      );
    }
    if (!banner.highlightWord || !banner.title.includes(banner.highlightWord)) {
      return (
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2 leading-tight text-white">
          {banner.title}
        </h1>
      );
    }
    const parts = banner.title.split(banner.highlightWord);
    return (
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2 leading-tight text-white">
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-glow-red font-black">
          {banner.highlightWord}
        </span>
        {parts[1] || ''}
      </h1>
    );
  };

  return (
    <div className="bg-[#F4F6F9] text-[#5A6472] overflow-hidden">
      
      {/* 1. HERO ROTATING BANNER SLIDER */}
      <section className="relative min-h-[640px] flex items-center text-white overflow-hidden pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {activeHero.image ? (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${getEmbedImageUrl(activeHero.image)})` }}
              >
                {/* Overlay to ensure readability across all devices */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E3D] via-[#1C2E60]/95 to-[#0A1E3D]/45 w-full h-full" />
              </div>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${activeHero.bg || 'from-[#0A1E3D] via-[#1C2E60] to-[#0A1E3D]'} w-full h-full`} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Glowing Accents */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Banner Text Details */}
            <div className="lg:col-span-7">
              {/* Tagline Badge with red gradient glow */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C2E60]/50 border border-red-500/30 text-slate-100 font-extrabold text-xs tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(220,38,38,0.15)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping" />
                VADODARA'S TRUSTED COACHING & ADMISSION GUIDANCE
              </motion.div>

              {/* Rotating Highlighted Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {renderHighlightedTitle(activeHero)}
              </motion.div>

              {/* Rotating Subtitle */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl font-bold text-slate-200 tracking-wide mb-6 border-l-4 border-[#DC2626] pl-3"
              >
                {activeHero.subtitle}
              </motion.div>

              {/* Rotating Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-zinc-300 text-sm sm:text-base font-light mb-8 leading-relaxed max-w-xl"
              >
                {activeHero.desc}
              </motion.p>

              {/* Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
                <a
                  href={activeHero.buttonLink || "#inquiry-form"}
                  className="w-full sm:w-auto text-center bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.35)] flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
                >
                  {activeHero.buttonText || "Book Free Counselling"} <FiArrowRight />
                </a>
                <button
                  onClick={() => navigate('/courses')}
                  className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Explore Courses
                </button>
              </motion.div>

              {/* Slider Dots */}
              <div className="flex items-center gap-2.5 mt-10">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveBanner(idx)}
                    className={`dot-indicator h-2.5 rounded-full transition-all flex-shrink-0 border-0 outline-none p-0 cursor-pointer ${
                      activeBanner === idx ? 'bg-[#DC2626] w-7' : 'bg-white/40 hover:bg-white/70 w-2.5'
                    }`}
                    style={{ minHeight: 'unset', maxHeight: '10px' }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic floating student result highlights list */}
            {activeHero.highlightWord === "SSC Board 2025" ? (
              <div className="lg:col-span-5 hidden lg:flex justify-center animate-fadeIn">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-7 w-full max-w-sm shadow-2xl space-y-5">
                  <h3 className="text-xs font-extrabold tracking-widest text-[#DC2626] uppercase border-b border-white/10 pb-3">
                    ★ Top Performers (Vadodara)
                  </h3>
                  <div className="space-y-3.5">
                    {[
                      { name: "Shital Kumavat", score: "99.60 PR", detail: "A1 Grade | Topper" },
                      { name: "Prachi Parmar", score: "99.22 PR", detail: "A1 Grade | Merit" },
                      { name: "Pratiksha Pandey", score: "97.52 PR", detail: "Outstanding" },
                      { name: "Jethi Suthar", score: "97.27 PR", detail: "Outstanding" },
                      { name: "Dhairya Darji", score: "97.14 PR", detail: "Outstanding" }
                    ].map((std, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <div>
                          <div className="font-extrabold text-xs text-white">{std.name}</div>
                          <div className="text-[9px] text-zinc-400 font-semibold tracking-wider uppercase mt-0.5">{std.detail}</div>
                        </div>
                        <span className="font-black text-xs text-[#DC2626] bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">{std.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeHero.cardImage ? (
              <div className="lg:col-span-5 hidden lg:flex justify-center animate-fadeIn">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 max-w-xs shadow-2xl hover:scale-105 transition-transform duration-300">
                  <img 
                    src={getEmbedImageUrl(activeHero.cardImage)} 
                    alt="Hero Card" 
                    className="rounded-2xl w-full h-auto object-cover select-none pointer-events-none"
                  />
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </section>

      {/* 2. ABOUT & STATS COUNTER BAND */}
      <section className="py-24 bg-white bg-grid-mesh relative overflow-hidden">
        {/* Decorative Ambient Shapes */}
        <div className="absolute top-10 -right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift-reverse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[2px] w-8 bg-[#DC2626]" />
                <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase">About Noble Education</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2E60] mb-6">
                Shaping Careers & Building Strong Foundations
              </h2>
              <p className="text-[#5A6472] text-sm font-light leading-relaxed mb-6">
                For over 19 years, Noble Education has guided students across school boards, JEE/NEET competitive exams, and GTU engineering semesters in Vadodara. We bridge the gap between classroom theory and real-world academic performance.
              </p>
              <button
                onClick={() => navigate('/about')}
                className="bg-[#1C2E60] hover:bg-[#142247] text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md"
              >
                Know More About Us
              </button>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-6 bg-[#F4F6F9] border border-slate-200 rounded-2xl text-center shadow-sm hover:border-[#DC2626]/20 transition-all hover:shadow-md">
                  <div className="text-3xl font-black text-[#DC2626] mb-1">{stat.value}</div>
                  <div className="font-extrabold text-[#1C2E60] text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                  <p className="text-[10px] text-zinc-400 font-light leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 CAMPUS INFRASTRUCTURE SHOWCASE - BIG & SMALL BENTO GRID */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
              Modern Campus & Study Spaces
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2">
              Explore our spacious classrooms, interactive digital boards, and 1-on-1 personal counseling desks on Waghodia Road.
            </p>
          </div>

          {(() => {
            const list = pageImages.homeInfrastructure && pageImages.homeInfrastructure.length > 0
              ? pageImages.homeInfrastructure
              : (pageImages.about && pageImages.about.length > 0 ? pageImages.about : [
                { title: "Institute Campus Premises", category: "Premises", image: "/images/hero-classroom.png", desc: "State-of-the-art coaching facilities on Waghodia Road" },
                { title: "Dedicated Study & Doubt Desks", category: "Faculty", image: "/images/hero-counseling.png", desc: "1-on-1 personal guidance and doubt resolution" },
                { title: "Interactive Board Setup", category: "Technology", image: "/images/bg-gallery-hero.png", desc: "Modern visual learning tools for maximum retention" }
              ]);

            const p1 = list[0] || {};
            const p2 = list[1] || {};
            const p3 = list[2] || {};

            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* BIG Feature Photo Card */}
                <div className="md:col-span-7 relative h-80 sm:h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/about')}>
                  <img
                    src={getEmbedImageUrl(p1.image || p1.url)}
                    alt={p1.title || 'Main Campus'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/hero-classroom.png'; }}
                  />
                  {p1.category && (
                    <span className="absolute top-4 left-4 text-xs font-black text-white bg-[#1C2E60]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      ★ {p1.category}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D]/95 via-[#0A1E3D]/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <span className="text-red-400 font-extrabold text-[10px] uppercase tracking-widest mb-1">Featured Campus Highlight</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">{p1.title}</h3>
                    {p1.desc && <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed max-w-lg">{p1.desc}</p>}
                  </div>
                </div>

                {/* SMALL Accent Stacked Photo Cards */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* SMALL Photo 2 */}
                  <div className="relative h-44 sm:h-[188px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/about')}>
                    <img
                      src={getEmbedImageUrl(p2.image || p2.url)}
                      alt={p2.title || 'Faculty Desk'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/hero-counseling.png'; }}
                    />
                    {p2.category && (
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {p2.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                      <h4 className="text-white font-extrabold text-sm leading-snug">{p2.title}</h4>
                      {p2.desc && <p className="text-zinc-300 text-[11px] font-light truncate">{p2.desc}</p>}
                    </div>
                  </div>

                  {/* SMALL Photo 3 */}
                  <div className="relative h-44 sm:h-[188px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/about')}>
                    <img
                      src={getEmbedImageUrl(p3.image || p3.url)}
                      alt={p3.title || 'Interactive Setup'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/bg-gallery-hero.png'; }}
                    />
                    {p3.category && (
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {p3.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                      <h4 className="text-white font-extrabold text-sm leading-snug">{p3.title}</h4>
                      {p3.desc && <p className="text-zinc-300 text-[11px] font-light truncate">{p3.desc}</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 3. PAIN POINTS / CHALLENGES BLOCK */}
      <section className="py-24 bg-[#F4F6F9] bg-dots-pattern border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Ambient Shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift-reverse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase">Student & Parent Support</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2E60] mt-2 mb-6">
              Challenges We Help You Overcome
            </h2>
            <p className="text-[#5A6472] font-light">
              We understand the concerns parents face. Here is how our structured coaching bridges the gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover-glow-red flex flex-col justify-between">
              <div>
                <span className="text-[#DC2626] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-red-50 border border-red-100 rounded-full w-fit block mb-4">
                  The Challenge
                </span>
                <h4 className="text-[#1C2E60] font-extrabold text-base mb-4">"My child studies but marks are not improving"</h4>
                <p className="text-[#5A6472] text-xs font-light leading-relaxed mb-6">Student memorizes formulas without understanding core physical concepts.</p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <span className="text-green-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-green-50 border border-green-100 rounded-full w-fit block mb-2">
                  Our Solution
                </span>
                <p className="text-[#1C2E60] text-xs font-semibold">Concept clarity coaching, regular writing practice, and mock exam cycles.</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover-glow-red flex flex-col justify-between">
              <div>
                <span className="text-[#DC2626] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-red-50 border border-red-100 rounded-full w-fit block mb-4">
                  The Challenge
                </span>
                <h4 className="text-[#1C2E60] font-extrabold text-base mb-4">"Student is confused after 10th standard"</h4>
                <p className="text-[#5A6472] text-xs font-light leading-relaxed mb-6">Unsure whether to select 11th Science, Diploma Engineering, or competitive targets.</p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <span className="text-green-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-green-50 border border-green-100 rounded-full w-fit block mb-2">
                  Our Solution
                </span>
                <p className="text-[#1C2E60] text-xs font-semibold">Free expert counseling sessions to match interest areas to careers.</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover-glow-red flex flex-col justify-between">
              <div>
                <span className="text-[#DC2626] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-red-50 border border-red-100 rounded-full w-fit block mb-4">
                  The Challenge
                </span>
                <h4 className="text-[#1C2E60] font-extrabold text-base mb-4">"School learning & competitive prep feel disconnected"</h4>
                <p className="text-[#5A6472] text-xs font-light leading-relaxed mb-6">Hard to balance daily school homework with JEE/NEET entrance syllabus formats.</p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <span className="text-green-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-green-50 border border-green-100 rounded-full w-fit block mb-2">
                  Our Solution
                </span>
                <p className="text-[#1C2E60] text-xs font-semibold">Integrated programs that sync board syllabus topics with MCQ patterns.</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover-glow-red flex flex-col justify-between">
              <div>
                <span className="text-[#DC2626] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-red-50 border border-red-100 rounded-full w-fit block mb-4">
                  The Challenge
                </span>
                <h4 className="text-[#1C2E60] font-extrabold text-base mb-4">"Student has doubts but won't ask in class"</h4>
                <p className="text-[#5A6472] text-xs font-light leading-relaxed mb-6">Shyness or peer pressure prevents students from raising hands in crowded halls.</p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <span className="text-green-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-green-50 border border-green-100 rounded-full w-fit block mb-2">
                  Our Solution
                </span>
                <p className="text-[#1C2E60] text-xs font-semibold">1-on-1 friendly doubt solving hours after coaching classes.</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover-glow-red flex flex-col justify-between lg:col-span-2">
              <div>
                <span className="text-[#DC2626] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-red-50 border border-red-100 rounded-full w-fit block mb-4">
                  The Challenge
                </span>
                <h4 className="text-[#1C2E60] font-extrabold text-base mb-4">"Parents are lost in the online admission process"</h4>
                <p className="text-[#5A6472] text-xs font-light leading-relaxed mb-6">Struggling with ACPC/ACPDC online forms registration, option selections, and checklists.</p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <span className="text-green-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-green-50 border border-green-100 rounded-full w-fit block mb-2">
                  Our Solution
                </span>
                <p className="text-[#1C2E60] text-xs font-semibold">Full guided option filling sessions verified by our expert counselors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 FEATURED TOP RANKER STUDENT RESULTS SHOWCASE SECTION (PATTERNED BENTO GRID DESIGN) */}
      <section className="py-24 bg-[#F8FAFC] bg-dots-pattern relative overflow-hidden border-y border-slate-200/90">
        {/* Decorative pattern mesh background layers */}
        <div className="absolute inset-0 bg-grid-mesh opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-ambient-drift" />
        <div className="absolute bottom-10 -right-20 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-ambient-drift-reverse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200/80 px-4 py-1.5 rounded-full text-[#DC2626] font-black text-xs uppercase tracking-widest shadow-xs mb-3">
              <span className="animate-bounce">🏆</span>
              <span>ACADEMIC HALL OF FAME</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1C2E60] tracking-tight">
              Our Top Rankers & High Performers
            </h2>
            <p className="text-[#5A6472] font-light text-sm sm:text-base leading-relaxed mt-3">
              Celebrating top percentile ranks and board toppers across our partner schools in Vadodara.
            </p>
          </div>

          {/* Dynamic Auto-Arranging Student Result Cards Grid (100% PERFECT ALIGNMENT & AUTO SPACING) */}
          {(() => {
            const listToDisplay = (results && results.length > 0 ? results.slice(0, 4) : [
              { name: "Shital Kumavat", score: "99.60 PR", exam: "SSC BOARD 2025", branch: "10th Standard Topper", school: "Royal School, Vadodara", image: "/images/shital-result.png", status: "A1-Grade Topper" },
              { name: "Prachi Parmar", score: "99.22 PR", exam: "SSC BOARD 2025", branch: "10th Standard Topper", school: "Raghukul Vidyalay, Vadodara", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80", status: "A1-Grade Topper" },
              { name: "Patel Harsh", score: "99.4 PR", exam: "12th Science Board", branch: "A-Group", school: "Raghukul Vidyalay, Vadodara", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80", status: "Admitted in LD College" },
              { name: "Shah Miti", score: "10.0 SPI", exam: "DDCET 2025", branch: "Diploma Engineering", school: "New Heaven Vidyalaya, Vadodara", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80", status: "Perfect 10 SPI" }
            ]);

            const rCount = listToDisplay.length;
            const rGridClass = rCount === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : rCount === 2 
              ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' 
              : rCount === 3 
              ? 'grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto';

            return (
              <div className={`grid ${rGridClass} gap-7 mb-14 items-stretch`}>
                {listToDisplay.map((item, idx) => {
              const fallbackPhotos = [
                '/images/shital-result.png',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80'
              ];
              
              const rawImg = item.image || '';
              const isInvalidImg = !rawImg || rawImg.includes('student_') || rawImg.trim() === '';
              const studentPhoto = !isInvalidImg ? getEmbedImageUrl(rawImg) : fallbackPhotos[idx % fallbackPhotos.length];

              const isTopper = idx === 0;
              const rankBadge = idx === 0 ? "👑 #1 TOPPER" : idx === 1 ? "🥈 2ND RANK" : idx === 2 ? "🥉 3RD RANK" : "⭐ TOP RANK";
              const examLabel = (item.exam || 'BOARD 2025').replace('BOARD', '').trim();

              return (
                <div 
                  key={idx}
                  onClick={() => navigate('/results')}
                  className={`bg-white rounded-[28px] overflow-hidden transition-all duration-300 flex flex-col justify-between h-[530px] group hover:-translate-y-2 cursor-pointer ${
                    isTopper 
                      ? 'border-2 border-[#DC2626] shadow-2xl shadow-red-900/15 ring-4 ring-red-500/10' 
                      : 'border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-[#DC2626]/40'
                  }`}
                >
                  {/* 1. CLEAN SINGLE-LINE HEADER BAR */}
                  <div className={`px-4 py-2.5 h-11 flex-shrink-0 flex items-center justify-between border-b gap-2 ${
                    isTopper ? 'bg-[#DC2626] text-white border-red-700' : 'bg-[#1C2E60] text-white border-blue-900'
                  }`}>
                    <span className="text-xs font-black uppercase tracking-wider whitespace-nowrap">
                      {rankBadge}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md uppercase tracking-wider whitespace-nowrap truncate max-w-[110px]">
                      {examLabel}
                    </span>
                  </div>

                  {/* 2. 100% CRISP UNTOUCHED STUDENT PHOTO */}
                  <div className="relative h-60 w-full flex-shrink-0 overflow-hidden bg-slate-100">
                    <img 
                      src={studentPhoto} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = fallbackPhotos[idx % fallbackPhotos.length]; }}
                    />
                  </div>

                  {/* 3. Card Details Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* School Name Tag Slot */}
                      <div className="h-6 flex items-center">
                        <span className="inline-block text-[10px] font-black text-[#1C2E60] bg-blue-50/90 px-3 py-1 rounded-lg border border-blue-100/90 truncate max-w-full">
                          🏫 {item.school || 'Vadodara Partner School'}
                        </span>
                      </div>

                      {/* Student Name Slot */}
                      <div className="h-7 flex items-center">
                        <h3 className="text-lg font-black text-[#1C2E60] group-hover:text-[#DC2626] transition-colors leading-tight truncate w-full">
                          {item.name}
                        </h3>
                      </div>

                      {/* Highlighted Score Performance Box Slot */}
                      <div className={`p-3 rounded-2xl h-18 flex flex-col items-center justify-center text-center shadow-xs transition-all ${
                        isTopper 
                          ? 'bg-gradient-to-r from-[#DC2626] to-[#1C2E60] text-white shadow-md' 
                          : 'bg-gradient-to-br from-red-50 via-white to-blue-50 border border-red-100/80 text-[#1C2E60]'
                      }`}>
                        <span className={`text-[9px] font-black tracking-widest uppercase ${isTopper ? 'text-red-200' : 'text-[#DC2626]'}`}>
                          ★ RANKER PERFORMANCE
                        </span>
                        <div className={`text-2xl sm:text-3xl font-black tracking-tight mt-0.5 ${isTopper ? 'text-white' : 'text-[#1C2E60]'}`}>
                          {item.score}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Card Footer Status Badge Slot */}
                  <div className="px-5 pb-5 pt-1 flex-shrink-0">
                    <span className={`text-[10px] font-black px-3.5 py-2 rounded-xl border flex items-center justify-center gap-1.5 uppercase tracking-wider text-center ${
                      isTopper 
                        ? 'bg-red-50 text-[#DC2626] border-red-200 font-extrabold' 
                        : 'bg-slate-50 text-[#1C2E60] border-slate-200/80'
                    }`}>
                      <FiAward className="text-[#DC2626] text-xs" /> {item.status || 'Top Board Topper'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

          {/* Bottom Action Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/results')}
              className="inline-flex items-center gap-2.5 bg-[#DC2626] hover:bg-red-700 text-white font-black px-9 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-red-500/20 hover:scale-105 transition-all duration-300"
            >
              <span>View All Student Results</span>
              <FiArrowRight className="text-lg" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. COURSES TABBED VIEW */}
      <section className="py-24 bg-white bg-grid-mesh border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Ambient Shapes */}
        <div className="absolute -top-20 left-1/3 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift-reverse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase">Our Curriculums</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2E60] mt-2 mb-6">Filter Courses By Stream</h2>
            <p className="text-[#5A6472] font-light">Explore school, science, competitive entrances, and university engineering classes.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {courseCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCourseCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCourseCategory === cat
                    ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-md scale-105'
                    : 'bg-[#F4F6F9] text-zinc-500 border-slate-200 hover:text-[#1C2E60] hover:border-slate-300'
                }`}
              >
                {cat === "school" ? "School" : cat === "science" ? "Science" : cat === "competitive" ? "Competitive" : cat === "engineering" ? "Engineering" : "All"}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                onClick={() => navigate(`/courses#${course.id}`)}
                className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#DC2626]/30 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-bold text-[#1C2E60] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest block mb-4 w-fit">
                    {course.category}
                  </span>
                  <h3 className="text-base font-extrabold text-[#1C2E60] mb-2">{course.name}</h3>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-3 mb-4">{course.description}</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-[#1C2E60] font-bold uppercase tracking-wider">Explore Details</span>
                  <FiTrendingUp className="text-[#DC2626] text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 LEARNING LABS SHOWCASE - BIG & SMALL BENTO MASONRY */}
      <section className="py-20 bg-[#EEF1F5] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Interactive Learning
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
              Stream-Specific Classrooms & Test Halls
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2">
              Equipped with smart whiteboards, NEET/JEE mock test desks, and GTU engineering tutorial rooms.
            </p>
          </div>

          {(() => {
            const list = pageImages.homeClassrooms && pageImages.homeClassrooms.length > 0
              ? pageImages.homeClassrooms
              : (pageImages.courses && pageImages.courses.length > 0 ? pageImages.courses : [
                { title: "School Foundation Classroom (8th-10th)", category: "School", image: "/images/hero-classroom.png", desc: "Interactive board coaching for Std 8 to 10" },
                { title: "11th & 12th Science Theory & Lab Desk", category: "Science", image: "/images/bg-courses-hero.png", desc: "Comprehensive Physics, Chemistry & Biology coaching" },
                { title: "NEET & JEE Competitive Batch Hall", category: "Competitive", image: "/images/bg-results-hero.png", desc: "Rigorous test series and PYQ practice halls" },
                { title: "Diploma & Degree Engineering Tutorials", category: "Engineering", image: "/images/hero-engineering.png", desc: "Semester subject coaching & GTU exam guidance" }
              ]);

            const p1 = list[0] || {};
            const p2 = list[1] || {};
            const p3 = list[2] || {};
            const p4 = list[3] || {};

            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* BIG Main Feature Photo (Left Column) */}
                <div className="md:col-span-7 relative h-80 sm:h-[410px] rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/courses')}>
                  <img
                    src={getEmbedImageUrl(p1.image || p1.url)}
                    alt={p1.title || 'Foundation Classroom'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/hero-classroom.png'; }}
                  />
                  {p1.category && (
                    <span className="absolute top-4 left-4 text-xs font-black text-white bg-[#1C2E60]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-10">
                      ★ {p1.category}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/80 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <span className="text-red-400 font-extrabold text-[10px] uppercase tracking-widest mb-1 drop-shadow-sm">Key Learning Hub</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2 drop-shadow-md">{p1.title}</h3>
                    {p1.desc && <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed max-w-lg drop-shadow-sm">{p1.desc}</p>}
                  </div>
                </div>

                {/* SMALL Stacked Photo Cards (Right Column) */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  <div className="relative h-44 sm:h-[193px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/courses')}>
                    <img
                      src={getEmbedImageUrl(p2.image || p2.url)}
                      alt={p2.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/bg-courses-hero.png'; }}
                    />
                    {p2.category && (
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider shadow z-10">
                        {p2.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/85 to-transparent flex flex-col justify-end p-4">
                      <h4 className="text-white font-extrabold text-sm leading-snug drop-shadow-md">{p2.title}</h4>
                      {p2.desc && <p className="text-zinc-200 text-[11px] font-light truncate drop-shadow-sm">{p2.desc}</p>}
                    </div>
                  </div>

                  <div className="relative h-44 sm:h-[193px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/courses')}>
                    <img
                      src={getEmbedImageUrl(p3.image || p3.url)}
                      alt={p3.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/bg-results-hero.png'; }}
                    />
                    {p3.category && (
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider shadow z-10">
                        {p3.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/90 to-transparent flex flex-col justify-end p-4">
                      <h4 className="text-white font-extrabold text-sm leading-snug drop-shadow-md">{p3.title}</h4>
                      {p3.desc && <p className="text-zinc-200 text-[11px] font-light truncate drop-shadow-sm">{p3.desc}</p>}
                    </div>
                  </div>
                </div>

                {/* WIDE Full-Span Accent Banner (Bottom Row) */}
                {p4.title && (
                  <div className="md:col-span-12 relative h-48 sm:h-56 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/courses')}>
                    <img
                      src={getEmbedImageUrl(p4.image || p4.url)}
                      alt={p4.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/hero-engineering.png'; }}
                    />
                    {p4.category && (
                      <span className="absolute top-4 left-4 text-xs font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-3.5 py-1 rounded-full uppercase tracking-wider shadow z-10">
                        {p4.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/80 to-transparent flex flex-col justify-end p-6">
                      <h4 className="text-white font-extrabold text-lg sm:text-xl leading-snug drop-shadow-md">{p4.title}</h4>
                      {p4.desc && <p className="text-zinc-200 text-xs font-light mt-1 leading-relaxed max-w-xl drop-shadow-sm">{p4.desc}</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5. WHY CHOOSE NOBLE */}
      <section className="py-24 bg-[#F4F6F9] bg-dots-pattern border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Ambient Shapes */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift-reverse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase">Our Core Strengths</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2E60] mt-2 mb-6">Why Choose Noble Education</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover-glow-red">
                <div className="p-3 bg-[#1C2E60]/10 text-[#1C2E60] rounded-xl border border-[#1C2E60]/20 w-fit mb-4 text-xl">
                  <FiCheckCircle />
                </div>
                <h3 className="text-sm font-extrabold text-[#1C2E60] mb-2">{feat.title}</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 CAMPUS LIFE HIGHLIGHTS */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase block mb-2">Moments & Milestones</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2E60] leading-tight">
                Our Campus Life Highlights
              </h2>
              <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-3">
                Take a look at award ceremonies, student orientation batches, cultural stages, and guidance workshops.
              </p>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="inline-block bg-[#1C2E60] hover:bg-[#DC2626] text-white font-extrabold py-3 px-6 rounded-xl text-xs transition-colors shadow-md w-fit cursor-pointer"
            >
              View Full Gallery ➜
            </button>
          </div>

          {(() => {
            const list = pageImages.homeHighlights && pageImages.homeHighlights.length > 0
              ? pageImages.homeHighlights
              : (homePhotos && homePhotos.length > 0 ? homePhotos : [
                { title: "Class Toppers Celebration", category: "Events", image: "/images/gallery-event-students.jpg", desc: "Annual top rankers award ceremony" },
                { title: "Student Speech at Podium", category: "Seminars", image: "/images/gallery-event-speech.jpg", desc: "Student orientation & motivational address" },
                { title: "Memento Stage Felicitation", category: "Events", image: "/images/gallery-event-felicitation.jpg", desc: "Honoring academic excellence on stage" },
                { title: "Event Entrance Welcome Desk", category: "Campus", image: "/images/gallery-event-welcome.jpg", desc: "Campus entrance greeting desk" }
              ]);

            const p1 = list[0] || {};
            const p2 = list[1] || {};
            const p3 = list[2] || {};
            const p4 = list[3] || {};

            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* BIG Hero Event Photo */}
                <div className="md:col-span-8 relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/gallery')}>
                  <img
                    src={getEmbedImageUrl(p1.image || p1.url)}
                    alt={p1.title || 'Toppers Event'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/gallery-event-students.jpg'; }}
                  />
                  {p1.category && (
                    <span className="absolute top-4 left-4 text-xs font-black text-white bg-[#1C2E60]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      ★ {p1.category}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D]/95 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <span className="text-red-400 font-extrabold text-[10px] uppercase tracking-widest mb-1">Featured Event Milestone</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1">{p1.title}</h3>
                    {p1.desc && <p className="text-zinc-300 text-xs sm:text-sm font-light max-w-lg">{p1.desc}</p>}
                  </div>
                </div>

                {/* MEDIUM Accent Event Photo */}
                <div className="md:col-span-4 relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/gallery')}>
                  <img
                    src={getEmbedImageUrl(p2.image || p2.url)}
                    alt={p2.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/gallery-event-speech.jpg'; }}
                  />
                  {p2.category && (
                    <span className="absolute top-4 left-4 text-xs font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {p2.category}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D]/95 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                    <h4 className="text-white font-extrabold text-base leading-snug">{p2.title}</h4>
                    {p2.desc && <p className="text-zinc-300 text-xs font-light mt-1 truncate">{p2.desc}</p>}
                  </div>
                </div>

                {/* SMALL Photo 3 */}
                {p3.title && (
                  <div className="md:col-span-6 relative h-48 sm:h-60 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/gallery')}>
                    <img
                      src={getEmbedImageUrl(p3.image || p3.url)}
                      alt={p3.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/gallery-event-felicitation.jpg'; }}
                    />
                    {p3.category && (
                      <span className="absolute top-3 left-3 text-[10px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        {p3.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                      <h4 className="text-white font-extrabold text-base leading-snug">{p3.title}</h4>
                      {p3.desc && <p className="text-zinc-300 text-xs font-light truncate">{p3.desc}</p>}
                    </div>
                  </div>
                )}

                {/* SMALL Photo 4 */}
                {p4.title && (
                  <div className="md:col-span-6 relative h-48 sm:h-60 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer" onClick={() => navigate('/gallery')}>
                    <img
                      src={getEmbedImageUrl(p4.image || p4.url)}
                      alt={p4.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/gallery-event-welcome.jpg'; }}
                    />
                    {p4.category && (
                      <span className="absolute top-3 left-3 text-[10px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        {p4.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                      <h4 className="text-white font-extrabold text-base leading-snug">{p4.title}</h4>
                      {p4.desc && <p className="text-zinc-300 text-xs font-light truncate">{p4.desc}</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5.55 ONE BY ONE CENTERED TESTIMONIALS SLIDER (PLACED DIRECTLY UNDER GALLERY) */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-200/90 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 shadow-xs">
              ★ TESTIMONIALS & REVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
              What Parents & Students Say About Noble Education
            </h2>
            <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Real feedback from students and parents studying across our Vadodara partner school campuses.
            </p>
          </div>

          {/* SINGLE CENTERED REVIEW CARD CONTAINER WITH SIDE ARROWS */}
          {(() => {
            const list = testimonials && testimonials.length > 0 ? testimonials : [
              {
                name: "Rohan Patel",
                program: "DDCET Course",
                stars: 5,
                quote: "Noble Education provided the exact roadmap I needed for DDCET. The mock test series and engineering syllabus support helped me secure direct second-year degree admission in my dream branch."
              }
            ];

            const currentIdx = activeTestimonialIndex % list.length;
            const currentItem = list[currentIdx] || list[0];

            return (
              <div 
                className="max-w-2xl mx-auto relative px-4"
                onMouseEnter={() => setIsTestimonialHovered(true)}
                onMouseLeave={() => setIsTestimonialHovered(false)}
              >
                {/* Left Navigation Arrow */}
                {list.length > 1 && (
                  <button
                    onClick={prevTestimonial}
                    className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white border border-slate-200 text-[#1C2E60] flex items-center justify-center hover:bg-[#DC2626] hover:border-red-500 hover:text-white transition-all text-xl shadow-lg cursor-pointer active:scale-95"
                    aria-label="Previous Review"
                  >
                    ‹
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {list.length > 1 && (
                  <button
                    onClick={nextTestimonial}
                    className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white border border-slate-200 text-[#1C2E60] flex items-center justify-center hover:bg-[#DC2626] hover:border-red-500 hover:text-white transition-all text-xl shadow-lg cursor-pointer active:scale-95"
                    aria-label="Next Review"
                  >
                    ›
                  </button>
                )}

                {/* SINGLE CENTERED REVIEW CARD */}
                <div className="overflow-hidden py-2 px-1">
                  <AnimatePresence mode="wait" custom={testimonialDir}>
                    <motion.div
                      key={currentIdx}
                      custom={testimonialDir}
                      initial={{ x: testimonialDir > 0 ? 100 : -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: testimonialDir < 0 ? 100 : -100, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white border-2 border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl hover:border-red-400/40 transition-all text-center flex flex-col items-center justify-between min-h-[300px]"
                    >
                      {/* 1. Gold Stars */}
                      <div className="flex flex-col items-center gap-2 mb-6">
                        <div className="flex items-center gap-1.5 text-amber-400 text-lg sm:text-xl">
                          {'★'.repeat(currentItem.stars || 5)}
                        </div>
                      </div>

                      {/* 2. Review Quote */}
                      <p className="text-[#1C2E60] text-sm sm:text-base font-medium leading-relaxed italic max-w-xl mb-8">
                        "{currentItem.quote}"
                      </p>

                      {/* 3. Reviewer Name & Program Tag */}
                      <div className="flex flex-col items-center gap-1.5 pt-4 border-t border-slate-100 w-full max-w-xs">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C2E60] to-[#0A1E3D] text-white font-black flex items-center justify-center text-base shadow-md mb-1">
                          {(currentItem.name || 'S').charAt(0)}
                        </div>
                        <h4 className="font-extrabold text-base text-[#1C2E60]">{currentItem.name}</h4>
                        <span className="text-xs font-bold text-[#DC2626] bg-red-50 px-3 py-1 rounded-xl border border-red-100">
                          {currentItem.program || 'Noble Education Student'}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5.6 FEATURED VIDEO LECTURES SLIDER (CLEAN LIGHT THEME) */}
      {videoLectures.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-[#F4F7FA] via-white to-[#EEF2F8] bg-grid-mesh border-t border-slate-200 text-[#1C2E60] relative overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header with Navigation Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div className="max-w-2xl">
                <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase block mb-2">▶ YouTube Video Series</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2E60] leading-tight">
                  Featured Video Lectures
                </h2>
                <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2">
                  Watch concept breakdowns, PYQ paper solving sessions, and exam strategy masterclasses by expert faculties.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {totalVideoPages > 1 && (
                  <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-sm backdrop-blur-md">
                    <button
                      onClick={prevVideo}
                      className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-[#1C2E60] flex items-center justify-center hover:bg-[#DC2626] hover:border-red-500 hover:text-white transition-all text-lg cursor-pointer active:scale-95"
                      aria-label="Previous Videos"
                    >
                      ‹
                    </button>
                    <span className="text-xs font-bold text-[#1C2E60] px-2 min-w-[50px] text-center">
                      {currentVideoPage + 1} / {totalVideoPages}
                    </span>
                    <button
                      onClick={nextVideo}
                      className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-[#1C2E60] flex items-center justify-center hover:bg-[#DC2626] hover:border-red-500 hover:text-white transition-all text-lg cursor-pointer active:scale-95"
                      aria-label="Next Videos"
                    >
                      ›
                    </button>
                  </div>
                )}
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-red-700 text-white font-extrabold py-2.5 px-5 rounded-2xl text-xs transition-all shadow-md text-decoration-none"
                >
                  <span>YouTube Channel</span> ↗
                </a>
              </div>
            </div>

            {/* Non-Repeating Video Cards Container */}
            <div className="relative min-h-[380px] overflow-hidden">
              <AnimatePresence mode="wait" custom={videoDir}>
                <motion.div
                  key={currentVideoPage}
                  custom={videoDir}
                  initial={{ x: videoDir > 0 ? 120 : -120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: videoDir < 0 ? 120 : -120, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {videoLectures.slice(currentVideoPage * 3, (currentVideoPage + 1) * 3).map((currentVid, i) => {
                    const thumb = getEmbedImageUrl(currentVid.youtubeUrl || currentVid.url || '');

                    return (
                      <div
                        key={currentVid.id || currentVid.title || i}
                        className="bg-white border border-slate-200/90 hover:border-[#DC2626]/40 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
                      >
                        {/* HD Video Thumbnail Box */}
                        <div className="relative w-full h-48 bg-slate-950 overflow-hidden">
                          <img
                            src={thumb}
                            alt={currentVid.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/jagannath_rath_yatra.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-center justify-center">
                            <a
                              href={currentVid.youtubeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-14 h-14 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xl shadow-xl shadow-red-600/40 group-hover:scale-110 transition-transform duration-300 cursor-pointer text-decoration-none"
                              aria-label={`Watch ${currentVid.title} on YouTube`}
                            >
                              ▶
                            </a>
                          </div>
                          <span className="absolute top-4 left-4 bg-white/95 text-[#1C2E60] text-[11px] font-extrabold px-3 py-1 rounded-xl border border-slate-200 shadow-sm backdrop-blur-md">
                            {currentVid.category || 'Lecture'}
                          </span>
                        </div>

                        {/* Card Body Info */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-base font-bold text-[#1C2E60] mb-2 line-clamp-2 leading-snug group-hover:text-[#DC2626] transition-colors">
                            {currentVid.title}
                          </h3>
                          {currentVid.description && (
                            <p className="text-[#5A6472] text-xs font-light leading-relaxed mb-6 line-clamp-2">
                              {currentVid.description}
                            </p>
                          )}

                          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                            <a
                              href={currentVid.youtubeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-[#DC2626] hover:text-[#1C2E60] font-bold text-xs transition-colors text-decoration-none"
                            >
                              <span>Watch Lecture Video</span>
                              <span>➜</span>
                            </a>
                            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">YouTube</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots (Only show if multiple pages exist) */}
              {totalVideoPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: totalVideoPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setVideoDir(i > currentVideoPage ? 1 : -1); setVideoIndex(i); }}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentVideoPage ? 'w-8 bg-[#DC2626]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}



      {/* 7. FINAL CTA BAND (CLEAN LIGHT THEME) */}
      <section className="py-20 bg-gradient-to-r from-blue-50/80 via-white to-red-50/80 border-t border-slate-200 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-[#5A6472] text-sm font-light mb-8 max-w-md mx-auto leading-relaxed">
            Connect with our admissions desk to align on batch times, stream selections, or schedule a free 1-on-1 parent meeting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${contact.phone1}`}
              className="bg-[#DC2626] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-2 hover:scale-105"
            >
              Call Now
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-2 hover:scale-105"
            >
              <FiMessageCircle /> WhatsApp Now
            </a>
            <a
              href="#inquiry-form"
              className="bg-[#1C2E60] hover:bg-[#142247] text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-md hover:scale-105"
            >
              Book Free Counselling
            </a>
          </div>
        </div>
      </section>

      {/* 8. GET IN TOUCH & MAP */}
      <section id="inquiry-form" className="py-24 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase">Get In Touch</span>
            <h2 className="text-3xl font-extrabold text-[#1C2E60]">Contact & Location</h2>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              Visit our Waghodia Road campus for stream guides and admissions support, or fill out the form to get a counselor call.
            </p>
            
            <div className="p-6 bg-[#F4F6F9] border border-slate-200 rounded-2xl text-xs space-y-4 shadow-sm">
              <div>
                <strong className="text-[#1C2E60] block">Address:</strong>
                <span className="text-zinc-500 font-light">{contact.address}</span>
              </div>
              <div>
                <strong className="text-[#1C2E60] block">Phone Lines:</strong>
                <span className="text-zinc-500 font-light">{contact.phone1} / {contact.phone2}</span>
              </div>
              <div>
                <strong className="text-[#1C2E60] block">Office Timings:</strong>
                <span className="text-zinc-500 font-light">{contact.timings}</span>
              </div>
            </div>
            
            <div className="h-60 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                title="Waghodia Road Campus Location Map"
                src={contact.mapUrl}
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Form */}
          <div className="lg:col-span-7 p-8 bg-[#F4F6F9] border border-slate-200 rounded-3xl shadow-sm">
            <h3 className="text-xl font-extrabold text-[#1C2E60] mb-6">Send Admission Inquiry</h3>
            {homeFormSent ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-2xl">
                Thank you! Your inquiry was successfully registered. We will call you shortly.
              </div>
            ) : (
              <form onSubmit={handleHomeInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#1C2E60] uppercase tracking-wider block mb-1">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Yash Patel" 
                      value={homeFormData.name}
                      onChange={(e) => setHomeFormData({ ...homeFormData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#1C2E60] focus:outline-none bg-white" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#1C2E60] uppercase tracking-wider block mb-1">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="e.g. 9876543210" 
                      value={homeFormData.phone}
                      onChange={(e) => setHomeFormData({ ...homeFormData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#1C2E60] focus:outline-none bg-white" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#1C2E60] uppercase tracking-wider block mb-1">Student Class / Standard</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Class 11 Science" 
                      value={homeFormData.message}
                      onChange={(e) => setHomeFormData({ ...homeFormData, message: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#1C2E60] focus:outline-none bg-white" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#1C2E60] uppercase tracking-wider block mb-1">Course Interested In</label>
                    <select 
                      value={homeFormData.program}
                      onChange={(e) => setHomeFormData({ ...homeFormData, program: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#1C2E60] focus:outline-none bg-white"
                    >
                      <option>School Coaching (8th-10th)</option>
                      <option>11th-12th Science Boards</option>
                      <option>NEET / JEE Preparation</option>
                      <option>Diploma Engineering Coaching</option>
                      <option>DDCET Entrance batch</option>
                      <option>Concept Schooling</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="bg-[#1C2E60] hover:bg-[#142247] text-white font-bold py-3 px-8 rounded-xl text-xs transition-colors shadow-md w-full sm:w-auto cursor-pointer">
                    Book Free Counselling
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
