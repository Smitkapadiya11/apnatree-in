"use client";

import * as React from "react";

const LERP = 0.12;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function KingsmanCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const mouse = React.useRef({ x: 0, y: 0 });
  const ring = React.useRef({ x: 0, y: 0 });
  const hovering = React.useRef(false);
  const clicking = React.useRef(false);
  const raf = React.useRef<number>(0);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const disable = () => mq.matches || reduced.matches;

    const syncHoverFromTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        hovering.current = false;
        return;
      }
      hovering.current = Boolean(
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]')
      );
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      syncHoverFromTarget(e.target);
    };

    const onDown = () => {
      clicking.current = true;
      ringRef.current?.classList.add("clicking");
    };
    const onUp = () => {
      clicking.current = false;
      ringRef.current?.classList.remove("clicking");
    };

    const loop = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, LERP);
      ring.current.y = lerp(ring.current.y, mouse.current.y, LERP);

      const dot = dotRef.current;
      const ringEl = ringRef.current;
      if (dot) {
        dot.style.left = `${mouse.current.x}px`;
        dot.style.top = `${mouse.current.y}px`;
      }
      if (ringEl) {
        ringEl.style.left = `${ring.current.x}px`;
        ringEl.style.top = `${ring.current.y}px`;
        ringEl.classList.toggle("hovering", hovering.current);
      }

      raf.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (disable()) return;
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);
      raf.current = requestAnimationFrame(loop);
    };

    const stop = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
    };

    const apply = () => {
      stop();
      const el = ringRef.current?.parentElement;
      if (!el) return;
      if (disable()) {
        el.style.display = "none";
        return;
      }
      el.style.display = "";
      start();
    };

    apply();
    mq.addEventListener("change", apply);
    reduced.addEventListener("change", apply);

    return () => {
      mq.removeEventListener("change", apply);
      reduced.removeEventListener("change", apply);
      stop();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[10050] hidden md:block">
      <div ref={dotRef} className="cursor-dot fixed top-0 left-0 will-change-transform" />
      <div ref={ringRef} className="cursor-ring fixed top-0 left-0 will-change-transform" />
    </div>
  );
}
