import React from 'react';
import { FiCheckCircle, FiArrowRight, FiAward, FiTrendingUp, FiLayers, FiFileText } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function Science12thPage() {
  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const highlights = [
    {
      title: 'Timely Syllabus Completion',
      desc: 'Syllabus covered comprehensively well in advance, leaving ample dedicated time for revision marathons and full-length mock examinations.'
    },
    {
      title: 'Board Blueprint-Specific Mock Tests',
      desc: 'Simulate GSEB / CBSE final examination conditions with step-marking criteria, precise answer presentation tips, and error rectification.'
    },
    {
      title: 'GUJCET, JEE & NEET Alignment',
      desc: 'Simultaneous focus on MCQs, time-management strategies, shortcut problem-solving methods, and negative-marking prevention.'
    },
    {
      title: 'Numerical & Derivation Workshops',
      desc: 'Special intensive weekend workshops targeting 3-mark and 4-mark questions, theorem derivations, and high-weightage numericals.'
    },
    {
      title: 'ACPC Admission Guidance Support',
      desc: 'End-to-end assistance post-board exams for ACPC college registration, branch selection, mock choice filling, and merit list analysis.'
    },
    {
      title: 'Past 10 Years Question Paper Drill',
      desc: 'Systematic solving of board question papers and competitive archive sheets with model answers and peer benchmarking.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Board Final & Competitive Entrance Milestone
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            12th Science — <span className="text-[#ED1C24]">Board Preparation Meets</span> Competitive Preparation
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Master your 12th Science boards with top percentiles while building competitive sharpness for GUJCET, JEE Main, and NEET at Noble Education Vadodara.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enrol for 12th Science Batch
            </a>
            <a
              href="/results"
              onClick={(e) => handleNav(e, '/results')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              View 12th Board Results
            </a>
          </div>
        </div>
      </section>

      {/* Structured Framework */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Proven Academic System</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            How Noble Prepares 12th Science Achievers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-[#ED1C24]/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold text-lg">
                <FiCheckCircle />
              </div>
              <h3 className="text-base font-bold text-white">{h.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#0F1626] border border-[#ED1C24]/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Ready for Board & Entrance Success?</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Secure Your Seat in the 12th Science Toppers Batch
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Limited seats per batch to maintain dedicated educator attention and individual doubt resolution.
          </p>
          <div className="pt-2">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(237,28,36,0.4)]"
            >
              <span>Apply for 12th Science Admission</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
