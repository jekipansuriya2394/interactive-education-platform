import React from 'react';
import { FiCheckCircle, FiArrowRight, FiLayers, FiClock, FiHeart, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function IntegratedJEENEETPage() {
  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const pathway = [
    {
      stage: 'Stage 1: 8th–10th',
      title: 'Foundation',
      desc: 'Concept building in Maths and Science. Develop analytical and logical reasoning skills.'
    },
    {
      stage: 'Stage 2: 11th Science',
      title: 'Core Fundamentals',
      desc: 'Deep theory coverage for state board & CBSE, coupled with daily competitive numerical sheets.'
    },
    {
      stage: 'Stage 3: 12th Science',
      title: 'Board + Entrance Mastery',
      desc: 'Syllabus completion, revision marathons, full-length board mock exams, and test series.'
    },
    {
      stage: 'Stage 4: Milestone',
      title: 'JEE / NEET / DDCET',
      desc: 'Appear with confidence, backed by 50+ computer-based and OMR mock examinations.'
    }
  ];

  const advantages = [
    {
      title: 'Zero Travel Fatigue',
      desc: 'School hours and coaching classes are integrated into a single cohesive daily schedule, preventing exhaustion from running between coaching classes.'
    },
    {
      title: 'Unified Academic Vision',
      desc: 'What is taught for school exams directly complements competitive entrance syllabi without contradictory teaching methodologies.'
    },
    {
      title: 'Single Testing & Homework System',
      desc: 'No double homework pressure. Assignments, DPPs, and chapter tests are coordinated across school board requirements and competitive exam targets.'
    },
    {
      title: 'Dedicated Self-Study Time',
      desc: 'Because classes finish in structured hours, students retain 4–5 hours daily for focused self-study, doubt solving, and revision.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Signature Noble Academic Program
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            One Integrated Pathway to <span className="text-[#ED1C24]">School + JEE / NEET</span> Preparation
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            Our integrated approach is designed to reduce the gap between school academics and competitive preparation. Students receive structured guidance while developing the concepts and problem-solving skills needed for higher studies.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enquire for Integrated Batch
            </a>
            <a
              href="/integrated-schools"
              onClick={(e) => handleNav(e, '/integrated-schools')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Explore Partner Schools
            </a>
          </div>
        </div>
      </section>

      {/* Visual Pathway Horizontal Strip */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">The Learning Journey</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            School → Foundation → 11th/12th → Competitive Success
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {pathway.map((p, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-2xl p-6 relative group hover:border-[#ED1C24]/50 transition-all">
              <span className="text-xs font-black uppercase tracking-wider text-[#ED1C24] block mb-2">
                {p.stage}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Why Integration Works</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Advantages of the Integrated Model</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((adv, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold text-lg">
                  <FiCheckCircle />
                </div>
                <h3 className="text-lg font-bold text-white">{adv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#0F1626] border border-[#ED1C24]/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Join the Integrated Noble Cohort</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Talk to our academic directors about school partnerships and integrated batch timetables for 2026-27.
          </p>
          <div className="pt-2">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(237,28,36,0.4)]"
            >
              <span>Schedule Integrated Counseling</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
