import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiVideo, FiUsers, FiAward } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { id: "All", name: "All Media", icon: <FiCamera /> },
    { id: "Classroom", name: "Classrooms", icon: <FiCamera /> },
    { id: "Events", name: "Events & Seminars", icon: <FiAward /> },
    { id: "Activities", name: "Student Activities", icon: <FiUsers /> },
    { id: "Videos", name: "Videos & Reels", icon: <FiVideo /> }
  ];

  const galleryItems = [
    { id: 1, category: "Classroom", title: "Smart Classroom Setup", type: "image", desc: "Interactive whiteboard learning and batch desk comfort." },
    { id: 2, category: "Classroom", title: "Faculty Doubt Solving Session", type: "image", desc: "One-to-one desk tutoring for physics calculation problems." },
    { id: 3, category: "Events", title: "Annual Career Counselling Seminar", type: "image", desc: "Guiding over 200 parents on branch ACPDC choices." },
    { id: 4, category: "Events", title: "NEET/JEE Merit Felicitation", type: "image", desc: "Awarding our top board and competitive exam scorers." },
    { id: 5, category: "Activities", title: "Group Coding Practice Session", type: "image", desc: "Diploma computer students working on database coding tasks." },
    { id: 6, category: "Activities", title: "Syllabus Mock Test Setup", type: "image", desc: "Simulated OMR exam sheets practice inside center." },
    { id: 7, category: "Videos", title: "DDCET Concept Video Guide", type: "video", desc: "Quick video explanation of DDCET mathematics syllabus." },
    { id: 8, category: "Videos", title: "Student Feedback Reels", type: "video", desc: "Hear what direct diploma alumni say about our coaching." }
  ];

  const filteredItems = activeTab === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <div id="gallery" className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Gallery Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Academy Life</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Noble Education</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Take a visual tour inside our classrooms, seminars, student achievements, and reels.
          </p>
        </motion.div>
      </section>

      {/* Category Tab Buttons */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Media Items */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                id={
                  item.category === "Classroom" ? "gallery-classroom" :
                  item.category === "Events" ? "gallery-events" :
                  item.category === "Activities" ? "gallery-students" :
                  item.category === "Videos" ? "gallery-videos" : undefined
                }
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-3xl border border-white/5 hover-glow-red transition-all duration-300 overflow-hidden group flex flex-col justify-between scroll-mt-24"
              >
                {/* Mock image visual container */}
                <div className="h-44 bg-neutral-900 border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
                  
                  {/* Decorative mesh placeholder background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent" />
                  
                  {item.type === 'video' ? (
                    <div className="p-4 bg-red-600 rounded-full text-white text-2xl z-20 shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
                      <FiVideo />
                    </div>
                  ) : (
                    <div className="text-zinc-600 text-5xl group-hover:scale-110 transition-transform z-20">
                      <FiCamera />
                    </div>
                  )}

                  {/* Header Tag */}
                  <span className="absolute top-4 left-4 z-20 text-[9px] font-bold tracking-widest text-red-500 bg-[#0A0A0A] border border-red-600/30 px-2 py-1 rounded-full uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <h4 className="text-white font-bold text-base mb-2 group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA Visit Area */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-red-600/20">
          <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-4">Visit Noble Education Today</h3>
          <p className="text-zinc-400 font-light mb-8 max-w-md mx-auto">
            Experience our advanced learning rooms, meet the core faculties, and review printed study notes inside Waghodia center.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            Get Directions & Timings
          </button>
        </div>
      </section>

    </div>
  );
}
