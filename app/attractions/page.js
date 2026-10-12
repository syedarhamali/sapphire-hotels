import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { attractions } from "@/lib/data";

export const metadata = {
  title: "Attractions",
  description:
    "How long it takes to reach Westfield, Hyde Park, Buckingham Palace, Piccadilly Circus, Parliament, the London Eye and Tower Bridge from Sapphire Hotel London.",
};

export default function Attractions() {
  return (
    <div className="pb-24">
      <PageBanner
        eyebrow="Around the hotel"
        title="Attractions"
        lede="The hotel is within about five miles of central London. Most of these journeys start at Shepherd’s Bush or Hammersmith, both a 5–7 minute walk away. Times below are the hotel’s own estimates."
        image="/photos/westfield.jpg"
        imageAlt="Westfield London shopping centre"
      />

      <div className="mx-auto mt-10 grid w-full max-w-frame gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {attractions.map((place) => (
          <article
            key={place.slug}
            id={place.slug}
            className="ring-gradient group flex h-full flex-col overflow-hidden rounded-[28px] bg-paper shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="relative h-[180px] overflow-hidden">
              <Image
                src={place.image}
                alt={place.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="chip absolute left-3 top-3 !bg-white !text-sapphire-600 shadow-sm">{place.mode}</span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="font-serif text-2xl tracking-tight text-sapphire-600">{place.time}</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">{place.name}</h2>
              <p className="text-sm text-muted">{place.place}</p>
              <p className="mt-2 flex-1 text-sm text-ink/75">{place.text}</p>
              <a
                href={place.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-sapphire-50 px-4 py-2 text-sm font-bold text-sapphire-600 transition-colors hover:bg-sapphire-100"
              >
                View on map <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
