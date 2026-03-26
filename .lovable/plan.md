

## Plan: Fix Cinematic Reveal — Local Images, Spacing, Mobile Layout

### Problems Found

1. **Images not loading**: Unsplash URLs (`images.unsplash.com`) are blocked/not loading in the sandbox — the section renders as flat grey. The project already has local high-res assets: `india-industrial-reveal.jpg` and `us-industrial-reveal.jpg`.
2. **Tagline/sector overlap**: "Sectors We Look At" label collides with "lower middle market." heading during scroll.
3. **Mobile text overflow**: Sector content overflows and is unreadable on small screens.
4. **Desktop blank space**: Too much empty scroll at the end of the 300vh section.

### Changes

**1. `CinematicScrollReveal.tsx` (India)**

- Replace Unsplash URL with local import: `import indiaRevealImg from '@/assets/india-industrial-reveal.jpg'`
- Increase `taglineTop` shift: `26 - (sectorProgress * 20)` (was `* 18`) — pushes heading higher to clear room
- Increase overlay offset: mobile `22%`, desktop `18%` (was `18%`/`15%`) — bigger gap between heading and sectors
- Reduce container height to `250vh` (from `300vh`) — less blank trailing space on desktop
- Mobile: reduce sector font sizes slightly to prevent overflow (`1rem` item names, `12px` descriptions), reduce spacing to `space-y-3`, reduce category heading size to `1.1rem`
- Mobile: reduce tagline font size clamp to `clamp(1.6rem, 4.5vw, 4rem)`
- Add `mb-4 md:mb-8` between "Sectors We Look At" label and the grid

**2. `USCinematicScrollReveal.tsx` (US)**

- Same local import swap: `import usRevealImg from '@/assets/us-industrial-reveal.jpg'`
- Same spacing, font, and height fixes as India component

### Files Modified

1. `src/components/CinematicScrollReveal.tsx`
2. `src/components/USCinematicScrollReveal.tsx`

