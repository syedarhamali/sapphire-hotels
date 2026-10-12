"use client";

import { useEffect, useRef } from "react";

/**
 * Splits a string into words that rise in one after another when the heading scrolls into view.
 * `accent` is a substring that gets a sapphire accent color.
 */
export function SplitHeading({ as: Tag = "h2", text, accent = "", className = "", stagger = 70, immediate = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (immediate || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const accentStart = accent ? words.findIndex((_, i) => words.slice(i, i + accentWords.length).join(" ") === accent) : -1;

  return (
    <Tag ref={ref} className={`split ${immediate ? "is-visible" : ""} ${className}`} aria-label={text}>
      {words.map((word, i) => {
        const isAccent = accentStart >= 0 && i >= accentStart && i < accentStart + accentWords.length;
        return (
          <span key={`${word}-${i}`} className="word-wrap" aria-hidden="true">
            <span className={`word ${isAccent ? "text-gradient-gold" : ""}`} style={{ animationDelay: `${i * stagger}ms` }}>
              {word}
            </span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}
