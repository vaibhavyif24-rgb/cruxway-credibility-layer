

## Plan: Professional Cinematic Reveal — Max Resolution, Readability, Mobile Fix

### Root Causes

1. **Pixelation**: The 180px circle scales up ~16x. At `w=2400`, the image is only 2400px wide — but the scaled container can reach 4000px+. Need to request the highest possible resolution.
2. **Text hard to read**: Overlay gradient isn't strong enough; text lacks sufficient contrast on busy industrial images.
3. **Mobile content overflow**: Sector items get cut off because the container height (280vh) doesn't give enough room and the overlay starts too high.
4. **"Sectors We Look At" label too small and cramped**: Needs bigger gap from heading and larger font.

### Changes

**Both `CinematicScrollReveal.tsx` and `USCinematicScrollReveal.tsx`:**

**A. Maximum resolution images**
- Change URL param from `w=2400` to `w=4000&q=90` — Unsplash serves up to 4000px wide
- Add `&dpr=2` for retina displays
- India: `https://images.unsplash.com/photo-1764115424737-25aca6f47835?w=4000&q=90&auto=format&fit=crop&dpr=2`
- US: `https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=4000&q=90&auto=format&fit=crop&dpr=2`

**B. Much stronger overlay for text readability**
- Replace current gradient with a heavier 4-stop gradient:
  `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.82) 100%)`
- This creates a dark scrim that makes white text pop against any image

**C. Desktop layout improvements**
- Increase "Sectors We Look At" label font to `14px` with `tracking-[0.28em]`
- Increase gap between label and grid: `mb-10` on desktop
- Increase sector grid `maxWidth` to `1100px` and use `gap-8` between columns
- Category headings: `1.8rem` on desktop
- Item names: `1.5rem` on desktop
- Descriptions: `17px` on desktop with `rgba(248,246,242,0.65)` (brighter)

**D. Mobile layout — use all space, fully readable**
- Increase mobile container height to `320vh` — plenty of scroll room
- Increase mobile overlay offset to `24%` — clear gap from heading
- "Sectors We Look At" label: `12px`
- Category headings: `1.15rem` on mobile
- Item names: `1rem` on mobile  
- Descriptions: `13px` on mobile with `rgba(248,246,242,0.6)`
- Use `space-y-3` between items, `gap-5` between columns
- Full width with `padding: 0 1.25rem`
- Add `mb-5` between label and grid on mobile
- Tagline font: `clamp(1.3rem, 5vw, 2rem)` — fits without breaking

**E. Text shadow enhancement**
- All sector text gets `textShadow: '0 2px 12px rgba(0,0,0,0.7)'` for crisp readability
- Heading gets `textShadow: '0 3px 20px rgba(0,0,0,0.8)'`

### Files Modified
1. `src/components/CinematicScrollReveal.tsx`
2. `src/components/USCinematicScrollReveal.tsx`

