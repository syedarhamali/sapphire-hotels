"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M12 20.2 4.9 13.3c-2-2-2-5.1-.1-7 1.9-1.9 4.9-1.8 6.8.1l.4.4.4-.4c1.9-1.9 4.9-2 6.8-.1 1.9 1.9 1.9 5-.1 7L12 20.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RoomCard({ room, amenityCount = 0, index = 0 }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="ring-gradient group relative block h-full overflow-hidden rounded-[32px] p-2.5 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-sand">
        <Image
          src={room.images[0].src}
          alt={room.images[0].alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />

        <span className="absolute left-4 top-4 font-serif text-5xl leading-none text-white/30">
          0{index + 1}
        </span>

        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved rooms" : "Save this room"}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setSaved((value) => !value);
          }}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-night/40 text-white backdrop-blur-md transition-transform hover:scale-110"
        >
          <span className={saved ? "text-sapphire-300" : "text-white"}>
            <HeartIcon filled={saved} />
          </span>
        </button>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl text-white sm:text-3xl">{room.name.replace(" Room", "")}</h3>
            <p className="mt-0.5 text-sm text-white/75">{room.beds}</p>
          </div>
          <span className="chip shrink-0 !border-white/20 !bg-night/50 !text-white backdrop-blur-md">Sleeps {room.sleeps}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-4">
        <p className="text-sm text-muted">
          {amenityCount > 0 ? room.amenities.slice(0, amenityCount).join(" · ") : room.summary}
        </p>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sapphire-600/30 text-sapphire-600 transition-all duration-500 group-hover:bg-sapphire-600 group-hover:text-white">
          <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
          <span className="sr-only">View {room.name}</span>
        </span>
      </div>
    </Link>
  );
}
