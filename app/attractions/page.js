import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PageBanner } from "@/components/PageBanner";
import { attractions } from "@/lib/data";

export const metadata = {
  title: "Attractions",
  description:
    "How long it takes to reach Westfield, Hyde Park, Buckingham Palace, Piccadilly Circus, Parliament, the London Eye and Tower Bridge from Sapphire Hotel London.",
};

export default function Attractions() {
  return (
    <div className="py-10 pb-20 sm:py-12">
      <PageBanner
        eyebrow="Around the hotel"
        title="Attractions"
        lede="The hotel is within about five miles of central London. Most of these journeys start at Shepherd’s Bush or Hammersmith, both a 5–7 minute walk away. Times below are the hotel’s own estimates."
        image="/photos/westfield.jpg"
        imageAlt="Westfield London shopping centre"
      />

      <div className="mx-auto grid w-full max-w-frame gap-4 px-4 sm:px-6">
        {attractions.map((place, i) => (
          <Reveal
            as="article"
            key={place.slug}
            delay={i * 50}
            id={place.slug}
            className="ring-gradient group grid gap-4 rounded-[28px] p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow sm:grid-cols-[220px_1fr] sm:items-center sm:gap-6 sm:p-5"
          >
            <div className="relative h-[200px] overflow-hidden rounded-[20px] sm:h-[150px]">
              <Image src={place.image} alt={place.alt} fill sizes="220px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div>
              <p className="font-serif text-3xl tracking-tight text-sapphire-600">
                {place.time}
                <span className="chip ml-2 align-middle">{place.mode}</span>
              </p>
              <h2 className="mt-1 text-xl font-semibold text-ink">{place.name}</h2>
              <p className="text-sm text-muted">{place.place}</p>
              <p className="mt-2 text-ink/80">{place.text}</p>
              <a
                href={place.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-sapphire-600 hover:text-sapphire-700"
              >
                View on map <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
