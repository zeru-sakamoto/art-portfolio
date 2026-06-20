"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dotDuration = reduceMotion ? 0 : 0.15;
    const ringDuration = reduceMotion ? 0 : 0.4;

    const dotX = gsap.quickTo(dotRef.current, "x", {
      duration: dotDuration,
      ease: "power3.out",
    });
    const dotY = gsap.quickTo(dotRef.current, "y", {
      duration: dotDuration,
      ease: "power3.out",
    });
    const ringX = gsap.quickTo(ringRef.current, "x", {
      duration: ringDuration,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(ringRef.current, "y", {
      duration: ringDuration,
      ease: "power3.out",
    });

    const handleMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleDown = () => {
      gsap.to([dotRef.current, ringRef.current], {
        scale: 0.8,
        duration: 0.15,
        overwrite: "auto",
      });
    };

    const handleUp = () => {
      gsap.to([dotRef.current, ringRef.current], {
        scale: 1,
        duration: 0.15,
        overwrite: "auto",
      });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  return (
    <div
      className="custom-cursor pointer-events-none fixed inset-0 z-[200]"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[var(--shadow-glow-sm)]"
      />
    </div>
  );
}
