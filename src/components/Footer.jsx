import React, { useState, useEffect } from 'react';
import { FiPhone, FiMapPin, FiMessageCircle, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';
import { contactData } from '../data/contactData';
import { adminData } from '../utils/adminData';
import { logoWhite, getLogoUrl } from '../utils/logo';

export default function Footer() {
  const [contact, setContact] = useState(() => adminData.getData('contactInfo') || contactData);
  const [siteLogo, setSiteLogo] = useState(() => getLogoUrl(true));

  useEffect(() => {
    const refresh = () => {
      setContact(adminData.getData('contactInfo') || contactData);
      setSiteLogo(getLogoUrl(true));
    };
    refresh();
    const cleanup = adminData.initSync(refresh);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Admission Guidance', href: '/admission-guidance' },
    { name: 'Results', href: '/results' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const courseLinks = [
    { name: '8th to 10th Coaching', href: '/courses#school-8-10' },
    { name: '11th & 12th Science', href: '/courses#science-11-12' },
    { name: 'NEET / JEE Prep', href: '/courses#neet' },
    { name: 'Diploma Engineering', href: '/courses#diploma' },
    { name: 'DDCET Preparation', href: '/courses#ddcet' },
    { name: 'Career Counseling', href: '/courses#career-guidance' }
  ];

  return (
    <footer className="bg-[#0F172A] relative pt-16 pb-8 border-t border-blue-600/20 overflow-hidden text-white">
      {/* Footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-4">
          <div className="flex items-center mb-6">
            <img src={siteLogo} alt="Noble Education Logo" className="h-10 max-w-[200px] w-auto object-contain" />

          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-sm">
            Noble Education provides coaching, academic support, competitive exam preparation, and career guidance. We are your trusted partner for coaching, guidance & career success in Vadodara.
          </p>
          {/* Social icons */}
          <div className="flex gap-4">
            <a href="https://facebook.com" className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all">
              <FiFacebook />
            </a>
            <a href="https://instagram.com" className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all">
              <FiYoutube />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Quick Links</h4>
          <ul className="space-y-3.5">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href}
                  className="text-zinc-400 hover:text-white text-sm transition-colors font-light"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Programs */}
        <div className="lg:col-span-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Academic Programs</h4>
          <ul className="space-y-3.5">
            {courseLinks.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href}
                  className="text-zinc-400 hover:text-white text-sm transition-colors font-light"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Details */}
        <div className="lg:col-span-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contact Info</h4>
          <div className="space-y-4">
            
            <div className="flex gap-3 items-start">
              <FiMapPin className="text-[#DC2626] mt-1 flex-shrink-0" />
              <a
                href={contact.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(contact.address || 'Noble Education Waghodia Road Vadodara')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 text-sm leading-relaxed font-light hover:text-white transition-colors cursor-pointer block"
                title="Click to Open Location on Google Maps"
              >
                <span className="underline decoration-dotted underline-offset-4">{contact.address}</span>
              </a>
            </div>

            <div className="flex gap-3 items-center">
              <FiPhone className="text-blue-500 flex-shrink-0" />
              <div className="text-zinc-400 text-sm font-light">
                <p><a href={`tel:${contact.phone1}`} className="hover:text-white">{contact.phone1}</a></p>
                <p><a href={`tel:${contact.phone2}`} className="hover:text-white">{contact.phone2}</a></p>
              </div>
            </div>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all duration-300 shadow-md w-full justify-center mt-2"
            >
              <FiMessageCircle className="text-base" /> Chat on WhatsApp
            </a>

          </div>
        </div>

      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <p className="text-zinc-500 text-xs font-light">
          © 2026 Noble Education. All Rights Reserved.
        </p>
        <p className="text-zinc-600 text-xs font-light flex items-center gap-1">
          Trusted Academic Guidance & Coaching in Vadodara.
        </p>
      </div>
    </footer>
  );
}
