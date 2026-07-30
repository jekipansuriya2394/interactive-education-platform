import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiAward, FiUser, FiMonitor, FiFileText, 
  FiHelpCircle, FiCompass, FiBriefcase, FiMap, 
  FiBookOpen, FiUserCheck, FiTarget, FiHeart 
} from 'react-icons/fi';

export default function WhyChooseUs() {
  const reasons = [
    { label: 'Experienced Faculty', icon: <FiAward className="text-red-500" /> },
    { label: 'Personal Attention', icon: <FiUser className="text-red-500" /> },
    { label: 'Online & Offline Classes', icon: <FiMonitor className="text-red-500" /> },
    { label: 'Regular Tests', icon: <FiFileText className="text-red-500" /> },
    { label: 'Doubt-Solving Support', icon: <FiHelpCircle className="text-red-500" /> },
    { label: 'Career Counseling', icon: <FiCompass className="text-red-500" /> },
    { label: 'Admission Guidance', icon: <FiMap className="text-red-500" /> },
    { label: 'Project Support', icon: <FiBookOpen className="text-red-500" /> },
    { label: 'Training Support', icon: <FiBriefcase className="text-red-500" /> },
    { label: 'Parent-Student Guidance', icon: <FiUserCheck className="text-red-500" /> },
    { label: 'Practical Learning', icon: <FiTarget className="text-red-500" /> },
    { label: 'Result-Oriented Teaching', icon: <FiHeart className="text-red-500" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  };

  return (
    <section id="why-choose" className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      {/* Background glow orb */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Why Choose Us</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Designed for Your Career Growth
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            Our student-centric ecosystems and verified teaching modules ensure parents and students gain unmatched academic guidance.
          </p>
        </div>

        {/* 12 reasons grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={pillVariants}
              className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover-glow-red transition-all duration-300 cursor-default group"
            >
              <div className="p-2.5 bg-red-600/10 rounded-xl border border-red-600/20 text-lg group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {reason.icon}
              </div>
              <span className="text-white text-sm font-semibold tracking-wide leading-tight">
                {reason.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Highlight Card at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 glass-panel-elevated p-8 rounded-3xl border border-red-600/20 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left">
            <h4 className="text-white font-extrabold text-xl mb-2">Have questions about standard admission structures?</h4>
            <p className="text-zinc-400 text-sm font-light">Get a free personalized counseling roadmap designed specifically for standard choices.</p>
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
          >
            Start Free Guidance
          </a>
        </motion.div>

      </div>
    </section>
  );
}
