

## Landing Page Refinements

### Changes

**1. Larger, better-aligned region boxes** (`src/pages/Landing.tsx`)
- Increase button dimensions: `w-[165px] sm:w-[240px] md:w-[300px]` and `h-[64px] sm:h-[76px] md:h-[84px]`
- Use consistent `gap-4 sm:gap-8` for balanced spacing
- Center the button container with `justify-center`

**2. "Select Region" label — more visible and professional** (`src/pages/Landing.tsx`)
- Increase size: `text-[12px] md:text-[13px]`
- Change from `font-medium` to `font-semibold`
- Boost opacity: `text-white/45` (from `text-white/30`)
- Slightly increase letter-spacing to `tracking-[0.35em]`

**3. Faster Ken Burns movement on mobile** (`src/components/GeometricHero.tsx`)
- Reduce mobile animation durations: scale from 26s → 16s, x-drift from 34s → 20s
- Keep desktop durations unchanged
- Increase mobile x-drift slightly: `[0, 10, -8, 5, 0]` and scale to `1.16`

### Files Modified
- `src/pages/Landing.tsx` — button sizing, label styling
- `src/components/GeometricHero.tsx` — mobile animation speed

### Constraints Preserved
- All background effects, corner accents, gold animations untouched
- Horizontal layout (`flex-row`) maintained
- No changes to selection logic or navigation behavior

