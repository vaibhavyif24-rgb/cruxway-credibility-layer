

## Plan: Surgical Polish Pass — 12 Fixes

### Fix 1: Remove Berkeley Haas Logo
**File: `src/pages/Home.tsx`**
- Delete line 28: `import berkeleyHaasLogo from '@/assets/logos/berkeley-haas.png';`
- Delete line 48: `{ src: berkeleyHaasLogo, alt: 'UC Berkeley Haas' },` from `foundersLogos`
- No other files reference it (search confirmed only Home.tsx)

### Fix 2: LogoMarquee Uniform Sizing + Bolder Appearance
**File: `src/components/LogoMarquee.tsx`**
- Replace all conditional sizing (lines 61-74) with uniform height: container `h-[48px] md:h-[72px] lg:h-[80px]`, img `h-[40px] md:h-[64px] lg:h-[72px] max-w-[140px] md:max-w-[240px] lg:max-w-[280px]`
- Boost opacity: `isActuallyDark ? 'opacity-80 hover:opacity-100'`, `isContrastLight ? 'opacity-65 hover:opacity-90'`, inline `'opacity-65 hover:opacity-85'`
- Add `transition-transform duration-500 hover:scale-110` on container div
- Add `transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'` to img style

**File: `src/pages/Team.tsx`** (DealLogoMarquee, ~line 164-203)
- Uniform deal logo sizing: `h-[32px] md:h-[40px] lg:h-[48px]` container, img `h-[28px] md:h-[36px] lg:h-[44px]`
- Remove `logo.scale` transform from img style

### Fix 3: "What We Stand For" Single Line
**File: `src/pages/GuidingPrinciples.tsx`** (lines 79-83)
- Replace the two-line heading with single line: `<h2>What We <span className="text-gold">Stand For</span></h2>` — remove the `<br />` tag

### Fix 4: Reduce Vertical Gaps Globally

**A. `src/components/ScrollRevealText.tsx`** (line 65)
- Change `py-14 md:py-20 lg:py-24` → `py-10 md:py-14 lg:py-16`

**B. `src/pages/Home.tsx`** (line 195)
- Change `pt-8 md:pt-10 lg:pt-12 pb-2` → `pt-6 md:pt-8 lg:pt-10 pb-0`

**C. `src/pages/GuidingPrinciples.tsx`** (line 76)
- Change `pt-4 md:pt-6` → `pt-8 md:pt-10`
- `PrinciplesGrid.tsx` line 81: change `pb-8 md:pb-12` → `pb-6 md:pb-8`

**D. `src/pages/OurFocus.tsx`** (line 226)
- Change `py-12 md:py-16 lg:py-20` → `py-8 md:py-12 lg:py-14`

**E. Scan all pages**: Cap maximum vertical padding at `py-10 md:py-14 lg:py-16`. Reduce any `py-20`, `py-24` values found in section-level elements across all pages.

### Fix 5: Investment Profile Card Polish
**Files: `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx`**

Number cards (isCompact):
- Add animated gold underline beneath value: `motion.div` from `width: 0` → `width: 40px`, `h-[1.5px] bg-gold/30`, on viewport entry with 0.6s duration
- Hover shadow upgrade: `hover:shadow-[0_12px_40px_-8px_hsl(38,45%,52%,0.12)]` and `hover:border-t-gold/70`

Text cards:
- Value text: update to `text-[14.5px] md:text-[15px] leading-[1.7] text-foreground/85`

Add shimmer sweep on stat band container: a `div` overlay with `background: linear-gradient(105deg, transparent 40%, hsl(38,48%,52%,0.03) 50%, transparent 60%)`, `background-size: 300% 100%`, animated via `shimmer-sweep` keyframe at 8s.

### Fix 6: Light-Mode Animation & Color Elevation

**A. `src/components/ui/Section.tsx`** — GoldRule already has viewport-triggered width animation (confirmed in code). No change needed.

**B. SectionLabel** (Section.tsx line 50-63): Add letter-spacing animation — wrap in `motion.p` with `initial={{ letterSpacing: '0.15em' }}` and `whileInView={{ letterSpacing: '0.28em' }}`, `viewport={{ once: true }}`, duration 0.5s.

**C. FadeIn** (Section.tsx line 11-24): Add blur focus-pull: `initial={{ opacity: 0, y, filter: 'blur(4px)' }}` and `whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}`.

**D. ScrollRevealText contrast sections**: Change `bg-[hsl(40,16%,94%)]` → `bg-[hsl(38,18%,93%)]` for richer warm tone. Add decorative gold gradient bands at top and bottom when `isContrastLight`.

