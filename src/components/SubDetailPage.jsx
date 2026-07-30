import React from 'react';
import { FiBook, FiCheck, FiCpu, FiCompass, FiShield, FiTrendingUp, FiAward, FiSettings, FiLayers, FiActivity, FiMap } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function SubDetailPage() {
  const path = window.location.pathname;

  // Custom data dict for sitemap sub-pages
  const detailData = {
    // Courses subpages
    '/courses/8th-10th-coaching': {
      title: "8th to 10th Standard Coaching",
      category: "Schooling Foundation",
      icon: <FiBook />,
      tagline: "Building a Solid Academic Core",
      desc: "Comprehensive coaching for students from 8th to 10th standard in Vadodara. Focuses on core concept building, school exams, and board preparation.",
      subjects: ["Mathematics", "Science & Technology", "English Grammar", "Social Studies"],
      benefits: [
        "Rigorous classroom explanations with simple board work templates.",
        "Constant chapter-wise tests and performance logs for parents.",
        "Dedicated homework help and in-person doubt resolution desks.",
        "Interactive OMR-style sheet practice to build foundation skills."
      ],
      timing: "Daily batches: 5:00 PM - 7:30 PM (Offline & Online)"
    },
    '/courses/11th-12th-science': {
      title: "11th & 12th Science Coaching",
      category: "Board Preparation",
      icon: <FiBook />,
      tagline: "Excellence in Science stream",
      desc: "Detailed semester support and board exam preparation for high school science stream students.",
      subjects: ["Physics (Calculations & Theory)", "Chemistry (Organic & Inorganic)", "Mathematics (Calculations & Algebra)", "Biology (Syllabus & Diagram structures)"],
      benefits: [
        "In-depth concept notes and previous board paper solutions.",
        "Optimized batch sizes for personal faculty attention.",
        "Rigorous mock tests simulating Gujarat board patterns."
      ],
      timing: "Batches: 8:00 AM - 11:30 AM & 4:00 PM - 7:30 PM"
    },
    '/courses/neet-coaching': {
      title: "NEET Entrance Exam Coaching",
      category: "Medical Entrance Prep",
      icon: <FiShield />,
      tagline: "Targeting Medical placements",
      desc: "Specialized preparation for medical college admissions through NEET. Focuses on intensive question solving.",
      subjects: ["Physics for NEET", "Chemistry for NEET", "Biology (Botany & Zoology)"],
      benefits: [
        "Exhaustive test papers mapping exactly to NEET specifications.",
        "Concept shortcut sheets to tackle calculations under time limits.",
        "Parent-student counselling to review cutoff marks and government seats."
      ],
      timing: "Dedicated batches: 9:00 AM - 1:00 PM"
    },
    '/courses/jee-coaching': {
      title: "JEE Main Exam Coaching",
      category: "Engineering Entrance Prep",
      icon: <FiTrendingUp />,
      tagline: "IIT & NIT Placement maps",
      desc: "Targeted competitive coaching for students targeting direct degree placements in IITs, NITs, and national engineering colleges.",
      subjects: ["Physics (Advanced mechanics & units)", "Chemistry (Reaction maps & units)", "Mathematics (Advanced calculus & geometry)"],
      benefits: [
        "Speed mock series with negative marking evaluations.",
        "Weekly formula revision registers and logic workshops."
      ],
      timing: "Batches: 2:00 PM - 6:00 PM"
    },
    '/courses/gujcet-coaching': {
      title: "GUJCET Prep Coaching",
      category: "State Level Entrance Prep",
      icon: <FiAward />,
      tagline: "Gujarat Engineering Placement",
      desc: "Detailed coaching mapping exactly to the GUJCET guidelines for state board admissions.",
      subjects: ["Physics", "Chemistry", "Mathematics / Biology option"],
      benefits: [
        "Syllabus completion aligned to GSEB boards.",
        "Timed practice questions and standard mock files."
      ],
      timing: "Batches: 12:00 PM - 3:00 PM"
    },

    // Diploma subpages
    '/diploma/computer-engineering': {
      title: "Diploma Computer Engineering Coaching",
      category: "Diploma Engineering",
      icon: <FiCpu />,
      tagline: "Programming and Systems Mastery",
      desc: "Semester-wise subject coaching for Computer Engineering diploma students. Covers coding and university files.",
      subjects: ["C / C++ Programming", "Java / Python Programming", "Data Structures & Database Management", "Operating Systems & Shell scripting"],
      benefits: [
        "Practical coding sessions inside Waghodia center.",
        "GTU question papers practice and key notes.",
        "Final-year project code development and document templates support."
      ],
      timing: "Semester batches: 4:30 PM - 7:30 PM"
    },
    '/diploma/it-engineering': {
      title: "Diploma Information Technology Coaching",
      category: "Diploma Engineering",
      icon: <FiCpu />,
      tagline: "Software and Network Engineering",
      desc: "Syllabus support and guidance for Information Technology diploma branches.",
      subjects: ["Web Technology (HTML, CSS, JS)", "Software Engineering Concepts", "Computer Networks & Security", "Mobile App Development"],
      benefits: [
        "Practical templates for web database connectivity.",
        "Clear concept lectures on algorithms and logic.",
        "Placement training support and mock technical rounds."
      ],
      timing: "Semester batches: 4:30 PM - 7:30 PM"
    },
    '/diploma/mechanical-engineering': {
      title: "Diploma Mechanical Engineering Coaching",
      category: "Diploma Engineering",
      icon: <FiSettings />,
      tagline: "Thermodynamics and CAD design",
      desc: "Subject coaching for mechanical branch diploma students.",
      subjects: ["Engineering Drawing & CAD", "Thermodynamics & Thermal engineering", "Strength of Materials", "Manufacturing Processes"],
      benefits: [
        "Step-by-step drawing sheet guidelines.",
        "Solving complex mechanical equation papers."
      ],
      timing: "Semester batches: 5:00 PM - 7:00 PM"
    },
    '/diploma/civil-engineering': {
      title: "Diploma Civil Engineering Coaching",
      category: "Diploma Engineering",
      icon: <FiLayers />,
      tagline: "Structures and Surveying",
      desc: "Structural and surveying subject support for civil engineering students.",
      subjects: ["Structural Mechanics", "Surveying & Building drawing", "Concrete Tech & Soil mechanics"],
      benefits: [
        "Syllabus concept clearings on structural formulas.",
        "GTU paper solving registers."
      ],
      timing: "Semester batches: 5:00 PM - 7:00 PM"
    },
    '/diploma/electrical-engineering': {
      title: "Diploma Electrical Engineering Coaching",
      category: "Diploma Engineering",
      icon: <FiCpu />,
      tagline: "Machines and Power Systems",
      desc: "Coaching for electrical branch subjects and circuit calculations.",
      subjects: ["AC / DC Machines", "Circuit Analysis & Networks", "Electrical Power Systems", "Microcontrollers & Automation"],
      benefits: [
        "Clear calculation methods for circuit equations.",
        "Practical guidance on wiring layouts and components."
      ],
      timing: "Semester batches: 4:30 PM - 6:30 PM"
    },
    '/diploma/chemical-engineering': {
      title: "Diploma Chemical Engineering Coaching",
      category: "Diploma Engineering",
      icon: <FiActivity />,
      tagline: "Process operations and mass transfer",
      desc: "Subject coaching for chemical branch diploma students in Vadodara.",
      subjects: ["Unit Operations & Industrial Chemistry", "Stoichiometry & Process calculations", "Heat & Mass Transfer operations"],
      benefits: [
        "Detailed guides on unit calculation variables.",
        "University question bank evaluations."
      ],
      timing: "Semester batches: 5:00 PM - 7:00 PM"
    },

    // DDCET subpages
    '/ddcet/admission-updates': {
      title: "DDCET Admission Updates & Cutoffs",
      category: "D2D Updates",
      icon: <FiShield />,
      tagline: "Merit lists and dates updates",
      desc: "Check real-time timeline announcements regarding registration dates, DDCET mock test updates, and ACPC notifications.",
      subjects: ["ACPDC Registration timeline", "DDCET key dates updates", "Government college merit criteria"],
      benefits: [
        "Get instant notifications inside Noble WhatsApp channels.",
        "Step-by-step guidance on scanning documents and filling ACPC details."
      ],
      timing: "Regular counseling updates via WhatsApp (Free for enrolled students)"
    },
    '/ddcet/choice-filling': {
      title: "Choice Filling Guidance for D2D",
      category: "D2D Counseling",
      icon: <FiCompass />,
      tagline: "Securing the Best College",
      desc: "Choice-filling is the most critical part of ACPDC degree admissions. We analyze your DDCET merit to build optimal options lists.",
      subjects: ["Govt vs SFI college choice comparison", "Branch selection priority models", "Mock round choice adjustments"],
      benefits: [
        "Custom college choice list designed by our principal advisor.",
        "Cutoff mapping to guarantee seat allotments."
      ],
      timing: "Mock sessions scheduled in-center after DDCET results"
    },
    '/ddcet/diploma-to-degree': {
      title: "Diploma to Degree Guidance",
      category: "D2D Roadmap",
      icon: <FiTrendingUp />,
      tagline: "Smooth Transition to Engineering Degree",
      desc: "Full roadmap mapping semester transition details, credits transfer, and academic scope from diploma to degree engineering.",
      subjects: ["Direct 2nd year curriculum guides", "Bridge subject calculation support", "Career paths after degree engineering"],
      benefits: [
        "In-depth parent update seminars resolving transition scope.",
        "Mock lectures on degree engineering mathematics."
      ],
      timing: "Counselling bookings open daily: 10:00 AM - 6:00 PM"
    },

    // Career subpages
    '/career/after-10th': {
      title: "Career Guidance After 10th Standard",
      category: "Career Planning",
      icon: <FiCompass />,
      tagline: "Stream Mapping",
      desc: "Pathfinding options for standard school students confused about choosing between science boards, general stream, or diploma routes.",
      subjects: ["Science (PCM/PCB) vs Diploma vs General stream", "Interests mapping check", "Future job scope comparisons"],
      benefits: [
        "One-to-one discussions with student and parents.",
        "Clarity on GTU diploma paths and branch cutoff structures."
      ],
      timing: "Counselling duration: 45 mins (Pre-booking required)"
    },
    '/career/diploma-admission': {
      title: "Diploma Admission Guidance",
      category: "Career Planning",
      icon: <FiMap />,
      tagline: "ACPDC Admission Help",
      desc: "Complete help on registering for diploma courses, branch cutoff analysis, and standard college options in Vadodara.",
      subjects: ["ACPD cutoff tables", "Waghodia Road vs other college lists", "Form registration checklists"],
      benefits: [
        "Step-by-step assistance through ACPDC website submissions.",
        "Branch cutoff analysis to optimize choices."
      ],
      timing: "Daily sessions during ACPDC rounds"
    },
    '/career/branch-selection': {
      title: "Engineering Branch Selection Guidance",
      category: "Career Planning",
      icon: <FiTrendingUp />,
      tagline: "Identifying Your Engineering Strength",
      desc: "Exhaustive details comparing Computer, IT, Mechanical, Civil, Chemical, and Electrical branch subjects, work cultures, and job scope.",
      subjects: ["IT/Computer vs Core branches comparison", "Syllabus complexity overview", "Placements and job profiles"],
      benefits: [
        "Avoid path mistakes by resolving branch interest details.",
        "Parent alignment on cost, placements, and government job scopes."
      ],
      timing: "Guidance bookings open daily"
    }
  };

  const data = detailData[path] || {
    title: "Page Under Construction",
    category: "Information",
    icon: <FiBook />,
    tagline: "Sitemap Details",
    desc: "We are currently detailing this sub-page. Please check back or submit an inquiry to get immediate details.",
    subjects: ["Batch details", "Fees updates", "Syllabus mapping"],
    benefits: ["Direct coaching answers via our Waghodia Road center."],
    timing: "Contact: 9104206999"
  };

  return (
    <div className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="text-zinc-500 hover:text-red-500 text-xs font-semibold uppercase tracking-wider mb-8 transition-colors"
        >
          ← Back to previous view
        </button>

        {/* Hero Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-600/20 relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-red-600" />
          
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase bg-red-600/10 px-3 py-1.5 rounded-full border border-red-600/20">
              {data.category}
            </span>
            <div className="text-3xl text-red-500 p-2.5 bg-red-600/5 border border-red-600/10 rounded-xl">
              {data.icon}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            {data.title}
          </h1>
          <p className="text-zinc-400 text-sm font-semibold tracking-wide uppercase mb-6">
            {data.tagline}
          </p>
          <p className="text-zinc-300 font-light leading-relaxed text-base">
            {data.desc}
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Key Topics */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5">
            <h3 className="text-white font-extrabold text-lg mb-6">Syllabus & Core Modules</h3>
            <div className="space-y-4">
              {data.subjects.map((sub, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-600/10 border border-red-600/30 flex items-center justify-center text-xs font-bold text-red-500 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-zinc-300 text-sm font-light">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5">
            <h3 className="text-white font-extrabold text-lg mb-6">What You Get At Noble</h3>
            <div className="space-y-4">
              {data.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FiCheck className="text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">{ben}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Batch Timing Info card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 text-center sm:text-left">
          <div>
            <h5 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-1">Batch Schedule</h5>
            <p className="text-white text-sm font-semibold">{data.timing}</p>
          </div>
          <button
            onClick={() => navigate('/contact#inquiry')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-md"
          >
            Enquire For Admission
          </button>
        </div>

      </section>
    </div>
  );
}
