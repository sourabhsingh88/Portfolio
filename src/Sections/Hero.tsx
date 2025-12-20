import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/sourabhsingh88',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/sourabh-singh-mandloi/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:sourabhsinghmandloi122@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  const scrollDownVariants = {
    initial: { y: 0 },
    animate: {
      y: 10,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 1.2 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const socialLinkVariants = {
    hover: {
      y: -5,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
      }
    }
  };

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const fullText = "Software Engineer & AIML Enthusiast";

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prevText => prevText + fullText[index]);
        setIndex(prevIndex => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      console.log(`Hero scrolling to: ${sectionId}, element:`, element);
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    } else {
      console.error(`Element with ID "${sectionId}" not found from Hero`);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Enhanced background gradients */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600 rounded-full filter blur-[150px] opacity-15 transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-600 rounded-full filter blur-[150px] opacity-15 transform -translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-1/3 left-1/4 w-[15vw] h-[15vw] max-w-[200px] max-h-[200px] bg-cyan-500 rounded-full filter blur-[120px] opacity-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] bg-indigo-500 rounded-full filter blur-[130px] opacity-10"></div>

      {/* Main content */}
      <motion.div
        id="hero"
        className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
            <motion.div
              className="w-full lg:w-1/2 space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
              variants={containerVariants}
            >
              <div className="max-w-xl mx-auto lg:mx-0">
                <motion.div
                  className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4 backdrop-blur-sm"
                  variants={itemVariants}
                >
                  <span className="text-blue-300 font-medium">Hello, I'm</span>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-3"
                  variants={itemVariants}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
                    Sourabh Singh Mandloi
                  </span>
                </motion.h1>

                <motion.div
                  className="h-auto min-h-[40px] sm:min-h-[48px] mb-5 overflow-visible"
                  variants={itemVariants}
                >
                  <div className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium flex flex-wrap justify-center lg:justify-start">
                    <span className="break-words">{text}</span>
                    <motion.span
                      variants={cursorVariants}
                      animate="blinking"
                      className="inline-block w-[3px] h-[1em] bg-blue-400 ml-1"
                    />
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
                  variants={itemVariants}
                >
                  As a passionate Web Developer and AI/ML enthusiast, I enjoy transforming complex challenges into simple, user-friendly solutions.
                  By blending intelligent technology with modern web development, I strive to build applications that are not only technically robust but also deliver a meaningful business impact.

                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start pt-2"
                  variants={itemVariants}
                >
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 transition-all duration-300 px-4 py-2.5 rounded-lg border border-gray-700/50 backdrop-blur-sm ${link.color}`}
                      variants={socialLinkVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {link.icon} <span className="hidden sm:inline">{link.name}</span>
                    </motion.a>
                  ))}
                </motion.div>

                <motion.div
                  className="pt-8 space-y-3 text-gray-300"
                  variants={itemVariants}
                >
                  <motion.div
                    className="flex items-center gap-3 justify-center lg:justify-start"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-500/30 flex items-center justify-center backdrop-blur-sm">
                      <FaEnvelope className="text-blue-300" />
                    </div>
                    <span className="tracking-wide text-sm sm:text-base">sourabhsinghmandloi122@gmail.com</span>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="pt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                  variants={itemVariants}
                >
                  <motion.a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('projects');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-900/20 inline-flex items-center gap-2 transition-all duration-300"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View My Work
                  </motion.a>

                  <motion.a
                    href="/Sourabh-Resume.pdf"
                    className="bg-gray-800/80 hover:bg-gray-700 border border-gray-700/50 px-6 py-3 rounded-lg font-medium shadow-lg backdrop-blur-sm inline-flex items-center gap-2 transition-all duration-300"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    download
                  >
                    <FaDownload className="text-blue-400" />
                    Download CV
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0"
              variants={containerVariants}
            >
              <div className="relative">
                {/* Animated background circles */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20"
                  style={{ translateX: "-50%", translateY: "-50%" }}
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 5,
                      ease: "easeInOut"
                    }
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/10"
                  style={{ translateX: "-50%", translateY: "-50%" }}
                  animate={{
                    scale: [1.05, 1, 1.05],
                    rotate: [0, -5, 0],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 6,
                      ease: "easeInOut"
                    }
                  }}
                />

                {/* Profile picture/avatar container */}
                <motion.div
                  className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full overflow-hidden border-4 border-gray-800/80 shadow-2xl backdrop-blur-sm"
                  variants={imageVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30"></div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-8xl text-blue-300 font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <img src="sourabh-profile.jpg" alt="" />
                  </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-0 right-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-500/20 backdrop-blur-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.7 }}
                />
                <motion.div
                  className="absolute bottom-4 left-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/40 to-indigo-500/20 backdrop-blur-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.7 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-4 w-5 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/10 backdrop-blur-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.7 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-blue-300"
        initial="initial"
        animate="animate"
        variants={scrollDownVariants}
      >
        <span className="text-sm mb-2 text-gray-300">Scroll Down</span>
        <FaArrowDown />
      </motion.div>
    </div>
  );
};

export default Hero;