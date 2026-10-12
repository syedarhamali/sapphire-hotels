const rowOne = [
  "Ensuite rooms",
  "Free Wi-Fi",
  "Westfield in 5 minutes",
  "Shepherd’s Bush station",
  "Hammersmith station",
  "Tea and coffee",
  "Keycard doors",
  "Non-smoking hotel",
];

const rowTwo = [
  "Victorian townhouse",
  "Hammersmith Apollo nearby",
  "Airport pickup on request",
  "Concierge",
  "Flat-screen TV",
  "Daily room service",
  "Hairdryer and iron",
  "Italian marble bathrooms",
];

function Row({ items, reverse = false }) {
  const loop = [...items, ...items];
  return (
    <div className={`flex w-max items-center gap-8 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
      {loop.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap font-serif text-2xl text-ink/70 sm:text-3xl">
          {item}
          <span aria-hidden="true" className="inline-block h-2 w-2 rotate-45 bg-sapphire-400" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      aria-label="Hotel features"
      className="relative my-16 overflow-hidden border-y border-sand py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <Row items={rowOne} />
      <div className="mt-4 opacity-45">
        <Row items={rowTwo} reverse />
      </div>
    </div>
  );
}
