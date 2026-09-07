import React, { useState } from 'react';
import { FiCheckCircle, FiArrowRight, FiHeart, FiCpu, FiTrendingUp, FiAward, FiLayers, FiFileText, FiChevronDown } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function NEETPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const subjects = [
    {
      name: 'Biology (Botany & Zoology)',
      weightage: '360 / 720 Marks',
      desc: 'Line-by-line NCERT mastery with diagram analysis, scientific taxonomies, physiological cycles, and 100+ chapterwise speed tests to target 340+ in Biology.'
    },
    {
      name: 'Physics for Medical Aspirants',
      weightage: '180 / 720 Marks',
      desc: 'Focused formula derivation, graphical analysis, and rapid MCQ solving techniques designed specifically to remove the common fear of physics in medical aspirants.'
    },
    {
      name: 'Chemistry (Physical, Inorganic & Organic)',
      weightage: '180 / 720 Marks',
      desc: 'In-depth reaction mechanisms, periodic trends, equilibrium numericals, and organic reagents strictly based on the updated NTA NEET syllabus.'
    }
  ];

  const highlights = [
    {
      title: 'Strict NCERT Orientation',
      desc: 'Over 90% of NEET questions stem directly from NCERT textbook lines, footnotes, and diagrams. Our study sheets decode every chapter with precision.'
    },
    {
      title: 'OMR Speed & Accuracy Drills',
      desc: 'Timed 3 hour 20 minute full-length mock examinations on genuine OMR sheets to train students against negative marking and exam pressure.'
    },
    {
      title: 'Question-Wise Performance Analytics',
      desc: 'Identify specific weak areas (e.g. Genetics, Thermodynamics, Electromagnetism) with AI-powered diagnostic scorecards.'
    },
    {
      title: 'Systematic 3-Phase Revision',
      desc: 'Phase 1: Deep syllabus completion; Phase 2: High-yield topic revision; Phase 3: Daily grand mock tests and rank prediction.'
    }
  ];

  const faqs = [
    {
      q: 'How does Noble Education help medical aspirants score high in NEET Physics?',
      a: 'We teach Physics starting from fundamental mathematical tools (basic calculus, vectors, algebra), followed by conceptual demonstrations and step-by-step MCQ shortcuts that build numerical confidence.'
    },
    {
      q: 'How frequently are NEET mock tests conducted?',
      a: 'Students undergo weekly chapter tests in 11th and 12th, progressing to bi-weekly part-syllabus tests, and eventually daily grand full-length OMR mock exams during the final 3 months before NEET.'
    },
    {
      q: 'Is guidance provided for Gujarat state quota medical counseling?',
      a: 'Yes. After results, we provide complete step-by-step guidance for ACPUGMEC state quota choices, central MCC AIQ registration, and government medical college merit analysis.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Medical Entrance Division
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            NEET Preparation — <span className="text-[#ED1C24]">Build Strong Concepts</span> for Medical Entrance Success
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Physics, Chemistry, and Biology preparation with regular tests, NCERT focus, structured revision, doubt support, and academic guidance in Vadodara.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enrol for NEET Batch
            </a>
            <a
              href="/results"
              onClick={(e) => handleNav(e, '/results')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              View Medical Achievers
            </a>
          </div>
        </div>
      </section>

      {/* Subject Breakdown */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">720-Mark Breakdown</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">NEET Core Subject Mastery</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {subjects.map((sub, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-[#ED1C24]/50 transition-all shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#ED1C24] uppercase tracking-wider bg-[#ED1C24]/10 border border-[#ED1C24]/20 px-3 py-1 rounded-full">
                  {sub.weightage}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{sub.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{sub.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Key Highlights */}
      <section className="py-16 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">The Medical Protocol</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Why Noble NEET Preparation Delivers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold text-lg">
                  <FiCheckCircle />
                </div>
                <h3 className="text-base font-bold text-white">{h.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">NEET Preparation FAQs</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-white hover:text-[#ED1C24] transition-colors"
              >
                <span>{faq.q}</span>
                <FiChevronDown className={`transform transition-transform ${openFaq === idx ? 'rotate-180 text-[#ED1C24]' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#0F1626] border border-[#ED1C24]/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Begin Your Medical Entrance Journey</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Connect with our NEET academic mentors for a comprehensive syllabus roadmap and batch scheduling.
          </p>
          <div className="pt-2">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(237,28,36,0.4)]"
            >
              <span>Apply for NEET Admission</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
