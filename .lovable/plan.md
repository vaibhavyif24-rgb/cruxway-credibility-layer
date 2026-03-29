

## Plan: Principles Deck Refinement, Country Switcher Mobile Revert, Spacing Fixes

### 1. PrinciplesDeck — Eliminate excess space, tighten layout, enhance motion

**Root cause of blank space**: The `outerHeight` formula `(cardHeight) + (total - 1) * scrollStepPx` creates ~2800px of scrollable space for 6 cards. The last card leaves a large empty gap below.

**Changes to `PrinciplesDeck.tsx`**:

- **Reduce outer height**: Change `SCROLL_PER_CARD` from `0.65` to `0.5` — tighter scroll steps, less total height
- **Remove bottom padding**: The outer container has implicit space from the tall height. After the last card, no extra scroll range should remain. Adjust formula: `outerHeight = stickyHeight + Math.max(total - 1, 0) * scrollStepPx` (remove the extra cardHeight that was double-counted with stickyHeight)
- **Card height**: Desktop stays `min(65vh, 480px)`. Mobile: increase from `min(55vh, 400px)` to `min(60vh, 420px)` for better content fit
- **Enhanced motion visibility**:
  - Increase `translateY` offset from `12px` to `20px` for entering cards (more noticeable slide-up)
  - Add a subtle `scale(0.97)` on inactive cards that scales to `scale(1)` when active
  - Increase floating animation amplitude from `±4px` to `±6px`
  - In light mode, boost the gold shimmer line opacity from `0.15 * fxOpacity` to `0.25 * fxOpacity`
  - Add a subtle `rotate(0.5deg)` micro-rotation on transition for dimensionality
- **Tighter vertical gaps in parent page**: Reduce the section header container `pt-6 md:pt-8` to `pt-4 md:pt-6` in `GuidingPrinciples.tsx`, and reduce gap between section heading and deck

### 2. CinematicScrollReveal — No changes needed (already handled in prior iteration)

### 3. SiteHeader — Mobile: text switcher, Desktop: keep flags

**Changes to `SiteHeader.tsx`**:

- **Mobile menu (lines 256-276)**: Replace the flag-based country switcher with a simple text link: `"Switch to {otherRegionLabel}"` styled as a subtle uppercase text button (matching the existing nav link style). Remove the flag icons from mobile entirely
- **Desktop (lines 128-171)**: Keep the flag dropdown exactly as-is — no changes

### 4. GuidingPrinciples.tsx — Tighten spacing around deck

- Reduce `pt-6 md:pt-8` on the principles header wrapper to `pt-4 md:pt-6`
- Add `mb-0` / remove any implicit margin below the `PrinciplesDeck` before the shimmer divider
- Reduce CTA section padding from `py-8 md:py-12 lg:py-14` to `py-6 md:py-10 lg:py-12`

### Files Modified

| File | Change |
|---|---|
| `PrinciplesDeck.tsx` | Reduce scroll multiplier, fix outer height, enhance motion (scale + translateY + rotation) |
| `SiteHeader.tsx` | Mobile: revert to text-based "Switch to..." region switcher |
| `GuidingPrinciples.tsx` | Tighten vertical spacing around deck and CTA |

