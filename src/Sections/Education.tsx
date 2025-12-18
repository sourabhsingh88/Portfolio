import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaGraduationCap, FaUniversity, FaCalendarAlt, FaMedal, 
  
} from 'react-icons/fa';

const Education = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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

  const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -5,
      boxShadow: "0px 10px 30px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const educationData = [
    {
      id: 1,
      degree: "B.Tech., AIML (Minor in Computer Science and Engineering)",
      institution: "Institute of Engineering And Technology, Indore",
      location: "Indore, MP",
      duration: "July 2022 - June 2026",
      grade: "CGPA: 6.8/10",
      icon: <FaGraduationCap className="text-2xl" />,
      achievements: [
        "AWS Academy Graduate - Machine Learning Foundations",
        "Cognitive Classes - SQL and Relational Databases",
        "Oracle - Cloud Database Services 2025 Certified Professional",
        "NVIDIA - NLP"
      ],
      courses: [
        "Artificial Intelligence & Machine Learning",
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Computer Vision and Deep Learning",
        "NLP"
      ],
      skills: ["Java", "Python", "MySQL", "AI/ML", "Spring Boot", "FastAPI"]
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (XII CBSE)",
      institution: "Sandapi Academy",
      location: "Mandleshwar, Madhya Pradesh",
      duration: "2022",
      grade: "Score: 64%",
      icon: <FaGraduationCap className="text-2xl" />,
      achievements: [
        "School topper in Mathematics and Computer Science",
        "Participated in state-level science exhibition",
        "Active member of the school's coding club"
      ],
      courses: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Computer Science"
      ],
      skills: ["C++", "Basic Web Development", "Problem Solving"]
    }
  ];

  const backgroundShapes = [
    { top: '15%', left: '5%', size: '120px', delay: 0 },
    { top: '65%', left: '8%', size: '180px', delay: 0.5 },
    { top: '25%', right: '5%', size: '150px', delay: 0.2 },
    { top: '75%', right: '10%', size: '100px', delay: 0.7 }
  ];

  return (
    <motion.div 
      id="education" 
      className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      {backgroundShapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-blue-500 opacity-5"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ 
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "reverse" as const
          }}
        />
      ))}

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Education</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            My academic journey has equipped me with a strong foundation in Artificial Intelligence, Machine Learning, and software development.
          </p>
        </motion.div>

        {/* Mobile View */}
        {isMobile && (
          <div className="space-y-10 max-w-md mx-auto">
            {educationData.map((education, idx) => (
              <motion.div 
                key={idx}
                className={`relative ${idx !== 0 ? 'mt-8' : ''}`}
                variants={itemVariants}
              >
                <motion.div 
                  className="p-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700 shadow-lg"
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => setExpandedCard(expandedCard === education.id ? null : education.id)}
                >
                  {/* Decorative elements */}
                  <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-blue-500 opacity-10"></div>
                  <div className="absolute -left-2 -bottom-2 w-12 h-12 rounded-full bg-purple-500 opacity-10"></div>
                  
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {education.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{education.degree}</h3>
                      <div className="text-gray-300 mt-1">
                        <div className="flex items-center gap-2">
                          <FaUniversity className="text-blue-400" />
                          <span>{education.institution}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full">
                      <FaMedal className="text-yellow-500" />
                      <span className="text-gray-300 text-sm">{education.grade}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full">
                      <FaCalendarAlt className="text-blue-400" />
                      <span className="text-gray-300 text-sm">{education.duration}</span>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {expandedCard === education.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-4 border-t border-gray-700"
                      >
                        {/* Achievements */}
                         {/* <div className="mb-4">
                          <h4 className="text-md font-semibold text-blue-300 flex items-center gap-2 mb-2">
                            <FaAward /> Achievements
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {education.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-blue-400 mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div> */}
                        
                        {/* Courses */}
                        {/* <div className="mb-4">
                          <h4 className="text-md font-semibold text-blue-300 flex items-center gap-2 mb-2">
                            <FaBook /> Key Courses
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {education.courses.map((course, i) => (
                              <span key={i} className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                                {course}
                              </span>
                            ))}
                          </div>
                        </div> */}
                        
                        {/* Skills */}
                        {/* <div>
                          <h4 className="text-md font-semibold text-blue-300 flex items-center gap-2 mb-2">
                            <FaLaptop /> Skills Gained
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {education.skills.map((skill, i) => (
                              <span key={i} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div> */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Expand/collapse indicator */}
                  {/* <div className="mt-4 text-center">
                    <motion.div
                      className="inline-block text-blue-400 text-sm"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: expandedCard === education.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedCard === education.id ? '▲' : '▼'} {expandedCard === education.id ? 'Show Less' : 'Show More'}
                    </motion.div>
                  </div> */}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Desktop View */}
        {!isMobile && (
          <div className="max-w-4xl mx-auto">
            {/* Timeline container */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform translate-x-[-50%] h-full w-1 bg-blue-500/30 rounded-full"></div>

              {educationData.map((education, idx) => (
                <motion.div 
                  key={idx}
                  className={`relative mb-16 ${idx === educationData.length - 1 ? 'mb-0' : ''}`}
                  variants={itemVariants}
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform translate-x-[-50%] w-5 h-5 rounded-full bg-blue-500 border-4 border-gray-900 z-10">
                      <motion.div 
                        className="absolute w-full h-full rounded-full bg-blue-400"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Card */}
                    <motion.div 
                      className={`${
                        idx % 2 === 0 
                          ? 'ml-8 mr-auto w-[calc(50%-2rem)] text-right' 
                          : 'mr-8 ml-auto w-[calc(50%-2rem)]'
                      } p-6 bg-gradient-to-r ${
                        idx % 2 === 0 
                          ? 'from-gray-900/80 to-gray-800/80' 
                          : 'from-gray-800/80 to-gray-900/80'
                      } rounded-lg border border-gray-700 shadow-lg relative overflow-hidden`}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => setExpandedCard(expandedCard === education.id ? null : education.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Decorative elements */}
                      <div className={`absolute ${idx % 2 === 0 ? '-left-10' : '-right-10'} -bottom-10 w-40 h-40 bg-blue-500 opacity-5 rounded-full`}></div>
                      <div className={`absolute ${idx % 2 === 0 ? '-right-10' : '-left-10'} -top-10 w-32 h-32 bg-purple-500 opacity-5 rounded-full`}></div>
                      
                      <div className={`flex flex-col ${idx % 2 === 0 ? 'sm:flex-row-reverse sm:items-center' : 'sm:flex-row sm:items-center'} gap-4 mb-3 relative z-10`}>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex-shrink-0">
                          {education.icon}
                        </div>
                        <div className={idx % 2 === 0 ? 'text-right' : 'text-left'}>
                          <h3 className="text-xl font-bold text-blue-400">{education.degree}</h3>
                          <div className={`flex items-center gap-2 text-gray-300 mt-1 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                            <FaUniversity className="text-blue-400" />
                            <span>{education.institution}</span>
                          </div>
                          <div className="text-sm text-gray-400">{education.location}</div>
                        </div>
                      </div>
                      
                      <div className={`flex flex-wrap gap-4 mt-4 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full">
                          <FaMedal className="text-yellow-500" />
                          <span className="text-gray-300">{education.grade}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full">
                          <FaCalendarAlt className="text-blue-400" />
                          <span className="text-gray-300">{education.duration}</span>
                        </div>
                      </div>

                      {/* Expandable content */}
                      <AnimatePresence>
                        {expandedCard === education.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                            className={`mt-6 pt-4 border-t border-gray-700 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}
                          >
                            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Achievements */}
                              {/* <div>
                                <h4 className={`text-md font-semibold text-blue-300 flex items-center gap-2 mb-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                  {idx % 2 === 0 ? (
                                    <>Achievements <FaAward /></>
                                  ) : (
                                    <><FaAward /> Achievements</>
                                  )}
                                </h4>
                                <ul className={`space-y-1 text-sm text-gray-300 ${idx % 2 === 0 ? 'pl-0' : 'pl-0'}`}>
                                  {education.achievements.map((achievement, i) => (
                                    <li key={i} className={`flex items-start gap-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                      {idx % 2 === 0 ? (
                                        <>
                                          <span>{achievement}</span>
                                          <span className="text-blue-400 mt-1">•</span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="text-blue-400 mt-1">•</span>
                                          <span>{achievement}</span>
                                        </>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div> */}
                              
                              {/* Courses */}
                              {/* <div>
                                <h4 className={`text-md font-semibold text-blue-300 flex items-center gap-2 mb-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                  {idx % 2 === 0 ? (
                                    <>Key Courses <FaBook /></>
                                  ) : (
                                    <><FaBook /> Key Courses</>
                                  )}
                                </h4>
                                <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                  {education.courses.map((course, i) => (
                                    <span key={i} className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                                      {course}
                                    </span>
                                  ))}
                                </div>
                              </div> */}
                              
                              {/* Skills */}
                              {/* <div>
                                <h4 className={`text-md font-semibold text-blue-300 flex items-center gap-2 mb-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                  {idx % 2 === 0 ? (
                                    <>Skills Gained <FaLaptop /></>
                                  ) : (
                                    <><FaLaptop /> Skills Gained</>
                                  )}
                                </h4>
                                <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                  {education.skills.map((skill, i) => (
                                    <span key={i} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div> */}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Expand/collapse indicator */}
                      {/* <div className={`mt-4 text-center ${expandedCard === education.id ? 'pb-2' : ''}`}>
                        <motion.div
                          className="inline-block text-blue-400 text-sm"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: expandedCard === education.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {expandedCard === education.id ? '▲' : '▼'} {expandedCard === education.id ? 'Show Less' : 'Show More'}
                        </motion.div>
                      </div> */}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Education;