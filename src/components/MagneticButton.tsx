import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  strength?: number;
  disabled?: boolean;
}

const SPRING_CONFIG = { damping: 15, stiffness: 200, mass: 0.1 };

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 30,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const springX = useSpring(0, SPRING_CONFIG);
  const springY = useSpring(0, SPRING_CONFIG);

  const handleMouseEnter = () => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !rectRef.current) return;
    const { left, top, width, height } = rectRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    springX.set((distanceX / (width / 2)) * strength);
    springY.set((distanceY / (height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block cursor-pointer will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
