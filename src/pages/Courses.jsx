import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMonitor, FiCheckCircle } from 'react-icons/fi';
import { coursesData } from '../data/coursesData';
import { adminData } from '../utils/adminData';
import { navigate } from '../utils/router';
import { getEmbedImageUrl } from '../utils/imageUrl';

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [allCourses, setAllCourses] = useState(() => adminData.getData('courses') || coursesData);
  const [coursePhotos, setCoursePhotos] = useState(() => {
    const all = adminData.getData('pageImages') || {};
    return all.courses || [];
  });

  useEffect(() => {
    const refreshData = () => {
      setAllCourses(adminData.getData('courses') || coursesData);
      const all = adminData.getData('pageImages') || {};
      setCoursePhotos(all.courses || []);
    };
    refreshData();
    const cleanup = adminData.initSync(refreshData);

    const handleHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        if (hash.includes('school')) setActiveCategory("school");
        else if (hash.includes('science')) setActiveCategory("science");
        else if (hash.includes('neet') || hash.includes('jee') || hash.includes('gujcet')) setActiveCategory("competitive");
        else if (hash.includes('diploma') || hash.includes('degree') || hash.includes('ddcet') || hash.includes('projects')) setActiveCategory("engineering");
        else if (hash.includes('career') || hash.includes('guidance')) setActiveCategory("guidance");
      }
    };
    handleHash();
    window.addEventListener('popstate', handleHash);

    return () => {
      if (typeof cleanup === 'function') cleanup();
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const STANDARD_CAT_LABELS = {
    all: 'All Programs',
    school: 'School (8th-10th)',
    science: '11th & 12th Science',
    competitive: 'Competitive (NEET/JEE)',
    engineering: 'Engineering / Diploma',
    guidance: 'Career Guidance'
  };

  const formatCatLabel = (cat) => {
    if (!cat || cat.toLowerCase() === 'all') return 'All Programs';
    return STANDARD_CAT_LABELS[cat.toLowerCase()] || (cat.charAt(0).toUpperCase() + cat.slice(1));
  };

  const normalizedCourses = (Array.isArray(allCourses) ? allCourses : coursesData).map(c => ({
    id: c.id || 'course-item',
    name: c.name || c.title || 'Academic Program',
    category: c.category || 'school',
    tagline: c.tagline || c.badge || c.subtitle || 'Academic Coaching',
    description: c.description || c.details || 'Comprehensive coaching for board exams, competitive entrances, and engineering semesters.',
    subjects: c.subjects || c.subtitle || 'Core Subjects, Test Series & Doubt Solving',
    mode: c.mode || 'Offline + Online',
    image: c.image || '',
    features: Array.isArray(c.features) ? c.features : (Array.isArray(c.highlights) ? c.highlights : ['Expert Faculty Mentor', 'Chapter Mocks & Revision', 'Doubt Solving Sessions'])
  }));

  const uniqueCategories = Array.from(new Set(
    normalizedCourses
      .map(c => (c.category || '').trim())
      .filter(Boolean)
  ));
  const categories = ['All', ...(uniqueCategories.length > 0 ? uniqueCategories : ['school', 'science', 'competitive', 'engineering', 'guidance'])];

  const filteredCourses = activeCategory.toLowerCase() === "all"
    ? normalizedCourses
    : normalizedCourses.filter(c => (c.category || '').toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">
      
      {/* Hero Header */}
      <section className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-courses-hero.png')}')`, backgroundPosition: 'center 60%' }}>
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Programs Offered
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Our Academic Programs
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            From 8th Standard Foundation to GTU Degree Engineering & Entrance Exams, explore our curated coaching batches.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center gap-3 flex-wrap">
        {categories.map((cat, idx) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                isActive
                  ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-md'
                  : 'bg-white text-zinc-500 border-slate-200 hover:text-[#0F172A] hover:border-slate-300'
              }`}
            >
              {formatCatLabel(cat)}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {course.image && (
                    <div className="h-44 -mx-6 -mt-6 mb-5 overflow-hidden relative bg-slate-100">
                      <img
                        src={getEmbedImageUrl(course.image)}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        {course.tagline}
                      </span>
                      {course.category && (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full uppercase">
                          {formatCatLabel(course.category)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 border border-slate-200 px-2 py-0.5 rounded-full">
                      {course.mode}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#0F172A] mb-2">{course.name}</h3>
                  <p className="text-zinc-500 text-xs font-light leading-relaxed mb-6">
                    {course.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="text-xs">
                      <strong className="text-[#0F172A] uppercase tracking-wider block mb-1">Subjects Covered:</strong>
                      <span className="text-zinc-600 font-light">{course.subjects}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {(course.features || []).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-zinc-500 font-light">
                        <FiCheckCircle className="text-blue-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Dynamic Page Content Photos: Classroom & Learning Environment */}
      {coursePhotos && coursePhotos.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200/80 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                Classroom Environment
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
                Learning Spaces & Labs
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2">
                See our interactive smart classrooms, competitive test halls, and engineering practice labs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coursePhotos.map((item, idx) => (
                <div key={idx} className="bg-[#F4F6F9] border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={getEmbedImageUrl(item.image || item.url)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.category && (
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-extrabold text-[#1C2E60] text-sm mb-1">{item.title}</h3>
                    {item.desc && <p className="text-zinc-500 text-[11px] font-light leading-relaxed">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
