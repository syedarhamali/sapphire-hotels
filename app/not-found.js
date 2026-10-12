import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

export default function NotFound() {
  return (
    <div className="py-20 pb-28">
      <div className="mx-auto w-full max-w-frame px-4 sm:px-6">
        <Eyebrow>404</Eyebrow>
        <h1 className="text-4xl sm:text-5xl">That page is not here.</h1>
        <p className="mt-3 max-w-[38rem] text-lg text-muted">Try the rooms, or go back to the homepage.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-sapphire-600 to-sapphire-700 px-6 font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            Home
          </Link>
          <Link
            href="/rooms"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-sapphire-600/35 px-6 font-bold text-sapphire-600 hover:bg-sapphire-50"
          >
            Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
