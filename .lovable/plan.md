

## Plan: Theme-Aware Origin Story — Distinct Light Mode Treatment

### Problem
Currently, the Origin Story section looks nearly identical in both themes. The `solidBg` is dark navy in both modes (`hsl(228, 40%, 10%)`), overlays are heavy dark gradients in both, and text is always white. Light mode needs a fundamentally different visual character.

### Approach
Make light mode feel warm, bright, and editorial — like a luxury print magazine — while dark mode stays cinematic and deep.

---

### Changes to `CruxwayOriginStory.tsx`

**1. Solid background (between image transitions)**
- Dark: `hsl(228, 55%, 8%)` (current deep navy)
- Light: `hsl(40, 25%, 94%)` (warm cream) — immediately visible difference

**2. Image overlays — lighter in light mode**
- Dark mode: keep current deep navy overlays (0.25–0.88 opacity)
- Light mode: use warm cream/amber overlays at lower opacity so images show through brighter:
  - Crucible: `hsl(35 30% 92% / 0.30)` → `hsl(35 25% 88% / 0.50)` (warm wash)
  - Way: `hsl(40 25% 90% / 0.35)` → `hsl(40 20% 85% / 0.55)` (soft golden haze)
  - CRU×WAY: `hsl(35 20% 90% / 0.55)` → `hsl(35 18% 85% / 0.70)` (heavier for text contrast)

**3. Text colors — dark text in light mode**
- Light mode: `videoBodyColor` = `hsl(228 45% 15%)` (dark navy), `videoMutedColor` = `hsl(228 30% 35%)`
- Light mode text shadows switch to light halos: `0 1px 8px rgba(255,255,255,0.6)` for readability against bright images
- Gold headings stay gold in both modes (already high contrast)
- The `×` symbol: dark navy in light mode instead of white

**4. Scrim backdrop (Act 2)**
- Light mode: use a soft white radial blur behind text instead of dark scrim

**5. Effect components** — already theme-aware from prior work, no changes needed

**6. Bridge section in `GuidingPrinciples.tsx`**
- Light mode gradient transitions from hero cream to warm cream (matching new `solidBg`) instead of dark navy

### Files Modified
- `src/components/CruxwayOriginStory.tsx` — overlay colors, solidBg, text colors, scrim
- `src/pages/GuidingPrinciples.tsx` — bridge gradient for light mode

### Result
Light mode: bright, warm images with dark legible text. Dark mode: unchanged cinematic feel. Clear visual distinction when toggling themes.

