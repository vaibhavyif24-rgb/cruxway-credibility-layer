

## Plan: Remove WaveBackground + Footer Light Mode + Dark Mode Text Fixes + Logo Sizes + Light Mode Effects + Polish

---

### Section 1: Delete WaveBackground and Remove All References

**Delete file:** `src/components/WaveBackground.tsx`

**Remove import + JSX from 10 files:**

| File | Lines to remove |
|---|---|
| `src/pages/Home.tsx` | Import line 14, JSX at lines ~103, ~225 |
| `src/pages/OurFocus.tsx` | Import line 10, JSX at lines ~58, ~163 |
| `src/pages/InvestmentCriteria.tsx` | Import line 13, JSX at lines ~112, and CTA usage |
| `src/pages/OurPlaybook.tsx` | Import line 10, JSX at lines ~98, ~184 |
| `src/pages/Team.tsx` | Import line 12, JSX at lines ~361, ~386 |
| `src/pages/Contact.tsx` | Import line 12, JSX at line ~34 |
| `src/pages/About.tsx` | Import line 11, JSX at lines ~51, ~126 |
| `src/pages/GuidingPrinciples.tsx` | Import line 10, JSX at lines ~37, ~106 |
| `src/components/ScrollRevealText.tsx` | Import line 4, JSX at line 59 |
| `src/components/SiteFooter.tsx` | Import line 5, JSX at line 26 |

---

### Section 2: Footer — White in Light Mode

**File: `src/components/SiteFooter.tsx`**

- Change footer bg: `bg-[hsl(228,58%,18%)]` → `${isDark ? 'bg-primary' : 'bg-background'}`
- Add `LightSectionEffects` import and render `{!isDark && <LightSectionEffects variant="section" />}`
- Top divider: `${isDark ? 'bg-[hsl(40,28%,95%)]/[0.04]' : 'bg-border/40'}`
- Logo text: `${isDark ? 'text-[hsl(40,28%,95%)]' : 'text-foreground'}`
- Links: `${isDark ? 'text-[hsl(40,28%,95%)]/15 hover:text-[hsl(40,28%,95%)]/35' : 'text-muted-foreground/50 hover:text-foreground/70'}`
- Middle divider: `${isDark ? 'bg-[hsl(40,28%,95%)]/[0.04]' : 'bg-border/40'}`
- Copyright: `${isDark ? 'text-[hsl(40,28%,95%)]/10' : 'text-muted-foreground/40'}`
- Region switch: `${isDark ? 'text-[hsl(40,28%,95%)]/15 hover:text-[hsl(40,28%,95%)]/35' : 'text-muted-foreground/50 hover:text-foreground/60'}`
- Separator span: `${isDark ? 'bg-[hsl(40,28%,95%)]/[0.06]' : 'bg-border/40'}`
- Confidential: `${isDark ? 'text-[hsl(40,28%,95%)]/[0.06]' : 'text-muted-foreground/30'}`

---

### Section 3: Fix Dark Mode Text — SectionLabel

**File: `src/components/ui/Section.tsx`**

- Add `import { useTheme } from '@/contexts/ThemeContext';`
- SectionLabel: add `const { theme } = useTheme(); const isDark = theme === 'dark';`
- Change color logic: `light ? 'text-gold/45' : isDark ? 'text-gold/40' : 'text-[hsl(228,45%,45%)]/50'`

**File: `src/components/ScrollRevealText.tsx`**

- Stat labels (line 179): change `text-primary-foreground/35` → `text-primary-foreground/45`

---

### Section 4: Logo Sizes — Increase Base Heights

**File: `src/components/LogoMarquee.tsx`**

- `baseHeight`: `isMobile ? 56 : 100` (was 48/80)
- `baseMaxWidth`: `isMobile ? 200 : 350` (was 160/280)
- `containerHeight`: `isMobile ? 64 : 116` (was 56/96)

**Files: `src/pages/Home.tsx` + `src/pages/Team.tsx`**

- Warburg: `scale: 2.2` (was 2.0)
- NITI Aayog: `scale: 2.2` (was 2.0)
- Swishin: `scale: 2.2` (was 2.0)
- All LogoMarquee `duration={55}` → `duration={60}`

---

### Section 5: LightSectionEffects Enhancement

**File: `src/components/LightSectionEffects.tsx`**

- Gold blob opacity: `0.10 * intensity` (was 0.07)
- Persian blue blob opacity: `0.07 * intensity` (was 0.05)
- White blob opacity: `0.15 * intensity` (was 0.08)
- Diagonal pattern: `opacity-[0.025]` (was 0.02)
- Add drifting golden wash: large horizontal gradient `motion.div` with slow x drift over 30s
- Add `noise-overlay` class to container div

**File: `src/index.css`**

Add `.noise-overlay::before` CSS rule with SVG noise texture at `opacity: 0.03`

---

### Section 6: Investment Profile Dark Mode Text Fix

**Files: `src/pages/OurFocus.tsx` + `src/pages/InvestmentCriteria.tsx`**

- TypographicText value: `${isDark ? 'text-primary-foreground/70' : 'text-foreground/85'}` (was `/60`)
- TypographicNumber label: `${isDark ? 'text-gold/45' : 'text-gold/50'}`

---

### Files Modified (~14)

| File | Changes |
|---|---|
| `src/components/WaveBackground.tsx` | **Deleted** |
| `src/components/SiteFooter.tsx` | Remove wave, add light mode styles + LightSectionEffects |
| `src/components/ui/Section.tsx` | SectionLabel theme-aware color |
| `src/components/ScrollRevealText.tsx` | Remove wave import/JSX, brighter stat labels |
| `src/components/LogoMarquee.tsx` | Increased base heights |
| `src/components/LightSectionEffects.tsx` | Larger blobs, golden wash, noise overlay |
| `src/index.css` | Add noise-overlay CSS |
| `src/pages/Home.tsx` | Remove wave, scale 2.2, duration 60 |
| `src/pages/Team.tsx` | Remove wave, scale 2.2, duration 60 |
| `src/pages/OurFocus.tsx` | Remove wave, dark mode text fix |
| `src/pages/InvestmentCriteria.tsx` | Remove wave, dark mode text fix |
| `src/pages/Contact.tsx` | Remove wave |
| `src/pages/About.tsx` | Remove wave |
| `src/pages/GuidingPrinciples.tsx` | Remove wave |
| `src/pages/OurPlaybook.tsx` | Remove wave |

