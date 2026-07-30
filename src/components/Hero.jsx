import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMessageCircle, FiCalendar } from 'react-icons/fi';

const Scene3D = lazy(() => import('./Scene3D'));

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 35;
    const y = (clientY - innerHeight / 2) / 35;
    setCoords({ x, y });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 } 
    }
  };

  const stats = [
    { label: '19+ Years Experience', color: 'border-red-600/30' },
    { label: 'Online & Offline Classes', color: 'border-white/10' },
    { label: 'Expert Faculty', color: 'border-white/10' },
    { label: 'Career Guidance', color: 'border-white/10' },
    { label: 'Admission Support', color: 'border-red-600/30' }
  ];

  return (
    <section id="home" onMouseMove={handleMouseMove} className="relative min-h-screen pt-24 pb-12 flex flex-col justify-center items-center overflow-hidden bg-[#050505]">
      {/* Background loop video - Opaque-faded high-tech connection particle lines */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-[0.12] mix-blend-screen"
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-particle-connection-loop-41978-large.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Background Orbs Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-red-600/10 rounded-full blur-[100px] md:blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Content Side */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex self-center lg:self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-500 font-semibold text-xs tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            Elite Coaching & Counselling Vadodara
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Build Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-glow">Noble Education</span>
          </motion.h1>

          {/* Description Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-zinc-300 text-base sm:text-lg md:text-xl font-light mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Trusted coaching, career guidance, and admission support for school, science, diploma, and competitive exam students in Vadodara.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch sm:items-center mb-10"
          >
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            >
              <FiCalendar className="text-lg" />
              Book Free Counseling
            </a>
            
            <a
              href="tel:9104206999"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5"
            >
              <FiPhone className="text-lg" />
              Call Now
            </a>

            <a
              href="https://wa.me/919104206999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-green-600/30 hover:border-green-500/60 text-green-500 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-green-600/10"
            >
              <FiMessageCircle className="text-lg" />
              WhatsApp Now
            </a>
          </motion.div>

          {/* Highlights Grid (Compact cards inside Hero) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center lg:justify-start gap-3"
          >
            {stats.map((stat, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-zinc-400 bg-white/5 border ${stat.color} hover:bg-white/8 transition-colors`}
              >
                {stat.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right 3D Visualizer Canvas Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ x: coords.x, y: coords.y }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          className="lg:col-span-6 relative w-full flex justify-center items-center"
        >
          {/* Overlay Grid lines decoration for technical atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/50 to-[#0A0A0A] pointer-events-none z-10" />
          
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-[300px] md:h-[450px] w-full text-zinc-500 font-light">
              <span className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
              Loading 3D Atmosphere...
            </div>
          }>
            <Scene3D />
          </Suspense>
        </motion.div>

      </div>
    </section>
  );
}
