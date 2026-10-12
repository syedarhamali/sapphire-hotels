"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";

export function RoomGallery({ images }) {
  const [photo, setPhoto] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="my-8">
      <button
        type="button"
        onClick={() => setLightbox(photo)}
        className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[32px] border border-sand bg-sand shadow-lift"
      >
        <Image
          key={images[photo].src}
          src={images[photo].src}
          alt={images[photo].alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
          className="animate-fade-in object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
        <span className="glass absolute bottom-4 right-4 rounded-full px-4 py-2 text-sm text-white">View larger</span>
        <span className="absolute bottom-5 left-5 text-sm text-white/90">
          {photo + 1} / {images.length}
        </span>
      </button>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show photo: ${image.alt}`}
            aria-current={index === photo ? "true" : undefined}
            onClick={() => setPhoto(index)}
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
              index === photo ? "border-sapphire-500 shadow-glow" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={image.src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>

      {lightbox !== null ? (
        <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
      ) : null}
    </div>
  );
}
