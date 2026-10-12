import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { RoomCard } from "@/components/RoomCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ParallaxFrame } from "@/components/ParallaxFrame";
import { Marquee } from "@/components/Marquee";
import { ScrollStory } from "@/components/ScrollStory";
import { SplitHeading } from "@/components/SplitHeading";
import { CountUp } from "@/components/CountUp";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { HeroVideo } from "@/components/HeroVideo";
import { attractions, bookingUrl, gallery, hotel, included, rooms } from "@/lib/data";

export const metadata = {
  description:
    "Sapphire Hotel London is a 3-star boutique hotel in Hammersmith, five minutes from Westfield London and a short walk from Shepherd’s Bush and Hammersmith stations.",
};

const facts = [
  { to: 5, suffix: " min", label: "Walk to Westfield London" },
  { to: 7, prefix: "5–", suffix: " min", label: "Walk to two Tube stations" },
  { to: 15, suffix: " min", label: "Tube ride to central London" },
  { text: "Free", label: "Wi-Fi included in the rate" },
];

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: "A stylish 3-star boutique hotel in Hammersmith, next to Westfield London.",
    telephone: hotel.phoneTel,
    email: hotel.email,
    url: "https://www.sapphirehotellondon.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.street,
      addressLocality: "London",
      postalCode: "W6 7LU",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: hotel.lat, longitude: hotel.lng },
    starRating: { "@type": "Rating", ratingValue: "3" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ───────────── Hero ───────────── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden rounded-b-[40px]">
        <HeroVideo
          src="/videos/hero.mp4?v=hd"
          poster="/photos/entrance.jpg"
          posterAlt="The Sapphire Hotel London entrance at night"
          className="absolute inset-0"
        />
        <div className="vignette absolute inset-0" />

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-frame flex-col justify-end px-5 pb-40 sm:px-8 lg:pb-44">
          <div className="max-w-[38rem]">
            <Eyebrow className="!border-white/25 !bg-white/10 !text-white">3-star boutique · Hammersmith · W6</Eyebrow>
            <SplitHeading
              as="h1"
              immediate
              text="A townhouse hotel, five minutes from Westfield."
              className="max-w-[13ch] text-[clamp(2.8rem,7vw,5.6rem)] text-white drop-shadow-[0_6px_28px_rgba(6,10,20,0.9)]"
              stagger={70}
            />
            <p className="animate-fade-up mt-6 max-w-xl text-lg text-white/85 [animation-delay:500ms]">
              Sapphire Hotel London is on Shepherds Bush Road, beside Europe’s largest shopping mall
              and a short walk from Shepherd’s Bush and Hammersmith stations.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3 [animation-delay:650ms]">
              <a href={bookingUrl()} className="btn btn-sapphire text-base">
                Book a room <span aria-hidden="true">→</span>
              </a>
              <Link href="/rooms" className="btn btn-ghost !border-white/35 !bg-white/5 !text-white text-base hover:!bg-white/15">
                See the four rooms
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 sm:px-8 sm:pb-8">
          <div className="animate-fade-up mx-auto w-full max-w-5xl [animation-delay:800ms]">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ───────────── Facts ───────────── */}
      <section aria-label="Location at a glance" className="pt-12 sm:pt-16">
        <div className="mx-auto grid w-full max-w-frame grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4">
          {facts.map((fact, i) => (
            <Reveal
              key={fact.label}
              delay={i * 70}
              className="ring-gradient rounded-[24px] bg-paper p-6 text-center transition-transform duration-500 hover:-translate-y-1"
            >
              <strong className="block font-serif text-4xl text-sapphire-600 sm:text-5xl">
                {fact.text ? fact.text : <CountUp to={fact.to} prefix={fact.prefix} suffix={fact.suffix} />}
              </strong>
              <span className="mt-2 block text-sm text-muted">{fact.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee />

      {/* ───────────── Rooms ───────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-frame px-4 sm:px-6">
          <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <Eyebrow>Rooms</Eyebrow>
              <SplitHeading text="Four ensuite rooms, all on one page." className="max-w-[16ch] text-4xl sm:text-6xl" />
            </div>
            <Reveal>
              <Link href="/rooms" className="btn btn-ghost">
                Compare rooms <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {rooms.map((room, i) => (
              <Reveal key={room.slug} delay={i * 90}>
                <RoomCard room={room} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollStory />

      {/* ───────────── About split ───────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-frame items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="relative grid grid-cols-[1.25fr_0.75fr] gap-4">
            <div className="relative h-[320px] overflow-hidden rounded-[28px] shadow-soft sm:h-[480px]">
              <ParallaxFrame>
                <Image src="/photos/lounge.jpg" alt="Lounge with a black sofa and glass dining tables" fill sizes="40vw" className="object-cover" />
              </ParallaxFrame>
            </div>
            <div className="relative mt-16 h-[260px] overflow-hidden rounded-[28px] shadow-soft sm:h-[400px]">
              <ParallaxFrame>
                <Image src="/photos/stairs.jpg" alt="Carpeted stairs in the hotel" fill sizes="20vw" className="object-cover" />
              </ParallaxFrame>
            </div>
          </Reveal>
          <div>
            <Eyebrow>The hotel</Eyebrow>
            <SplitHeading text="Refurbished rooms in a Victorian street." className="text-4xl sm:text-6xl" />
            <Reveal className="mt-6 space-y-4 text-lg text-ink/75">
              <p>
                Every room is ensuite, with a private bathroom, soft lighting and contemporary furniture.
                Flat-screen TVs and tea and coffee are in the room. The hotel is non-smoking, and doors
                open with an electronic keycard.
              </p>
              <p>
                Free Wi-Fi is included. The hotel can also arrange airport pickup, currency exchange and a
                concierge. Hammersmith Apollo, Shepherd’s Bush Empire and Kensington Olympia are within
                walking distance.
              </p>
              <Link href="/about" className="btn btn-sapphire mt-2">
                About the hotel
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Attractions (horizontal on scroll) ───────────── */}
      <HorizontalScroll
        className="py-10"
        heading={
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>From the hotel</Eyebrow>
              <SplitHeading text="London, timed from the front door." className="max-w-[14ch] text-4xl sm:text-6xl" />
            </div>
            <Link href="/attractions" className="btn btn-ghost">
              All attractions <span aria-hidden="true">→</span>
            </Link>
          </div>
        }
      >
        {attractions.map((place, i) => (
          <article
            key={place.slug}
            className="group relative h-[440px] w-[82vw] shrink-0 overflow-hidden rounded-[28px] border border-sand shadow-soft sm:w-[420px] lg:h-[480px]"
          >
            <Image
              src={place.image}
              alt={place.alt}
              fill
              sizes="420px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent" />
            <span className="absolute left-5 top-5 font-serif text-6xl text-white/25">0{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="flex items-center gap-3">
                <span className="font-serif text-5xl text-white">{place.time}</span>
                <span className="chip !border-white/30 !bg-white/10 !text-white">{place.mode}</span>
              </p>
              <h3 className="mt-3 font-serif text-2xl text-white">{place.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-white/70">{place.text}</p>
            </div>
          </article>
        ))}
        <Link
          href="/attractions"
          className="ring-gradient group flex h-[440px] w-[70vw] shrink-0 flex-col items-center justify-center gap-4 rounded-[28px] bg-paper text-center sm:w-[300px] lg:h-[480px]"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-sapphire-600 text-2xl text-white transition-transform duration-500 group-hover:scale-110">
            →
          </span>
          <span className="font-serif text-2xl">All seven places</span>
          <span className="text-sm text-muted">with Tube directions</span>
        </Link>
      </HorizontalScroll>

      {/* ───────────── Gallery collage ───────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-frame px-4 sm:px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Gallery</Eyebrow>
              <SplitHeading text="The building, the rooms, the city." className="max-w-[14ch] text-4xl sm:text-6xl" />
            </div>
            <Link href="/gallery" className="btn btn-ghost">
              Open gallery <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-template-rows:200px_200px] lg:grid-cols-[1.4fr_1fr_1fr] lg:[grid-template-rows:250px_250px]">
            {gallery.slice(0, 5).map((image, i) => (
              <Reveal key={image.src} delay={i * 70} className={i === 0 ? "col-span-2 row-span-1 sm:col-span-1 sm:row-span-2" : ""}>
                <Link href="/gallery" className="group relative block h-full min-h-[180px] overflow-hidden rounded-[24px] bg-sand shadow-soft">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {image.category}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Included ───────────── */}
      <section className="relative px-3 py-10 sm:px-4">
        <Reveal className="relative mx-auto grid w-full max-w-frame gap-10 overflow-hidden rounded-[40px] bg-cream p-8 shadow-soft sm:p-12 lg:grid-cols-[0.9fr_1.1fr_280px]">
          <div>
            <Eyebrow>Included</Eyebrow>
            <h2 className="text-4xl sm:text-6xl">Included with every room.</h2>
            <p className="mt-5 text-lg text-ink/70">There is no seasonal offer listed at the moment. These are part of a stay.</p>
            <Link href="/promotions" className="btn btn-sapphire mt-7">
              Offers and extras <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {included.slice(0, 6).map((item) => (
              <li key={item.title} className="rounded-[20px] border border-sand bg-white px-5 py-4">
                <strong className="block text-ink">{item.title}</strong>
                <span className="text-sm text-muted">{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="relative hidden h-[360px] overflow-hidden rounded-[28px] shadow-soft lg:block">
            <Image src="/photos/single-2.jpeg" alt="Tea and coffee tray with a kettle, mugs and spoons" fill sizes="280px" className="object-cover" />
          </div>
        </Reveal>
      </section>

      {/* ───────────── Closing ───────────── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <Image src="/photos/facade.jpg" alt="" fill sizes="100vw" className="kenburns object-cover object-[center_70%] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-night via-night/60 to-night" />
        </div>
        <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
          <Eyebrow className="mx-auto !border-white/20 !bg-white/10 !text-white">Find us</Eyebrow>
          <SplitHeading text="35 Shepherds Bush Road, London W6 7LU." className="text-4xl text-white sm:text-6xl lg:text-7xl" />
          <Reveal className="mt-6 text-lg text-white/75">
            Call {hotel.phoneDisplay} or write to {hotel.email}.
          </Reveal>
          <Reveal delay={120} className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={bookingUrl()} className="btn btn-sapphire text-base">
              Check availability
            </a>
            <Link href="/contact" className="btn btn-ghost !border-white/35 !bg-white/5 !text-white text-base hover:!bg-white/15">
              Contact
            </Link>
            <a
              href={hotel.maps}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost !border-white/35 !bg-white/5 !text-white text-base hover:!bg-white/15"
            >
              Open in Maps
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