**E. StatReveal in ScrollRevealText**: When not dark, stat values use `text-gold` instead of `text-foreground`.

**F. CTA sections across all pages**: Change light-mode bg from `bg-[hsl(40,18%,96%)]` to `bg-[hsl(38,16%,92%)]` and add `border-t border-gold/10`. Affects: Home, GuidingPrinciples, OurFocus, InvestmentCriteria, OurPlaybook, About, Contact, Team.

**G. `src/index.css`**: Add `.btn-premium` shimmer sweep CSS with `::after` pseudo-element. Add `.gold-underline-hover` utility. Verify all keyframes exist (they do from prior rounds). Add `gold-border-pulse` keyframe + `.gold-shimmer-border` utility if missing.

### Fix 7: PrincipleCard Hover Enhancement
**File: `src/components/PrinciplesGrid.tsx`**
- Add `y: -4` to `whileHover` alongside `scale: 1.02`
- Gold left-edge: start at `h-[30%] bg-gold/10` (visible by default), expand to `h-full bg-gold/50` on hover
- Watermark: light mode default `text-gold/[0.06]`, hover `text-gold/[0.12]`
- Add shimmer bottom border: `border-b-2 border-transparent group-hover:border-gold/20 transition-all duration-500`

### Fix 8: LogoMarquee Light-Mode Background
**File: `src/components/LogoMarquee.tsx`**
- Change `bg-[hsl(40,16%,94%)]` → `bg-[hsl(38,16%,92%)]`
- Add gold border accents (1px gold/10 top and bottom) when `isContrastLight`
- Import and render `<LightSectionEffects variant="section" />` inside the band when `isContrastLight`

### Fix 9: Team Stats Bar Visual Upgrade
**File: `src/pages/Team.tsx`** (StatItem component, lines 303-318)
- Light mode: value color `text-gold` instead of `text-foreground`
- Add animated gold underline: `motion.div` from `width: 0` → `width: 24px`, `h-[1.5px] bg-gold/30 mx-auto mt-2`, staggered delays
- Counting animation: parse numeric portion with `useMotionValue` + `animate` for count-up effect, fallback to static text

### Fix 10: CSS Additions
**File: `src/index.css`**
- Add `.btn-premium` shimmer sweep (position: relative, overflow: hidden, ::after pseudo-element with gold gradient)
- Add `.gold-underline-hover` utility
- Add `gold-border-pulse` keyframe + `.gold-shimmer-border` if not already present
- Verify all existing keyframes are intact
- Add button active press effect: `button:not([disabled]):active { transform: scale(0.97) }`

### Fix 11: CinematicScrollReveal Bottom Transition
**Files: `src/components/CinematicScrollReveal.tsx`, `src/components/USCinematicScrollReveal.tsx`**
- Add a decorative gold gradient line at the bottom of each component's render output: `<div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(38,48%,52%,0.15), transparent)' }} />`

### Files Modified (Total: ~12)

| File | Key Changes |
|---|---|
| `src/pages/Home.tsx` | Remove Berkeley Haas, tighten Our Process padding, CTA bg update |
| `src/components/LogoMarquee.tsx` | Uniform sizing, bolder opacity, hover scale, warmer bg, LightSectionEffects |
| `src/pages/GuidingPrinciples.tsx` | Single-line heading, tighten padding, CTA bg |
| `src/components/ScrollRevealText.tsx` | Tighter padding, warmer contrast bg, gold stat values, decorative borders |
| `src/components/ui/Section.tsx` | FadeIn blur effect, SectionLabel letter-spacing animation |
| `src/components/PrinciplesGrid.tsx` | Hover lift, visible default gold accent, bolder watermark, bottom border |
| `src/pages/OurFocus.tsx` | StatCard gold underline, shimmer sweep, tighter gaps, CTA bg |
| `src/pages/InvestmentCriteria.tsx` | Same StatCard upgrades, CTA bg |
| `src/pages/Team.tsx` | Gold stat values, counting animation, gold underlines, DealLogoMarquee uniform sizing |
| `src/index.css` | btn-premium shimmer, gold-underline-hover, gold-border-pulse, button press |
| `src/components/CinematicScrollReveal.tsx` | Gold gradient bottom line |
| `src/components/USCinematicScrollReveal.tsx` | Gold gradient bottom line |
| `src/pages/About.tsx` | CTA bg update |
| `src/pages/Contact.tsx` | CTA bg update |
| `src/pages/OurPlaybook.tsx` | CTA bg update |

