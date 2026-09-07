import React, { useState } from 'react';
import { FiCheckCircle, FiArrowRight, FiCpu, FiTrendingUp, FiAward, FiLayers, FiFileText, FiChevronDown } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function JEEPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const pillars = [
    {
      title: 'Concept Mastery',
      desc: 'Build rock-solid fundamentals in Physics, Chemistry, and Mathematics from first principles. No reliance on short-term formula memorisation.'
    },
    {
      title: 'Graded Problem Solving',
      desc: 'Rigorous multi-tier practice sheets progressing from textbook basics to JEE Main difficulty and challenging multi-concept JEE Advanced levels.'
    },
    {
      title: 'Test & Deep Analysis',
      desc: 'Computer-based mock tests replicating NTA exam conditions with in-depth question-by-question time-spent metrics and negative marking reports.'
    }
  ];

  const batches = [
    {
      name: '2-Year Integrated JEE Program',
      audience: 'Students entering 11th Science',
      desc: 'Complete synchronization between school curriculum and JEE Main + Advanced syllabus. Zero travel fatigue, seamless board and competitive prep.',
      highlights: ['Full Physics, Chemistry & Maths Coverage', 'Daily Practice Problems (DPP)', 'NTA CBT Test Series', 'Formula Handbooks & Archive Questions']
    },
    {
      name: '1-Year Targeted 12th JEE Program',
      audience: 'Students entering 12th Science',
      desc: 'Master the 12th competitive syllabus while systematically revising 11th backlogs through weekend revision workshops and chapter tests.',
      highlights: ['Fast-track 11th Revision Modules', 'High-Weightage Topic Drilling', 'Weekly Full-Length JEE Mock Exams', 'Doubt Clearing Sessions']
    }
  ];

  const faqs = [
    {
      q: 'Do you prepare students for both JEE Main and JEE Advanced?',
      a: 'Yes. Our curriculum is structured in two tiers: Tier 1 builds precision, speed, and accuracy for JEE Main, while Tier 2 develops deep analytical depth and multi-concept problem handling for JEE Advanced.'
    },
    {
      q: 'How do students balance board exams and JEE preparation?',
      a: 'Because JEE and state board (GSEB/CBSE) share common NCERT core physics, chemistry, and mathematics principles, our faculty teach the fundamental theory first for board exams, then immediately extend it into competitive numerical applications.'
    },
    {
      q: 'What study material is provided for JEE aspirants?',
      a: 'Students receive comprehensive chapter modules, graded problem sets (Levels 1, 2, and 3), last 15 years solved JEE Main and Advanced archives, formula summary handbooks, and test analysis workbooks.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Engineering Competitive Division
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            JEE Preparation — <span className="text-[#ED1C24]">Learn the Concept.</span> Solve the Problem.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Competitive examinations demand more than syllabus completion. Build conceptual clarity, disciplined practice, regular testing, and strategic revision for JEE Main & Advanced in Vadodara.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enquire for JEE Batches
            </a>
            <a
              href="/results"
              onClick={(e) => handleNav(e, '/results')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              View Engineering Achievers
            </a>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">The Noble Foundation</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Our Three Pillars of JEE Success</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pil, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-[#ED1C24]/50 transition-all text-center">
              <div className="w-12 h-12 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold text-xl mx-auto">
                <FiCpu />
              </div>
              <h3 className="text-xl font-bold text-white">{pil.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{pil.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Program Batches */}
      <section className="py-16 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Targeted Batches</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">JEE Preparation Pathways</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {batches.map((b, idx) => (
              <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-5 hover:border-[#ED1C24]/50 transition-all">
                <span className="bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                  {b.audience}
                </span>
                <h3 className="text-2xl font-black text-white">{b.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>

                <div className="space-y-2 pt-2">
                  {b.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <FiCheckCircle className="text-[#ED1C24] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href="/admissions"
                    onClick={(e) => handleNav(e, '/admissions')}
                    className="w-full py-3.5 rounded-xl bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold uppercase tracking-wider text-xs text-center transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Enquire for this Batch</span>
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">JEE Preparation FAQs</h2>
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
    </div>
  );
}
