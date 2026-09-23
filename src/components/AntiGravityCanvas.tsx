import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TechNode {
  id: string;
  name: string;
  category: 'backend' | 'cloud' | 'database' | 'architecture';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  baseX: number;
  baseY: number;
  floatAngle: number;
  floatSpeed: number;
}

interface AntiGravityCanvasProps {
  activeCategory?: string;
  onSelectNode?: (nodeName: string) => void;
  className?: string;
}

const TECH_ITEMS = [
  { name: 'FastAPI', category: 'backend', color: '#00f2fe', glow: 'rgba(0, 242, 254, 0.35)' },
  { name: 'Spring Boot', category: 'backend', color: '#00ff88', glow: 'rgba(0, 255, 136, 0.35)' },
  { name: 'Java', category: 'backend', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)' },
  { name: 'Python', category: 'backend', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.35)' },
  { name: 'REST APIs', category: 'backend', color: '#818cf8', glow: 'rgba(129, 140, 248, 0.35)' },
  { name: 'Microservices', category: 'backend', color: '#a78bfa', glow: 'rgba(167, 139, 250, 0.35)' },

  { name: 'Docker', category: 'cloud', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.35)' },
  { name: 'CI/CD Pipelines', category: 'cloud', color: '#34d399', glow: 'rgba(52, 211, 153, 0.35)' },
  { name: 'AWS ML', category: 'cloud', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.35)' },
  { name: 'Linux SysOps', category: 'cloud', color: '#fb7185', glow: 'rgba(251, 113, 133, 0.35)' },

  { name: 'MySQL', category: 'database', color: '#0284c7', glow: 'rgba(2, 132, 199, 0.35)' },
  { name: 'Oracle Cloud DB', category: 'database', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.35)' },
  { name: 'Hibernate/JPA', category: 'database', color: '#c084fc', glow: 'rgba(192, 132, 252, 0.35)' },
  { name: 'Schema Design', category: 'database', color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.35)' },

  { name: 'AI/ML Systems', category: 'architecture', color: '#00f2fe', glow: 'rgba(0, 242, 254, 0.35)' },
  { name: 'MobileNet v2', category: 'architecture', color: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)' },
  { name: 'Computer Vision', category: 'architecture', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)' },
  { name: 'Cosine Sim Engine', category: 'architecture', color: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
  { name: 'Automated Trading', category: 'architecture', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)' },
];

export const AntiGravityCanvas: React.FC<AntiGravityCanvasProps> = ({
  activeCategory = 'all',
  onSelectNode,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<TechNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isHovering: false, isDown: false, draggedNode: null as TechNode | null });
  const [hoveredNodeName, setHoveredNodeName] = useState<string | null>(null);
  const lastHoveredRef = useRef<string | null>(null);
  const isVisibleRef = useRef(true);

  // Initialize nodes
  const initNodes = useCallback((width: number, height: number) => {
    const cols = Math.min(5, Math.max(3, Math.floor(width / 160)));
    const rows = Math.ceil(TECH_ITEMS.length / cols);
    const cellW = width / (cols + 1);
    const cellH = height / (rows + 1);

    nodesRef.current = TECH_ITEMS.map((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const baseX = cellW * (col + 1) + (Math.random() * 30 - 15);
      const baseY = cellH * (row + 1) + (Math.random() * 20 - 10);

      return {
        id: `node-${index}`,
        name: item.name,
        category: item.category as TechNode['category'],
        x: baseX,
        y: baseY,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 34,
        color: item.color,
        glowColor: item.glow,
        baseX,
        baseY,
        floatAngle: Math.random() * Math.PI * 2,
        floatSpeed: 0.012 + Math.random() * 0.01,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = container.clientWidth || 800);
    let height = (canvas.height = container.clientHeight || 500);

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      initNodes(width, height);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    initNodes(width, height);

    // Pause canvas loop when offscreen using IntersectionObserver to save 100% CPU/GPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animationId);
          animationId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    const render = () => {
      if (!isVisibleRef.current) return;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const nodesCount = nodes.length;

      // Draw constellation connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodesCount; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodesCount; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          // distSq < 22500 is equivalent to dist < 150 (avoids Math.sqrt)
          if (distSq < 22500) {
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist / 150) * 0.18})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse if active
        if (mouse.isHovering) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 25600) {
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(0, 255, 136, ${(1 - dist / 160) * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Update & Render nodes
      let foundHover: string | null = null;

      for (let i = 0; i < nodesCount; i++) {
        const node = nodes[i];
        const isDimmed = activeCategory !== 'all' && node.category !== activeCategory;

        // Anti-gravity float oscillation
        node.floatAngle += node.floatSpeed;
        const targetX = node.baseX + Math.sin(node.floatAngle) * 10;
        const targetY = node.baseY + Math.cos(node.floatAngle * 0.8) * 12;

        // Spring toward anchor
        node.vx += (targetX - node.x) * 0.015;
        node.vy += (targetY - node.y) * 0.015;

        // Mouse repulsion & interaction
        if (mouse.isHovering) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const minSafeDist = 125;

          if (distSq < minSafeDist * minSafeDist && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / minSafeDist) * 1.6;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;

            if (dist < node.radius + 12) {
              foundHover = node.name;
            }
          }
        }

        // Handle drag
        if (mouse.isDown && mouse.draggedNode === node) {
          node.x = mouse.x;
          node.y = mouse.y;
          node.vx = 0;
          node.vy = 0;
        } else {
          // Friction damping
          node.vx *= 0.88;
          node.vy *= 0.88;

          node.x += node.vx;
          node.y += node.vy;
        }

        // Keep inside canvas bounds
        const pad = node.radius + 8;
        if (node.x < pad) { node.x = pad; node.vx *= -0.5; }
        if (node.x > width - pad) { node.x = width - pad; node.vx *= -0.5; }
        if (node.y < pad) { node.y = pad; node.vy *= -0.5; }
        if (node.y > height - pad) { node.y = height - pad; node.vy *= -0.5; }

        // Render Tech Badge Node
        const isHovered = foundHover === node.name;
        const opacity = isDimmed ? 0.25 : isHovered ? 1 : 0.85;

        ctx.save();
        ctx.globalAlpha = opacity;

        // Soft ambient glow halo
        ctx.fillStyle = node.glowColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? node.radius + 12 : node.radius + 6, 0, Math.PI * 2);
        ctx.fill();

        // Node Body Pill
        ctx.fillStyle = isHovered ? 'rgba(18, 24, 38, 0.96)' : 'rgba(12, 16, 26, 0.9)';
        ctx.strokeStyle = isHovered ? node.color : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = isHovered ? 2 : 1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner subtle orbital ring
        ctx.strokeStyle = `${node.color}40`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 5, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.fillStyle = isHovered ? '#ffffff' : '#cbd5e1';
        ctx.font = `${isHovered ? '600' : '500'} 11px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);

        ctx.restore();
      }

      // ONLY trigger React re-render when the hovered node name changes (prevents 60fps React state churn)
      if (foundHover !== lastHoveredRef.current) {
        lastHoveredRef.current = foundHover;
        setHoveredNodeName(foundHover);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeCategory, initNodes]);

  // Pointer event handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.isHovering = true;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    mouseRef.current.isDown = true;

    for (const node of nodesRef.current) {
      const distSq = (node.x - mx) ** 2 + (node.y - my) ** 2;
      if (distSq <= node.radius * node.radius) {
        mouseRef.current.draggedNode = node;
        if (onSelectNode) onSelectNode(node.name);
        break;
      }
    }
  };

  const handlePointerUp = () => {
    mouseRef.current.isDown = false;
    mouseRef.current.draggedNode = null;
  };

  const handlePointerLeave = () => {
    mouseRef.current.isHovering = false;
    mouseRef.current.isDown = false;
    mouseRef.current.draggedNode = null;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    if (lastHoveredRef.current !== null) {
      lastHoveredRef.current = null;
      setHoveredNodeName(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[440px] md:h-[500px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 ${className}`}
    >
      {/* Background cyber grid inside canvas */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30" />

      {/* Top HUD Status Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-xs font-mono">
        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300">ANTI-GRAVITY CANVAS</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">DYNAMIC PHYSICS v2.4</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10 text-slate-400 backdrop-blur-md">
          <span>INTERACT:</span>
          <span className="text-emerald-400">HOVER / NUDGE / DRAG</span>
        </div>
      </div>

      {/* Active Node Toast */}
      {hoveredNodeName && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="bg-slate-900/90 border border-cyan-400/40 text-cyan-300 font-mono text-xs px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,242,254,0.3)] backdrop-blur-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>EXAMINING NODE: <strong className="text-white">{hoveredNodeName}</strong></span>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="w-full h-full cursor-grab active:cursor-grabbing block will-change-transform"
      />
    </div>
  );
};

export default AntiGravityCanvas;
