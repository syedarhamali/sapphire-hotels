"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingUrl, hotel, nav } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  const isHome = pathname === "/";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lift"
      >
        Skip to content
      </a>

      <header className={`top-0 z-40 pt-3 ${isHome ? "fixed inset-x-0" : "sticky bg-paper"}`}>
        <div className="relative mx-auto flex h-14 w-[calc(100%-1.5rem)] max-w-7xl items-center gap-4 rounded-full border border-sand bg-white px-3 shadow-soft sm:h-16 sm:w-[calc(100%-2rem)] sm:px-5">
          <Link href="/" aria-label="Sapphire Hotel London, home" className="flex shrink-0 items-center">
            <Image src="/logo.png" alt="Sapphire Hotel London" width={1020} height={606} priority className="h-10 w-auto sm:h-12" />
          </Link>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                  isActive(item.href) ? "bg-sapphire-600 text-white" : "text-ink/70 hover:bg-cream hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={`tel:${hotel.phoneTel}`}
              className="hidden px-2 text-sm font-semibold text-ink/70 hover:text-sapphire-600 xl:inline"
            >
              {hotel.phoneDisplay}
            </a>
            <a href={bookingUrl()} className="btn btn-sapphire hidden !min-h-10 px-4 text-sm sm:inline-flex">
              Book a room
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-sand lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className={`block h-[1.5px] w-[18px] bg-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-[18px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-[18px] bg-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-3 top-[4.25rem] bottom-3 z-30 overflow-auto rounded-[28px] border border-sand bg-white px-5 py-3 shadow-lift sm:inset-x-4 sm:top-[4.75rem] lg:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-3 py-4 text-lg font-semibold text-ink hover:bg-cream"
            >
              {item.label}
            </Link>
          ))}
          <a href={`tel:${hotel.phoneTel}`} className="block rounded-2xl px-3 py-4 text-lg font-semibold text-sapphire-600">
            {hotel.phoneDisplay}
          </a>
          <a href={bookingUrl()} className="btn btn-sapphire mt-4 w-full">
            Book a room
          </a>
        </nav>
      ) : null}
    </>
  );
}
