import React, { useState } from 'react';
import { FiCheckCircle, FiArrowRight, FiBookOpen, FiCpu, FiTrendingUp, FiHelpCircle, FiChevronDown } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function FoundationPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const pillars = [
    {
      title: 'Concept-First Mathematics',
      desc: 'Going far beyond rote memorisation. Students explore arithmetic, geometry, algebra, and number theory through real-world logic and proof.'
    },
    {
      title: 'Experimental & Applied Science',
      desc: 'Connect physics laws, chemical reactions, and biological systems to physical phenomena. Developing an investigative scientific mindset early.'
    },
    {
      title: 'Analytical & Problem-Solving Skills',
      desc: 'Graded challenge worksheets that teach students how to deconstruct multi-step problems calmly, accurately, and methodically.'
    },
    {
      title: 'Smooth Transition to JEE & NEET',
      desc: 'Eliminate the daunting conceptual jump between 10th standard and 11th Science by introducing competitive formats gradually.'
    },
    {
      title: 'Continuous Formative Assessments',
      desc: 'Weekly diagnostic tests measuring understanding rather than memory, helping pinpoint weak topics for prompt remedial coaching.'
    },
    {
      title: 'Olympiad & NTSE Orientation',
      desc: 'Exposure to national talent competitions, Math Olympiad questions, and mental ability reasoning sections.'
    }
  ];

  const faqs = [
    {
      q: 'Which classes is the Foundation program designed for?',
      a: 'The Noble Foundation program is tailored for students currently in 8th, 9th, and 10th standards looking to build robust concepts in Mathematics and Science.'
    },
    {
      q: 'Does Foundation coaching increase school academic stress?',
      a: 'No. Our foundation curriculum is harmoniously aligned with school syllabi (both GSEB and CBSE). It actually reduces stress because school concepts become intuitive and simple.'
    },
    {
      q: 'How does Foundation help with future JEE or NEET exams?',
      a: 'Over 60% of JEE and NEET concepts require strong roots established in classes 8th to 10th. Foundation ensures students enter 11th Science with superior logical speed, formula confidence, and familiarity with competitive MCQ formats.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            8th to 10th Standard Academic Division
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Foundation That <span className="text-[#ED1C24]">Builds Future Success</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Start with strong concepts. Build confidence before the competition begins. A structured pathway developing deep fundamentals, problem-solving ability, and competitive thinking.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Enrol in Foundation Batch
            </a>
            <a
              href="/academic/gseb"
              onClick={(e) => handleNav(e, '/academic/gseb')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Explore School Programs
            </a>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Concepts First</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Core Pillars of the Noble Foundation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pil, idx) => (
            <div key={idx} className="bg-[#0F1626] border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-[#ED1C24]/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold text-lg">
                <FiCheckCircle />
              </div>
              <h3 className="text-base font-bold text-white">{pil.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{pil.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Common Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Foundation Program FAQs</h2>
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
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#0F1626] border border-[#ED1C24]/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Give Your Child an Early Conceptual Advantage</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a diagnostic test and meeting with our foundation academic mentors today.
          </p>
          <div className="pt-2">
            <a
              href="/admissions"
              onClick={(e) => handleNav(e, '/admissions')}
              className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(237,28,36,0.4)]"
            >
              <span>Book Foundation Counseling</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
