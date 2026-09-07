import React, { useState, useEffect } from 'react';
import { 
  FiMapPin, 
  FiPhone, 
  FiBookOpen, 
  FiAward, 
  FiCheckCircle, 
  FiArrowRight, 
  FiChevronRight, 
  FiMaximize2, 
  FiCompass, 
  FiTrendingUp, 
  FiClock, 
  FiHelpCircle,
  FiPlay,
  FiVideo
} from 'react-icons/fi';
import { HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { navigate } from '../utils/router';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl, isVideoMedia } from '../utils/imageUrl';
import { inquiryService } from '../utils/inquiryService';
import UniversalVideoModal from '../components/UniversalVideoModal';

export default function SchoolsOverview() {
  const [partnerSchools, setPartnerSchools] = useState(() => adminData.getData('partnerSchools') || []);
  const [allResults, setAllResults] = useState(() => adminData.getData('results') || []);
  const [galleryItems, setGalleryItems] = useState(() => adminData.getData('schoolPhotos') || adminData.getData('gallery') || []);

  // Filter state for gallery
  const [activeGalleryTab, setActiveGalleryTab] = useState('All');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  // FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Unified Admission Form
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    schoolPreference: 'Any / Need Guidance',
    standard: '10th Standard Board',
    message: ''
  });

  const refreshData = () => {
    setPartnerSchools(adminData.getData('partnerSchools') || []);
    setAllResults(adminData.getData('results') || []);
    setGalleryItems(adminData.getData('schoolPhotos') || adminData.getData('gallery') || []);
  };

  useEffect(() => {
    refreshData();
    const cleanup = adminData.initSync(refreshData);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const handleSchoolClick = (school) => {
    navigate(`/school?name=${encodeURIComponent(school.name)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    inquiryService.sendInquiry({
      ...formData,
      school: formData.schoolPreference,
      formSource: 'Schools Overview Page',
      message: `Inquiry from Partner Schools Overview: Preferred Campus: ${formData.schoolPreference}, Standard: ${formData.standard}. Note: ${formData.message || 'Admission Details Requested'}`
    });

    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({
        name: '',
        phone: '',
        schoolPreference: 'Any / Need Guidance',
        standard: '10th Standard Board',
        message: ''
      });
    }, 4000);
  };

  // Filter school toppers
  const partnerToppers = allResults.filter(r => {
    if (!r.school) return false;
    const s = r.school.toLowerCase();
    return s.includes('royal') || s.includes('raghukul') || s.includes('new heaven');
  }).slice(0, 4);

  // Default fallback gallery if empty
  const defaultPhotos = [
    { id: 'so1', title: 'Royal School Campus Premises', category: 'Premises', image: '/images/hero-classroom.png', desc: 'Main academic building on Ajwa Road' },
    { id: 'so2', title: 'Smart Digital Classrooms', category: 'Classrooms', image: '/images/bg-gallery-hero.png', desc: 'Interactive concept visualization setup' },
    { id: 'so3', title: 'Science Laboratory & Practical Desk', category: 'Labs', image: '/images/bg-courses-hero.png', desc: 'Practical demonstration and guidance' },
    { id: 'so4', title: '1-on-1 Doubt Resolution Sessions', category: 'Classrooms', image: '/images/hero-counseling.png', desc: 'Daily personal faculty guidance' },
    { id: 'so5', title: 'Board Toppers Felicitation Ceremony', category: 'Events', image: '/images/gallery-event-students.jpg', desc: 'Celebrating academic rankers across campuses' },
    { id: 'so6', title: 'Parent Career Guidance Workshop', category: 'Events', image: '/images/bg-about-hero.png', desc: 'Stream selection and board counseling' }
  ];

  const displayPhotos = (galleryItems && galleryItems.length > 0) ? galleryItems : defaultPhotos;
  const filteredPhotos = activeGalleryTab === 'All' 
    ? displayPhotos 
    : displayPhotos.filter(p => (p.category || '').toLowerCase() === activeGalleryTab.toLowerCase());

  const faqs = [
    {
      q: 'How does the integrated school coaching model work?',
      a: 'Our subject faculties teach directly inside the partner school premises. The coaching syllabus is 100% synchronized with the school curriculum, eliminating travel between school and external coaching classes.'
    },
    {
      q: 'Which standards are covered at the partner campuses?',
      a: 'We offer Standards 8th, 9th, and 10th Board Foundation at Royal School (English Medium) and Raghukul Vidyalay (Gujarati Medium), and 11th & 12th Science Stream (Group A & Group B with NEET/JEE) at Royal School and New Heaven Vidyalaya.'
    },
    {
      q: 'How do I enroll my child in a partner school batch?',
      a: 'You can submit the admission inquiry form on this page, call our central helpline (96382 56222), or visit the respective campus desk directly during visiting hours (Mon-Sat 8:00 AM – 7:00 PM).'
    },
    {
      q: 'Are competitive exam coaching (NEET / JEE / GUJCET) included?',
      a: 'Yes, for 11th and 12th Science students, comprehensive preparation for GUJCET, NEET, and JEE Main is integrated into the weekly timetable along with textbook theory and Daily Practice Problem (DPP) sheets.'
    },
    {
      q: 'Can parents meet the subject faculties for progress reviews?',
      a: 'Absolutely. We conduct regular Parent-Teacher Meetings (PTMs) and share chapter-wise test analytics and attendance updates after every evaluation cycle.'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1C2E60]">

      {/* 1. HERO HEADER SECTION (IDENTICAL SIZING, PADDING & STYLE TO ABOUT PAGE) */}
      <section
        className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-about-hero.png')}')`, backgroundPosition: 'center 80%' }}
      >
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 inline-block">
            Integrated Partner Schools
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Our Integrated Partner Campuses
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Noble Education partners directly with premier schools across Vadodara to deliver 100% board-synchronized coaching and NEET/JEE preparation.
          </p>
        </div>
      </section>

      {/* 2. COMPACT ACTION & HIGHLIGHTS BAR */}
      <section className="py-3.5 border-b border-slate-200 bg-white shadow-xs sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          
          {/* Quick Action Links */}
          <div className="flex items-center gap-2">
            <a
              href="#campuses"
              className="bg-[#1C2E60] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-900 transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>🏫</span> View Campuses ⬇
            </a>
            <a
              href="#school-inquiry"
              className="bg-red-50 text-[#DC2626] border border-red-200 px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-all"
            >
              ✍ Admission Inquiry
            </a>
            <a
              href="tel:9638256222"
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 font-bold bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-all"
            >
              <FiPhone className="text-green-600 text-xs" /> 96382 56222
            </a>
          </div>

          {/* Inline Quick Highlights */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1 font-bold text-[#1C2E60]">
              <span className="text-red-500 text-[10px]">✔</span> 3 Prime Campuses
            </span>
            <span className="flex items-center gap-1 font-bold text-[#1C2E60]">
              <span className="text-red-500 text-[10px]">✔</span> Std 8th to 12th
            </span>
            <span className="hidden md:flex items-center gap-1 font-bold text-[#1C2E60]">
              <span className="text-red-500 text-[10px]">✔</span> Dual Medium
            </span>
            <span className="hidden md:flex items-center gap-1 font-bold text-[#1C2E60]">
              <span className="text-red-500 text-[10px]">✔</span> 100% Integrated
            </span>
          </div>

        </div>
      </section>

      {/* 2. CAMPUS EXPLORER SECTION (THE 3 PARTNER SCHOOLS) */}
      <section id="campuses" className="py-20 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              CAMPUS EXPLORER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
              Explore Our Partner Campuses in Vadodara
            </h2>
            <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2">
              Select any of our partner campuses below for detailed curriculum, faculty schedules, campus facilities, and admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerSchools.map((school, index) => {
              const photo = school.image ? getEmbedImageUrl(school.image) : '/images/hero-classroom.png';
              const googleMapsUrl = school.mapUrl || school.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(school.name + ' ' + (school.address || 'Vadodara'))}`;
              const cleanPhone = (school.contact || '9638256222').replace(/\D/g, '');

              return (
                <div
                  key={school.id || index}
                  className="bg-white rounded-[32px] border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-2"
                >
                  <div>
                    {/* Campus Image Header */}
                    <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={photo}
                        alt={school.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        onError={(e) => { e.target.src = '/images/hero-classroom.png'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="bg-white/90 backdrop-blur-md text-[#1C2E60] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                          {school.medium || 'English Medium'}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-black text-white leading-tight">
                          {school.name}
                        </h3>
                        <p className="text-slate-300 text-xs font-light mt-0.5 truncate">
                          📍 {school.address ? school.address.split(',')[0] : 'Vadodara'}
                        </p>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 space-y-4">
                      <div className="bg-blue-50/80 border border-blue-100/90 p-3 rounded-2xl flex items-center gap-2.5 text-xs text-[#1C2E60] font-bold">
                        <FiBookOpen className="text-[#DC2626] text-sm shrink-0" />
                        <span>{school.standards || 'Standards 8th to 12th Science'}</span>
                      </div>

                      <p className="text-slate-500 text-xs font-light leading-relaxed line-clamp-3">
                        {school.description || 'Premier integrated coaching partner offering complete board curriculum, concept coaching, and competitive examination preparation.'}
                      </p>

                      {/* Clickable Google Maps Address */}
                      {school.address && (
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-600 hover:text-[#DC2626] transition-colors group/map"
                        >
                          <FiMapPin className="text-red-500 shrink-0" />
                          <span className="truncate">{school.address}</span>
                          <span className="text-blue-600 text-[10px] uppercase font-black shrink-0 group-hover/map:underline">Maps ↗</span>
                        </a>
                      )}

                      {/* Contact & Desk Info */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                        <span className="text-slate-400 font-bold">Desk Helpline:</span>
                        <a href={`tel:${school.contact || '9638256222'}`} className="font-extrabold text-[#1C2E60] hover:text-[#DC2626]">
                          📞 {school.contact || '96382 56222'}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="p-6 pt-0 space-y-2.5">
                    <button
                      onClick={() => handleSchoolClick(school)}
                      className="w-full bg-[#1C2E60] hover:bg-[#DC2626] text-white font-extrabold py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore Campus Details</span>
                      <FiArrowRight />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${school.contact || '9638256222'}`}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-[11px] text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <FiPhone className="text-green-600" /> Call Desk
                      </a>
                      <a
                        href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello, I want admission details for ${school.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold py-2.5 rounded-xl text-[11px] text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <FaWhatsapp className="text-[#25D366]" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. SIDE-BY-SIDE CAMPUS COMPARISON MATRIX */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              CAMPUS COMPARISON
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
              Find the Right Campus For Your Child
            </h2>
            <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2">
              Compare our partner campuses by medium of instruction, standards offered, location, and curriculum model.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm text-left">
              <thead>
                <tr className="bg-[#1C2E60] text-white text-xs uppercase tracking-wider">
                  <th className="p-4 sm:p-5 font-black">Partner Campus</th>
                  <th className="p-4 sm:p-5 font-black">Medium</th>
                  <th className="p-4 sm:p-5 font-black">Standards Offered</th>
                  <th className="p-4 sm:p-5 font-black">Location Area</th>
                  <th className="p-4 sm:p-5 font-black">Contact Desk</th>
                  <th className="p-4 sm:p-5 font-black text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {partnerSchools.map((sch, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 sm:p-5 font-black text-[#1C2E60] whitespace-nowrap">
                      🏫 {sch.name}
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        (sch.medium || '').includes('English') 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {sch.medium || 'English Medium'}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-slate-700 whitespace-nowrap">
                      {sch.standards || 'Std 8th to 12th'}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500 font-light truncate max-w-[200px]">
                      📍 {sch.address ? sch.address.split(',')[0] : 'Vadodara'}
                    </td>
                    <td className="p-4 sm:p-5">
                      <a href={`tel:${sch.contact || '9638256222'}`} className="font-bold text-blue-600 hover:underline whitespace-nowrap">
                        📞 {sch.contact || '96382 56222'}
                      </a>
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <button
                        onClick={() => handleSchoolClick(sch)}
                        className="bg-[#DC2626] hover:bg-red-700 text-white font-extrabold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
                      >
                        View Campus ➜
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 4. THE INTEGRATED COACHING ADVANTAGE */}
      <section className="py-20 bg-[#F4F7FA] bg-dots-pattern border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              THE NOBLE ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
              Why Choose Our Integrated Partner Schools?
            </h2>
            <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2">
              Our unique in-school coaching system combines the discipline of school education with the competitive rigor of premier coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: "🚫", 
                title: "Zero Travel Fatigue", 
                desc: "Students study in their own school building. No running around the city between tuition classes saves 2 to 3 valuable hours every day." 
              },
              { 
                icon: "📅", 
                title: "Synchronized Syllabus", 
                desc: "Classroom lessons and institute guidance align 100% with school terminal exams, unit tests, and board board schedules." 
              },
              { 
                icon: "💡", 
                title: "Daily In-Person Doubts", 
                desc: "Dedicated subject faculties stay on campus after hours to give personal 1-on-1 attention and numerical problem solving." 
              },
              { 
                icon: "🎯", 
                title: "Board Prelim Test Series", 
                desc: "Rigorous simulated board examination series with detailed rank reporting, question-level analytics, and parent SMS updates." 
              }
            ].map((adv, idx) => (
              <div key={idx} className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-3">
                <div className="text-4xl">{adv.icon}</div>
                <h3 className="text-lg font-black text-[#1C2E60]">{adv.title}</h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ACADEMIC ACHIEVERS FROM PARTNER SCHOOLS */}
      {partnerToppers.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[#DC2626] font-black text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
                  TOP RANKERS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
                  Partner School Academic Achievers
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm font-light mt-1">
                  Celebrating top board percentile rankers and toppers studying at our partner campuses.
                </p>
              </div>

              <button
                onClick={() => navigate('/results')}
                className="bg-[#1C2E60] hover:bg-[#DC2626] text-white font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md self-start md:self-auto cursor-pointer"
              >
                View All Institute Results ➜
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerToppers.map((item, idx) => {
                const photo = item.image ? getEmbedImageUrl(item.image) : '/images/shital-result.png';
                return (
                  <div
                    key={idx}
                    onClick={() => navigate('/results')}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={photo}
                          alt={item.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = '/images/shital-result.png'; }}
                        />
                        <div className="absolute top-3 left-3 bg-[#1C2E60] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                          ⭐ TOP RANKER
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md inline-block">
                          🏫 {item.school}
                        </span>
                        <h4 className="text-base font-black text-[#1C2E60] group-hover:text-[#DC2626] transition-colors leading-snug">
                          {item.name}
                        </h4>
                        <div className="bg-gradient-to-r from-red-50 to-blue-50 border border-slate-100 p-2.5 rounded-xl text-center">
                          <span className="text-xl font-black text-[#DC2626] block">{item.score}</span>
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase">{item.exam || 'Board Rank'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. CAMPUS LIFE & FACILITIES GALLERY */}
      <section className="py-20 bg-[#FAFBFD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              CAMPUS LIFE & INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
              Partner School Facilities & Activities
            </h2>
            <p className="text-[#5A6472] font-light text-xs sm:text-sm mt-2">
              Explore our modern interactive classrooms, fully-equipped science laboratories, and student events.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', 'Premises', 'Classrooms', 'Labs', 'Events'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveGalleryTab(tab)}
                className={`px-5 py-2 rounded-2xl text-xs font-extrabold transition-all border cursor-pointer ${
                  activeGalleryTab === tab
                    ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab === 'All' ? '📸 All Photos' : tab}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.slice(0, 6).map((pic, idx) => {
              const isVid = pic.mediaType === 'video' || !!pic.videoUrl || isVideoMedia(pic);
              const imgUrl = getEmbedImageUrl(pic.image || pic.videoUrl);
              return (
                <div
                  key={pic.id || idx}
                  onClick={() => setSelectedPhotoModal(pic)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                >
                  <div className="relative h-56 bg-slate-900 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={pic.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/images/hero-classroom.png'; }}
                    />
                    {isVid && (
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <FiPlay className="text-xl ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-[#1C2E60] font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg">
                        {isVid ? <><FiPlay className="text-[#DC2626]" /> Play Video</> : <><FiMaximize2 className="text-[#DC2626]" /> View Photo</>}
                      </span>
                    </div>
                    {isVid && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow">
                        <FiVideo size={10} /> Video
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-black text-[#DC2626] uppercase">{pic.category || 'Facility'}</span>
                    <h4 className="text-sm font-extrabold text-[#1C2E60] mt-0.5">{pic.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* UNIVERSAL VIDEO MODAL */}
      {selectedPhotoModal && (selectedPhotoModal.mediaType === 'video' || !!selectedPhotoModal.videoUrl || isVideoMedia(selectedPhotoModal)) && (
        <UniversalVideoModal
          item={selectedPhotoModal}
          isOpen={true}
          onClose={() => setSelectedPhotoModal(null)}
        />
      )}

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {selectedPhotoModal && !(selectedPhotoModal.mediaType === 'video' || !!selectedPhotoModal.videoUrl || isVideoMedia(selectedPhotoModal)) && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoModal(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhotoModal(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-[#DC2626] transition-colors cursor-pointer"
            >
              <HiX className="text-xl" />
            </button>
            <img
              src={getEmbedImageUrl(selectedPhotoModal.image)}
              alt={selectedPhotoModal.title}
              className="max-h-[70vh] w-full object-contain bg-slate-950"
            />
            <div className="p-6 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-[#DC2626] uppercase block">{selectedPhotoModal.category}</span>
                <h3 className="text-base font-black text-[#1C2E60]">{selectedPhotoModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="bg-[#1C2E60] text-white font-bold px-5 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. CENTRALIZED ADMISSION INQUIRY FORM */}
      <section id="school-inquiry" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 via-white to-red-50 rounded-[32px] p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[#DC2626] font-black text-xs uppercase tracking-widest bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200">
                ADMISSION & VISIT GUIDANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
                Apply / Inquire For Any Partner School
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2">
                Have questions about medium, timings, fee structure, or campus locations? Fill out the form below for immediate guidance.
              </p>
            </div>

            {formSent ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">✅</span>
                <h4 className="text-base font-black text-green-800">Inquiry Sent Successfully!</h4>
                <p className="text-green-700 text-xs">Our school admissions coordinator will get in touch with you shortly.</p>
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
                    <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Select Campus Preference</label>
                    <select
                      value={formData.schoolPreference}
                      onChange={e => setFormData({ ...formData, schoolPreference: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#DC2626] outline-none text-xs bg-white font-bold"
                    >
                      <option value="Any / Need Guidance">Any / Need Guidance from Counselor</option>
                      {partnerSchools.map((sch, i) => (
                        <option key={i} value={sch.name}>{sch.name} ({sch.medium || 'English'})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Standard / Target Batch</label>
                    <select
                      value={formData.standard}
                      onChange={e => setFormData({ ...formData, standard: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#DC2626] outline-none text-xs bg-white font-bold"
                    >
                      <option value="8th Standard Foundation">8th Standard Foundation</option>
                      <option value="9th Standard Foundation">9th Standard Foundation</option>
                      <option value="10th Standard Board">10th Standard Board</option>
                      <option value="11th Science (PCB/PCM)">11th Science (PCB/PCM)</option>
                      <option value="12th Science Board & NEET/JEE">12th Science Board & NEET/JEE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#1C2E60] uppercase mb-1">Your Question / Message</label>
                  <textarea
                    rows={3}
                    placeholder="Mention any specific requirements or questions regarding batch timings or transport..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#DC2626] outline-none text-xs bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-extrabold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                >
                  Submit Inquiry For Partner Schools
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-black text-[#1C2E60] mt-3">
              Common Questions About Partner Schools
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-black text-sm text-[#1C2E60] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiHelpCircle className="text-[#DC2626] shrink-0" />
                      {faq.q}
                    </span>
                    <span className="text-lg font-bold text-slate-400">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-slate-600 font-light leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
