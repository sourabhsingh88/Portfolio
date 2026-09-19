import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChartLine,
  FaSearch,
  FaMap,
  FaRobot,
  FaArrowRight,
  FaServer,
  FaCheckCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  category: 'ai' | 'backend' | 'fullstack';
  badge: string;
  description: string;
  architecture: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  github: string;
  live: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    id: 'trading-bot',
    title: 'Automated Trading Engine',
    category: 'backend',
    badge: 'ALGORITHMIC & HIGH-FREQUENCY',
    description:
      'Engineered an event-driven automated trading platform using FastAPI, MetaTrader5 API, and Python. Performs backtesting against years of historical tick data with dynamic stop-loss calculations and risk management.',
    architecture:
      'Async FastAPI server communicating with MetaTrader5 terminal via IPC, executing rule-based signals and WebSocket telemetry.',
    metrics: [
      { label: 'Returns vs Manual', value: '+25–30%' },
      { label: 'Manual Error Cut', value: '-80%' },
      { label: 'Throughput', value: '10,000+ Req/Day' },
    ],
    tags: ['FastAPI', 'MetaTrader5', 'Python', 'Pydantic', 'AsyncIO', 'Algorithmic Trading'],
    github: 'https://github.com/sourabhsingh88/Trading_Platform',
    live: 'https://github.com/sourabhsingh88/Trading_Platform',
    icon: <FaChartLine />,
    gradient: 'from-emerald-900/30 via-[#0e1626] to-[#0a0f1d]',
    glow: 'rgba(0, 255, 136, 0.25)',
  },
  {
    id: 'image-search',
    title: 'Neural Image Search Engine',
    category: 'ai',
    badge: 'COMPUTER VISION & VECTOR EMBEDDINGS',
    description:
      'ML-driven image similarity engine utilizing MobileNet v2 convolutional neural feature vectors. Implemented high-dimensional cosine similarity indexing to deliver sub-second visual query matching.',
    architecture:
      'Flask microservice wrapping TensorFlow MobileNet feature extractor with cached vector index and normalized cosine similarity matrix.',
    metrics: [
      { label: 'Retrieval Accuracy', value: '85%+' },
      { label: 'Latency Reduction', value: '40%' },
      { label: 'Test Coverage', value: '100%' },
    ],
    tags: ['Python', 'MobileNet v2', 'Cosine Similarity', 'Flask', 'Scikit-learn', 'PyTest'],
    github: 'https://github.com/sourabhsingh88/ImageSearchEngine',
    live: 'https://github.com/sourabhsingh88/ImageSearchEngine',
    icon: <FaSearch />,
    gradient: 'from-purple-900/30 via-[#0e1626] to-[#0a0f1d]',
    glow: 'rgba(168, 85, 247, 0.25)',
  },
  {
    id: 'trip-planner',
    title: 'Enterprise Trip Planner Platform',
    category: 'fullstack',
    badge: 'DISTRIBUTED FULL-STACK & CLOUD',
    description:
      'Full-stack enterprise application for end-to-end trip itinerary and resource management. Features multi-tier role-based access control (Admin, Planner, Traveler) and optimized relational query layers.',
    architecture:
      'Spring Boot REST architecture with JPA/Hibernate ORM connected to MySQL 20+ normalized tables, consumed by an Angular UI.',
    metrics: [
      { label: 'RESTful Endpoints', value: '10+ APIs' },
      { label: 'Query Performance', value: '+30% Speed' },
      { label: 'Schema Architecture', value: '20+ Tables' },
    ],
    tags: ['Spring Boot', 'Angular', 'MySQL', 'JPA/Hibernate', 'Spring Security', 'REST APIs'],
    github: 'https://github.com/sourabhsingh88/Trip--Planner',
    live: 'https://github.com/sourabhsingh88/Trip--Planner',
    icon: <FaMap />,
    gradient: 'from-blue-900/30 via-[#0e1626] to-[#0a0f1d]',
    glow: 'rgba(0, 242, 254, 0.25)',
  },
  {
    id: 'gemini-vision',
    title: 'AI Image Recognition & Multimodal TTS',
    category: 'ai',
    badge: 'GENERATIVE AI & ACCESSIBILITY',
    description:
      'Multimodal image perception application integrating Google Gemini AI and Google Text-to-Speech (gTTS). Enables instant scene analysis, semantic captioning, and voice narration for accessibility.',
    architecture:
      'Flask backend orchestrating Gemini Vision API streams with Pillow image pre-processing and audio stream generation.',
    metrics: [
      { label: 'AI Inference Time', value: '< 1.2s' },
      { label: 'Multimodal Stream', value: 'Audio + Text' },
      { label: 'Accessibility', value: 'WCAG AAA' },
    ],
    tags: ['Gemini AI', 'Flask', 'Python', 'gTTS', 'Pillow', 'Multimodal'],
    github: 'https://github.com/sourabhsingh88/Image-recognition',
    live: 'https://github.com/sourabhsingh88/Image-recognition',
    icon: <FaRobot />,
    gradient: 'from-orange-900/30 via-[#0e1626] to-[#0a0f1d]',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'backend' | 'ai' | 'fullstack'>('all');

  const filtered =
    filter === 'all'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background glow */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>FEATURED SYSTEMS & ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Production <span className="text-gradient-cyan">Deployments</span> & Research
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-world systems engineered for measurable business and performance metrics — from automated high-return trading bots to vector search and enterprise platforms.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Systems' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'ai', label: 'AI & Machine Learning' },
            { id: 'fullstack', label: 'Full-Stack Apps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                filter === tab.id
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Display */}
        <div className="space-y-12">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl border border-cyan-500/20 overflow-hidden bg-gradient-to-br ${project.gradient} p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl group hover:border-cyan-400/50 transition-all`}
            >
              {/* Subtle top scanline */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Metadata & Architecture Details */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Badge & Category */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold">
                      {project.badge}
                    </span>
                    <span className="text-slate-500">SYS_ID: 00{idx + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Architecture Diagram/Insight Box */}
                  <div className="bg-[#0a0e1a]/80 rounded-xl p-4 border border-cyan-500/20 text-xs font-mono space-y-1">
                    <div className="text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                      <FaServer size={11} /> Architecture Design
                    </div>
                    <p className="text-slate-300 leading-relaxed">{project.architecture}</p>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-300 group-hover:border-cyan-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono inline-flex items-center gap-2 transition-all shadow-md"
                    >
                      <FaGithub size={13} />
                      <span>Inspect Repository</span>
                    </a>

                    {project.live && project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 text-xs font-mono inline-flex items-center gap-2 transition-all shadow-md"
                      >
                        <FaExternalLinkAlt size={11} />
                        <span>Live Architecture / Repo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Live Metrics Telemetry Panel */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0a0e17]/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>TELEMETRY & IMPACT METRICS</span>
                    </div>
                    <div className="text-2xl text-cyan-400 opacity-75">{project.icon}</div>
                  </div>

                  <div className="space-y-4">
                    {project.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between"
                      >
                        <span className="text-xs font-mono text-slate-400">{m.label}</span>
                        <span className="text-base font-bold font-mono text-cyan-300">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-slate-500 flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-400" />
                    <span>Tested, verified, and production documented.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-400/50 hover:border-cyan-400 text-white font-heading font-semibold text-sm shadow-[0_0_20px_rgba(0,242,254,0.2)] transition-all"
            >
              <span>Explore Complete Systems Archive</span>
              <FaArrowRight size={12} className="text-cyan-400" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;