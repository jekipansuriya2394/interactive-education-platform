import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiInfo } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function BlogPage() {
  const posts = [
    {
      title: "Direct Second-Year Degree Engineering Admission Dates Released",
      date: "June 28, 2026",
      desc: "ACPDC has announced registration dates for direct admission to degree courses. View requirements, cutoffs, and mock choice filling guides.",
      category: "Admissions"
    },
    {
      title: "DDCET Preparation Shortcuts: Applied Mathematics & Core Engineering",
      date: "June 20, 2026",
      desc: "Struggling with timed calculations? Review our expert tips on formula mapping, negative-marking rules, and speed question strategies.",
      category: "DDCET Tips"
    },
    {
      title: "Which Branch Fits Best After Diploma IT / Computer Engineering?",
      date: "May 15, 2026",
      desc: "Detailed guide comparing Web, Mobile App, Cyber Security, Artificial Intelligence, and Software Engineering scope and career placements.",
      category: "Guidance"
    },
    {
      title: "Why Class 10 Foundation Coaching Prepares You for JEE & NEET",
      date: "April 02, 2026",
      desc: "Concept clarity in standard algebra, mechanics, and molecular structures during board preparation lays a strong path for target entrance exams.",
      category: "Schooling"
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Blog Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Notice Board</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Academy <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">News & Updates</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest DDCET notifications, board schedules, and career guidance tips.
          </p>
        </motion.div>
      </section>

      {/* News Feed Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <div 
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover-glow-red transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-red-500 bg-red-600/10 border border-red-600/20 px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-zinc-500 text-xs font-light flex items-center gap-1.5">
                    <FiCalendar /> {post.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                  {post.desc}
                </p>
              </div>

              <div className="border-t border-white/5 pt-6 mt-4 flex items-center justify-between">
                <span className="text-zinc-500 text-xs">Read Time: 3 mins</span>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-xs text-red-500 hover:text-white font-semibold flex items-center gap-1.5 group-hover:underline"
                >
                  Request Counseling Info <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Board highlights */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4 items-center">
          <div className="p-3 bg-red-600/10 rounded-xl text-red-500 text-2xl h-fit border border-red-600/20">
            <FiInfo />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-1">Upcoming DDCET Exam Notice</h4>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Timetable guidelines for Gujarat D2D engineering admissions will be updated in late sem. Offline mock tests are open at our Waghodia center.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
