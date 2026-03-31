import { motion } from 'framer-motion';
import {
  FaEnvelope, FaPhone, FaLinkedin, FaGithub,
  FaTwitter, FaMapMarkerAlt, FaDatabase,
  FaChartBar, FaJava, FaPython, FaTools, FaDesktop
} from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      type: "Email",
      value: "devsourabh07@gmail.com",
      icon: <FaEnvelope />,
      link: "mailto:devsourabh07@gmail.com"
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
      link: "https://x.com/rajputsour5402",
      color: "bg-blue-400 hover:bg-blue-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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

  const skillBubbles = [
    { icon: <FaJava />, label: "Java & Spring Boot", color: "from-red-500 to-red-600", delay: 0 },
    { icon: <FaPython />, label: "Python & FastAPI", color: "from-blue-500 to-blue-600", delay: 0.2 },
    { icon: <FaDatabase />, label: "MySQL & Oracle", color: "from-purple-500 to-purple-600", delay: 0.4 },
    { icon: <FaChartBar />, label: "AI/ML & Computer Vision", color: "from-green-500 to-green-600", delay: 0.6 },
    { icon: <FaTools />, label: "DevOps & Testing", color: "from-yellow-500 to-yellow-600", delay: 0.8 },
    { icon: <FaDesktop />, label: "Web Development", color: "from-indigo-500 to-indigo-600", delay: 1.0 }
  ];

  const floatingBubbleVariants = {
    initial: () => ({
      x: 0,
      y: 0,
      scale: 0.8,
      opacity: 0,
      rotate: -180
    }),
    animate: (index: number) => ({
      x: [0, Math.sin(index * 0.5) * 30, Math.sin(index * 0.3) * 25, 0],
      y: [0, Math.cos(index * 0.7) * 25, Math.cos(index * 0.4) * 30, 0],
      scale: [0.8, 1.1, 0.9, 1.05, 0.8],
      opacity: [0, 1, 0.9, 1, 0.8],
      rotate: [-180, 0, 5, -5, 0],
      transition: {
        duration: 4 + index * 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }),
    hover: {
      scale: 1.3,
      rotate: 10,
      boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500 opacity-5"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-purple-500 opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Interactive Skill Bubbles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 border border-white/10 shadow-2xl flex flex-col"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              My Expertise
            </h3>

            <div className="flex justify-center items-center flex-1">
              <div className="relative w-[400px] h-[400px]">

                {/* Rings */}
                <div className="absolute w-full h-full rounded-full border border-white/10"></div>
                <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                {/* Center */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-2xl z-20"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Core Skills
                </motion.div>

                {/* Orbit Rotation */}
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {skillBubbles.map((skill, index) => {
                    const radius = 160;
                    const angle = (index / skillBubbles.length) * 2 * Math.PI;

                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                      <motion.div
                        key={index}
                        className="absolute w-28 h-28 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl flex items-center justify-center"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: "translate(-50%, -50%)"
                        }}
                      >
                        {/* Counter rotation (IMPORTANT FIX) */}
                        <motion.div
                          className="flex flex-col items-center text-white"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="text-2xl mb-1">{skill.icon}</div>
                          <div className="text-xs text-center px-2">
                            {skill.label}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <a
                href="mailto:devsourabh07@gmail.com"
                className="inline-block px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
              >
                📩 Start Your Project
              </a>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="flex items-center group"
                    variants={itemVariants}
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-600 bg-opacity-20 flex items-center justify-center mr-4 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.type}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>

              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className={`w-14 h-14 ${social.color} rounded-full flex items-center justify-center text-white text-xl shadow-md transition-all`}
                    whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800 border-opacity-30">
                <p className="text-gray-300 text-sm">
                  I'm currently available for freelance work and full-time positions.
                  If you have a project that needs some creative work, feel free to contact me.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;