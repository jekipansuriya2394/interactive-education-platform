import React, { useState, useEffect } from 'react';
import { FiPhone, FiMapPin, FiClock, FiMail, FiExternalLink, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../data/contactData';
import { adminData } from '../utils/adminData';
import { inquiryService } from '../utils/inquiryService';

export default function Contact() {
  const [contact, setContact] = useState(() => adminData.getData('contactInfo') || contactData);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: 'School Academic Coaching (8th-10th)',
    message: ''
  });

  useEffect(() => {
    const refreshContact = () => {
      setContact(adminData.getData('contactInfo') || contactData);
    };
    refreshContact();
    const cleanup = adminData.initSync(refreshContact);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await inquiryService.submitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: '',
        course: formData.program,
        message: formData.message || 'Inquiry from Contact Page'
      });
      setFormSent(true);
      setFormData({ name: '', phone: '', program: 'School Academic Coaching (8th-10th)', message: '' });
      setTimeout(() => setFormSent(false), 5000);
    } catch (err) {
      console.error('Contact form submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleMapsUrl = contact.googleMapsUrl || "https://maps.google.com/?q=NOBLE+EDUCATION+Above+Bank+Of+India+Waghodia+Road+Vadodara";

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen font-sans pt-24 pb-20">
      {/* Hero Header */}
      <section className="py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ED1C24]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Connect with Noble Education
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Let's Start Your <span className="text-[#ED1C24]">Academic Journey</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Visit our center in Vadodara, speak with our academic counseling team, or submit an admission inquiry online.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Details & Interactive Map (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Direct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <a 
                href={`tel:${contact.phone1 || '9104206999'}`}
                className="bg-[#0F1626] border border-slate-800 rounded-2xl p-5 hover:border-[#ED1C24]/50 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FiPhone />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#ED1C24] uppercase tracking-widest block">Direct Call</span>
                  <span className="text-sm font-bold text-white block mt-0.5">{contact.phone1 || '9104206999'}</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">{contact.phone2 || '9104206888'}</span>
                </div>
              </a>

              <a 
                href={`https://wa.me/${contact.whatsapp || '919104206999'}?text=${encodeURIComponent('Hello Noble Education, I would like to inquire about academic programs.')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0F1626] border border-slate-800 rounded-2xl p-5 hover:border-green-500/50 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaWhatsapp />
                </div>
                <div>
                  <span className="text-[10px] font-black text-green-400 uppercase tracking-widest block">WhatsApp Desk</span>
                  <span className="text-sm font-bold text-white block mt-0.5">Chat Instantly</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">Quick counseling response</span>
                </div>
              </a>
            </div>

            {/* Address & Office Hours */}
            <div className="bg-[#0F1626] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#ED1C24] flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                  <FiMapPin />
                </div>
                <div>
                  <span className="text-[11px] font-black text-[#ED1C24] uppercase tracking-widest block">Verified Center Address</span>
                  <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                    Noble Education<br />
                    Above Bank Of India, 3rd Floor<br />
                    Near Uma Char Rasta, Waghodia Road<br />
                    Vadodara, Gujarat – 390019
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1C24] hover:underline mt-2"
                  >
                    <span>Get Directions on Google Maps</span>
                    <FiExternalLink />
                  </a>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                  <FiClock />
                </div>
                <div>
                  <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest block">Center & Visiting Hours</span>
                  <p className="text-xs text-slate-300 mt-1">
                    Monday to Saturday: <strong className="text-white">8:00 AM – 8:30 PM</strong><br />
                    Sunday: <strong className="text-white">By Special Appointment</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps View */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl h-72">
              <iframe
                title="Noble Education Center Map"
                src={contact.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.350070758773!2d73.22714197532522!3d22.302596542812175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc57f8b719dd5%3A0x8bf184b31ada46e0!2sNOBLE%20EDUCATION!5e0!3m2!1sen!2sin!4v1784185468234!5m2!1sen!2sin"}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* Right: Quick Counseling Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#0F1626] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">Message Us</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Book a Center Visit</h2>
              <p className="text-xs text-slate-400 mt-1">Fill this quick form and our counselor will call you.</p>
            </div>

            {formSent ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
                <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <FiCheckCircle />
                </div>
                <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-300">Our academic counseling team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter parent or student name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Program of Interest *</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
                  >
                    <option value="School Academic Coaching (8th-10th)">School Academic Coaching (8th-10th)</option>
                    <option value="11th Science Base">11th Science Base</option>
                    <option value="12th Science Board">12th Science Board</option>
                    <option value="JEE Main & Advanced">JEE Main & Advanced</option>
                    <option value="NEET Medical Preparation">NEET Medical Preparation</option>
                    <option value="DDCET Coaching">DDCET Coaching</option>
                    <option value="Diploma Coaching">Diploma Coaching</option>
                    <option value="Degree Engineering Support">Degree Engineering Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">Message or Target Exam</label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any specific questions regarding admissions or timings..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(237,28,36,0.4)] flex items-center justify-center gap-2"
                >
                  <FiSend />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
