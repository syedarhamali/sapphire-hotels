import { ContactForm } from "@/components/ContactForm";
import { PageBanner } from "@/components/PageBanner";
import { hotel } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Contact Sapphire Hotel London at 35 Shepherds Bush Road, London W6 7LU. Telephone +44 20 7603 0707 or email info@sapphirehotellondon.co.uk.",
};

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-0.2298%2C51.4978%2C-0.2138%2C51.5041&layer=mapnik&marker=${hotel.lat}%2C${hotel.lng}`;

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 0 1 1-.25c1 .33 2 .5 3.1.5a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1C10.6 20 4 13.4 4 5a1 1 0 0 1 1-1h2.95a1 1 0 0 1 1 1c0 1.1.17 2.1.5 3.1a1 1 0 0 1-.25 1l-2 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const details = [
  {
    icon: PinIcon,
    label: "Address",
    content: (
      <a href={hotel.maps} target="_blank" rel="noreferrer" className="text-ink hover:text-sapphire-600">
        {hotel.street}
        <br />
        {hotel.locality}
        <br />
        {hotel.country}
      </a>
    ),
  },
  {
    icon: PhoneIcon,
    label: "Telephone",
    content: (
      <a href={`tel:${hotel.phoneTel}`} className="text-ink hover:text-sapphire-600">
        {hotel.phoneDisplay}
      </a>
    ),
  },
  {
    icon: MailIcon,
    label: "Email",
    content: (
      <a href={`mailto:${hotel.email}`} className="text-ink hover:text-sapphire-600">
        {hotel.email}
      </a>
    ),
  },
];

export default function Contact() {
  return (
    <div className="pb-24">
      <PageBanner
        eyebrow="Hammersmith"
        title="Contact"
        lede="Call, email, or send a note. For a room, use the booking page so you can see live availability."
        image="/photos/facade.jpg"
        imageAlt="Yellow-brick facade and white bay window of the hotel"
      />

      <div className="mx-auto mt-10 mb-6 grid w-full max-w-frame gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="ring-gradient rounded-[28px] bg-paper p-6 shadow-soft sm:p-8">
          <h2 className="text-xl text-ink">Sapphire Hotel London</h2>
          <dl className="mt-4 grid gap-4">
            {details.map(({ icon: Icon, label, content }) => (
              <div key={label} className="flex items-start gap-3 border-t border-sand pt-4 first:border-t-0 first:pt-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sapphire-50 text-sapphire-600">
                  <Icon />
                </span>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-sapphire-600">{label}</dt>
                  <dd className="mt-0.5">{content}</dd>
                </div>
              </div>
            ))}
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
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sapphire-50 px-4 py-2 text-sm font-bold text-sapphire-600 transition-colors hover:bg-sapphire-100"
        >
          Get directions <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
