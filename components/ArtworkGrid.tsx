"use client";

import type { Artwork } from "@/lib/artworks";
import ArtworkCard from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: Artwork[];
  onSelect: (artwork: Artwork) => void;
}

export default function ArtworkGrid({ artworks, onSelect }: ArtworkGridProps) {
  // CSS-columns masonry: cards keep their natural (aspect-ratio-driven) heights and pack
  // vertically, so mixed aspect ratios stagger instead of snapping to a uniform grid.
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="mb-6 break-inside-avoid">
          <ArtworkCard artwork={artwork} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
