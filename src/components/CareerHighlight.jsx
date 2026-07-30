import React from 'react';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function CareerHighlight() {
  return (
    <section id="career" className="py-20 lg:py-28 bg-[#0D0D0D] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Career Counselling</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Confused After 10th? Get the Right Career Direction
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-8">
            Choose the right course, branch, and career path with expert counseling.
          </p>
        </div>

        {/* 3D Visual Career Roadmap */}
        <div className="glass-panel p-8 rounded-3xl border border-red-600/10 mb-12 text-center max-w-4xl mx-auto">
          <h4 className="text-red-500 font-bold text-sm mb-8 uppercase tracking-widest">
            Student Career Paths Guidance
          </h4>

          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs font-bold text-zinc-300">
            <span className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl">Science (PCM/PCB)</span>
            <FiArrowRight className="text-red-500" />
            <span className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl">Diploma Engineering</span>
            <FiArrowRight className="text-red-500" />
            <span className="px-4 py-2 bg-red-600/15 border border-red-600/30 text-red-500 rounded-xl">Degree Engineering</span>
            <FiArrowRight className="text-red-500" />
            <span className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl">Competitive Exams</span>
            <FiArrowRight className="text-red-500" />
            <span className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl">Successful Career</span>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/career-guidance')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
          >
            <FiBookOpen /> Learn Stream Mapping & parent Guidance details
          </button>
        </div>

      </div>
    </section>
  );
}
