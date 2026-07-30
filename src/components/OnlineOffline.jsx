import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiMapPin, FiCheckCircle, FiUsers, FiClock, FiFileText } from 'react-icons/fi';

export default function OnlineOffline() {
  const onlineFeatures = [
    "Attend live interactive online sessions",
    "Access digital study materials anytime",
    "Recorded class sessions for revision",
    "Online doubt clearance chats & forms"
  ];

  const offlineFeatures = [
    "Face-to-face physical classroom sessions",
    "Direct contact with experienced faculty",
    "In-person doubt resolution desks",
    "Printed study notes, test sheets & mock exams"
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      {/* Background glow decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Flexible Delivery</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Learn Your Way — Online or Offline
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            Noble Education provides both online and offline learning options. Students can attend classes as per their comfort and get proper guidance, study material, regular practice, doubt solving, and personal support.
          </p>
        </div>

        {/* Dual Mode grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Online Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-red-600/20 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
          >
            {/* Hover top border glow */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500 text-3xl">
                  <FiMonitor />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xl">Online Classes</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Virtual Classroom</p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm font-light mb-6">
                Perfect for students seeking convenience, flexible schedules, and remote study support from any location in Vadodara.
              </p>

              <div className="space-y-3.5">
                {onlineFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FiCheckCircle className="text-red-500 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-zinc-500">
              <span className="flex items-center gap-1"><FiClock /> Flexible Hours</span>
              <span className="flex items-center gap-1"><FiFileText /> Digital Portal</span>
            </div>
          </motion.div>

          {/* Offline Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-red-600/20 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
          >
            {/* Hover top border glow */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500 text-3xl">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xl">Offline Classes</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Physical Center Support</p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm font-light mb-6">
                Designed for students who thrive in a structured class environment with direct in-person mentorship and physical workspace.
              </p>

              <div className="space-y-3.5">
                {offlineFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FiCheckCircle className="text-red-500 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-zinc-500">
              <span className="flex items-center gap-1"><FiUsers /> Face-to-Face</span>
              <span className="flex items-center gap-1"><FiMapPin /> Waghodia Road</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
