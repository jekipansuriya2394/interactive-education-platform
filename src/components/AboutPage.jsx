import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCompass, FiCheck, FiHeart, FiCpu, FiFileText, FiTarget, FiMessageSquare } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function AboutPage() {
  const teachingMethods = [
    { name: "Concept Explanation", desc: "Clear explanations using board work and visual structures." },
    { name: "Regular Practice", desc: "Constant homework tasks and daily assignment checks." },
    { name: "Chapter-Wise Tests", desc: "Rigorous test papers simulating standard board/entrance environments." },
    { name: "Doubt Solving", desc: "Dedicated doubt clearance sessions with individual care." },
    { name: "Parent Updates", desc: "Continuous performance reporting and student updates." },
    { name: "Career Counseling", desc: "Personal road mapping for future choices." },
    { name: "Exam Strategy", desc: "Guidance on weightage, timing, and formatting answers." },
    { name: "Personal Guidance", desc: "One-to-one mentorship to address specific learning speeds." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div id="about" className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background Orbs */}
      <div className="absolute top-44 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* About Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Core History</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Noble Education</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Trusted education guidance and coaching institute in Vadodara.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">Our Story</h2>
          <p className="text-zinc-300 font-light leading-relaxed mb-6">
            Noble Education was founded with a single focus: to bridge the gap between complex academics and student understanding. Over the last 19 years in Vadodara, we have transitioned from a local coaching batch into a premier counseling and academic preparation hub.
          </p>
          <p className="text-zinc-300 font-light leading-relaxed">
            Today, we support thousands of school students, engineering aspirants, and diploma branches with expert coaching, industry training guidance, and university admission choice-filling roadmaps.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <motion.div 
          id="mission"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-red-600/10 scroll-mt-24"
        >
          <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500 text-3xl w-fit mb-6">
            <FiTarget />
          </div>
          <h3 className="text-white font-extrabold text-2xl mb-4">Our Mission</h3>
          <p className="text-zinc-400 font-light leading-relaxed">
            To provide quality education, concept clarity, career guidance, and practical support to every student, helping them achieve outstanding academic results and clear career pathways.
          </p>
        </motion.div>

        {/* Vision Card */}
        <motion.div 
          id="vision"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-white/5 scroll-mt-24"
        >
          <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500 text-3xl w-fit mb-6">
            <FiCompass />
          </div>
          <h3 className="text-white font-extrabold text-2xl mb-4">Our Vision</h3>
          <p className="text-zinc-400 font-light leading-relaxed">
            To become the most trusted education partner for students and parents in Vadodara by helping them navigate complex paths and secure successful academic placements under proper coaching.
          </p>
        </motion.div>
      </section>

      {/* Teaching Method */}
      <section id="teaching-method" className="py-16 bg-[#0D0D0D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[2px] w-6 bg-red-600" />
              <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Our Framework</span>
              <span className="h-[2px] w-6 bg-red-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Our Teaching Method
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed">
              We employ structured learning procedures to ensure every student understands core concepts and improves step-by-step.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teachingMethods.map((method, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-red-600/20 transition-all duration-300 group"
              >
                <span className="text-xs font-semibold text-red-500 tracking-wider uppercase bg-red-600/10 px-2.5 py-1 rounded-full mb-4 inline-block">
                  Step 0{idx + 1}
                </span>
                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">
                  {method.name}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  {method.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Parents Trust Us */}
      <section id="why-choose" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Why Parents Trust Noble Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 text-center">
            <h4 className="text-red-500 font-extrabold text-4xl mb-4">19+ Years</h4>
            <h5 className="text-white font-bold text-lg mb-2">Unparalleled Legacy</h5>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">Continuous mentoring in Waghodia Road, serving students from school to engineering.</p>
          </div>
          <div className="p-6 text-center">
            <h4 className="text-red-500 font-extrabold text-4xl mb-4">Batch Limit</h4>
            <h5 className="text-white font-bold text-lg mb-2">Direct Focus</h5>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">Optimized batches to give personalized doubt clearing and tracking of progress reports.</p>
          </div>
          <div className="p-6 text-center">
            <h4 className="text-red-500 font-extrabold text-4xl mb-4">Comprehensive Support</h4>
            <h5 className="text-white font-bold text-lg mb-2">All Under One Roof</h5>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">Providing coaching, admission mapping, project training, and DDCET strategies together.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-red-600/20">
          <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-4">Have Questions About Your Roadmap?</h3>
          <p className="text-zinc-400 font-light mb-8 max-w-lg mx-auto">
            Book a one-to-one consultation with Noble's expert faculty today. Learn either online or offline.
          </p>
          <button
            onClick={(e) => navigate('/contact')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            Connect With Us
          </button>
        </div>
      </section>

    </div>
  );
}
