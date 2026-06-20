"use client";

import type { Artwork } from "@/lib/artworks";
import { galleryContent } from "@/lib/content";
import ArtworkGrid from "./ArtworkGrid";

interface CatalogSectionProps {
  artworks: Artwork[];
  onSelect: (artwork: Artwork) => void;
}

export default function CatalogSection({
  artworks,
  onSelect,
}: CatalogSectionProps) {
  return (
    <section id="work" className="relative z-10 scroll-mt-24 bg-bg-medium">
      <div className="catalog-stage mx-auto max-w-8xl px-6 py-20 sm:py-28">
        <h2 className="font-display text-2xl tracking-wide text-heading-light sm:text-3xl">
          {galleryContent.heading}
        </h2>
        <p className="mt-3 max-w-2xl font-body text-sm text-paragraph-light/65 sm:text-base">
          {galleryContent.intro}
        </p>

        <div className="mt-10">
          <ArtworkGrid artworks={artworks} onSelect={onSelect} />
        </div>
      </div>
    </section>
  );
}
