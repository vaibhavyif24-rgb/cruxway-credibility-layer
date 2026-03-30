

## Cruxway v16: Finalization Pass — Team Cards, Mobile Performance, Premium Polish

7 files modified, focused on sticky card animations, mobile performance, and micro-interactions.

---

### Section 1: Team Sticky Card Transitions
**File: `src/components/TeamStickyDeck.tsx`**

**A. Entrance animation**: Wrap the card container `div` (line 103) in a `motion.div` with `initial={{ opacity: 0, y: 30, scale: 0.97 }}`, `whileInView={{ opacity: 1, y: 0, scale: 1 }}`, `viewport={{ once: true, margin: '-80px' }}`. Move sticky positioning and styles onto this `motion.div`. Remove `will-change-transform` from className.

**B. Photo grayscale→color**: Replace the `<img>` (line 127) with `<motion.img>` using `initial={{ filter: 'grayscale(100%)' }}`, `whileInView={{ filter: 'grayscale(0%)' }}`, `viewport={{ once: true }}`, `transition={{ duration: 1, delay: 0.3 }}`. Remove `grayscale` from className.

**C. Mobile sticky offset**: Import `useIsMobile`, compute `stickyStep = isMobile ? 10 : 16` and `stickyBase = isMobile ? 60 : 72` in `TeamStickyDeck`. Pass to `TeamCard` as props instead of constants.

**D. Faster logo marquee**: Change `duration: 28` → `duration: 16` in `InlineMarquee` (line 64).

**E. Gold accent line**: Add `motion.div` at top of card (before flex container, line 114) with `initial={{ scaleX: 0 }}`, `whileInView={{ scaleX: 1 }}`, gold gradient, `origin-left`.

**F. Hover lift**: Add `whileHover={{ y: -4, scale: 1.01 }}` with deeper shadow transition to the card `motion.div`.

**G. Name shimmer**: Add `text-shimmer-gold` class to the `<h3>` member name (line 164).

**H. Stacking blend**: Add a soft top-fade gradient overlay `div` for `index > 0` cards (height 12px, gradient from card bg to transparent).

---

### Section 2: Mobile Performance — FadeIn
**File: `src/components/ui/Section.tsx`**

- Import `useIsMobile`
- FadeIn changes: mobile → no blur filter (`'none'`), duration `0.4s`, delays halved, viewport margin `-30px`, y distance `10px`, add `scale: 0.98` to initial for all (2% scale-up on entry)

---

### Section 3: Mobile Performance — LightSectionEffects
**File: `src/components/LightSectionEffects.tsx`**

- Import `useIsMobile`
- Mobile: `particleCount = 2`, wrap all 3 gradient blobs in `{!isMobile && (...)}`
- Keep shimmer lines and 2 particles on mobile

---

### Section 4: Mobile Performance — PrinciplesGrid
**File: `src/components/PrinciplesGrid.tsx`**

- Mobile `PrincipleItem`: replace scroll-linked transforms with simple `whileInView` opacity animation (no `useScroll` tracking per item on mobile)
- Keep the same visual layout, just use `motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}` instead of scroll-linked `glowOpacity`

---

### Section 5: Mobile Performance — StickyCardStack
**File: `src/components/StickyCardStack.tsx`**

- Import `useIsMobile`, compute `dur = isMobile ? '0.3s' : '0.5s'` and `durSlow = isMobile ? '0.5s' : '0.8s'`
- Replace hardcoded `0.5s` and `0.8s` transition durations in `SlideCard` with these variables

---

### Section 6: Premium Animations
**A. Scroll indicator arrow** — `src/pages/Home.tsx`: Add a bouncing ChevronDown at bottom of hero section with `animate={{ y: [0, 6, 0] }}` infinite

**B. Logo parallax offset** — `src/components/LogoMarquee.tsx`: Add subtle `translateY` per logo: `transform: translateY(${Math.sin(i * 0.6) * 3}px)` for organic wave depth

**C. Footer link stagger** — `src/components/SiteFooter.tsx`: Wrap each link in `motion` with `initial={{ opacity: 0, y: 6 }}`, `whileInView={{ opacity: 1, y: 0 }}`, staggered delay `i * 0.04`

**D. Animated investment dividers** — `src/pages/OurFocus.tsx` and `src/pages/InvestmentCriteria.tsx`: Replace static `h-px` gold divider between number/text cards with `motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}`

---

### Section 7: Error Cleanup Verification

Already confirmed:
- ✅ No `contentVisibility` in codebase
- ✅ ScrollRevealText has no gold border artifacts
- ✅ `btn-premium-glow` on all CTA buttons (7 files)
- ✅ SectionLabel auto-detects dark mode via `useTheme()`
- ✅ Team.tsx "Our Network" heading uses `isDark` ternary
- ✅ Contact.tsx maps URL is correct
- ✅ GlassCard has `transformPerspective: 1200` and tilt hover

No changes needed for Section 7.

---

### Files Modified

| File | Changes |
|---|---|
| `src/components/TeamStickyDeck.tsx` | Entrance anim, grayscale→color, mobile offset, faster marquee, gold accent, hover lift, name shimmer, stacking blend |
| `src/components/ui/Section.tsx` | FadeIn mobile optimizations + 2% scale entry |
| `src/components/LightSectionEffects.tsx` | Disable blobs on mobile, reduce particles |
| `src/components/PrinciplesGrid.tsx` | Mobile fallback to simple whileInView |
| `src/components/StickyCardStack.tsx` | Faster mobile slide transitions |
| `src/components/LogoMarquee.tsx` | Subtle vertical wave offset per logo |
| `src/components/SiteFooter.tsx` | Staggered link entrance |
| `src/pages/Home.tsx` | Bouncing scroll indicator arrow |
| `src/pages/OurFocus.tsx` | Animated investment divider |
| `src/pages/InvestmentCriteria.tsx` | Animated investment divider |

