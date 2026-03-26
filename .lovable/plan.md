

## Plan: Mobile Cinematic Scroll Reveal with Full Sector Visibility

### Problem
Currently on mobile, the cinematic scroll animation is completely skipped — it early-returns a plain static section with no image, no animation, and poor light-mode visibility (white text on light background). The user wants a condensed cinematic effect on mobile while ensuring all sector text is fully visible and readable in both themes.

### Approach
Replace the static early-return with a **compact mobile cinematic scroll** that uses the same sticky-scroll architecture but adapted for small screens:

- **Phase 1 (image reveal)**: Circle expands to fill screen over a shorter scroll distance (150vh total instead of 250vh). Tagline visible over the image.
- **Phase 2 (sectors)**: Instead of overlaying sectors inside the sticky viewport (which clips), sectors render as a **normal-flow section below** the sticky container, with the background image still visible via a dark overlay. This guarantees all content is scrollable.

### Changes to both `CinematicScrollReveal.tsx` and `USCinematicScrollReveal.tsx`

**Remove the early-return `if (isMobile)` block entirely.** Instead, adjust the existing render to handle mobile:

1. **Container height**: `isMobile ? '150vh' : '250vh'` — shorter cinematic scroll on mobile
2. **Circle animation**: Use a smaller initial circle (200px on mobile) with the same expand logic
3. **Tagline positioning**: Adjust `top` percentages and font size for mobile
4. **Sector overlay**: Wrap the absolute-positioned sector `<div>` with `{!isMobile && (...)}` to hide it from the sticky container on mobile
5. **Mobile sectors below sticky**: After the sticky `<div>`, add a mobile-only block that renders inside the same `<section>` but in normal document flow:
   - Full-width dark background with the background image (blurred, heavily overlaid) for cinematic feel
   - "Sectors We Look At" gold label
   - Both sector columns stacked vertically with generous spacing
   - Proper text colors that work in both light and dark mode (always light text on dark image background)

### Technical Details

```
Mobile layout structure:
┌──────────────────────────┐
│  <section height=150vh>  │
│  ┌────────────────────┐  │
│  │ sticky h-screen    │  │
│  │  - circle → expand │  │
│  │  - tagline overlay  │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │ mobile sectors     │  │  ← normal flow, NOT sticky
│  │  - bg image + dark │  │
│  │  - "Sectors We..."  │  │
│  │  - Column 1        │  │
│  │  - Column 2        │  │
│  │  (fully scrollable)│  │
│  └────────────────────┘  │
└──────────────────────────┘
```

The mobile sectors block uses `position: relative` with a background image and heavy dark overlay, ensuring white/gold text is always legible regardless of light/dark theme.

### Files Modified
- `src/components/CinematicScrollReveal.tsx`
- `src/components/USCinematicScrollReveal.tsx`

