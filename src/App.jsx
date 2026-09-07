import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';

// Core Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import AdmissionsPage from './pages/AdmissionsPage';
import AcademicGSEBPage from './pages/AcademicGSEBPage';
import Science11thPage from './pages/Science11thPage';
import Science12thPage from './pages/Science12thPage';
import FoundationPage from './pages/FoundationPage';
import JEEPage from './pages/JEEPage';
import NEETPage from './pages/NEETPage';
import IntegratedJEENEETPage from './pages/IntegratedJEENEETPage';
import DDCETPage from './pages/DDCETPage';
import EngineeringPage from './pages/EngineeringPage';
import Results from './pages/Results';
import Gallery from './pages/Gallery';
import StudentCorner from './pages/StudentCorner';
import OnlineTest from './pages/OnlineTest';
import Contact from './pages/Contact';

import SchoolDetail from './pages/SchoolDetail';
import SchoolsOverview from './pages/SchoolsOverview';
import AdminPanel from './pages/AdminPanel';
import BlogPage from './components/BlogPage';

import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from './data/contactData';
import { adminData } from './utils/adminData';
import PromoPopup from './components/PromoPopup';
import { normalizePathFromLocation, navigate } from './utils/router';
import { logoWhite, getLogoUrl } from './utils/logo';

export default function App() {
  const [siteLogo, setSiteLogo] = useState(() => getLogoUrl(true));

  useEffect(() => {
    console.log('App mounted');
    window.__noble_app_mounted = true;
    
    // Check for admin redirect intent
    try {
      const adminIntent = sessionStorage.getItem('noble_admin_intent');
      if (adminIntent === '/admin') {
        sessionStorage.removeItem('noble_admin_intent');
        setTimeout(() => {
          navigate('/admin');
        }, 50);
      }
    } catch (e) {}
  }, []);

  const initialPath = normalizePathFromLocation(window.location.pathname);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [isLoading, setIsLoading] = useState(() => !initialPath.startsWith('/admin'));

  const contact = adminData.getData('contactInfo') || contactData;

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');

    let cleanupSync = () => {};
    try {
      cleanupSync = adminData.subscribe('siteLogo', () => {
        setSiteLogo(getLogoUrl(true));
      });
    } catch (e) {
      console.error('adminData.subscribe failed', e);
    }

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const handleLocationChange = () => {
      const nextPath = normalizePathFromLocation(window.location.pathname);
      setCurrentPath(nextPath);
      
      if (!nextPath.startsWith('/admin')) {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 350);
      } else {
        setIsLoading(false);
      }
      
      if (window.location.hash && !window.location.hash.startsWith('#/')) {
        const id = window.location.hash.substring(1);
        const knownRoutes = [
          'admin', 'about', 'courses', 'academic', 'admissions', 'admission-guidance',
          'foundation', 'jee', 'neet', 'integrated-jee-neet', 'engineering',
          'integrated-schools', 'schools', 'school', 'results', 'scholarship',
          'student-zone', 'student-corner', 'online-test', 'infrastructure',
          'gallery', 'contact', 'blog'
        ];
        if (!knownRoutes.some(r => id === r || id.startsWith(r + '/'))) {
          setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      clearTimeout(loadTimer);
      try {
        cleanupSync && cleanupSync();
      } catch {}
    };
  }, []);

  // Comprehensive route rendering based on Blueprint clean URL structure
  const renderView = () => {
    // Partner Schools Directory
    if (
      currentPath === '/integrated-schools' || 
      currentPath === '/schools' || 
      currentPath === '/schools/' || 
      (currentPath === '/school' && !window.location.search && !window.location.pathname.replace('/school', '').replace('/', '').trim())
    ) {
      return <SchoolsOverview />;
    }

    // Individual School Detail Page
    if (currentPath.startsWith('/school')) {
      return <SchoolDetail />;
    }

    // Engineering Sub-Routes
    if (currentPath === '/engineering/ddcet' || currentPath === '/ddcet-coaching') {
      return <DDCETPage />;
    }

    // Academic Specific Sub-Routes
    if (
      currentPath === '/academic/science/11th' ||
      currentPath === '/academic/11th' ||
      currentPath === '/11th-science'
    ) {
      return <Science11thPage />;
    }

    if (
      currentPath === '/academic/science/12th' ||
      currentPath === '/academic/12th' ||
      currentPath === '/12th-science'
    ) {
      return <Science12thPage />;
    }

    if (
      currentPath === '/academic/gseb' ||
      currentPath === '/academic/gseb/8th' ||
      currentPath === '/academic/gseb/9th' ||
      currentPath === '/academic/gseb/10th' ||
      currentPath === '/academic'
    ) {
      return <AcademicGSEBPage />;
    }

    if (currentPath === '/foundation') {
      return <FoundationPage />;
    }

    if (currentPath === '/jee') {
      return <JEEPage />;
    }

    if (currentPath === '/neet') {
      return <NEETPage />;
    }

    if (currentPath === '/integrated-jee-neet') {
      return <IntegratedJEENEETPage />;
    }

    switch (currentPath) {
      case '/':
        return <Home />;
      case '/admissions':
      case '/admission-guidance':
        return <AdmissionsPage />;
      case '/engineering':
      case '/engineering/diploma':
      case '/engineering/degree':
      case '/noble-engineering':
      case '/diploma-engineering':
        return <EngineeringPage />;
      case '/results':
        return <Results />;
      case '/contact':
        return <Contact />;
      case '/about':
      case '/about/philosophy':
      case '/about/faculty':
      case '/infrastructure':
        return <About />;
      case '/student-zone':
      case '/student-corner':
      case '/scholarship':
        return <StudentCorner />;
      case '/online-test':
        return <OnlineTest />;
      case '/gallery':
        return <Gallery />;
      case '/blog':
        return <BlogPage />;
      case '/courses':
        return <Courses />;
      case '/admin':
        return <AdminPanel />;
      default:
        return <Home />;
    }
  };

  const isAdminPath = currentPath === '/admin' || currentPath.startsWith('/admin');

  return (
    <div className={`${isAdminPath ? 'bg-[#0B132B] text-white' : 'bg-[#0A0E1A] text-slate-100'} min-h-screen relative selection:bg-[#ED1C24] selection:text-white flex flex-col justify-between font-sans`}>

      {/* Global Top Navbar */}
      {!isAdminPath && <Navbar />}

      {/* Dynamic View Engine */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Footer */}
      {!isAdminPath && <Footer />}

      {/* Mobile Sticky Bottom Action Bar (Call | WhatsApp | Enquiry) */}
      {!isAdminPath && <MobileBottomBar />}

      {/* Promo Popup (Homepage Only) */}
      {(currentPath === '/' || currentPath === '') && <PromoPopup isLoading={isLoading} currentPath={currentPath} />}

      {/* Floating WhatsApp Action Button (Desktop Only) */}
      {!isAdminPath && (
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] transition-all duration-300 text-3xl items-center justify-center hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      )}

      {/* Page Transition Loader Overlay */}
      {isLoading && !isAdminPath && (
        <div id="noble-loading-overlay" className="fixed inset-0 bg-[#0A0E1A] z-[9999] flex flex-col items-center justify-center animate-fadeIn select-none pointer-events-auto">
          <div className="relative flex flex-col items-center space-y-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#ED1C24]/10 rounded-full blur-2xl animate-pulse"></div>
            <img 
              src={siteLogo || logoWhite} 
              alt="Noble Education" 
              className="h-16 max-w-[240px] w-auto object-contain animate-pulse relative z-10"
            />
            <div className="w-10 h-10 border-[3px] border-slate-700 border-t-[#ED1C24] rounded-full animate-spin relative z-10"></div>
          </div>
        </div>
      )}

    </div>
  );
}
