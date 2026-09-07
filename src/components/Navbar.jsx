import React, { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX, HiChevronDown, HiTranslate } from 'react-icons/hi';
import { 
  FiPhone, FiBookOpen, FiCompass, FiAward, FiHeart, FiCpu, 
  FiBriefcase, FiUsers, FiMapPin, FiLayers, FiCheckCircle, 
  FiTrendingUp, FiSmile, FiZap
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { navigate, normalizePathFromLocation } from '../utils/router';
import { adminData } from '../utils/adminData';
import { contactData } from '../data/contactData';
import { logoWhite, getLogoUrl } from '../utils/logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const [currentPath, setCurrentPath] = useState(normalizePathFromLocation(window.location.pathname));
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState(() => getLogoUrl(true));

  // Announcements ticker from adminData
  const [announcements, setAnnouncements] = useState(() => adminData.getData('announcements') || []);

  useEffect(() => {
    const unsubAnnounce = adminData.subscribe('announcements', (val) => {
      if (Array.isArray(val)) setAnnouncements(val);
    });
    const unsubLogo = adminData.subscribe('siteLogo', () => {
      setSiteLogo(getLogoUrl(true));
    });
    return () => {
      unsubAnnounce();
      unsubLogo();
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'hi', name: 'હિન્‍દી' },
    { code: 'mr', name: 'મરાઠી' }
  ];

  const handleLangChange = (code) => {
    if (code === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/`;
      document.cookie = `googtrans=/en/${code}; domain=${window.location.hostname}; path=/`;
    }

    const selectEl = document.querySelector('.goog-te-combo');
    if (selectEl) {
      selectEl.value = code;
      selectEl.dispatchEvent(new Event('change'));
    }
    
    setLangDropdownOpen(false);
    window.location.reload();
  };
  
  const leaveTimeoutRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleLocationChange = () => {
      setCurrentPath(normalizePathFromLocation(window.location.pathname));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleLocationChange);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
      Object.values(leaveTimeoutRef.current).forEach(clearTimeout);
    };
  }, []);

  const handleNav = (e, path) => {
    if (!path) return;
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('tel:')) {
      setIsOpen(false);
      setHoveredMenu(null);
      return;
    }
    e.preventDefault();
    setIsOpen(false);
    setHoveredMenu(null);
    navigate(path);
    setCurrentPath(normalizePathFromLocation(window.location.pathname));
  };

  const handleMouseEnter = (menuName) => {
    if (leaveTimeoutRef.current[menuName]) {
      clearTimeout(leaveTimeoutRef.current[menuName]);
    }
    setHoveredMenu(menuName);
  };

  const handleMouseLeave = (menuName) => {
    leaveTimeoutRef.current[menuName] = setTimeout(() => {
      setHoveredMenu((prev) => (prev === menuName ? null : prev));
    }, 180);
  };

  const toggleMobileSub = (menuName) => {
    setExpandedMobileMenu(expandedMobileMenu === menuName ? null : menuName);
  };

  // Exactly matching Blueprint Section 2:
  const navStructure = [
    { name: 'Home', href: '/' },
    {
      name: 'Academic',
      href: '/academic',
      dropdownGroups: [
        {
          title: 'School Programs',
          items: [
            { name: 'GSEB', href: '/academic/gseb', desc: '8th to 12th Board Coaching', icon: FiBookOpen },
            { name: 'CBSE', href: '/academic/cbse', desc: 'NCERT Foundation & Board Focus', icon: FiCompass },
            { name: 'Foundation', href: '/foundation', desc: '8th to 10th Concepts & Olympiad', icon: FiLayers }
          ]
        },
        {
          title: 'Higher Secondary Science',
          items: [
            { name: '11th Science', href: '/academic/science/11th', desc: 'Physics, Chemistry, Maths & Biology base', icon: FiCpu },
            { name: '12th Science', href: '/academic/science/12th', desc: 'Board excellence meets JEE/NEET prep', icon: FiAward }
          ]
        }
      ]
    },
    {
      name: 'JEE & NEET',
      href: '/jee',
      dropdownGroups: [
        {
          title: 'Entrance Programs',
          items: [
            { name: 'JEE Preparation', href: '/jee', desc: 'Main & Advanced engineering pathway', icon: FiCpu },
            { name: 'NEET Preparation', href: '/neet', desc: 'Targeted medical entrance coaching', icon: FiHeart },
            { name: 'Foundation for JEE/NEET', href: '/foundation', desc: 'Early conceptual readiness for competitive exams', icon: FiZap }
          ]
        },
        {
          title: 'Integrated Batches',
          items: [
            { name: 'Integrated JEE Program', href: '/integrated-jee-neet', desc: 'School + JEE in one unified timetable', icon: FiLayers },
            { name: 'Integrated NEET Program', href: '/integrated-jee-neet', desc: 'School + NEET medical base', icon: FiSmile }
          ]
        }
      ]
    },
    {
      name: 'Engineering',
      href: '/engineering',
      dropdownGroups: [
        {
          title: 'Noble Technical Division',
          items: [
            { name: 'Diploma Coaching', href: '/engineering/diploma', desc: 'GTU All Semesters & Backlog Support', icon: FiBriefcase },
            { name: 'Degree Coaching', href: '/engineering/degree', desc: 'Core Engineering Subjects & Maths', icon: FiAward },
            { name: 'DDCET Coaching', href: '/engineering/ddcet', desc: 'Diploma to Degree Lateral Entry Entrance', icon: FiTrendingUp }
          ]
        }
      ]
    },
    {
      name: 'Integrated Schools',
      href: '/integrated-schools',
      dropdownGroups: [
        {
          title: 'Partner Campuses in Vadodara',
          items: [
            { name: 'Royal Eduworld School', href: '/school?name=Royal%20School', desc: 'English Medium • 8th to 12th Science (Ajwa Road)', icon: FiMapPin },
            { name: 'Newheaven Vidyalaya', href: '/school?name=New%20Heaven%20Vidyalaya', desc: 'Gujarati Medium • 11th & 12th Science (Waghodia Road)', icon: FiMapPin },
            { name: 'Raghukul Vidyalaya', href: '/school?name=Raghukul%20Vidyalay', desc: 'Gujarati Medium • 8th to 10th Board (New VIP Road)', icon: FiMapPin }
          ]
        }
      ]
    },
    { name: 'Results', href: '/results' },
    { name: 'Student Zone', href: '/student-zone' },
    {
      name: 'About',
      href: '/about',
      dropdownGroups: [
        {
          title: 'About Noble',
          items: [
            { name: 'About Noble', href: '/about', desc: '19+ Years of Academic Excellence', icon: FiUsers },
            { name: 'Our Philosophy', href: '/about/philosophy', desc: 'Concepts First. Foundations. Results.', icon: FiCompass },
            { name: 'Faculty', href: '/about/faculty', desc: 'Experienced & dedicated educators', icon: FiAward },
            { name: 'Infrastructure', href: '/infrastructure', desc: 'Classrooms, labs & study spaces', icon: FiCheckCircle },
            { name: 'Careers', href: '/about#careers', desc: 'Join the Noble Education academic team', icon: FiBriefcase }
          ]
        }
      ]
    },
    { name: 'Contact', href: '/contact' }
  ];

  const isHomePage = currentPath === '/';
  const shouldBeSolid = scrolled || !isHomePage;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col font-sans">
      {/* Top Announcement Ticker */}
      <div className="bg-[#0A0E1A] text-slate-300 py-1.5 text-xs font-semibold overflow-hidden relative w-full flex items-center border-b border-[#ED1C24]/30">
        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <div className="animate-ticker flex gap-20 pr-20 select-none uppercase tracking-wider text-[11px]">
            {announcements.length > 0 ? announcements.map((ann, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="text-[#ED1C24]">{ann.emoji || '📢'}</span>
                <span>{ann.text}</span>
              </span>
            )) : (
              <>
                <span className="flex items-center gap-2">
                  <span className="text-[#ED1C24]">🎯</span>
                  <span>Admissions Open for 2026-27: 8th to 12th Science, GSEB, CBSE, JEE, NEET & DDCET</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#ED1C24]">📍</span>
                  <span>Center: Above Bank Of India, 3rd Floor, Waghodia Road, Vadodara • Call: 91042 06999</span>
                </span>
              </>
            )}
          </div>
          <div className="animate-ticker flex gap-20 pr-20 select-none uppercase tracking-wider text-[11px]" aria-hidden="true">
            {announcements.length > 0 ? announcements.map((ann, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-2">
                <span className="text-[#ED1C24]">{ann.emoji || '📢'}</span>
                <span>{ann.text}</span>
              </span>
            )) : (
              <>
                <span className="flex items-center gap-2">
                  <span className="text-[#ED1C24]">🎯</span>
                  <span>Admissions Open for 2026-27: 8th to 12th Science, GSEB, CBSE, JEE, NEET & DDCET</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#ED1C24]">📍</span>
                  <span>Center: Above Bank Of India, 3rd Floor, Waghodia Road, Vadodara • Call: 91042 06999</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        shouldBeSolid ? 'bg-[#0B0F19]/95 backdrop-blur-md shadow-2xl border-b border-white/10' : 'bg-[#0B0F19]/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-20 gap-3 xl:gap-6">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-3 flex-shrink-0 mr-2 lg:mr-4">
              <a href="/" onClick={(e) => handleNav(e, '/')} className="flex items-center gap-3 group">
                <img
                  src={siteLogo || logoWhite}
                  alt="Noble Education"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={() => { setSiteLogo(logoWhite); }}
                />
              </a>
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-2 h-full">
              {navStructure.map((nav) => {
                const isActive = currentPath === nav.href || (nav.href !== '/' && currentPath.startsWith(nav.href));
                return (
                  <div
                    key={nav.name}
                    className="relative flex items-center h-full flex-shrink-0"
                    onMouseEnter={() => nav.dropdownGroups && handleMouseEnter(nav.name)}
                    onMouseLeave={() => nav.dropdownGroups && handleMouseLeave(nav.name)}
                  >
                    <a
                      href={nav.href}
                      onClick={(e) => handleNav(e, nav.href)}
                      className={`group flex items-center gap-1 font-bold text-[11.5px] xl:text-xs uppercase tracking-wider transition-all duration-200 px-2.5 xl:px-3 py-1.5 rounded-lg whitespace-nowrap focus:outline-none ${
                        isActive
                          ? 'text-white bg-[#ED1C24] shadow-md font-extrabold'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{nav.name}</span>
                      {nav.dropdownGroups && (
                        <HiChevronDown className={`text-xs transition-transform duration-200 opacity-70 group-hover:opacity-100 ${
                          hoveredMenu === nav.name ? 'rotate-180 text-[#ED1C24]' : ''
                        }`} />
                      )}
                    </a>

                    {/* Dropdown Menu Panel */}
                    {nav.dropdownGroups && hoveredMenu === nav.name && (
                      <div 
                        className="absolute top-full pt-2 z-50 animate-fadeIn left-1/2 -translate-x-1/2 max-w-[calc(100vw-24px)]"
                        onMouseEnter={() => handleMouseEnter(nav.name)}
                        onMouseLeave={() => handleMouseLeave(nav.name)}
                      >
                        <div 
                          className={`bg-[#0F1626] border border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl grid p-6 gap-6 ${
                            nav.dropdownGroups.length === 1 
                              ? 'w-[360px] grid-cols-1' 
                              : 'w-[580px] grid-cols-2'
                          }`}
                        >
                          {nav.dropdownGroups.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-3">
                              <span className="text-[10.5px] font-black text-[#ED1C24] uppercase tracking-widest block border-b border-white/10 pb-2">
                                {group.title}
                              </span>
                              <div className="flex flex-col gap-2.5">
                                {group.items.map((item, iIdx) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <a
                                      key={iIdx}
                                      href={item.href}
                                      target={item.href.startsWith('http') ? "_blank" : undefined}
                                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                      onClick={(e) => handleNav(e, item.href)}
                                      className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-200"
                                    >
                                      {IconComponent && (
                                        <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover/item:bg-[#ED1C24] group-hover/item:text-white transition-colors mt-0.5">
                                          <IconComponent className="text-sm" />
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <span className="text-xs font-bold text-white group-hover/item:text-[#ED1C24] transition-colors block">
                                          {item.name}
                                        </span>
                                        {item.desc && (
                                          <span className="text-[11px] text-slate-400 font-normal leading-snug block mt-0.5">
                                            {item.desc}
                                          </span>
                                        )}
                                      </div>
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Header Buttons per Blueprint Section 2 */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              
              {/* Call Now Button (Desktop) */}
              <a
                href={`tel:${contactData.phone1}`}
                className="hidden xl:flex items-center gap-2 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
                title="Call Noble Education"
              >
                <FiPhone className="text-[#ED1C24]" />
                <span>Call Now</span>
              </a>

              {/* Admission Enquiry Button */}
              <a
                href="/admissions"
                onClick={(e) => handleNav(e, '/admissions')}
                className="hidden sm:inline-flex items-center justify-center bg-[#ED1C24] hover:bg-[#C8141B] text-white font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(237,28,36,0.35)] hover:shadow-[0_0_25px_rgba(237,28,36,0.5)] hover:scale-105 flex-shrink-0"
              >
                Admission Enquiry
              </a>

              {/* Language Translate Trigger */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-105 active:scale-95"
                  title="Change Language"
                >
                  <HiTranslate className="text-base" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#0F1626] border border-slate-700 shadow-xl rounded-xl py-2 z-50 animate-fadeIn text-left">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang.code)}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wider block"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Toggle */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Slide-Out Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[115px] bottom-0 bg-[#0B0F19] text-white z-40 overflow-y-auto border-t border-white/10 animate-fadeIn pb-24">
            <div className="p-6 space-y-6">
              
              {/* Header Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/10">
                <a 
                  href="/admissions" 
                  onClick={(e) => handleNav(e, '/admissions')}
                  className="bg-[#ED1C24] hover:bg-[#C8141B] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider text-center shadow-lg block"
                >
                  Admission Enquiry
                </a>
                <a 
                  href={`tel:${contactData.phone1}`}
                  className="border border-white/20 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider text-center block hover:bg-white/5"
                >
                  Call: {contactData.phone1}
                </a>
              </div>

              {/* Navigation Items */}
              <div className="space-y-3">
                {navStructure.map((nav) => (
                  <div key={nav.name} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <div 
                      className="flex justify-between items-center cursor-pointer py-1.5 select-none"
                      onClick={(e) => {
                        if (nav.dropdownGroups) {
                          toggleMobileSub(nav.name);
                        } else {
                          handleNav(e, nav.href);
                        }
                      }}
                    >
                      <span className="font-extrabold text-xs text-white uppercase tracking-wider block">
                        {nav.name}
                      </span>
                      {nav.dropdownGroups && (
                        <div className="p-1 text-slate-400">
                          <HiChevronDown className={`text-base transition-transform duration-200 ${
                            expandedMobileMenu === nav.name ? 'rotate-180 text-[#ED1C24]' : ''
                          }`} />
                        </div>
                      )}
                    </div>

                    {nav.dropdownGroups && expandedMobileMenu === nav.name && (
                      <div className="mt-2 pl-3 space-y-3 border-l-2 border-[#ED1C24] animate-fadeIn">
                        {/* Direct link to parent page */}
                        <a
                          href={nav.href}
                          onClick={(e) => handleNav(e, nav.href)}
                          className="flex items-center gap-2 text-xs font-black text-[#ED1C24] py-1 uppercase tracking-wider"
                        >
                          <span>Explore {nav.name}</span>
                          <span>➜</span>
                        </a>

                        {nav.dropdownGroups.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                              {group.title}
                            </span>
                            <div className="flex flex-col gap-2 pl-1">
                              {group.items.map((item, iIdx) => {
                                const IconComponent = item.icon;
                                return (
                                  <a
                                    key={iIdx}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? "_blank" : undefined}
                                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    onClick={(e) => handleNav(e, item.href)}
                                    className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 py-1 hover:text-[#ED1C24] transition-colors"
                                  >
                                    {IconComponent && <IconComponent className="text-[#ED1C24] text-sm flex-shrink-0" />}
                                    <span>{item.name}</span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
