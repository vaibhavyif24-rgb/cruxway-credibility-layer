

## Plan: Persian Blue Brand Shift + Visual Overhaul (10 Sections)

This is a major visual identity change touching ~20 files. The core brand hue shifts from 207 (Prussian navy) to 228 (Persian blue), with layout diversification, enhanced animations, and contact page updates.

---

### Section 1: Persian Blue Color Shift in `index.css`

**File: `src/index.css`**

Update CSS custom properties:

**:root (light mode):**
- `--foreground: 228 58% 18%` (was 207 65% 12%)
- `--card-foreground: 228 58% 18%`
- `--popover-foreground: 228 58% 18%`
- `--primary: 228 58% 18%`
- `--secondary-foreground: 228 58% 18%`
- `--ring: 228 58% 18%`
- `--accent: 228 45% 24%` (was 207 50% 18%)
- Brand tokens: `--prussian: 228 58% 18%`, `--prussian-mid: 228 45% 24%`, `--prussian-light: 228 35% 32%`, `--navy-deep: 228 55% 8%`
- `--muted-foreground: 228 8% 46%` (was 210)

**.dark:**
- `--background: 228 45% 6%` (was 210 50% 5%)
- `--card: 228 40% 8%`, `--popover: 228 45% 7%`
- `--primary: 228 50% 12%`, `--secondary: 228 30% 12%`
- `--muted: 228 28% 12%`, `--muted-foreground: 228 12% 55%`
- `--accent: 228 38% 18%`
- `--border: 228 22% 16%`, `--input: 228 22% 16%`
- `--cream: 228 40% 7%`, `--rule: 228 18% 17%`, `--light-stone: 228 28% 10%`

**hero-gradient-animated:** Update gradient stops from 207/210 hues to 228 hue. Change animation duration to 20s.

Add new keyframes:
```css
@keyframes text-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
```
Add `.text-shimmer-gold` utility class for one-time gold sweep on hero headings.

---

### Section 2: Hardcoded HSL References — Full Sweep

Update all hardcoded `hsl(207...`, `hsl(210...`, `hsl(215...` references across these files:

| File | What changes |
|---|---|
| `SiteHeader.tsx` | `hsl(207,65%,12%)` → `hsl(228,58%,18%)`, `hsl(210,8%,46%)` → `hsl(228,8%,46%)`, `hsl(215,50%,8%)` → `hsl(228,48%,10%)`, `hsl(210_60%_4%/0.5)` → `hsl(228_55%_6%/0.5)` |
| `StickyCardStack.tsx` | darkBgs array: all 207/210 → 228 equivalents. lightTextColors: `hsl(207 65% 12%)` → `hsl(228 58% 18%)`, `hsl(210 8% 44%)` → `hsl(228 8% 44%)` |
| `HorizontalStickyDeck.tsx` | Same pattern: darkBgs + lightBgs + lightTextColors arrays — all 207/210 → 228 |
| `TeamStickyDeck.tsx` | darkCardBgs: `hsl(207 50% 12%)` → `hsl(228 48% 14%)`, `hsl(210 12% 10%)` → `hsl(228 12% 10%)` |
| `PrinciplesDeck.tsx` | titleColor, descColor, darkBg gradients — 207/210/215 → 228 |
| `PrinciplesSlider.tsx` | Same as PrinciplesDeck |
| `DarkSectionEffects.tsx` | orbBottomLeft: `hsl(207 50% 18%)` → `hsl(228 45% 20%)` |
| `OurFocus.tsx` | StatCard dark bg: `hsl(210,45%,9%)` → `hsl(228,42%,11%)` |
| `InvestmentCriteria.tsx` | Same StatCard dark bg update |
| `InvestorLogin.tsx` | radial gradient: `hsl(207 65% 15%)` → `hsl(228 58% 18%)` |
| `CinematicHero.tsx` | vignette: `hsl(214 45% 8%)` → `hsl(228 45% 8%)` |

---

### Section 3: LightSectionEffects Enhanced Rewrite

