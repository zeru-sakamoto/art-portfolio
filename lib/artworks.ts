export interface Artwork {
    id: string;
    slug: string;
    title: string;
    medium: "traditional" | "digital";
    tools: string[];
    year: number;
    description: string;
    image: string;
    /** CSS aspect-ratio for the image box, e.g. "3/4", "1/1", "16/9". Defaults to "4/3". Drives the masonry gallery's varied heights. */
    aspectRatio?: string;
    featured?: boolean;
}

export const artworks: Artwork[] = [
    {
        id: "1",
        slug: "moonlit-ronin",
        title: "Moonlit Ronin",
        medium: "digital",
        tools: ["Procreate", "iPad Pro"],
        year: 2025,
        description:
            "A lone wanderer beneath a pale moon — painted in flat cel-shaded layers with a soft glow pass to keep the night cold and quiet.",
        image: "/artworks/moonlit-ronin.svg",
        aspectRatio: "3/4",
        featured: true,
    },
    {
        id: "2",
        slug: "mountain-pass",
        title: "Mountain Pass",
        medium: "traditional",
        tools: ["Watercolor", "Ink"],
        year: 2024,
        description:
            "A loose ink skeleton built up with thin watercolor washes, chasing the way fog softens a ridge line at altitude.",
        image: "/artworks/mountain-pass.svg",
        aspectRatio: "16/9",
        featured: true,
    },
    {
        id: "3",
        slug: "crystal-bloom",
        title: "Crystal Bloom",
        medium: "digital",
        tools: ["Photoshop", "Wacom Cintiq"],
        year: 2025,
        description:
            "Faceted gem forms grown like petals — a study in hard-edged refraction and the single accent blue carried through every facet.",
        image: "/artworks/crystal-bloom.svg",
        aspectRatio: "1/1",
        featured: true,
    },
    {
        id: "4",
        slug: "paper-heart",
        title: "Paper Heart",
        medium: "traditional",
        tools: ["Colored Pencil", "Sketchbook"],
        year: 2023,
        description:
            "A small, quiet piece built from layered colored-pencil strokes — proof that warmth doesn't need a wide palette.",
        image: "/artworks/paper-heart.svg",
        aspectRatio: "4/5",
    },
    {
        id: "5",
        slug: "starlit-wanderer",
        title: "Starlit Wanderer",
        medium: "digital",
        tools: ["Clip Studio Paint", "iPad Pro"],
        year: 2024,
        description:
            "A figure cut from negative space against a five-point star field, rendered with hard pixel edges instead of soft brushes.",
        image: "/artworks/starlit-wanderer.svg",
        aspectRatio: "4/3",
        featured: true,
    },
    {
        id: "6",
        slug: "tideline",
        title: "Tideline",
        medium: "traditional",
        tools: ["Acrylic", "Canvas"],
        year: 2023,
        description:
            "Repeating acrylic bands chasing the rhythm of a shoreline at low tide, palette-knifed to keep every wave distinct.",
        image: "/artworks/tideline.svg",
        aspectRatio: "3/2",
    },
];

export const featuredArtworks = artworks.filter((artwork) => artwork.featured);

export function getArtworkBySlug(slug: string): Artwork | undefined {
    return artworks.find((artwork) => artwork.slug === slug);
}
