import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const GlowingCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isHoveredRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive spring for cursor halo
  const springConfig = { damping: 28, stiffness: 300, mass: 0.15 };
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
    };

    // Use event delegation for hover detection — fires only when crossing element boundaries, not on every pixel
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = !!target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      if (interactive !== isHoveredRef.current) {
        isHoveredRef.current = interactive;
        setIsHovered(interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Ambient Large Spotlight — uses pure CSS radial gradient with natural transparency falloff, zero blur filter cost */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform opacity-30"
        style={{
          x: haloX,
          y: haloY,
          width: 340,
          height: 340,
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.25) 0%, rgba(121, 40, 202, 0.12) 35%, rgba(0, 242, 254, 0.02) 60%, transparent 75%)',
        }}
      />

      {/* Cyber Halo Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 will-change-transform"
        style={{
          x: haloX,
          y: haloY,
        }}
        animate={{
          width: isHovered ? 44 : isClicked ? 22 : 30,
          height: isHovered ? 44 : isClicked ? 22 : 30,
          borderColor: isHovered ? 'rgba(0, 242, 254, 0.9)' : 'rgba(0, 242, 254, 0.35)',
          backgroundColor: isHovered ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      />

      {/* Core Center Dot */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 will-change-transform shadow-[0_0_6px_#00f2fe]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? 5 : 4,
          height: isHovered ? 5 : 4,
        }}
        transition={{ duration: 0.08 }}
      />
    </div>
  );
};

export default GlowingCursor;
