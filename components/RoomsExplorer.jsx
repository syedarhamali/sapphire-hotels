"use client";

import { useState } from "react";
import { RoomCard } from "@/components/RoomCard";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

function BedIcon({ count = 1 }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M3 18V8a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {count > 1 ? (
        <path d="M12 11V8a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M12 18v-4a2 2 0 0 1 2-2h7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
      <path d="M2 20V11M22 20v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 20h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function AllIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function RoomsExplorer({ rooms }) {
  const [active, setActive] = useState("all");
  const categories = [
    { key: "all", label: "All rooms", icon: <AllIcon /> },
    ...rooms.map((room) => ({
      key: room.slug,
      label: room.short,
      icon: <BedIcon count={room.beds.includes("1 double") || room.beds.includes("2 single") ? 2 : 1} />,
    })),
  ];
  const visible = active === "all" ? rooms : rooms.filter((room) => room.slug === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter rooms by type"
        className="mb-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-sand bg-white p-1.5 scrollbar-none"
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={active === cat.key}
            onClick={() => setActive(cat.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
              active === cat.key ? "bg-sapphire-600 text-white shadow-sm" : "text-ink/70 hover:bg-cream hover:text-ink"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {visible.map((room, i) => (
          <Reveal key={room.slug} delay={i * 70}>
            <TiltCard className="h-full rounded-[36px]">
              <RoomCard room={room} amenityCount={4} index={rooms.indexOf(room)} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
