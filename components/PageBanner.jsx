import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { SplitHeading } from "@/components/SplitHeading";
import { ParallaxFrame } from "@/components/ParallaxFrame";

export function PageBanner({ eyebrow, title, lede, image, imageAlt, children }) {
  return (
    <section className="relative px-3 pt-8 sm:px-4 sm:pt-10">
      <div className="relative mx-auto min-h-[56vh] w-full max-w-frame overflow-hidden rounded-[40px] bg-night-soft shadow-lift">
        {image ? (
          <ParallaxFrame>
            <Image src={image} alt={imageAlt || ""} fill priority sizes="100vw" className="kenburns object-cover" />
          </ParallaxFrame>
        ) : null}
        <div className="vignette absolute inset-0" />

        <div className="relative flex min-h-[56vh] flex-col justify-end p-7 sm:p-12 lg:p-16">
          <Eyebrow className="!border-white/25 max-w-max !bg-white/10 !text-white">{eyebrow}</Eyebrow>
          <SplitHeading as="h1" text={title} immediate className="max-w-3xl text-5xl text-white sm:text-7xl lg:text-8xl" />
          {lede ? <p className="mt-5 max-w-[40rem] text-lg text-white/80 sm:text-xl">{lede}</p> : null}
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
