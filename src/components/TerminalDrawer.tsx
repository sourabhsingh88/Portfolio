import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaExpandAlt, FaCompressAlt, FaTrash, FaCheck } from 'react-icons/fa';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiryModal: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
  time: string;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  onOpenInquiryModal,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      time: '00:00:01',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">SOURABH_OS [Version 2.4.0-PROD]</p>
          <p className="text-slate-400">Interactive Sandbox & Systems Telemetry Terminal</p>
          <p className="text-xs text-emerald-400">STATUS: 🟢 ALL SERVICES OPERATIONAL</p>
          <p className="text-xs text-slate-500 pt-1">
            Type <span className="text-cyan-300 font-semibold">'help'</span> to inspect available directives or click any suggestion chip below.
          </p>
        </div>
      ),
    },
  ]);

  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const getTimeString = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setPastCommands((prev) => [...prev, cmd]);
    setHistoryIndex(null);

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
            <div><span className="text-cyan-400 font-bold">about</span> - Background & engineering mindset</div>
            <div><span className="text-cyan-400 font-bold">skills</span> - Full-stack & AI technical stack</div>
            <div><span className="text-cyan-400 font-bold">projects</span> - Production systems & architecture</div>
            <div><span className="text-cyan-400 font-bold">stats</span> - Real-time metrics & benchmark telemetry</div>
            <div><span className="text-cyan-400 font-bold">contact</span> - Direct phone & email channels</div>
            <div><span className="text-emerald-400 font-bold">sudo hire</span> - Launch Freelance Inquiry Wizard</div>
            <div><span className="text-rose-400 font-bold">clear</span> - Clear terminal session output</div>
          </div>
        );
        break;

      case 'about':
        output = (
          <p className="text-slate-300 leading-relaxed text-xs">
            Sourabh Singh Mandloi — Full-Stack Engineer & AI/ML Systems Specialist based in Indore, India.
            Passionate about transforming distributed challenges into resilient, high-speed architectures using FastAPI,
            Spring Boot, Oracle Cloud DB, and modern neural models.
          </p>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><strong className="text-cyan-400">Backend Core:</strong> Java, Spring Boot, Python, FastAPI, Flask, REST APIs, Microservices</p>
            <p><strong className="text-purple-400">Cloud & DevOps:</strong> Docker, CI/CD, AWS ML, Linux, Automated Testing</p>
            <p><strong className="text-amber-400">Databases:</strong> MySQL, Oracle Cloud DB, Hibernate/JPA, Relational Schema Normalization</p>
            <p><strong className="text-emerald-400">AI / ML:</strong> MobileNet v2, Computer Vision, Cosine Similarity, Scikit-learn, Algorithmic Trading</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <div className="border-l-2 border-cyan-400 pl-2">
              <span className="font-bold text-white">Automated Trading Platform</span>: FastAPI + MT5 Bot.
              <span className="text-emerald-400 ml-1">(+25–30% returns over manual strategies; 10k+ req/day)</span>
            </div>
            <div className="border-l-2 border-purple-400 pl-2">
              <span className="font-bold text-white">Image Search Engine</span>: MobileNet v2 + Flask + Cosine Sim.
              <span className="text-cyan-400 ml-1">(85%+ accuracy boost, 40% query latency reduction)</span>
            </div>
            <div className="border-l-2 border-amber-400 pl-2">
              <span className="font-bold text-white">Trip Planner Enterprise</span>: Spring Boot + Angular + MySQL.
              <span className="text-yellow-400 ml-1">(10+ RESTful APIs, 30% faster DB performance)</span>
            </div>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-center">
            <div className="bg-slate-900/60 p-2 rounded border border-cyan-500/30">
              <div className="text-cyan-400 font-bold text-lg">10,000+</div>
              <div className="text-[10px] text-slate-400 uppercase">Requests/Day</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-emerald-500/30">
              <div className="text-emerald-400 font-bold text-lg">85%+</div>
              <div className="text-[10px] text-slate-400 uppercase">Model Accuracy</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-purple-500/30">
              <div className="text-purple-400 font-bold text-lg">30%</div>
              <div className="text-[10px] text-slate-400 uppercase">Latency Cut</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-amber-500/30">
              <div className="text-amber-400 font-bold text-lg">100%</div>
              <div className="text-[10px] text-slate-400 uppercase">Code Coverage</div>
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs">
            <p>Email: <a href="mailto:devsourabh07@gmail.com" className="text-cyan-400 underline">devsourabh07@gmail.com</a></p>
            <p>Phone: <a href="tel:+919755826293" className="text-emerald-400 underline">+91 9755826293</a></p>
            <p>WhatsApp: <a href="https://wa.me/919755826293" target="_blank" rel="noreferrer" className="text-green-400 underline">Chat on WhatsApp</a></p>
            <p>GitHub: <a href="https://github.com/sourabhsingh88" target="_blank" rel="noreferrer" className="text-slate-300 underline">github.com/sourabhsingh88</a></p>
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        output = (
          <div className="text-emerald-400 font-semibold text-xs flex items-center gap-2">
            <FaCheck /> Launching Freelance Inquiry Wizard modal...
          </div>
        );
        setTimeout(() => {
          onClose();
          onOpenInquiryModal();
        }, 600);
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs">
            Command not recognized: '<span className="text-white">{rawCmd}</span>'. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => handleCommand('help')}>'help'</span> for list.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: rawCmd,
        output,
        time: getTimeString(),
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (pastCommands.length === 0) return;
      const nextIndex = historyIndex === null ? pastCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(pastCommands[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      if (pastCommands.length === 0 || historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= pastCommands.length) {
        setHistoryIndex(null);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(pastCommands[nextIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Drawer Window */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative z-10 w-full ${
              isMaximized ? 'max-w-5xl h-[85vh]' : 'max-w-3xl h-[520px]'
            } bg-[#0c0f17] border border-cyan-500/30 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono`}
          >
            {/* Window Header */}
            <div className="bg-[#121724] px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <FaTerminal className="text-cyan-400 text-xs" />
                <span className="text-xs font-bold text-slate-200 tracking-wide">
                  sourabh@portfolio:~ (telemetry-cli)
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <button
                  onClick={() => setHistory([])}
                  title="Clear Console"
                  className="hover:text-rose-400 transition-colors p-1"
                >
                  <FaTrash size={11} />
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? 'Restore' : 'Maximize'}
                  className="hover:text-cyan-300 transition-colors p-1 hidden sm:block"
                >
                  {isMaximized ? <FaCompressAlt size={11} /> : <FaExpandAlt size={11} />}
                </button>
                <button
                  onClick={onClose}
                  title="Close Terminal"
                  className="hover:text-white transition-colors p-1"
                >
                  <FaTimes size={13} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-cyan-400 font-bold">sourabh@sys:~$</span>
                    <span className="text-emerald-400">{item.command}</span>
                    <span className="ml-auto text-[10px] text-slate-600">{item.time}</span>
                  </div>
                  <div className="pl-4 text-slate-200">{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-4 py-2 bg-[#0e131f] border-t border-slate-800 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 text-[10px] uppercase font-bold mr-1">Directives:</span>
              {['help', 'stats', 'skills', 'projects', 'contact', 'sudo hire', 'clear'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleCommand(chip)}
                  className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all text-xs"
                >
                  {chip === 'sudo hire' ? '⚡ sudo hire' : chip}
                </button>
              ))}
            </div>

            {/* Command Input Prompt */}
            <div className="p-3 bg-[#0a0e17] border-t border-cyan-500/20 flex items-center gap-2">
              <span className="text-cyan-400 font-bold text-xs">sourabh@sys:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type directive (e.g. 'stats', 'sudo hire', 'help')..."
                className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 outline-none text-xs font-mono"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs rounded transition-colors"
              >
                RUN
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalDrawer;
