import React from 'react';
import { FiCamera, FiVideo, FiAward, FiUsers, FiBookOpen } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function GalleryHighlight() {
  const items = [
    { title: "Smart Learning Classrooms", tag: "Classrooms", id: "gallery-classroom", icon: <FiCamera /> },
    { title: "Parent Counseling Seminars", tag: "Events", id: "gallery-events", icon: <FiAward /> },
    { title: "Mock Tests & Mock Seminars", tag: "Activities", id: "gallery-students", icon: <FiUsers /> },
    { title: "DDCET Concept Video Guide", tag: "Videos", id: "gallery-videos", icon: <FiVideo /> }
  ];

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Life at Noble</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Life at Noble Education
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-8">
            Discover our classes, counselling sessions, student events, and seminar guides.
          </p>
        </div>

        {/* simple links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => navigate(`/gallery#${item.id}`)}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-red-600/30 hover:-translate-y-1 cursor-pointer transition-all duration-300 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-600/10 rounded-xl text-red-500 text-lg group-hover:bg-red-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <span className="text-white text-xs font-semibold">{item.tag}</span>
              </div>
              <span className="text-zinc-600 text-xs group-hover:text-red-500 font-bold">→</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/gallery')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
          >
            <FiBookOpen /> View Full Gallery Photos & Videos
          </button>
        </div>

      </div>
    </section>
  );
}
