import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  FaDatabase,
  FaBrain,
  FaCheck,
  FaShieldAlt,
  FaRocket,
} from 'react-icons/fa';

interface Principle {
  title: string;
  icon: React.ReactNode;
  desc: string;
  metric: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: 'High-Throughput & Low Latency',
    icon: <FaRocket className="text-cyan-400" />,
    desc: 'Designing asynchronous FastAPI services and optimized Spring Boot JPA queries that scale gracefully beyond 10,000+ requests daily.',
    metric: '30% Faster Response Time',
  },
  {
    title: 'Applied Neural Intelligence',
    icon: <FaBrain className="text-purple-400" />,
    desc: 'Deploying pragmatic machine learning pipelines (MobileNet v2, Cosine Similarity, Gemini AI) to solve tangible visual search and automation challenges.',
    metric: '85%+ Retrieval Precision',
  },
  {
    title: 'ACID-Compliant Relational Foundations',
    icon: <FaDatabase className="text-blue-400" />,
    desc: 'Structuring normalized schemas across MySQL and Oracle Cloud DB with indexes, transaction locks, and zero data anomalies.',
    metric: '20+ Normalized Tables',
  },
  {
    title: 'Defensive Engineering & Quality',
    icon: <FaShieldAlt className="text-emerald-400" />,
    desc: 'Strict SDLC compliance with automated test suites (PyTest, JUnit) safeguarding algorithmic trading decisions and financial integrations.',
    metric: '100% Core Test Coverage',
  },
];

const ATTRIBUTES = [
  'Oracle DB Certified 2025',
  'AWS ML Academy Graduate',
  'Microservice Architecture',
  'Algorithmic Backtesting',
];

/* ---------- 3D tilt-on-hover principle card ---------- */
const PrincipleCard: React.FC<{
  principle: Principle;
  index: number;
  active: boolean;
  onActivate: () => void;
}> = ({ principle, index, active, onActivate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 160,
    damping: 18,
  });

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    const { left, top, width, height } = rectRef.current;
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onActivate}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.01 }}
        className={`relative p-5 rounded-2xl border transition-colors cursor-pointer overflow-hidden will-change-transform ${
          active
            ? 'bg-[#0f172a] border-cyan-400/80 shadow-[0_0_25px_rgba(0,242,254,0.15)]'
            : 'bg-[#0e1320]/60 border-slate-800/80 hover:border-slate-700'
        }`}
      >
        <div className="relative flex items-start justify-between gap-4" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
              {principle.icon}
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">{principle.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">{principle.desc}</p>
            </div>
          </div>

          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 whitespace-nowrap">
            {principle.metric}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const About: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbOneY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Ambient glow orbs */}
      <motion.div
        style={{
          y: orbOneY,
          background: 'radial-gradient(circle, rgba(0,242,254,0.3) 0%, transparent 70%)',
        }}
        className="absolute top-1/3 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 will-change-transform"
      />
      <motion.div
        style={{
          y: orbTwoY,
          background: 'radial-gradient(circle, rgba(121,40,202,0.3) 0%, transparent 70%)',
        }}
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 will-change-transform"
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ENGINEERING PHILOSOPHY & MINDSET</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Bridging <span className="text-gradient-cyan">System Architecture</span> with AI
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            I build resilient backends and intelligent algorithms designed to solve real
            operational bottlenecks — not just write code for the sake of code.
          </p>
        </motion.div>

        {/* Two-Column Architecture Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left: Detailed Bio Card */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#0e1322]/80 border border-cyan-500/20 rounded-2xl p-7 shadow-xl backdrop-blur-md space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>PROFILE BIO // SOURABH SINGH MANDLOI</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-heading">
                Transforming Complexity into Deterministic, Scalable Software
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As a software engineer specializing in backend systems and applied AI, I focus on
                building high-performance APIs and automated engines. My technical foundation
                spans across Java (Spring Boot, Hibernate) and Python (FastAPI, Flask,
                Scikit-learn, TensorFlow).
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                From developing automated trading bots executing custom strategies to computer
                vision search engines slashing retrieval time by 40%, I prioritize architectural
                speed, database normalization, and test-driven reliability.
              </p>

              {/* Core Attributes */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                {ATTRIBUTES.map((attr) => (
                  <div key={attr} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <FaCheck className="text-cyan-400" />
                    <span>{attr}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Architectural Principles */}
          <div className="lg:col-span-6 space-y-4">
            {PRINCIPLES.map((principle, index) => (
              <PrincipleCard
                key={principle.title}
                principle={principle}
                index={index}
                active={activePrinciple === index}
                onActivate={() => setActivePrinciple(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;