

## Plan: Region Switcher Labels + Performance Optimization

### Part 1: Region Switcher — Add "Switch to" Label

Update region switcher text across **two files** to read "Switch to India 🇮🇳" or "Switch to US 🇺🇸" instead of just showing a flag and country name.

**`src/components/SiteFooter.tsx`** (line 112-123):
- Change the region link text from `{otherRegion === 'india' ? 'India' : 'US'}` to `Switch to {otherRegion === 'india' ? 'India' : 'United States'}`
- Keep the flag icon inline before the text

**`src/components/SiteHeader.tsx`**:
- **Desktop dropdown** (lines 189-208): Already shows "India" / "United States" — prefix with "Switch to" for the non-active region item
- **Mobile menu** (line 331): Already says "Switch to India/United States" — no change needed

### Part 2: Performance — Eliminate Loading Jank

The current architecture causes unnecessary loading screens and sluggish transitions because:
1. `AnimatePresence mode="wait"` with `key={location.pathname}` unmounts + remounts on every navigation, re-triggering Suspense fallback
2. Every page is lazy-loaded, so navigating between pages shows the full "Cruxway" loader each time
3. The `scale: 0.995` animation on every route change adds perceived lag

**`src/App.tsx`** changes:
- **Remove `AnimatePresence` wrapper around routes** — it forces unmount/remount causing Suspense to re-trigger the loader on every navigation
- **Remove `motion.div` with scale/opacity animation** wrapping routes — the 250ms fade + scale on every click adds perceived sluggishness
- **Keep `Suspense` with a minimal fallback** — use a simple themed empty div (matching page background) instead of the cinematic loader with shimmer/particles. The cinematic loader should only show on initial app load, not between pages
- **Prefetch adjacent routes**: Add `import()` calls on hover/mousedown for nav links so chunks load before click

**Simplified AppRoutes structure:**
```tsx
const AppRoutes = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div className="min-h-[100dvh]" style={{ background: isDark ? '...' : '...' }}>
      <Suspense fallback={<MinimalLoader />}>
        <Routes>
          {/* same routes */}
        </Routes>
      </Suspense>
    </div>
  );
};
```

Where `MinimalLoader` is just a themed empty div (no animations, no shimmer) that matches the page background so the transition feels instant.

### Files Modified
1. `src/components/SiteFooter.tsx` — "Switch to" label on region link
2. `src/components/SiteHeader.tsx` — "Switch to" label in desktop dropdown  
3. `src/App.tsx` — Remove AnimatePresence/motion wrapper, simplify Suspense fallback