**File: `src/components/LightSectionEffects.tsx`** — Full rewrite

Add:
- Two large animated drifting gradient blobs using Framer Motion (x/y drift over 20-25s infinite)
- Increased particle count: hero=8, cta=6, section=4. Mix of filled (`bg-gold/10`) and hollow (`border border-gold/15 bg-transparent`) particles. Some with slow rotation.
- Subtle diagonal line pattern overlay at `opacity-[0.008]`
- Shimmer lines with increased gold opacity (0.18 bottom, 0.14 top)

---

### Section 4: Logo Carousel Per-Logo Sizing

**File: `src/components/LogoMarquee.tsx`**
- Add `scale?: number` to LogoItem interface
- Apply scale multiplier to img height via inline style: base heights 44/64/72px × (logo.scale || 1)
- Update gap to `gap-10 md:gap-14 lg:gap-20`, slow duration by 20%

**File: `src/pages/Home.tsx`**
- Add scale values to foundersLogos and allLogos arrays (Warburg 1.6, NITI Aayog 1.5, Swishin 1.5, others 1.0-1.1)
- Update LogoMarquee `duration` from 40 to 48

**File: `src/pages/Team.tsx`**
- Add matching scale values to foundersLogos and allLogos
- DealLogoMarquee: normalize all deal logo scales to 1.0, remove extraGap, increase base height to `h-[36px] md:h-[44px] lg:h-[52px]`
- Update LogoMarquee `duration` from 40 to 48

---

### Section 5: Layout Diversification — Principles Timeline

**File: `src/components/PrinciplesGrid.tsx`** — Major refactor

Replace 3-column card grid with vertical staggered timeline:
- Alternating left/right alignment on desktop (md+), all left on mobile
- No boxes, no borders, no card backgrounds
- Large gold number (`text-[3rem] font-serif text-gold/20`) with vertical connecting gold line (`w-px bg-gold/10`)
- Principle title in serif + description in sans, no containers
- Staggered `whileInView` entrance, sliding from left/right alternately
- On hover: gold number intensifies to `text-gold/40`, gold underline appears under title
- Connecting line pulses with shimmer animation between items

---

### Section 6: Layout Diversification — Investment Profile Typographic

**Files: `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx`**

Replace StatCard bordered cards with borderless typographic layout:
- Remove StatCard component entirely
- Each item is a `motion.div` with:
  - Label: `text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50`
  - Value: `font-serif text-[clamp(1.2rem,2.5vw,1.6rem)] text-foreground mt-1` (Revenue/EBITDA values in `text-gold`)
  - Animated gold underline: `width: 0 → 32px`, `h-[1.5px] bg-gold/25`
- Layout: 2-col for Revenue+EBITDA, full-width for Structure, 2-col for Hold Period+Aligned Partnerships
- Staggered entrance with increasing delays
- No card containers — clean typographic presentation on the warm contrast band

---

### Section 7: Layout Diversification — OurFocus Criteria Prose Blocks

**File: `src/pages/OurFocus.tsx`** (CriterionCard)

Replace 3-column card grid with 2-column alternating prose layout:
- Left column: large gold number (`text-[3.5rem] font-serif text-gold/15`) + title
- Right column: description text
- No borders, no card backgrounds
- Thin gold divider with shimmer between each criterion
- Odd rows slide from left, even from right on viewport entry

---

### Section 8: Contact Page Updates

**File: `src/pages/Contact.tsx`**
- Update India location: `'GK II, Delhi, India'` → `'E-97, GK II, Delhi, India'`
- Wrap location GlassCard in `<a>` linking to Google Maps with `target="_blank"`
- Add ArrowUpRight icon to location card (matching email card pattern)
- Google Maps URLs: India → `https://maps.google.com/?q=E-97+GK+II+Delhi+India`, US → `https://maps.google.com/?q=San+Diego+California`

---

### Section 9: Advanced Animations

