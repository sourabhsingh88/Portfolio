import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaGithub, FaExternalLinkAlt, FaLaptopCode, FaPython, 
   FaDatabase, FaRobot, FaArrowRight, FaChartLine, 
  FaSearch, FaMap, FaTools, FaDesktop, FaCode
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const projects = [
    {
      title: "Automated Trading Platform",
      description: "Engineered an automated trading bot using FastAPI, MetaTrader5, and Python to execute trades with custom strategies. Performed backtesting on historical data, achieving 25–30% higher returns compared to manual strategies.",
      icon: <FaChartLine />,
      technologies: [
        { name: "Python", icon: <FaPython /> },
        { name: "FastAPI", icon: <FaTools /> },
        { name: "MetaTrader5", icon: <FaChartLine /> },
        { name: "Pydantic", icon: <FaTools /> }
      ],
      highlights: [
        "Achieved 25-30% higher returns compared to manual strategies",
        "Implemented risk management features reducing manual errors by 80%",
        "Developed scalable APIs supporting 10,000+ simulated requests/day",
        "Performed comprehensive backtesting on historical data"
      ],
      links: [
        { type: "github", url: "https://github.com/sourabhsingh88/TradingBot", icon: <FaGithub /> },
        { type: "live", url: "#", icon: <FaExternalLinkAlt /> }
      ],
      bgColor: "from-green-900/20 to-blue-900/20"
    },
    {
      title: "Image Search Engine",
      description: "Created an ML-powered image search engine using MobileNet, boosting retrieval accuracy by 85%+. Optimized the search pipeline with cosine similarity, cutting query time by 40%.",
      icon: <FaSearch />,
      technologies: [
        { name: "Python", icon: <FaPython /> },
        { name: "Flask", icon: <FaTools /> },
        { name: "MobileNET v2", icon: <FaRobot /> },
        { name: "Machine Learning", icon: <FaLaptopCode /> }
      ],
      highlights: [
        "Boosted retrieval accuracy by 85%+ using MobileNet",
        "Optimized search pipeline cutting query time by 40%",
        "Implemented cosine similarity for efficient matching",
        "Achieved 100% code coverage with comprehensive testing"
      ],
      links: [
        { type: "github", url: "https://github.com/sourabhsingh88/ImageSearchEngine", icon: <FaGithub /> },
        { type: "live", url: "#", icon: <FaExternalLinkAlt /> }
      ],
      bgColor: "from-purple-900/20 to-pink-900/20"
    },
    {
      title: "Trip Planner",
      description: "Designed and deployed a full-stack web app for trip management with role-based access (Admin, Planner, User). Built 10+ RESTful APIs in Spring Boot, improving data handling speed by 30% with optimized queries and JPA/Hibernate.",
      icon: <FaMap />,
      technologies: [
        { name: "Spring Boot", icon: <FaTools /> },
        { name: "Angular", icon: <FaDesktop /> },
        { name: "MySQL", icon: <FaDatabase /> },
        { name: "SDLC", icon: <FaCode /> }
      ],
      highlights: [
        "Built 10+ RESTful APIs improving data handling speed by 30%",
        "Implemented role-based access control (Admin, Planner, User)",
        "Developed 10+ Angular components enhancing UX by 25%",
        "Integrated MySQL with 20+ normalized tables for consistent data management"
      ],
      links: [
        { type: "github", url: "https://github.com/sourabhsingh88/Trip--Planner", icon: <FaGithub /> },
        { type: "live", url: "#", icon: <FaExternalLinkAlt /> }
      ],
      bgColor: "from-blue-900/20 to-cyan-900/20"
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[120px] opacity-10"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-[120px] opacity-10"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-blue-400 rounded-full filter blur-[10px] opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-purple-400 rounded-full filter blur-[15px] opacity-20"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 15 - 7, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div 
        
        className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4"
            >
              <span className="text-blue-400 font-medium">My Work</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
              A showcase of my recent projects, demonstrating my skills in data science, 
              machine learning, and full-stack development.
            </p>
          </motion.div>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="relative"
                variants={projectVariants}
                whileHover={isMobile ? undefined : "hover"}
              >
                <div className={`flex flex-col lg:flex-row gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Project Icon/Image */}
                  <motion.div 
                    className={`flex-shrink-0 w-full lg:w-1/3 aspect-video bg-gradient-to-br ${project.bgColor} rounded-xl border border-blue-800/30 flex items-center justify-center overflow-hidden shadow-lg relative group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Animated background elements */}
                    <motion.div 
                      className="absolute w-32 h-32 rounded-full bg-blue-500/20 top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.div 
                      className="absolute w-24 h-24 rounded-full bg-purple-500/20 bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                      }}
                    />
                    
                    <div className="text-8xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    
                    {/* Hover overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="text-center p-4">
                        <p className="text-white font-medium mb-4">View Project Details</p>
                        <div className="flex justify-center space-x-4">
                          {project.links.map((link, linkIdx) => (
                            <motion.a
                              key={linkIdx}
                              href={link.url}
                              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                              whileHover={{ y: -3 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {link.icon}
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Project Content */}
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{project.title}</h3>
                      <p className="text-gray-300 mb-6">{project.description}</p>
                    </motion.div>
                    
                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                        <span className="w-5 h-0.5 bg-blue-500 mr-2"></span>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div 
                            key={techIndex}
                            className="flex items-center bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full border border-gray-700"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (techIndex * 0.1) }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
                          >
                            <span className="text-blue-400 mr-2">{tech.icon}</span>
                            <span className="text-sm">{tech.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                        <span className="w-5 h-0.5 bg-blue-500 mr-2"></span>
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.highlights.map((highlight, hiIndex) => (
                          <motion.li 
                            key={hiIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + (hiIndex * 0.1) }}
                            viewport={{ once: true }}
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-blue-400 mr-2 mt-1">•</span>
                            <span className="text-gray-300 text-sm">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-4">
                      {project.links.map((link, linkIndex) => (
                        <motion.a
                          key={linkIndex}
                          href={link.url}
                          className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-2">{link.icon}</span>
                          <span>{link.type === 'github' ? 'View Code' : 'Live Demo'}</span>
                          <motion.span 
                            className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ x: -5 }}
                            whileHover={{ x: 0 }}
                          >
                            <FaArrowRight />
                          </motion.span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className={`absolute ${index % 2 === 0 ? '-left-4' : '-right-4'} top-1/2 w-8 h-8 rounded-full bg-blue-500 opacity-10 hidden lg:block`}></div>
                <div className={`absolute ${index % 2 === 0 ? '-right-4' : '-left-4'} top-1/3 w-12 h-12 rounded-full bg-purple-500 opacity-10 hidden lg:block`}></div>
                
                {/* Connection line between projects */}
                {index < projects.length - 1 && (
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-500/30 to-transparent bottom-0 translate-y-full hidden lg:block"
                    initial={{ height: 0 }}
                    whileInView={{ height: 80 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* More projects button */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/projects">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
                <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;