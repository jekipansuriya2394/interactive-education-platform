import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiMonitor, FiLayers, FiCheckCircle } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "Concept School", "Coaching Classes", "Engineering Coaching", "Competitive Batches"
  ];

  const courses = [
    {
      name: "Concept / Integrated School",
      category: "Concept School",
      tagline: "Std 8, 9, 10, 11, 12 Science",
      join: "Std 8, 9, 10, 11, 12 Science (GSEB English Medium) students",
      subjects: "Board syllabus + Entrance integration concepts",
      benefits: "Integrated school support, expert board classes, mock exams, concept coaching classes.",
      mode: "Offline",
      href: "integrated-school"
    },
    {
      name: "Coaching Classes",
      category: "Coaching Classes",
      tagline: "5th to 12th GSEB & CBSE",
      join: "Students from 5th to 12th standard (GSEB & CBSE boards)",
      subjects: "Maths, Science, English, SST, Physics, Chemistry, Biology, Mathematics",
      benefits: "Personalized faculty attention, daily updates, homework corrections, concept building boards practice.",
      mode: "Offline & Online",
      href: "coaching-classes"
    },
    {
      name: "Engineering Coaching",
      category: "Engineering Coaching",
      tagline: "Diploma, DDCET, Degree Support",
      join: "Diploma students, DDCET entrance aspirants, and Degree engineering students",
      subjects: "Branch subjects, GTU syllabus, Applied Mathematics, basic branch MCQs, final year projects support",
      benefits: "Expert branch faculty, comprehensive notes templates, OMR question series, mock test rankings.",
      mode: "Offline & Online",
      href: "engineering-coaching"
    },
    {
      name: "NEET Batch (2 Year Integrated)",
      category: "Competitive Batches",
      tagline: "Medical Admission Entrance",
      join: "11th & 12th Science students targeting NEET entrance exam",
      subjects: "Physics, Chemistry, Biology (Botany & Zoology)",
      benefits: "2-year structured coaching, daily practice sheets (DPPs), standard test books, merit updates.",
      mode: "Offline & Online",
      href: "neet-batch"
    },
    {
      name: "JEE Batch (2 Year Integrated)",
      category: "Competitive Batches",
      tagline: "IIT / NIT Entrance",
      join: "11th & 12th Science students targeting JEE Main & Advanced",
      subjects: "Physics, Chemistry, Mathematics (PCM)",
      benefits: "Formula short sheets, speed calculation mock tests, direct doubt desk, choice filling counseling.",
      mode: "Offline & Online",
      href: "jee-batch"
    }
  ];

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <div id="courses" className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Courses Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">All Programs</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Noble Academy <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Courses</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Exhaustive list of our concept-driven educational programs in Vadodara.
          </p>
        </motion.div>
      </section>

      {/* Categories Filter Tabs */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Courses Cards Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.name}
                id={course.href}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-8 rounded-3xl border border-white/5 hover-glow-red transition-all duration-300 flex flex-col justify-between group overflow-hidden relative scroll-mt-24"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-600/10 px-3 py-1.5 rounded-full border border-red-600/20">
                      {course.tagline}
                    </span>
                    <span className="text-zinc-500 text-xs font-light flex items-center gap-1">
                      <FiMonitor /> {course.mode}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                    {course.name}
                  </h3>

                  <div className="space-y-3.5 mb-6 text-sm">
                    <div>
                      <span className="text-zinc-500 font-semibold text-xs uppercase tracking-wider block mb-0.5">Who can join</span>
                      <p className="text-zinc-300 font-light leading-relaxed">{course.join}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-semibold text-xs uppercase tracking-wider block mb-0.5">Subjects covered</span>
                      <p className="text-zinc-300 font-light leading-relaxed">{course.subjects}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-semibold text-xs uppercase tracking-wider block mb-0.5">Benefits</span>
                      <p className="text-zinc-400 font-light leading-relaxed text-xs">{course.benefits}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-4">
                  <button
                    onClick={() => navigate('/contact#inquiry')}
                    className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                  >
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Mode Comparison section */}
      <section id="online-offline" className="py-16 bg-[#0D0D0D] border-y border-white/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-4">
          <div className="lg:col-span-4">
            <h3 className="text-white font-extrabold text-2xl mb-4">Learn Your Way — Online or Offline</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              We provide continuous synchronization between our virtual portals and physical desks. Review our mode comparison guide to pick the best path.
            </p>
          </div>
          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-zinc-500">
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Features</th>
                  <th id="online-classes" className="py-3 px-4 font-semibold uppercase tracking-wider scroll-mt-24">Online Mode</th>
                  <th id="offline-classes" className="py-3 px-4 font-semibold uppercase tracking-wider scroll-mt-24">Offline Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light text-zinc-300">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Live Classes</td>
                  <td className="py-3.5 px-4">Interactive Zoom/Meet</td>
                  <td className="py-3.5 px-4">Physical classroom desks</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Doubt Resolution</td>
                  <td className="py-3.5 px-4">Portal support & chats</td>
                  <td className="py-3.5 px-4">Direct face-to-face assistance</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Study Materials</td>
                  <td className="py-3.5 px-4">Digital PDF e-books</td>
                  <td className="py-3.5 px-4">Printed worksheets & notebooks</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Test series</td>
                  <td className="py-3.5 px-4">Online exam forms</td>
                  <td className="py-3.5 px-4">OMR / Printed sheets inside centers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-red-600/20">
          <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-4">Confused About Which Program to Pick?</h3>
          <p className="text-zinc-400 font-light mb-8 max-w-lg mx-auto">
            Our expert counselor can match your standard/class parameters to identify the best batch.
          </p>
          <button
            onClick={() => navigate('/career-guidance')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            Start Career Guidance
          </button>
        </div>
      </section>

    </div>
  );
}
