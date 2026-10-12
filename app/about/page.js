import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageBanner } from "@/components/PageBanner";
import { SplitHeading } from "@/components/SplitHeading";
import { ParallaxFrame } from "@/components/ParallaxFrame";
import { hotel } from "@/lib/data";

export const metadata = {
  title: "About",
  description:
    "Sapphire Hotel London is a refurbished 3-star hotel in Hammersmith, near Shepherd’s Bush and Hammersmith stations, with ensuite rooms.",
};

const pillars = [
  { title: "Ensuite, every room", text: "Private bathrooms finished in Italian marble, with soft lighting." },
  { title: "Two Tube stations", text: "Shepherd’s Bush and Hammersmith, each a 5–7 minute walk." },
  { title: "Refurbished", text: "Modern furniture, contemporary décor, flat-screen LED TVs." },
  { title: "Keycard access", text: "Non-smoking throughout; doors open with an electronic keycard." },
];

export default function About() {
  return (
    <div className="pb-24">
      <PageBanner
        eyebrow="Hammersmith"
        title="A Victorian street, a refurbished hotel."
        lede="A 3-star hotel on a street of Victorian buildings, between Shepherd’s Bush and Hammersmith stations."
        image="/photos/facade-upper.jpg"
        imageAlt="The hotel’s white bay window and yellow brick at night"
      />

      <section className="mx-auto mt-20 grid w-full max-w-frame items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SplitHeading text="Close to everything, quiet enough to sleep." className="text-4xl sm:text-6xl" />
          <Reveal className="mt-8 space-y-5 text-lg text-ink/75">
            <p>
              Sapphire Hotel London is in Hammersmith, close to Shepherd’s Bush station and Hammersmith station. All rooms
              are ensuite, with a private bathroom.
            </p>
            <p>
              The hotel has been refurbished. Bathrooms are finished in Italian marble, with soft lighting. Rooms have
              modern furniture, contemporary décor, a flat-screen LED television, and tea and coffee facilities. The hotel
              is non-smoking throughout, and rooms are opened with an electronic keycard.
            </p>
            <p>
              Major roads and two Underground stations make it practical to arrive or leave through the day. Piccadilly
              Circus, Oxford Street and the Houses of Parliament take about 10–15 minutes by Tube. Hammersmith Apollo,
              Shepherd’s Bush Empire and Kensington Olympia are within walking distance.
            </p>
            <p>
              Free Wi-Fi is included in the rate. The hotel can also arrange airport pickup, currency exchange and a
              concierge. The neighbourhood is busy with shops, restaurants and cafés. The hotel suits both business trips
              and leisure stays.
            </p>
          </Reveal>
        </div>

        <Reveal as="aside" delay={100} className="ring-gradient relative overflow-hidden rounded-[28px] p-7 sm:p-8">
          <h2 className="text-3xl">Practical</h2>
          <dl className="mb-6 mt-3">
            {[
              ["Address", <>{hotel.street}<br />{hotel.locality}</>],
              ["Telephone", <a key="tel" href={`tel:${hotel.phoneTel}`} className="text-sapphire-600 hover:text-sapphire-700">{hotel.phoneDisplay}</a>],
              ["Email", <a key="email" href={`mailto:${hotel.email}`} className="text-sapphire-600 hover:text-sapphire-700">{hotel.email}</a>],
              ["Stations", "Shepherd’s Bush and Hammersmith, 5–7 minutes on foot"],
              ["Shopping", "Westfield London, about 5 minutes on foot"],
            ].map(([term, value]) => (
              <div key={term} className="border-t border-sand py-3.5">
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-sapphire-600">{term}</dt>
                <dd className="mt-1 text-ink/85">{value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/rooms" className="btn btn-sapphire w-full">
            See the rooms
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 w-full max-w-frame px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="ring-gradient rounded-[24px] p-6 transition-transform duration-500 hover:-translate-y-1">
              <span className="font-serif text-4xl text-sapphire-600/50">0{i + 1}</span>
              <h3 className="mt-4 text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-frame grid-cols-2 gap-4 px-4 sm:px-6 sm:grid-cols-3">
        {[
          ["/photos/lounge.jpg", "Hotel lounge with sofa and glass tables", "col-span-2 sm:col-span-1"],
          ["/photos/entrance.jpg", "Entrance door at number 35", ""],
          ["/photos/double-1.jpeg", "Double room with bay window", ""],
        ].map(([src, alt, extra], i) => (
          <Reveal key={src} delay={i * 80} className={`relative h-[260px] overflow-hidden rounded-[28px] shadow-soft sm:h-[340px] ${extra}`}>
            <ParallaxFrame>
              <Image src={src} alt={alt} fill sizes="33vw" className="object-cover" />
            </ParallaxFrame>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
