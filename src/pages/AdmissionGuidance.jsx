import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiFileText, FiCompass, FiAward, FiInfo, FiBookOpen, FiCalendar, FiUsers, FiUpload, FiShield, FiMessageSquare } from 'react-icons/fi';
import { navigate } from '../utils/router';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';

export default function AdmissionGuidance() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [admissionPhotos, setAdmissionPhotos] = useState(() => {
    const all = adminData.getData('pageImages') || {};
    return all.admission || [];
  });

  useEffect(() => {
    const refreshPhotos = () => {
      const all = adminData.getData('pageImages') || {};
      setAdmissionPhotos(all.admission || []);
    };
    refreshPhotos();
    const cleanup = adminData.initSync(refreshPhotos);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const stepsData = [
    {
      num: "01",
      title: "Online Registration",
      desc: "Register on the official ACPC/ACPDC portal, purchase the PIN, and input student details.",
      icon: <FiFileText className="text-2xl" />
    },
    {
      num: "02",
      title: "Document Upload",
      desc: "Scan and upload academic marksheets, school leaving certificates, and category proofs.",
      icon: <FiUpload className="text-2xl" />
    },
    {
      num: "03",
      title: "Merit Rank Release",
      desc: "Review the officially published merit lists and check your unique state ranking.",
      icon: <FiCalendar className="text-2xl" />
    },
    {
      num: "04",
      title: "Choice Filling",
      desc: "Arrange and lock your preferred college options in mock and final allotment rounds.",
      icon: <FiCompass className="text-2xl" />
    },
    {
      num: "05",
      title: "Seat Confirmation",
      desc: "Pay the online token tuition fee to lock your allotted engineering college seat.",
      icon: <FiCheckCircle className="text-2xl" />
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">

      {/* Hero Banner */}
      <section className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url('/images/bg-admission-hero.png')`, backgroundPosition: 'center 60%' }}>
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Admissions 2026-27
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Admission & Choice Filling Guidance
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Complete assistance for ACPC, ACPDC, DDCET, and 10th/12th stream selection counseling in Vadodara.
          </p>
        </div>
      </section>

      {/* Stream Selection Section */}
      <section id="stream-selection" className="scroll-mt-28 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Post 10th Counseling
          </span>
          <h2 className="text-3xl font-black text-[#1C2E60] mt-4 mb-4">
            After 10th Standard Selection Guide
          </h2>
          <p className="text-zinc-600 text-sm font-light leading-relaxed">
            Choosing between Science (A-Group / B-Group), Commerce, Arts, or GTU Diploma Engineering is a critical junction. We provide personal aptitude assessment and career roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-4">A-GROUP SCIENCE</div>
            <h3 className="text-lg font-bold text-[#1C2E60] mb-2">Physics, Chemistry, Maths</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">Ideal for students targeting Degree Engineering (BE/B.Tech), Architecture, Computer Science, and IT careers.</p>
            <span className="text-xs font-semibold text-[#DC2626]">Requires: Strong Math Foundation</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">
            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit mb-4">B-GROUP SCIENCE</div>
            <h3 className="text-lg font-bold text-[#1C2E60] mb-2">Physics, Chemistry, Biology</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">Target Medical (MBBS/BAMS/BHMS), Pharmacy, Biotechnology, Physiotherapy, and Nursing courses.</p>
            <span className="text-xs font-semibold text-[#DC2626]">Requires: NEET Exam Prep</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">
            <div className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit mb-4">DIPLOMA ENGINEERING</div>
            <h3 className="text-lg font-bold text-[#1C2E60] mb-2">3-Year Technical Course</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">Direct hands-on technical learning after 10th. Leads to DDCET exam for direct 2nd-year Degree entry.</p>
            <span className="text-xs font-semibold text-[#DC2626]">Requires: ACPDC Merit Rank</span>
          </div>
        </div>
      </section>

      {/* After 12th Counseling Section */}
      <section id="after-12th" className="scroll-mt-28 py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Post 12th Counseling
            </span>
            <h2 className="text-3xl font-black text-[#1C2E60] mt-4 mb-4">
              After 12th Science Entrance Roadmaps
            </h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed">
              We guide students through ACPC choice filling, merit list calculations, and college selection for Degree Engineering and Medical admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#F4F6F9] border border-slate-200 rounded-3xl">
              <h3 className="text-lg font-extrabold text-[#1C2E60] mb-3">ACPC Engineering Allotment</h3>
              <p className="text-zinc-600 text-xs leading-relaxed mb-4">
                Gujarat ACPC calculates merit based 50:50 on 12th Board Theory Percentile and GUJCET Percentile. We assist in creating optimized choice filling lists to maximize college allotment chances.
              </p>
            </div>

            <div className="p-8 bg-[#F4F6F9] border border-slate-200 rounded-3xl">
              <h3 className="text-lg font-extrabold text-[#1C2E60] mb-3">NEET Medical & Pharmacy Rules</h3>
              <p className="text-zinc-600 text-xs leading-relaxed mb-4">
                Detailed guidance on Admission Committee for Professional Undergraduate Medical Educational Courses (ACPUGMEC) registration, round 1 mock choices, and seat locking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Page Content Photos: Admission Seminars & Counseling Desks */}
      {admissionPhotos && admissionPhotos.length > 0 && (
        <section className="py-16 bg-[#F4F6F9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                Counseling Sessions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
                Admission Workshops & Counseling Desks
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2">
                Moments from our 1-on-1 counseling desks, ACPC choice filling sessions, and parent seminars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {admissionPhotos.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
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

      {/* Admission Steps Section */}
      <section id="admission-steps" className="scroll-mt-28 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Process Timeline
          </span>
          <h2 className="text-3xl font-black text-[#1C2E60] mt-4 mb-4">
            Step-by-Step ACPC / ACPDC Registration
          </h2>
          <p className="text-zinc-600 text-sm font-light leading-relaxed">
            Follow our simplified 5-step roadmap to complete online admission registration smoothly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stepsData.map((step, idx) => (
            <div key={idx} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="text-[#DC2626] font-black text-2xl mb-2">{step.num}</div>
              <h3 className="font-bold text-[#1C2E60] text-sm mb-2">{step.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents Checklist Section */}
      <section id="documents-checklist" className="scroll-mt-28 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-[#1C2E60]">Documents Checklist</h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed">
              Make sure you have these key scanned documents ready in PDF/JPEG format before commencing the online registration process:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "10th Standard Marksheet",
                "12th Standard Marksheet (for ACPC)",
                "GUJCET / JEE Scorecard",
                "School Leaving Certificate (LC)",
                "Caste/Category Certificate (if applicable)",
                "Non-Creamy Layer Certificate (OBC)",
                "EWS/TFW Income Proof (if target)",
                "Recent Passport Sized Photos"
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#DC2626] text-sm flex-shrink-0" />
                  <span className="text-xs text-zinc-700 font-semibold">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TFWS Banner Card */}
          <div className="bg-[#1C2E60] text-white p-8 rounded-3xl border border-blue-950 relative overflow-hidden shadow-xl space-y-4">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-2 text-[#DC2626] bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full w-fit text-[10px] font-extrabold uppercase tracking-wider">
              <FiInfo /> Save Tuition Fees
            </div>
            <h3 className="text-xl font-extrabold text-white">Tuition Fee Waiver Scheme (TFWS)</h3>
            <p className="text-zinc-300 text-xs font-light leading-relaxed">
              Under Gujarat government policies, eligible students with a family income below **₹8 Lakhs/year** can qualify for TFWS seats. This completely waives the college tuition fee (100% free tuition) across all government and self-financed engineering institutions.
            </p>
            <p className="text-zinc-400 text-[10px] font-semibold italic">
              *Requires submission of valid Income Certificate issued by Mamlatdar/TDO.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
