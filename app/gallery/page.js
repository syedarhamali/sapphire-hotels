import { GalleryGrid } from "@/components/GalleryGrid";
import { PageBanner } from "@/components/PageBanner";
import { gallery } from "@/lib/data";

export const metadata = {
  title: "Gallery",
  description: "Photos of Sapphire Hotel London: the townhouse, ensuite rooms, and nearby London sights.",
};

export default function GalleryPage() {
  return (
    <div className="pb-24">
      <PageBanner
        eyebrow="Photos"
        title="The building, the rooms, the city."
        accent="the city."
        lede="The hotel, the rooms, and a few of the places guests walk or ride to from Shepherds Bush Road."
        image="/photos/lounge.jpg"
        imageAlt="Hotel lounge with a black sofa, glass tables and white chairs"
      />

      <div className="mx-auto mt-12 w-full max-w-frame px-3 sm:px-4">
        <GalleryGrid images={gallery} />
      </div>
    </div>
  );
}
