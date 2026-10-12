import Image from "next/image";
import Link from "next/link";
import { BookingCard } from "@/components/BookingCard";
import { RoomsExplorer } from "@/components/RoomsExplorer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { rooms } from "@/lib/data";

export const metadata = {
  title: "Rooms",
  description:
    "Double, single, twin and triple ensuite rooms at Sapphire Hotel London. Every room has a private bathroom, television, and tea and coffee.",
};

export default function Rooms() {
  return (
    <div className="pb-24">
      <PageBanner
        eyebrow="Stay"
        title="Four rooms. Every one ensuite."
        lede="Each has a private bathroom, a television, tea and coffee, a hairdryer and an iron. Choose by how many people are travelling."
        image="/photos/triple-1.jpeg"
        imageAlt="Guest room with two beds, dark headboards and gold curtains"
      />

      <section className="relative mx-auto -mt-16 w-full max-w-frame px-4 sm:px-6">
        <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_320px]">
          <BookingCard heading="Search dates" id="rooms-booking" wide />
          <div className="relative hidden overflow-hidden rounded-[32px] shadow-soft lg:block">
            <Image
              src="/photos/double-2.jpeg"
              alt="Room corner with gold curtains, a fridge and an armchair"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-frame px-4 sm:px-6">
        <RoomsExplorer rooms={rooms} />
      </section>

      <section className="mx-auto mt-24 w-full max-w-frame px-4 sm:px-6">
        <SplitHeading text="Compare at a glance." className="text-4xl sm:text-5xl" />
        <Reveal className="ring-gradient mt-6 overflow-x-auto rounded-[28px]">
          <table className="w-full min-w-[640px] border-collapse">
            <caption className="sr-only">Room types compared by beds, guests and access</caption>
            <thead>
              <tr>
                {["Room", "Sleeps", "Beds", "Bathroom", "Wi-Fi", "Access"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-sand px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-sapphire-600"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.slug} className="transition-colors hover:bg-cream">
                  <th scope="row" className="border-b border-sand px-5 py-4 text-left font-serif text-xl font-medium">
                    <Link href={`/rooms/${room.slug}`} className="transition-colors hover:text-sapphire-600">
                      {room.short}
                    </Link>
                  </th>
                  <td className="border-b border-sand px-5 py-4 text-ink/80">{room.sleeps}</td>
                  <td className="border-b border-sand px-5 py-4 text-ink/80">{room.beds}</td>
                  <td className="border-b border-sand px-5 py-4 text-ink/80">Private</td>
                  <td className="border-b border-sand px-5 py-4 text-ink/80">Included</td>
                  <td className="border-b border-sand px-5 py-4 text-ink/80">{room.stairs ? "Stairs" : "See room"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-4 text-sm text-muted">
          The double and single rooms are reached by stairs. Ask the hotel if you need step-free access before you book.
        </p>
      </section>
    </div>
  );
}
