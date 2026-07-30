import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMapPin, FiMessageCircle, FiCheck, FiSend, FiClock } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    currentClass: '',
    course: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const currentClassOptions = [
    "8th Standard", "9th Standard", "10th Standard",
    "11th Science", "12th Science",
    "Diploma 1st Year", "Diploma 2nd Year", "Diploma 3rd Year",
    "Degree Engineering", "Other"
  ];

  const courseOptions = [
    "School Foundation Coaching (8th-10th)",
    "11th & 12th Science Boards Coaching",
    "NEET / JEE / GUJCET Competitive Prep",
    "Diploma Engineering Branch Coaching",
    "DDCET Entrance Preparation",
    "Career & Branch Selection Guidance",
    "Project & Training Support"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.currentClass || !formData.course) {
      setError('Please fill in all required fields (*).');
      return;
    }
    
    console.log("Contact Page Inquiry Submitted:", formData);
    setSubmitted(true);
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      currentClass: '',
      course: '',
      message: ''
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div id="contact" className="pt-28 pb-20 bg-[#0A0A0A] overflow-hidden text-zinc-300">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Contact Hero */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Connect Now</span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Noble Education</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Get coaching, admission guidance, and career counseling support.
          </p>
        </motion.div>
      </section>

      {/* Direct Info cards */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Phone */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 flex gap-4 hover-glow-red transition-all duration-300">
          <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500 text-2xl h-fit">
            <FiPhone />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Call Numbers</h3>
            <p className="text-zinc-400 text-sm font-light"><a href="tel:9104206999" className="hover:text-white">9104206999</a></p>
            <p className="text-zinc-400 text-sm font-light"><a href="tel:9104206888" className="hover:text-white">9104206888</a></p>
          </div>
        </div>

        {/* Card 2: Address */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 hover-glow-red transition-all duration-300 flex gap-4">
          <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500 text-2xl h-fit">
            <FiMapPin />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Location Center</h3>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Above Bank Of India, 3rd Floor, Near Uma Char Rasta, Waghodia Road, Vadodara, Gujarat 390019
            </p>
          </div>
        </div>

        {/* Card 3: Hours */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 hover-glow-red transition-all duration-300 flex gap-4">
          <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500 text-2xl h-fit">
            <FiClock />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Office Hours</h3>
            <p className="text-zinc-400 text-sm font-light">Mon - Sat: 9:00 AM - 8:00 PM</p>
            <p className="text-zinc-400 text-sm font-light">Sunday: Closed</p>
          </div>
        </div>
      </section>

      {/* Map & Form grid */}
      <section id="inquiry" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Form panel */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden h-full">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-red-600" />
            
            <div className="mb-6">
              <h3 className="text-white font-extrabold text-2xl mb-1">Submit Inquiry Form</h3>
              <p className="text-zinc-400 text-xs font-light">Get custom coaching answers within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-green-600/10 border border-green-600/30 rounded-2xl p-6 text-center text-green-400 flex flex-col items-center justify-center gap-3 py-16">
                <div className="p-3 bg-green-600/20 rounded-full text-3xl">
                  <FiCheck />
                </div>
                <h4 className="font-bold text-lg">Thank You!</h4>
                <p className="text-sm font-light max-w-sm">
                  Your inquiry details have been saved. We will contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-600/10 border border-red-600/30 text-red-500 rounded-xl p-3.5 text-xs font-semibold">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Student Name *</label>
                    <input 
                      type="text" 
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Student full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Parent Name</label>
                    <input 
                      type="text" 
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Parent full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10 digit number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Active email address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Current Class / Branch *</label>
                    <select 
                      name="currentClass"
                      value={formData.currentClass}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-red-600 transition-all"
                      required
                    >
                      <option value="">Select your option...</option>
                      {currentClassOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Course Interested In *</label>
                    <select 
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-red-600 transition-all"
                      required
                    >
                      <option value="">Select program...</option>
                      {courseOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Message / Requirements</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter any queries or schedule parameters..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4"
                >
                  <FiSend /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Maps Iframe */}
        <div className="lg:col-span-5 h-[350px] lg:h-auto">
          <div className="glass-panel p-2 rounded-3xl border border-white/5 h-full overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6888497677134!2d73.238472575069!3d22.289765879695624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!2m2!1d73.2410475!2d22.2897659!5e0!3m2!1sen!2sin!4v1719742410888!5m2!1sen!2sin" 
              className="w-full h-full border-0 rounded-2xl grayscale invert"
              allowFullScreen="" 
              loading="lazy" 
              title="Noble Education Google Map Location"
            />
          </div>
        </div>

      </section>

      {/* WhatsApp CTA bubble */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-green-600/10 flex flex-col items-center">
          <FiMessageCircle className="text-green-500 text-5xl mb-4" />
          <h3 className="text-white font-extrabold text-xl sm:text-2xl mb-2">Connect Instantly on WhatsApp</h3>
          <p className="text-zinc-400 text-sm font-light mb-6">Ask counseling questions directly to our expert desks.</p>
          <a
            href="https://wa.me/919104206999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
          >
            Chat Now
          </a>
        </div>
      </section>

    </div>
  );
}
