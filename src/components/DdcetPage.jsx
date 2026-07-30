import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiCheckCircle, FiCalendar, FiArrowRight, FiShield, FiFileText, FiCompass, FiMap } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function DdcetPage() {
  const supports = [
    { title: "Complete Syllabus Planning", desc: "Covers standard DDCET syllabus in structured lecture modules." },
    { title: "Concept Lectures", desc: "In-depth teaching to clear basic concepts of engineering streams." },
    { title: "Practice Questions", desc: "MCQs mapping exactly to DDCET entrance exam patterns." },
    { title: "Mock Tests", desc: "Timed test papers to build speed and accuracy." },
    { title: "Doubt Solving", desc: "Dedicated desks to resolve calculations and questions." },
    { title: "Admission Guidance", desc: "Support through D2D registration steps." },
    { title: "Choice Filling Guidance", desc: "Personalized advice to list colleges based on DDCET merits." },
    { title: "Parent-Student Counseling", desc: "Combined discussions to resolve streams and future scope." }
  ];

  const timelineSteps = [
    { phase: "Phase 1: Concept Building", detail: "Focusing on core engineering fundamentals and applied mathematics." },
    { phase: "Phase 2: Question Solving", detail: "Practicing hundreds of conceptual MCQs and shortcuts." },
    { phase: "Phase 3: Full Length Mock Tests", detail: "Solving timed mock papers with scoring evaluations." },
    { phase: "Phase 4: Direct Degree Admission", detail: "Choice-filling and registration counseling for admission." }
  ];

  return (
    <div id="ddcet" className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* DDCET Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">D2D Admissions</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            DDCET <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Coaching</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Prepare smartly for DDCET with proper guidance, concept clarity, practice, and exam strategy.
          </p>
        </motion.div>
      </section>

      {/* What is DDCET? & Importance */}
      <section id="what-is-ddcet" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 glass-panel p-8 sm:p-10 rounded-3xl border border-white/5">
            <h3 className="text-white font-extrabold text-2xl mb-4">What is DDCET?</h3>
            <p className="text-zinc-300 font-light leading-relaxed mb-6">
              DDCET (Diploma to Degree Common Entrance Test) is a mandatory competitive exam in Gujarat for diploma engineering students who want direct admission into the 2nd year (3rd semester) of Degree Engineering courses.
            </p>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              DDCET merit is the sole criteria for direct degree admissions in top government and self-financed engineering colleges across Gujarat. A higher DDCET score guarantees access to preferred computer, IT, or core branches.
            </p>
          </div>
          <div className="lg:col-span-6 glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-red-600/15">
            <h3 className="text-white font-extrabold text-2xl mb-4">Why DDCET Merit Matters</h3>
            <p className="text-zinc-300 font-light leading-relaxed mb-6">
              A single merit rank decides college cutoffs for Government Engineering College (GEC), MSU, LD, and other prime placements. Preparing concepts early in the 5th and 6th semesters prevents branch loss.
            </p>
          </div>
        </div>
      </section>

      {/* #ddcet-preparation: DDCET Support */}
      <section id="ddcet-preparation" className="py-16 bg-[#0D0D0D] border-y border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Our DDCET Support Structure
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed">
              How Noble Education systematically prepares you to secure top engineering ranks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supports.map((sup, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-red-600/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-white font-bold text-base mb-2">{sup.title}</h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">{sup.desc}</p>
                </div>
                <FiCheckCircle className="text-red-500 text-lg mt-4 self-end" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* #ddcet-updates: DDCET Roadmap Timeline */}
      <section id="ddcet-updates" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center mb-12">
          <h3 className="text-white font-extrabold text-2xl">Noble DDCET Timeline & Updates</h3>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-[2px] before:bg-white/10">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Left Column (Desktop) */}
              <div className={`w-full sm:w-[45%] text-left sm:text-right order-2 sm:order-1 ${idx % 2 === 0 ? 'sm:block' : 'sm:invisible'}`}>
                <h4 className="text-white font-bold text-sm mb-1">{step.phase}</h4>
                <p className="text-zinc-400 text-xs font-light">{step.detail}</p>
              </div>

              {/* Point bubble */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border border-[#0A0A0A] shadow-[0_0_10px_rgba(220,38,38,0.5)] z-10 order-1 sm:order-2" />

              {/* Right Column (Desktop) */}
              <div className={`w-full sm:w-[45%] text-left order-3 ${idx % 2 !== 0 ? 'sm:block' : 'sm:invisible'}`}>
                <h4 className="text-white font-bold text-sm mb-1">{step.phase}</h4>
                <p className="text-zinc-400 text-xs font-light">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* #choice-filling & #diploma-to-degree sections */}
      <section className="py-16 bg-[#0D0D0D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* #choice-filling */}
          <div id="choice-filling" className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between scroll-mt-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-600/10 rounded-xl text-red-500 text-2xl border border-red-600/20">
                  <FiCompass />
                </div>
                <h3 className="text-white font-extrabold text-xl">Choice Filling Guidance</h3>
              </div>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                Get custom college listing priorities based on your exact DDCET merit score.
              </p>
            </div>
            <button 
              onClick={() => navigate('/contact#inquiry')}
              className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md"
            >
              Get Guidance Support
            </button>
          </div>

          {/* #diploma-to-degree */}
          <div id="diploma-to-degree" className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between scroll-mt-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-600/10 rounded-xl text-red-500 text-2xl border border-red-600/20">
                  <FiMap />
                </div>
                <h3 className="text-white font-extrabold text-xl">Diploma to Degree Roadmap</h3>
              </div>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                Complete overview of transition course credits, university criteria, and college placement scope.
              </p>
            </div>
            <button 
              onClick={() => navigate('/career-guid')}
              className="w-full text-center border border-white/10 hover:border-white/30 text-zinc-300 py-3 rounded-xl text-xs transition-all"
            >
              Check D2D Roadmaps
            </button>
          </div>

        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-red-600/20">
          <h4 className="text-red-500 font-extrabold tracking-widest text-xs uppercase mb-3">Admission Alert</h4>
          <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-4">
            Diploma ke baad Degree Admission ke liye DDCET Preparation Start Karo
          </h3>
          <p className="text-zinc-400 font-light mb-8 max-w-md mx-auto">
            Book your batch seat at Noble Waghodia Road center. Standard counseling updates are shared regularly.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              Join DDCET Coaching
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
