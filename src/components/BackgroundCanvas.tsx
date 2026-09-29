import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  char?: string;
  angle: number;
  spinSpeed: number;
  life: number;
  maxLife: number;
}

const MUSICAL_SYMBOLS = ['♪', '♫', '♩', '✦', '✧', '•'];
const GOLDEN_PALETTE = [
  'rgba(245, 158, 11, ', // amber-500
  'rgba(251, 191, 36, ', // amber-400
  'rgba(254, 240, 138, ', // yellow-200
  'rgba(217, 119, 6, ',  // amber-600
  'rgba(168, 85, 247, ', // gothic-rose accent
];

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle count based on screen area
    const getParticleCount = () => {
      const area = width * height;
      if (area < 500000) return 40; // mobile
      if (area < 1200000) return 75; // tablet
      return 110; // desktop
    };

    let particles: Particle[] = [];

    const createParticle = (initialRandomY = false): Particle => {
      const isMusicSymbol = Math.random() < 0.28;
      const baseColor = GOLDEN_PALETTE[Math.floor(Math.random() * GOLDEN_PALETTE.length)];
      const maxOpacity = 0.3 + Math.random() * 0.6;
      const x = Math.random() * width;
      const y = initialRandomY ? Math.random() * height : height + 10 + Math.random() * 20;

      return {
        x,
        originX: x,
        y,
        size: isMusicSymbol ? 12 + Math.random() * 10 : 1.5 + Math.random() * 3.5,
        speedY: 0.35 + Math.random() * 1.1,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: initialRandomY ? maxOpacity * Math.random() : 0.05,
        maxOpacity,
        color: baseColor,
        char: isMusicSymbol
          ? MUSICAL_SYMBOLS[Math.floor(Math.random() * MUSICAL_SYMBOLS.length)]
          : undefined,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
        life: 0,
        maxLife: 200 + Math.random() * 300,
      };
    };

    // Initialize particles
    const initParticles = () => {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
    };

    initParticles();

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    // Mouse / Touch handlers for subtle divergence & attraction
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePos.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };

    const handleTouchEnd = () => {
      mousePos.current.active = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    let tick = 0;

    // Animation Loop
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Render dark cathedral vignette ambient glow in canvas
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        50,
        width / 2,
        height * 0.35,
        Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, 'rgba(124, 58, 237, 0.04)'); // subtle gothic violet
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.02)'); // warm amber
      gradient.addColorStop(1, 'rgba(10, 12, 19, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Upward vertical drift with gentle sway
        p.y -= p.speedY;
        p.x = p.originX + Math.sin(tick * 0.02 + i) * 20;

        // Interaction with mouse/touch
        if (mousePos.current.active) {
          const dx = mousePos.current.x - p.x;
          const dy = mousePos.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 3;
            // Gentle divergence away from mouse
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
            p.opacity = Math.min(p.maxOpacity * 1.5, 1);
          }
        }

        // Opacity fade in / fade out curve
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.opacity = (progress / 0.2) * p.maxOpacity;
        } else if (progress > 0.8) {
          p.opacity = ((1 - progress) / 0.2) * p.maxOpacity;
        }

        // Spin animation
        p.angle += p.spinSpeed;

        // Reset if out of bounds or life expired
        if (p.y < -30 || p.x < -30 || p.x > width + 30 || p.life >= p.maxLife) {
          particles[i] = createParticle(false);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.char) {
          // Render musical symbol or star glyph
          ctx.font = `${p.size}px "Noto Serif TC", serif`;
          ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, 0, 0);
        } else {
          // Render circular glowing ember
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};
