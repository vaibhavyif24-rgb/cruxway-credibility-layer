

## Plan: Full-Page Sectors Showcase (India & US)

### Problem
The "Sectors We Look At" content is buried in a small slide-up card at the bottom of the cinematic reveal with tiny fonts. It's the most important component but currently the least readable.

### New Design Concept: Full-Screen Staggered Sector Reveal

Remove the card entirely from the cinematic scroll reveal. Instead, place a dedicated full-viewport section **immediately after** the cinematic reveal that showcases sectors with large, readable typography and scroll-triggered stagger animations.

```text
┌──────────────────────────────────┐
│  SECTORS WE LOOK AT  (label)    │
│  ─────                          │
│                                 │
│  ┌─────────────┐ ┌────────────┐ │
│  │ INDUSTRIALS │ │ BUSINESS & │ │
│  │             │ │ INDUSTRIAL │ │
│  │ ◆ Process   │ │            │ │
│  │   & Flow    │ │ ◆ Facility │ │
│  │   Control   │ │   & Support│ │
│  │             │ │            │ │
│  │ ◆ Value-Add │ │ ◆ Testing  │ │
│  │   Distrib.  │ │   & Cert.  │ │
│  │             │ │            │ │
│  │ ◆ Indust.   │ │ ◆ Infra    │ │
│  │   Services  │ │   Services │ │
│  │             │ │            │ │
│  │ ◆ Packaging │ │ ◆ Indust.  │ │
│  │             │ │   Tech     │ │
│  └─────────────┘ └────────────┘ │
│                                 │
│  (brief descriptor line)        │
└──────────────────────────────────┘
```

**Desktop**: Two-column layout with a gold vertical divider. Each sector item is a large row with a gold diamond bullet, name in ~20px serif font, and a one-line descriptor in 15px sans.

**Mobile**: Single-column stacked layout, each item full-width, generous vertical spacing.

**Animation**: Each sector item fades in and slides up with a staggered delay (framer-motion `whileInView`), creating a cascading reveal as the user scrolls into the section.

### Changes

**1. `CinematicScrollReveal.tsx` (India)**
- Remove the entire slide-up card (the `cardWrapperRef` div and `SectorColumn` component, lines 16-43, 162-224)
- Remove `cardProgress` logic and `cardWrapperRef`
- Keep the expanding circle + tagline intact (the cinematic reveal itself)
- Reduce container height from `300vh` to `200vh` (no longer need extra scroll for card)

**2. `USCinematicScrollReveal.tsx` (US)**
- Same removal of the slide-up card
- Same simplification

**3. New component: `SectorShowcase.tsx`**
- Accepts `region: 'us' | 'india'` prop
- Contains sector data for both regions
- Full-viewport min-height section with theme-aware background (dark navy / light cream)
- Section label "Sectors We Look At" at top with gold rule
- Two-column grid (desktop) / single column (mobile)
- Each sector category gets a large serif heading (~1.5rem)
- Each item: gold diamond bullet + large readable name (18-20px) + descriptor (14-15px muted)
- Items animate in with `framer-motion` staggered `whileInView`
- Gold vertical divider between columns on desktop
- Brief regional descriptor paragraph below the heading

**4. `InvestmentCriteria.tsx`**
- Import and place `<SectorShowcase region={...} />` immediately after the cinematic scroll reveal (line 157)

### Files Modified
1. `src/components/CinematicScrollReveal.tsx` — remove card, simplify to image + tagline only
2. `src/components/USCinematicScrollReveal.tsx` — same
3. `src/components/SectorShowcase.tsx` — new full-page sector display
4. `src/pages/InvestmentCriteria.tsx` — add SectorShowcase after cinematic reveal

