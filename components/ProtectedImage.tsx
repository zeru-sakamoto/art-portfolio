"use client";

import type { CSSProperties } from "react";

interface ProtectedImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: CSSProperties;
}

export default function ProtectedImage({ src, alt, className = "", style }: ProtectedImageProps) {
    return (
        <div
            role="img"
            aria-label={alt}
            className={`bg-cover bg-center ${className}`}
            style={{ backgroundImage: `url(${src})`, ...style }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
        />
    );
}
