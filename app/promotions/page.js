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
    <div className="py-10 pb-20 sm:py-12">
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

      <div className="mx-auto grid w-full max-w-frame gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="ring-gradient rounded-[28px] p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl text-ink">Included with the room</h2>
          <ul className="mt-3">
            {included.map((item) => (
              <li key={item.title} className="grid gap-0.5 border-t border-sand py-3.5">
                <strong className="text-ink">{item.title}</strong>
                <span className="text-sm text-muted">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="ring-gradient rounded-[28px] bg-cream p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl text-ink">Ask the hotel to arrange</h2>
          <ul className="mt-3">
            {services.map((item) => (
              <li key={item.title} className="grid gap-0.5 border-t border-sand py-3.5">
                <strong className="text-ink">{item.title}</strong>
                <span className="text-sm text-muted">{item.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">These are services the hotel offers. They are not described as free.</p>
          <Link href="/contact" className="btn btn-sapphire mt-4">
            Send an enquiry <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
