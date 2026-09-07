import React, { useState } from 'react';
import { FiCheckCircle, FiArrowRight, FiTrendingUp, FiCpu, FiAward, FiFileText, FiChevronDown, FiCalendar } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function DDCETPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const sections = [
    {
      title: 'What is DDCET?',
      desc: 'DDCET (Diploma to Degree Common Entrance Test) is the mandatory common entrance exam conducted by the Government of Gujarat for diploma engineers seeking lateral entry admission into the 2nd year (3rd Semester) of B.E. / B.Tech programs in top government and self-financed engineering colleges.'
    },
    {
      title: 'Who Should Apply?',
      desc: 'Diploma engineering students in their final year (Semester 5 & 6) across Mechanical, Civil, Electrical, Computer, IT, Automobile, and Chemical branches who aim for top degree engineering colleges like LD College of Engineering, BVM, VGEC, and MSU Vadodara.'
    },
    {
      title: 'Noble DDCET Preparation Strategy',
      desc: 'Targeted coaching covering common engineering fundamentals, basic sciences, engineering mathematics, and technical reasoning with high-frequency chapterwise question banks and timed CBT mock examinations.'
    },
    {
      title: 'End-to-End ACPC Counseling Support',
      desc: 'After the exam, we provide full mock choice filling, cut-off merit analysis, and personalized branch selection sessions to ensure you secure your highest-priority college seat.'
    }
  ];

  const syllabusPoints = [
    'Engineering Mathematics (Calculus, Matrices, Differential Equations, Statistics)',
    'Basic Engineering Sciences (Physics & Chemistry Fundamentals)',
    'General Technical Aptitude & Logical Reasoning',
    'Previous 5+ Years DDCET & Lateral Entry Question Papers',
    '15+ Full-Length Computer-Based Mock Tests with Instant Rank Analysis'
  ];

  const faqs = [
    {
      q: 'Why is DDCET entrance coaching essential for diploma students?',
      a: 'Lateral entry degree seats in top colleges are limited and allocated purely based on DDCET merit. Structured coaching ensures high percentile scores and conceptual mastery of engineering mathematics that diploma students frequently struggle with.'
    },
    {
      q: 'When do Noble DDCET coaching batches start?',
      a: 'We operate both regular foundation batches starting in Semester 5 and intensive fast-track crash batches post-GTU Semester 5 exams.'
    },
    {
      q: 'Do you help with college preference lists during ACPC counseling?',
      a: 'Yes! Every Noble DDCET student receives personalized ACPC choice-filling guidance, analyzing past year cutoffs, seat matrices, and branch placements.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Lateral Entry Engineering Entrance Division
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            DDCET Coaching — <span className="text-[#ED1C24]">Prepare for Your Next</span> Engineering Step
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            DDCET coaching in Vadodara for diploma students preparing for degree engineering admission with structured preparation, practice, mock tests, and ACPC guidance.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enrol in DDCET Batch
            </a>
            <a
              href="/engineering"
              onClick={(e) => handleNav(e, '/engineering')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Explore Engineering Division
            </a>
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-3 hover:border-[#ED1C24]/50 transition-all shadow-xl">
              <h3 className="text-xl font-bold text-white">{sec.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{sec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Syllabus & Practice */}
      <section className="py-16 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Preparation Scope</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">What the Noble DDCET Program Includes</h2>
          </div>

          <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-4">
            {syllabusPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <FiCheckCircle className="text-[#ED1C24] text-base flex-shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">DDCET Doubts</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Frequently Asked Questions</h2>
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
          <h2 className="text-2xl sm:text-4xl font-black text-white">Target Your Top Degree Engineering College</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Join the upcoming DDCET orientation and collect your syllabus blueprint and mock trial exam.
          </p>
          <div className="pt-2">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(237,28,36,0.4)]"
            >
              <span>Enrol in DDCET Coaching</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
