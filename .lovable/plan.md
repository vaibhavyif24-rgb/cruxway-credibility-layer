

## Plan: Remove WaveBackground + Footer Light Mode + Dark Mode Text + Logo Sizes + Light Effects + Animations

7 sections, ~14 files modified, 1 file deleted.

---

### Section 1: Remove WaveBackground Everywhere

**Delete:** `src/components/WaveBackground.tsx`

**Remove import line + JSX usage from 10 files:**

| File | Import line | JSX lines to remove |
|---|---|---|
| `Home.tsx` | line 14 | line 103, line 225 |
| `Team.tsx` | line 12 | line 361, line 386 |
| `OurFocus.tsx` | line 10 | line 58, line 163 |
| `InvestmentCriteria.tsx` | line 13 | line 112, line 270 |
| `OurPlaybook.tsx` | line 10 | line 98, line 184 |
| `GuidingPrinciples.tsx` | line 10 | line 37, line 106 |
| `About.tsx` | line 11 | line 51, line 126 |
| `Contact.tsx` | line 12 | line 34 |
| `ScrollRevealText.tsx` | line 4 | line 59 |
| `SiteFooter.tsx` | line 5 | line 26 |

For `ScrollRevealText.tsx`, also add `DarkSectionEffects` import and render `{isActuallyDark && <DarkSectionEffects variant="default" />}` in place of the wave, plus gold gradient lines for dark variant.

---

### Section 2: Footer — Theme-Aware (White in Light, Dark in Dark)

**File: `src/components/SiteFooter.tsx`** — Full rewrite

- Replace `bg-[hsl(228,58%,18%)]` with `${isDark ? 'bg-primary' : 'bg-background'}`
- Add `LightSectionEffects` import, render `{!isDark && <LightSectionEffects variant="section" />}`
- Add gold glow behind logo: `radial-gradient` div, theme-conditional color
- Add shimmer line at top of footer
- All text colors become theme-conditional:
  - Logo: `isDark ? 'text-[hsl(40,28%,95%)]' : 'text-foreground'`
  - Links: `isDark ? 'text-[hsl(40,28%,95%)]/15 hover:...' : 'text-muted-foreground/60 hover:text-foreground/70'`
  - Dividers: `isDark ? 'bg-[hsl(40,28%,95%)]/[0.04]' : 'bg-border/40'`
  - Copyright, confidential, separator: similar ternaries
- Add link hover underline animation (gold slide-in)

---

### Section 3: Dark Mode Text Visibility Fixes

**File: `src/components/ui/Section.tsx`**
- Add `import { useTheme } from '@/contexts/ThemeContext'`
- `SectionLabel`: add `useTheme()`, auto-detect dark mode: `const useGold = light !== undefined ? light : theme === 'dark'`
- Color class: `useGold ? 'text-gold/45' : 'text-[hsl(228,45%,45%)]/60'` (bump light mode from /50 to /60)

**File: `src/index.css`**
- Dark mode `--muted-foreground`: change `228 12% 55%` → `228 10% 62%`

**File: `src/components/ScrollRevealText.tsx`**
- Stat labels line 179: `text-primary-foreground/35` → `text-primary-foreground/45`

**Files: `src/pages/OurFocus.tsx` + `src/pages/InvestmentCriteria.tsx`**
- `TypographicText` value: `isDark ? 'text-primary-foreground/70' : 'text-foreground/85'`

---

### Section 4: Logo Sizes — Increase Base + Scales

**File: `src/components/LogoMarquee.tsx`**
- `baseHeight`: `isMobile ? 56 : 96` (was 48/80)
- `baseMaxWidth`: `isMobile ? 200 : 400` (was 160/280)
- `containerHeight`: `isMobile ? 64 : 112` (was 56/96)

**Files: `Home.tsx` + `Team.tsx`** — Update both `foundersLogos` and `allLogos`:
- Warburg: `2.2`, NITI Aayog: `2.2`, Swishin: `2.2`
- Neos/Saltwater/Evercore/TreeForest/Lodha: `1.3`
- Deutsche Bank/Lam Research/Dunes Point/CIA/DePaul/Ashoka/IIC: `1.2`
- All `duration={55}` → `duration={60}`

---

### Section 5: LightSectionEffects Enhancement

**File: `src/components/LightSectionEffects.tsx`**
- Gold blob opacity: `0.10 * intensity` (was 0.07)
- Persian blue blob opacity: `0.07 * intensity` (was 0.05)
- White blob opacity: `0.15 * intensity` (was 0.08)
- Diagonal pattern: `opacity-[0.025]` (was 0.02)
- Add drifting golden wash: large horizontal gradient with 30s x-drift animation
- Add `noise-overlay` class to container div

**File: `src/index.css`** — Add CSS rules:
- `.noise-overlay::before` with SVG fractal noise at opacity 0.03
- `@keyframes grain` for animated noise
- `.light-grain::before` for global page grain effect
- `.btn-premium::before` radial ripple on hover

---

### Section 6: Premium Animations

**File: `src/index.css`**
- Add `.btn-premium::before` radial ripple effect (width 0→300% on hover)
- Keep existing `::after` shimmer sweep

**File: `src/components/ScrollRevealText.tsx`** — StatReveal counter animation:
- Add `useRef`, `useInView`, `useState`, `useEffect`
- Animate stat values counting up from 0 on viewport entry (40 frames, ease-out cubic)

**File: `src/components/GlassCard.tsx`** — Already has tilt, no changes needed.

---

### Section 7: Wave Visibility Refinement

**File: `src/components/WaveBackground.tsx`** — **DELETED** in Section 1. No refinement needed.

---

### Technical Details

| File | Changes |
|---|---|
| `WaveBackground.tsx` | **Deleted** |
| `SiteFooter.tsx` | Theme-aware bg/text, LightSectionEffects, shimmer line, link hover underlines |
| `ui/Section.tsx` | SectionLabel auto-detects dark mode, useTheme import |
| `ScrollRevealText.tsx` | Remove wave, add DarkSectionEffects for dark variant, stat counter animation, brighter labels |
| `LogoMarquee.tsx` | Larger base sizes (96/56px), wider maxWidth (400/200px) |
| `LightSectionEffects.tsx` | Larger blobs, golden wash, noise overlay |
| `index.css` | Brighter muted-foreground dark, noise/grain CSS, btn-premium ripple |
| `Home.tsx` | Remove wave, logo scales 2.2/1.3/1.2, duration 60 |
| `Team.tsx` | Remove wave ×2, logo scales, duration 60 |
| `OurFocus.tsx` | Remove wave ×2, TypographicText dark fix |
| `InvestmentCriteria.tsx` | Remove wave ×2, TypographicText dark fix |
| `Contact.tsx` | Remove wave |
| `About.tsx` | Remove wave ×2 |
| `GuidingPrinciples.tsx` | Remove wave ×2 |
| `OurPlaybook.tsx` | Remove wave ×2 |

