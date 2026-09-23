import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaArrowUp,
  FaTerminal,
  FaClock,
  FaCopy,
  FaCheck,
  FaHeart,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

interface FooterProps {
  onOpenTerminal?: () => void;
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
    animate={{ y: [0, -16, 0], opacity: [0.15, 0.7, 0.15] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ---------- Magnetic icon wrapper (social links / small buttons) ---------- */
const MagneticIcon: React.FC<{
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  target?: string;
}> = ({ children, className, href, onClick, ariaLabel, target }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 16 });
  const springY = useSpring(y, { stiffness: 250, damping: 16 });

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current || ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };
  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  const Tag: any = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="inline-block"
    >
      <Tag
        href={href}
        target={target}
        rel={target ? 'noreferrer' : undefined}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

/* ---------- Isolated Live Clock Component (Prevents Footer Re-renders) ---------- */
const LiveClock: React.FC = React.memo(() => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0px rgba(0,242,254,0.2)',
            '0 0 14px rgba(0,242,254,0.35)',
            '0 0 0px rgba(0,242,254,0.2)',
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400"
      >
        <FaClock size={16} />
      </motion.div>
      <div>
        <div className="flex items-center gap-2 text-slate-400 text-[11px] uppercase">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <span>LOCAL TIMEZONE // IST (UTC+5:30)</span>
        </div>
        <div className="text-base font-bold text-white tracking-wider mt-0.5">
          {currentTime || '12:00:00 PM'}{' '}
          <span className="text-cyan-400 text-xs font-normal">INDORE, INDIA</span>
        </div>
      </div>
    </div>
  );
});

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenInquiry }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const navLinks = [
    { name: 'Home', section: 'hero' },
    { name: 'Architecture', section: 'projects' },
    { name: 'Arsenal', section: 'technologies' },
    { name: 'Mindset', section: 'about' },
    { name: 'Credentials', section: 'education' },
    { name: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 85, behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const particles = useMemo(
    () => [
      { x: '8%', y: '30%', size: 3, color: '#22d3ee', delay: 0 },
      { x: '92%', y: '20%', size: 2.5, color: '#a78bfa', delay: 1.1 },
      { x: '50%', y: '10%', size: 2, color: '#34d399', delay: 2 },
    ],
    []
  );

  return (
    <footer className="relative bg-[#07090f] text-slate-300 pt-16 pb-12 border-t border-cyan-500/20 overflow-hidden font-sans">
      {/* Background glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <motion.div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-24 right-6 w-11 h-11 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_4px_15px_rgba(0,242,254,0.2)] backdrop-blur-md z-30"
            aria-label="Scroll to top"
          >
            <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <FaArrowUp size={13} />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HUD Minimalist Dock Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0b0f1a]/90 border border-cyan-500/25 rounded-2xl p-5 sm:p-6 mb-12 shadow-xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* subtle scanning line across the HUD */}
          <motion.div
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent pointer-events-none"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Timezone HUD Clock */}
            <LiveClock />

            {/* Middle: Email & Phone Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              {/* Email Chip */}
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-xl transition-colors"
              >
                <a href="mailto:devsourabh07@gmail.com" className="text-cyan-300 hover:text-cyan-200">
                  devsourabh07@gmail.com
                </a>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => copyText('devsourabh07@gmail.com', 'email')}
                  className="text-slate-400 hover:text-white p-0.5 transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <FaCheck className="text-emerald-400" size={10} /> : <FaCopy size={10} />}
                </motion.button>
              </motion.div>

              {/* Phone Chip */}
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 px-3 py-1.5 rounded-xl transition-colors"
              >
                <a href="tel:+919755826293" className="text-emerald-300 hover:text-emerald-200">
                  +91 9755826293
                </a>
                <a
                  href="https://wa.me/919755826293"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 p-0.5"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={12} />
                </a>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => copyText('+919755826293', 'phone')}
                  className="text-slate-400 hover:text-white p-0.5 transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <FaCheck className="text-emerald-400" size={10} /> : <FaCopy size={10} />}
                </motion.button>
              </motion.div>
            </div>

            {/* Right: Quick Triggers */}
            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenTerminal}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
              >
                <FaTerminal size={11} />
                <span>CLI Terminal</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenInquiry}
                className="relative px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-heading text-xs overflow-hidden transition-colors"
              >
                <motion.span
                  className="absolute inset-0 bg-white/30"
                  style={{ width: '30%' }}
                  animate={{ x: ['-120%', '260%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
                />
                <span className="relative">Start a Project</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Identity Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-3"
          >
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-7 h-7 rounded-lg bg-cyan-400 text-slate-950 font-mono font-bold flex items-center justify-center text-xs"
              >
                S
              </motion.div>
              <span className="font-heading font-bold text-white text-lg">Sourabh Singh Mandloi</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Full-Stack Systems Architect & AI/ML Specialist building production APIs,
              distributed architectures, algorithmic trading bots, and computer vision search
              pipelines.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <MagneticIcon
                href="https://github.com/sourabhsingh88"
                target="_blank"
                ariaLabel="GitHub"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-white transition-colors flex items-center justify-center"
              >
                <FaGithub size={14} />
              </MagneticIcon>
              <MagneticIcon
                href="https://www.linkedin.com/in/sourabh-singh-mandloi/"
                target="_blank"
                ariaLabel="LinkedIn"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
              >
                <FaLinkedin size={14} />
              </MagneticIcon>
              <MagneticIcon
                href="mailto:devsourabh07@gmail.com"
                ariaLabel="Email"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
              >
                <FaEnvelope size={14} />
              </MagneticIcon>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Navigation
            </h4>
            <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.section)}
                  whileHover={{ x: 3 }}
                  className="text-left text-slate-400 hover:text-cyan-300 transition-colors py-1 flex items-center gap-2 group"
                >
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>{link.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Direct Channels Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Inquiries
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <p>
                Email:{' '}
                <a href="mailto:devsourabh07@gmail.com" className="text-slate-300 hover:text-cyan-300">
                  devsourabh07@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+919755826293" className="text-slate-300 hover:text-emerald-300">
                  +91 9755826293
                </a>
              </p>
              <p>
                Location: <span className="text-slate-300">Indore, MP, India</span>
              </p>
              <div className="pt-2">
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                >
                  Contracts: Active
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright & Sub-bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500"
        >
          <div>&copy; {currentYear} Sourabh Singh Mandloi. All rights reserved.</div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with</span>
            <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>
              <FaHeart className="text-rose-500" size={11} />
            </motion.span>
            <span>using React, Tailwind CSS &amp; Framer Motion</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;