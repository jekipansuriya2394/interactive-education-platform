import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import AdmissionGuidance from './pages/AdmissionGuidance';
import Results from './pages/Results';
import Gallery from './pages/Gallery';
import StudentCorner from './pages/StudentCorner';
import OnlineTest from './pages/OnlineTest';
import Contact from './pages/Contact';

import SchoolDetail from './pages/SchoolDetail';

import AdminPanel from './pages/AdminPanel';
import BlogPage from './components/BlogPage';

import { FiPhone, FiFileText } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from './data/contactData';
import { adminData } from './utils/adminData';
import PromoPopup from './components/PromoPopup';
import { normalizePathFromLocation, navigate } from './utils/router';
import { logoWhite, getLogoUrl } from './utils/logo';

export default function App() {
  const [siteLogo, setSiteLogo] = useState(() => getLogoUrl(true));

  useEffect(() => {
    console.log('App mounted')
    window.__noble_app_mounted = true
    
    // Check for admin redirect intent
    try {
      const adminIntent = sessionStorage.getItem('noble_admin_intent');
      if (adminIntent === '/admin') {
        sessionStorage.removeItem('noble_admin_intent');
        // Navigate to admin after a tick
        setTimeout(() => {
          navigate('/admin');
        }, 50);
      }
    } catch (e) {}
  }, [])
  const [currentPath, setCurrentPath] = useState(normalizePathFromLocation(window.location.pathname));
  const [isLoading, setIsLoading] = useState(true);
  const [dataVersion, setDataVersion] = useState(0);

  const contact = adminData.getData('contactInfo') || contactData;

  useEffect(() => {
    // Ensure document element has no residual dark theme attributes
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');

    // Setup real-time database synchronisation listener (across tabs/devices)
    let cleanupSync = () => {};
    try {
      cleanupSync = adminData.initSync(() => {
        setDataVersion(prev => prev + 1);
        setSiteLogo(getLogoUrl(true));
      });
    } catch (e) {
      console.error('adminData.initSync failed', e);
    }


    // Initial page load handler - ensure loading screen displays smoothly
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    const handleLocationChange = () => {
      const nextPath = normalizePathFromLocation(window.location.pathname);
      setCurrentPath(nextPath);
      
      if (!nextPath.startsWith('/admin')) {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 450);
      }
      
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      clearTimeout(loadTimer);
      try {
        cleanupSync && cleanupSync();
      } catch {}
    };
  }, []);

  // Simple path router mapping
  const renderView = () => {
    if (currentPath.startsWith('/school')) {
      return <SchoolDetail />;
    }
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/about':
        return <About />;
      case '/courses':
        return <Courses />;
      case '/admission-guidance':
        return <AdmissionGuidance />;
      case '/results':
        return <Results />;
      case '/gallery':
        return <Gallery />;
      case '/student-corner':
        return <StudentCorner />;
      case '/online-test':
        return <OnlineTest />;
      case '/contact':
        return <Contact />;
      case '/blog':
        return <BlogPage />;
      case '/admin':
        return <AdminPanel />;
      default:
        return <Home />;
    }
  };

  const isAdminPath = currentPath === '/admin' || currentPath.startsWith('/admin');

  return (
    <div key={dataVersion} className={`${isAdminPath ? 'bg-[#0B132B] text-white' : 'bg-[#EEF1F5] text-[#1E293B]'} min-h-screen relative selection:bg-blue-600 selection:text-white flex flex-col justify-between`}>

      {/* Sticky Navbar */}
      {!isAdminPath && <Navbar />}

      {/* Dynamic View Engine */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Footer Details */}
      {!isAdminPath && <Footer />}

      {/* Promo Popup (Homepage Only) */}
      {(currentPath === '/' || currentPath === '') && <PromoPopup isLoading={isLoading} currentPath={currentPath} />}

      {/* Floating WhatsApp Action Button (Desktop Only) */}
      <a
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] transition-all duration-300 text-3xl items-center justify-center hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Premium Page Transition Loader Overlay */}
      {isLoading && !isAdminPath && (

        <div id="noble-loading-overlay" className="fixed inset-0 bg-[#0E2146] z-[9999] flex flex-col items-center justify-center animate-fadeIn select-none pointer-events-auto">
          <div className="relative flex flex-col items-center space-y-6">
            {/* Glowing Aura backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Pulsing White Brand Logo */}
            <img 
              src={siteLogo} 
              alt="Loading..." 
              className="h-16 max-w-[240px] w-auto object-contain animate-pulse relative z-10"
            />


            
            {/* Custom Spinner */}
            <div className="w-10 h-10 border-[3px] border-slate-700 border-t-[#DC2626] rounded-full animate-spin relative z-10"></div>
          </div>
        </div>
      )}

    </div>
  );
}
