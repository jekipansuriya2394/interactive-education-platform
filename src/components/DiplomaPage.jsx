import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiCpu, FiSettings, FiGrid, FiActivity, FiLayers, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function DiplomaPage() {
  const branches = [
    { name: "Computer Engineering", icon: <FiMonitor />, desc: "Programming (C, C++, Java, Python), Data Structures, Database Systems, Web Development, and OS subjects." },
    { name: "Information Technology", icon: <FiGrid />, desc: "Software Engineering, Networking, Web Tech, Mobile App Dev, Cyber Security, and cloud modules." },
    { name: "Mechanical Engineering", icon: <FiSettings />, desc: "Engineering Mechanics, Thermodynamics, Fluid Power, CAD/CAM drawing, and Manufacturing processes." },
    { name: "Civil Engineering", icon: <FiLayers />, desc: "Structural Mechanics, Surveying, Concrete Technology, Building Drawing, and soil mechanics." },
    { name: "Electrical Engineering", icon: <FiCpu />, desc: "Circuits & Networks, AC/DC Machines, Power Systems, Microcontrollers, and Electrical wiring templates." },
    { name: "Chemical Engineering", icon: <FiActivity />, desc: "Unit Operations, Chemical Process Industries, Stoichiometry, Fluid Flow, and Heat transfer processes." }
  ];

  const helperPoints = [
    { title: "Subject-Wise Coaching", desc: "Dedicated guidance on tough academic subjects per semester." },
    { title: "Notes & Practice Sheets", desc: "Syllabus-aligned study materials and previous paper solutions." },
    { title: "Doubt-Solving Sessions", desc: "Direct face-to-face clearings with subject faculties." },
    { title: "Exam Preparation", desc: "Rigorous practice tests matching GTU and university patterns." },
    { title: "Project Support", desc: "Guidance on choosing topics, building code, and writing reports." },
    { title: "Training Guidance", desc: "Practical workshops to upgrade career readiness." },
    { title: "DDCET Preparation", desc: "Smarts test tricks to clear DDCET admissions." },
    { title: "Career Counseling", desc: "Pathfinding roadmaps for degree selection or jobs." }
  ];

  const problems = [
    "Abstract theory modules without practical demonstration.",
    "Complex programming syntax errors causing academic backlogs.",
    "Struggles with choosing final-year project topics and documentation.",
    "Confusion regarding direct second-year degree admission pathways."
  ];

  return (
    <div id="diploma" className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background glow orb */}
      <div className="absolute top-48 right-1/4 w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Diploma Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Engineering Hub</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Diploma Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Coaching</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Subject support, practical guidance, project help, and career direction for diploma students in Vadodara.
          </p>
        </motion.div>
      </section>

      {/* Common Problems vs How Noble Helps */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Problems */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/5">
            <h3 className="text-white font-extrabold text-xl mb-6 flex items-center gap-2">
              <FiAlertCircle className="text-red-500 text-2xl" />
              Challenges Diploma Students Face
            </h3>
            <div className="space-y-4">
              {problems.map((prob, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">{prob}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Help Grid */}
          <div className="lg:col-span-7 glass-panel-elevated p-8 rounded-3xl border border-red-600/20">
            <h3 className="text-white font-extrabold text-xl mb-6 flex items-center gap-2">
              <FiCheck className="text-red-500 text-2xl" />
              How Noble Education Guides You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helperPoints.slice(0, 6).map((point, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="text-white font-bold text-sm mb-1">{point.title}</h4>
                  <p className="text-zinc-400 text-xs font-light">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branch-Wise Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Branch-Wise Subject Coaching
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            We provide specialized batch coaching led by branch-expert faculties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {branches.map((branch, idx) => (
            <div 
              key={idx}
              id={branch.name.toLowerCase().includes('computer') ? 'diploma-computer' : branch.name.toLowerCase().includes('information') ? 'diploma-it' : branch.name.toLowerCase().includes('mechanical') ? 'diploma-mechanical' : branch.name.toLowerCase().includes('civil') ? 'diploma-civil' : branch.name.toLowerCase().includes('electrical') ? 'diploma-electrical' : 'diploma-chemical'}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover-glow-red transition-all duration-300 flex flex-col justify-between group relative overflow-hidden scroll-mt-24"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div>
                <div className="p-4 bg-red-600/10 rounded-2xl text-red-500 text-3xl w-fit mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  {branch.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                  {branch.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                  {branch.desc}
                </p>
              </div>

              <button
                onClick={() => navigate('/contact#inquiry')}
                className="w-full text-center bg-white/5 hover:bg-red-600 hover:text-white text-zinc-300 py-3 rounded-xl text-xs font-semibold border border-white/10 hover:border-red-600 transition-all duration-300 shadow-md"
              >
                Inquire For Batch Timings
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Project & Training Support Details */}
      <section id="project-support" className="py-16 bg-[#0D0D0D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-white font-extrabold text-3xl mb-6">Project & Documentation Support</h3>
            <p className="text-zinc-400 font-light leading-relaxed mb-6">
              Final-year diploma and engineering projects require strict documentation templates, practical model setups, and functional program scripts.
            </p>
            <div className="space-y-4 text-sm font-light">
              <div className="flex gap-2.5 items-center">
                <FiCheck className="text-red-500" />
                <span>Coding support: Web technology, Python, Database scripting</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <FiCheck className="text-red-500" />
                <span>Model setups: CAD structures, mechanical drawing guidance</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <FiCheck className="text-red-500" />
                <span>Documentation: Report writing and project PPT creations</span>
              </div>
            </div>
          </div>

          <div id="training-support" className="glass-panel p-8 rounded-3xl border border-red-600/20">
            <h3 className="text-white font-extrabold text-xl mb-4">Practical Training Guidance</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
              Get industry-ready with targeted coding, automation, drafting, and testing seminars scheduled in-center during semesters.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md"
            >
              Get Training Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Final CTAs */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-red-600/20 transition-all duration-300">
          <h4 className="text-white font-bold text-lg mb-2">Ready to Join a Batch?</h4>
          <p className="text-zinc-500 text-xs font-light mb-6">Enroll today in our offline Waghodia Road center or join online virtual sessions.</p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all duration-300 shadow-md"
          >
            Join Diploma Batch
          </button>
        </div>
        <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-red-600/20 transition-all duration-300">
          <h4 className="text-white font-bold text-lg mb-2">Need Guidance on DDCET or Branches?</h4>
          <p className="text-zinc-500 text-xs font-light mb-6">Talk directly with our expert career advisor for direct admission mapping.</p>
          <button
            onClick={() => navigate('/career-guidance')}
            className="border border-white/20 hover:border-white/50 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-all duration-300 hover:bg-white/5"
          >
            Talk to Counselor
          </button>
        </div>
      </section>

    </div>
  );
}
