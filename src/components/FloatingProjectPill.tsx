import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt } from 'react-icons/fa';

interface FloatingProjectPillProps {
  onOpenInquiry: () => void;
  onOpenTerminal: () => void;
}

export const FloatingProjectPill: React.FC<FloatingProjectPillProps> = ({
  onOpenInquiry,
  onOpenTerminal,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
      {/* Terminal Launcher Icon Pill */}
      <motion.button
        onClick={onOpenTerminal}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        title="Open Systems Telemetry Terminal"
        aria-label="Open Systems Terminal"
        className="w-12 h-12 rounded-full bg-[#0e1422]/90 hover:bg-[#151f33] border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_4px_20px_rgba(0,242,254,0.25)] backdrop-blur-md transition-all font-mono text-xs font-bold group"
      >
        <span className="group-hover:text-white transition-colors">&gt;_</span>
      </motion.button>

      {/* Main "Start a Project" Pill */}
      <motion.button
        onClick={onOpenInquiry}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-[#0c1220] to-[#12192d] border border-cyan-400/50 hover:border-cyan-400 text-white font-heading text-xs sm:text-sm font-semibold shadow-[0_6px_25px_rgba(0,242,254,0.3)] backdrop-blur-xl transition-all overflow-hidden"
      >
        {/* Glow shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Live Status Indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        <span className="relative tracking-wide flex items-center gap-1.5">
          <FaBolt className="text-cyan-400 group-hover:text-cyan-300 text-xs" />
          <span>Start a Project</span>
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingProjectPill;
