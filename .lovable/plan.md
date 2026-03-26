

## Plan: High-Quality Cinematic Reveal + Professional Sector Layout

### Problems Identified

1. **Pixelated images**: The JPG images (`india-industrial-reveal.jpg`, `us-industrial-reveal.jpg`) are low quality and break down when scaled via CSS `transform: scale()` inside a 180px circle
2. **Heading/sector overlap**: The "Sectors We Look At" label and sector grid appear too close to (and overlap with) the tagline — especially on desktop where "market." text and "SECTORS WE LOOK AT" collide
3. **Small fonts**: Sector item names (0.95rem–1.1rem) and descriptions (12–13px) are too small for a "most important" section
4. **Mobile layout broken**: Single-column sectors don't use full screen space, poor spacing, content gets mushed together during scroll

### Solution

**1. Replace pixelated JPGs with high-quality Unsplash images loaded via URL**

Instead of bundled low-res JPGs, use direct Unsplash URLs at full resolution (2400px+). This eliminates pixelation because the browser fetches the image at its native high resolution rather than upscaling a compressed bundle asset.

- India: A sharp, high-res industrial/manufacturing image (e.g. modern Indian factory, infrastructure, or cityscape)
- US: A sharp, high-res American industrial image (e.g. steel mill, logistics hub, or industrial facility)

Both images loaded with `loading="eager"` and `fetchPriority="high"`.

**2. Fix heading/sector gap and overlap**

- Move the tagline higher during phase 2: change `taglineTop` from `26 - (sectorProgress * 14)` to `26 - (sectorProgress * 18)` so it clears more room
- Increase the sector overlay top offset from `taglineTop + 12` to `taglineTop + 16` on mobile, `taglineTop + 14` on desktop — creating a clear visual gap
- Add a `mb-6 md:mb-10` spacer between the "Sectors We Look At" label and the sector grid

**3. Increase font sizes significantly**

| Element | Current | New |
|---|---|---|
| "Sectors We Look At" label | 10px / 11px | 12px / 13px |
| Category heading (Industrials, etc.) | 1.1rem / 1.25rem | 1.3rem / 1.6rem |
| Sector item name | 0.95rem / 1.1rem | 1.15rem / 1.4rem |
| Sector item description | 12px / 13px | 14px / 16px |
| Diamond bullet | 7px | 8px / 9px |

**4. Full-width mobile layout**

- Remove `maxWidth: '900px'` constraint on mobile — let sectors use full screen width (`px-6` padding only)
- On mobile, increase spacing between items from `space-y-3` to `space-y-5`
- Category headings get `mb-4` instead of `mb-3`
- Ensure the sector content starts lower on mobile so it doesn't overlap the tagline (use a percentage offset that accounts for smaller viewport heights)

### Files Modified

1. **`src/components/CinematicScrollReveal.tsx`** — Replace bundled JPG import with high-res Unsplash URL, fix tagline/sector gap math, increase all font sizes, improve mobile spacing
2. **`src/components/USCinematicScrollReveal.tsx`** — Same changes with US-specific image

### Technical Details

- Unsplash URLs use `?w=2400&q=90&auto=format` parameters for optimal quality/format
- The `imageRendering: '-webkit-optimize-contrast'` CSS property is kept for sharp rendering
- Both components get identical layout/spacing changes (only image URL and tagline text differ)
- The sector overlay `maxWidth` becomes responsive: `max-w-none md:max-w-[1000px]` to use full width on mobile
- Phase 2 scroll math adjusted so sectors have more room to appear without colliding with the tagline

