

## Plan: Fix Team Hero Collision, Origin Story Font Size, Focus Page Cleanup

### 1. Fix Team Hero Text Collision — `src/pages/Team.tsx`

**Problem**: The subtitle paragraph overlaps with the stats bar because the hero uses `flex items-end` with the content div having only `pb-10`, while the stats bar is `absolute bottom-0` with its own height (~80px on mobile). The subtitle text bleeds into the stats numbers.

**Fix**:
- Increase bottom padding on the hero content div: `pb-10` → `pb-28 md:pb-24` to clear the stats bar
- On mobile, the stats bar takes ~100px, so `pb-28` (112px) provides clearance
- Constrain the subtitle `max-w-[420px]` to `max-w-[360px]` on mobile to prevent wide text from creating more collision risk

### 2. Increase Origin Story Font Sizes — `src/components/CruxwayOriginStory.tsx`

**Problem**: Body text in the origin story is 13-15px, making it hard to read. Font should use the site's sans font consistently.

**Fix**:
- Act 1 & 2 definition text: `14px/15px` → `15px/16px`
- Act 1 & 2 phonetic text: `12px/14px` → `13px/15px`
- Act 3 explanation text: `13px/14px` → `14px/15px`
- Act 3 tagline: `10px/12px` → `11px/13px`
- Act 4 body text: `14px/15px` → `15px/16px`
- Act 4 closing text: `10px/12px` → `11px/13px`
- Ensure all body text uses `font-sans` class (already present) — no changes needed for font family consistency

### 3. Remove Anchor Navigation Bar in Focus Page — `src/pages/OurFocus.tsx`

**Problem**: The sticky anchor nav bar (Investment Profile / Sectors / Investment Criteria buttons) adds clutter and blank space.

**Fix**:
- Remove the entire anchor navigation `<div>` block (lines 131-152)
- Tighten section padding: reduce `py-10 md:py-14` to `py-8 md:py-10` on Investment Profile section
- Remove any excess top margin that creates blank space between sections

### 4. Ensure Section Labels Are Correct

**Verification**: Navigation already shows "Our Identity" (not "Principles") in `SiteHeader.tsx`. The GuidingPrinciples page hero says "Our Identity". No stale "Principles" references found in active navigation. No changes needed.

### Files Modified
- `src/pages/Team.tsx` — fix hero bottom padding to prevent stats collision
- `src/components/CruxwayOriginStory.tsx` — increase all body/phonetic/tagline font sizes
- `src/pages/OurFocus.tsx` — remove anchor nav bar, tighten spacing

