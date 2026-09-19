import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaArrowUp,
  FaTerminal,
  FaClock,
  FaCopy,
  FaCheck,
  FaHeart,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

interface FooterProps {
  onOpenTerminal?: () => void;
  onOpenInquiry?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenInquiry }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const currentYear = new Date().getFullYear();

  // Real-time IST (Indore, India - UTC+5:30) Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST string
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyText = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const navLinks = [
    { name: 'Home', section: 'hero' },
    { name: 'Architecture', section: 'projects' },
    { name: 'Arsenal', section: 'technologies' },
    { name: 'Mindset', section: 'about' },
    { name: 'Credentials', section: 'education' },
    { name: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 85, behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="relative bg-[#07090f] text-slate-300 pt-16 pb-12 border-t border-cyan-500/20 overflow-hidden font-sans">
      {/* Background glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Scroll-to-Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 w-11 h-11 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_4px_15px_rgba(0,242,254,0.2)] backdrop-blur-md z-30 transition-all ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={13} />
      </motion.button>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HUD Minimalist Dock Strip */}
        <div className="bg-[#0b0f1a]/90 border border-cyan-500/25 rounded-2xl p-5 sm:p-6 mb-12 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Timezone HUD Clock */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FaClock size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px] uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LOCAL TIMEZONE // IST (UTC+5:30)</span>
                </div>
                <div className="text-base font-bold text-white tracking-wider mt-0.5">
                  {currentTime || '12:00:00 PM'} <span className="text-cyan-400 text-xs font-normal">INDORE, INDIA</span>
                </div>
              </div>
            </div>

            {/* Middle: Email & Phone Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              {/* Email Chip */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-xl transition-all">
                <a
                  href="mailto:devsourabh07@gmail.com"
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  devsourabh07@gmail.com
                </a>
                <button
                  onClick={() => copyText('devsourabh07@gmail.com', 'email')}
                  className="text-slate-400 hover:text-white p-0.5 transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <FaCheck className="text-emerald-400" size={10} /> : <FaCopy size={10} />}
                </button>
              </div>

              {/* Phone Chip */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 px-3 py-1.5 rounded-xl transition-all">
                <a
                  href="tel:+919755826293"
                  className="text-emerald-300 hover:text-emerald-200"
                >
                  +91 9755826293
                </a>
                <a
                  href="https://wa.me/919755826293"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 p-0.5"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={12} />
                </a>
                <button
                  onClick={() => copyText('+919755826293', 'phone')}
                  className="text-slate-400 hover:text-white p-0.5 transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <FaCheck className="text-emerald-400" size={10} /> : <FaCopy size={10} />}
                </button>
              </div>
            </div>

            {/* Right: Quick Triggers */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenTerminal}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
              >
                <FaTerminal size={11} />
                <span>CLI Terminal</span>
              </button>

              <button
                onClick={onOpenInquiry}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-heading text-xs transition-all shadow-md"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Identity Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-400 text-slate-950 font-mono font-bold flex items-center justify-center text-xs">
                S
              </div>
              <span className="font-heading font-bold text-white text-lg">
                Sourabh Singh Mandloi
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Full-Stack Systems Architect & AI/ML Specialist building production APIs, distributed architectures, algorithmic trading bots, and computer vision search pipelines.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="https://github.com/sourabhsingh88"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/sourabh-singh-mandloi/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={14} />
              </a>
              <a
                href="mailto:devsourabh07@gmail.com"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Navigation
            </h4>
            <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.section)}
                  className="text-left text-slate-400 hover:text-cyan-300 transition-colors py-1 flex items-center gap-2 group"
                >
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>{link.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Channels Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Inquiries
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <p>
                Email:{' '}
                <a href="mailto:devsourabh07@gmail.com" className="text-slate-300 hover:text-cyan-300">
                  devsourabh07@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+919755826293" className="text-slate-300 hover:text-emerald-300">
                  +91 9755826293
                </a>
              </p>
              <p>
                Location:{' '}
                <span className="text-slate-300">Indore, MP, India</span>
              </p>
              <div className="pt-2">
                <span className="inline-block text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Contracts: Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Sub-bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} Sourabh Singh Mandloi. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with</span>
            <FaHeart className="text-rose-500" size={11} />
            <span>using React, Tailwind CSS &amp; Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
