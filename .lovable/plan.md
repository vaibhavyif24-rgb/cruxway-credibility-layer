

## Plan: Fix PageLoader Visibility and Hooks Error

### 1. Fix Hooks Error in CruxwayOriginStory.tsx

The runtime error persists at line 1266 (source-mapped). The `act2Line4Y` and `act2Line4Op` hooks are always called at the top level, but the conditional `{isIndia && (...)}` JSX block at line 407 is fine since it doesn't call hooks. However, the error trace points to `useTransform` being called conditionally somewhere. Need to verify the actual compiled output -- the line numbers suggest there may be additional `useTransform` calls further in the file that were added in a later edit but not visible in the current 538-line file. The fix is to ensure no `useTransform` calls exist inside JSX or conditional blocks.

**Action:** Re-read the full file to confirm hook count is stable, and if needed, ensure all `useTransform` calls are above the `return` statement.

### 2. Fix Light Mode Loader Visibility (App.tsx)

**Problem (visible in screenshots):** The wordmark uses `hsl(43 78% 50% / 0.20)` -- gold at 20% opacity on a cream `hsl(40, 25%, 96%)` background. Gold on near-white at 20% opacity is almost invisible. The ring, arc, and particles also use very low opacities that vanish on light backgrounds.

**Fix:** Make the loader theme-aware for visibility while keeping effects identical in structure:
- **Wordmark fill:** Light mode: `hsl(228 45% 25% / 0.18)` (navy tint, visible on cream). Dark mode: `hsl(43 78% 50% / 0.25)` (gold tint, visible on dark navy).
- **Shimmer sweep:** Light: `hsl(43 78% 45% / 0.6)` (richer gold). Dark: `hsl(43 78% 50% / 0.4)` (current).
- **Pulsing ring border:** Light: `hsl(43 78% 45% / 0.15)`. Dark: `hsl(43 78% 50% / 0.10)`.
- **Rotating arc stroke:** Light: `hsl(43 78% 45% / 0.20)`. Dark: `hsl(43 78% 50% / 0.12)`.
- **Vertical particles:** Light: opacity `0.4`, color `hsl(43 78% 45%)`. Dark: opacity `0.25`.
- **Horizontal particles:** Light: opacity `0.3`. Dark: opacity `0.18`.
- **Radial glow:** Light: `hsl(43 78% 50% / 0.10)`. Dark: `hsl(43 78% 50% / 0.06)`.

The animation keyframes, durations, and structure remain identical. Only color values and opacities adapt to ensure visibility on both canvases.

### Technical Summary

| File | Changes |
|------|---------|
| `App.tsx` | Theme-aware opacity/color values for loader wordmark, ring, arc, particles, and glow |
| `CruxwayOriginStory.tsx` | Verify and fix any remaining conditional hook calls causing the runtime error |

