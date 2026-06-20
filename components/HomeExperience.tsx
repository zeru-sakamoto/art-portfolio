"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Artwork } from "@/lib/artworks";
import Hero from "./Hero";
import CatalogSection from "./CatalogSection";
import ArtworkLightbox from "./ArtworkLightbox";
import CursorGlowField from "./CursorGlowField";

gsap.registerPlugin(ScrollTrigger);

interface HomeExperienceProps {
  featured: Artwork[];
  catalog: Artwork[];
}

// Per-tile depth-parallax vectors (% of the tile) — as the hero recedes into the void the
// tiles drift slightly toward a shared vanishing point at different rates, adding parallax
// depth to the zoom-out. Indexed to match the three tiles rendered in Hero.tsx.
const collageDolly = [
  { xPercent: -20, yPercent: -28 },
  { xPercent: 24, yPercent: -12 },
  { xPercent: -14, yPercent: 24 },
];

export default function HomeExperience({
  featured,
  catalog,
}: HomeExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          // Pin/dolly only where the right-side scatter collage layout is active (lg+).
          isDesktop: "(min-width: 1024px) and (pointer: fine)",
          isMobile: "(max-width: 1023px), (pointer: coarse)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          const heroStage =
            heroRef.current?.querySelector(".hero-stage") ?? null;
          const catalogStage =
            catalogRef.current?.querySelector(".catalog-stage") ?? null;
          const collageItems = heroRef.current
            ? gsap.utils.toArray<HTMLElement>(
                ".hero-collage-item",
                heroRef.current,
              )
            : [];
          const catalogCards = catalogRef.current
            ? gsap.utils.toArray<HTMLElement>(
                ".highlight-card",
                catalogRef.current,
              )
            : [];

          if (reduceMotion) {
            gsap.set(heroStage, { opacity: 1, scale: 1, filter: "none" });
            gsap.set(collageItems, {
              opacity: 1,
              scale: 1,
              xPercent: 0,
              yPercent: 0,
            });
            gsap.set(catalogStage, {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              filter: "none",
            });
            gsap.set(catalogCards, { opacity: 1, y: 0 });
            return;
          }

          // Catalog reveals on enter in every animated branch (never pinned/scrubbed).
          let catalogTriggers: ScrollTrigger[] = [];
          if (catalogCards.length) {
            gsap.set(catalogCards, { opacity: 0, y: 40 });
            catalogTriggers = ScrollTrigger.batch(catalogCards, {
              start: "top 85%",
              onEnter: (batch) =>
                gsap.to(batch, {
                  opacity: 1,
                  y: 0,
                  stagger: 0.08,
                  duration: 0.6,
                  ease: "power2.out",
                  overwrite: true,
                }),
            });
          }
          const killCatalog = () => catalogTriggers.forEach((t) => t.kill());

          // Collage assembles on load in both animated branches.
          const intro = collageItems.length
            ? gsap.from(collageItems, {
                opacity: 0,
                scale: 0.9,
                y: 20,
                stagger: 0.08,
                duration: 0.6,
                ease: "power2.out",
              })
            : null;

          if (isDesktop) {
            // Zoom out into space: the pinned hero recedes — the whole stage scales
            // down, blurs and fades into the void while the tiles drift toward a
            // vanishing point. pinSpacing:false lets the gallery rise *behind* the
            // shrinking hero (reveal-behind), then carry on as it scrolls up.
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                pinSpacing: false,
                scrub: 1,
                anticipatePin: 1,
              },
            });

            // fromTo with immediateRender:false so the scrub timeline stays dormant
            // until the first scroll tick — letting the load-in intro play first
            // without the dolly capturing its start state.
            if (heroStage) {
              tl.fromTo(
                heroStage,
                { scale: 1, opacity: 1, filter: "blur(0px)" },
                {
                  scale: 0.5,
                  opacity: 0,
                  filter: "blur(8px)",
                  ease: "none",
                  immediateRender: false,
                },
                0,
              );
            }

            // The cloud field is pinned with the hero, so fade it out alongside the
            // recede — otherwise the blue glow would linger over the rising gallery.
            const heroGlow =
              heroRef.current?.querySelector(".hero-glow-field") ?? null;
            if (heroGlow) {
              tl.fromTo(
                heroGlow,
                { opacity: 1 },
                { opacity: 0, ease: "none", immediateRender: false },
                0,
              );
            }

            // The pixel-grid texture sits outside .hero-stage (so it can span the
            // full section), which means it needs its own fade or it lingers over
            // the gallery after the rest of the hero has receded.
            const pixelGrid =
              heroRef.current?.querySelector(".pixel-grid") ?? null;
            if (pixelGrid) {
              tl.fromTo(
                pixelGrid,
                { opacity: 1 },
                { opacity: 0, ease: "none", immediateRender: false },
                0,
              );
            }

            collageItems.forEach((item, i) => {
              const { xPercent, yPercent } =
                collageDolly[i % collageDolly.length];
              tl.fromTo(
                item,
                { scale: 1, xPercent: 0, yPercent: 0 },
                {
                  scale: 0.85,
                  xPercent,
                  yPercent,
                  ease: "none",
                  immediateRender: false,
                },
                0,
              );
            });

            // The gallery comes forward out of the distance as it rises behind the
            // hero — scale/blur only (no opacity, so the per-card batch reveal above
            // still drives the card fade-in without double-fading).
            let galleryReveal: gsap.core.Tween | null = null;
            if (catalogStage) {
              galleryReveal = gsap.fromTo(
                catalogStage,
                { scale: 0.92, yPercent: 6, filter: "blur(6px)" },
                {
                  scale: 1,
                  yPercent: 0,
                  filter: "blur(0px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: catalogRef.current,
                    start: "top bottom",
                    end: "top 40%",
                    scrub: 1,
                  },
                },
              );
            }

            // Refresh once layout has truly settled — the swapped-in local fonts
            // (and the large clamp()-sized hero heading) can reflow the hero after
            // ScrollTrigger has already computed pin/scrub boundaries from the
            // pre-swap layout, leaving the blur scrub permanently misaligned with
            // actual scroll position otherwise.
            const refresh = () => ScrollTrigger.refresh();
            document.fonts.ready.then(refresh);
            window.addEventListener("load", refresh);

            return () => {
              intro?.kill();
              tl.kill();
              galleryReveal?.kill();
              killCatalog();
              window.removeEventListener("load", refresh);
            };
          }

          // Mobile / coarse pointer: no pin. The load-in intro carries the collage.
          return () => {
            intro?.kill();
            killCatalog();
          };
        },
      );

      return () => mm.kill();
    },
    { scope: containerRef },
  );

  return (
    <>
      <div ref={containerRef} className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="hero-void fixed inset-0 -z-10" />

        <div ref={heroRef} className="pointer-events-none relative z-20">
          <CursorGlowField />
          <Hero featured={featured} onSelect={setSelectedArtwork} />
        </div>

        <div ref={catalogRef}>
          <CatalogSection artworks={catalog} onSelect={setSelectedArtwork} />
        </div>
      </div>

      <ArtworkLightbox
        artwork={selectedArtwork}
        artworks={catalog}
        onSelect={setSelectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </>
  );
}
