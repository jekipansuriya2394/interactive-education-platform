import React, { useState } from 'react';
import { FiCheckCircle, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiSend, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../data/contactData';
import { inquiryService } from '../utils/inquiryService';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    studentClass: '10th Standard',
    board: 'GSEB (Gujarat Board)',
    program: 'Board + Foundation',
    parentMobile: '',
    whatsapp: '',
    preferredBatch: 'Morning Batch (7:30 AM - 11:30 AM)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await inquiryService.submitInquiry({
        name: formData.name,
        phone: formData.parentMobile,
        email: '',
        course: `${formData.program} (${formData.studentClass} - ${formData.board})`,
        message: `Preferred Batch: ${formData.preferredBatch}. WhatsApp: ${formData.whatsapp}. Notes: ${formData.message || 'Admission inquiry from website'}`
      });
      setSubmitted(true);
      setFormData({
        name: '',
        studentClass: '10th Standard',
        board: 'GSEB (Gujarat Board)',
        program: 'Board + Foundation',
        parentMobile: '',
        whatsapp: '',
        preferredBatch: 'Morning Batch (7:30 AM - 11:30 AM)',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Enquire',
      desc: 'Submit student details online or connect with our academic counseling desk.'
    },
    {
      num: '02',
      title: 'Counselling',
      desc: 'One-on-one session with educators to understand academic goals, strengths, and requirements.'
    },
    {
      num: '03',
      title: 'Choose Your Program',
      desc: 'Select the optimal academic stream, competitive batch (JEE/NEET/Foundation), and batch schedule.'
    },
    {
      num: '04',
      title: 'Start Learning',
      desc: 'Join batch orientations, collect study modules, and begin your Noble learning journey.'
    }
  ];

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Admissions Open • 2026-2027 Academic Session
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Admissions at <span className="text-[#ED1C24]">Noble Education</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Integrated education from 8th to 12th, Foundation, GSEB, CBSE, JEE, NEET, Diploma, Degree, and DDCET in Vadodara.
          </p>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Simple & Transparent</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Our 4-Step Admission Journey</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:border-[#ED1C24]/50 transition-all">
              <span className="text-3xl font-black text-[#ED1C24]/30 group-hover:text-[#ED1C24] transition-colors block mb-3">
                {s.num}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Admission Enquiry Form & Center Details */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#0F1626] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Apply Online</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Submit Admission Enquiry</h2>
              <p className="text-xs text-slate-400 mt-1">Our academic counselors will get back to you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <FiCheckCircle />
                </div>
                <h3 className="text-xl font-bold text-white">Enquiry Received Successfully!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to Noble Education. Our counseling desk has received your request and will contact your mobile number shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter student's name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Current Standard / Class *</label>
                    <select
                      value={formData.studentClass}
                      onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                      className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
                    >
                      <option value="8th Standard">8th Standard</option>
                      <option value="9th Standard">9th Standard</option>
                      <option value="10th Standard">10th Standard (Board)</option>
                      <option value="11th Science">11th Science</option>
                      <option value="12th Science">12th Science (Board + Entrance)</option>
                      <option value="Diploma Engineering">Diploma Engineering</option>
                      <option value="Degree Engineering">Degree Engineering</option>
                      <option value="DDCET Coaching">DDCET Lateral Entry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Board / Stream *</label>
                    <select
                      value={formData.board}
                      onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                      className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
                    >
                      <option value="GSEB (Gujarat Board)">GSEB (Gujarat Board)</option>
                      <option value="CBSE">CBSE Board</option>
                      <option value="GTU / Technical">GTU / Technical University</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Parent Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.parentMobile}
                      onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })}
                      placeholder="e.g. 91042 06999"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="WhatsApp contact number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Program Interested *</label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
                    >
                      <option value="GSEB School Academic">GSEB School Academic</option>
                      <option value="CBSE School Academic">CBSE School Academic</option>
                      <option value="Foundation (8th-10th)">Foundation (8th-10th)</option>
                      <option value="11th-12th Science Board">11th-12th Science Board</option>
                      <option value="JEE Main & Advanced">JEE Main & Advanced</option>
                      <option value="NEET Medical Entrance">NEET Medical Entrance</option>
                      <option value="DDCET Coaching">DDCET Coaching</option>
                      <option value="Diploma Coaching">Diploma Coaching</option>
                      <option value="Degree Engineering">Degree Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Preferred Batch Schedule</label>
                    <select
                      value={formData.preferredBatch}
                      onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                      className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
                    >
                      <option value="Morning Batch (7:30 AM - 11:30 AM)">Morning Batch (7:30 AM - 11:30 AM)</option>
                      <option value="Afternoon Batch (2:00 PM - 5:30 PM)">Afternoon Batch (2:00 PM - 5:30 PM)</option>
                      <option value="Evening Batch (5:30 PM - 8:30 PM)">Evening Batch (5:30 PM - 8:30 PM)</option>
                      <option value="Integrated School Batch">Integrated School Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Message or Specific Requirements</label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about student's target exams or questions..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(237,28,36,0.4)] hover:shadow-[0_0_30px_rgba(237,28,36,0.6)] flex items-center justify-center gap-2"
                >
                  <FiSend />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Direct Help (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-8 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Direct Counseling Helpline</span>
              <h3 className="text-2xl font-bold text-white">Talk with Our Academic Director</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefer to discuss admissions in person or over a quick phone call? Reach our campus team directly:
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <a 
                  href={`tel:${contactData.phone1}`} 
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center text-base">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Primary Helpline</span>
                    <span className="text-sm font-bold text-white">{contactData.phone1}</span>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent('Hello Noble Education, I would like to schedule an admission counseling session.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-colors text-green-400"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-lg">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest block">Chat on WhatsApp</span>
                    <span className="text-sm font-bold text-white">Quick Response Desk</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-base mt-0.5">
                    <FiMapPin />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Campus Address</span>
                    <span className="text-xs font-semibold text-slate-200 block mt-0.5">
                      Above Bank Of India, 3rd Floor, Near Uma Char Rasta, Waghodia Road, Vadodara – 390019
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-base mt-0.5">
                    <FiClock />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Counseling Hours</span>
                    <span className="text-xs text-slate-200 block mt-0.5">
                      Monday to Saturday: 8:00 AM – 8:30 PM (Sunday by Appointment)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust note */}
            <div className="bg-[#ED1C24]/10 border border-[#ED1C24]/20 rounded-2xl p-6 text-xs text-slate-300">
              <span className="font-bold text-white block mb-1">Concepts First. Strong Foundations. Better Results.</span>
              Every student gets individual diagnostic counseling to evaluate conceptual standing and design an optimized batch schedule.
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
