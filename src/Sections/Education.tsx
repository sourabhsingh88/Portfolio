import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaUniversity,
  FaCertificate,
  FaCheck,
} from 'react-icons/fa';

interface Credential {
  title: string;
  issuer: string;
  year: string;
  badgeColor: string;
  skills: string[];
}

const CERTIFICATIONS: Credential[] = [
  {
    title: 'Oracle Cloud Database Services 2025 Certified Professional',
    issuer: 'Oracle Corporation',
    year: '2025',
    badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
    skills: ['Autonomous Database', 'PL/SQL', 'Cloud Administration', 'Performance Tuning'],
  },
  {
    title: 'Machine Learning Foundations',
    issuer: 'AWS Academy Graduate',
    year: '2024',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    skills: ['Model Training', 'Cloud Pipelines', 'Feature Engineering', 'AWS Cloud'],
  },
  {
    title: 'Natural Language Processing (NLP)',
    issuer: 'NVIDIA Deep Learning Institute',
    year: '2024',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    skills: ['Transformers', 'Text Embeddings', 'Neural Architecture', 'Inference'],
  },
  {
    title: 'SQL and Relational Database Systems',
    issuer: 'Cognitive Class (IBM)',
    year: '2023',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    skills: ['Complex Queries', 'Indexing', 'Schema Normalization', 'ACID Rules'],
  },
];

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background aura */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ACADEMIC FOUNDATION & CREDENTIALS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Education & <span className="text-gradient-cyan">Verified Certifications</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Formal engineering grounding paired with enterprise-grade certifications from Oracle, AWS, and NVIDIA.
          </p>
        </div>

        {/* Academic Degrees Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Degree 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0e1322]/80 border border-cyan-500/30 rounded-2xl p-7 shadow-xl backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/60 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 flex items-center justify-center text-2xl">
                <FaGraduationCap />
              </div>
              <div className="text-right font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300">
                  July 2022 - June 2026
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white font-heading mb-1 group-hover:text-cyan-200 transition-colors">
              B.Tech., Artificial Intelligence & Machine Learning
            </h3>
            <p className="text-xs font-mono text-cyan-400 mb-2">
              Minor in Computer Science and Engineering
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-300 mb-4 font-sans">
              <FaUniversity className="text-slate-400" />
              <span>Institute of Engineering And Technology, Indore</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Comprehensive study of deep learning architectures, advanced data structures, distributed systems, relational database query optimization, and computer vision models.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Status: <strong className="text-emerald-400">Final Year Candidate</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Location: <strong className="text-white">Indore, MP, India</strong></span>
            </div>
          </motion.div>

          {/* Degree 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#0e1322]/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-7 shadow-xl backdrop-blur-xl relative overflow-hidden group transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-400/40 text-purple-400 flex items-center justify-center text-2xl">
                <FaGraduationCap />
              </div>
              <div className="text-right font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  Completed 2022
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white font-heading mb-1">
              Higher Secondary Certificate (XII CBSE)
            </h3>
            <p className="text-xs font-mono text-purple-400 mb-2">
              Science Stream (Physics, Chemistry, Mathematics, Computer Science)
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-300 mb-4 font-sans">
              <FaUniversity className="text-slate-400" />
              <span>Sandapi Academy, Mandleshwar</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              School topper in Mathematics and Computer Science. Active leader in the school coding club and state science exhibition participant.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Focus: <strong className="text-white">C++, Algorithms, Mathematics</strong></span>
            </div>
          </motion.div>
        </div>

        {/* Verified Professional Certifications */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wide">
            <FaCertificate /> Verified Credentials & Industry Badges
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0e1320] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cert.badgeColor}`}>
                      {cert.year}
                    </span>
                    <FaCheck className="text-emerald-400 text-xs" />
                  </div>

                  <h4 className="text-sm font-bold text-white font-heading mb-1 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mb-3">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-800/80">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;