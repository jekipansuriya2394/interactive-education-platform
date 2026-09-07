import React from 'react';
import { FiBookOpen, FiCheckCircle, FiAward, FiArrowRight, FiFileText, FiTrendingUp } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function AcademicGSEBPage() {
  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const programs = [
    {
      id: 'gseb-8th',
      title: 'GSEB Class 8 — Build the Foundation',
      badge: 'Foundation & School Academics',
      desc: 'Focused on early concept building, NCERT/GSEB fundamentals, logical reasoning and building competitive exam readiness without academic stress.',
      subjects: ['Mathematics', 'General Science', 'English & Language Fundamentals'],
      features: ['Daily Concept Worksheets', 'Weekly Chapter Assessments', 'Doubt Counters', 'Parent Progress Feedback'],
      link: '/foundation'
    },
    {
      id: 'gseb-9th',
      title: 'GSEB Class 9 — Strengthen Your Concepts',
      badge: 'Crucial Transition Year',
      desc: 'Class 9 builds the vital conceptual bridge for 10th Board and 11th Science. Structured learning develops analytical thinking and exam confidence.',
      subjects: ['Advanced Mathematics', 'Physics & Chemistry Concepts', 'Biology Fundamentals', 'Social Science & Languages'],
      features: ['Concept Clarity Over Memorisation', 'Bi-weekly Formative Tests', 'Formula Booklets & Mindmaps', 'Special Doubt Clearing Desks'],
      link: '/foundation'
    },
    {
      id: 'gseb-10th',
      title: 'GSEB Class 10 — Prepare for Board Excellence',
      badge: 'Board Excellence & Toppers Batch',
      desc: 'Rigorous board preparation curriculum with systematic syllabus completion, full-length test series, answer presentation workshops, and previous-year papers.',
      subjects: ['Mathematics (Basic & Standard)', 'Science & Technology', 'Social Science', 'English & Gujarati/Hindi'],
      features: ['5 Full-Length Prelim Mock Exams', 'Board Blueprint-Aligned Answer Writing', 'Chapterwise PYQ Analysis (Last 10 Years)', 'Personal Mentorship for 90%+ Targets'],
      link: '/admissions'
    },
    {
      id: 'gseb-11th-sci',
      title: 'GSEB 11th Science — Base for 12th, JEE & NEET',
      badge: 'Higher Secondary Science',
      desc: 'Deep conceptual preparation in Physics, Chemistry, Maths & Biology. Master the syllabus early while laying the bedrock for JEE Main and NEET Medical.',
      subjects: ['Physics (Mechanics, Waves)', 'Chemistry (Inorganic & Physical)', 'Mathematics / Biology'],
      features: ['Daily DPPs (Practice Problems)', 'Integrated Board + Competitive Batches', 'State Board Blueprint Mapping', 'Comprehensive Formula Modules'],
      link: '/academic/science/11th'
    },
    {
      id: 'gseb-12th-sci',
      title: 'GSEB 12th Science — Board Meets Competitive Success',
      badge: 'Target 99+ Percentile',
      desc: 'Comprehensive 12th Science board mastery synchronised with GUJCET, JEE, and NEET preparation. Timely syllabus finish followed by rigorous revision.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'GUJCET Special Batches'],
      features: ['Grand Mock Test Series (Full GSEB Format)', 'GUJCET Fast-Track Mock Tests', 'Numerical Solving Marathons', 'ACPC College Choice Filling Support'],
      link: '/academic/science/12th'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Gujarat Secondary and Higher Secondary Board
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            GSEB Coaching Classes in <span className="text-[#ED1C24]">Vadodara</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            Concept-based teaching, board-focused preparation, regular tests, doubt support, and academic guidance from 8th to 12th Science at Noble Education.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enrol in GSEB Batch
            </a>
            <a
              href="/results"
              onClick={(e) => handleNav(e, '/results')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              View Board Results
            </a>
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Structured Academic Pathways</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-1">
            Choose Your GSEB Program
          </h2>
        </div>

        <div className="space-y-8">
          {programs.map((p, idx) => (
            <div 
              key={idx}
              className="bg-[#0F1626] border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-[#ED1C24]/50 transition-all shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{p.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                  
                  {/* Subjects pill bar */}
                  <div className="pt-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                      Subjects Covered:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {p.subjects.map((sub, sIdx) => (
                        <span key={sIdx} className="bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold px-3 py-1 rounded-lg">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <FiCheckCircle className="text-[#ED1C24] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                  <a
                    href={p.link}
                    onClick={(e) => handleNav(e, p.link)}
                    className="w-full py-4 rounded-xl bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold uppercase tracking-wider text-xs text-center transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Explore Curriculum</span>
                    <FiArrowRight />
                  </a>
                  <a
                    href="/admissions"
                    onClick={(e) => handleNav(e, '/admissions')}
                    className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-wider text-xs text-center transition-all"
                  >
                    Enquire for {p.title.split('—')[0].trim()}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
