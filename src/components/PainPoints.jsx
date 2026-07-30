import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi';

export default function PainPoints() {
  const painPoints = [
    "After 10th standard, students are confused about stream and career options.",
    "Parents are worried about choosing the right path for their child's future.",
    "Diploma students struggle with complex subjects and future planning.",
    "Students do not know how to prepare systematically for DDCET.",
    "Many students need proper admission and engineering branch selection guidance."
  ];

  return (
    <section id="career" className="py-20 lg:py-28 bg-[#0D0D0D] relative border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-[250px] h-[250px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Career Counselling</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Confused About What to Do Next?
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            Transitioning between standard school levels, diploma courses, and engineering branches can be complex. You do not have to walk it alone.
          </p>
        </div>

        {/* Comparison grid: Pain Points vs Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Pain points column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-yellow-500/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white font-extrabold text-xl mb-6 flex items-center gap-2">
                <FiAlertTriangle className="text-yellow-500 text-2xl" />
                Common Challenges Faced
              </h3>
              
              <div className="space-y-4">
                {painPoints.map((pain, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-xs font-bold text-yellow-500 flex-shrink-0 mt-0.5">
                      !
                    </span>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed">
                      {pain}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 mt-8 pt-6 text-zinc-500 text-xs font-light">
              * Over 78% of students undergo path confusion during stream transitions.
            </div>
          </motion.div>

          {/* Solution column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 glass-panel-elevated p-8 rounded-3xl border border-red-600/20 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white font-extrabold text-xl mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-red-500 text-2xl" />
                The Noble Education Solution
              </h3>

              <div className="space-y-5">
                <p className="text-zinc-200 text-base leading-relaxed font-light mb-6">
                  At Noble Education, we guide students step-by-step with coaching, counseling, admission support, and career planning.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <h5 className="text-white font-bold text-sm mb-1">Step-by-step Coaching</h5>
                    <p className="text-zinc-400 text-xs">Clear guidance on concepts and syllabus support.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <h5 className="text-white font-bold text-sm mb-1">Academic Counsel</h5>
                    <p className="text-zinc-400 text-xs">Identify strengths, streams, and branch fits.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <h5 className="text-white font-bold text-sm mb-1">Entrance Prep</h5>
                    <p className="text-zinc-400 text-xs">Specialized prep strategies for DDCET & exams.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <h5 className="text-white font-bold text-sm mb-1">Admission Support</h5>
                    <p className="text-zinc-400 text-xs">Assistance through counselling selections.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <span className="text-white font-bold text-sm text-center sm:text-left">
                Talk to Our Expert Counselor
              </span>
              <a
                href="https://wa.me/919104206999"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
