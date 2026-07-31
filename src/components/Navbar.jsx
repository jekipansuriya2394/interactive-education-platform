import React, { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX, HiChevronDown, HiTranslate } from 'react-icons/hi';
import { FiPhone, FiCalendar, FiMessageCircle, FiBookOpen, FiCompass, FiHeart, FiCpu, FiBriefcase, FiFileText, FiAward, FiTrendingUp, FiMapPin, FiUsers, FiCheckCircle, FiSettings, FiList, FiLock, FiPlay, FiMessageSquare } from 'react-icons/fi';
import { navigate, normalizePathFromLocation } from '../utils/router';
import { adminData } from '../utils/adminData';
import { logoWhite, getLogoUrl } from '../utils/logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const [currentPath, setCurrentPath] = useState(normalizePathFromLocation(window.location.pathname));
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState(() => getLogoUrl(true));

  // Fetch live announcements & logo from admin panel with real-time sync
  const [announcements, setAnnouncements] = useState(() => adminData.getData('announcements') || []);

  useEffect(() => {
    const refresh = () => {
      setAnnouncements(adminData.getData('announcements') || []);
      setSiteLogo(getLogoUrl(true));
    };
    refresh();
    const cleanup = adminData.initSync(refresh);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);


  const languages = [
    { code: 'en', name: 'English' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'hi', name: 'હિન્‍દી' },
    { code: 'mr', name: 'મરાઠી' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'kn', name: 'કન્નડ' }
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
    if (path.startsWith('http://') || path.startsWith('https://')) {
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

  const navStructure = [
    { name: 'About', href: '/about' },
    {
      name: 'Courses',
      href: '/courses',
      dropdownGroups: [
        {
          title: 'Integrated & Schooling',
          items: [
            { name: '8th to 10th Standard', href: '/courses#school-8-10', desc: 'Academic foundation & concept building', icon: FiBookOpen },
            { name: '11th-12th Science', href: '/courses#science-11-12', desc: 'State Board, CBSE & entrance coaching', icon: FiCompass }
          ]
        },
        {
          title: 'Competitive Prep',
          items: [
            { name: 'NEET Practice', href: '/courses#neet', desc: 'Medical entrance mock test series', icon: FiHeart },
            { name: 'JEE Entrance Mock', href: '/courses#jee', desc: 'IIT/NIT engineering preparation', icon: FiCpu },
            { name: 'GUJCET Batches', href: '/courses#gujcet', desc: 'Gujarat state engineering prep', icon: FiBriefcase }
          ]
        },
        {
          title: 'Engineering Semesters',
          items: [
            { name: 'Diploma Coaching', href: '/courses#diploma', desc: 'Semester syllabus target tutorials', icon: FiFileText },
            { name: 'Degree Engineering', href: '/courses#degree', desc: 'Advanced semester exam guidelines', icon: FiAward },
            { name: 'DDCET Special Entrance', href: '/courses#ddcet', desc: 'Lateral entry degree mock tests', icon: FiTrendingUp }
          ]
        },
        {
          title: 'Admissions & Career',
          items: [
            { name: 'ACPC Option filling', href: '/courses#career-guidance', desc: 'Counseling choice list support', icon: FiMapPin },
            { name: 'Student Corner Portal', href: '/courses#projects-training', desc: 'Access study notes & syllabus', icon: FiUsers }
          ]
        }
      ]
    },
    {
      name: 'Admission',
      href: '/admission-guidance',
      dropdownGroups: [
        {
          title: 'Direct Guidance',
          items: [
            { name: 'After 10th Selection', href: '/admission-guidance#stream-selection', desc: 'Stream mapping & science counseling', icon: FiCheckCircle },
            { name: 'After 12th Counseling', href: '/admission-guidance#after-12th', desc: 'Degree college selection guides', icon: FiAward }
          ]
        },
        {
          title: 'Admission Steps',
          items: [
            { name: 'ACPC Registration Help', href: '/admission-guidance#admission-steps', desc: 'Step-by-step form support', icon: FiSettings },
            { name: 'Admission Checklists', href: '/admission-guidance#documents-checklist', desc: 'Required documents & deadlines', icon: FiList }
          ]
        }
      ]
    },
    { name: 'Results', href: '/results' },
    { name: 'Gallery', href: '/gallery' },
    {
      name: 'Student Corner',
      href: '/student-corner',
      dropdownGroups: [
        {
          title: 'Active Students Hub',
          items: [
            { name: 'Online Portal Login', href: 'https://nobleeducation.theonlinetests.com/dynamicwl/login', desc: 'Access your dashboard & reports', icon: FiLock },
            { name: 'Start Mock Exam Test', href: '/online-test', desc: 'Take interactive timed mock trials', icon: FiPlay },
            { name: 'Leave Student Feedback', href: '/student-corner#feedback', desc: 'Tell us about your class experience', icon: FiMessageSquare }
          ]
        }
      ]
    },
    { name: 'Admin', href: '/admin', icon: FiLock },
    { name: 'Contact', href: '/contact' }
  ];

  const isHomePage = currentPath === '/';
  const shouldBeSolid = scrolled || !isHomePage;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col">
      {/* Top Scrolling Announcement Ticker */}
      <div className="bg-[#1C2E60] text-white py-1 text-xs font-semibold overflow-hidden relative w-full flex items-center border-b border-[#DC2626]">
        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <div className="animate-ticker flex gap-24 pr-24 select-none uppercase tracking-wide">
            {announcements.map((ann, idx) => (
              <span key={idx}>{ann.emoji || '📢'} &nbsp;&nbsp; {ann.text}</span>
            ))}
          </div>
          <div className="animate-ticker flex gap-24 pr-24 select-none uppercase tracking-wide" aria-hidden="true">
            {announcements.map((ann, idx) => (
              <span key={`dup-${idx}`}>{ann.emoji || '📢'} &nbsp;&nbsp; {ann.text}</span>
            ))}
          </div>
        </div>
      </div>

      <nav className={`w-full transition-all duration-300 ${
        shouldBeSolid ? 'bg-[#1C2E60] shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 cursor-pointer flex items-center" onClick={(e) => handleNav(e, '/')}>
              <img src={siteLogo} alt="Noble Education" className="h-[38px] md:h-[45px] max-w-[220px] w-auto object-contain" />
            </div>


            {/* Center: Desktop Menu (Vertically aligned) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4.5 h-full flex-shrink-0">
              {navStructure.map((nav) => (
                <div
                  key={nav.name}
                  className="relative flex items-center h-full flex-shrink-0"
                  onMouseEnter={() => nav.dropdownGroups && handleMouseEnter(nav.name)}
                  onMouseLeave={() => nav.dropdownGroups && handleMouseLeave(nav.name)}
                >
                  <a
                    href={nav.href}
                    onClick={(e) => {
                      handleNav(e, nav.href);
                    }}
                    className={`desktop-nav-link flex items-center gap-1 font-bold text-[11px] uppercase tracking-wider transition-colors py-2 whitespace-nowrap focus:outline-none ${
                      shouldBeSolid ? 'text-slate-200 hover:text-[#DC2626]' : 'text-zinc-300 hover:text-[#DC2626]'
                    }`}
                  >
                    {nav.name} {nav.dropdownGroups && <HiChevronDown className="text-xs transition-transform duration-200" />}
                  </a>

                  {/* Smart Responsive Mega Dropdown Panel (100% VISIBLE, NO LEFT OR RIGHT CUTOFFS) */}
                  {nav.dropdownGroups && hoveredMenu === nav.name && (
                    <div 
                      className={`absolute top-full pt-2 z-50 animate-fadeIn max-w-[calc(100vw-24px)] ${
                        nav.name === 'Courses' 
                          ? 'left-[-80px] sm:left-[-140px] md:left-[-200px] lg:left-[-160px] xl:left-1/2 xl:-translate-x-1/2' 
                          : nav.name === 'Admission' 
                            ? 'left-[-40px] sm:left-[-80px] lg:left-1/2 lg:-translate-x-1/2' 
                            : 'right-0 lg:left-1/2 lg:-translate-x-1/2'
                      }`}
                      onMouseEnter={() => handleMouseEnter(nav.name)}
                      onMouseLeave={() => handleMouseLeave(nav.name)}
                    >
                      <div 
                        className={`bg-white border border-slate-200 shadow-2xl rounded-3xl grid max-w-[calc(100vw-32px)] max-h-[85vh] overflow-y-auto ${
                          nav.dropdownGroups.length === 1 
                            ? 'w-[320px] grid-cols-1 p-5 sm:p-6 gap-4' 
                            : nav.dropdownGroups.length === 2 
                              ? 'w-[540px] sm:w-[580px] grid-cols-1 sm:grid-cols-2 p-5 sm:p-6 gap-5 sm:gap-6' 
                              : 'w-[900px] xl:w-[940px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 sm:p-8 gap-5 sm:gap-6'
                        }`}
                      >
                        {nav.dropdownGroups.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-4">
                            <span className="text-[10px] font-black text-[#1C2E60] uppercase tracking-widest block border-b border-slate-100 pb-2">
                              {group.title}
                            </span>
                            <div className="flex flex-col gap-3">
                              {group.items.map((item, iIdx) => {
                                const IconComponent = item.icon;
                                return (
                                  <a
                                    key={iIdx}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? "_blank" : undefined}
                                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    onClick={(e) => handleNav(e, item.href)}
                                    className="group flex items-start gap-3 p-2 rounded-2xl hover:bg-slate-50/70 transition-all duration-200 -mx-2"
                                  >
                                    {IconComponent && (
                                      <div className="p-2 rounded-xl bg-[#1C2E60]/5 text-[#1C2E60] group-hover:bg-[#DC2626]/5 group-hover:text-[#DC2626] transition-colors mt-0.5">
                                        <IconComponent className="text-sm" />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#DC2626] transition-colors block">
                                        {item.name}
                                      </span>
                                      {item.desc && (
                                        <span className="text-[10px] text-zinc-500 font-light leading-normal block mt-0.5">
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
              ))}
            </div>

            {/* Right: Header CTA Combination */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 relative">
              
              {/* Google Translate Hidden Element - active in DOM, hidden visually to let loader initialize it */}
              <div id="google_translate_element" style={{ opacity: 0, width: 0, height: 0, overflow: 'hidden', position: 'absolute', pointerEvents: 'none' }}></div>

              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                <a 
                  href="#inquiry-form" 
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold px-3 xl:px-4 py-2.5 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(220,38,38,0.25)] hover:scale-105 flex-shrink-0 whitespace-nowrap"
                >
                  Book Free Counselling
                </a>
              </div>

              {/* Custom Circular Translate Button (文/A Icon) */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm border cursor-pointer hover:scale-105 active:scale-95 ${
                    shouldBeSolid 
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-[#1C2E60]' 
                      : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  }`}
                  title="Change Language"
                >
                  <HiTranslate className="text-lg" />
                </button>

                {/* Dropdown Menu */}
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 z-50 animate-fadeIn text-left">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang.code)}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-[#1C2E60] hover:bg-slate-50 transition-colors uppercase tracking-wider block"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hamburger Mobile Icon */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl text-white hover:bg-white/5 transition-colors"
                >
                  {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 bg-white z-40 overflow-y-auto border-t border-slate-200 animate-fadeIn">
            <div className="p-6 space-y-6">
              
              {/* Mobile Header CTAs at top as requested */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-slate-100">
                <a 
                  href="#inquiry-form" 
                  onClick={() => setIsOpen(false)}
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-3.5 rounded-xl text-xs text-center shadow-md block"
                >
                  Book Counselling
                </a>
                <a 
                  href="tel:9104206999" 
                  className="border border-[#1C2E60] text-[#1C2E60] font-bold py-3.5 rounded-xl text-xs text-center block hover:bg-slate-50"
                >
                  Call: 9104206999
                </a>
              </div>

              {/* Menu items */}
              <div className="space-y-4">
                {navStructure.map((nav) => (
                  <div key={nav.name} className="border-b border-slate-100 pb-3.5 last:border-b-0 last:pb-0">
                    <div 
                      className="flex justify-between items-center cursor-pointer py-1 select-none"
                      onClick={(e) => {
                        if (nav.dropdownGroups) {
                          toggleMobileSub(nav.name);
                        } else {
                          handleNav(e, nav.href);
                        }
                      }}
                    >
                      <span className="font-extrabold text-xs text-[#1C2E60] uppercase tracking-wider block">
                        {nav.name}
                      </span>
                      {nav.dropdownGroups && (
                        <div className="p-1.5 text-zinc-500">
                          <HiChevronDown className={`text-base transition-transform duration-200 ${
                            expandedMobileMenu === nav.name ? 'rotate-180 text-[#DC2626]' : ''
                          }`} />
                        </div>
                      )}
                    </div>

                    {nav.dropdownGroups && expandedMobileMenu === nav.name && (
                      <div className="mt-3 pl-3 space-y-4 border-l-2 border-[#1C2E60]/20 animate-fadeIn">
                        {/* Direct link to main page */}
                        <a
                          href={nav.href}
                          onClick={(e) => handleNav(e, nav.href)}
                          className="flex items-center gap-2 text-xs font-black text-[#DC2626] py-1 uppercase tracking-wider"
                        >
                          <span>Explore All {nav.name}</span>
                          <span>➜</span>
                        </a>

                        {nav.dropdownGroups.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-2">
                            <span className="text-[10px] font-black text-[#1C2E60] uppercase tracking-widest block opacity-70">
                              {group.title}
                            </span>
                            <div className="flex flex-col gap-2 pl-2">
                              {group.items.map((item, iIdx) => {
                                const IconComponent = item.icon;
                                return (
                                  <a
                                    key={iIdx}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? "_blank" : undefined}
                                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    onClick={(e) => handleNav(e, item.href)}
                                    className="flex items-center gap-2.5 text-xs font-bold text-slate-700 py-1.5 hover:text-[#DC2626] active:text-[#DC2626] transition-colors"
                                  >
                                    {IconComponent && <IconComponent className="text-[#1C2E60] text-sm flex-shrink-0" />}
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
    </div>
  );
}
