import React from 'react';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function DdcetHighlight() {
  return (
    <section id="ddcet" className="py-20 lg:py-28 bg-[#0D0D0D] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-[250px] h-[250px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">DDCET Overview</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            DDCET Coaching for Diploma to Degree Admission
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            Direct second-year degree admission common entrance prep led by branch-expert coaching faculties in Vadodara.
          </p>
        </div>

        {/* Glowing visual pathway */}
        <div className="glass-panel p-8 rounded-3xl border border-red-600/10 mb-12 max-w-3xl mx-auto text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-base font-bold text-white uppercase tracking-wider">
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 shadow-md">
              Diploma Engineering
            </div>
            <FiArrowRight className="text-red-500 text-2xl rotate-90 sm:rotate-0" />
            <div className="px-6 py-3 rounded-2xl bg-red-600/10 border border-red-600/30 text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              DDCET Entrance
            </div>
            <FiArrowRight className="text-red-500 text-2xl rotate-90 sm:rotate-0" />
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 shadow-md">
              Degree Engineering
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/ddcet-coaching')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
          >
            <FiBookOpen /> View Full DDCET Syllabus & Choice Filling Guidance
          </button>
        </div>

      </div>
    </section>
  );
}
