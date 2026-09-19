import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaTerminal, FaBolt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenInquiry?: () => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, onOpenTerminal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 40);

      if (isHomePage) {
        const sections = document.querySelectorAll('section[id], div[id]');
        let currentActive = 'hero';

        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop - 120;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          if (offset >= sectionTop && offset < sectionTop + sectionHeight) {
            currentActive = section.id;
          }
        });

        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) return;
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 85,
          behavior: 'smooth',
        });
        setIsOpen(false);
      }, 50);
    }
  };

  const navLinks = [
    { name: 'System', section: 'hero' },
    { name: 'Architecture', section: 'projects' },
    { name: 'Arsenal', section: 'technologies' },
    { name: 'Mindset', section: 'about' },
    { name: 'Credentials', section: 'education' },
    { name: 'Contact', section: 'contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090c14]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-mono font-bold text-sm shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-transform">
                S
              </div>
              <div>
                <span className="text-white font-heading font-bold text-base tracking-tight">
                  SOURABH<span className="text-cyan-400">.</span>SINGH
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  // FULL-STACK & AI
                </span>
              </div>
            </Link>

            {/* Live status badge */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-emerald-500/30 rounded-full px-2.5 py-1 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>OPEN FOR CONTRACTS</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {isHomePage ? (
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.section);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all relative ${
                    activeSection === link.section
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                  {activeSection === link.section && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              ))
            ) : (
              <>
                <Link
                  to="/"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono uppercase text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 transition-colors"
                >
                  All Projects
                </Link>
              </>
            )}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Terminal Drawer Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTerminal}
              title="Open Sandbox Telemetry Terminal"
              className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 transition-all flex items-center justify-center font-mono text-xs"
            >
              <FaTerminal size={12} />
            </motion.button>

            {/* "Start a Project" Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenInquiry}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all flex items-center gap-1.5"
            >
              <FaBolt size={10} />
              <span>Start a Project</span>
            </motion.button>
          </div>

          {/* Mobile Menu & Terminal Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs"
              title="Terminal"
            >
              <FaTerminal size={13} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white bg-slate-900 border border-slate-800 p-2 rounded-lg"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 bg-[#0c101a]/95 border border-cyan-500/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col space-y-2">
                {isHomePage ? (
                  navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={`#${link.section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.section);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase transition-colors flex items-center justify-between ${
                        activeSection === link.section
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-[10px] text-slate-600">#{link.section}</span>
                    </a>
                  ))
                ) : (
                  <>
                    <Link
                      to="/"
                      className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase text-slate-300 hover:bg-slate-800/50"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/projects"
                      className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase text-cyan-400 bg-cyan-500/10"
                      onClick={() => setIsOpen(false)}
                    >
                      All Projects
                    </Link>
                  </>
                )}

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (onOpenInquiry) onOpenInquiry();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-heading flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FaBolt size={12} />
                    <span>Start a Project</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;