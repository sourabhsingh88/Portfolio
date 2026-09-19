import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  FaTimes,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaPaperPlane,
  FaCopy,
  FaCheck,
  FaRocket,
  FaShieldAlt,
  FaClock,
} from 'react-icons/fa';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  { id: 'backend-api', label: 'Backend / API Architecture', desc: 'FastAPI, Spring Boot, Microservices, REST' },
  { id: 'fullstack', label: 'Full-Stack Web App', desc: 'React / Angular + Scalable Python/Java Core' },
  { id: 'cloud-microservices', label: 'Microservices & Cloud', desc: 'Docker, CI/CD, AWS, Distributed Services' },
  { id: 'custom-integration', label: 'Custom Integration / Trading', desc: 'Automated bots, Webhooks, Third-party APIs' },
  { id: 'consultation', label: 'Architecture & Consultation', desc: 'Code Review, Database Schema, Performance Audit' },
];

const BUDGET_TIERS = [
  { id: 'tier-1', label: '$1k - $3k', sub: 'Rapid MVP / Prototype', timeline: '2 - 4 weeks' },
  { id: 'tier-2', label: '$3k - $7k', sub: 'Production Grade System', timeline: '1 - 2 months' },
  { id: 'tier-3', label: '$7k - $15k+', sub: 'Enterprise Architecture & Scale', timeline: '2+ months' },
  { id: 'tier-custom', label: 'Flexible / Retainer', sub: 'Hourly or Monthly Contract', timeline: 'Ongoing' },
];

