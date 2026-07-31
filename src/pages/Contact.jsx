import React, { useState, useEffect } from 'react';
import { FiPhone, FiMapPin, FiClock, FiMail, FiExternalLink } from 'react-icons/fi';
import { contactData } from '../data/contactData';
import { adminData } from '../utils/adminData';
import { getEmbedImageUrl } from '../utils/imageUrl';
import InquiryForm from '../components/InquiryForm';

export default function Contact() {
  const [contact, setContact] = useState(() => adminData.getData('contactInfo') || contactData);
  const [contactPhotos, setContactPhotos] = useState(() => {
    const all = adminData.getData('pageImages') || {};
    return all.contact || [];
  });

  useEffect(() => {
    const refreshContact = () => {
      setContact(adminData.getData('contactInfo') || contactData);
      const all = adminData.getData('pageImages') || {};
      setContactPhotos(all.contact || []);
    };
    refreshContact();
    const cleanup = adminData.initSync(refreshContact);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const infoCards = [
    {
      icon: FiPhone,
      tag: 'CALL',
      label: 'Call Us',
      content: (
        <div className="space-y-1">
          <a
            href={`tel:${contact.phone1}`}
            className="text-[#1C2E60] font-extrabold text-sm hover:text-[#DC2626] transition-colors block"
          >
            {contact.phone1 || '9104206999'}
          </a>
          <a
            href={`tel:${contact.phone2}`}
            className="text-zinc-600 font-bold text-xs hover:text-[#DC2626] transition-colors block"
          >
            {contact.phone2 || '9104206888'}
          </a>
        </div>
      ),
    },
    {
      icon: FiMail,
      tag: 'EMAIL',
      label: 'Email Us',
      content: (
        <div>
          <a
            href={`mailto:${contact.email}`}
            className="text-[#1C2E60] font-extrabold text-sm hover:text-[#DC2626] transition-colors break-all block"
          >
            {contact.email || 'info@nobleedu.in'}
          </a>
          <span className="text-zinc-400 text-[11px] font-medium block mt-1">Quick 24h Response</span>
        </div>
      ),
    },
    {
      icon: FiMapPin,
      tag: 'CAMPUS',
      label: 'Campus Address',
      content: (
        <div>
          <a
            href={contact.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(contact.address || 'Noble Education Waghodia Road Vadodara')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1C2E60] font-extrabold text-xs leading-relaxed block hover:text-[#DC2626] transition-colors cursor-pointer mb-2"
            title="Click to Open Location on Google Maps"
          >
            📍 <span className="underline decoration-dotted underline-offset-4">{contact.address || 'Above Bank Of India, 3rd Floor, Near Uma Char Rasta, Waghodia Road, Vadodara, Gujarat 390019'}</span>
          </a>
          <a
            href={contact.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(contact.address || 'Noble Education Waghodia Road Vadodara')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#DC2626] font-extrabold text-[11px] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
          >
            Open in Google Maps <FiExternalLink className="text-xs" />
          </a>
        </div>
      ),
    },
    {
      icon: FiClock,
      tag: 'TIMINGS',
      label: 'Office Hours',
      content: (
        <div className="space-y-1">
          <p className="text-[#1C2E60] text-xs font-bold">Mon - Sat: 8:00 AM - 8:00 PM</p>
          <p className="text-zinc-500 text-[11px] font-medium">Sun: 9:00 AM - 1:00 PM</p>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#EEF1F5] bg-dots-pattern text-[#5A6472]">

      {/* Hero Header */}
      <section
        className="py-16 sm:py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-contact-hero.png')}')`, backgroundPosition: 'center 60%' }}
      >
        <div className="absolute inset-0 bg-[#1C2E60]/85 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-4 mb-4 text-white leading-tight text-glow-blue">
            Contact & Location
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Visit our campus at Waghodia Road, call our admission helpline, or send an inquiry below.
          </p>
        </div>
      </section>

      {/* Info Cards - Clean layout below hero without overlapping */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px] group hover:-translate-y-1"
              >
                {/* Top Row: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1C2E60] group-hover:bg-[#1C2E60] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1C2E60]/60 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                    {card.tag}
                  </span>
                </div>

                {/* Bottom Row: Title + Content */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#1C2E60] mb-2">
                    {card.label}
                  </h3>
                  {card.content}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content: Map + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Map & Direct Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase">Location Map</span>
            <h2 className="text-2xl font-black text-[#1C2E60]">Visit Our Campus</h2>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              Located above Bank of India on main Waghodia Road — easily accessible from all parts of Vadodara.
            </p>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            {contact.mapUrl ? (
              <iframe
                title="Noble Education Campus Location"
                src={contact.mapUrl}
                className="w-full h-72 border-none block"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address || 'Noble Education Waghodia Road Vadodara')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-72 bg-slate-100 flex flex-col items-center justify-center gap-3 text-zinc-500 hover:bg-slate-200 transition-colors"
              >
                <FiMapPin size={32} className="text-blue-600" />
                <span className="font-bold text-sm text-blue-600">Open Location in Google Maps</span>
                <span className="text-xs text-center px-8 leading-relaxed">{contact.address}</span>
              </a>
            )}
          </div>

          {/* Dynamic Page Content Photos: Campus & Reception Desk */}
          {contactPhotos && contactPhotos.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1C2E60]">Campus Reception & Desks</h3>
              <div className="grid grid-cols-2 gap-4">
                {contactPhotos.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <img
                      src={getEmbedImageUrl(item.image || item.url)}
                      alt={item.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-3">
                      <p className="font-bold text-[#1C2E60] text-xs leading-tight">{item.title}</p>
                      {item.desc && <p className="text-zinc-400 text-[10px] font-light mt-1 truncate">{item.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${contact.phone1}`}
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-[#1C2E60] shadow-sm hover:border-[#DC2626] hover:bg-red-50 transition-all"
            >
              <FiPhone className="text-[#DC2626]" />
              {contact.phone1 || 'Call Now'}
            </a>
            <a
              href={`tel:${contact.phone2}`}
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-[#1C2E60] shadow-sm hover:border-[#DC2626] hover:bg-red-50 transition-all"
            >
              <FiPhone className="text-[#DC2626]" />
              {contact.phone2 || 'Call Now'}
            </a>
          </div>
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:col-span-7">
          <InquiryForm
            title="Send Admission Inquiry"
            subtitle="Our academic advisor will call you within 24 hours with a personalised guidance session."
            darkBg={false}
          />
        </div>
      </section>
    </div>
  );
}
