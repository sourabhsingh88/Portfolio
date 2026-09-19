import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Sections/Navbar';
import Hero from './Sections/Hero';
import About from './Sections/About';
import Education from './Sections/Education';
import Technologies from './Sections/Technologies';
import Projects from './Sections/Projects';
import ProjectsList from './Sections/ProjectsList';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';

// Core Interactive Components
import GlowingCursor from './components/GlowingCursor';
import TerminalDrawer from './components/TerminalDrawer';
import ProjectInquiryModal from './components/ProjectInquiryModal';
import FloatingProjectPill from './components/FloatingProjectPill';

export const App: React.FC = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const openInquiry = () => setIsInquiryOpen(true);
  const closeInquiry = () => setIsInquiryOpen(false);

  const openTerminal = () => setIsTerminalOpen(true);
  const closeTerminal = () => setIsTerminalOpen(false);

  return (
    <div className="bg-[#0a0a0f] text-slate-100 min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Desktop Ambient Cursor Follower */}
      <GlowingCursor />

      {/* Global Interactive Terminal Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={closeTerminal}
        onOpenInquiryModal={openInquiry}
      />

      {/* Global Freelance Inquiry Wizard Modal */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={closeInquiry}
      />

      {/* Persistent Floating Project & Terminal Quick Pill */}
      <FloatingProjectPill
        onOpenInquiry={openInquiry}
        onOpenTerminal={openTerminal}
      />

      <Routes>
        {/* Main Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar onOpenInquiry={openInquiry} onOpenTerminal={openTerminal} />
              <Hero onOpenInquiry={openInquiry} onOpenTerminal={openTerminal} />
              <Projects />
              <Technologies />
              <About />
              <Education />
              <Contact onOpenInquiry={openInquiry} />
              <Footer onOpenInquiry={openInquiry} onOpenTerminal={openTerminal} />
            </>
          }
        />

        {/* Projects Archive Route */}
        <Route
          path="/projects"
          element={
            <>
              <Navbar onOpenInquiry={openInquiry} onOpenTerminal={openTerminal} />
              <ProjectsList />
              <Footer onOpenInquiry={openInquiry} onOpenTerminal={openTerminal} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;