const TIMELINE_OPTIONS = [
  'Immediate (< 2 weeks)',
  'Within 1 month',
  '1 to 3 months',
  'Flexible / Planning Phase',
];

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Backend / API Architecture']);
  const [selectedBudget, setSelectedBudget] = useState('$3k - $7k');
  const [budgetSliderVal, setBudgetSliderVal] = useState(5000);
  const [timeline, setTimeline] = useState('Within 1 month');
  const [details, setDetails] = useState('');
  
  // Contact info
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientHandle, setClientHandle] = useState('');

  // Status & Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#4facfe', '#00ff88', '#f59e0b', '#7928ca'],
      });
    } catch {
      // Graceful fallback if canvas confetti context fails
    }
  };

  const toggleType = (label: string) => {
    setSelectedTypes((prev) =>
      prev.includes(label)
        ? prev.length > 1 ? prev.filter((t) => t !== label) : prev
        : [...prev, label]
    );
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (selectedTypes.length === 0) {
        newErrors.type = 'Please select at least one project focus.';
      }
    } else if (step === 3) {
      if (details.trim().length < 15) {
        newErrors.details = 'Please provide at least 15 characters describing your project vision.';
      }
    } else if (step === 4) {
      if (!clientName.trim()) {
        newErrors.name = 'Please enter your name.';
      }
      if (!clientEmail.trim() || !/^\S+@\S+\.\S+$/.test(clientEmail)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const generateInquirySummary = () => {
    return `[INQUIRY FOR SOURABH SINGH]
Client: ${clientName}
Email: ${clientEmail}
Handle / Phone: ${clientHandle || 'Not provided'}
Project Types: ${selectedTypes.join(', ')}
Budget Range: ${selectedBudget} (Approx $${budgetSliderVal.toLocaleString()})
Timeline: ${timeline}

Project Overview:
${details}

---
Sent via Sourabh Portfolio Interactive Portal`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerCelebration();

      // Launch mailto directed to devsourabh07@gmail.com
      const subject = encodeURIComponent(`Project Inquiry: ${selectedTypes[0]} - ${clientName}`);
      const body = encodeURIComponent(generateInquirySummary());
      const mailtoUrl = `mailto:devsourabh07@gmail.com?subject=${subject}&body=${body}`;

      // Open mail client
      window.open(mailtoUrl, '_blank');
    }, 900);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateInquirySummary());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    setDetails('');
    setClientName('');
    setClientEmail('');
    setClientHandle('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          {/* Backdrop */}
          <div className="fixed inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl bg-[#0d111a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden font-sans my-8"
          >
            {/* Header */}
            <div className="bg-[#111726] px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                  <FaRocket size={15} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading tracking-wide">
                    Start a Project / Freelance Inquiry
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono">
                    Direct Channel: <span className="underline">devsourabh07@gmail.com</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-all flex items-center justify-center"
              >
                <FaTimes size={13} />
              </button>
            </div>

            {/* Step Progress Bar */}
            {!isSuccess && (
              <div className="bg-[#0a0e17] px-6 pt-3 pb-2 border-b border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-cyan-400 font-semibold">
                    STEP {currentStep} OF 4:{' '}
                    {currentStep === 1 && 'PROJECT SCOPE'}
                    {currentStep === 2 && 'BUDGET & TIMELINE'}
                    {currentStep === 3 && 'PROJECT DETAILS'}
                    {currentStep === 4 && 'CONTACT INFORMATION'}
                  </span>
                  <span className="text-slate-500">{Math.round((currentStep / 4) * 100)}% COMPLETE</span>
                </div>
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    initial={{ width: '25%' }}
                    animate={{ width: `${(currentStep / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6">
              {isSuccess ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                    <FaCheckCircle />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white font-heading">
                      Inquiry Initiated Successfully!
                    </h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your inquiry payload has been prepared for <strong className="text-cyan-300">devsourabh07@gmail.com</strong>.
                      Your mail client should now open automatically with everything pre-filled.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 max-w-lg mx-auto text-left text-xs font-mono text-slate-400 space-y-1">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Inquiry Summary:</div>
                    <p><strong className="text-slate-300">Client:</strong> {clientName} ({clientEmail})</p>
                    <p><strong className="text-slate-300">Type:</strong> {selectedTypes.join(', ')}</p>
                    <p><strong className="text-slate-300">Budget:</strong> {selectedBudget} (${budgetSliderVal.toLocaleString()})</p>
                    <p><strong className="text-slate-300">Timeline:</strong> {timeline}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleCopySummary}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-2 transition-all"
                    >
                      {isCopied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                      {isCopied ? 'Summary Copied to Clipboard!' : 'Copy Summary to Clipboard'}
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
                    >
                      Done / Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Multi-Step Wizard */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* STEP 1: PROJECT TYPE */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white font-heading">
                          What kind of engineering challenge are we tackling?
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Select one or more core domains relevant to your project:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {PROJECT_TYPES.map((pt) => {
                          const isSelected = selectedTypes.includes(pt.label);
                          return (
                            <div
                              key={pt.id}
                              onClick={() => toggleType(pt.label)}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                                isSelected
                                  ? 'bg-cyan-500/10 border-cyan-400/80 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div>
                                <div className="text-sm font-semibold text-white flex items-center gap-2">
                                  <span>{pt.label}</span>
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5">{pt.desc}</div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                                    : 'border-slate-700'
                                }`}
                              >
                                {isSelected && <FaCheck size={10} />}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {errors.type && <p className="text-rose-400 text-xs">{errors.type}</p>}
                    </motion.div>
                  )}

                  {/* STEP 2: BUDGET & TIMELINE */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white font-heading">
                          Budget & Delivery Expectations
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Transparent estimation helps align technical scope and architecture depth.
                        </p>
                      </div>

                      {/* Tier Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {BUDGET_TIERS.map((tier) => {
                          const isSelected = selectedBudget === tier.label;
                          return (
                            <div
                              key={tier.id}
                              onClick={() => {
                                setSelectedBudget(tier.label);
                                if (tier.id === 'tier-1') setBudgetSliderVal(2500);
                                if (tier.id === 'tier-2') setBudgetSliderVal(5000);
                                if (tier.id === 'tier-3') setBudgetSliderVal(10000);
                              }}
                              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-cyan-500/10 border-cyan-400/80 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-cyan-300 font-mono">{tier.label}</span>
                                <span className="text-[10px] text-slate-500">{tier.timeline}</span>
                              </div>
                              <div className="text-xs text-slate-300 mt-1">{tier.sub}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Interactive Budget Slider */}
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">Fine-tune Approx Budget:</span>
                          <span className="text-cyan-400 font-bold font-mono text-sm">
                            ${budgetSliderVal.toLocaleString()} USD
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={20000}
                          step={500}
                          value={budgetSliderVal}
                          onChange={(e) => setBudgetSliderVal(Number(e.target.value))}
                          className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>$1,000</span>
                          <span>$10,000</span>
                          <span>$20,000+</span>
                        </div>
                      </div>

                      {/* Timeline selection */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <FaClock className="text-cyan-400" /> Target Timeline
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {TIMELINE_OPTIONS.map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setTimeline(opt)}
                              className={`py-2 px-3 rounded-lg border text-xs text-left transition-all ${
                                timeline === opt
                                  ? 'bg-blue-600/20 border-blue-400 text-blue-300'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: PROJECT DETAILS */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white font-heading">
                          Project Details & Architectural Scope
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Share key goals, existing tech stack, target users, or performance requirements:
                        </p>
                      </div>

                      <div className="relative">
                        <textarea
                          rows={6}
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="e.g. We are designing a distributed microservice backend with FastAPI and PostgreSQL handling 50k daily active users. We need clean API contracts, automated integration tests, and Docker container deployment..."
                          className="w-full bg-slate-900/70 border border-slate-800 focus:border-cyan-400/80 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all resize-none font-sans"
                        />
                        <div className="text-right text-[11px] font-mono text-slate-500 mt-1">
                          {details.length} characters (min 15)
                        </div>
                      </div>

                      {errors.details && <p className="text-rose-400 text-xs">{errors.details}</p>}

                      <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                        <FaShieldAlt className="text-cyan-400 text-sm mt-0.5 flex-shrink-0" />
                        <span>
                          NDA & Privacy guaranteed. Your inquiry is confidential and shared solely with Sourabh Singh.
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: CONTACT INFORMATION */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white font-heading">
                          Where should I send my engineering proposal?
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          I usually review project briefs and reply within 12–24 hours.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Your Name / Company *
                          </label>
                          <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Alex Mercer, CTO at Apex Labs"
                            className="w-full bg-slate-900/70 border border-slate-800 focus:border-cyan-400/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                          />
                          {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="alex@apexlabs.dev"
                            className="w-full bg-slate-900/70 border border-slate-800 focus:border-cyan-400/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                          />
                          {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Phone / Telegram / Discord (Optional)
                          </label>
                          <input
                            type="text"
                            value={clientHandle}
                            onChange={(e) => setClientHandle(e.target.value)}
                            placeholder="+1 (555) 019-2834 or @handle"
                            className="w-full bg-slate-900/70 border border-slate-800 focus:border-cyan-400/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-slate-500">
                        Inquiries direct to: <span className="text-cyan-400">devsourabh07@gmail.com</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <FaArrowLeft size={10} /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all hover:scale-105"
                      >
                        Continue <FaArrowRight size={10} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all hover:scale-105 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>Dispatching Inquiry...</>
                        ) : (
                          <>
                            <FaPaperPlane /> Submit Inquiry
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectInquiryModal;
