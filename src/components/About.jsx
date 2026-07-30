import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiBookOpen, FiAward, FiUsers } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function About() {
  const highlights = [
    {
      icon: <FiBookOpen className="text-2xl text-red-500" />,
      title: "Teaching Style",
      desc: "Concept-driven explanations, regular homework support, and active doubt solving sessions."
    },
    {
      icon: <FiUsers className="text-2xl text-red-500" />,
      title: "Personal Attention",
      desc: "Batch sizes optimized for direct faculty-student engagement and tracking performance."
    },
    {
      icon: <FiAward className="text-2xl text-red-500" />,
      title: "Result Oriented",
      desc: "Extensive mock series, board exam simulations, and competitive test analysis."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-red-600" />
              <span className="text-red-500 font-bold tracking-widest text-xs uppercase">About Us Overview</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Guiding Students Towards Success
            </h2>
            
            <p className="text-zinc-300 text-lg font-light leading-relaxed mb-8">
              Noble Education helps students with academic coaching, competitive exam preparation, diploma engineering support, DDCET preparation, career guidance, admission guidance, project support, and training support. We focus on concept clarity, personal attention, regular practice, doubt solving, and proper guidance.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-xl text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">19+ Years of Trusted Legacy</h4>
                  <p className="text-zinc-400 text-sm">Long-standing experience guiding board and competitive exam aspirants in Vadodara.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-xl text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">Comprehensive Guidance Mapping</h4>
                  <p className="text-zinc-400 text-sm">We don't just coach; we counsel. Helping you from branch selection to final admission guidance.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/about')}
              className="bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl text-xs border border-white/10 transition-colors shadow-md"
            >
              View Full About Details & mission
            </button>
          </motion.div>

          {/* Right Highlights Cards Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {highlights.map((item, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl flex gap-4 hover-glow-red transition-all duration-300 cursor-default"
              >
                <div className="p-3 bg-red-600/10 rounded-xl border border-red-600/20 h-fit">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
