"use client";

import Link from "next/link";
import type { Artwork } from "@/lib/artworks";
import { heroContent } from "@/lib/content";
import ProtectedImage from "./ProtectedImage";

interface HeroProps {
    featured: Artwork[];
    onSelect: (artwork: Artwork) => void;
}

// Per-tile layout for the 3-piece collage. Base classes drive the stacked/overlapping
// mobile column; the `lg:` classes switch each tile to an absolutely-positioned, scattered
// arrangement on the right half of the hero.
const collageTiles = [
    "z-30 w-[68%] rotate-[-3deg] lg:absolute lg:left-0 lg:top-[3%] lg:mt-0 lg:w-[58%]",
    "z-20 -mt-12 ml-auto w-[60%] rotate-[3deg] lg:absolute lg:right-0 lg:top-[24%] lg:mt-0 lg:ml-0 lg:w-[52%]",
    "z-10 -mt-10 mr-auto ml-[10%] w-[58%] rotate-[-2deg] lg:absolute lg:bottom-[2%] lg:left-[16%] lg:mx-0 lg:mt-0 lg:w-[50%]",
];

export default function Hero({ featured, onSelect }: HeroProps) {
    const collage = featured.slice(0, 3);

    return (
        <section className="pointer-events-none relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 py-24 sm:px-10 lg:py-0">
            <div className="pixel-grid absolute inset-0" aria-hidden="true" />

            <div className="hero-stage relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
                <div className="hero-copy">
                    <p className="font-display text-xs tracking-[0.32em] text-accent uppercase sm:text-sm">
                        {heroContent.eyebrow}
                    </p>

                    <h1 className="mt-6 font-display leading-[0.9] tracking-tight text-heading-light [font-size:var(--text-hero)] [overflow-wrap:anywhere]">
                        <span className="block">{heroContent.heading}</span>
                        <span className="block text-accent">{heroContent.headingAccent}</span>
                    </h1>

                    <p className="mt-8 max-w-xl font-body text-base text-paragraph-light/75 sm:text-lg">
                        {heroContent.subtitle}
                    </p>

                    <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
                        <Link
                            href={heroContent.primaryCta.href}
                            className="glow-hover rounded-md border border-accent bg-accent/10 px-6 py-3 font-display text-sm tracking-wide text-accent uppercase"
                        >
                            {heroContent.primaryCta.label}
                        </Link>
                        <Link
                            href={heroContent.secondaryCta.href}
                            className="glow-hover rounded-md border border-accent/30 px-6 py-3 font-display text-sm tracking-wide text-paragraph-light uppercase"
                        >
                            {heroContent.secondaryCta.label}
                        </Link>
                    </div>
                </div>

                {/* Featured collage — overlapping tiles. Stacks below the copy on small
                    screens; becomes a scattered cluster on the right from lg up. */}
                {collage.length > 0 && (
                    <div className="relative flex flex-col items-center lg:block lg:h-[34rem]">
                        {collage.map((artwork, i) => (
                            <button
                                key={artwork.id}
                                type="button"
                                onClick={() => onSelect(artwork)}
                                aria-label={`View ${artwork.title}`}
                                className={`hero-collage-item glow-hover pointer-events-auto group block overflow-hidden rounded-md border border-accent/20 bg-bg-light ${collageTiles[i] ?? ""}`}
                            >
                                <ProtectedImage
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="w-full transition-transform duration-300 ease-out-strong group-hover:scale-[1.04]"
                                    style={{ aspectRatio: artwork.aspectRatio ?? "4/3" }}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
