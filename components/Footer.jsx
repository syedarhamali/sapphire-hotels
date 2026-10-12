import Image from "next/image";
import Link from "next/link";
import { bookingUrl, hotel, nav } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative my-3 w-full overflow-hidden rounded-[40px] border border-sand bg-white text-ink/70">
      <div className="relative mx-auto grid w-full max-w-frame gap-10 px-5 pb-8 pt-12 sm:px-8 md:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <Image src="/logo.png" alt="Sapphire Hotel London" width={1020} height={606} className="mb-5 h-24 w-auto sm:h-28" />
          <p className="chip mb-5">35 Shepherds Bush Road</p>
          <p className="mt-3 max-w-sm">
            {hotel.street}, {hotel.locality}, {hotel.country}.
          </p>
          <p className="mt-4 flex flex-col gap-1">
            <a href={`tel:${hotel.phoneTel}`} className="text-ink transition-colors hover:text-sapphire-600">
              {hotel.phoneDisplay}
            </a>
            <a href={`mailto:${hotel.email}`} className="text-ink transition-colors hover:text-sapphire-600">
              {hotel.email}
            </a>
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sapphire-600">Explore</p>
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sapphire-600">Visit</p>
          <ul className="mb-6 space-y-2.5">
            <li>3-star boutique hotel in Hammersmith</li>
            <li>5 minutes to Westfield London</li>
            <li>Shepherd’s Bush and Hammersmith stations, 5–7 minutes on foot</li>
          </ul>
          <a href={bookingUrl()} className="btn btn-sapphire w-full sm:w-auto">
            Book a room
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none relative select-none px-5 text-center font-serif text-[clamp(3.5rem,14vw,11rem)] font-medium leading-[0.8] tracking-[-0.04em] text-ink/[0.06] sm:px-8"
      >
        Sapphire
      </p>

      <div className="relative mx-auto flex w-full max-w-frame flex-col gap-3 border-t border-sand px-5 py-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Sapphire Hotel London</p>
        <a href={hotel.maps} target="_blank" rel="noreferrer" className="font-semibold text-sapphire-600 transition-colors hover:text-sapphire-700">
          Directions →
        </a>
      </div>
    </footer>
  );
}
