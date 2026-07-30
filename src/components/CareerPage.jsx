import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiTrendingUp, FiLayers, FiCompass, FiMap, FiAward, FiUsers } from 'react-icons/fi';
import { navigate } from '../utils/router';

export default function CareerPage() {
  const guidanceAreas = [
    { title: "After 10th Guidance", icon: <FiCompass />, desc: "Clear stream mapping (Science vs Commerce vs Diploma) based on interest parameters." },
    { title: "Diploma Admission Guidance", icon: <FiLayers />, desc: "Help through the ACPDC registration, cutoff analysis, and standard college options." },
    { title: "Science Stream Guidance", icon: <FiAward />, desc: "Subject combination guides (Group A vs Group B vs Group AB) for board success." },
    { title: "Branch Selection Guidance", icon: <FiTrendingUp />, desc: "Deep dive into Computer, IT, Mechanical, Civil, Chemical, Electrical and other branches' scope." },
    { title: "DDCET Guidance", icon: <FiUser />, desc: "Entrance test planning, syllabus updates, and merit-wise choice-filling guidelines." },
    { title: "Career Planning", icon: <FiMap />, desc: "Long-term mapping from standard schooling to direct professional jobs." },
    { title: "Parent Counseling", icon: <FiUsers />, desc: "Addressing parents' worries about safety, budgets, cutoffs, and future branch security." }
  ];

  const steps = [
    { num: "01", title: "Student Discussion", desc: "Understanding the student's natural interests, fears, and basic academic history." },
    { num: "02", title: "Interest Mapping", desc: "Evaluating domain fits (practical drawing, coding logic, calculations, biology core)." },
    { num: "03", title: "Academic Check", desc: "Assessing standard math/science scores and mock performance indicators." },
    { num: "04", title: "Course Explanation", desc: "Providing exhaustive details about courses, syllabus, and college durations." },
    { num: "05", title: "Parent Counseling", desc: "Addressing parents' concerns regarding cutoffs, costs, safety, and placements." },
    { num: "06", title: "Final Roadmap", desc: "Drawing a timeline for coaching batches, DDCET targets, and choice fillings." }
  ];

  return (
    <div id="career" className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Career Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Career Mapping</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Confused After 10th? <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Get Career Guidance</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Choose the right course, branch, and career path with expert counseling in Vadodara.
          </p>
        </motion.div>
      </section>

      {/* Common Confusions & Parent Concerns */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Confusions Box */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5">
            <h3 className="text-white font-extrabold text-2xl mb-6">Common Confusion after 10th Standard</h3>
            <p className="text-zinc-300 font-light leading-relaxed mb-6">
              Many students select streams based purely on peer pressure, missing out on matching subjects to their organic strengths. Choosing wrong paths creates initial stress and semester backlogs.
            </p>
            <div className="space-y-4 text-sm font-light text-zinc-400">
              <p>• Confusion between choosing 11th Science vs Diploma Engineering.</p>
              <p>• Fearing branch selections without understanding engineering subjects.</p>
              <p>• Not knowing the DDCET pathway leading from diploma to degree colleges.</p>
            </div>
          </div>

          {/* Parent Worries Box */}
          <div className="glass-panel p-8 rounded-3xl border border-red-600/10">
            <h3 className="text-white font-extrabold text-2xl mb-6">Parent Concerns & Placements</h3>
            <p className="text-zinc-300 font-light leading-relaxed mb-6">
              Parents worry about career security, college rankings, admission cutoffs, and whether their child requires physical coaching or online study portals.
            </p>
            <div className="space-y-4 text-sm font-light text-zinc-400">
              <p>• Fearing wrong choice-fillings that waste years of hard work.</p>
              <p>• Demanding personal feedback on test evaluations and syllabus completion.</p>
              <p>• Seeking trustworthy faculty who can support doubt resolution in-person.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Guidance Areas */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Our Counseling Fields
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            Exhaustive counseling templates mapping all options for parents and students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {guidanceAreas.map((area, idx) => (
            <div 
              key={idx}
              id={
                area.title.includes("10th") ? "after-10th-guidance" :
                area.title.includes("Diploma") ? "diploma-admission-guidance" :
                area.title.includes("Science") ? "science-stream-guidance" :
                area.title.includes("Branch") ? "branch-selection-guidance" : undefined
              }
              className="glass-panel p-8 rounded-3xl border border-white/5 hover-glow-red transition-all duration-300 group scroll-mt-24"
            >
              <div className="p-4 bg-red-600/10 rounded-2xl text-red-500 text-2xl w-fit mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {area.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                {area.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Noble Counseling Process */}
      <section id="parent-counseling" className="py-16 bg-[#0D0D0D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Our Step-by-Step Counseling Process
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed">
              We process roadmaps systematically to avoid path confusions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4 hover-glow-red transition-all duration-300"
              >
                <span className="text-2xl font-extrabold text-red-500 leading-none">{step.num}</span>
                <div>
                  <h4 className="text-white font-bold text-base mb-1.5">{step.title}</h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Card */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-red-600/20">
          <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-4">Book One-to-One Career Counseling</h3>
          <p className="text-zinc-400 font-light mb-8 max-w-lg mx-auto">
            Schedule an in-center session with our principal counselor at Uma Char Rasta, Vadodara, and get a personalized path guide.
          </p>
          <button
            onClick={() => navigate('/contact#inquiry')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            Schedule Consultation Today
          </button>
        </div>
      </section>

    </div>
  );
}
