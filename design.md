# Design System

Visual reference for the Zeru Sakamoto art portfolio. Source of truth for tokens is `app/globals.css` (`@theme` block) — this file explains _why_ and _how to use_ them, not just what they are.

## Direction

Dark gallery shell that gets out of the way of the artwork, with a single cool-blue accent doing all the "liveliness" — glows, hovers, the cursor, the cloud field behind the hero. Display type leans pixel/retro-game (Superstar) to echo the "pixel by pixel" framing in the hero copy; body type is a Minecraft-style monospace (Monocraft) for a quiet, technical counterpoint. Motion is restrained and physical (GSAP, eased, reduced-motion-aware) rather than decorative.

## Color

| Token                     | Value     | Usage                                                                                                                                 |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-accent`          | `#84c3ec` | Links, focus rings, glows, badges, CTA borders, selection. The one color allowed to feel "alive."                                     |
| `--color-secondary`       | `#132637` | Reserved deep navy — defined, not yet used anywhere. Candidate for a future secondary surface/accent before reaching for a new token. |
| `--color-bg-dark`         | `#060c11` | Header, footer, hero, lightbox backdrop — the "outermost" layer.                                                                      |
| `--color-bg-medium`       | `#14181f` | `<body>` background — the default page surface.                                                                                       |
| `--color-bg-light`        | `#242a33` | Raised surfaces: cards, lightbox panel. One step lighter than the page.                                                               |
| `--color-heading-light`   | `#fefbfd` | Headings only.                                                                                                                        |
| `--color-paragraph-light` | `#ffffff` | Body text color, almost always dimmed with opacity (`/60`–`/80`) rather than used at full strength.                                   |

Convention: text on dark surfaces uses `text-paragraph-light/NN` opacity steps (60, 70, 75, 80) instead of new gray tokens — keep using opacity, don't add gray-scale colors.

## Typography

Two local fonts, loaded in `app/layout.tsx` via `next/font/local`, exposed as Tailwind utilities through `@theme inline`:

- `--font-display` → **Superstar** (`font-display` utility) — all headings, nav, buttons, labels, badges. Always paired with `tracking-wide` and frequently `uppercase`.
- `--font-body` → **Monocraft** (`font-body` utility) — paragraphs, descriptions, tool tags.

Don't introduce a third font family or fall back to system fonts for new UI — every text element should resolve to one of these two.

## Shape & Elevation

- Radii: `--radius-sm` (5px) for small chips/buttons, `--radius-md` (10px) for cards/panels, `--radius-pill` (999px) for badges.
- Glow shadows (`--shadow-glow-sm/md/lg`) are accent-colored, used on hover/active states and the lightbox panel — this is the only shadow language in the app; no neutral drop-shadows.
- Borders are typically `border-accent/10` to `border-accent/30` — low-opacity accent borders delineate surfaces instead of solid grays.
- Page-width shells (`Header`, `Footer`, `CatalogSection`) use `max-w-8xl` (`--container-8xl`, 90rem) rather than Tailwind's stock `max-w-6xl` — use `max-w-8xl` for any new full-width section shell to stay consistent.

## Motion

- Easing: `--ease-out-strong` (`cubic-bezier(0.23, 1, 0.32, 1)`) is the default for hover/press transitions defined in CSS (`glow-hover` utility, lightbox enter).
- Hover: lift (`-translate-y-2px`) + glow shadow + accent border, gated behind `(hover: hover) and (pointer: fine)` so touch devices don't get stuck mid-hover.
- Press: scale down to `0.97` on `:active` for tactile feedback on every pointer type.
- Scroll/load choreography uses GSAP (`useGSAP` + `gsap.matchMedia`), not CSS, when it depends on viewport/scroll position — see `HomeExperience.tsx` for the canonical pattern. Desktop: the hero pins and **dollies through** — the copy recedes (scale down + fade) while the 3-tile featured collage scales up and spreads outward past the edges, then unpins into the gallery; the collage also assembles on load (stagger). Mobile: no pin, collage just loads in. Reduced-motion: instant snap to final state. The catalog reveals via `ScrollTrigger.batch` on enter in every animated branch.
- Every GSAP sequence must branch on `prefers-reduced-motion` and set the final state with no animation in that branch — this is non-negotiable, not a nice-to-have.

## Cursor

The OS cursor is hidden on fine-pointer devices (`cursor: none !important` globally); `CustomCursor.tsx` replaces it with a GSAP `quickTo`-driven dot + ring that scales down on press. New interactive elements should not rely on cursor shape (e.g. `cursor-pointer`) to signal interactivity — use the `glow-hover` hover/press treatment instead, since the cursor itself can't communicate it.

`CursorGlowField.tsx` draws the ambient blue clouds behind the hero with inline radial-gradient `backgroundImage` (not `bg-accent/NN` + `blur-*` utilities) so each cloud's falloff can be tuned per-instance. It lives inside the hero's pinned container (tagged `.hero-glow-field`) and is faded out by `HomeExperience`'s scroll timeline alongside the rest of the hero recede.

## Components

- **Badge** (`components/Badge.tsx`) — pill, accent border, uppercase `font-display`. Used for medium ("digital"/"traditional") and tool tags.
- **Cards** (`ArtworkCard.tsx`) — `bg-bg-light` surface, `glow-hover`, image fills via `ProtectedImage`.
- **Lightbox** (`ArtworkLightbox.tsx`) — modal on `bg-bg-dark/90` backdrop with blur, focus-trapped, closes on `Escape`/backdrop click. The artwork `<figure>` is keyed by artwork id so prev/next (buttons, or `ArrowLeft`/`ArrowRight`) replay the `.lightbox-figure` crossfade (CSS `@starting-style`, <300ms) and the `.lightbox-caption` detail stagger-in on every navigation, not just on open.
- **SectionDivider** — wavy SVG seam between the hero and the rest of the page; pass the next section's background color as `fill`.

## Images

Artwork images render through `ProtectedImage` (CSS `background-image`, context-menu/drag blocked) rather than `next/image` — a deliberate trade against Next's image optimization, made to deter casual right-click saving of artwork. Keep using it for any new artwork-displaying surface; don't substitute `next/image` for "best practice" reasons. Image boxes are sized by each artwork's `aspectRatio` (`lib/artworks.ts`), which is what gives the gallery its CSS-columns masonry stagger — pass it through as an inline `style={{ aspectRatio }}` on `ProtectedImage`.

## Content

All copy lives in `lib/content.ts` as plain exported objects (`heroContent`, `aboutContent`, `galleryContent`, `footerContent`, etc.). New pages/sections should add a content object there rather than inlining strings in JSX — keeps copy editable in one place and keeps components purely presentational.
