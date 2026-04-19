

## Performance Audit — Findings

**Heavy assets (the real culprit, ~3.5 MB total):**
- 10 hero JPGs at 140–400 KB each, served as JPG (no WebP variants)
- `niti-aayog.png` = **336 KB** (a logo!), `treeforest.png` = 206 KB, `lodha-genius.png` = 132 KB
- Origin story images: `cruxway-merge-v4.jpg` 344 KB, `cruxway-way.jpg` 309 KB
- Total: roughly **2.4 MB** of avoidable image weight that could be cut by ~60–75%

**JS bundle:**
- Single 109 KB main bundle — React, framer-motion, lucide-react, embla-carousel all bundled together
- No `manualChunks` config in `vite.config.ts`

**Minor formatting / hygiene:**
- `<img>` tags missing explicit `width` / `height` (causes CLS, layout shifts during load)
- `LogoMarquee` doesn't have a fade-in placeholder while logos load
- `CinematicHero` has duplicate `transform: translateZ(0)` + `willChange: transform` on stacked motion divs (unnecessary GPU layers)
- A few `// @ts-ignore` and inline magic-number styles that could be cleaned

## Plan

### 1. Convert all heavy images to WebP (biggest win — ~1.5–2 MB saved)
Generate WebP variants for:
- All 10 region hero JPGs (`hero-india-*.jpg`, `hero-us-*.jpg`) at desktop quality 78
- Origin story: `cruxway-crucible-v2.jpg`, `cruxway-merge-v4.jpg`, `cruxway-way.jpg`
- Three oversized logos: `niti-aayog.png`, `treeforest.png`, `lodha-genius.png`

Update all imports in `Home.tsx`, `GuidingPrinciples.tsx`, `OurFocus.tsx`, `OurPlaybook.tsx`, `Contact.tsx`, `Team.tsx`, `CruxwayOriginStory.tsx`, and Home logos array. Keep the original JPG/PNG files so nothing breaks if I miss a reference, but remove imports.

Expected savings: ~1.7 MB across the site.

### 2. Add `width` / `height` attributes to all `<img>` tags
Reduces layout shift (CLS) and improves perceived performance. Apply to `CinematicHero`, `LogoMarquee`, `GeometricHero`, and team/deal images.

### 3. Split the JS bundle (vite.config.ts)
Add `build.rollupOptions.output.manualChunks`:
- `react-vendor` → react, react-dom, react-router-dom
- `motion` → framer-motion
- `ui` → lucide-react, embla-carousel, radix-ui packages

This lets the browser cache vendor chunks separately and parallel-download them. Expected ~40 KB faster initial parse on first visit, and near-instant subsequent navigations.

### 4. Defer the `OpportunityCinematic` video poster image
It currently loads the Pexels JPEG poster eagerly. Add `loading="lazy"` semantics by only mounting the `<video>` once `isVideoInView` is true (instead of always-mounted with `preload="none"`). Saves ~200 KB on initial load of `/india` and `/us` home pages.

### 5. Lazy-load the Landing page hero image on mobile only when needed
The `GeometricHero` already serves mobile WebP — verify the preload in `index.html` matches mobile/desktop correctly using `<link rel="preload" media="...">`.

### 6. Small formatting / cleanup fixes
- Remove duplicate `transform: translateZ(0)` where `willChange` is already set
- Replace `// @ts-ignore` on `fetchpriority` with proper React 18 lowercase prop
- Fix one stray double-space in `Home.tsx` line 147 indentation

### Out of scope (per saved constraint)
- Won't switch to SSR / remove framer-motion / restructure CSS — those break the design
- Won't touch hosting cache headers (platform-level)

### Expected outcome
- LCP image: 337 KB → ~60 KB on mobile (already done) and ~140 KB on desktop hero pages
- Total page weight on `/india` or `/us` home: ~2.8 MB → ~1.1 MB
- JS parse time: ~310 ms savings from chunk-splitting + lazy chunks

