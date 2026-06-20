"use client";

import { useEffect, useRef } from "react";
import type { Artwork } from "@/lib/artworks";
import { lightboxContent } from "@/lib/content";
import ProtectedImage from "./ProtectedImage";
import Badge from "./Badge";

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  artworks: Artwork[];
  onSelect: (artwork: Artwork) => void;
  onClose: () => void;
}

/** Split an `aspectRatio` string like "3/4" into numeric width/height (defaults to 4/3). */
function parseRatio(aspectRatio?: string): { w: number; h: number } {
  const [w, h] = (aspectRatio ?? "4/3").split("/").map((n) => Number(n.trim()));
  return w > 0 && h > 0 ? { w, h } : { w: 4, h: 3 };
}

export default function ArtworkLightbox({
  artwork,
  artworks,
  onSelect,
  onClose,
}: ArtworkLightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const index = artwork ? artworks.findIndex((a) => a.id === artwork.id) : -1;
  const hasSiblings = artworks.length > 1;
  const prev =
    index >= 0
      ? artworks[(index - 1 + artworks.length) % artworks.length]
      : null;
  const next = index >= 0 ? artworks[(index + 1) % artworks.length] : null;

  useEffect(() => {
    if (!artwork) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        onSelect(prev);
        return;
      }

      if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        onSelect(next);
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [artwork, prev, next, onSelect, onClose]);

  if (!artwork) return null;

  const { w, h } = parseRatio(artwork.aspectRatio);

  return (
    <div
      ref={panelRef}
      className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-bg-dark/90 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label={lightboxContent.closeLabel}
        className="glow-hover absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-sm border border-accent/20 bg-bg-dark/70 font-display text-xl leading-none text-heading-light backdrop-blur-sm"
      >
        ×
      </button>

      {hasSiblings && prev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(prev);
          }}
          aria-label={lightboxContent.prevLabel}
          className="glow-hover absolute top-1/2 left-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-accent/20 bg-bg-dark/70 font-display text-2xl leading-none text-heading-light backdrop-blur-sm sm:left-5"
        >
          ‹
        </button>
      )}

      {hasSiblings && next && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(next);
          }}
          aria-label={lightboxContent.nextLabel}
          className="glow-hover absolute top-1/2 right-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-accent/20 bg-bg-dark/70 font-display text-2xl leading-none text-heading-light backdrop-blur-sm sm:right-5"
        >
          ›
        </button>
      )}

      <figure
        key={artwork.id}
        onClick={(e) => e.stopPropagation()}
        className="lightbox-figure relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-md shadow-glow-lg"
        style={{
          aspectRatio: `${w} / ${h}`,
          width: `min(92vw, calc(88vh * ${w} / ${h}))`,
        }}
      >
        <ProtectedImage
          src={artwork.image}
          alt={artwork.title}
          style={{ backgroundSize: "cover" }}
          className="absolute inset-0 h-full w-full bg-bg-dark"
        />

        <figcaption className="lightbox-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark via-bg-dark/85 to-transparent px-5 pt-12 pb-5 backdrop-blur-[2px] sm:px-7 sm:pb-6">
          <h2 className="font-display text-xl tracking-wide text-heading-light sm:text-2xl">
            {artwork.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge>{artwork.medium}</Badge>
            <span className="font-body text-sm text-paragraph-light/60">
              {artwork.year}
            </span>
          </div>
          <p className="mt-3 max-w-prose font-body text-sm text-paragraph-light/80 sm:text-base">
            {artwork.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {artwork.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-sm border border-accent/15 bg-bg-dark/60 px-2 py-1 font-body text-sm text-paragraph-light/70"
              >
                {tool}
              </span>
            ))}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
