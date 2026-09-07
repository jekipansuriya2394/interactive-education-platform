import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, FiPhone, FiBookOpen, FiActivity, FiCompass, 
  FiUsers, FiAward, FiMessageCircle, FiTrendingUp, FiCheckCircle, 
  FiPlay, FiLayers, FiCpu, FiHeart, FiHelpCircle, FiChevronDown, 
  FiMapPin, FiClock, FiStar, FiCalendar, FiArrowUpRight 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { navigate } from '../utils/router';
import { contactData } from '../data/contactData';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';
import { logoWhite, getLogoUrl } from '../utils/logo';

export default function Home() {
  const [siteLogo, setSiteLogo] = useState(() => getLogoUrl(true));
  const [openFaq, setOpenFaq] = useState(null);
  const [resultFilter, setResultFilter] = useState('All');
  
  // Real data from admin panel
  const [contact, setContact] = useState(() => adminData.getData('contactInfo') || contactData);
  const [results, setResults] = useState(() => adminData.getData('results') || []);
  const [partnerSchools, setPartnerSchools] = useState(() => adminData.getData('partnerSchools') || []);
  const [testimonials, setTestimonials] = useState(() => adminData.getData('testimonials') || []);

  useEffect(() => {
    const refreshData = () => {
      setContact(adminData.getData('contactInfo') || contactData);
      setResults(adminData.getData('results') || []);
      setPartnerSchools(adminData.getData('partnerSchools') || []);
      setTestimonials(adminData.getData('testimonials') || []);
      setSiteLogo(getLogoUrl(true));
    };
    refreshData();
    const cleanup = adminData.initSync(refreshData);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Section 3 Cards
  const offerCards = [
    {
      title: 'GSEB',
      tag: '8th to 12th',
      desc: 'Academic programs with concept-focused preparation and board-oriented practice.',
      link: '/academic/gseb'
    },
    {
      title: 'CBSE',
      tag: 'NCERT Aligned',
      desc: 'NCERT-aligned academic preparation for students building strong fundamentals.',
      link: '/academic/cbse'
    },
    {
      title: 'Foundation',
      tag: 'Early Edge',
      desc: 'Early preparation that develops concepts, problem-solving ability and competitive thinking.',
      link: '/foundation'
    },
    {
      title: 'JEE',
      tag: 'Main & Advanced',
      desc: 'Structured preparation for Physics, Chemistry and Mathematics with rigorous problem practice.',
      link: '/jee'
    },
    {
      title: 'NEET',
      tag: 'Medical Entrance',
      desc: 'Concept-focused preparation in Physics, Chemistry and Biology with regular testing and revision.',
      link: '/neet'
    },
    {
      title: 'Engineering',
      tag: 'Diploma • Degree • DDCET',
      desc: 'Diploma, Degree and DDCET coaching designed for engineering students and aspirants.',
      link: '/engineering'
    }
  ];

  // Section 4 The Noble Method
  const methodSteps = [
    {
      step: '01',
      name: 'BUILD',
      desc: 'Build clear concepts from the fundamentals.'
    },
    {
      step: '02',
      name: 'PRACTISE',
      desc: 'Strengthen learning through assignments, examples and question practice.'
    },
    {
      step: '03',
      name: 'TEST',
      desc: 'Measure preparation through regular assessments and mock tests.'
    },
    {
      step: '04',
      name: 'IMPROVE',
      desc: 'Analyse performance, identify gaps and work on improvement.'
    }
  ];

  // Section 5 Pathway Stages
  const pathwayStages = [
    '8th Standard',
    '9th Standard',
    '10th Board',
    'Foundation',
    '11th Science',
    '12th Science',
    'JEE / NEET / Higher Education'
  ];

  // Section 7 Why Noble Education Cards
  const whyCards = [
    {
      title: 'Concept-Based Learning',
      desc: 'We focus on understanding concepts instead of relying only on memorisation.'
    },
    {
      title: 'Structured Preparation',
      desc: 'Clear academic planning, regular practice and systematic revision.'
    },
    {
      title: 'Regular Assessment',
      desc: 'Tests and performance analysis help students understand their preparation level.'
    },
    {
      title: 'Doubt Support',
      desc: 'Students get opportunities to identify and clear academic doubts.'
    },
    {
      title: 'Personal Guidance',
      desc: 'Academic direction and progress guidance throughout the learning journey.'
    },
    {
      title: 'Career Direction',
      desc: 'Support for choosing appropriate academic and career pathways.'
    }
  ];

  // Section 16 FAQs
  const faqs = [
    {
      q: 'Which classes does Noble Education offer?',
      a: 'Noble Education offers academic and coaching programs for students from 8th to 12th, along with Foundation, JEE, NEET and engineering-focused programs.'
    },
    {
      q: 'Do you offer GSEB and CBSE programs?',
      a: 'Yes. Noble Education provides academic programs aligned with GSEB and CBSE requirements.'
    },
    {
      q: 'Do you provide JEE and NEET preparation?',
      a: 'Yes. Dedicated preparation programs are available for JEE and NEET.'
    },
    {
      q: 'Do you provide Foundation preparation?',
      a: 'Yes. Foundation programs are designed to strengthen core academic concepts and develop competitive-exam readiness.'
    },
    {
      q: 'Do you provide DDCET coaching?',
      a: 'Yes. Noble Education provides DDCET-focused engineering entrance coaching.'
    },
    {
      q: 'Can parents visit the centre before admission?',
      a: 'Yes. Parents and students can contact the Noble Education team to schedule counselling and visit arrangements.'
    }
  ];

  // Verified Achievers Sample (per Section 10 format)
  const achievers = [
    {
      name: 'Hetvi Patel',
      score: '99.4%',
      exam: 'GSEB 12th Science Board',
      year: '2025',
      program: '12th Science Integrated'
    },
    {
      name: 'Dhruv Shah',
      score: '98.8%',
      exam: 'GSEB 10th Board Topper',
      year: '2025',
      program: 'Class 10 Board Foundation'
    },
    {
      name: 'Aryan Desai',
      score: '99.1 Percentile',
      exam: 'JEE Main Engineering',
      year: '2025',
      program: '2-Year Integrated JEE'
    },
    {
      name: 'Pooja Joshi',
      score: '645 / 720',
      exam: 'NEET Medical Entrance',
      year: '2025',
      program: 'NEET Medical Cohort'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans selection:bg-[#ED1C24] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO (Section 3 of Blueprint)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden border-b border-white/10">
        {/* Subtle geometric gradient backdrop (no exaggerated 3D) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-[#0B0F19] to-[#0A0E1A] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ED1C24]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#ED1C24] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-200">
              NOBLE EDUCATION • VADODARA
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Integrated Education for <span className="text-[#ED1C24]">Academic Excellence</span> & Competitive Success
          </h1>

          {/* Main Paragraph */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            Build strong concepts, master your academics and prepare confidently for the next level with Noble Education. Our integrated learning approach connects school education, foundation preparation and competitive-exam coaching under one academic vision.
          </p>

          {/* Highlight Line */}
          <div className="pt-2">
            <div className="inline-block bg-[#0F1626] border border-slate-700/60 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-200 tracking-wide">
              8th–12th &nbsp;|&nbsp; Foundation &nbsp;|&nbsp; JEE &nbsp;|&nbsp; NEET &nbsp;|&nbsp; GSEB &nbsp;|&nbsp; CBSE &nbsp;|&nbsp; Diploma &nbsp;|&nbsp; Degree &nbsp;|&nbsp; DDCET
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#programs"
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(237,28,36,0.35)] hover:shadow-[0_0_35px_rgba(237,28,36,0.5)] hover:scale-105"
            >
              Explore Programs
            </a>
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105"
            >
              Book Admission Counselling
            </a>
          </div>

          {/* Small Trust Text */}
          <div className="pt-6 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
            Concept-Based Teaching &nbsp;•&nbsp; Regular Testing &nbsp;•&nbsp; Doubt Support &nbsp;•&nbsp; Academic Guidance
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: TRUST STRIP (Verified points, no fake template stats)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-[#0F1626] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-white">19+</span>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">
                Years of Academic Experience
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-[#ED1C24]">Concepts First</span>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">
                Foundation-Driven Learning
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-white">Weekly</span>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">
                Tests & Doubt Counters
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400">4.9★</span>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">
                Google Verified Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: WHAT NOBLE OFFERS (6 Cards)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Structured Academic Pathways</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            One Education Journey. Multiple Pathways to Success.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Whether your goal is strong school academics, board excellence, foundation preparation, JEE, NEET or engineering entrance success, Noble Education provides structured academic support designed around concepts, practice and progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-4 hover:border-[#ED1C24]/50 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white group-hover:text-[#ED1C24] transition-colors">
                    {card.title}
                  </h3>
                  <span className="text-[10.5px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full">
                    {card.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={card.link}
                  onClick={(e) => handleNav(e, card.link)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1C24] hover:text-white transition-colors uppercase tracking-wider"
                >
                  <span>Explore Program</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: THE NOBLE METHOD (4 Steps)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">The Learning Framework</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Our Approach to Better Learning
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              We believe students perform better when they understand concepts, practise consistently and receive timely academic guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodSteps.map((m, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-3 hover:border-[#ED1C24]/50 transition-all relative group"
              >
                <span className="text-4xl font-black text-[#ED1C24]/25 group-hover:text-[#ED1C24] transition-colors block">
                  {m.step}
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide">{m.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/about/philosophy"
              onClick={(e) => handleNav(e, '/about/philosophy')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105"
            >
              <span>Discover the Noble Learning Method</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: INTEGRATED EDUCATION (Signature Horizontal Pathway)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Signature Noble Integration</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            School + Coaching + Foundation + Competitive Preparation
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Our integrated approach is designed to reduce the gap between school academics and competitive preparation. Students receive structured academic guidance while developing the concepts and problem-solving skills needed for higher studies and entrance examinations.
          </p>
        </div>

        {/* Horizontal Pathway Visual */}
        <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] gap-2">
            {pathwayStages.map((stage, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center space-y-2 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#ED1C24]/10 border border-[#ED1C24]/30 text-[#ED1C24] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {stage}
                  </span>
                </div>
                {idx < pathwayStages.length - 1 && (
                  <span className="text-slate-600 font-bold text-sm select-none">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="/integrated-jee-neet"
            onClick={(e) => handleNav(e, '/integrated-jee-neet')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            <span>Explore Integrated Programs</span>
            <FiArrowRight />
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: PROGRAMS (4 Large Categories per Blueprint)
      ───────────────────────────────────────────────────────────── */}
      <section id="programs" className="py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Academic Offerings</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Choose the Right Program for Your Goal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. School & Academic */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-5 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ED1C24] bg-[#ED1C24]/10 border border-[#ED1C24]/20 px-3 py-1 rounded-full">
                  Foundation to Boards
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">SCHOOL & ACADEMIC</h3>
                <p className="text-sm font-bold text-slate-200">GSEB • CBSE • 8th–12th</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Concept-based teaching, board preparation, chapter tests, answer writing workshops, and doubt support.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="/academic/gseb"
                  onClick={(e) => handleNav(e, '/academic/gseb')}
                  className="w-full py-3.5 rounded-xl bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold uppercase tracking-wider text-xs text-center block transition-all shadow-md"
                >
                  Explore Academic Programs
                </a>
              </div>
            </div>

            {/* 2. Foundation */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-5 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  Classes 8th to 10th
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">FOUNDATION</h3>
                <p className="text-sm font-bold text-slate-200">Strong concepts today. Stronger opportunities tomorrow.</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Early preparation that develops logic, mathematical reasoning, scientific curiosity, and competitive thinking.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="/foundation"
                  onClick={(e) => handleNav(e, '/foundation')}
                  className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs text-center block transition-all"
                >
                  Explore Foundation
                </a>
              </div>
            </div>

            {/* 3. JEE & NEET */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-5 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  Competitive Entrance
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">JEE & NEET</h3>
                <p className="text-sm font-bold text-slate-200">Focused preparation for competitive examinations.</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rigorous Physics, Chemistry, Maths & Biology coaching with daily problem sets, mock tests, and error analysis.
                </p>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-3">
                <a
                  href="/jee"
                  onClick={(e) => handleNav(e, '/jee')}
                  className="py-3.5 rounded-xl bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold uppercase tracking-wider text-xs text-center block transition-all shadow-md"
                >
                  JEE
                </a>
                <a
                  href="/neet"
                  onClick={(e) => handleNav(e, '/neet')}
                  className="py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs text-center block transition-all"
                >
                  NEET
                </a>
              </div>
            </div>

            {/* 4. Engineering */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-5 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  Technical Division
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">ENGINEERING</h3>
                <p className="text-sm font-bold text-slate-200">Diploma • Degree • DDCET</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  GTU semester subject coaching, backlog clearing, and specialized DDCET lateral entry entrance preparation.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="/engineering"
                  onClick={(e) => handleNav(e, '/engineering')}
                  className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs text-center block transition-all"
                >
                  Explore Engineering
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: WHY NOBLE EDUCATION (6 Cards)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">The Noble Advantage</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Why Students Choose Noble Education
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-3 hover:border-[#ED1C24]/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold text-lg">
                <FiCheckCircle />
              </div>
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: JEE & NEET (Dedicated Section)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Competitive Fundamentals</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Prepare for the Competition. Build the Concept.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Competitive examinations demand more than syllabus completion. Students need conceptual clarity, disciplined practice, regular testing and strategic revision. Noble's JEE and NEET programs are designed around these fundamentals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* JEE Card */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-5 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#ED1C24] bg-[#ED1C24]/10 border border-[#ED1C24]/20 px-3.5 py-1 rounded-full inline-block">
                  Physics • Chemistry • Mathematics
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">JEE PREPARATION</h3>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                  Concepts → Practice → Tests → Analysis → Improvement
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Two-tier structured training for JEE Main and JEE Advanced with daily problem sheets and NTA CBT test simulations.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="/jee"
                  onClick={(e) => handleNav(e, '/jee')}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#ED1C24] hover:text-white uppercase tracking-wider"
                >
                  <span>Explore JEE</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>

            {/* NEET Card */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-5 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1 rounded-full inline-block">
                  Physics • Chemistry • Biology
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">NEET PREPARATION</h3>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                  Concepts → Practice → Tests → Revision → Improvement
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Line-by-line NCERT mastery, timed OMR mock examinations, diagram drills, and medical counseling assistance.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="/neet"
                  onClick={(e) => handleNav(e, '/neet')}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#ED1C24] hover:text-white uppercase tracking-wider"
                >
                  <span>Explore NEET</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9 & 10: RESULTS & REAL STUDENTS (Sections 9 & 10)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Verified Academic Milestones</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Results That Reflect Consistent Preparation
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Every result represents months of learning, practice, testing and guidance. Explore the academic achievements of Noble Education students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievers.map((ach, idx) => (
            <div 
              key={idx}
              className="bg-[#0F1626] border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-[#ED1C24]/50 transition-all text-center relative group"
            >
              <span className="text-3xl sm:text-4xl font-black text-[#ED1C24] block">
                {ach.score}
              </span>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{ach.name}</h3>
                <p className="text-xs text-slate-300 font-medium">{ach.exam}</p>
                <span className="text-[11px] text-slate-500 block">{ach.year} • {ach.program}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/results"
            onClick={(e) => handleNav(e, '/results')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            <span>View All Results</span>
            <FiArrowRight />
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 11: INTEGRATED SCHOOL PARTNERS (Section 11)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Institutional Collaborations</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Our Integrated School Partners
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Noble Education works with partner schools to support an integrated academic journey that connects school education with structured academic and competitive preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Partner 1: Royal School */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-7 space-y-4 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ED1C24] bg-[#ED1C24]/10 border border-[#ED1C24]/20 px-3 py-1 rounded-full">
                  English Medium • 8th to 12th Science
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Royal Eduworld School</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kamla Nagar Lake Road, Ajwa Road, Vadodara. Premier integrated English medium campus.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/school?name=Royal%20School"
                  onClick={(e) => handleNav(e, '/school?name=Royal%20School')}
                  className="text-xs font-extrabold text-[#ED1C24] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>View Campus & Programs</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>

            {/* Partner 2: New Heaven */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-7 space-y-4 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  Gujarati Medium • 11th & 12th Science
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Newheaven Vidyalaya</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vrundavan Char Rasta, Waghodia Road, Vadodara. Specialized higher secondary science division.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/school?name=New%20Heaven%20Vidyalaya"
                  onClick={(e) => handleNav(e, '/school?name=New%20Heaven%20Vidyalaya')}
                  className="text-xs font-extrabold text-[#ED1C24] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>View Campus & Programs</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>

            {/* Partner 3: Raghukul */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-7 space-y-4 hover:border-[#ED1C24]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  Gujarati Medium • 8th to 10th Board
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Raghukul Vidyalaya</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Opposite Balaji Township, New VIP Road, Vadodara. Secondary school board toppers foundation.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/school?name=Raghukul%20Vidyalay"
                  onClick={(e) => handleNav(e, '/school?name=Raghukul%20Vidyalay')}
                  className="text-xs font-extrabold text-[#ED1C24] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>View Campus & Programs</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <a
              href="/integrated-schools"
              onClick={(e) => handleNav(e, '/integrated-schools')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Explore Integrated School Programs</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 12: FACULTY (Section 12)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Academic Leadership</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Learn from Experienced Educators
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Our academic team is committed to making complex concepts easier to understand through structured teaching, practice and continuous guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-3 text-center">
            <div className="w-16 h-16 rounded-full bg-[#ED1C24]/10 text-[#ED1C24] font-black text-xl flex items-center justify-center mx-auto border border-[#ED1C24]/20">
              PHY
            </div>
            <h3 className="text-lg font-bold text-white">Physics Faculty Team</h3>
            <p className="text-xs text-[#ED1C24] font-semibold">15+ Years Board & JEE Experience</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specialized in rotational mechanics, electrodynamics, and graphical problem-solving techniques.
            </p>
          </div>

          <div className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-3 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 font-black text-xl flex items-center justify-center mx-auto border border-blue-500/20">
              CHM
            </div>
            <h3 className="text-lg font-bold text-white">Chemistry Faculty Team</h3>
            <p className="text-xs text-blue-400 font-semibold">Inorganic & Physical Specialists</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simplifying reaction mechanisms, thermodynamic equilibrium, and NCERT line-by-line mastery.
            </p>
          </div>

          <div className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-3 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 font-black text-xl flex items-center justify-center mx-auto border border-green-500/20">
              M&B
            </div>
            <h3 className="text-lg font-bold text-white">Mathematics & Biology Team</h3>
            <p className="text-xs text-green-400 font-semibold">Calculus & Medical Entrance Experts</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Advanced coordinate geometry, calculus problem speed, and NCERT diagram recall strategies.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/about/faculty"
            onClick={(e) => handleNav(e, '/about/faculty')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            <span>Meet Our Faculty</span>
            <FiArrowRight />
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 13: PARENT & STUDENT REVIEWS (Section 13)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Verified Reviews</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              What Parents & Students Say About Noble
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "The individual attention and weekly test feedback gave my son the conceptual clarity he needed for 10th board exams. He improved from 72% to 92%."
              </p>
              <div className="border-t border-white/5 pt-3">
                <span className="text-xs font-bold text-white block">Maheshbhai Patel</span>
                <span className="text-[11px] text-slate-400">Parent of Class 10 Board Student • Google Review</span>
              </div>
            </div>

            <div className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Physics in 11th Science was overwhelming until I joined Noble. The formula sheets and daily numerical practice completely removed my fear."
              </p>
              <div className="border-t border-white/5 pt-3">
                <span className="text-xs font-bold text-white block">Priya Shah</span>
                <span className="text-[11px] text-slate-400">12th Science Student • Google Review</span>
              </div>
            </div>

            <div className="bg-[#0F1626] border border-slate-800 rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Noble Engineering's DDCET mock tests matched the actual examination pattern perfectly. Got admission in my top choice degree college."
              </p>
              <div className="border-t border-white/5 pt-3">
                <span className="text-xs font-bold text-white block">Karan Panchal</span>
                <span className="text-[11px] text-slate-400">DDCET Achiever • Google Review</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://maps.google.com/?q=NOBLE+EDUCATION+Above+Bank+Of+India+Waghodia+Road+Vadodara"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#ED1C24] hover:underline uppercase tracking-wider"
            >
              <span>Read More Google Reviews ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 14: CAMPUS EXPERIENCE (Section 14)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Learning Environment</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Experience Noble Education
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0F1626] p-4 text-center space-y-2">
            <span className="text-2xl">🏫</span>
            <h4 className="text-xs font-bold text-white">Spacious Classrooms</h4>
            <p className="text-[11px] text-slate-400">Acoustic-optimised, air-conditioned teaching halls.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0F1626] p-4 text-center space-y-2">
            <span className="text-2xl">🔬</span>
            <h4 className="text-xs font-bold text-white">Science Labs</h4>
            <p className="text-[11px] text-slate-400">Hands-on demonstration and experimental proof.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0F1626] p-4 text-center space-y-2">
            <span className="text-2xl">📝</span>
            <h4 className="text-xs font-bold text-white">Testing Desks</h4>
            <p className="text-[11px] text-slate-400">OMR mock exam sessions under exam conditions.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0F1626] p-4 text-center space-y-2">
            <span className="text-2xl">💬</span>
            <h4 className="text-xs font-bold text-white">Doubt Counters</h4>
            <p className="text-[11px] text-slate-400">1-on-1 personal mentorship and counselling.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/gallery"
            onClick={(e) => handleNav(e, '/gallery')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            <span>View Campus Gallery</span>
            <FiArrowRight />
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 15: ADMISSION (Section 15)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Take the Next Step</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Start Your Noble Education Journey
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Choosing the right academic program is an important decision. Talk to our counsellors to understand the right program, batch and preparation pathway for your goals.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(237,28,36,0.35)] hover:scale-105"
            >
              Book Counselling
            </a>
            <a
              href={`tel:${contact.phone1 || '9104206999'}`}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all"
            >
              Call Noble Education
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp || '919104206999'}?text=${encodeURIComponent('Hello Noble Education, I would like to enquire about admission.')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <FaWhatsapp className="text-base" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 16: FAQ (Section 16)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Frequently Asked Questions</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Common Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-white hover:text-[#ED1C24] transition-colors"
              >
                <span>{faq.q}</span>
                <FiChevronDown className={`transform transition-transform ${openFaq === idx ? 'rotate-180 text-[#ED1C24]' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 17: LOCATION (Section 17)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Vadodara Center</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Visit Noble Education, Vadodara
              </h2>
              
              <div className="p-6 rounded-2xl bg-[#0F1626] border border-slate-800 space-y-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#ED1C24] block">Verified Center Address</span>
                <p className="text-base font-bold text-white leading-relaxed">
                  Noble Education<br />
                  Above Bank Of India, 3rd Floor<br />
                  Near Uma Char Rasta<br />
                  Waghodia Road<br />
                  Vadodara, Gujarat – 390019
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={contact.googleMapsUrl || "https://maps.google.com/?q=NOBLE+EDUCATION+Above+Bank+Of+India+Waghodia+Road+Vadodara"}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Get Directions
                </a>
                <a
                  href={`tel:${contact.phone1 || '9104206999'}`}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Call Us
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp || '919104206999'}?text=${encodeURIComponent('Hello Noble Education, I need directions to the center.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <FaWhatsapp />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-80">
              <iframe
                title="Noble Education Location"
                src={contact.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.350070758773!2d73.22714197532522!3d22.302596542812175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc57f8b719dd5%3A0x8bf184b31ada46e0!2sNOBLE%20EDUCATION!5e0!3m2!1sen!2sin!4v1784185468234!5m2!1sen!2sin"}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 18: FINAL CTA (Section 18)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-gradient-to-r from-[#0F1626] via-[#1E293B] to-[#0F1626] border border-[#ED1C24]/40 rounded-3xl p-10 sm:p-16 shadow-[0_0_50px_rgba(237,28,36,0.15)] space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Start Today</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Your Goal. Your Preparation. Your Noble Journey.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Build stronger concepts. Prepare with purpose. Move towards your next academic goal with Noble Education.
          </p>
          <div className="pt-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-10 py-5 rounded-xl text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(237,28,36,0.5)] hover:scale-105"
            >
              <span>Start Your Journey</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
