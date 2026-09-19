import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

export const About: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ENGINEERING PHILOSOPHY & MINDSET</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Bridging <span className="text-gradient-cyan">System Architecture</span> with AI
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            I build resilient backends and intelligent algorithms designed to solve real operational bottlenecks — not just write code for the sake of code.
          </p>
        </div>

        {/* Two-Column Architecture Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left: Detailed Bio Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0e1322]/80 border border-cyan-500/20 rounded-2xl p-7 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>PROFILE BIO // SOURABH SINGH MANDLOI</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-heading">
                Transforming Complexity into Deterministic, Scalable Software
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As a software engineer specializing in backend systems and applied AI, I focus on building high-performance APIs and automated engines. My technical foundation spans across Java (Spring Boot, Hibernate) and Python (FastAPI, Flask, Scikit-learn, TensorFlow).
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                From developing automated trading bots executing custom strategies to computer vision search engines slashing retrieval time by 40%, I prioritize architectural speed, database normalization, and test-driven reliability.
              </p>

              {/* Core Attributes */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <FaCheck className="text-cyan-400" />
                  <span>Oracle DB Certified 2025</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <FaCheck className="text-cyan-400" />
                  <span>AWS ML Academy Graduate</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <FaCheck className="text-cyan-400" />
                  <span>Microservice Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <FaCheck className="text-cyan-400" />
                  <span>Algorithmic Backtesting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Architectural Principles */}
          <div className="lg:col-span-6 space-y-4">
            {PRINCIPLES.map((principle, index) => (
              <motion.div
                key={principle.title}
                onClick={() => setActivePrinciple(index)}
                whileHover={{ scale: 1.01 }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activePrinciple === index
                    ? 'bg-[#0f172a] border-cyan-400/80 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                    : 'bg-[#0e1320]/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                      {principle.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-heading">
                        {principle.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {principle.desc}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 whitespace-nowrap">
                    {principle.metric}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;