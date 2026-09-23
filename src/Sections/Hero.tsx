import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaCopy,
  FaCheck,
  FaDownload,
  FaArrowRight,
  FaCode,
  FaBolt,
  FaServer,
  FaBrain,
  FaChevronDown,
} from 'react-icons/fa';
import MagneticButton from '../components/MagneticButton';

interface HeroProps {
  onOpenInquiry?: () => void;
  onOpenTerminal?: () => void;
}

const PHRASES = [
  'Full-Stack Systems Architect',
  'AI / ML & Trading Bot Engineer',
  'High-Throughput API Specialist',
  'Distributed Backend Developer',
];

const STATS = [
  { value: 10, suffix: 'k+', label: 'Requests / Day', color: 'cyan' as const },
  { value: 85, suffix: '%+', label: 'AI Retrieval Accuracy', color: 'emerald' as const },
  { value: 30, suffix: '%', label: 'Latency Reduction', color: 'purple' as const },
  { value: 100, suffix: '%', label: 'Test Automation', color: 'amber' as const },
];

const STAT_COLOR_MAP: Record<string, string> = {
  cyan: 'border-cyan-500/20 text-cyan-400',
  emerald: 'border-emerald-500/20 text-emerald-400',
  purple: 'border-purple-500/20 text-purple-400',
  amber: 'border-amber-500/20 text-amber-400',
};

/* ---------- Lightweight particle ---------- */
const Particle: React.FC<{ delay: number; x: string; y: string; size: number; color: string }> = ({
  delay,
  x,
  y,
  size,
  color,
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none will-change-transform"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: color,
      boxShadow: `0 0 ${size * 2}px ${color}`,
    }}
    animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ---------- Count-up number, animates once visible ---------- */
