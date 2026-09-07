import React from 'react';
import { FiCheckCircle, FiArrowRight, FiBookOpen, FiCpu, FiHeart, FiLayers, FiHelpCircle } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function Science11thPage() {
  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const subjects = [
    {
      name: 'Physics',
      focus: 'Mechanics, Thermodynamics & Waves',
      desc: 'Master vectors, kinematics, Newton\'s laws, work-energy, and rotational dynamics through numerical solving and conceptual derivation.'
    },
    {
      name: 'Chemistry',
      focus: 'Physical, Inorganic & Organic Core',
      desc: 'Deep study of atomic structure, chemical bonding, thermodynamics, equilibrium, and periodic properties aligned with NCERT.'
    },
    {
      name: 'Mathematics',
      focus: 'Algebra, Trigonometry & Coordinate Geometry',
      desc: 'Build rigorous problem-solving speed for functions, complex numbers, permutations, conic sections, and introductory calculus.'
    },
    {
      name: 'Biology',
      focus: 'Cell Biology, Plant & Human Physiology',
      desc: 'Line-by-line NCERT conceptual clarity with diagram-based memorisation techniques, scientific terminology, and MCQs.'
    }
  ];

  const pillars = [
    {
      title: 'State Board & CBSE Rigour',
      desc: 'Cover every textbook chapter systematically with conceptual derivations, descriptive answer writing, and school exam alignment.'
    },
    {
      title: 'JEE Main & Advanced Base',
      desc: 'Progressive problem sheets (Level 1 Foundation to Level 2 Advanced) designed to develop high-order analytical skills from day one.'
    },
    {
      title: 'NEET Medical Entrance Pathway',
      desc: 'Strict NCERT orientation, daily concept recall quizzes, assertion-reason practice, and timed speed drills.'
    },
    {
      title: 'Daily Practice Problems (DPP)',
      desc: 'Every lecture is paired with 15–20 curated questions to consolidate concepts before moving to the next topic.'
    },
    {
      title: 'Dedicated Doubt Solving Counters',
      desc: 'Regular 1-on-1 sessions where educators resolve student queries without judgment, ensuring zero concept lag.'
    },
    {
      title: 'Bi-Weekly Assessment & Feedback',
      desc: 'OMR-based competitive mock tests and subjective board papers with granular performance analysis shared with parents.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Higher Secondary Science Division
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            11th Science — <span className="text-[#ED1C24]">Build the Base</span> for 12th, JEE & NEET
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            The concepts you build in 11th become the foundation for your future performance. Experience structured learning, daily practice, and personal academic guidance.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enquire for 11th Science Batch
            </a>
            <a
              href="/integrated-jee-neet"
              onClick={(e) => handleNav(e, '/integrated-jee-neet')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Explore Integrated Pathway
            </a>
          </div>
        </div>
      </section>

      {/* Core Subject Breakdown */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Comprehensive Curriculum</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Core Subjects Mastered in 11th</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((sub, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-[#ED1C24]/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black text-white">{sub.name}</h3>
                <span className="text-[11px] font-black text-[#ED1C24] uppercase tracking-wider bg-[#ED1C24]/10 border border-[#ED1C24]/20 px-3 py-1 rounded-full">
                  {sub.focus}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{sub.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Key Pillars */}
      <section className="py-16 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">The Noble Methodology</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Why 11th Science Preparation Matters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pil, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold text-lg">
                  <FiCheckCircle />
                </div>
                <h3 className="text-base font-bold text-white">{pil.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-gradient-to-r from-[#0F1626] via-[#1A2338] to-[#0F1626] border border-[#ED1C24]/40 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            Build Your 11th Science Foundation Today
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Attend a free diagnostic counseling session with our senior science faculty to evaluate your stream and select the best batch timing.
          </p>
          <a
            href="/admissions"
            onClick={(e) => handleNav(e, '/admissions')}
            className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(237,28,36,0.4)]"
          >
            <span>Book Free Counseling Session</span>
            <FiArrowRight />
          </a>
        </div>
      </section>
    </div>
  );
}
