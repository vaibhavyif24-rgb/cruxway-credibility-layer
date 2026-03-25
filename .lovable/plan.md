

## "What Guides Us" — Scroll-Triggered Vertical Slider with Thematic Illustrations

### Concept

Replace the current 6-card grid with a **full-viewport scroll-triggered vertical slider**. Each principle occupies one "snap" panel. As the user scrolls, panels transition in sequence — each featuring a thematic illustration as a full-bleed background with text centered over it.

The illustrations will be generated via the Nano banana image API, themed around **classic space exploration, retro-futurism, and ambition** — matching the Prussian blue / gold brand palette. Think: vintage NASA posters, golden constellations, lone explorers on distant horizons.

### Visual Design

```text
┌──────────────────────────────────────┐
│                                      │
│         [Full-bleed image]           │
│         dark overlay gradient        │
│                                      │
│           ── PRINCIPLES ──           │  ← gold label, 10px caps
│                                      │
│            Integrity                 │  ← serif, ~2rem, white
│     ─────── gold rule ───────        │
│   Transparency and intellectual      │  ← sans, 15px, white/65
│     honesty in every interaction.    │
│                                      │
│          ● ● ● ○ ○ ○                │  ← dot indicators
│                                      │
└──────────────────────────────────────┘
```

- Each panel: `h-screen`, `snap-start`, image background with strong dark overlay
- Text: dead center (flex items-center justify-center, text-center)
- Scroll container: `snap-y snap-mandatory overflow-y-auto`
- Subtle fade/slide animation on text as each panel enters view

### Illustration Themes per Principle

| Principle | Image Theme |
|---|---|
| Integrity | A lone astronaut standing before a transparent glass planet — truth revealed |
| Servant Leadership | A figure holding a lantern illuminating a path for others through a nebula |
| Humility | A small human silhouette gazing up at an immense galaxy — scale and wonder |
| Grit | A weathered spacecraft pushing through an asteroid field — determination |
| Bias to Action | A rocket igniting on a launchpad — the moment of decisive thrust |
| The Golden Rule | Two hands reaching across constellations — connection across vastness |

All rendered in the Prussian blue / deep navy / gold palette with a vintage poster aesthetic.

### Implementation

**New component: `src/components/PrinciplesSlider.tsx`**
- Accepts the `principles` array
- Renders a scroll-snap container with 6 full-height panels
- Each panel: background image (static imports from `src/assets/`), dark gradient overlay, centered text block
- Uses `framer-motion` `useInView` for per-panel text entrance animation (fade-up)
- Dot indicator row fixed at bottom of each panel showing current position
- On mobile: same layout, touch-scroll friendly

**Generate 6 images** using the AI image generation API at build time, save to `src/assets/principles/`. Each ~1200x800, compressed WebP, Prussian blue / gold / deep navy color scheme, retro space exploration style.

**Modify: `src/pages/About.tsx`**
- Replace the Principles `<section>` (lines 116-150) with the new `<PrinciplesSlider>` component
- Remove the grid layout, keep the same data array

### Technical Details

- Scroll-snap CSS: `scroll-snap-type: y mandatory` on container, `scroll-snap-align: start` on each panel
- Container height: `h-screen` with `overflow-y-auto` so it scrolls independently, OR integrate into page flow with intersection-based active state (preferred for natural scroll feel)
- Images loaded with `loading="lazy"` for performance
- Gold rule and section label reuse existing `GoldRule` and `SectionLabel` components
- Dark overlay: `bg-gradient-to-b from-black/60 via-black/40 to-black/60`

### Files to Create/Edit

1. **Create** `src/components/PrinciplesSlider.tsx` — the vertical slider component
2. **Generate** 6 illustration images → `src/assets/principles/`
3. **Edit** `src/pages/About.tsx` — swap grid section for slider

