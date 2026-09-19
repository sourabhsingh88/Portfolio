import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

export const Contact: React.FC<ContactProps> = ({ onOpenInquiry }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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
      className="relative min-h-screen w-full bg-[#0a0a0f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>COMMUNICATION CHANNELS & FREELANCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Let's Engineer Something <span className="text-gradient-cyan">Extraordinary</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you need a scalable API architecture, an intelligent machine learning pipeline, or full-stack web engineering, I'm ready to collaborate.
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email Direct Channel Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0e1322]/90 border border-cyan-500/30 rounded-2xl p-8 shadow-xl backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                  <FaEnvelope />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  PRIMARY CHANNEL
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Direct Email Dispatch
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click to launch your mail client or use the copy button for instant clipboard access.
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
                  <button
                    onClick={() => copyText('devsourabh07@gmail.com', 'email')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0 ml-2"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <FaCheck className="text-emerald-400" size={14} /> : <FaCopy size={14} />}
                  </button>
                </div>
                {copiedEmail && (
                  <div className="absolute -top-7 right-2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
                    Copied to clipboard!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <FaClock className="text-cyan-400" /> Reply within 12–24 hours
              </span>
              <a
                href="mailto:devsourabh07@gmail.com"
                className="text-cyan-400 hover:underline font-semibold"
              >
                Send Email &rarr;
              </a>
            </div>
          </motion.div>

          {/* Phone & WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0e1322]/90 border border-emerald-500/30 rounded-2xl p-8 shadow-xl backdrop-blur-xl relative overflow-hidden group hover:border-emerald-400/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                  <FaPhone />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  PHONE & WHATSAPP
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Direct Line & Quick Chat
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Call directly or launch a WhatsApp conversation for fast project discussions.
                </p>
              </div>

              <div className="relative">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                  <a
                    href="tel:+919755826293"
                    className="text-emerald-300 font-mono text-sm sm:text-base hover:underline"
                  >
                    +91 9755826293
                  </a>
                  <div className="flex items-center gap-1.5 ml-2">
                    <a
                      href="https://wa.me/919755826293?text=Hi%20Sourabh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-all"
                      title="Open WhatsApp Chat"
                    >
                      <FaWhatsapp size={15} />
                    </a>
                    <button
                      onClick={() => copyText('+919755826293', 'phone')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy Phone Number"
                    >
                      {copiedPhone ? <FaCheck className="text-emerald-400" size={14} /> : <FaCopy size={14} />}
                    </button>
                  </div>
                </div>
                {copiedPhone && (
                  <div className="absolute -top-7 right-2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
                    Copied to clipboard!
                  </div>
                )}
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
          </motion.div>
        </div>

        {/* Big Interactive "Start a Project" Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-950/40 via-[#0e1628] to-purple-950/40 border border-cyan-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center space-y-6"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Have a Specific Vision or High-Priority Deadline?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Use our interactive 4-step wizard to scope your project type, select your budget, and trigger a structured engineering proposal.
            </p>
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenInquiry}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-heading font-bold text-base shadow-[0_0_30px_rgba(0,242,254,0.4)] inline-flex items-center gap-3 transition-all"
            >
              <FaBolt className="text-slate-950" />
              <span>Launch Interactive Project Wizard</span>
            </motion.button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 pt-4">
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