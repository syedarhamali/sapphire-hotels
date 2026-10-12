"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Lightbox({ images, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onCloseRef.current = onClose;
    onChangeRef.current = onChange;
  }, [onClose, onChange]);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event) {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowRight") onChangeRef.current((index + 1) % images.length);
      if (event.key === "ArrowLeft") onChangeRef.current((index - 1 + images.length) % images.length);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, index]);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[70] flex flex-col gap-3 bg-[#080c12]/95 p-4 text-white sm:p-6"
    >
      <button
        type="button"
        onClick={onClose}
        ref={closeRef}
        className="ml-auto rounded-full border border-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/10"
      >
        Close
      </button>

      <div className="flex min-h-0 flex-1 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => onChange((index - 1 + images.length) % images.length)}
          className="hidden rounded-full border border-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/10 sm:inline-flex"
        >
          Previous
        </button>

        <figure className="mx-auto flex min-h-0 max-w-full flex-1 flex-col items-center justify-center gap-3">
          <div className="relative h-[68vh] w-full max-w-4xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 80vw, 100vw"
              className="rounded-lg object-contain"
              priority
            />
          </div>
          <figcaption className="flex w-full max-w-4xl justify-between gap-4 text-sm text-white/80">
            <span>
              {index + 1} / {images.length}
            </span>
            <span className="truncate text-right">{image.alt}</span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onChange((index + 1) % images.length)}
          className="hidden rounded-full border border-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/10 sm:inline-flex"
        >
          Next
        </button>
      </div>

      <div className="flex justify-between gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => onChange((index - 1 + images.length) % images.length)}
          className="flex-1 rounded-full border border-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/10"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onChange((index + 1) % images.length)}
          className="flex-1 rounded-full border border-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/10"
        >
          Next
        </button>
      </div>
    </div>
  );
}
