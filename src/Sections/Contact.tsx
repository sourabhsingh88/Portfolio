import React, { useRef, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaBolt,
  FaClock,
  FaShieldAlt,
} from 'react-icons/fa';

interface ContactProps {
  onOpenInquiry?: () => void;
}

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
    animate={{ y: [0, -22, 0], x: [0, 10, 0], opacity: [0.2, 0.9, 0.2] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ---------- 3D tilt wrapper for the two contact cards ---------- */
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  initialX: number;
}> = ({ children, className, initialX }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
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
      initial={{ opacity: 0, x: initialX, rotateY: initialX > 0 ? 15 : -15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
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
                `radial-gradient(circle at ${gx} ${gy}, rgba(0,242,254,0.14), transparent 60%)`
            ),
          }}
        />
        <div style={{ transform: 'translateZ(24px)' }}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

/* ---------- Magnetic CTA button ---------- */
const MagneticButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseEnter = () => {
    if (btnRef.current) {
      rectRef.current = btnRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = rectRef.current || btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      style={{ x: springX, y: springY }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-heading font-bold text-base shadow-[0_0_30px_rgba(0,242,254,0.4)] inline-flex items-center gap-3 overflow-hidden"
    >
      {/* Sweeping shine */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{ width: '40%' }}
        animate={{ x: ['-120%', '260%'] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
      <FaBolt className="relative text-slate-950" />
      <span className="relative">Launch Interactive Project Wizard</span>
    </motion.button>
  );
};

export const Contact: React.FC<ContactProps> = ({ onOpenInquiry }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85]);
  const glowRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bannerY = useTransform(scrollYProgress, [0.4, 1], [40, -20]);

  const particles = useMemo(
    () => [
      { x: '10%', y: '15%', size: 4, color: '#22d3ee', delay: 0 },
      { x: '88%', y: '10%', size: 3, color: '#34d399', delay: 0.9 },
      { x: '92%', y: '60%', size: 4, color: '#a78bfa', delay: 1.7 },
      { x: '4%', y: '68%', size: 3, color: '#22d3ee', delay: 2.3 },
      { x: '50%', y: '4%', size: 2.5, color: '#34d399', delay: 1.2 },
    ],
    []
  );

  const copyText = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background radial glow — scroll-reactive scale + rotation */}
      <motion.div
        style={{ scale: glowScale, rotate: glowRotate, willChange: 'transform' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[90px] pointer-events-none"
      />

      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
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
            <span>COMMUNICATION CHANNELS & FREELANCE</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Let's Engineer Something{' '}
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
              Extraordinary
            </motion.span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you need a scalable API architecture, an intelligent machine learning
            pipeline, or full-stack web engineering, I'm ready to collaborate.
          </p>
        </motion.div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email Direct Channel Card */}
          <TiltCard
            initialX={-40}
            className="relative bg-[#0e1322]/90 border border-cyan-500/30 rounded-2xl p-8 shadow-xl backdrop-blur-xl overflow-hidden hover:border-cyan-400/60 transition-colors flex flex-col justify-between min-h-full"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,242,254,0.2)]"
                >
                  <FaEnvelope />
                </motion.div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  PRIMARY CHANNEL
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">Direct Email Dispatch</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click to launch your mail client or use the copy button for instant clipboard
                  access.
                </p>
              </div>

              <div className="relative">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                  <a
                    href="mailto:devsourabh07@gmail.com"
                    className="text-cyan-300 font-mono text-sm sm:text-base hover:underline break-all"
                  >
                    devsourabh07@gmail.com
                  </a>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => copyText('devsourabh07@gmail.com', 'email')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0 ml-2"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <FaCheck className="text-emerald-400" size={14} /> : <FaCopy size={14} />}
                  </motion.button>
                </div>
                <motion.div
                  initial={false}
                  animate={
                    copiedEmail
                      ? { opacity: 1, y: -8, scale: 1 }
                      : { opacity: 0, y: 4, scale: 0.9 }
                  }
                  transition={{ duration: 0.25 }}
                  className="absolute -top-7 right-2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg pointer-events-none"
                >
                  Copied to clipboard!
                </motion.div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <FaClock className="text-cyan-400" /> Reply within 12–24 hours
              </span>
              <a href="mailto:devsourabh07@gmail.com" className="text-cyan-400 hover:underline font-semibold">
                Send Email &rarr;
              </a>
            </div>
          </TiltCard>

          {/* Phone & WhatsApp Card */}
          <TiltCard
            initialX={40}
            className="relative bg-[#0e1322]/90 border border-emerald-500/30 rounded-2xl p-8 shadow-xl backdrop-blur-xl overflow-hidden hover:border-emerald-400/60 transition-colors flex flex-col justify-between min-h-full"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                >
                  <FaPhone />
                </motion.div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  PHONE & WHATSAPP
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">Direct Line & Quick Chat</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Call directly or launch a WhatsApp conversation for fast project discussions.
                </p>
              </div>

              <div className="relative">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                  <a href="tel:+919755826293" className="text-emerald-300 font-mono text-sm sm:text-base hover:underline">
                    +91 9755826293
                  </a>
                  <div className="flex items-center gap-1.5 ml-2">
                    <motion.a
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://wa.me/919755826293?text=Hi%20Sourabh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors"
                      title="Open WhatsApp Chat"
                    >
                      <FaWhatsapp size={15} />
                    </motion.a>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => copyText('+919755826293', 'phone')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy Phone Number"
                    >
                      {copiedPhone ? <FaCheck className="text-emerald-400" size={14} /> : <FaCopy size={14} />}
                    </motion.button>
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={
                    copiedPhone
                      ? { opacity: 1, y: -8, scale: 1 }
                      : { opacity: 0, y: 4, scale: 0.9 }
                  }
                  transition={{ duration: 0.25 }}
                  className="absolute -top-7 right-2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg pointer-events-none"
                >
                  Copied to clipboard!
                </motion.div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-emerald-400" /> Indore, MP, India (IST UTC+5:30)
              </span>
              <a
                href="https://wa.me/919755826293?text=Hi%20Sourabh%2C%20I%20came%20across%20your%20portfolio..."
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline font-semibold"
              >
                WhatsApp Chat &rarr;
              </a>
            </div>
          </TiltCard>
        </div>

        {/* Big Interactive "Start a Project" Banner */}
        <motion.div
          style={{ y: bannerY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-r from-cyan-950/40 via-[#0e1628] to-purple-950/40 border border-cyan-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center space-y-6 overflow-hidden"
        >
          {/* Animated border shimmer */}
          <motion.div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'conic-gradient(from 0deg, transparent, rgba(0,242,254,0.25), transparent 30%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Have a Specific Vision or High-Priority Deadline?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Use our interactive 4-step wizard to scope your project type, select your budget,
              and trigger a structured engineering proposal.
            </p>
          </div>

          <div className="relative pt-2 flex justify-center">
            <MagneticButton onClick={onOpenInquiry} />
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 pt-4">
            <span className="flex items-center gap-1.5">
              <FaShieldAlt className="text-cyan-400" /> Confidential & NDA Protected
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-emerald-400" /> Rapid Proposal Dispatch
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;