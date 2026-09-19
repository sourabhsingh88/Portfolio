import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const GlowingCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor halo
  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const haloX = useSpring(mouseX, springConfig);
  const haloY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate cursor enhancement on devices with fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Ambient Large Spotlight */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25"
        style={{
          x: haloX,
          y: haloY,
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.4) 0%, rgba(121, 40, 202, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* Cyber Halo Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40"
        style={{
          x: haloX,
          y: haloY,
        }}
        animate={{
          width: isHovered ? 48 : isClicked ? 24 : 32,
          height: isHovered ? 48 : isClicked ? 24 : 32,
          borderColor: isHovered ? 'rgba(0, 242, 254, 0.9)' : 'rgba(0, 242, 254, 0.4)',
          backgroundColor: isHovered ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* Core Center Dot */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default GlowingCursor;
