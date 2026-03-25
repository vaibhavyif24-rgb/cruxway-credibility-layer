

## Polish StickyCardStack: Professional Depth, Background Art, and True Stacking Feel

### Problems Identified
1. Cards have flat, plain HSL backgrounds — looks raw and unfinished
2. No decorative background elements (geometric lines, subtle patterns, gradients)
3. Scale/opacity shifting on underlying cards is too subtle (0.96 is barely perceptible)
4. Cards lack the premium depth cues: inner glow, gradient overlays, border treatments
5. No opacity dimming on cards as they get buried under the stack

### Changes — Single File: `src/components/StickyCardStack.tsx`

**1. Enhanced Scale + Opacity Shifting**
- Scale down from `1` to `0.92` (more noticeable depth) as each card scrolls past
- Add a scroll-driven `opacity` transform: cards fade from `1` to `0.6` as the next card overlaps, creating clear visual hierarchy
- Increase `top` offset spacing from `24px` to `28px` per card for better stacking visibility

**2. Rich Background Treatment**
- Replace flat HSL colors with layered gradient backgrounds:
  - Light variant: radial gradient from warm cream center to stone edges, plus a subtle diagonal mesh pattern
  - Dark variant: radial gradient from deep prussian center outward, with subtle blue tonal shifts
- Add a CSS `::before`-style overlay div with a subtle noise/grain texture (CSS-only radial dot pattern)

**3. Decorative Background Elements (per card)**
- **Corner geometric accents**: thin gold-tinted SVG lines in top-right and bottom-left corners (matching existing `DarkSectionEffects` geometric accent pattern)
- **Subtle grid dots**: a repeating radial-gradient dot pattern at very low opacity (`0.02-0.04`) to add texture without distraction
- **Gold shimmer line**: a thin horizontal accent line near the top of each card with a subtle CSS shimmer animation
- **Floating abstract shape**: a large, soft radial gradient circle positioned off-center at very low opacity as a depth element

**4. Card Border & Shadow Polish**
- Add a `border` with `1px solid` at very low opacity (`rgba` white for dark, gold for light) for glass-edge definition
- Intensify box-shadow progression: first card has minimal shadow, last card has dramatic `0 24px 64px` shadow
- Add inner `box-shadow` (inset) for subtle bevel effect

**5. Typography Enhancement**
- Make the oversized number on the right larger (`text-[clamp(5rem,12vw,10rem)]`) and slightly more visible (`0.06` opacity instead of `0.04`)
- Add a subtle text-shadow to the title for depth on dark variant

### Technical Details
- All decorative elements are `pointer-events-none` and `aria-hidden`
- Grain/dot textures use pure CSS `background-image: radial-gradient(...)` — no image assets needed
- Gold shimmer uses existing `@keyframes shimmer-line` from `index.css`
- Fully responsive — decorative elements scale down or hide on mobile
- No new dependencies

