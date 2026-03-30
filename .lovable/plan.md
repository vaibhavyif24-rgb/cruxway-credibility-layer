

## Cruxway v14: Footer Fix, Wave Cleanup, Scroll-Linked Principles, Dark Mode Headings, Premium Polish

10 sections, ~14 files modified.

---

### Section 1: Footer — Remove Waves, Restore Theme-Aware Background

**File: `src/components/SiteFooter.tsx`** — Major rewrite

- Remove `WaveBackground` import and usage
- Add imports: `motion` from framer-motion, `LightSectionEffects`, `DarkSectionEffects`
- Change container from hardcoded `bg-[hsl(228,58%,18%)]` → `${isDark ? 'bg-primary' : 'bg-card'}`
- Add `{isDark ? <DarkSectionEffects variant="section" /> : <LightSectionEffects variant="section" />}`
- Add shimmer line at top: `div.absolute.top-0` with gold gradient `linear-gradient(90deg, transparent, hsl(38,48%,52%,0.12), transparent)`
- Add pulsing gold glow behind "Cruxway" wordmark via `radial-gradient` with `animate-pulse` on the glow div
- Restore ALL text/divider colors to `isDark` ternaries:
  - Logo: `isDark ? 'text-primary-foreground' : 'text-foreground'`
  - Links: `isDark ? 'text-primary-foreground/15 hover:text-primary-foreground/35' : 'text-muted-foreground/50 hover:text-foreground/60'`
  - Copyright: `isDark ? 'text-primary-foreground/10' : 'text-muted-foreground/35'`
  - Dividers: `isDark ? 'bg-primary-foreground/[0.04]' : 'bg-border/30'`
  - Confidential: `isDark ? 'text-primary-foreground/[0.06]' : 'text-muted-foreground/20'`
- Add animated gold underline on link hover using `relative` + `after:` pseudo or a span child

---

### Section 2: Remove WaveBackground from All Hero Sections

Delete `<WaveBackground variant="hero" />` from these hero sections:

| File | Line(s) to delete |
|---|---|
| `Home.tsx` | Line 103 |
| `Team.tsx` | Line 361 (hero) AND line 386 (stats bar) |
| `GuidingPrinciples.tsx` | Line 37 |
| `OurFocus.tsx` | Line 58 |
| `OurPlaybook.tsx` | Line 98 |
| `Contact.tsx` | Line 34 |
| `About.tsx` | Line 51 |
| `InvestmentCriteria.tsx` | Line 112 |

**KEEP** WaveBackground in CTA sections (Home L225, GuidingPrinciples L106, OurPlaybook L184, About L126, InvestmentCriteria L270) and in ScrollRevealText dark variant (L59).

Clean up unused `WaveBackground` imports from `Contact.tsx` (no remaining usage after hero removal).

---

### Section 3: Fix ScrollRevealText Artifacts

**File: `src/components/ScrollRevealText.tsx`**

- **A.** Delete `style={{ contentVisibility: 'auto' }}` from line 57
- **B.** Delete the gold border lines block (lines 64-69): the `isContrastLight && (<> <div top-0 h-px> <div bottom-0 h-px> </>)` block
- **C.** Delete the gold wipe line block (lines 72-81): the `isContrastLight && (<motion.div top-1/2 .../>)` block

---

### Section 4 (Execution order: after Section 10): Scroll-Linked Principles Glow

**File: `src/components/PrinciplesGrid.tsx`** — Major refactor

- Add imports: `useScroll, useTransform` from framer-motion, `useRef` from react
- Create `PrincipleItem` subcomponent with per-item scroll tracking:
  - `useScroll({ target: itemRef, offset: ['start 0.85', 'center center', 'end 0.15'] })`
  - `glowOpacity`: maps scrollYProgress [0,0.35,0.5,0.65,1] → [0.3,0.85,1,0.85,0.3]
  - `numberColor`: maps to gold opacity [0.1,0.45,0.1]
  - `underlineWidth`: maps to ['0%','100%','0%']
  - `dotScale`: maps to [0.8,1.4,0.8]
  - `dotGlowOpacity`: maps to [0,1,0]
- Title uses `${isDark ? 'text-primary-foreground' : 'text-foreground'}`
- Description uses `${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`
- Keep existing vertical connecting line and shimmer pulse from current component
- Replace inline principle items with `<PrincipleItem>` calls

---

### Section 5: Carousel — Tighter Gaps Only

**File: `src/components/LogoMarquee.tsx`**

