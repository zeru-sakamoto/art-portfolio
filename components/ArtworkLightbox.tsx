"use client";

import { useEffect, useRef } from "react";
import type { Artwork } from "@/lib/artworks";
import { lightboxContent } from "@/lib/content";
import ProtectedImage from "./ProtectedImage";
import Badge from "./Badge";

interface ArtworkLightboxProps {
    artwork: Artwork | null;
    onClose: () => void;
}

export default function ArtworkLightbox({ artwork, onClose }: ArtworkLightboxProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!artwork) return;

        closeButtonRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }

            if (e.key === "Tab" && panelRef.current) {
                const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                    'button, a[href], [tabindex]:not([tabindex="-1"])'
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
    }, [artwork, onClose]);

    if (!artwork) return null;

    return (
        <div
            className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-bg-dark/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={artwork.title}
        >
            <div
                ref={panelRef}
                onClick={(e) => e.stopPropagation()}
                className="lightbox-panel relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-accent/20 bg-bg-light shadow-glow-lg"
            >
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label={lightboxContent.closeLabel}
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-sm bg-bg-dark/80 font-display text-heading-light transition-colors hover:text-accent"
                >
                    ×
                </button>

                <ProtectedImage
                    src={artwork.image}
                    alt={artwork.title}
                    style={{ backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
                    className="h-[45vh] w-full shrink-0 bg-bg-dark"
                />

                <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-6">
                    <h2 className="font-display text-xl tracking-wide text-heading-light">
                        {artwork.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge>{artwork.medium}</Badge>
                        <span className="font-body text-sm text-paragraph-light/60">{artwork.year}</span>
                    </div>
                    <p className="font-body text-base text-paragraph-light/80">{artwork.description}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {artwork.tools.map((tool) => (
                            <span
                                key={tool}
                                className="rounded-sm border border-accent/15 bg-bg-dark/60 px-2 py-1 font-body text-sm text-paragraph-light/70"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