**A. Scroll progress bar** — `SiteHeader.tsx`
- Add `useScroll` → `scrollYProgress` from Framer Motion
- Render a `motion.div` at top of header: `h-[2px] bg-gold/40 origin-left`, `scaleX` bound to `scrollYProgress`

**B. Parallax on hero images** — `CinematicHero.tsx`
- Add `useScroll` + `useTransform(scrollY, [0, 500], [0, -60])` for subtle upward parallax on hero image

**C. Text shimmer on hero headings** — All pages
- Apply `text-shimmer-gold` class to hero `<h1>` elements across Home, GuidingPrinciples, OurFocus, InvestmentCriteria, OurPlaybook, Team, About, Contact

**D. Section entry gold wipe** — `ScrollRevealText.tsx`
- When `isContrastLight`, add a `motion.div` horizontal gold line that sweeps across on viewport entry

---

### Section 10: Padding Reduction + Persian Blue Integration

**Padding cap:**
- `ScrollRevealText.tsx`: `py-10 md:py-14 lg:py-16` → `py-8 md:py-10 lg:py-12`
- `SectorShowcase.tsx`: `py-16 md:py-20 lg:py-28` → `py-14 md:py-16 lg:py-16`
- Home consecutive ScrollRevealText sections: add `-mt-2` between them

**Persian blue accent integration (light mode):**
- `SectionLabel`: change `text-muted-foreground/50` → `text-[hsl(228,45%,45%)]/50`
- SiteHeader active nav underline: light mode `bg-gold/30` → `bg-[hsl(228,45%,45%)]/30`
- Stat labels in ScrollRevealText: `text-muted-foreground/50` → `text-[hsl(228,45%,45%)]/40`

**Footer dark in both modes:**
- `SiteFooter.tsx`: Change `isDark ? 'bg-primary' : 'bg-card'` → `isDark ? 'bg-primary' : 'bg-[hsl(228,58%,18%)]'`
- All footer text uses cream/light colors regardless of mode (text-primary-foreground pattern)

---

### Files Modified (~20 total)

| File | Changes |
|---|---|
| `src/index.css` | Persian blue vars, text-shimmer keyframe, utility class |
| `src/components/SiteHeader.tsx` | Scroll progress bar, hardcoded HSL updates |
| `src/components/SiteFooter.tsx` | Dark footer in both modes |
| `src/components/LightSectionEffects.tsx` | Full rewrite with drifting blobs, more particles |
| `src/components/LogoMarquee.tsx` | Per-logo scale prop, adjusted gaps/duration |
| `src/components/PrinciplesGrid.tsx` | Timeline layout replacing card grid |
| `src/components/ScrollRevealText.tsx` | Tighter padding, gold wipe, Persian blue stat labels |
| `src/components/CinematicHero.tsx` | Parallax effect, vignette HSL update |
| `src/components/DarkSectionEffects.tsx` | HSL update |
| `src/components/StickyCardStack.tsx` | HSL updates for all palette arrays |
| `src/components/HorizontalStickyDeck.tsx` | HSL updates |
| `src/components/TeamStickyDeck.tsx` | HSL updates |
| `src/components/PrinciplesDeck.tsx` | HSL updates |
| `src/components/PrinciplesSlider.tsx` | HSL updates |
| `src/components/ui/Section.tsx` | SectionLabel Persian blue color |
| `src/pages/Home.tsx` | Logo scales, text-shimmer, spacing |
| `src/pages/Team.tsx` | Logo scales, deal logo normalization, text-shimmer |
| `src/pages/OurFocus.tsx` | Typographic stat layout, prose criteria, text-shimmer |
| `src/pages/InvestmentCriteria.tsx` | Typographic stat layout, text-shimmer |
| `src/pages/Contact.tsx` | Address update, clickable location card |
| `src/pages/GuidingPrinciples.tsx` | text-shimmer on hero |
| `src/pages/About.tsx` | text-shimmer, CTA bg |
| `src/pages/OurPlaybook.tsx` | text-shimmer |
| `src/pages/InvestorLogin.tsx` | HSL update |
| `src/components/SectorShowcase.tsx` | Padding reduction |

