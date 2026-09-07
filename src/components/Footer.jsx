import React, { useState, useEffect } from 'react';
import { FiPhone, FiMapPin, FiMail, FiFacebook, FiInstagram, FiYoutube, FiArrowUpRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../data/contactData';
import { adminData } from '../utils/adminData';
import { logoWhite, getLogoUrl } from '../utils/logo';
import { navigate } from '../utils/router';

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

  const handleNav = (e, path) => {
    if (!path) return;
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('tel:')) return;
    e.preventDefault();
    navigate(path);
  };

  const academicLinks = [
    { name: 'GSEB Coaching (8th–12th)', href: '/academic/gseb' },
    { name: 'CBSE Preparation', href: '/academic/cbse' },
    { name: 'Foundation Program', href: '/foundation' },
    { name: '11th Science Base', href: '/academic/science/11th' },
    { name: '12th Science Board & Competitive', href: '/academic/science/12th' }
  ];

  const competitiveLinks = [
    { name: 'JEE Preparation', href: '/jee' },
    { name: 'NEET Preparation', href: '/neet' },
    { name: 'Diploma Engineering Coaching', href: '/engineering/diploma' },
    { name: 'Degree Engineering Support', href: '/engineering/degree' },
    { name: 'DDCET Lateral Entry Coaching', href: '/engineering/ddcet' }
  ];

  const companyLinks = [
    { name: 'About Noble', href: '/about' },
    { name: 'Our Philosophy', href: '/about/philosophy' },
    { name: 'Academic Faculty', href: '/about/faculty' },
    { name: 'Results & Achievers', href: '/results' },
    { name: 'Scholarship Program', href: '/scholarship' },
    { name: 'Student Zone', href: '/student-zone' },
    { name: 'Contact & Location', href: '/contact' }
  ];

  return (
    <footer className="bg-[#0A0E1A] text-slate-300 border-t border-white/10 relative overflow-hidden font-sans">
      {/* Subtle brand glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ED1C24]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Brand Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="inline-block">
              <img 
                src={siteLogo || logoWhite} 
                alt="Noble Education" 
                className="h-11 w-auto object-contain" 
              />
            </a>
            
            <p className="text-[#ED1C24] font-black text-xs uppercase tracking-widest">
              Integrated Education for Academic Excellence & Competitive Success
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal max-w-sm">
              Connecting school education, foundation preparation, JEE, NEET and engineering entrance coaching under one rigorous academic vision in Vadodara.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="text-[#ED1C24] mt-0.5 flex-shrink-0 text-sm" />
                <span>Above Bank Of India, 3rd Floor, Near Uma Char Rasta, Waghodia Road, Vadodara – 390019</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="text-[#ED1C24] flex-shrink-0 text-sm" />
                <a href={`tel:${contact.phone1}`} className="hover:text-white transition-colors font-medium">
                  {contact.phone1} / {contact.phone2 || '9104206888'}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#ED1C24] hover:bg-[#ED1C24] text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <FiFacebook className="text-sm" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#ED1C24] hover:bg-[#ED1C24] text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <FiInstagram className="text-sm" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#ED1C24] hover:bg-[#ED1C24] text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <FiYoutube className="text-sm" />
              </a>
              <a 
                href={`https://wa.me/${contact.whatsapp}`} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-green-500 hover:bg-green-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>

          {/* Column 2: Academic (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-widest mb-5 border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24]"></span>
              Academic Programs
            </h4>
            <ul className="space-y-3 text-xs">
              {academicLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Competitive & Engineering (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-widest mb-5 border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24]"></span>
              Competitive & Engineering
            </h4>
            <ul className="space-y-3 text-xs">
              {competitiveLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Resources (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-widest mb-5 border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24]"></span>
              Company
            </h4>
            <ul className="space-y-3 text-xs">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar per Blueprint Section 40 */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            <span className="font-bold text-slate-300">Noble Education</span> • Vadodara, Gujarat – 390019
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-white transition-colors">Terms of Admission</a>
            <a href="/admissions" onClick={(e) => handleNav(e, '/admissions')} className="hover:text-white transition-colors">Sitemap</a>
            <span>© 2026 Noble Education. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
