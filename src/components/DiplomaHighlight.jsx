import React from 'react';
import { FiArrowRight, FiCheckCircle, FiBookOpen } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function DiplomaHighlight() {
  const steps = [
    { label: "Diploma Support", desc: "Coaching support for GTU subjects." },
    { label: "Practical Skills", desc: "Workshops to build technical base." },
    { label: "Final Project", desc: "Coding support & report guides." },
    { label: "DDCET Preparation", desc: "Rigorous entrance prep mapping." },
    { label: "Degree Path", desc: "Admission counseling mapping." }
  ];

  return (
    <section id="diploma" className="py-20 lg:py-28 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Diploma Hub</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Diploma Engineering Coaching Overview
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-8">
            Waghodia Road's premier tutoring center for GTU subjects, practical engineering labs, and branch selection counseling.
          </p>
        </div>

        {/* Success Roadmap */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 mb-12">
          <h3 className="text-white font-extrabold text-lg text-center mb-10 uppercase tracking-widest text-red-500">
            Our Diploma Success Roadmap
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-white/5 text-center flex flex-col justify-between hover-glow-red transition-all duration-300 relative group"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-red-600/10 border border-red-600/30 flex items-center justify-center text-xs font-bold text-red-500 mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white transition-all">
                    0{idx + 1}
                  </span>
                  <h4 className="text-white font-bold text-sm mb-2">{step.label}</h4>
                  <p className="text-zinc-400 text-[10px] leading-relaxed font-light">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-zinc-600 text-lg z-20">
                    <FiArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/diploma-coaching')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
          >
            <FiBookOpen /> View All Branches, Projects & Training Support
          </button>
        </div>

      </div>
    </section>
  );
}
