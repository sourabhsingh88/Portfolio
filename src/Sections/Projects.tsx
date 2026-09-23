import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
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

const FILTERS = [
  { id: 'all', label: 'All Systems' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'fullstack', label: 'Full-Stack Apps' },
] as const;

/* ---------- Staggered-reveal variants — each child animates one after another ---------- */
const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const metricsPanelVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
};

const metricRowVariant = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

/* ---------- 3D tilt wrapper for a project card ---------- */
const TiltProjectCard: React.FC<{ children: React.ReactNode; className: string; direction: 'left' | 'right' }> = ({
  children,
  className,
  direction,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 120, damping: 18 });

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current || cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    rectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -70 : 70, rotateY: direction === 'left' ? -10 : 10 }}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          rotateY: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      style={{ perspective: 1400 }}
    >
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'backend' | 'ai' | 'fullstack'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const glowOneY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const glowTwoY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const timelineScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  const filtered =
    filter === 'all' ? FEATURED_PROJECTS : FEATURED_PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background glow — scroll parallax */}
      <motion.div
        style={{ y: glowOneY, willChange: 'transform' }}
        className="absolute top-20 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[90px] pointer-events-none"
      />
      <motion.div
        style={{ y: glowTwoY, willChange: 'transform' }}
        className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[90px] pointer-events-none"
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
            <span>FEATURED SYSTEMS & ARCHITECTURE</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Production{' '}
            <motion.span
              className="inline-block bg-[length:200%_auto]"
              style={{
                backgroundImage: 'linear-gradient(90deg, #22d3ee, #a78bfa, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              Deployments
            </motion.span>{' '}
            & Research
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-world systems engineered for measurable business and performance metrics — from
            automated high-return trading bots to vector search and enterprise platforms.
          </p>
        </motion.div>

        {/* Filter Chips — sliding active pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-colors ${
                filter === tab.id ? 'text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter === tab.id && (
                <motion.span
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-xl bg-cyan-500/20 border border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              {filter !== tab.id && (
                <span className="absolute inset-0 rounded-xl bg-slate-900/80 border border-slate-800" />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Cards Display — connected by a scroll-drawn timeline */}
        <div className="relative space-y-12">
          {/* Timeline spine (desktop only) */}
          <div className="hidden lg:block absolute left-1 top-0 bottom-0 w-px pointer-events-none">
            <div className="absolute inset-0 bg-slate-800" />
            <motion.div
              style={{ scaleY: timelineScale, transformOrigin: 'top' }}
              className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-purple-400 to-transparent"
            />
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <TiltProjectCard
                key={project.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                className={`relative rounded-3xl border border-cyan-500/20 overflow-hidden bg-gradient-to-br ${project.gradient} p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl group hover:border-cyan-400/50 transition-colors lg:ml-8`}
              >
                {/* Timeline node marker (desktop only) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.15 }}
                  className="hidden lg:flex absolute -left-8 top-10 w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#0a0a0f] shadow-[0_0_12px_rgba(0,242,254,0.6)] items-center justify-center"
                />

                {/* Subtle top scanline */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                {/* Diagonal shine sweep on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)',
                  }}
                  animate={{ backgroundPositionX: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.div
                  variants={cardContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left: Metadata & Architecture Details — each block reveals in sequence */}
                  <div className="lg:col-span-7 space-y-5">
                    <motion.div variants={itemUp} className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold">
                        {project.badge}
                      </span>
                      <span className="text-slate-500">SYS_ID: 00{idx + 1}</span>
                    </motion.div>

                    <motion.h3
                      variants={itemUp}
                      className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight group-hover:text-cyan-200 transition-colors"
                    >
                      {project.title}
                    </motion.h3>

                    <motion.p variants={itemUp} className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </motion.p>

                    <motion.div
                      variants={itemUp}
                      className="bg-[#0a0e1a]/80 rounded-xl p-4 border border-cyan-500/20 text-xs font-mono space-y-1"
                    >
                      <div className="text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                        <FaServer size={11} /> Architecture Design
                      </div>
                      <p className="text-slate-300 leading-relaxed">{project.architecture}</p>
                    </motion.div>

                    <motion.div variants={itemUp} className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <motion.span
                          key={tag}
                          variants={tagVariant}
                          transition={{ delay: tIdx * 0.04 }}
                          className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-300 group-hover:border-cyan-500/30 transition-colors"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div variants={itemUp} className="flex flex-wrap items-center gap-4 pt-3">
                      <motion.a
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono inline-flex items-center gap-2 shadow-md"
                      >
                        <FaGithub size={13} />
                        <span>Inspect Repository</span>
                      </motion.a>

                      {project.live && project.live !== '#' && (
                        <motion.a
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 text-xs font-mono inline-flex items-center gap-2 shadow-md"
                        >
                          <FaExternalLinkAlt size={11} />
                          <span>Live Architecture / Repo</span>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>

                  {/* Right: Live Metrics Telemetry Panel — rows stagger in after the left column */}
                  <motion.div
                    variants={metricsPanelVariants}
                    className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0a0e17]/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6"
                  >
                    <motion.div variants={itemUp} className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                        <motion.span
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-emerald-400"
                        />
                        <span>TELEMETRY & IMPACT METRICS</span>
                      </div>
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl text-cyan-400 opacity-75"
                      >
                        {project.icon}
                      </motion.div>
                    </motion.div>

                    <div className="space-y-4">
                      {project.metrics.map((m, mIdx) => (
                        <motion.div
                          key={mIdx}
                          variants={metricRowVariant}
                          whileHover={{ x: -3 }}
                          className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between"
                        >
                          <span className="text-xs font-mono text-slate-400">{m.label}</span>
                          <span className="text-base font-bold font-mono text-cyan-300">{m.value}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div variants={itemUp} className="pt-2 text-[11px] font-mono text-slate-500 flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-400" />
                      <span>Tested, verified, and production documented.</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </TiltProjectCard>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-400/50 hover:border-cyan-400 text-white font-heading font-semibold text-sm shadow-[0_0_20px_rgba(0,242,254,0.2)] overflow-hidden transition-colors"
            >
              <motion.span
                className="absolute inset-0 bg-white/10"
                style={{ width: '30%' }}
                animate={{ x: ['-120%', '260%'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }}
              />
              <span className="relative">Explore Complete Systems Archive</span>
              <motion.span
                className="relative"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <FaArrowRight size={12} className="text-cyan-400" />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};  

export default Projects;