const CountUp: React.FC<{ target: number; suffix: string; delay?: number }> = ({ target, suffix, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const controls = animate(0, target, {
            duration: 1.2,
            delay,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, delay]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, onOpenTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect loop
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setTypewriterText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypewriterText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  /* Cursor-reactive 3D tilt for the avatar pod */
  const avatarRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const avatarRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 16 });
  const avatarRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 16 });

  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = avatarRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleAvatarMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const particles = useMemo(
    () => [
      { x: '8%', y: '22%', size: 3, color: '#22d3ee', delay: 0 },
      { x: '90%', y: '16%', size: 3, color: '#a78bfa', delay: 0.8 },
      { x: '86%', y: '70%', size: 3, color: '#34d399', delay: 1.6 },
      { x: '6%', y: '65%', size: 3, color: '#22d3ee', delay: 2.2 },
    ],
    []
  );

  return (
    <div
      id="hero"
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden cyber-grid"
    >
      {/* Ambient Electric Glow Orbs — smooth GPU composition */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.4) 0%, rgba(121, 40, 202, 0.2) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[320px] h-[320px] rounded-full blur-2xl pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* Floating ambient particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Kinetic Info & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-[0_0_20px_rgba(0,255,136,0.2)] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-semibold tracking-wide">
                Open for Freelance & High-Impact Contracts
              </span>
            </motion.div>

            {/* High Impact Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold font-heading tracking-tight leading-[1.08]">
                Architecting <br className="hidden sm:inline" />
                <span className="text-gradient-cyan">High-Velocity</span> APIs &{' '}
                <span className="text-gradient-neon">AI Systems</span>.
              </h1>

              {/* Dynamic Typewriter Subtitle */}
              <div className="h-8 flex items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-base sm:text-lg text-slate-300">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span className="text-cyan-200">{typewriterText}</span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
              </div>
            </motion.div>

            {/* Value Proposition Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans"
            >
              I am <strong className="text-white font-semibold">Sourabh Singh Mandloi</strong>,
              an engineer bridging resilient backend architecture (Spring Boot, FastAPI, Oracle DB)
              with deep learning models and automated algorithmic engines. Handling 10k+ daily queries with
              sub-millisecond optimization and production-grade reliability.
            </motion.p>

            {/* Quick Contact HUD Bar (Email + Phone + WhatsApp) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1"
            >
              {/* Email Chip with Quick-Copy */}
              <div className="relative group">
                <div className="flex items-center gap-2 bg-[#0e1422] border border-cyan-500/30 hover:border-cyan-400/80 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors">
                  <a
                    href="mailto:devsourabh07@gmail.com"
                    className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200"
                  >
                    <FaEnvelope className="text-cyan-400" />
                    <span>devsourabh07@gmail.com</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard('devsourabh07@gmail.com', 'email')}
                    className="ml-1 p-1 hover:text-white text-slate-400 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <FaCheck className="text-emerald-400" size={11} /> : <FaCopy size={11} />}
                  </button>
                </div>
                {copiedEmail && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap">
                    Copied to clipboard!
                  </div>
                )}
              </div>

              {/* Phone Chip with Direct Call & WhatsApp */}
              <div className="relative group">
                <div className="flex items-center gap-2 bg-[#0e1422] border border-slate-700 hover:border-emerald-500/80 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors">
                  <a
                    href="tel:+919755826293"
                    className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-300"
                  >
                    <FaPhone className="text-emerald-400 text-xs" />
                    <span>+91 9755826293</span>
                  </a>

                  <a
                    href="https://wa.me/919755826293?text=Hi%20Sourabh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                    title="Connect on WhatsApp"
                  >
                    <FaWhatsapp size={13} />
                  </a>

                  <button
                    onClick={() => copyToClipboard('+919755826293', 'phone')}
                    className="p-1 hover:text-white text-slate-400 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <FaCheck className="text-emerald-400" size={11} /> : <FaCopy size={11} />}
                  </button>
                </div>
                {copiedPhone && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap">
                    Copied!
                  </div>
                )}
              </div>
            </motion.div>

            {/* Core Action Buttons with Magnetic Physics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Start a Project Primary CTA */}
              <MagneticButton strength={20}>
                <button
                  onClick={onOpenInquiry}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-heading text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all flex items-center gap-2 group"
                >
                  <FaBolt className="text-slate-950 group-hover:scale-110 transition-transform" />
                  <span>Start a Project</span>
                  <FaArrowRight className="text-slate-950 text-xs group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              {/* Inspect Code / Architecture CTA */}
              <MagneticButton strength={15}>
                <button
                  onClick={scrollToProjects}
                  className="px-6 py-3.5 rounded-xl bg-[#0f1422] hover:bg-[#141b2e] border border-cyan-500/30 hover:border-cyan-400 text-slate-200 text-sm font-heading font-semibold transition-colors flex items-center gap-2"
                >
                  <FaCode className="text-cyan-400" />
                  <span>Inspect Code & Architecture</span>
                </button>
              </MagneticButton>

              {/* Download CV */}
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="/Sourabh-Resume.pdf"
                download
                className="px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono inline-flex items-center gap-2 transition-colors"
              >
                <FaDownload className="text-cyan-400" />
                <span className="hidden sm:inline">Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-3 pt-2 text-slate-400"
            >
              <span className="text-xs font-mono text-slate-500 uppercase">Channels:</span>
              <a
                href="https://github.com/sourabhsingh88"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/sourabh-singh-mandloi/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={14} />
              </a>
              <button
                onClick={onOpenTerminal}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 text-xs font-mono transition-colors"
              >
                &gt;_ CLI
              </button>
            </motion.div>
          </div>

          {/* Right Column: Cybernetic Avatar & Telemetry HUD */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Holographic Avatar Frame — cursor-reactive 3D tilt */}
            <motion.div
              ref={avatarRef}
              onMouseMove={handleAvatarMouseMove}
              onMouseLeave={handleAvatarMouseLeave}
              style={{ perspective: 1000 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center will-change-transform"
            >
              <motion.div
                style={{ rotateX: avatarRotateX, rotateY: avatarRotateY, transformStyle: 'preserve-3d' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Outer Counter-Rotating Holographic Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan-400/30 border-dashed"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -inset-4 rounded-full border border-purple-500/20 border-dotted"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
                />

                {/* Core Image Pod */}
                <div
                  style={{ transform: 'translateZ(30px)' }}
                  className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-1.5 bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 shadow-[0_0_35px_rgba(0,242,254,0.25)]"
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative">
                    <img
                      src="sourabh-profilee.jpg"
                      alt="Sourabh Singh Mandloi"
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* Cyber Grid Scanning Line — uses GPU transform translateY instead of layout reflow top */}
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_10px_#00f2fe] will-change-transform"
                      animate={{ y: [0, 240, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>

                {/* Floating Orbiting Tech Badges */}
                <motion.div
                  style={{ transform: 'translateZ(45px)' }}
                  className="absolute -top-2 right-2 bg-slate-900/90 border border-cyan-400/40 text-cyan-300 px-3 py-1.5 rounded-full text-xs font-mono shadow-lg backdrop-blur-md flex items-center gap-1.5 will-change-transform"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaServer className="text-cyan-400" />
                  <span>FastAPI + Java</span>
                </motion.div>

                <motion.div
                  style={{ transform: 'translateZ(45px)' }}
                  className="absolute -bottom-2 left-2 bg-slate-900/90 border border-emerald-400/40 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-mono shadow-lg backdrop-blur-md flex items-center gap-1.5 will-change-transform"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <FaBrain className="text-emerald-400" />
                  <span>AI / MobileNet</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Telemetry Stats Grid Cards */}
            <div className="w-full grid grid-cols-2 gap-3 mt-8 max-w-sm">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className={`bg-[#0e1320]/80 p-3.5 rounded-xl border text-center backdrop-blur-sm ${STAT_COLOR_MAP[stat.color]}`}
                >
                  <div className="font-bold font-mono text-xl sm:text-2xl tracking-tight">
                    <CountUp target={stat.value} suffix={stat.suffix} delay={i * 0.08} />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono uppercase mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors"
        aria-label="Scroll to projects"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FaChevronDown size={14} />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default Hero;