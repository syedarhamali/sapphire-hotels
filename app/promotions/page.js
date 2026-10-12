import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { bookingUrl, included, services } from "@/lib/data";

export const metadata = {
  title: "Promotions",
  description:
    "Sapphire Hotel London has no seasonal offer listed at the moment. Free Wi-Fi and an ensuite bathroom are included with every room.",
};

export default function Promotions() {
  return (
    <div className="pb-24">
      <PageBanner
        eyebrow="Offers"
        title="Promotions"
        lede="There is no seasonal promotion listed at the moment. Rates on the booking page are the current price, and the items below are already part of a stay."
        image="/photos/double-1.jpeg"
        imageAlt="Double bed with a dark headboard, cream bedding and a bay window"
      >
        <a href={bookingUrl()} className="btn btn-sapphire">
          See current rates
        </a>
      </PageBanner>

      <div className="mx-auto mt-10 grid w-full max-w-frame gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="ring-gradient rounded-[28px] bg-paper p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl text-ink">Included with the room</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item.title} className="flex gap-3 rounded-[18px] bg-cream p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sapphire-500" aria-hidden="true" />
                <div>
                  <strong className="block text-ink">{item.title}</strong>
                  <span className="text-sm text-muted">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="ring-gradient rounded-[28px] bg-night-soft p-6 text-white shadow-soft sm:p-8">
          <h2 className="text-2xl text-white">Ask the hotel to arrange</h2>
          <ul className="mt-4 grid gap-3">
            {services.map((item) => (
              <li key={item.title} className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <strong className="block text-white">{item.title}</strong>
                <span className="text-sm text-white/70">{item.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/60">These are services the hotel offers. They are not described as free.</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-night-soft transition-colors hover:bg-cream"
          >
            Send an enquiry <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
