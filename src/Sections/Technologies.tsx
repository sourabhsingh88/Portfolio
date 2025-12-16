import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaPython, FaJava, FaJs, FaDatabase, 
  FaTools, FaDesktop, FaCode, FaChartBar, FaCloud
} from 'react-icons/fa';
import { SiNumpy, SiPandas, SiTensorflow, SiScikitlearn, SiMongodb, SiReact, SiNodedotjs} from 'react-icons/si';

const Technologies = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      // setIsMobile(window.innerWidth < 768);
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: { 
        duration: 0.7,
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      y: -15,
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0px 20px 40px rgba(59, 130, 246, 0.3)",
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.2
      } 
    },
    hover: { 
      scale: 1.2,
      rotate: 10,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const tabVariants = {
    inactive: { 
      opacity: 0.6,
      scale: 0.9,
      y: 0,
      backgroundColor: "rgba(55, 65, 81, 0.3)"
    },
    active: { 
      opacity: 1,
      scale: 1.05,
      y: -2,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Programming Languages & Tools
  const programmingSkills = [
    { 
      name: "Java", 
      icon: <FaJava />,
      level: 90,
      color: "from-red-500 to-orange-400",
      description: "Proficient in Java programming with Spring Boot, Spring MVC, and enterprise application development.",
      libraries: [
        { name: "Spring Boot", icon: <FaTools /> },
        { name: "Spring MVC", icon: <FaTools /> },
        { name: "JPA/Hibernate", icon: <FaDatabase /> }
      ]
    },
    { 
      name: "Python", 
      icon: <FaPython />,
      level: 90,
      color: "from-blue-500 to-cyan-400",
      description: "Expert in Python with FastAPI, Flask, and AI/ML libraries for automation and trading systems.",
      libraries: [
        { name: "FastAPI", icon: <FaTools /> },
        { name: "Flask", icon: <FaTools /> },
        { name: "NumPy", icon: <SiNumpy /> },
        { name: "Pandas", icon: <SiPandas /> },
        { name: "Scikit-learn", icon: <SiScikitlearn /> }
      ]
    },
    { 
      name: "Spring Boot", 
      icon: <FaTools />,
      level: 90,
      color: "from-green-500 to-emerald-400",
      description: "Enterprise application development with Spring Boot, achieving 30% performance improvements.",
      libraries: [
        { name: "Spring MVC", icon: <FaTools /> },
        { name: "JPA/Hibernate", icon: <FaDatabase /> },
        { name: "REST APIs", icon: <FaCode /> }
      ]
    },
    { 
      name: "FastAPI", 
      icon: <FaTools />,
      level: 90,
      color: "from-purple-500 to-violet-400",
      description: "High-performance API development with FastAPI, supporting 10,000+ requests/day.",
      libraries: [
        { name: "Pydantic", icon: <FaTools /> },
        { name: "MetaTrader5", icon: <FaTools /> },
        { name: "Automation", icon: <FaTools /> }
      ]
    },
    { 
      name: "SQL", 
      icon: <FaDatabase />,
      level: 85,
      color: "from-yellow-500 to-amber-400",
      description: "Skilled in MySQL and Oracle databases with complex queries and database administration.",
      libraries: [
        { name: "MySQL", icon: <FaDatabase /> },
        { name: "Oracle", icon: <FaDatabase /> }
      ]
    },
    { 
      name: "HTML/CSS", 
      icon: <FaDesktop />,
      level: 80,
      color: "from-cyan-500 to-teal-400",
      description: "Frontend development with HTML, CSS, and responsive web design."
    }
  ];

  // Technical Skills
  const technicalSkills = [
    { 
      name: "REST APIs", 
      icon: <FaCode />,
      level: 90,
      color: "from-green-500 to-emerald-400",
      description: "Developed 10+ RESTful APIs with optimized queries and JPA/Hibernate integration."
    },
    { 
      name: "AI/ML", 
      icon: <FaChartBar />,
      level: 90,
      color: "from-blue-500 to-indigo-400",
      description: "Machine learning expertise with MobileNet v2, achieving 85%+ accuracy improvements."
    },
    { 
      name: "OOP", 
      icon: <FaDesktop />,
      level: 85,
      color: "from-yellow-500 to-amber-400",
      description: "Strong understanding of Object-Oriented Programming concepts and design patterns."
    },
    { 
      name: "Data Structures & Algorithms", 
      icon: <FaCode />,
      level: 85,
      color: "from-red-500 to-rose-400",
      description: "Proficient in implementing and optimizing algorithms for complex problem-solving."
    },
    { 
      name: "SDLC", 
      icon: <FaCloud />,
      level: 80,
      color: "from-purple-500 to-violet-400",
      description: "Experience in Software Development Life Cycle methodologies and best practices."
    },
    { 
      name: "DevOps", 
      icon: <FaTools />,
      level: 75,
      color: "from-cyan-500 to-teal-400",
      description: "Experience in Docker containerization, CI/CD practices, and automated testing."
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[120px] opacity-10"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-[120px] opacity-10"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-blue-400 rounded-full filter blur-[10px] opacity-20"></div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-purple-400 rounded-full filter blur-[15px] opacity-20"></div>
      
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
        id="technologies" 
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
              <span className="text-blue-400 font-medium">My Skills</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
              A comprehensive showcase of my technical skills and proficiencies across various programming languages,
              frameworks, and domains.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            className="flex justify-center mb-12"
            variants={itemVariants}
          >
            <div className="inline-flex bg-gray-800/50 p-1 rounded-lg">
              <motion.button
                className={`px-6 py-2 rounded-md text-sm font-medium ${activeTab === 0 ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab(0)}
                variants={tabVariants}
                animate={activeTab === 0 ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Programming Skills
              </motion.button>
              <motion.button
                className={`px-6 py-2 rounded-md text-sm font-medium ${activeTab === 1 ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab(1)}
                variants={tabVariants}
                animate={activeTab === 1 ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Technical Skills
              </motion.button>
            </div>
          </motion.div>

          {/* Programming Languages & Tools */}
          <motion.div 
            className={`${activeTab === 0 ? 'block' : 'hidden'}`}
            variants={containerVariants}
            initial="hidden"
            animate={activeTab === 0 ? 'visible' : 'hidden'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programmingSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg backdrop-blur-sm"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="text-4xl text-blue-400 mr-4 bg-blue-500/10 p-3 rounded-lg"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        {skill.icon}
                      </motion.div>
                      <div>
                        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{skill.name}</h4>
                        <div className="mt-1 w-full bg-gray-700/50 rounded-full h-2">
                          <motion.div 
                            className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                            style={{ width: `${skill.level}%` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{skill.description}</p>
                    
                    {skill.libraries && (
                      <div className="mt-4">
                        <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                          <span className="w-5 h-0.5 bg-blue-500 mr-2"></span>
                          Libraries & Frameworks
                        </h5>
                        <div className="flex flex-wrap gap-3">
                          {skill.libraries.map((lib, libIndex) => (
                            <motion.div 
                              key={libIndex}
                              className="flex items-center bg-gray-800/70 px-3 py-1 rounded-full border border-gray-700/50"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (libIndex * 0.1) }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
                            >
                              <span className="text-blue-400 mr-2">{lib.icon}</span>
                              <span className="text-sm">{lib.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            className={`${activeTab === 1 ? 'block' : 'hidden'}`}
            variants={containerVariants}
            initial="hidden"
            animate={activeTab === 1 ? 'visible' : 'hidden'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg backdrop-blur-sm"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="text-4xl text-blue-400 mr-4 bg-blue-500/10 p-3 rounded-lg"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        {skill.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{skill.name}</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex-1 bg-gray-700/50 rounded-full h-2 mr-2">
                            <motion.div 
                              className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                              style={{ width: `${skill.level}%` }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              viewport={{ once: true }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Radar Chart (Optional) */}
          <motion.div 
            className="mt-20 text-center"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Skills Overview</h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {[...programmingSkills, ...technicalSkills].map((skill, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/70 to-gray-900/70 border border-gray-700/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <span className="text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Technologies;