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
    slug: "beach-corgi",
    title: "Rabies Vaccine Day",
    medium: "digital",
    tools: ["Clip Studio Paint", "Huion H320M"],
    year: 2021,
    description:
      "School Publication Artwork I made during Senior High on National Anti-Rabies Vaccine Day.",
    image: "/artworks/corgi.png",
    aspectRatio: "1/1",
    featured: true,
  },
  {
    id: "2",
    slug: "isaiah-1-16",
    title: "Isaiah 1:18",
    medium: "digital",
    tools: ["Aseprite", "Huion H320M"],
    year: 2026,
    description:
      "God's grace and mercy, and the new life brought fourth from it.",
    image: "/artworks/isaiah118.png",
    aspectRatio: "16/9",
    featured: true,
  },
  {
    id: "3",
    slug: "fih",
    title: "Fih",
    medium: "traditional",
    tools: ["Uni Kuru-toga Advance", "Bammboo Leaf Nib Fountain Pen"],
    year: 2026,
    description: "Practice Sketch when I was practicing drawing hair.",
    image: "/artworks/fih.jpg",
    aspectRatio: "1/1",
    featured: true,
  },
  {
    id: "4",
    slug: "stranded-mountain",
    title: "Stranded Mountain",
    medium: "traditional",
    tools: ["Prang Watercolor", "1/8 Illustration Board"],
    year: 2019,
    description:
      "Got stranded on a field trip, so I painted this in memory of it.",
    image: "/artworks/stranded-mountain.jpg",
    aspectRatio: "4/3",
  },
  {
    id: "5",
    slug: "zero-two",
    title: "Zero Two",
    medium: "traditional",
    tools: ["HB Pencil", "Mechanical Pencil"],
    year: 2019,
    description:
      "Zero Two copy drawing when I was starting out learning how to draw anime girls.",
    image: "/artworks/zerotwo.jpg",
    aspectRatio: "3/4",
    featured: true,
  },
  {
    id: "6",
    slug: "earth.png",
    title: "Earth",
    medium: "digital",
    tools: ["Clip Studio Paint", "Textured Oil Pastel Brush"],
    year: 2023,
    description: "Profile Banner Background I made.",
    image: "/artworks/earth.png",
    aspectRatio: "3/2",
  },
];

export const featuredArtworks = artworks.filter((artwork) => artwork.featured);

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((artwork) => artwork.slug === slug);
}
