import { ContactForm } from "@/components/ContactForm";
import { PageBanner } from "@/components/PageBanner";
import { hotel } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Contact Sapphire Hotel London at 35 Shepherds Bush Road, London W6 7LU. Telephone +44 20 7603 0707 or email info@sapphirehotellondon.co.uk.",
};

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-0.2298%2C51.4978%2C-0.2138%2C51.5041&layer=mapnik&marker=${hotel.lat}%2C${hotel.lng}`;

export default function Contact() {
  return (
    <div className="py-10 pb-20 sm:py-12">
      <PageBanner
        eyebrow="Hammersmith"
        title="Contact"
        lede="Call, email, or send a note. For a room, use the booking page so you can see live availability."
        image="/photos/facade.jpg"
        imageAlt="Yellow-brick facade and white bay window of the hotel"
      />

      <div className="mx-auto mb-6 grid w-full max-w-frame gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="ring-gradient rounded-[28px] p-6 shadow-soft">
          <h2 className="text-xl text-ink">Sapphire Hotel London</h2>
          <dl className="mt-2">
            <div className="border-t border-sand py-3">
              <dt className="text-xs font-bold uppercase tracking-wide text-sapphire-600">Address</dt>
              <dd className="mt-0.5">
                <a href={hotel.maps} target="_blank" rel="noreferrer" className="text-ink hover:text-sapphire-600">
                  {hotel.street}
                  <br />
                  {hotel.locality}
                  <br />
                  {hotel.country}
                </a>
              </dd>
            </div>
            <div className="border-t border-sand py-3">
              <dt className="text-xs font-bold uppercase tracking-wide text-sapphire-600">Telephone</dt>
              <dd className="mt-0.5">
                <a href={`tel:${hotel.phoneTel}`} className="text-ink hover:text-sapphire-600">
                  {hotel.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="border-t border-sand py-3">
              <dt className="text-xs font-bold uppercase tracking-wide text-sapphire-600">Email</dt>
              <dd className="mt-0.5">
                <a href={`mailto:${hotel.email}`} className="text-ink hover:text-sapphire-600">
                  {hotel.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>

      <div className="mx-auto w-full max-w-frame px-4 sm:px-6">
        <iframe
          title="Map showing Sapphire Hotel London on Shepherds Bush Road"
          src={mapSrc}
          loading="lazy"
          className="h-[420px] w-full rounded-[28px] border-0 bg-sand shadow-soft"
        />
        <a
          href={hotel.maps}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sapphire mt-3"
        >
          Get directions <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
