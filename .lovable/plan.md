## Plan: Five Issues — Text Positioning, Country Flag Switcher, Mobile Dark Mode, Principles Mobile, Theme Consistency

### 1. India CinematicScrollReveal — Text Overlap Fix

**Problem**: The tagline "Building enduring platforms across India's lower middle market" overlaps with "Sectors We Look At" because the India tagline is longer than the US version, causing collision at the same `taglineTop` + `overlayOffset` positioning.

**Fix in `CinematicScrollReveal.tsx**`:

- Change initial `taglineTop` from `26` to `22` (move text higher)
- Increase `overlayOffset` from `18` to `22` to give more vertical space between tagline and sectors
- This matches the visual balance of the US sheet

### 2. Country Flag Indicator in Desktop Header

**Add to `SiteHeader.tsx**`:

- Place a premium country flag indicator between the nav items and the theme toggle (after the vertical divider, before the Moon/Sun icon)
- Use inline SVG flag icons (India: saffron-white-green tricolor, US: stars-and-stripes simplified) — tiny, 16x12px, with rounded corners and subtle border
- On click, show a minimal dropdown (using `AnimatePresence` from framer-motion) with both country options showing flag + label
- Clicking a country navigates to `/${otherRegion}` and calls `setRegion`
- Styling: `text-primary-foreground/40` opacity, gold hover accent, consistent with existing nav aesthetics
- On mobile menu: replace the current "Switch to India/United States" text link with flag + label row

### 3. Mobile Homepage — Dark Mode Whitespace Fix

**Problem**: Right-side whitespace gap on mobile homepages in dark mode.

**Fix in `Home.tsx**`:

- Add `overflow-x: clip` to the root `<div>` wrapper (same pattern as `OurFocus.tsx` and `GuidingPrinciples.tsx` which already have it)
- This prevents `DarkSectionEffects` floating orbs and `StickyCardStack` from causing horizontal overflow

### 4. Our Principles — Mobile Layout Fix

**Problem**: On mobile (390px), the sticky card stack `PrinciplesSlider` creates layout breaks because cards use `position: sticky` with fixed heights, which doesn't work well on small screens.

**Fix in `PrinciplesSlider.tsx**`:

- On mobile (`< 768px`), switch from sticky-card-stack to a simpler vertical scroll layout:
  - Remove `position: sticky` and reduce card height from `min(75vh, 520px)` to `auto` with `min-height: 60vh`
  - Cards stack normally with margin between them
  - Content is always visible (no IntersectionObserver gating on mobile)
  - This mirrors the "pitch deck" feel but without the sticky positioning that breaks on small screens
- Keep all animations, illustrations, and alternating backgrounds
- Desktop remains unchanged (sticky card stack)

### 5. Theme Consistency — Light Mode Dark Elements Fix

**Problem**: Several sections use hardcoded dark colors even in light mode (e.g., `hero-gradient-animated` class on header always renders dark navy).

**Fixes**:

- `DarkSectionEffects.tsx`: Add theme awareness — in light mode, reduce orb/particle opacity to near-zero or use light-appropriate colors. Currently the floating navy orbs (`hsl(207 50% 18% / 0.3)`) and shimmer effects render against light backgrounds inappropriately
- `ScrollRevealText.tsx`: The `variant="dark"` sections use `bg-primary` which maps to dark navy in light mode. This is intentional (dark band). But add a subtle gradient transition border at top/bottom edges for smoother visual flow in light mode
- `index.css`: The `hero-gradient-animated` utility uses `--prussian` and `--navy-deep` which are always dark navy. Since the header and CTA sections intentionally stay dark in both modes, this is correct. No change needed here.

### Files Modified


| File                        | Changes                                                                           |
| --------------------------- | --------------------------------------------------------------------------------- |
| `CinematicScrollReveal.tsx` | Adjust `taglineTop` from 26→22, `overlayOffset` from 18→22                        |
| `SiteHeader.tsx`            | Add country flag indicator with dropdown switcher (desktop + mobile)              |
| `Home.tsx`                  | Add `overflow-x: clip` to root div                                                |
| `PrinciplesSlider.tsx`      | Mobile-specific layout: disable sticky, auto-height cards, always-visible content |
| `DarkSectionEffects.tsx`    | Theme-aware opacity reduction for light mode backgrounds                          |
