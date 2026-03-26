

## Plan: Fix Sectors Visibility on Mobile

### Problem
In `CinematicScrollReveal.tsx` and `USCinematicScrollReveal.tsx`, the "Sectors We Look At" content is positioned absolutely inside a `sticky top-0 h-screen overflow-hidden` container. On mobile, the two columns stack vertically (`grid-cols-1`), creating content taller than the viewport. The overflow is clipped, so the second column ("Business & Industrial Services") is never visible.

### Fix: Separate Mobile Sectors Section

On mobile, stop rendering sectors inside the sticky cinematic container. Instead, render them as a standalone full-width section immediately below the cinematic reveal. This guarantees all content is visible and scrollable.

**Changes to both `CinematicScrollReveal.tsx` and `USCinematicScrollReveal.tsx`:**

1. **Hide sector overlay on mobile**: Wrap the absolute-positioned sector `<div>` with a condition `{!isMobile && (...)}` so it only renders inside the sticky container on desktop
2. **Reduce mobile container height**: Change from `350vh` to `250vh` on mobile since we no longer need extra scroll distance for sectors
3. **Add a mobile-only static section after the sticky container**: Render a new `<div>` (only when `isMobile`) below the `</section>` close tag — or better, inside a wrapper — that contains:
   - Dark navy background (`#0B131E` in dark mode)
   - "Sectors We Look At" gold label + divider
   - Both sector columns stacked with proper spacing
   - Full padding and no overflow constraints
   - Same text styling (gold headings, white names, muted descriptions)
4. **Extract `SectorColumn` as shared component** — it's already defined identically in both files; keep it inline but ensure mobile styles have generous padding and spacing

### Files Modified
- `src/components/CinematicScrollReveal.tsx`
- `src/components/USCinematicScrollReveal.tsx`

