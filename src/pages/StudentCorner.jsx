import React, { useState, useEffect } from 'react';
import { FiLock, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';

export default function StudentCorner() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [studentPhotos, setStudentPhotos] = useState(() => {
    const all = adminData.getData('pageImages') || {};
    return all.studentCorner || [];
  });

  useEffect(() => {
    const refreshPhotos = () => {
      const all = adminData.getData('pageImages') || {};
      setStudentPhotos(all.studentCorner || []);
    };
    refreshPhotos();
    const cleanup = adminData.initSync(refreshPhotos);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const handleFeedback = (e) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  const faqs = [
    { q: "How do I retrieve my online test portal credentials?", a: "Your login credentials (PIN & Password) are shared via SMS upon batch admission. If you have misplaced them, please contact the center coordinator." },
    { q: "Where can I collect physical classroom study materials?", a: "All reference books, booklets, and worksheets can be collected directly from the administration desk at the Waghodia Road campus during office hours." },
    { q: "When are the weekly mock test results published?", a: "Mock test scores and comprehensive performance statistics are uploaded to the online portal within 48 hours of completing the test." }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] bg-dots-pattern text-[#5A6472]">
      
      {/* Hero Header */}
      <section className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-student-hero.png')}')`, backgroundPosition: 'center 60%' }}>
        <div className="absolute inset-0 bg-[#1C2E60]/75 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Academy Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            Student Corner
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Access customized study trackers, check portal answers, and submit classroom feedback.
          </p>
        </div>
      </section>

      {/* Dynamic Page Content Photos: Student Study Environment */}
      {studentPhotos && studentPhotos.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Campus Study Life
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2E60] mt-3">
              Study Lounges & Exam Practice Halls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentPhotos.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={getEmbedImageUrl(item.image || item.url)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.category && (
                    <span className="absolute top-3 left-3 text-[9px] font-extrabold text-white bg-[#1C2E60]/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-[#1C2E60] text-sm mb-1">{item.title}</h3>
                  {item.desc && <p className="text-zinc-500 text-xs font-light leading-relaxed">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Login & FAQs */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Student Login portal card */}
          <div id="login" className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm scroll-mt-24 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <div className="space-y-3 text-left max-w-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-[#1C2E60]">
                  <FiLock className="text-xl" />
                </div>
                <span className="text-xs font-extrabold text-[#1C2E60] uppercase tracking-wider">Online Portal Access</span>
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Student & Parent Login</h3>
              <p className="text-zinc-500 text-xs font-light leading-relaxed">
                Log in using your registered roll number & password to view chapter performance graphs, attendance records, and download GTU syllabus solved papers.
              </p>
            </div>
            <a
              href="https://nobleeducation.org/login"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1C2E60] hover:bg-[#142247] text-white font-extrabold px-6 py-3 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md flex-shrink-0 cursor-pointer whitespace-nowrap"
            >
              Launch Portal →
            </a>
          </div>

          {/* FAQs */}
          <div id="faqs" className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm scroll-mt-24">
            <div className="flex items-center gap-2 mb-6">
              <FiHelpCircle className="text-[#DC2626] text-xl" />
              <h3 className="text-lg font-black text-[#1C2E60]">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-all cursor-pointer"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm">{faq.q}</h4>
                    <span className="text-[#DC2626] font-bold text-lg">{activeFaq === idx ? '−' : '+'}</span>
                  </div>
                  {activeFaq === idx && (
                    <p className="mt-3 text-zinc-500 text-xs font-light leading-relaxed pt-3 border-t border-slate-100">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Feedback Form */}
        <div className="lg:col-span-4">
          <div id="feedback" className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm sticky top-28 scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2">
              <FiMessageSquare className="text-[#DC2626] text-xl" />
              <h3 className="text-lg font-black text-[#1C2E60]">Student Feedback Desk</h3>
            </div>
            
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              We value your inputs. Share continuous feedback about teaching pace, study material clarity, or facility requests.
            </p>

            {feedbackSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
                <span className="text-emerald-600 text-2xl">✓</span>
                <h4 className="font-extrabold text-emerald-900 text-xs uppercase tracking-wider">Feedback Submitted</h4>
                <p className="text-emerald-700 text-[11px] font-light">Thank you! Our center academic team will review your comments promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedback} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-zinc-400 mb-1 tracking-wider">Student Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1C2E60] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-zinc-400 mb-1 tracking-wider">Batch / Standard</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Std 12 Science / Diploma IT"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1C2E60] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-zinc-400 mb-1 tracking-wider">Your Feedback / Suggestion</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1C2E60] font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1C2E60] hover:bg-[#142247] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Send Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
