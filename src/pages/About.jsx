import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiCompass, FiAward, FiBookOpen, FiCheckCircle, FiImage, FiArrowRight } from 'react-icons/fi';
import { statsData } from '../data/statsData';
import { navigate } from '../utils/router';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';

export default function About() {
  const [aboutPhotos, setAboutPhotos] = useState(() => {
    const all = adminData.getData('pageImages') || {};
    return all.about || [];
  });
  const [partnerSchools, setPartnerSchools] = useState(() => adminData.getData('partnerSchools') || []);

  useEffect(() => {
    const refreshPhotos = () => {
      const all = adminData.getData('pageImages') || {};
      setAboutPhotos(all.about || []);
      setPartnerSchools(adminData.getData('partnerSchools') || []);
    };
    refreshPhotos();
    const cleanup = adminData.initSync(refreshPhotos);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">
      
      {/* Hero Header */}
      <section className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-about-hero.png')}')`, backgroundPosition: 'center 80%' }}>
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Legacy & Vision
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            About Noble Education
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            For over 19 years, we have guided students across school board examinations and engineering courses in Vadodara.
          </p>
        </div>
      </section>

      {/* Core Details */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-[#DC2626]" />
              <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase">Core Identity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2E60] mb-6 leading-tight">
              Our Legacy of Academic Excellence
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Founded on the belief that conceptual understanding is the core key to academic success, Noble Education has grown to become a premier coaching institute on Waghodia Road.
            </p>
            <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed mb-8">
              We specialize in offering support across school standards (GSEB/CBSE), competitive exams like NEET & JEE, state entrances like GUJCET, and semester support for GTU Diploma & Degree Engineering.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#DC2626] text-lg flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1C2E60]">Expert Subject Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#DC2626] text-lg flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1C2E60]">Regular Exam Mocks</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#DC2626] text-lg flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1C2E60]">Personal Progress Update</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#DC2626] text-lg flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1C2E60]">ACPDC Choice filling</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {statsData.map((stat, i) => (
              <div key={i} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center hover-glow-red">
                <div className="text-3xl font-black text-[#DC2626] mb-2">{stat.value}</div>
                <div className="text-xs font-extrabold text-[#1C2E60] mb-1 uppercase tracking-wider">{stat.label}</div>
                <p className="text-[10px] text-zinc-400 font-light leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Page Content Photos: Campus & Learning Environment */}
      {aboutPhotos && aboutPhotos.length > 0 && (
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                Premises & Facilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
                Our Campus Infrastructure
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2">
                Explore our classroom setups, dedicated faculty desks, and learning environment in Vadodara.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutPhotos.map((item, idx) => (
                <div key={idx} className="bg-[#F4F6F9] border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={getEmbedImageUrl(item.image || item.url)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.category && (
                      <span className="absolute top-4 left-4 text-[10px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-[#1C2E60] text-base mb-2">{item.title}</h3>
                    {item.desc && <p className="text-zinc-500 text-xs font-light leading-relaxed">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      <section className="py-24 bg-[#F4F6F9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <div className="p-3 bg-[#1C2E60]/10 text-[#1C2E60] rounded-2xl border border-[#1C2E60]/20 w-fit mb-6 text-2xl">
              <FiTarget />
            </div>
            <h3 className="text-lg font-extrabold text-[#1C2E60] mb-4">Our Mission</h3>
            <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
              To deliver concept clarity, standard question logs, regular practice mock series, and counseling support to every student to secure high academic results and clear college admissions path mapping.
            </p>
          </div>
          
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <div className="p-3 bg-[#1C2E60]/10 text-[#1C2E60] rounded-2xl border border-[#1C2E60]/20 w-fit mb-6 text-2xl">
              <FiCompass />
            </div>
            <h3 className="text-lg font-extrabold text-[#1C2E60] mb-4">Our Vision</h3>
            <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
              To be the most trusted education provider in Vadodara by ensuring quality academic resources, transparent progress records, and career branch selector matches for parents and students.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Schools Relationship Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Academic Partnerships
          </span>
          <h2 className="text-3xl font-black text-[#1C2E60] tracking-tight">
            Integrated Schooling & Tuition Support
          </h2>
          <p className="text-zinc-500 text-sm font-light leading-relaxed">
            Noble Education serves as the main academic partner powering key campuses in Vadodara. Our integrated schooling model delivers robust tuition support directly within the school curriculum, eliminating the need for outside tuition classes.
          </p>
        </div>

        {/* Dynamic Auto-Arranging Partner Schools Grid (100% PERFECT ALIGNMENT & AUTO SPACING) */}
        {(() => {
          const count = partnerSchools.length;
          const gridColClass = count === 1 
            ? 'grid-cols-1 max-w-md mx-auto' 
            : count === 2 
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
            : count === 3 
            ? 'grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto';

          return (
            <div className={`grid ${gridColClass} gap-8 items-stretch`}>
              {partnerSchools.map((school, idx) => {
                const schoolImg = school.image ? getEmbedImageUrl(school.image) : '/images/bg-about-hero.png';
                const defaultAddrMap = {
                  'royal': 'Kamla Nagar Lake Road, Ajwa Road, Vadodara',
                  'raghukul': 'Opp. Balaji Township, New VIP Road, Vadodara',
                  'new heaven': 'Vrundavan Char Rasta, Waghodia Road, Vadodara'
                };
                const lowerName = (school.name || '').toLowerCase();
                const foundFallbackKey = Object.keys(defaultAddrMap).find(k => lowerName.includes(k));
                const locationAddr = school.address || (foundFallbackKey ? defaultAddrMap[foundFallbackKey] : 'Waghodia Road, Vadodara');
                const mapHref = school.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(school.name + ' ' + locationAddr)}`;
                const telHref = school.contact ? `tel:${school.contact.replace(/\s+/g, '')}` : 'tel:9104206999';

                const mediumLabel = school.medium && school.medium.toLowerCase() !== 'partner school' 
                  ? school.medium 
                  : (lowerName.includes('royal') ? 'English Medium' : 'Gujarati Medium');

                const isEnglish = mediumLabel.toLowerCase().includes('english');

                return (
                  <div 
                    key={idx} 
                    className="bg-white border-2 border-slate-200/90 rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#DC2626]/40 transition-all duration-300 flex flex-col justify-between h-[610px] group"
                  >
                    {/* 1. School Photo Banner Header with Medium Badge */}
                    <div 
                      onClick={() => navigate(`/school?name=${encodeURIComponent(school.name)}`)}
                      className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-slate-900 cursor-pointer"
                    >
                      <img
                        src={schoolImg}
                        alt={school.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/images/bg-about-hero.png'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {/* Upper School Medium Badge */}
                      <span className={`absolute top-4 left-4 text-xs font-black text-white px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-white/20 backdrop-blur-md ${
                        isEnglish ? 'bg-[#1C2E60]' : 'bg-[#DC2626]'
                      }`}>
                        {mediumLabel}
                      </span>
                    </div>

                    {/* 2. Card Content Details Body (STANDARDIZED SLOT HEIGHTS FOR 100% HORIZONTAL ALIGNMENT) */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      
                      {/* Slot 1: School Name Slot (Fixed h-10) */}
                      <div className="h-10 flex items-center justify-between">
                        <h3 
                          onClick={() => navigate(`/school?name=${encodeURIComponent(school.name)}`)}
                          className="text-xl font-black text-[#1C2E60] group-hover:text-[#DC2626] transition-colors leading-tight cursor-pointer truncate max-w-full"
                        >
                          {school.name}
                        </h3>
                      </div>

                      {/* Slot 2: Standards Supported Box Slot (Fixed h-16) */}
                      <div className="h-16 bg-blue-50/90 border border-blue-100/90 px-4 py-2.5 rounded-2xl flex flex-col justify-center">
                        <span className="text-[9px] font-black text-[#DC2626] uppercase tracking-widest block">
                          🎓 STANDARDS OFFERED
                        </span>
                        <p className="text-xs font-extrabold text-[#1C2E60] leading-tight truncate mt-0.5">
                          {school.standards || 'Standards 8th to 12th Science'}
                        </p>
                      </div>

                      {/* Slot 3: Description Text Slot (Fixed h-14) */}
                      <div className="h-14 flex items-center">
                        <p className="text-[#5A6472] text-xs font-light leading-relaxed line-clamp-2">
                          {school.description || 'Premier integrated coaching campus for GSEB & CBSE board preparation.'}
                        </p>
                      </div>

                      {/* Slot 4: Clickable Location Address Box Slot (Fixed h-20) */}
                      <div className="h-20 flex flex-col justify-center">
                        <a 
                          href={mapHref} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#1C2E60] hover:text-[#DC2626] transition-colors cursor-pointer flex items-center gap-2.5 w-full bg-slate-50 hover:bg-red-50/60 p-3 rounded-2xl border border-slate-200/90 shadow-xs group/loc h-full"
                          title={`Click to View ${locationAddr} on Google Maps`}
                        >
                          <span className="flex-shrink-0 text-red-600 text-base">📍</span>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-extrabold text-[#1C2E60] group-hover/loc:text-[#DC2626] leading-tight block truncate">
                              {locationAddr}
                            </span>
                            <span className="text-[10px] text-blue-600 font-bold underline decoration-dotted mt-1 block">
                              Open in Google Maps ↗
                            </span>
                          </div>
                        </a>
                      </div>

                      {/* Slot 5: Contact Bar Desk Slot (Fixed h-10) */}
                      <div className="h-10 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold">Contact Desk:</span>
                        <a 
                          href={telHref} 
                          className="font-extrabold text-[#1C2E60] hover:text-[#DC2626] transition-colors inline-flex items-center gap-1.5 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-100/90 cursor-pointer"
                          title="Click to Call Partner School"
                        >
                          📞 {school.contact || '9104206999'}
                        </a>
                      </div>
                    </div>

                    {/* 3. Card Footer Action Button (Fixed h-14) */}
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => navigate(`/school?name=${encodeURIComponent(school.name)}`)}
                        className="w-full h-12 bg-[#1C2E60] hover:bg-[#DC2626] text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Explore Campus Page</span>
                        <FiArrowRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </section>

    </div>
  );
}
