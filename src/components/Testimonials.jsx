import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import { adminData } from '../utils/adminData';

export default function Testimonials() {
  const scrollRef = useRef(null);
  
  const reviews = adminData.getData('testimonials') || [];

  return (
    <section className="py-20 lg:py-28 bg-[#0D0D0D] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Student Success</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            What Our Students & Parents Say
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            Real feedback from our alumni, standard students, and parents about our coaching methodologies and counseling.
          </p>
        </div>

        {/* Scrolling testimonial card row */}
        <div className="relative overflow-x-auto pb-8 scrollbar-thin select-none" ref={scrollRef}>
          <div className="flex gap-6 w-max px-4">
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="glass-panel p-8 rounded-3xl w-[320px] sm:w-[380px] hover-glow-red transition-all duration-300 flex flex-col justify-between"
              >
                {/* Quote details */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <FiMessageSquare className="text-3xl text-red-500/20" />
                    <div className="flex gap-1">
                      {[...Array(rev.stars)].map((_, i) => (
                        <FiStar key={i} className="text-yellow-500 fill-yellow-500 text-sm" />
                      ))}
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed font-light italic mb-6">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-white font-bold text-base">{rev.name}</h4>
                  <p className="text-red-500 text-xs tracking-wider uppercase font-semibold">{rev.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drag indicators */}
        <div className="text-center text-zinc-500 text-xs font-light mt-4">
          ← Scroll horizontally to read more reviews →
        </div>

      </div>
    </section>
  );
}
