import React from 'react';
import { FiPhone, FiFileText } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../data/contactData';
import { navigate } from '../utils/router';

export default function MobileBottomBar() {
  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_25px_rgba(0,0,0,0.5)] px-3 py-2.5">
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
        {/* Call Button */}
        <a
          href={`tel:${contactData.phone1}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-95 transition-all"
        >
          <FiPhone className="text-[#ED1C24] text-sm" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent('Hello Noble Education, I would like to inquire about admissions.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 active:scale-95 transition-all"
        >
          <FaWhatsapp className="text-base" />
          <span>WhatsApp</span>
        </a>

        {/* Admission Enquiry Button */}
        <a
          href="/admissions"
          onClick={(e) => handleNav(e, '/admissions')}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#ED1C24] hover:bg-[#C8141B] text-white shadow-md active:scale-95 transition-all font-extrabold uppercase tracking-wider text-[11px]"
        >
          <FiFileText className="text-xs" />
          <span>Enquiry</span>
        </a>
      </div>
    </div>
  );
}
