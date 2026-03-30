

## Plan: Wave Background + Logo Sizing + Layout Diversification + Polish Pass

10 sections touching ~12 files. Creates animated SVG wave background, doubles logo sizes, replaces box layouts with typographic/prose alternatives, and applies polish across the site.

---

### 1. Create WaveBackground Component

**New file: `src/components/WaveBackground.tsx`**

- SVG overlay component with 4-7 flowing cubic bezier wave paths
- Theme-aware: dark mode lines at `hsl(228 50% 25%)` opacity 0.3, light mode at `hsl(228 45% 75%)` opacity 0.08
- Stroke width 0.8-1.2px, animated via Framer Motion `d` attribute morph over 12-18s cycles
- Variant prop: `hero` (7 waves), `section` (4 waves), `full` (6 waves)
- Absolutely positioned, pointer-events-none, preserveAspectRatio="none"
- Each wave has unique baseY, amplitude, and phase offset for organic feel

### 2. Integrate WaveBackground Everywhere

**Files: All 8 page files + `ScrollRevealText.tsx` + `SiteFooter.tsx`**

- **Hero sections** (Home, GuidingPrinciples, OurFocus, InvestmentCriteria, OurPlaybook, Team, Contact, About): Add `<WaveBackground variant="hero" />` inside hero `<section>` after CinematicHero, before content z-10 div
- **CTA sections** on all pages: Add `<WaveBackground variant="section" />` inside CTA sections
- **ScrollRevealText.tsx**: When `isActuallyDark`, add `<WaveBackground variant="section" />` as first child
- **SiteFooter.tsx**: Add `<WaveBackground variant="section" />` inside footer
- **Team stats bar**: Add `<WaveBackground variant="section" />` to the stats bar div

### 3. Logo Carousel: Double Base Sizes

**File: `src/components/LogoMarquee.tsx`**

- Import `useIsMobile` from `@/hooks/use-mobile`
- Change base sizing: `const baseHeight = isMobile ? 48 : 80`, `baseMaxWidth = isMobile ? 160 : 280`, `containerHeight = isMobile ? 56 : 96`
- Apply: `height: Math.round(s * baseHeight)`, `maxWidth: Math.round(s * baseMaxWidth)`, container `height: Math.round(s * containerHeight)`
- Update gap to `gap-12 md:gap-16 lg:gap-24`
- Default duration change from 28 to 55

**Files: `src/pages/Home.tsx`, `src/pages/Team.tsx`**

Update scale values:
- Warburg: 2.0, NITI Aayog: 2.0, Swishin: 2.0
- Neos/Saltwater/Evercore: 1.2, TreeForest/Lodha: 1.2
- Others: 1.0
- Change `duration={48}` → `duration={55}`

### 4. Fix Google Maps Link

**File: `src/pages/Contact.tsx`** (line 24)

Change: `'https://maps.google.com/?q=E-97+GK+II+Delhi+India'` → `'https://maps.app.goo.gl/C4V6nKknHo7vPrrj9'`

### 5. Investment Profile: Typographic Term Sheet

**Files: `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx`**

Replace StatCard component with borderless typographic layout:
- Delete StatCard component from both files
- Number cards (Revenue/EBITDA): label as `text-[10px] uppercase tracking-[0.22em] text-gold/50`, value as `font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-gold`, animated gold underline (`width: 0→32px, h-[1.5px] bg-gold/25`)
- Text cards (Structure/Hold/Partnerships): gold dot before label, value as `text-[14.5px] text-foreground/85 leading-[1.7]`
- Layout: 2-col grid top (Revenue+EBITDA), thin gold divider, 3-col grid bottom (Structure+Hold+Partnerships)
- No borders, no card backgrounds, no boxes
- Staggered `whileInView` entrance with increasing delays
- Add shimmer sweep overlay on section container (existing code kept)

### 6. OurFocus Criteria: Numbered Prose Blocks

**File: `src/pages/OurFocus.tsx`**

Replace CriterionCard component and the 3-col grid with numbered prose rows:
- Each row: `grid grid-cols-12` — col-span-1 for number, col-span-3 for title, col-span-8 for description
- Number: `text-[3.5rem] font-serif text-gold/15`, title: `font-serif text-foreground`, desc: `font-sans text-muted-foreground`
- Between rows: animated gold gradient divider (`scaleX: 0→1` on viewport entry)
- Alternating slide direction: odd from left, even from right
- On mobile: full-width stack (number + title on one line, desc below)
- No boxes, no borders, no card backgrounds

### 7. LightSectionEffects Enhancement

**File: `src/components/LightSectionEffects.tsx`**

- Blob 1: increase to `w-[800px] h-[700px]`, opacity `0.07 * intensity`
- Blob 2: increase to `w-[700px] h-[600px]`, opacity `0.05 * intensity`
- Add blob 3 (warm white): `w-[600px] h-[500px]`, `hsl(40 30% 97% / 0.08)`, drift cycle 18s
- Diagonal pattern: change `opacity-[0.008]` → `opacity-[0.02]`

### 8. Footer Always Dark Persian Blue

**File: `src/components/SiteFooter.tsx`**

- Already has `bg-[hsl(228,58%,18%)]` and cream text — confirmed correct
- Add `<WaveBackground variant="section" />` (from section 2)
- No other changes needed

### 9. Vertical Gap Audit

**Files: `src/pages/InvestmentCriteria.tsx`**

- Line 273: `py-10 md:py-14 lg:py-16` → `py-8 md:py-12 lg:py-14`
- Line 226: already fine at implicit py from pt/pb

**File: `src/components/ScrollRevealText.tsx`**

- Currently `py-8 md:py-10 lg:py-12` — already at target, no change needed

No `py-20` or `py-24` found anywhere — previous pass already handled this.

### 10. Micro-Animations

**File: `src/components/GlassCard.tsx`**

- Add subtle 3D tilt on hover: `whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}`

---

### Files Modified (~12)

| File | Changes |
|---|---|
| `src/components/WaveBackground.tsx` | New component — animated SVG waves |
| `src/components/LogoMarquee.tsx` | Double base sizes, responsive, slower duration |
| `src/components/LightSectionEffects.tsx` | Larger blobs, third blob, visible pattern |
| `src/components/ScrollRevealText.tsx` | Add WaveBackground for dark variant |
| `src/components/SiteFooter.tsx` | Add WaveBackground |
| `src/components/GlassCard.tsx` | 3D tilt hover |
| `src/pages/Home.tsx` | Scale values 2.0, duration 55, WaveBackground in hero+CTA |
| `src/pages/Team.tsx` | Scale values, duration 55, WaveBackground in hero+CTA+stats |
| `src/pages/OurFocus.tsx` | Typographic stats, prose criteria, WaveBackground |
| `src/pages/InvestmentCriteria.tsx` | Typographic stats, WaveBackground, gap reduction |
| `src/pages/Contact.tsx` | Maps URL fix, WaveBackground |
| `src/pages/GuidingPrinciples.tsx` | WaveBackground in hero+CTA |
| `src/pages/About.tsx` | WaveBackground in hero+CTA |
| `src/pages/OurPlaybook.tsx` | WaveBackground in hero+CTA |