- Change gap: `gap-12 md:gap-16 lg:gap-24` → `gap-6 md:gap-10 lg:gap-14`
- Change bgClass padding:
  - Dark/contrast: `py-6 md:py-10 lg:py-14` → `py-4 md:py-6 lg:py-8`
  - Inline: `py-5 md:py-8 lg:py-10` → `py-3 md:py-5 lg:py-6`
- Do NOT change heights, maxWidths, or scale values

---

### Section 6: Light-Mode Ambient Boost

**File: `src/components/LightSectionEffects.tsx`**

- Add aurora ribbon sweep after existing blobs: a wide `w-[120%]` gradient bar with multi-color stops (gold, blue, transparent) that translates from -100% to 200% over 30s
- Add pulsing concentric rings for `hero` variant only: 3 nested `motion.div` rings with `border border-gold/[0.04]`, growing `scale` from 0.5→1.2 over 8-12s with staggered delays

---

### Section 7: Premium Micro-Animations

**A. Page route transitions** — `src/App.tsx`
- Import `AnimatePresence` and `motion` from framer-motion
- Wrap `<Routes>` output in `<AnimatePresence mode="wait">` with a `motion.div` wrapper for fade transitions

**B. CTA button glow** — `src/index.css`
- Add `@keyframes btn-pulse` (gold box-shadow pulse 0→0.08→0)
- Add `.btn-premium-glow` class
- Apply `btn-premium-glow` to "Get in Touch" buttons across pages (Home, About, GuidingPrinciples, OurPlaybook, Contact, InvestmentCriteria)

**C. Team photo circular reveal** — `src/pages/Team.tsx`
- Wrap profile photos in `motion.div` with `clipPath` animation from `circle(0%)` to `circle(50%)` on `whileInView`

**D. Remove FadeIn from LogoMarquee** — `src/pages/Home.tsx`
- Remove the `<FadeIn delay={0.1}>` wrapper around `<LogoMarquee>` (line 214)

**E. Section dividers** — Replace static `<GoldRule>` `h-px` dividers with animated `motion.div` that scales from `scaleX: 0` → `scaleX: 1` on viewport entry

---

### Section 8: Investment Profile Number Glow

**Files: `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx`**

- Add one-time text-shadow pulse to large gold revenue/EBITDA values using `motion.p` with `animate` cycling `textShadow` from `none` → `0 0 30px hsl(38 48% 52% / 0.4)` → `none` over 2s with `delay: 0.5`

---

### Section 9: Small Polish

**A. GoldRule diamond** — `src/components/ui/Section.tsx`
- Add `whileHover={{ rotate: 180, scale: 1.4 }}` to the diamond `motion.div`

**B. Contact GlassCards** — Already have tilt via GlassCard component's `whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}`. Add `style={{ transformPerspective: 1200 }}` to the inner motion.div in GlassCard.

---

### Section 10: Dark Mode Heading/Label Fix

**A. SectionLabel auto-detection** — `src/components/ui/Section.tsx`
- Import `useTheme` from `@/contexts/ThemeContext`
- Update `SectionLabel`: when `light` prop is undefined, auto-detect via `theme === 'dark'`
- `const shouldUseGold = light !== undefined ? light : theme === 'dark'`
- Use `shouldUseGold` instead of `light` in the class

**B. Dark mode muted-foreground brightness** — `src/index.css`
- Change `.dark` `--muted-foreground: 228 12% 55%` → `228 10% 65%`

**C. PrinciplesGrid** — Handled in Section 4 with dark-aware text classes

---

### Files Modified Summary

| File | Sections |
|---|---|
| `src/components/SiteFooter.tsx` | 1 |
| `src/pages/Home.tsx` | 2, 7D |
| `src/pages/Team.tsx` | 2, 7C |
| `src/pages/GuidingPrinciples.tsx` | 2 |
| `src/pages/OurFocus.tsx` | 2, 8 |
| `src/pages/OurPlaybook.tsx` | 2 |
| `src/pages/Contact.tsx` | 2 |
| `src/pages/About.tsx` | 2 |
| `src/pages/InvestmentCriteria.tsx` | 2, 8 |
| `src/components/ScrollRevealText.tsx` | 3 |
| `src/components/PrinciplesGrid.tsx` | 4 |
| `src/components/LogoMarquee.tsx` | 5 |
| `src/components/LightSectionEffects.tsx` | 6 |
| `src/App.tsx` | 7A |
| `src/index.css` | 7B, 10B |
| `src/components/ui/Section.tsx` | 9A, 10A |
| `src/components/GlassCard.tsx` | 9B |

