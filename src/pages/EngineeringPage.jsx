import React, { useState, useEffect } from 'react';
import { 
  FiCpu, 
  FiAward, 
  FiFileText, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiArrowRight, 
  FiPhone, 
  FiSend,
  FiPlay,
  FiImage
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { inquiryService } from '../utils/inquiryService';
import { getEmbedImageUrl, handleImageError, isVideoMedia } from '../utils/imageUrl';
import { adminData } from '../utils/adminData';
import UniversalVideoModal from '../components/UniversalVideoModal';

export default function EngineeringPage() {
  const [formSent, setFormSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [pageMedia, setPageMedia] = useState(() => (adminData.getData('pageImages') || {}).engineering || []);
  const [liveResults, setLiveResults] = useState(() => adminData.getData('results') || []);

  useEffect(() => {
    const refreshData = () => {
      const pImages = adminData.getData('pageImages') || {};
      setPageMedia(pImages.engineering || []);
      setLiveResults(adminData.getData('results') || []);
    };
    refreshData();
    const unsub = adminData.initSync(refreshData);
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: 'DDCET Entrance Coaching',
    branch: 'Computer / IT Engineering',
    semester: 'Semester 5 / 6 (DDCET Target)',
    message: ''
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    inquiryService.sendInquiry({
      ...formData,
      formSource: 'Noble Engineering Page',
      message: `[Noble Engineering Inquiry] Program: ${formData.program}, Branch: ${formData.branch}, Semester: ${formData.semester}. Note: ${formData.message || 'Admission & syllabus details requested'}`
    });

    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({
        name: '',
        phone: '',
        program: 'DDCET Entrance Coaching',
        branch: 'Computer / IT Engineering',
        semester: 'Semester 5 / 6 (DDCET Target)',
        message: ''
      });
    }, 4500);
  };

  const engineeringPillars = [
    {
      id: 'diploma',
      badge: 'GTU / Private Universities',
      title: 'Diploma Engineering Coaching',
      tagline: 'Sem 1 to 6 • All Engineering Branches',
      desc: 'Comprehensive semester coaching for GTU diploma students in Vadodara. Covering textbook concepts, GTU past 10-year question papers, mid-sem score booster tests, and remedial backlog clearance.',
      branches: ['Mechanical', 'Civil', 'Electrical', 'Computer / IT', 'Automobile', 'EC Engineering'],
      features: [
        'Complete coverage of hard technical & numerical subjects',
        'GTU previous year papers & model answer sheet guidelines',
        'Backlog / Remedial fast-track batches with personal attention',
        'Formulas sheets, chapter-wise test series & journal guidance'
      ],
      icon: FiFileText
    },
    {
      id: 'degree',
      badge: 'B.E. / B.Tech Semesters',
      title: 'Degree Engineering Coaching',
      tagline: 'Maths 1-2-3 & Core Technical Subjects',
      desc: 'Expert coaching for Degree Engineering students across GTU, MSU, Parul, SVIT, Navrachana, ITM, and CHARUSAT. Special emphasis on high-risk engineering mathematics and branch-specific core technical papers.',
      branches: ['B.E. / B.Tech Computer', 'Mechanical', 'Civil', 'Electrical', 'IT / AI & Data'],
      features: [
        'Mastery of Engineering Mathematics (Maths-1, 2, 3, PDE & Complex)',
        'Core mechanical: Thermodynamics, Fluid Mechanics, Strength of Materials',
        'Core civil: Structural Analysis, Concrete Tech, Surveying, Fluid Mechanics',
        'Computer/IT: Data Structures, Algorithms, DBMS, Operating Systems'
      ],
      icon: FiAward
    },
    {
      id: 'ddcet',
      badge: 'Lateral Entry to Degree',
      title: 'DDCET Entrance Coaching',
      tagline: 'Diploma to Degree Common Entrance Test',
      desc: 'Gujarat’s premier coaching program for DDCET lateral entry into 2nd-year Degree Engineering. Helping diploma students secure top merit ranks for admission in LD College of Engineering, BVM, VGEC, MSU, and DDU.',
      branches: ['All Diploma Final Year Students (Sem 5 & 6)'],
      features: [
        'Complete DDCET syllabus: Applied Physics, Chemistry & Mathematics',
        'Core Engineering Technical common subjects breakdown',
        '300+ Chapter-wise Daily Practice Problem (DPP) question banks',
        '15 Full-length OMR Mock Test Trials matching exact ACPC exam pattern',
        'Full ACPC Choice-Filling & College Allotment counseling'
      ],
      icon: FiTrendingUp
    },
    {
      id: 'internship',
      badge: 'Industry Project & Training',
      title: 'Industrial Internship & Projects',
      tagline: 'Hands-on Software, CAD & Live Projects',
      desc: 'Practical skill development and internship programs for Diploma & Degree engineering students. Build live industry-grade capstone projects, gain hands-on tool mastery, and receive recognized training certificates.',
      branches: ['Computer / IT', 'Mechanical', 'Civil', 'Electrical & Electronics'],
      features: [
        'Web & Software: Full Stack MERN, Python, React, Database Engineering',
        'Mechanical & Civil: AutoCAD 2D/3D, SolidWorks, CATIA, Revit, STAAD.Pro',
        'Electronics & Embedded: Arduino, Raspberry Pi, IoT Sensor Systems',
        'Official ISO-compliant Internship Completion Certificate for college submission',
        'Viva presentation preparation & GitHub / Portfolio documentation'
      ],
      icon: FiCpu
    }
  ];

  const achievers = [
    {
      name: "Shah Miti",
      score: "10.0 SPI",
      exam: "Diploma GTU",
      branch: "Computer Engineering",
      college: "Admitted into Top Degree College",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Mehta Keyur",
      score: "Rank 12",
      exam: "DDCET 2024",
      branch: "IT Engineering",
      college: "Admitted into VGEC Chandkheda",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Patel Harshil",
      score: "9.84 SPI",
      exam: "Degree Sem 4",
      branch: "Mechanical Engineering",
      college: "Maths-3 & Thermodynamics Top Scorer",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Rathod Jayesh",
      score: "Rank 38",
      exam: "DDCET 2024",
      branch: "Civil Engineering",
      college: "Admitted into LD College of Engg, Ahmedabad",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
    }
  ];

  const dynamicAchievers = [
    ...achievers,
    ...(Array.isArray(liveResults) ? liveResults : [])
      .filter(r => {
        const exam = (r.exam || '').toLowerCase();
        const branch = (r.branch || '').toLowerCase();
        return (exam.includes('ddcet') || exam.includes('diploma') || exam.includes('degree') || branch.includes('engineering')) &&
               !achievers.some(a => a.name.toLowerCase() === (r.name || '').toLowerCase());
      })
      .map(r => ({
        name: r.name,
        score: r.score,
        exam: r.exam || 'Engineering',
        branch: r.branch || 'Engineering Stream',
        college: r.status || r.school || 'Noble Engineering, Vadodara',
        image: r.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
      }))
  ];

  const faqs = [
    {
      q: "What is DDCET and who is eligible to appear for it?",
      a: "DDCET (Diploma to Degree Common Entrance Test) is the mandatory entrance examination conducted by the Gujarat Examination Authority for diploma holders seeking lateral entry directly into the 2nd year (3rd semester) of Degree Engineering (B.E. / B.Tech). Final-year diploma students (Sem 5 & 6) or passed-out students from AICTE-approved institutions are eligible."
    },
    {
      q: "Can I join Noble Engineering for a single difficult subject like Engineering Mathematics?",
      a: "Yes! We offer subject-specific specialized modules for Engineering Mathematics (Maths-1, Maths-2, Maths-3, Vector Calculus, PDE, Complex Analysis), Mechanics of Solids (MOS), and technical core subjects for both Diploma and Degree students."
    },
    {
      q: "Do you offer remedial and backlog clearing batches for GTU students?",
      a: "Yes. We run targeted fast-track backlog clearing batches prior to GTU summer and winter remedial examinations. These batches focus on high-frequency question patterns, formula shortcuts, and scoring strategies."
    },
    {
      q: "Will the Internship Certificate be valid for our official college academic submission?",
      a: "Absolutely. Noble Engineering provides an official, verified Internship Completion Certificate along with project source code, design files (CAD/SolidWorks/MERN), and a complete project documentation report that meets university GTU guidelines."
    },
    {
      q: "Do you provide ACPC choice-filling counseling after DDCET results?",
      a: "Yes! Every DDCET batch student receives comprehensive one-on-one ACPC college counseling. We analyze your merit rank, past cut-off trends, and branch preferences to build the optimal choice-filling list for LD, BVM, VGEC, MSU, and government engineering colleges."
    },
    {
      q: "Where are the engineering classes held and what are the batch timings?",
      a: "All engineering lectures and lab training are conducted at our main campus on Waghodia Road, Vadodara. Morning, evening, and weekend batches are available to accommodate college lecture schedules."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">

      {/* 1. HERO HEADER (EXACT SITE-WIDE UNIFORM SIZE, PADDING & TYPOGRAPHY) */}
      <section
        className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${getEmbedImageUrl('/images/hero-engineering.png')}')`, backgroundPosition: 'center 40%' }}
      >
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 inline-block">
            Technical & Engineering Division
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Noble Engineering
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Diploma, Degree, DDCET Coaching & Industrial Internship Training in Vadodara with 19+ years of academic excellence.
          </p>
        </div>
      </section>

      {/* 2. SUB-NAVIGATION & KEY HIGHLIGHTS STRIP */}
      <section className="py-4 border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          {/* Quick Anchor Links */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <a
              href="#diploma"
              className="bg-[#1C2E60] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-blue-900 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <span>🛠️</span> Diploma Coaching
            </a>
            <a
              href="#degree"
              className="bg-slate-100 hover:bg-slate-200 text-[#1C2E60] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>🎓</span> Degree (B.E./B.Tech)
            </a>
            <a
              href="#ddcet"
              className="bg-red-50 hover:bg-red-100 text-[#DC2626] border border-red-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>🚀</span> DDCET Entrance
            </a>
            <a
              href="#internship"
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>💼</span> Internship & Projects
            </a>
            <a
              href="#engineering-inquiry"
              className="bg-[#DC2626] hover:bg-red-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <span>✍</span> Admission Inquiry
            </a>
          </div>

          {/* Quick Contact Helpline */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-bold text-slate-700">
            <a
              href="tel:9638256222"
              className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-xl transition-all"
            >
              <FiPhone className="text-green-600" /> Helpline: 96382 56222
            </a>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE PILLARS OVERVIEW */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            Academic & Industry Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E60] mt-3">
            Comprehensive Technical Coaching & Training
          </h2>
          <p className="text-zinc-600 font-light text-sm mt-2 max-w-2xl mx-auto">
            From first-year diploma fundamentals to degree engineering semesters, DDCET top ranks, and live industry project internships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {engineeringPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between scroll-mt-28 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider bg-blue-50 text-[#1C2E60] px-3.5 py-1.5 rounded-full border border-blue-100">
                      {pillar.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#1C2E60]/5 text-[#1C2E60] group-hover:bg-[#1C2E60] group-hover:text-white transition-all flex items-center justify-center text-xl shadow-xs">
                      <Icon />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#1C2E60] mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-bold text-[#DC2626] mb-3">
                    {pillar.tagline}
                  </div>
                  <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {pillar.desc}
                  </p>

                  {/* Branches Pill List */}
                  <div className="mb-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                      Branches & Streams Covered:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.branches.map((b, i) => (
                        <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    {pillar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <FiCheckCircle className="text-green-600 mt-0.5 flex-shrink-0 text-sm" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#engineering-inquiry"
                    onClick={() => setFormData(prev => ({ ...prev, program: pillar.title }))}
                    className="bg-[#1C2E60] hover:bg-blue-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Inquire for {pillar.title.split(' ')[0]}</span>
                    <FiArrowRight />
                  </a>
                  <a
                    href="tel:9638256222"
                    className="text-xs font-bold text-slate-500 hover:text-[#DC2626] transition-colors flex items-center gap-1"
                  >
                    <FiPhone /> Call Faculty
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DDCET SPECIAL CRACKER SECTION */}
      <section className="py-16 bg-gradient-to-r from-[#0A1E3D] via-[#1C2E60] to-[#0A1E3D] text-white relative overflow-hidden my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-black tracking-widest text-[#EF4444] uppercase bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block">
                ★ Guaranteed DDCET Lateral Entry Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Secure Direct 2nd Year Degree Admission into Top Gujarat Colleges
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                DDCET is the single gateway to LD College of Engineering, BVM, VGEC, MSU, and DDU. Noble Engineering runs the most rigorous, result-proven DDCET program in Vadodara with dedicated science, mathematics, and technical faculty.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: "15 OMR Mock Tests", desc: "Real exam simulation" },
                  { label: "300+ DPP Sets", desc: "Chapter-wise mastery" },
                  { label: "Shortcuts & Tricks", desc: "Formula book included" },
                  { label: "ACPC Choice Filling", desc: "1-on-1 merit strategy" },
                  { label: "Maths + Science + Tech", desc: "Complete syllabus prep" },
                  { label: "Weekend Batches", desc: "College-friendly timings" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-2xl">
                    <div className="text-xs font-extrabold text-white">{item.label}</div>
                    <div className="text-[10px] text-blue-200/80 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#engineering-inquiry"
                  onClick={() => setFormData(prev => ({ ...prev, program: 'DDCET Entrance Coaching' }))}
                  className="bg-[#DC2626] hover:bg-red-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 transition-all"
                >
                  Join DDCET 2026 Batch 🚀
                </a>
                <a
                  href="https://wa.me/919638256222?text=Hi%20Noble%20Education,%20I%20want%20details%20about%20DDCET%20coaching%20and%20batch%20timings."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs transition-all flex items-center gap-2"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* DDCET Syllabus Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-2xl">
                <h3 className="text-lg font-black text-white border-b border-white/20 pb-3 flex items-center justify-between">
                  <span>DDCET Exam Blueprint</span>
                  <span className="text-xs text-red-300 font-bold">100 Marks MCQ</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-extrabold text-blue-300">Part A: Basic Sciences & Applied Mathematics</div>
                    <div className="text-[11px] text-slate-300 mt-1">Calculus, Matrices, Trigonometry, Vectors, Units & Measurements, Electricity, Chemical Bonding.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-extrabold text-red-300">Part B: Common Engineering Fundamentals</div>
                    <div className="text-[11px] text-slate-300 mt-1">Engineering Mechanics, Basic Electrical, Basic Electronics, Computer Programming Basics, Engineering Drawing.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-extrabold text-emerald-300">Part C: Branch Specific Core Knowledge</div>
                    <div className="text-[11px] text-slate-300 mt-1">Mechanical / Civil / Electrical / Computer specific domain questions as per ACPC Gujarat guidelines.</div>
                  </div>
                </div>
                <div className="text-[11px] text-center text-blue-200/90 pt-2 font-medium">
                  ⭐ Over 90% questions in DDCET match our in-house mock series!
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STUDENT ACHIEVERS / TESTIMONIALS */}
      <section id="achievers" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            Real Student Results
          </span>
          <h2 className="text-3xl font-black text-[#1C2E60] mt-3">
            Our Engineering & DDCET Rankers
          </h2>
          <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2">
            Top scores from diploma semester exams and high percentiles in DDCET Gujarat lateral entry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicAchievers.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all text-center flex flex-col justify-between"
            >
              <div>
                <img
                  src={getEmbedImageUrl(item.image)}
                  alt={item.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-100 mb-4 shadow-sm"
                  onError={handleImageError}
                />
                <h4 className="text-base font-extrabold text-[#1C2E60]">{item.name}</h4>
                <div className="text-xs font-bold text-[#DC2626] mt-0.5">{item.exam}</div>
                <div className="text-2xl font-black text-[#1C2E60] my-2">{item.score}</div>
                <div className="text-xs font-medium text-slate-500">{item.branch}</div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 bg-emerald-50 py-1.5 px-2 rounded-xl">
                {item.college}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5B. DYNAMIC PAGE PHOTOS & VIDEOS SHOWCASE (MANAGED FROM ADMIN PANEL) */}
      {pageMedia && pageMedia.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              Campus & Labs Showcase
            </span>
            <h2 className="text-3xl font-black text-[#1C2E60] mt-3">
              Engineering Labs & Practical Sessions
            </h2>
            <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2">
              State-of-the-art computer labs, CAD workstations, and classroom test hall facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageMedia.map((m, idx) => {
              const isVid = m.mediaType === 'video' || m.videoUrl || isVideoMedia(m);
              return (
                <div
                  key={m.id || idx}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div
                    className="relative h-48 sm:h-52 bg-slate-900 overflow-hidden cursor-pointer"
                    onClick={() => {
                      if (isVid && m.videoUrl) {
                        setActiveVideo({
                          url: m.videoUrl,
                          title: m.title || 'Engineering Video Tour'
                        });
                      }
                    }}
                  >
                    <img
                      src={getEmbedImageUrl(m.image || m.url || '/images/hero-engineering.png')}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={handleImageError}
                    />
                    {isVid && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                          <FiPlay className="text-xl ml-0.5" />
                        </div>
                      </div>
                    )}
                    {m.category && (
                      <span className="absolute top-3 left-3 bg-[#1C2E60]/85 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                        {m.category}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-[#1C2E60] leading-snug">{m.title}</h4>
                    {m.desc && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{m.desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. DEDICATED ENGINEERING ADMISSION INQUIRY FORM */}
      <section id="engineering-inquiry" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              Admissions 2026-27 Open
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
              Inquire for Noble Engineering Batches
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-2 font-light">
              Fill out the form below to receive syllabus roadmaps, batch timings, fee structures, and free demo lecture schedules.
            </p>
          </div>

          {formSent ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-3 animate-fade-in">
              <FiCheckCircle className="text-4xl text-emerald-600 mx-auto" />
              <h3 className="text-xl font-black">Inquiry Submitted Successfully!</h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Thank you! Our engineering academic coordinator will call you within 2 hours with syllabus details, timetable, and batch allocation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#1C2E60] focus:bg-white focus:border-[#1C2E60] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#1C2E60] focus:bg-white focus:border-[#1C2E60] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Program Interested
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#1C2E60] focus:bg-white focus:border-[#1C2E60] outline-none transition-all"
                  >
                    <option>DDCET Entrance Coaching</option>
                    <option>Diploma Engineering Coaching</option>
                    <option>Degree Engineering (B.E./B.Tech)</option>
                    <option>Industrial Internship & Projects</option>
                    <option>Engineering Mathematics Module</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Engineering Branch
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#1C2E60] focus:bg-white focus:border-[#1C2E60] outline-none transition-all"
                  >
                    <option>Computer / IT Engineering</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil Engineering</option>
                    <option>Electrical Engineering</option>
                    <option>Automobile Engineering</option>
                    <option>EC Engineering</option>
                    <option>Other / Dual Specialization</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Semester / Year
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#1C2E60] focus:bg-white focus:border-[#1C2E60] outline-none transition-all"
                  >
                    <option>Semester 1 / 2</option>
                    <option>Semester 3 / 4</option>
                    <option>Semester 5 / 6 (DDCET Target)</option>
                    <option>Degree 1st Year (Maths-1 & 2)</option>
                    <option>Degree 2nd / 3rd Year</option>
                    <option>Backlog / Remedial Batch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specific Subjects or Query (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your college, syllabus, backlog subjects, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#1C2E60] focus:bg-white focus:border-[#1C2E60] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C2E60] hover:bg-blue-900 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiSend /> Submit Engineering Admission Inquiry
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-green-600">✔</span> Free Demo Lecture Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-600">✔</span> Personal Doubt Clearing Desk
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-600">✔</span> Central Waghodia Road Campus
            </span>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#DC2626] font-bold tracking-widest text-xs uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            Got Questions?
          </span>
          <h2 className="text-3xl font-black text-[#1C2E60] mt-3">
            Engineering & DDCET FAQs
          </h2>
          <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2">
            Clear answers regarding batch timings, GTU curriculum, DDCET mock tests, and internship projects.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-extrabold text-sm text-[#1C2E60] hover:text-[#DC2626] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg text-slate-400 font-light">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-zinc-600 font-light leading-relaxed border-t border-slate-100 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Universal Video Modal for Engineering Lecture Demos */}
      <UniversalVideoModal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.videoUrl}
        title={activeVideo?.title || 'Engineering Demo Lecture'}
        aspectRatio={activeVideo?.aspectRatio || '16/9'}
      />

    </div>
  );
}
