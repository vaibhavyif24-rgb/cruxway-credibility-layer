

## Plan: Fix Principles Cards — Illustrations, Alternating Dark BG, Transitions & Console Errors

### Issues Found

1. **Console ref warnings**: `React.memo` on `CelestialIllustration` wraps plain function components (`ActionIllustration`, `GoldenRuleIllustration`, etc.) — React dev mode warns about refs. Each illustration needs `forwardRef`.
2. **Current code already has**: alternating light backgrounds, illustrations in both modes, staggered transitions — these are working correctly in the current `PrinciplesSlider.tsx`.
3. **Dark mode alternating backgrounds already defined** (`darkBgEven`/`darkBgOdd`) — already functional.

### Changes

#### A. `CelestialIllustrations.tsx` — Fix ref warnings

Wrap all 6 illustration components (`IntegrityIllustration`, `LeadershipIllustration`, `HumilityIllustration`, `GritIllustration`, `ActionIllustration`, `GoldenRuleIllustration`) with `React.forwardRef` so `React.memo` on the parent doesn't trigger warnings. Each becomes:

```tsx
const IntegrityIllustration = forwardRef<SVGSVGElement>((_, ref) => (
  <svg ref={ref} viewBox="0 0 800 600" ...>
```

Also wrap `StarField` with `forwardRef` since it's rendered inside these SVGs and `React.memo` propagates the ref check.

#### B. `PrinciplesSlider.tsx` — Minor polish

- Increase light-mode illustration opacity from `0.25` to `0.35` for better visibility
- Increase light-mode effect opacity multiplier from `0.4` to `0.55` for more visible effects
- Slightly stronger light-mode vignette (reduce transparent center from 30% to 25%) so illustrations blend more naturally

#### C. No other changes needed

The alternating dark backgrounds, staggered transitions (0.08s→0.12s→0.18s→0.24s), and theme-aware text colors are already correctly implemented.

### Files

| File | Change |
|---|---|
| `CelestialIllustrations.tsx` | Wrap all 6 illustrations + `StarField` with `forwardRef` to fix console warnings |
| `PrinciplesSlider.tsx` | Bump light-mode illustration opacity to 0.35, effects multiplier to 0.55, tighten vignette |

