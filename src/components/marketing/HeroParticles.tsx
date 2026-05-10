"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
};

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const COUNT = 46;
    let particles: Particle[] = [];

    const spawn = () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.45 + 0.1),
      alpha: Math.random() * 0.55 + 0.1,
      life: Math.random(),
    });

    particles = Array.from({ length: COUNT }, spawn);

    let raf = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.0025;
        if (p.y < -10 || p.life > 1) {
          Object.assign(p, spawn());
          p.y = h + 10;
        }
        const a = Math.sin(p.life * Math.PI) * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,145,42,${a.toFixed(3)})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[15] h-full w-full opacity-50"
      aria-hidden
    />
  );
}
