

## Plan: Precision Polish Pass — ScrollRevealText Box Fix + Carousel Tightening + Light Mode Effects + Micro-Animations

8 files modified, no files created or deleted.

---

### Section 1: Remove Box Artifacts from ScrollRevealText

**File: `src/components/ScrollRevealText.tsx`**

- **Delete lines 63-81**: Remove gold gradient bands (top/bottom h-px lines) AND the gold wipe at top-1/2. These create the visible "box frame" and mid-text line.
- **Delete line 57**: Remove `style={{ contentVisibility: 'auto' }}` from the section element.
- **Change line 54**: `bg-[hsl(38,18%,93%)]` → `bg-background` for `isContrastLight`. This eliminates the hard-edged contrast block; differentiation comes from LightSectionEffects ambient blobs.
- **Add gradient fades** (lines ~59-62 area, after effects): For `!isActuallyDark` variants, add top/bottom `h-12 md:h-16` gradient fades (`bg-gradient-to-b from-background to-transparent` and inverse) to smooth section transitions.
- **Stat value hover**: In `StatReveal`, change the `<p>` for value to `<motion.p>` with `whileHover={{ scale: 1.05, textShadow: '0 0 20px hsl(38,48%,52%,0.3)' }}`.

---

### Section 2: Logo Carousel — Tighter Gaps + Compact Padding

**File: `src/components/LogoMarquee.tsx`**

- **Line 70**: Change gap from `gap-12 md:gap-16 lg:gap-24` → `gap-6 md:gap-10 lg:gap-14`
- **Lines 37-40**: Reduce bgClass padding:
  - Dark: `py-6 md:py-10 lg:py-14` → `py-4 md:py-6 lg:py-8`
  - Contrast light: same reduction
  - Default: `py-5 md:py-8 lg:py-10` → `py-3 md:py-5 lg:py-6`

---

### Section 3: LightSectionEffects — Aurora Ribbon + Ripple Rings + Stronger Wash

**File: `src/components/LightSectionEffects.tsx`**

- **Add aurora ribbon**: After existing golden wash (after line 82), add a large blurred `motion.div` with multi-color gold/blue gradient, `filter: blur(60px)`, animating x from -15% to 15% over 25s with slight rotation.
- **Add ripple rings**: For `variant === 'hero'` only, add concentric circle borders (3 nested `div`s with `border-gold/[0.06]`) that scale/pulse 1→1.3 over 8s. Positioned top-right.
- **Increase golden wash amplitude**: Change x animation from `['-20%', '20%', '-20%']` → `['-30%', '30%', '-30%']`, duration from 30 → 22.

---

### Section 4: Scroll Progress Bar Gradient

**File: `src/components/SiteHeader.tsx`**

- **Line 96**: Change `className="... bg-gold/40 ..."` + remove `bg-gold/40`, add `style={{ scaleX: scrollYProgress, background: 'linear-gradient(90deg, hsl(38,48%,52%,0.2), hsl(38,48%,52%,0.5), hsl(38,48%,52%,0.2))' }}`

---

### Section 5: Footer Entrance Animation

**File: `src/components/SiteFooter.tsx`**

- Wrap `<div className="max-w-[1080px]...">` content in a `<motion.div>` with `initial={{ opacity: 0 }}`, `whileInView={{ opacity: 1 }}`, `viewport={{ once: true, margin: '-50px' }}`, `transition={{ duration: 0.8 }}`.

---

### Section 6: Investment Profile Gold Glow Pulse

**Files: `src/pages/OurFocus.tsx` + `src/pages/InvestmentCriteria.tsx`**

- In `TypographicNumber`, change the value `<p>` to `<motion.p>` with `initial={{ textShadow: 'none' }}`, `whileInView={{ textShadow: ['none', '0 0 30px hsl(38,48%,52%,0.25)', 'none'] }}`, `viewport={{ once: true }}`, `transition={{ duration: 2, delay: 0.5 }}`.

---

### Section 7: CSS Enhancements

**File: `src/index.css`**

- Add `.btn-premium::before` radial ripple effect (width 0→300% on hover, `radial-gradient(circle, hsl(38 48% 52% / 0.08), transparent 70%)`).
- Ensure existing `::after` shimmer sweep is present.

---

### Section 8: contentVisibility Global Removal

Already only in `ScrollRevealText.tsx` (confirmed via search). Handled in Section 1.

---

### Technical Summary

| File | Changes |
|---|---|
| `ScrollRevealText.tsx` | Remove gold bands, gold wipe, contentVisibility; soften contrast bg; add gradient fades; stat hover |
| `LogoMarquee.tsx` | Tighter gaps, compact padding |
| `LightSectionEffects.tsx` | Aurora ribbon, ripple rings, stronger wash |
| `SiteHeader.tsx` | Gradient scroll progress bar |
| `SiteFooter.tsx` | Entrance animation wrapper |
| `OurFocus.tsx` | TypographicNumber gold glow pulse |
| `InvestmentCriteria.tsx` | TypographicNumber gold glow pulse |
| `index.css` | btn-premium radial ripple |

