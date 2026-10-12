import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCard } from "@/components/BookingCard";
import { RoomGallery } from "@/components/RoomGallery";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { getRoom, rooms } from "@/lib/data";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: `${room.name} at Sapphire Hotel London. ${room.beds}, sleeps ${room.sleeps}. ${room.summary}`,
  };
}

export default async function RoomDetail({ params }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const others = rooms.filter((item) => item.slug !== room.slug);

  return (
    <div className="pb-24 pt-10 sm:pt-12">
      <div className="mx-auto w-full max-w-frame px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-8 flex w-fit flex-wrap items-center gap-2 rounded-full border border-sand bg-white px-4 py-2 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-sapphire-600">
            Home
          </Link>
          <span aria-hidden="true" className="text-ink/25">/</span>
          <Link href="/rooms" className="transition-colors hover:text-sapphire-600">
            Rooms
          </Link>
          <span aria-hidden="true" className="text-ink/25">/</span>
          <span aria-current="page" className="text-ink">
            {room.name}
          </span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-[1.45fr_0.8fr]">
          <div>
            <Eyebrow>Sleeps {room.sleeps} · {room.beds}</Eyebrow>
            <SplitHeading as="h1" immediate text={room.name} className="text-5xl sm:text-7xl" />
            <p className="mt-4 max-w-[42rem] text-lg text-ink/75 sm:text-xl">{room.summary}</p>

            <RoomGallery images={room.images} />

            <div className="grid gap-5 sm:grid-cols-[1.2fr_0.8fr]">
              <Reveal className="ring-gradient rounded-[28px] bg-paper p-6 sm:p-8">
                <h2 className="text-3xl">The room</h2>
                <p className="mt-3 text-ink/75">{room.description}</p>
                {room.stairs ? (
                  <p className="chip mt-5 !normal-case !tracking-normal !text-sm">This room is reached by stairs.</p>
                ) : null}
              </Reveal>
              <Reveal delay={80} className="ring-gradient rounded-[28px] bg-cream p-6 sm:p-8">
                <h2 className="text-3xl">In the room</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {room.amenities.map((item) => (
                    <li key={item} className="rounded-full border border-sand bg-white px-3 py-1.5 text-sm text-ink/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <BookingCard heading="Book this stay" id={`${room.slug}-booking`} />
            <p className="mt-3 px-2 text-sm text-muted">
              The reservation page shows live availability. Choose the {room.short.toLowerCase()} room there if it is
              offered for your dates.
            </p>
          </aside>
        </div>

        <div className="mt-20">
          <SplitHeading text="Other rooms." className="text-3xl sm:text-4xl" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((item, i) => (
              <Reveal key={item.slug} delay={i * 70}>
                <Link
                  href={`/rooms/${item.slug}`}
                  className="group relative block h-[220px] overflow-hidden rounded-[24px] border border-sand shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
                >
                  <Image
                    src={item.images[0].src}
                    alt=""
                    fill
                    sizes="33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <span className="absolute inset-x-5 bottom-5">
                    <strong className="block font-serif text-2xl font-medium text-white">{item.name.replace(" Room", "")}</strong>
                    <span className="text-sm text-white/75">
                      Sleeps {item.sleeps} · {item.beds}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
