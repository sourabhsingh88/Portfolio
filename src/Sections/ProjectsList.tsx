import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLaptopCode,
  FaArrowLeft,
  FaChartLine,
  FaSearch,
  FaMap,
  FaRobot,
  FaHospital,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ALL_PROJECTS = [
  {
    title: 'Automated Trading Engine',
    category: 'ALGORITHMIC SYSTEMS',
    description:
      'Engineered an automated trading bot using FastAPI, MetaTrader5, and Python. Performs backtesting on historical data, achieving 25–30% higher returns compared to manual strategies.',
    icon: <FaChartLine />,
    metrics: '+25–30% Returns | 10k+ Req/Day',
    technologies: ['Python', 'FastAPI', 'MetaTrader5', 'Pydantic', 'AsyncIO'],
    github: 'https://github.com/sourabhsingh88/Trading_Platform',
    live: 'https://github.com/sourabhsingh88/Trading_Platform',
  },
  {
    title: 'Neural Image Search Engine',
    category: 'COMPUTER VISION',
    description:
      'Created an ML-powered image search engine using MobileNet v2, boosting retrieval accuracy by 85%+. Optimized high-dimensional cosine similarity calculations, cutting query latency by 40%.',
    icon: <FaSearch />,
    metrics: '85%+ Accuracy | 40% Latency Cut',
    technologies: ['Python', 'Flask', 'MobileNet v2', 'Cosine Similarity', 'Scikit-learn'],
    github: 'https://github.com/sourabhsingh88/ImageSearchEngine',
    live: 'https://github.com/sourabhsingh88/ImageSearchEngine',
  },
  {
    title: 'Enterprise Trip Planner Platform',
    category: 'FULL-STACK ENTERPRISE',
    description:
      'Designed and deployed a full-stack web app for trip management with role-based access (Admin, Planner, User). Built 10+ RESTful APIs in Spring Boot, improving data handling speed by 30%.',
    icon: <FaMap />,
    metrics: '10+ REST APIs | 20+ Tables',
    technologies: ['Spring Boot', 'Angular', 'MySQL', 'JPA/Hibernate', 'SDLC'],
    github: 'https://github.com/sourabhsingh88/Trip--Planner',
    live: 'https://github.com/sourabhsingh88/Trip--Planner',
  },
  {
    title: 'AI Image Recognition & Voice Narration',
    category: 'GENERATIVE AI',
    description:
      'An AI-powered Image Recognition web application integrating Google Gemini AI and Google Text-to-Speech (gTTS) for multimodal descriptive reasoning and accessibility voice output.',
    icon: <FaRobot />,
    metrics: 'Multimodal Stream | <1.2s Inference',
    technologies: ['Python', 'Flask', 'Google Gemini AI', 'gTTS', 'Pillow'],
    github: 'https://github.com/sourabhsingh88/Image-recognition',
    live: 'https://github.com/sourabhsingh88/Image-recognition',
  },
  {
    title: 'CRM – Property Management Platform',
    category: 'ENTERPRISE CRM',
    description:
      'Real-estate management system to track property listings, leads, and client interactions. Implemented FastAPI-based backend services with Angular frontend for scalable data operations.',
    icon: <FaHospital />,
    metrics: 'Lead Pipeline | JWT Security',
    technologies: ['Python', 'FastAPI', 'Angular', 'MySQL', 'Relational DB'],
    github: 'https://github.com/sourabhsingh88/CRM-Property',
    live: 'https://github.com/sourabhsingh88/CRM-Property',
  },
  {
    title: 'Fit Plan Hub Platform',
    category: 'COMMERCE & SUBSCRIPTION',
    description:
      'Full-stack fitness platform connecting users with verified trainers. Features subscription tiers, trainer dashboard, feed streams, and automated scheduling.',
    icon: <FaLaptopCode />,
    metrics: 'Subscription Auth | Dashboard Ops',
    technologies: ['Python', 'FastAPI', 'Angular', 'MySQL', 'RESTful Core'],
    github: 'https://github.com/sourabhsingh88/Fit_Plan_Hub',
    live: 'https://github.com/sourabhsingh88/Fit_Plan_Hub',
  },
];

export const ProjectsList: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-28 px-4 sm:px-6 lg:px-8 cyber-grid">
      {/* Background aura */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>COMPLETE SYSTEMS ARCHIVE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight">
            All <span className="text-gradient-cyan">Projects</span> & Engineering Repositories
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Full-stack enterprise backends, machine learning pipelines, high-throughput trading bots, and scalable web solutions.
          </p>

          <div className="pt-3">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono transition-colors shadow-lg"
              >
                <FaArrowLeft size={11} className="text-cyan-400" />
                <span>Return to Main Terminal</span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="bg-[#0e1320]/80 border border-cyan-500/20 hover:border-cyan-400/50 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 uppercase">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-heading mb-2 group-hover:text-cyan-200 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Metrics pill */}
                <div className="mb-4 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{project.metrics}</span>
                </div>
              </div>

              <div>
                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <FaGithub size={13} />
                    <span>View Repository</span>
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Inspect</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
