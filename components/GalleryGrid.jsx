"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";

const filters = ["All", "Property", "Rooms", "London"];

export function GalleryGrid({ images: allImages }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const images = allImages.filter((image) => filter === "All" || image.category === filter);

  return (
    <>
      <div aria-label="Gallery categories" className="mb-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-sand bg-white p-1.5 scrollbar-none">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => {
              setFilter(item);
              setOpen(null);
            }}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              filter === item ? "bg-sapphire-600 text-white shadow-sm" : "text-ink/70 hover:bg-cream hover:text-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={image.alt}
            onClick={() => setOpen(index)}
            className="group relative block aspect-[4/3] w-full min-w-0 cursor-zoom-in overflow-hidden rounded-[24px] border border-sand bg-sand shadow-soft"
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="chip absolute bottom-3 left-3 !border-white/30 !bg-white/15 !text-white">{image.category}</span>
            <span className="glass absolute right-3 top-3 grid h-9 w-9 translate-y-1 place-items-center rounded-full text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
                <path d="M18 18l-4-4M9 6v6M6 9h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {open !== null ? <Lightbox images={images} index={open} onClose={() => setOpen(null)} onChange={setOpen} /> : null}
    </>
  );
}
