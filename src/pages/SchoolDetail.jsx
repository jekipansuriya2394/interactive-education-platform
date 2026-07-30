import React, { useState, useEffect } from 'react';
import { FiMapPin, FiPhone, FiBookOpen, FiAward, FiCheckCircle, FiArrowRight, FiMessageCircle, FiChevronRight, FiGrid, FiMaximize2 } from 'react-icons/fi';
import { HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { navigate } from '../utils/router';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';
import { inquiryService } from '../utils/inquiryService';

export default function SchoolDetail() {
  const [partnerSchools, setPartnerSchools] = useState(() => adminData.getData('partnerSchools') || []);
  const [allResults, setAllResults] = useState(() => adminData.getData('results') || []);
  const [galleryItems, setGalleryItems] = useState(() => adminData.getData('gallery') || []);
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  // Gallery State
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  
  // Inquiry Form State
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', program: '10th Standard Board', message: '' });

  // Dynamic School Resolution from URL query params, path, or click events
  const resolveSchoolFromUrl = () => {
    const schools = adminData.getData('partnerSchools') || [];
    const results = adminData.getData('results') || [];
    setPartnerSchools(schools);
    setAllResults(results);

    // Parse school name or ID from URL
    const searchParams = new URLSearchParams(window.location.search);
    const nameParam = searchParams.get('name') || searchParams.get('school') || '';
    const idParam = searchParams.get('id') || '';
    const pathPart = window.location.pathname.replace('/school', '').replace('/', '').trim();

    let matched = null;
    if (idParam) {
      matched = schools.find(s => String(s.id) === String(idParam));
    }
    if (!matched && nameParam) {
      const queryLower = decodeURIComponent(nameParam).toLowerCase();
      matched = schools.find(s => (s.name || '').toLowerCase().includes(queryLower));
    }
    if (!matched && pathPart) {
      const queryLower = decodeURIComponent(pathPart).toLowerCase().replace(/-/g, ' ');
      matched = schools.find(s => (s.name || '').toLowerCase().includes(queryLower));
    }
    if (!matched && schools.length > 0) {
      matched = schools[0];
    }

    setSelectedSchool(matched);
  };

  useEffect(() => {
    resolveSchoolFromUrl();

    const handleLocationChange = () => {
      resolveSchoolFromUrl();
    };

    window.addEventListener('popstate', handleLocationChange);
    const cleanupSync = adminData.initSync(resolveSchoolFromUrl);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      if (typeof cleanupSync === 'function') cleanupSync();
    };
  }, []);

  const handleSchoolSelect = (sch) => {
    setSelectedSchool(sch);
    navigate(`/school?name=${encodeURIComponent(sch.name)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!selectedSchool) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-[#1C2E60] mb-3">Partner School Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">The requested school details could not be found.</p>
        <button
          onClick={() => navigate('/about')}
          className="bg-[#DC2626] text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:bg-red-700 transition-all cursor-pointer"
        >
          View All Partner Schools
        </button>
      </div>
    );
  }

  // Filter toppers belonging to THIS specific school
  const schoolResults = allResults.filter(r => {
    if (!r.school) return false;
    const sName = selectedSchool.name.toLowerCase().replace(/vidyalay|school|campus/g, '').trim();
    const rName = r.school.toLowerCase().replace(/vidyalay|school|campus/g, '').trim();
    return rName.includes(sName) || sName.includes(rName);
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    inquiryService.sendInquiry({
      ...formData,
      school: selectedSchool.name,
      formSource: `School Form (${selectedSchool.name})`,
      message: `Inquiry for ${selectedSchool.name}: ${formData.message || 'Admission Details'}`
    });

    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', phone: '', program: '10th Standard Board', message: '' });
    }, 4000);
  };

  const schoolBuildingPhoto = selectedSchool.image ? getEmbedImageUrl(selectedSchool.image) : 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&auto=format&fit=crop&q=80';
  const googleMapsUrl = selectedSchool.mapUrl || selectedSchool.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(selectedSchool.name + ' ' + (selectedSchool.address || 'Vadodara'))}`;

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1C2E60]">
      {/* 1. BREADCRUMB & HERO HEADER (PERFECTLY CLEARS STICKY NAVBAR) */}
      <section className="bg-gradient-to-r from-[#0A1E3D] via-[#1C2E60] to-[#0A1E3D] text-white pt-28 sm:pt-32 pb-20 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200/80 mb-6">
            <span onClick={() => navigate('/')} className="hover:text-white cursor-pointer transition-colors">Home</span>
            <FiChevronRight className="text-xs" />
            <span onClick={() => navigate('/about')} className="hover:text-white cursor-pointer transition-colors">Partner Schools</span>
            <FiChevronRight className="text-xs" />
            <span className="text-white font-extrabold">{selectedSchool.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: School Title & Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-blue-200 font-bold text-xs">
                <span>{selectedSchool.medium || 'English Medium'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {selectedSchool.name}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                {selectedSchool.description || 'Premier integrated coaching partner in Vadodara offering complete 8th to 12th Science and Board exam preparation.'}
              </p>

              {/* Single-Line Clickable Google Maps Location Link */}
              {selectedSchool.address && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-2xl text-xs font-bold text-white transition-all max-w-full truncate shadow-sm group"
                >
                  <span className="text-[#EF4444] text-sm flex-shrink-0">📍</span>
                  <span className="truncate">{selectedSchool.address}</span>
                  <span className="text-blue-300 text-[10px] uppercase font-black tracking-wider flex-shrink-0 group-hover:underline">Open Maps ↗</span>
                </a>
              )}

              {/* High Contrast Standards & Contact Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="bg-blue-600/30 backdrop-blur-md border border-blue-400/40 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 shadow-sm">
                  <FiBookOpen className="text-red-400 text-sm" />
                  <span>{selectedSchool.standards || 'Std 8th to 12th Science'}</span>
                </div>
                {selectedSchool.contact && (
                  <a
                    href={`tel:${selectedSchool.contact}`}
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 transition-all shadow-sm"
                  >
                    <FiPhone className="text-green-400 text-sm" />
                    <span>Call: {selectedSchool.contact}</span>
                  </a>
                )}
              </div>

              {/* Quick Action CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#school-inquiry"
                  className="bg-[#DC2626] hover:bg-red-700 text-white font-extrabold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 hover:scale-105 transition-all"
                >
                  Apply / Inquire For This School
                </a>
                <a
                  href={`tel:${selectedSchool.contact || '9104206999'}`}
                  className="bg-white text-[#1C2E60] hover:bg-slate-100 font-extrabold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <FiPhone /> Call School Desk
                </a>
              </div>
            </div>

            {/* Right Column: 3D School Building Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[32px] overflow-hidden border-2 border-white/20 shadow-2xl group bg-slate-900 h-80 sm:h-96">
                <img
                  src={schoolBuildingPhoto}
                  alt={selectedSchool.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&auto=format&fit=crop&q=80'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D]/90 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-black text-red-400 uppercase tracking-widest">Campus Building</span>
                  <h3 className="text-xl font-black text-white">{selectedSchool.name} Campus</h3>
                  <p className="text-slate-300 text-xs mt-1">Vadodara Partner School Premises</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXCLUSIVE SCHOOL TOPPERS SHOWCASE */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200/80 px-3.5 py-1 rounded-full text-[#DC2626] font-black text-xs uppercase tracking-widest mb-2">
                <span>🏆</span>
                <span>ACADEMIC ACHIEVERS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] tracking-tight">
                Top Rankers from {selectedSchool.name}
              </h2>
              <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2 max-w-2xl">
                Celebrating outstanding board exam percentile ranks & toppers studying at {selectedSchool.name}.
              </p>
            </div>

            <button
              onClick={() => navigate('/results')}
              className="bg-[#1C2E60] hover:bg-[#DC2626] text-white font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md self-start md:self-auto cursor-pointer"
            >
              View All Institute Results ➜
            </button>
          </div>

          {schoolResults.length === 0 ? (
            <div className="p-12 text-center bg-[#F8FAFC] rounded-3xl border border-slate-200/80">
              <span className="text-4xl mb-3 block">🏫</span>
              <h3 className="text-lg font-black text-[#1C2E60]">Results Being Updated</h3>
              <p className="text-slate-500 text-xs mt-1 max-w-md mx-auto">
                Student toppers for {selectedSchool.name} are currently being updated in our admin database. Check back soon or view all institute results!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {schoolResults.map((item, idx) => {
                const isTopper = idx === 0;
                const rankBadge = idx === 0 ? "👑 #1 TOPPER" : idx === 1 ? "🥈 2ND RANK" : idx === 2 ? "🥉 3RD RANK" : "⭐ TOP RANK";
                const studentPhoto = item.image ? getEmbedImageUrl(item.image) : '/images/shital-result.png';

                return (
                  <div
                    key={idx}
                    onClick={() => navigate('/results')}
                    className={`bg-white rounded-[28px] overflow-hidden transition-all duration-300 flex flex-col justify-between h-[520px] group hover:-translate-y-2 cursor-pointer ${
                      isTopper 
                        ? 'border-2 border-[#DC2626] shadow-2xl shadow-red-900/15 ring-4 ring-red-500/10' 
                        : 'border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-[#DC2626]/40'
                    }`}
                  >
                    <div>
                      {/* Top Header Bar */}
                      <div className={`px-4 py-2.5 h-11 flex items-center justify-between border-b gap-2 ${
                        isTopper ? 'bg-[#DC2626] text-white border-red-700' : 'bg-[#1C2E60] text-white border-blue-900'
                      }`}>
                        <span className="text-xs font-black uppercase tracking-wider whitespace-nowrap">
                          {rankBadge}
                        </span>
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md uppercase tracking-wider whitespace-nowrap truncate max-w-[110px]">
                          {(item.exam || 'BOARD 2025').replace('BOARD', '').trim()}
                        </span>
                      </div>

                      {/* Photo Banner */}
                      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                        <img
                          src={studentPhoto}
                          alt={item.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = '/images/shital-result.png'; }}
                        />
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-3">
                        <span className="inline-block text-[10px] font-black text-[#1C2E60] bg-blue-50/90 px-3 py-1 rounded-lg border border-blue-100/90 truncate max-w-full">
                          🏫 {selectedSchool.name}
                        </span>

                        <h3 className="text-lg font-black text-[#1C2E60] group-hover:text-[#DC2626] transition-colors leading-tight truncate">
                          {item.name}
                        </h3>

                        <div className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs ${
                          isTopper 
                            ? 'bg-gradient-to-r from-[#DC2626] to-[#1C2E60] text-white shadow-md' 
                            : 'bg-gradient-to-br from-red-50 via-white to-blue-50 border border-red-100/80 text-[#1C2E60]'
                        }`}>
                          <span className={`text-[9px] font-black tracking-widest uppercase ${isTopper ? 'text-red-200' : 'text-[#DC2626]'}`}>
                            ★ RANKER PERFORMANCE
                          </span>
                          <div className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
                            {item.score}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-1">
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
          )}
        </div>
      </section>

      {/* 3. INTEGRATED COACHING OVERVIEW & FEATURES */}
      <section className="py-20 bg-[#F4F7FA] bg-dots-pattern border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase">INTEGRATED LEARNING SYSTEM</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-2">
              Integrated Coaching Features for {selectedSchool.name}
            </h2>
            <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-3">
              Noble Education partners directly with {selectedSchool.name} to deliver seamless concept coaching, board exam mastery, and competitive test preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Syllabus Sync", desc: "Coaching syllabus is aligned 100% with school exam timetables and GSEB/CBSE board guidelines.", icon: "📚" },
              { title: "Daily Practice Papers", desc: "Regular chapter-wise DPP sheets and numerical practice sessions after regular school hours.", icon: "📝" },
              { title: "1-on-1 Doubt Desks", desc: "Dedicated subject faculties available daily to resolve personal student doubts individually.", icon: "💡" },
              { title: "Board Test Series", desc: "Simulated full-length board paper test series with detailed rank reporting and parent updates.", icon: "🎯" }
            ].map((feat, idx) => (
              <div key={idx} className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-lg transition-all space-y-3">
                <div className="text-3xl">{feat.icon}</div>
                <h3 className="text-base font-black text-[#1C2E60]">{feat.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 CAMPUS INFRASTRUCTURE & LIFE GALLERY */}
      {(() => {
        // Fetch school-specific photos added by admin from adminData
        const adminSchoolPhotos = adminData.getData('schoolPhotos') || [];
        const specificPhotos = adminSchoolPhotos.filter(p => 
          (p.schoolName || '').toLowerCase().includes((selectedSchool.name || '').toLowerCase()) ||
          (selectedSchool.name || '').toLowerCase().includes((p.schoolName || '').toLowerCase())
        );

        // Fallback default photos if no admin photos added yet
        const defaultPhotos = [
          { id: 'sg1', title: `${selectedSchool.name} Campus Premises`, category: "Premises", image: selectedSchool.image || "/images/hero-classroom.png", desc: `Main campus premises and academic halls at ${selectedSchool.name}` },
          { id: 'sg2', title: "Smart Interactive Learning Boards", category: "Classrooms", image: "/images/bg-gallery-hero.png", desc: "Digital visual learning setup for maximum retention" },
          { id: 'sg3', title: "Dedicated Doubt & Self Study Lounge", category: "Classrooms", image: "/images/hero-counseling.png", desc: "1-on-1 daily personal doubt resolution desks" },
          { id: 'sg4', title: "Science & Computer Practical Desk", category: "Classrooms", image: "/images/bg-courses-hero.png", desc: "Equipped practical desks and numerical guidance" },
          { id: 'sg5', title: "Academic Toppers Felicitation Ceremony", category: "Events", image: "/images/gallery-event-students.jpg", desc: `Celebrating merit rankers at ${selectedSchool.name}` },
          { id: 'sg6', title: "Parent Career Guidance & ACPC Workshop", category: "Seminars", image: "/images/bg-about-hero.png", desc: "Career stream guidance and admission counseling" }
        ];

        const combined = specificPhotos.length > 0 ? specificPhotos : defaultPhotos;

        // Filter by selected category
        const filtered = activeCategory === 'All' 
          ? combined 
          : combined.filter(pic => (pic.category || '').toLowerCase() === activeCategory.toLowerCase());

        const categories = ['All', 'Classrooms', 'Seminars', 'Events'];

        return (
          <section className="py-20 bg-[#FAFBFD] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
                  CAMPUS LIFE & INFRASTRUCTURE
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
                  {selectedSchool.name} Campus Gallery
                </h2>
                <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2">
                  Take a tour of our classrooms, practical labs, study halls, and student activities at {selectedSchool.name}.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer border ${
                      activeCategory === cat
                        ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-md scale-105'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-[#1C2E60]'
                    }`}
                  >
                    {cat === 'All' ? '📸 All Campus Photos' : cat}
                  </button>
                ))}
              </div>

              {/* Dynamic Auto-Arranging Responsive Grid */}
              <div className={`grid gap-6 ${
                filtered.length === 1 
                  ? 'grid-cols-1 max-w-md mx-auto' 
                  : filtered.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
                    : filtered.length === 3 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto' 
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto'
              }`}>
                {filtered.map((item, index) => {
                  const imgUrl = getEmbedImageUrl(item.image);
                  return (
                    <div
                      key={item.id || index}
                      onClick={() => setSelectedImageModal(item)}
                      className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1.5"
                    >
                      {/* Image Thumbnail with Overlay */}
                      <div className="relative h-52 sm:h-56 w-full bg-slate-900 overflow-hidden">
                        <img
                          src={imgUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                          onError={(e) => { e.target.src = '/images/hero-classroom.png'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-white/90 text-[#1C2E60] font-black text-xs px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                            <FiMaximize2 className="text-sm text-[#DC2626]" /> View Photo
                          </span>
                        </div>
                        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-xl">
                          {item.category || 'Premises'}
                        </span>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1C2E60] group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-slate-500 text-[11px] font-light leading-relaxed mt-1 line-clamp-2">
                            {item.desc || `Facilities & campus view at ${selectedSchool.name}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        );
      })()}

      {/* FULLSCREEN LIGHTBOX PHOTO MODAL */}
      {selectedImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedImageModal(null)}
        >
          <div 
            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-slate-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-[#DC2626] transition-colors cursor-pointer shadow-lg"
              aria-label="Close Preview"
            >
              <HiX className="text-xl" />
            </button>

            {/* Modal Image Box */}
            <div className="relative w-full max-h-[70vh] bg-slate-950 overflow-hidden flex items-center justify-center">
              <img
                src={getEmbedImageUrl(selectedImageModal.image)}
                alt={selectedImageModal.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200">
              <div>
                <span className="text-[10px] font-black text-[#DC2626] uppercase tracking-widest block">
                  {selectedImageModal.category || 'Campus Photo'} • {selectedSchool.name}
                </span>
                <h3 className="text-lg font-black text-[#1C2E60] mt-0.5">
                  {selectedImageModal.title}
                </h3>
                {selectedImageModal.desc && (
                  <p className="text-xs text-slate-600 font-light mt-1">
                    {selectedImageModal.desc}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedImageModal(null)}
                className="bg-[#1C2E60] hover:bg-[#142247] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shrink-0"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SCHOOL INQUIRY & ADMISSION FORM */}
      <section id="school-inquiry" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 via-white to-red-50 rounded-[32px] p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[#DC2626] font-black text-xs uppercase tracking-widest bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200">
                ADMISSION & INQUIRY FORM
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
                Inquire For {selectedSchool.name}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2">
                Fill out the form below to get batch schedules, fee structure, and counseling details for {selectedSchool.name}.
              </p>
            </div>

            {formSent ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">✅</span>
                <h4 className="text-base font-black text-green-800">Inquiry Sent Successfully!</h4>
                <p className="text-green-700 text-xs">Our counseling desk for {selectedSchool.name} will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yash Patel"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#DC2626] outline-none text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#DC2626] outline-none text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Standard / Stream</label>
                    <select
                      value={formData.program}
                      onChange={e => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#DC2626] outline-none text-xs bg-white"
                    >
                      <option value="Std 8th to 10th School Coaching">Std 8th to 10th School Coaching</option>
                      <option value="11th Science (GSEB / CBSE)">11th Science (GSEB / CBSE)</option>
                      <option value="12th Science Board & Competitive">12th Science Board & Competitive</option>
                      <option value="NEET / JEE Integrated Batch">NEET / JEE Integrated Batch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Selected Partner School</label>
                    <input
                      type="text"
                      disabled
                      value={selectedSchool.name}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Additional Notes / Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Mention batch timings or stream preference..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#DC2626] outline-none text-xs bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-extrabold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                >
                  Submit Inquiry For {selectedSchool.name}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. SWITCH TO OTHER PARTNER SCHOOLS */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[#DC2626] font-extrabold text-xs uppercase tracking-widest">EXPLORE OTHER CAMPUSES</span>
            <h3 className="text-2xl font-black text-[#1C2E60] mt-1">Our Other Partner Schools</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {partnerSchools.map(sch => {
              const isActive = sch.id === selectedSchool.id || sch.name === selectedSchool.name;
              return (
                <button
                  key={sch.id || sch.name}
                  onClick={() => handleSchoolSelect(sch)}
                  className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all border cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-lg scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50/50'
                  }`}
                >
                  <span>🏫 {sch.name}</span>
                  <span className="text-[10px] opacity-70">({sch.medium || 'English'})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
