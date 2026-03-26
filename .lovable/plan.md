

## Plan: Integrate Sector Showcase into Cinematic Scroll Reveal

### Concept
Instead of sectors being a separate section below the cinematic reveal, they become part of the same sticky viewport — sliding up beneath the tagline as the image expands to full bleed. One continuous, cinematic experience.

```text
Progress 0%:        Progress 50%:         Progress 100%:
┌────────────┐     ┌────────────────┐     ┌────────────────┐
│             │     │  "Building..."  │     │  "Building..."  │
│  "Building  │     │                 │     │  ─────────────  │
│   enduring  │     │    ●●●●●●●●    │     │  Industrials    │
│  platforms" │     │  (image grows)  │     │  ◆ Process...   │
│             │     │                 │     │  ◆ Value-Add... │
│      ○      │     │                 │     │  Services       │
│  (small     │     │                 │     │  ◆ Facility...  │
│   circle)   │     │                 │     │  ◆ Testing...   │
└────────────┘     └────────────────┘     └────────────────┘
```

### Changes

**1. `CinematicScrollReveal.tsx` & `USCinematicScrollReveal.tsx`**
- Increase container height to `300vh` (need scroll room for the sector reveal phase)
- Split progress into two phases:
  - Phase 1 (0–60%): Image circle expands to full bleed (existing behavior)
  - Phase 2 (60–100%): Sector content fades in and slides up from bottom, positioning below the tagline
- Import sector data inline (same data currently in SectorShowcase)
- Render a sector overlay `div` inside the sticky container with `opacity` and `translateY` driven by phase 2 progress
- Sector content: two-column grid with category headings, gold diamond bullets, large readable names + descriptions — same markup as SectorShowcase but positioned absolutely within the sticky viewport
- The tagline shifts up slightly during phase 2 to make room

**2. `InvestmentCriteria.tsx`**
- Remove `<SectorShowcase />` import and usage (line 14, line 159)

**3. `SectorShowcase.tsx`**
- Keep file (may be useful elsewhere), but it's no longer rendered on the criteria page

### Files Modified
1. `src/components/CinematicScrollReveal.tsx` — add sector content overlay with scroll-driven reveal
2. `src/components/USCinematicScrollReveal.tsx` — same treatment
3. `src/pages/InvestmentCriteria.tsx` — remove SectorShowcase

