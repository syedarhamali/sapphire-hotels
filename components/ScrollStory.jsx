"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const beats = [
  {
    title: "The front door",
    text: "Number 35 Shepherds Bush Road, with the bay window lit after dark.",
    image: "/photos/entrance.jpg",
    alt: "Sapphire Hotel London entrance at night, with the blue sign and bay window",
    stat: ["35", "Shepherds Bush Rd"],
  },
  {
    title: "Warm rooms upstairs",
    text: "Ensuite rooms with a private bathroom, a television, and tea and coffee.",
    image: "/photos/double-1.jpeg",
    alt: "Double bed with a dark headboard, cream bedding and a bay window",
    stat: ["4", "Ensuite room types"],
  },
  {
    title: "Five minutes from the mall",
    text: "Westfield London is a short walk. Two Tube stations are 5–7 minutes away.",
    image: "/photos/westfield.jpg",
    alt: "Westfield London shopping centre",
    stat: ["5 min", "Walk to Westfield"],
  },
];

export function ScrollStory() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;

    function measure() {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const next = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress((prev) => (Math.abs(prev - next) < 0.006 ? prev : next));
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const index = Math.min(beats.length - 1, Math.floor(progress * beats.length));
  const beat = beats[index];
  const segment = 1 / beats.length;
  const within = Math.min(1, Math.max(0, (progress - index * segment) / segment));

  return (
    <section ref={sectionRef} className="relative h-[220vh]" aria-label="A look around the hotel">
      <div className="sticky top-0 flex h-screen items-center px-3 sm:px-4">
        <div className="relative mx-auto grid h-[calc(100vh-2rem)] w-full max-w-frame overflow-hidden rounded-[40px] border border-white/8 bg-night-soft text-white shadow-lift lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative flex flex-col justify-center px-7 py-10 sm:px-12">
            <p className="chip w-fit !border-white/20 !bg-white/10 !text-white">Scroll the stay</p>

            <div className="relative mt-8 h-[1.1em] font-serif text-[clamp(5rem,12vw,9rem)] leading-none">
              {beats.map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute left-0 top-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: i === index ? 1 : 0,
                    transform: `translateY(${i === index ? 0 : i < index ? -40 : 40}px)`,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                  }}
                >
                  0{i + 1}
                </span>
              ))}
            </div>

            <h2 key={beat.title} className="animate-fade-up mt-4 text-4xl text-white sm:text-5xl lg:text-6xl">
              {beat.title}
            </h2>
            <p key={beat.text} className="animate-fade-up mt-5 max-w-md text-lg text-white/75" style={{ animationDelay: "80ms" }}>
              {beat.text}
            </p>

            <div className="mt-10 flex items-center gap-4">
              {beats.map((_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                  <span
                    className="block h-full rounded-full bg-sapphire-400"
                    style={{ width: `${i < index ? 100 : i === index ? within * 100 : 0}%` }}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden lg:m-3 lg:rounded-[36px]">
            {beats.map((item, i) => (
              <div
                key={item.image}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: i === index ? 1 : 0 }}
                aria-hidden={i === index ? undefined : true}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                  style={{ transform: `scale(${i === index ? 1.12 - within * 0.1 : 1.12})`, transition: "transform 0.2s linear" }}
                  priority={i === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />

            <div
              key={beat.stat[0]}
              className="glass animate-fade-up absolute bottom-5 left-5 rounded-[26px] px-6 py-4 sm:bottom-8 sm:left-8"
            >
              <p className="font-serif text-4xl text-white">{beat.stat[0]}</p>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">{beat.stat[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
