## Plan: Fix Navigation, Heading, and Add Illustration Animations

### 1. Fix Desktop Navigation — Single-Line Professional Layout

The screenshot shows nav items wrapping to two lines ("OUR PRINCIPLES" stacking). The issue is the `text-[11.5px]` uppercase labels are too wide with 6 items + divider + theme toggle + investor login.

**Fix in `SiteHeader.tsx`:**

- Reduce nav item font size to `text-[10px]` and tighten tracking to `[0.08em]`
- Reduce gaps from `gap-5 xl:gap-7` to `gap-3 xl:gap-5`
- Reduce padding on nav links from `px-2.5` to `px-1.5`
- Reduce divider margin from `mx-6` to `mx-4`
- This ensures all items fit on a single line at the `lg` breakpoint (1024px+)

### 2. Fix "How We Build Value" Heading Font

The screenshot shows the heading rendering in an italic/corrupted serif variant. The `font-semibold` (600 weight) may not have a matching serif font file, causing the browser to synthesize an ugly faux-bold italic.

**Fix in `OurPlaybook.tsx` (line 93):**

- Change from `font-serif font-semibold` to `font-serif font-normal` to match the weight used by all other section headings across the site (e.g., OurFocus, GuidingPrinciples hero headings all use default/normal weight)
- Keep the same `text-[clamp(1.5rem,2.8vw,2.2rem)]` size and `text-foreground` color

### 3. Add Animated Background Effects to Celestial Illustrations

Currently the `PrinciplesSlider` cards have static celestial SVG backgrounds. Add ambient motion effects to make them feel alive.

**Modify `PrinciplesSlider.tsx`:**

- Add a slow-rotating radial glow behind each card's illustration (CSS animation, 20s rotation)
- Add subtle floating particles (2-3 small gold dots with `float-orb-slow` animation from existing keyframes)
- Add a pulsing nebula glow effect (radial gradient that pulses opacity between 0.1 and 0.3 on a 6s cycle)
- Add a slow shimmer line sweep across the card (reuse existing `shimmer-line` keyframe)
- All effects are `absolute` positioned behind the text content (z-index layering preserved)

---

### Files to modify


| File                                  | Change                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/components/SiteHeader.tsx`       | Tighten desktop nav spacing to prevent wrapping                                                |
| `src/pages/OurPlaybook.tsx`           | It should be completely visible; Fix heading font weight from `font-semibold` to `font-normal` |
| `src/components/PrinciplesSlider.tsx` | Add animated background effects (rotating glow, particles, shimmer) to principle cards         |
