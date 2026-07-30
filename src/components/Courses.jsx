import React from 'react';
import { FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function Courses() {
  const categories = [
    { id: "integrated-school", title: "Concept / Integrated School", desc: "Std 8, 9, 10, 11, 12 Science (GSEB English Medium) with integrated preparation.", tag: "Integrated" },
    { id: "coaching-classes", title: "Coaching Classes", desc: "5th to 12th (GSEB & CBSE) standard tutoring with concept building.", tag: "Regular" },
    { id: "engineering-coaching", title: "Engineering Coaching", desc: "Coaching support for Diploma Classes, DDCET Classes, and Degree Classes subjects.", tag: "Engineering" },
    { id: "neet-batch", title: "NEET Batch (2 Year Integrated)", desc: "Comprehensive 2-year integrated medical admissions entrance batch.", tag: "NEET Batch" },
    { id: "jee-batch", title: "JEE Batch (2 Year Integrated)", desc: "IIT and NIT admissions entrance batch with speed shortcuts.", tag: "JEE Batch" }
  ];

  return (
    <section id="courses" className="py-20 lg:py-28 bg-[#0D0D0D] relative border-t border-white/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Academic Programs</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Our Courses Overview
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-6">
            Explore our diverse programs from school foundation levels to advanced competitive engineering and medical entrances.
          </p>
        </div>

        {/* Dashboard grid pointing directly to the Courses Page anchors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, i) => (
            <div 
              key={i}
              onClick={() => navigate(`/courses#${cat.id}`)}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-red-600/30 hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col justify-between group h-48"
            >
              <div>
                <span className="text-[10px] font-bold text-red-500 bg-red-600/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                  {cat.tag}
                </span>
                <h4 className="text-white font-bold text-base group-hover:text-red-500 transition-colors mb-2">
                  {cat.title}
                </h4>
                <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-3">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Explore Details</span>
                <FiTrendingUp className="text-zinc-600 group-hover:text-red-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/courses')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
          >
            <FiBookOpen /> View All Detailed Course Details
          </button>
        </div>

      </div>
    </section>
  );
}
