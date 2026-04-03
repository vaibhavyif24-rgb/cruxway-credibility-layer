

## Dead Code Cleanup — Plan

### Summary
Delete ~35 unused files (components, assets, directories) and one HTML preload tag. Two listed pages and `App.css` don't exist, so they're skipped.

### Files to delete

**Components (16 files):**
- `src/components/ApproachTable.tsx`
- `src/components/CriteriaCarousel.tsx`
- `src/components/CriteriaPipeline.tsx`
- `src/components/HorizontalStickyDeck.tsx`
- `src/components/NavLink.tsx`
- `src/components/PrinciplesDeck.tsx`
- `src/components/PrinciplesGrid.tsx`
- `src/components/PrinciplesSlider.tsx`
- `src/components/SectorShowcase.tsx`
- `src/components/StrengthsWidget.tsx`
- `src/components/USCinematicScrollReveal.tsx`
- `src/components/AnimatedAccent.tsx`
- `src/components/CelestialIllustrations.tsx`
- `src/components/CinematicScrollReveal.tsx`
- `src/components/StickyCardStack.tsx`
- `src/components/CriteriaIllustrations.tsx`

**Assets (11 files + 1 directory):**
- `src/assets/hero-crossroads.jpg`
- `src/assets/hero-crossroads.webp`
- `src/assets/hero-crossroads-road.webp`
- `src/assets/hero-india-business.jpg`
- `src/assets/hero-industry.jpg`
- `src/assets/hero-nyc-skyline.jpg`
- `src/assets/hero-partnership.jpg`
- `src/assets/cruxway-crucible.jpg`
- `src/assets/cruxway-merge-v2.jpg`
- `src/assets/cruxway-merge-v3.jpg`
- `src/assets/india-industrial-reveal.jpg`
- `src/assets/us-industrial-reveal.jpg`
- `src/assets/cities/` (entire directory: `new-york-skyline.jpg`, `san-diego-beach.jpg`)

**HTML edit (index.html):**
- Remove the `<link rel="preload" href="/src/assets/hero-crossroads-road.webp" .../>` tag (line ~22)

### Skipped (don't exist)
- `src/pages/About.tsx` — already deleted
- `src/pages/InvestmentCriteria.tsx` — already deleted
- `src/App.css` — already deleted
- `src/assets/hero-india-about.jpg` — already deleted
- `src/assets/hero-us-about.jpg` — already deleted

### Verification
- Confirmed zero imports of any listed component/asset in the active codebase
- `CelestialIllustrations` and `CriteriaIllustrations` are only imported by other dead components (`PrinciplesDeck`, `PrinciplesSlider`, `StickyCardStack`)
- Will run `npm run build` after deletion to confirm zero errors

### Not touched
- `cruxway-crucible-v2.jpg`, `cruxway-way.jpg`, `cruxway-merge-v4.jpg` (used by CruxwayOriginStory)
- `hero-india-criteria.jpg`, `hero-us-criteria.jpg` (used by OurFocus)
- All active pages and components

