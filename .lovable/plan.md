

## Plan: Fix Principles Page — Transitions, Theme Awareness, Border Gaps, and Right Space

### Issues Identified

1. **Border gap at card start** (user's screenshot): The rounded corners on principle cards expose the light page background behind them, creating a visible cream/white gap at corners. Fix: remove border-radius from cards OR add a matching background wrapper.

2. **Right space gap**: The `px-5 md:px-10 lg:px-16` padding on the slider wrapper creates asymmetric spacing on some viewports. The `contain: layout style paint` may also cause overflow clipping issues.

3. **Transition errors**: `StarField` component inside `CelestialIllustrations.tsx` triggers "Function components cannot be given refs" warnings because `React.memo` on the parent `CelestialIllustration` propagates ref attempts. Multiple other components also trigger this.

4. **No theme awareness**: Cards always render with dark navy gradient regardless of light/dark mode. Need light-mode variant.

---

### Changes

#### A. `PrinciplesSlider.tsx` — Fix borders, spacing, transitions

- Remove `rounded-2xl md:rounded-3xl` from cards (or reduce to `rounded-xl`) and ensure the outer sticky wrapper has `overflow: hidden` to prevent corner bleed
- Remove `contain: layout style paint` from outer wrapper (causes right-side clipping)
- Accept `isDark` prop from theme context to switch card backgrounds
- In light mode: use warm ivory/cream card backgrounds with dark text; in dark mode: keep existing deep navy
- Smooth transitions: increase IntersectionObserver threshold sensitivity, use CSS `transition` with longer easing for content elements
- Set first card `isActive` to `true` by default so content is immediately visible

#### B. `CelestialIllustrations.tsx` — Fix ref warnings

- The `React.memo` wrapper on `CelestialIllustration` doesn't need `forwardRef` since no ref is being used. The warning comes from `StarField` being a function component rendered inside SVG — React's dev mode sometimes flags these. Fix: convert `StarField` to use `React.memo` or wrap with `forwardRef` to suppress warnings.

#### C. `GuidingPrinciples.tsx` — Pass theme, fix spacing

- Import `useTheme` and pass `isDark` down to `PrinciplesSlider`
- Remove excess top padding on the "Principles" header section
- Ensure the page wrapper has `overflow-x: hidden` to prevent horizontal scroll from the right gap

#### D. `StickyCardStack.tsx` — Fix ThematicIllustration ref warning

- The previous plan said to wrap `ThematicIllustration` in `forwardRef` but it wasn't done. Apply it now.

---

### Technical Summary

| File | Change |
|---|---|
| `PrinciplesSlider.tsx` | Accept `isDark` prop; theme-aware backgrounds/text; remove `contain` from wrapper; fix border-radius gap; improve transition timing; default first card active |
| `CelestialIllustrations.tsx` | Wrap `StarField` in `React.memo` to suppress ref warning |
| `GuidingPrinciples.tsx` | Add `overflow-x: hidden` to root div; pass `isDark` to slider; tighten header spacing |
| `StickyCardStack.tsx` | Wrap `ThematicIllustration` in `React.forwardRef` |

