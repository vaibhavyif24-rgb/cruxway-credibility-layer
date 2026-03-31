

## Remove the "Cruxway" Loading/Transition Screen

The dark navy screen with centered "Cruxway" text appears in two places: the `PageLoader` Suspense fallback in `App.tsx` and the static HTML fallback in `index.html`. Both show an intermediate screen before the actual Landing page loads.

### Changes

**1. `src/App.tsx` — Replace `PageLoader` with a minimal invisible fallback (lines 20-26)**

Replace the full-screen "Cruxway" loader with an empty container that matches the background color, so there's no visible flash — the page simply fades in when ready:

```tsx
const PageLoader = () => (
  <div className="min-h-[100dvh] bg-background" />
);
```

**2. `index.html` — Remove the static "Cruxway" splash (lines 40-44)**

Replace the large centered "Cruxway" heading with an empty div that just holds the background color:

```html
<div id="root">
  <div style="min-height:100dvh;background:#0d1926"></div>
</div>
```

### Result
- No more intermediate "Cruxway" text screen between page loads
- Users see either the Landing page (region selector) or the region-specific Home page — the only two entry points
- Background color still matches to prevent white flash

