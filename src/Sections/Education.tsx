import React, { useRef, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
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

/* ---------- Floating ambient particle ---------- */
const Particle: React.FC<{ delay: number; x: string; y: string; size: number; color: string }> = ({
  delay,
  x,
  y,
  size,
  color,
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: color,
      filter: 'blur(1px)',
      boxShadow: `0 0 ${size * 2}px ${color}`,
      willChange: 'transform, opacity',
    }}
    animate={{ y: [0, -20, 0], x: [0, 8, 0], opacity: [0.2, 0.9, 0.2] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ---------- 3D tilt wrapper for degree cards ---------- */
const TiltPanel: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 15,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1100 }}
    >
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={className}
      >
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]: any) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(0,242,254,0.12), transparent 60%)`
            ),
          }}
        />
        <div style={{ transform: 'translateZ(22px)' }}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

/* ---------- Certification card with flip-reveal on hover ---------- */
const CertCard: React.FC<{ cert: Credential; index: number }> = ({ cert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
      className="group [transform-style:preserve-3d]"
    >
      <motion.div
        whileHover={{ y: -6, rotateX: 4 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        className="relative bg-[#0e1320] border border-slate-800 group-hover:border-cyan-500/40 rounded-xl p-5 shadow-lg flex flex-col justify-between h-full overflow-hidden"
      >
        {/* diagonal shine sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(115deg, transparent 20%, rgba(0,242,254,0.08) 45%, transparent 70%)',
          }}
          animate={{ backgroundPositionX: ['0%', '160%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cert.badgeColor}`}>
              {cert.year}
            </span>
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 + 0.3, type: 'spring', stiffness: 300 }}
            >
              <FaCheck className="text-emerald-400 text-xs" />
            </motion.span>
          </div>

          <h4 className="text-sm font-bold text-white font-heading mb-1 group-hover:text-cyan-300 transition-colors">
            {cert.title}
          </h4>
          <p className="text-xs text-slate-400 font-mono mb-3">{cert.issuer}</p>
        </div>

        <div className="relative flex flex-wrap gap-1 pt-3 border-t border-slate-800/80">
          {cert.skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 + 0.15 + i * 0.04 }}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const auraOneY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const auraTwoY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const particles = useMemo(
    () => [
      { x: '6%', y: '20%', size: 4, color: '#22d3ee', delay: 0 },
      { x: '90%', y: '14%', size: 3, color: '#a78bfa', delay: 0.7 },
      { x: '94%', y: '58%', size: 3.5, color: '#34d399', delay: 1.5 },
      { x: '3%', y: '72%', size: 3, color: '#22d3ee', delay: 2.1 },
    ],
    []
  );

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background aura — scroll parallax */}
      <motion.div
        style={{ y: auraOneY, willChange: 'transform' }}
        className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none"
      />
      <motion.div
        style={{ y: auraTwoY, willChange: 'transform' }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[90px] pointer-events-none"
      />

      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
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
            <span>ACADEMIC FOUNDATION & CREDENTIALS</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Education &{' '}
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
              Verified Certifications
            </motion.span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Formal engineering grounding paired with enterprise-grade certifications from Oracle,
            AWS, and NVIDIA.
          </p>
        </motion.div>

        {/* Academic Degrees Cards — connected by an animated timeline */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Timeline connector (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 pointer-events-none">
            <div className="absolute inset-0 bg-slate-800" />
            <motion.div
              style={{ scaleX: lineProgress, transformOrigin: 'left' }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent"
            />
          </div>

          {/* Degree 1 */}
          <TiltPanel className="relative bg-[#0e1322]/80 border border-cyan-500/30 rounded-2xl p-7 shadow-xl backdrop-blur-xl overflow-hidden hover:border-cyan-400/60 transition-colors">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="flex items-start justify-between gap-4 mb-4">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 flex items-center justify-center text-2xl"
              >
                <FaGraduationCap />
              </motion.div>
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
              Comprehensive study of deep learning architectures, advanced data structures,
              distributed systems, relational database query optimization, and computer vision
              models.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">
                Status: <strong className="text-emerald-400">Final Year Candidate</strong>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                Location: <strong className="text-white">Indore, MP, India</strong>
              </span>
            </div>
          </TiltPanel>

          {/* Degree 2 */}
          <TiltPanel
            delay={0.12}
            className="relative bg-[#0e1322]/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-7 shadow-xl backdrop-blur-xl overflow-hidden transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-400/40 text-purple-400 flex items-center justify-center text-2xl"
              >
                <FaGraduationCap />
              </motion.div>
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
              School topper in Mathematics and Computer Science. Active leader in the school
              coding club and state science exhibition participant.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">
                Focus: <strong className="text-white">C++, Algorithms, Mathematics</strong>
              </span>
            </div>
          </TiltPanel>
        </div>

        {/* Verified Professional Certifications */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wide"
          >
            <FaCertificate /> Verified Credentials & Industry Badges
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <CertCard key={cert.title} cert={cert} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;