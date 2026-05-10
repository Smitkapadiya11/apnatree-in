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
  const raf = React.useRef<number>(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const noHover = window.matchMedia("(hover: none)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (noHover || narrow || reduced) {
      return;
    }

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    dot.style.opacity = "1";
    ringEl.style.opacity = "1";

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
      ringEl.classList.add("clicking");
    };
    const onUp = () => {
      ringEl.classList.remove("clicking");
    };

    const loop = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, LERP);
      ring.current.y = lerp(ring.current.y, mouse.current.y, LERP);

      dot.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      ringEl.classList.toggle("hovering", hovering.current);

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
      dot.style.opacity = "0";
      ringEl.style.opacity = "0";
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[10050] hidden md:block">
      <div
        ref={dotRef}
        className="cursor-dot fixed left-0 top-0 opacity-0"
        style={{ transform: "translate(-100px, -100px) translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed left-0 top-0 opacity-0"
        style={{ transform: "translate(-100px, -100px) translate(-50%, -50%)" }}
      />
    </div>
  );
}
