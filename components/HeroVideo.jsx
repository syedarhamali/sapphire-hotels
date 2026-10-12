"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * A photo that's always there (with a slow Ken Burns pan), with a muted
 * looping video layered on top once it's allowed to play. If the clip is
 * missing, fails to load, or the viewer prefers reduced motion, the photo
 * alone carries the hero — nothing ever looks broken.
 */
export function HeroVideo({ src, poster, posterAlt = "", className = "" }) {
  const [playVideo, setPlayVideo] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const raf = requestAnimationFrame(() => setPlayVideo(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={className}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      {playVideo && !failed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
