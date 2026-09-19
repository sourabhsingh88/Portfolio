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
  { name: 'FastAPI', category: 'backend', color: '#00f2fe', glow: 'rgba(0, 242, 254, 0.4)' },
  { name: 'Spring Boot', category: 'backend', color: '#00ff88', glow: 'rgba(0, 255, 136, 0.4)' },
  { name: 'Java', category: 'backend', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  { name: 'Python', category: 'backend', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' },
  { name: 'REST APIs', category: 'backend', color: '#818cf8', glow: 'rgba(129, 140, 248, 0.4)' },
  { name: 'Microservices', category: 'backend', color: '#a78bfa', glow: 'rgba(167, 139, 250, 0.4)' },
  
  { name: 'Docker', category: 'cloud', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' },
  { name: 'CI/CD Pipelines', category: 'cloud', color: '#34d399', glow: 'rgba(52, 211, 153, 0.4)' },
  { name: 'AWS ML', category: 'cloud', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)' },
  { name: 'Linux SysOps', category: 'cloud', color: '#fb7185', glow: 'rgba(251, 113, 133, 0.4)' },
  
  { name: 'MySQL', category: 'database', color: '#0284c7', glow: 'rgba(2, 132, 199, 0.4)' },
  { name: 'Oracle Cloud DB', category: 'database', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' },
  { name: 'Hibernate/JPA', category: 'database', color: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)' },
  { name: 'Schema Design', category: 'database', color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.4)' },
  
  { name: 'AI/ML Systems', category: 'architecture', color: '#00f2fe', glow: 'rgba(0, 242, 254, 0.4)' },
  { name: 'MobileNet v2', category: 'architecture', color: '#ec4899', glow: 'rgba(236, 72, 153, 0.4)' },
  { name: 'Computer Vision', category: 'architecture', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  { name: 'Cosine Sim Engine', category: 'architecture', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  { name: 'Automated Trading', category: 'architecture', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
];

export const AntiGravityCanvas: React.FC<AntiGravityCanvasProps> = ({
  activeCategory = 'all',
  onSelectNode,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<TechNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isHovering: false, isDown: false, draggedNode: null as TechNode | null });
  const [hoveredNodeName, setHoveredNodeName] = useState<string | null>(null);

  // Initialize nodes
  const initNodes = useCallback((width: number, height: number) => {
    const cols = Math.min(5, Math.max(3, Math.floor(width / 160)));
    const rows = Math.ceil(TECH_ITEMS.length / cols);
    const cellW = width / (cols + 1);
    const cellH = height / (rows + 1);

    nodesRef.current = TECH_ITEMS.map((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const baseX = cellW * (col + 1) + (Math.random() * 40 - 20);
      const baseY = cellH * (row + 1) + (Math.random() * 30 - 15);

      return {
        id: `node-${index}`,
        name: item.name,
        category: item.category as TechNode['category'],
        x: baseX,
        y: baseY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 36,
        color: item.color,
        glowColor: item.glow,
        baseX,
        baseY,
        floatAngle: Math.random() * Math.PI * 2,
        floatSpeed: 0.015 + Math.random() * 0.015,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes(width, height);
    };

    window.addEventListener('resize', handleResize);
    initNodes(width, height);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Draw constellation connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.2;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.isHovering) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.4;
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Update & Render nodes
      let foundHover: string | null = null;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isDimmed = activeCategory !== 'all' && node.category !== activeCategory;

        // Anti-gravity float oscillation
        node.floatAngle += node.floatSpeed;
        const driftX = Math.sin(node.floatAngle) * 12;
        const driftY = Math.cos(node.floatAngle * 0.8) * 14;

        // Target baseline with drift
        const targetX = node.baseX + driftX;
        const targetY = node.baseY + driftY;

        // Spring toward target
        node.vx += (targetX - node.x) * 0.015;
        node.vy += (targetY - node.y) * 0.015;

        // Mouse repulsion & interaction
        if (mouse.isHovering) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minSafeDist = 130;

          if (dist < minSafeDist && dist > 0) {
            // Anti-gravity repulsion field
            const force = (1 - dist / minSafeDist) * 1.8;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;

            if (dist < node.radius + 15) {
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

        // Keep inside bounds
        const pad = node.radius + 10;
        if (node.x < pad) { node.x = pad; node.vx *= -0.5; }
        if (node.x > width - pad) { node.x = width - pad; node.vx *= -0.5; }
        if (node.y < pad) { node.y = pad; node.vy *= -0.5; }
        if (node.y > height - pad) { node.y = height - pad; node.vy *= -0.5; }

        // Render Tech Badge Node
        const isHovered = foundHover === node.name;
        const opacity = isDimmed ? 0.25 : isHovered ? 1 : 0.85;

        // Ambient radial glow
        const glowRad = isHovered ? node.radius * 2 : node.radius * 1.4;
        const grad = ctx.createRadialGradient(node.x, node.y, 5, node.x, node.y, glowRad);
        grad.addColorStop(0, node.glowColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Node Body Pill/Circle
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = isHovered ? 'rgba(18, 24, 38, 0.95)' : 'rgba(12, 16, 26, 0.85)';
        ctx.strokeStyle = isHovered ? node.color : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = isHovered ? 2 : 1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner subtle orbital ring
        ctx.strokeStyle = `${node.color}40`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 6, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.fillStyle = isHovered ? '#ffffff' : '#cbd5e1';
        ctx.font = `${isHovered ? '600' : '500'} ${node.radius > 32 ? '11px' : '10px'} 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);

        ctx.restore();
      }

      setHoveredNodeName(foundHover);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
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

    // Find if clicked on a node
    for (const node of nodesRef.current) {
      const dist = Math.hypot(node.x - mx, node.y - my);
      if (dist <= node.radius) {
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
    setHoveredNodeName(null);
  };

  return (
    <div className={`relative w-full h-[450px] md:h-[540px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 ${className}`}>
      {/* Background cyber grid inside canvas */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

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
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
};

export default AntiGravityCanvas;
