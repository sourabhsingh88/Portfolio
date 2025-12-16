import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle scroll effect for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      
      // Change navbar background on scroll
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Only determine active section on home page
      if (isHomePage) {
        // Determine active section based on scroll position
        const sections = document.querySelectorAll('section[id], div[id]');
        let currentActiveSection = 'hero';
        
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop - 100;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          
          if (offset >= sectionTop && offset < sectionTop + sectionHeight) {
            currentActiveSection = section.id;
          }
        });
        
        setActiveSection(currentActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Smooth scroll to section (only on home page)
  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // If not on home page, navigate to home first
      return;
    }
    
    const element = document.getElementById(sectionId.replace('#', ''));
    
    if (element) {
      // Use a small timeout to ensure the DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - (screenWidth < 640 ? 70 : 80),
          behavior: 'smooth'
        });
        setIsOpen(false);
      }, 100);
    } else {
      console.error(`Element with ID "${sectionId}" not found`);
    }
  };

  // Navbar sections
  const navLinks = [
    { name: 'Home', section: 'hero' },
    { name: 'About', section: 'about' },
    { name: 'Education', section: 'education' },
    { name: 'Technologies', section: 'technologies' },
    { name: 'Projects', section: 'projects' },
    { name: 'Contact', section: 'contact' },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg py-2 sm:py-3' 
          : 'bg-transparent py-3 sm:py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="text-white font-bold text-lg sm:text-xl"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center">
              <span className="text-blue-400">S</span>ourabh
              <span className="ml-1 text-gray-400 font-normal">Singh</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {isHomePage ? (
              // Show section links on home page
              navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  className="relative px-0.5 sm:px-1"
                >
                  <a
                    href={`#${link.section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.section);
                    }}
                    className={`px-2 sm:px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative ${
                      activeSection === link.section
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {activeSection === link.section && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-400 w-full rounded-full"
                        layoutId="activeSection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                </motion.div>
              ))
            ) : (
              // Show basic navigation on other pages
              <>
                <motion.div whileHover={{ scale: 1.05 }} className="relative px-0.5 sm:px-1">
                  <Link to="/" className="px-2 sm:px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white">
                    Home
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="relative px-0.5 sm:px-1">
                  <Link to="/projects" className={`px-2 sm:px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${location.pathname === '/projects' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                    Projects
                  </Link>
                </motion.div>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 sm:ml-4 px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              onClick={() => isHomePage ? scrollToSection('contact') : null}
            >
              {isHomePage ? (
                <span>Contact Me</span>
              ) : (
                <Link to="/#contact">Contact Me</Link>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none bg-gray-800/80 p-2 rounded-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              ref={mobileMenuRef}
              className="md:hidden fixed left-0 right-0 mx-4 mt-4 bg-gray-800/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl z-50"
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col p-2 sm:p-4">
                {isHomePage ? (
                  // Show section links on home page
                  navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={`#${link.section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.section);
                      }}
                      className={`py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-300 text-sm sm:text-base ${
                        activeSection === link.section
                          ? 'text-blue-400 bg-blue-900/20'
                          : 'text-white hover:bg-gray-700/50'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.name}
                    </motion.a>
                  ))
                ) : (
                  // Show basic navigation on other pages
                  <>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <Link to="/" className="block py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-300 text-sm sm:text-base text-white hover:bg-gray-700/50">
                        Home
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link to="/projects" className={`block py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-300 text-sm sm:text-base ${location.pathname === '/projects' ? 'text-blue-400 bg-blue-900/20' : 'text-white hover:bg-gray-700/50'}`}>
                        Projects
                      </Link>
                    </motion.div>
                  </>
                )}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isHomePage ? navLinks.length * 0.05 : 0.15 }}
                >
                  {isHomePage ? (
                    <button
                      className="w-full mt-2 sm:mt-3 py-2.5 sm:py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                      onClick={() => scrollToSection('contact')}
                    >
                      Contact Me
                    </button>
                  ) : (
                    <Link to="/#contact" className="block w-full mt-2 sm:mt-3 py-2.5 sm:py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base text-center">
                      Contact Me
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;