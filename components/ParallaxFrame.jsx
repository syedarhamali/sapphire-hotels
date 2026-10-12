"use client";

import { useEffect, useRef } from "react";

export function ParallaxFrame({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function update() {
      const parent = node.parentElement;
      if (!parent) return;
      const shift = parent.getBoundingClientRect().top * -0.16;
      node.style.transform = `translate3d(0, ${shift}px, 0)`;
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`absolute inset-x-0 -top-[14%] h-[128%] ${className}`}>
      {children}
    </div>
  );
}
