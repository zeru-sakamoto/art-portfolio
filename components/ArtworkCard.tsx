"use client";

import type { Artwork } from "@/lib/artworks";
import ProtectedImage from "./ProtectedImage";

interface ArtworkCardProps {
    artwork: Artwork;
    onSelect: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(artwork)}
            className="highlight-card glow-hover group flex w-full flex-col overflow-hidden rounded-md border border-accent/10 bg-bg-light text-left"
        >
            <ProtectedImage
                src={artwork.image}
                alt={artwork.title}
                className="w-full transition-transform duration-300 ease-out-strong group-hover:scale-[1.03]"
                style={{ aspectRatio: artwork.aspectRatio ?? "4/3" }}
            />
            <div className="flex flex-col gap-1.5 p-4">
                <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base tracking-wide text-heading-light">
                        {artwork.title}
                    </h3>
                    <span className="font-body text-sm text-paragraph-light/55">{artwork.year}</span>
                </div>
                <p className="font-body text-xs uppercase tracking-[0.18em] text-accent/80">
                    {artwork.medium}
                </p>
            </div>
        </button>
    );
}
