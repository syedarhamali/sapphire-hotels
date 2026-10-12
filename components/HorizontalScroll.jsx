"use client";

import { useEffect, useRef } from "react";

/**
 * Pins its content while the page scrolls and translates a wide track sideways,
 * so vertical scroll becomes a horizontal walk along the cards.
 */
export function HorizontalScroll({ children, heading, className = "" }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    function update() {
      if (!mq.matches) {
        track.style.transform = "";
        section.style.height = "";
        return;
      }
      const distance = track.scrollWidth - window.innerWidth + 96;
      section.style.height = `${window.innerHeight + distance}px`;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-frame px-4 sm:px-6">{heading}</div>
        <div
          ref={trackRef}
          className="scrollbar-none mt-8 flex gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:w-max lg:overflow-visible lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-24 lg:will-change-transform"
        >
          {children}
        </div>
        <div className="mx-auto mt-4 hidden h-1 w-full max-w-frame overflow-hidden rounded-full bg-white/10 lg:block" aria-hidden="true">
          <div ref={barRef} className="h-full origin-left scale-x-0 rounded-full bg-sapphire-400" />
        </div>
      </div>
    </section>
  );
}
