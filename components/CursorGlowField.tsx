"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CLOUDS = [
    { className: "top-[8%] left-[12%] h-80 w-80 bg-accent/25 blur-[70px]", driftX: 50, driftY: -35, duration: 17 },
    { className: "top-[45%] right-[8%] h-[26rem] w-[26rem] bg-accent/15 blur-[90px]", driftX: -45, driftY: 40, duration: 21 },
    { className: "bottom-[6%] left-[38%] h-72 w-72 bg-accent/20 blur-[60px]", driftX: 35, driftY: 30, duration: 14 },
];

export default function CursorGlowField() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
    const trackedRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const finePointer = window.matchMedia("(pointer: fine)").matches;

            if (!reduceMotion) {
                cloudRefs.current.forEach((cloud, i) => {
                    if (!cloud) return;
                    const { driftX, driftY, duration } = CLOUDS[i];
                    gsap.to(cloud, {
                        x: driftX,
                        y: driftY,
                        scale: 1.12,
                        duration,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                    });
                });
            }

            if (!reduceMotion && finePointer && trackedRef.current) {
                const moveX = gsap.quickTo(trackedRef.current, "x", { duration: 0.8, ease: "power2.out" });
                const moveY = gsap.quickTo(trackedRef.current, "y", { duration: 0.8, ease: "power2.out" });

                const handleMove = (e: PointerEvent) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    moveX(e.clientX - rect.left);
                    moveY(e.clientY - rect.top);
                    gsap.to(trackedRef.current, { opacity: 0.55, duration: 0.5, overwrite: "auto" });
                };

                window.addEventListener("pointermove", handleMove);
                return () => window.removeEventListener("pointermove", handleMove);
            }
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-0 isolate overflow-hidden"
            aria-hidden="true"
        >
            {CLOUDS.map((cloud, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        cloudRefs.current[i] = el;
                    }}
                    className={`absolute rounded-full mix-blend-screen ${cloud.className}`}
                />
            ))}
            <div
                ref={trackedRef}
                className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 opacity-0 blur-[70px] mix-blend-screen"
            />
        </div>
    );
}
