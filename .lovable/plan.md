

## Plan: High-Res Unsplash Images + Mobile Text Fix + Spacing

### What Changes

**1. Replace images with user-specified high-res Unsplash URLs (2400px)**

- India: `https://images.unsplash.com/photo-1764115424737-25aca6f47835?w=2400&q=90&auto=format&fit=crop` (industrial workshop)
- US: `https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=2400&q=90&auto=format&fit=crop` (orange factory machines)

Remove local JPG imports entirely. Use direct URLs in `<img src>`.

**2. Stronger overlay gradient for text readability**

Current gradient is too weak (`rgba(0,0,0,0.35)` to `rgba(0,0,0,0.55)`). Change to a heavier multi-stop gradient:
```
linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 100%)
```
This ensures all text — heading and sectors — is crisp against the image.

**3. Mobile: more scroll room + smaller text to fit**

- Increase container height on mobile to `280vh` (keep desktop at `250vh`) — gives more scroll distance so sectors have time to fully appear
- Reduce mobile tagline font: `clamp(1.4rem, 4vw, 2.4rem)`
- Reduce mobile sector item names to `0.9rem`, descriptions to `11px`
- Reduce mobile category heading to `1rem`
- Tighten mobile spacing: `space-y-2`, `gap-3` between columns
- Reduce mobile overlay offset to `20%` (from `22%`)

**4. Desktop: reduce trailing blank space**

Keep `250vh` on desktop (already reduced from `300vh`). No further change needed.

### Files Modified

1. `src/components/CinematicScrollReveal.tsx`
2. `src/components/USCinematicScrollReveal.tsx`

### Technical Details

- Both files get the same structural changes; only the image URL, alt text, and tagline text differ
- The `indiaRevealImg` / `usRevealImg` imports are removed; replaced with string URL constants
- Overlay gradient strengthened for professional text contrast on both images

