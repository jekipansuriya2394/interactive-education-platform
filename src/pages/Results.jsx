import React, { useState, useEffect } from 'react';
import { FiAward, FiBookOpen, FiTrendingUp, FiUsers, FiCheckCircle, FiSearch, FiFilter } from 'react-icons/fi';
import { navigate } from '../utils/router';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';

export default function Results() {
  const [achievements, setAchievements] = useState(() => adminData.getData('results') || []);
  const [selectedSchool, setSelectedSchool] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const refreshResults = () => setAchievements(adminData.getData('results') || []);
    refreshResults();
    const cleanup = adminData.initSync(refreshResults);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  // Extract unique school list dynamically
  const schoolList = ['All', ...Array.from(new Set(achievements.map(a => a.school).filter(Boolean)))];

  const filteredAchievements = achievements.filter(item => {
    const matchesSchool = selectedSchool === 'All' || item.school === selectedSchool;
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      (item.name || '').toLowerCase().includes(query) ||
      (item.school || '').toLowerCase().includes(query) ||
      (item.exam || '').toLowerCase().includes(query) ||
      (item.score || '').toLowerCase().includes(query) ||
      (item.branch || '').toLowerCase().includes(query);
    return matchesSchool && matchesSearch;
  });

  // Group achievements school-wise
  const groupedBySchool = filteredAchievements.reduce((acc, item) => {
    const schoolName = item.school || 'Other Partner Schools';
    if (!acc[schoolName]) acc[schoolName] = [];
    acc[schoolName].push(item);
    return acc;
  }, {});

  const schoolNamesList = Object.keys(groupedBySchool);

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">
      
      {/* Hero Header */}
      <section className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-results-hero.png')}')`, backgroundPosition: 'center 60%' }}>
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Achievements & Partner Schools
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Our Top Performers School-Wise
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Consistently delivering outstanding board ranks and entrance test top scores across leading partner schools in Vadodara.
          </p>
        </div>
      </section>

      {/* Featured Banner: SSC Board 2025 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#1C2E60] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-blue-900/50">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-results-hero.png')}')` }}></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-red-500/20 text-[#DC2626] border border-red-500/30 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                ★ Featured Achievement
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                SSC Board 2025 – Record-Breaking Results in Vadodara
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                This section showcases outstanding student achievements to demonstrate our commitment to academic credibility, A1-grade coaching, and real student success in Vadodara.
              </p>
              
              {/* Other top scorers list */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-extrabold text-zinc-300 uppercase tracking-widest">Other Top Scorers:</h4>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: "Prachi Parmar", score: "99.22 PR" },
                    { name: "Pratiksha Pandey", score: "97.52 PR" },
                    { name: "Jethi Suthar", score: "97.27 PR" },
                    { name: "Dhairya Darji", score: "97.14 PR" }
                  ].map((std, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-100">
                      {std.name}: <span className="text-[#DC2626]">{std.score}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Displaying Student Result Card Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 max-w-xs shadow-2xl hover:scale-105 transition-transform duration-300">
                <img 
                  src={import.meta.env.BASE_URL + 'images/shital-result.png'}
                  alt="Shital Kumavat - SSC Board 2025 Top Achiever 99.60 PR" 
                  className="rounded-2xl w-full h-auto object-cover select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive School-Wise Filter & Search Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase block mb-1">
              ★ Partner School Wise Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60]">
              Students Grouped By Partner School
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
            <input
              type="text"
              placeholder="Search student or school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-[#1C2E60] focus:outline-none focus:border-[#DC2626] shadow-sm"
            />
          </div>
        </div>

        {/* School Tabs */}
        {schoolList.length > 1 && (
          <div className="flex flex-wrap gap-2.5 mb-12">
            {schoolList.map((school, i) => (
              <button
                key={i}
                onClick={() => setSelectedSchool(school)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedSchool === school
                    ? 'bg-[#1C2E60] text-white border-[#1C2E60] shadow-md scale-105'
                    : 'bg-white text-zinc-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {school === 'All' ? ' All Partner Schools' : `🏫 ${school}`}
              </button>
            ))}
          </div>
        )}

        {/* Separate School Sections */}
        {schoolNamesList.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-zinc-500 font-medium text-sm">No student rankers found matching your search or school filter.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {schoolNamesList.map((schoolName, sIdx) => {
              const students = groupedBySchool[schoolName];

              return (
                <div key={sIdx} className="bg-white/70 backdrop-blur-md rounded-[36px] p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
                  {/* School Section Banner Title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-3.5">
                      <span className="w-10 h-10 rounded-2xl bg-[#0A1E3D] text-white font-black text-base flex items-center justify-center shadow-md">
                        {sIdx + 1}
                      </span>
                      <div>
                        <span className="text-[#DC2626] font-black text-[10px] uppercase tracking-widest block">
                          PARTNER SCHOOL RESULTS
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#0A1E3D]">
                          🏫 {schoolName}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-black text-[#DC2626] bg-red-50 px-4 py-2 rounded-full border border-red-100/90 self-start sm:self-auto shadow-2xs">
                      {students.length} {students.length === 1 ? 'Top Ranker' : 'Top Rankers'}
                    </span>
                  </div>

                  {/* School Student Ranker Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {students.map((item, idx) => {
                      const photoUrl = item.image ? getEmbedImageUrl(item.image) : null;

                      return (
                        <div key={idx} className="bg-white rounded-[32px] border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(10,30,61,0.12)] hover:border-[#DC2626]/40 transition-all duration-500 flex flex-col justify-between group">
                          <div>
                            {/* 1. TOP HEADER BAR ABOVE PHOTO */}
                            <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-[#0A1E3D] to-slate-900 border-b border-slate-800 flex items-center justify-between">
                              <span className="inline-flex items-center gap-2 text-[11px] font-black text-white bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                                {item.exam}
                              </span>
                              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#DC2626] to-[#EF4444] text-white flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-white/20">
                                <FiAward className="text-lg" />
                              </div>
                            </div>

                            {/* 2. PURE 100% UNTOUCHED PHOTO CONTAINER */}
                            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                              {photoUrl ? (
                                <img
                                  src={photoUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                  onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                                />
                              ) : null}
                              <div
                                className="w-full h-full bg-gradient-to-br from-[#1C2E60] via-[#0A1E3D] to-slate-950 text-white font-black text-4xl flex items-center justify-center"
                                style={{ display: photoUrl ? 'none' : 'flex' }}
                              >
                                {(item.name || 'S').slice(0, 2).toUpperCase()}
                              </div>
                            </div>

                            {/* 3. CLEAR CARD CONTENT BODY */}
                            <div className="p-6 sm:p-7 space-y-4">
                              {/* Student Name & Stream */}
                              <div>
                                <h3 className="text-xl font-black text-[#0A1E3D] group-hover:text-[#DC2626] transition-colors leading-snug">
                                  {item.name}
                                </h3>
                                <div className="text-xs text-zinc-500 font-semibold mt-0.5">{item.branch}</div>
                              </div>

                              {/* School Tag */}
                              <div className="text-xs font-extrabold text-[#1C2E60] bg-blue-50/90 px-3.5 py-1.5 rounded-xl border border-blue-200/80 inline-flex items-center gap-2 shadow-2xs">
                                🏫 {schoolName}
                              </div>

                              {/* Score & Ranker Performance Block */}
                              <div className="bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent border-l-4 border-[#DC2626] p-4 rounded-2xl">
                                <span className="text-[#DC2626] font-black text-[10px] uppercase tracking-widest block mb-0.5">
                                  ★ RANKER PERFORMANCE
                                </span>
                                <div className="text-3xl sm:text-4xl font-black text-[#0A1E3D] tracking-tight">
                                  {item.score}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Status Footer */}
                          <div className="mx-6 sm:mx-7 mb-6 pt-4 border-t border-slate-100 text-xs font-extrabold text-[#1C2E60] flex items-center justify-between">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                              {item.status}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Topper</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Coaching Trust & Marketing Feature Grid */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              The Noble Formula
            </span>
            <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">
              How We Consistently Produce Toppers
            </h2>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              Academic excellence isn't a coincidence. At Noble Education, we combine structured learning systems with personalized support to help every student unlock their highest board score potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiBookOpen className="text-2xl text-blue-600" />,
                title: "Decades-Experienced Faculty",
                desc: "Learn from senior educators who are experts in Board paper patterns and scoring guidelines."
              },
              {
                icon: <FiTrendingUp className="text-2xl text-blue-600" />,
                title: "Rigorous Test Series",
                desc: "Weekly chapter tests and complete board-level mock test series to build confidence."
              },
              {
                icon: <FiUsers className="text-2xl text-blue-600" />,
                title: "Personalized Support",
                desc: "Limited strength per batch allows our mentors to resolve individual doubts instantly."
              },
              {
                icon: <FiCheckCircle className="text-2xl text-blue-600" />,
                title: "Regular Parents Updates",
                desc: "Detailed performance tracking and direct coordinator calls to keep parents aligned."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-[#F8FAFC] hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Container */}
          <div className="mt-16 bg-gradient-to-r from-[#1C2E60] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black">Ready to secure A1-Grade results in your boards?</h3>
              <p className="text-zinc-300 text-xs sm:text-sm font-light max-w-xl mx-auto">
                Enroll in our upcoming batches and take the first step towards academic greatness. Book a free consultation with our senior counsellors.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => navigate('/contact#inquiry-form')}
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md inline-block cursor-pointer hover:scale-105"
                >
                  Book Free Counselling Session
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
