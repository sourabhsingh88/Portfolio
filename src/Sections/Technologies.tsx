import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaJava,
  FaPython,
  FaDatabase,
  FaServer,
  FaCloud,
  FaBrain,
  FaTools,
  FaAtom,
  FaThLarge,
} from 'react-icons/fa';
import { SiScikitlearn, SiDocker, SiFastapi, SiSpringboot } from 'react-icons/si';
import AntiGravityCanvas from '../components/AntiGravityCanvas';

interface SkillItem {
  name: string;
  category: 'backend' | 'cloud' | 'database' | 'architecture';
  level: number;
  highlight: string;
  icon: React.ReactNode;
  tags: string[];
}

const SKILLS_DATA: SkillItem[] = [
  // Backend Core
  {
    name: 'FastAPI & Async Python',
    category: 'backend',
    level: 95,
    highlight: 'High-throughput async APIs handling 10,000+ req/day with Pydantic validation & MetaTrader5 connectors.',
    icon: <SiFastapi className="text-cyan-400" />,
    tags: ['AsyncIO', 'Pydantic', 'WebSockets', 'Swagger'],
  },
  {
    name: 'Spring Boot & Java Enterprise',
    category: 'backend',
    level: 92,
    highlight: 'Production microservices, role-based security, 10+ RESTful APIs with 30% query speedup.',
    icon: <SiSpringboot className="text-emerald-400" />,
    tags: ['Spring Security', 'JPA', 'Hibernate', 'Maven'],
  },
  {
    name: 'Core Java & Multi-threading',
    category: 'backend',
    level: 90,
    highlight: 'Object-oriented systems, concurrent executors, algorithmic problem solving & JVM tuning.',
    icon: <FaJava className="text-orange-400" />,
    tags: ['OOP', 'Concurrency', 'Collections', 'Design Patterns'],
  },
  {
    name: 'Python Ecosystem',
    category: 'backend',
    level: 94,
    highlight: 'Advanced Python automation, algorithmic trading scripts, backtesting engines, and Flask micro-apps.',
    icon: <FaPython className="text-blue-400" />,
    tags: ['NumPy', 'Pandas', 'Flask', 'Automation'],
  },

  // Cloud & DevOps
  {
    name: 'Docker & Containerization',
    category: 'cloud',
    level: 85,
    highlight: 'Multi-stage Docker builds, container networking, microservice orchestration, and dev/prod parity.',
    icon: <SiDocker className="text-blue-400" />,
    tags: ['Docker Compose', 'Containers', 'Images', 'Volumes'],
  },
  {
    name: 'CI/CD & Automated Testing',
    category: 'cloud',
    level: 88,
    highlight: 'Automated test suites with PyTest & JUnit achieving 100% code coverage on core trading/search modules.',
    icon: <FaTools className="text-amber-400" />,
    tags: ['PyTest', 'GitHub Actions', 'Unit Testing', 'Mocking'],
  },
  {
    name: 'AWS ML & Cloud Foundations',
    category: 'cloud',
    level: 82,
    highlight: 'AWS Academy Graduate - Machine Learning Foundations; cloud instance provisioning & model hosting.',
    icon: <FaCloud className="text-cyan-400" />,
    tags: ['AWS S3', 'EC2', 'SageMaker Basics', 'IAM'],
  },

  // Databases
  {
    name: 'Oracle Cloud Database 2025',
    category: 'database',
    level: 90,
    highlight: 'Oracle Certified Professional with hands-on enterprise schema optimization and cloud administration.',
    icon: <FaDatabase className="text-red-400" />,
    tags: ['Autonomous DB', 'PL/SQL', 'Oracle Cloud', 'Performance'],
  },
  {
    name: 'MySQL & Relational Modeling',
    category: 'database',
    level: 90,
    highlight: 'Designed normalized schemas with 20+ tables, indexing strategies, complex joins, and ACID compliance.',
    icon: <FaDatabase className="text-cyan-400" />,
    tags: ['InnoDB', 'Indexing', 'Transactions', 'Query Plans'],
  },
  {
    name: 'Hibernate & JPA ORM',
    category: 'database',
    level: 88,
    highlight: 'Entity lifecycle management, query caching, N+1 query elimination, and data access layers.',
    icon: <FaServer className="text-purple-400" />,
    tags: ['JPQL', 'Criteria API', 'Transactions', 'Entities'],
  },

  // Architecture & AI
  {
    name: 'MobileNet v2 & Computer Vision',
    category: 'architecture',
    level: 90,
    highlight: 'Built image search engine with MobileNet embeddings, boosting retrieval accuracy by 85%+.',
    icon: <FaBrain className="text-pink-400" />,
    tags: ['Embeddings', 'TensorFlow/Keras', 'Inference', 'Image Processing'],
  },
  {
    name: 'Cosine Similarity & Search Engines',
    category: 'architecture',
    level: 92,
    highlight: 'Optimized high-dimensional vector similarity indexing, slashing query latency by 40%.',
    icon: <SiScikitlearn className="text-amber-400" />,
    tags: ['Vector Math', 'Scikit-learn', 'Feature Extraction'],
  },
  {
    name: 'Automated Trading Architecture',
    category: 'architecture',
    level: 92,
    highlight: 'Event-driven algorithmic trading bot with MetaTrader5 API, yielding 25–30% higher returns.',
    icon: <FaAtom className="text-emerald-400" />,
    tags: ['MetaTrader5', 'Risk Engine', 'Backtesting', 'Execution'],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Arsenal', icon: <FaAtom /> },
  { id: 'backend', label: 'Backend Core', icon: <FaServer /> },
  { id: 'cloud', label: 'Cloud & DevOps', icon: <FaCloud /> },
  { id: 'database', label: 'Databases', icon: <FaDatabase /> },
  { id: 'architecture', label: 'Architecture & AI', icon: <FaBrain /> },
];

export const Technologies: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'canvas' | 'matrix'>('canvas');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(SKILLS_DATA[0]);

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const handleCanvasNodeSelect = (name: string) => {
    const match = SKILLS_DATA.find((s) => s.name.toLowerCase().includes(name.toLowerCase()));
    if (match) setSelectedSkill(match);
  };

  return (
    <section
      id="technologies"
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Glow aura */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>TECHNICAL ARSENAL & SKILL MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            High-Impact <span className="text-gradient-cyan">Capabilities</span> & Physics Engine
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered across robust microservice backends, cloud-native pipelines, and neural networks.
            Interact with the zero-gravity particle field or inspect the deep skill matrix.
          </p>
        </div>

        {/* Controls: Category Filter + View Mode Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wide uppercase transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Canvas vs Matrix Grid */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'canvas'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaAtom size={12} />
              <span>Anti-Gravity</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'matrix'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaThLarge size={12} />
              <span>Matrix Grid</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'canvas' ? (
            <motion.div
              key="canvas-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Interactive Canvas */}
              <AntiGravityCanvas
                activeCategory={activeCategory}
                onSelectNode={handleCanvasNodeSelect}
              />

              {/* Selected Node Details Card */}
              {selectedSkill && (
                <div className="bg-[#0e1322] border border-cyan-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                      {selectedSkill.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-white font-heading">
                          {selectedSkill.name}
                        </h4>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                          {selectedSkill.category}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
                        {selectedSkill.highlight}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {selectedSkill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-48 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs font-mono text-slate-400 mb-1 uppercase">Proficiency</div>
                    <div className="text-2xl font-bold font-mono text-cyan-400">{selectedSkill.level}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                        style={{ width: `${selectedSkill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="matrix-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSkills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    selectedSkill?.name === skill.name
                      ? 'bg-[#0f172a] border-cyan-400/70 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                      : 'bg-[#0e1322]/80 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl">
                      {skill.icon}
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-cyan-400 font-bold text-sm">{skill.level}%</span>
                      <div className="w-16 bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-cyan-400"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white font-heading mb-1.5">
                    {skill.name}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {skill.highlight}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Technologies;