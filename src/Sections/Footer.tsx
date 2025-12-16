import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone, 
  FaHeart, FaCode, FaArrowUp, FaMapMarkerAlt, FaCopyright
} from 'react-icons/fa';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/sourabh-singh-mandloi/",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      link: "https://github.com/sourabhsingh88",
      color: "bg-gray-800 hover:bg-gray-900"
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      link: "#",
      color: "bg-blue-400 hover:bg-blue-500"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Technologies", href: "#technologies" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const contactInfo = [
    {
      type: "Email",
      value: "sourabhsinghmandloi122@gmail.com",
      icon: <FaEnvelope />,
      link: "mailto:sourabhsinghmandloi122@gmail.com"
    },
    {
      type: "Phone",
      value: "9755826293",
      icon: <FaPhone />,
      link: "tel:+919755826293"
    },
    {
      type: "Location",
      value: "Indore, Madhya Pradesh, India",
      icon: <FaMapMarkerAlt />,
      link: "#"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-6 border-t border-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500 opacity-5"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-purple-500 opacity-5"></div>
      
      {/* Scroll to top button */}
      <motion.button
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg z-50 ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: showScrollTop ? 0 : 100, 
          opacity: showScrollTop ? 1 : 0,
          transition: { duration: 0.3 }
        }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`${isMobile ? 'space-y-10' : 'grid grid-cols-1 md:grid-cols-3 gap-10'} mb-12`}>
          {/* About Column */}
          <div className="bg-gray-800 bg-opacity-30 p-6 rounded-lg border border-gray-700 h-full">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700 inline-block">Sourabh Singh</h3>
            <p className="text-gray-300 mb-6">
              Software Engineer & AIML Enthusiast passionate about creating innovative solutions 
              and exploring the world of technology.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white shadow-md transition-all`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-800 bg-opacity-30 p-6 rounded-lg border border-gray-700 h-full">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700 inline-block">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors py-2 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-800 bg-opacity-30 p-6 rounded-lg border border-gray-700 h-full">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700 inline-block">Contact</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mr-3 text-blue-400">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{info.type}</p>
                    <p className="text-sm">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-gray-400 text-sm">
            <div className="flex items-center mb-4 md:mb-0">
              <FaCopyright className="mr-2" />
              <p>{currentYear} Sourabh Singh. All rights reserved.</p>
            </div>
            
            <div className="flex items-center">
              <p>Made with</p>
              <FaHeart className="mx-1 text-red-500" />
              <p>and</p>
              <FaCode className="mx-1 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;