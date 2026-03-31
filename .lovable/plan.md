

## Gold Color System Overhaul — Implementation Plan

This is a bulk find-and-replace operation across ~15 files to update gold color values from muted/dusty tones to richer, more visible gold.

### Section 1: CSS Variable Root Fix
**File**: `src/index.css`
- Line 47-48: `--gold: 38 48% 52%` → `40 65% 44%`, `--gold-dim: 38 28% 40%` → `40 45% 36%`
- Line 60: `--cin-card-label: hsl(38, 45%, 36%)` → `hsl(40, 45%, 36%)`
- Line 108-109: `--gold: 38 50% 55%` → `40 58% 56%`, `--gold-dim: 38 30% 48%` → `40 38% 46%`
- Lines 248-249: gold-border-pulse `hsl(38 48% 52%` → `hsl(40 65% 44%`
- Line 293: btn-premium::after `hsl(38 48% 52%` → `hsl(40 65% 44%`
- Lines 333-334: gold-underline-hover `hsl(38 48% 52%` → `hsl(40 65% 44%`
- Line 349: text-shimmer-gold `hsl(38 55% 65%)` → `hsl(40 60% 55%)`
- Lines 363-364: btn-pulse `hsl(38 48% 52%` → `hsl(40 65% 44%`
- Lines 377-378: spinner-gold `hsl(38 48% 52%` → `hsl(40 65% 44%`

### Section 2: Logo Filter Fix
**Files**: `src/components/LogoMarquee.tsx` (line ~37), `src/components/TeamStickyDeck.tsx` (line 34)
- Replace goldFilter string: `invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)` → `invert(60%) sepia(50%) saturate(350%) hue-rotate(5deg) brightness(95%)`

### Section 3: Hardcoded Gold in Components

**CinematicScrollReveal.tsx + USCinematicScrollReveal.tsx** (both identical structure):
- All `hsl(38, 55%, 62%)` → theme-aware: `isDark ? 'hsl(40, 58%, 56%)' : 'hsl(40, 65%, 44%)'`
- Diamond bullets: same with `/0.7` opacity
- Divider line: `hsl(38,48%,52%` → `hsl(40,65%,44%`
- Add text shadows for light mode readability
- Update LIGHT_OVERLAY to start at 0.75 opacity (heavier)

**TeamStickyDeck.tsx**: All `hsl(38 48% 52%` → `hsl(40 65% 44%`

**StickyCardStack.tsx**: lightTextColors step values `hsl(38 48% 52%)` → `hsl(40 65% 44%)`, darkTextColors step, active dot color

**HorizontalStickyDeck.tsx**: Same step color replacements

**LightSectionEffects.tsx**: `hsl(38 48% 52%` → `hsl(40 65% 44%`, `hsl(38 45% 55%)` → `hsl(40 60% 48%)`

**DarkSectionEffects.tsx**: All `hsl(38 45% 55%)` → `hsl(40 60% 48%)`

**SiteFooter.tsx**: `hsl(38, 45%, 55%` → `hsl(40, 60%, 48%`, shimmer line `hsl(38,48%,52%` → `hsl(40,65%,44%`

**SiteHeader.tsx**: `hsl(38, 48%, 52%` → `hsl(40, 65%, 44%`

**PrinciplesSlider.tsx + PrinciplesDeck.tsx**: All `hsl(38, 45%, 55%` → `hsl(40, 60%, 48%`

**ScrollRevealText.tsx**: text-shadow `hsl(38, 48%, 52%, 0.15)` → `hsl(40, 65%, 44%, 0.2)`

**InvestmentCriteria.tsx**: `hsl(38 48% 52%` → `hsl(40 65% 44%`

**OurFocus.tsx**: same pattern

**Home.tsx**: shimmer line `hsl(38, 45%, 55%` → `hsl(40, 60%, 48%`

**GuidingPrinciples.tsx**: same shimmer line fix

**OurPlaybook.tsx**: `hsl(38,` border references → updated

### Section 4: Opacity Bumps on Accent Elements
**Section.tsx**:
- SectionLabel: `text-gold/45` → `text-gold/55`
- GoldRule line: `bg-gold/20` → `bg-gold/30`
- GoldRule diamond: `border-gold/15` → `border-gold/25`

**Home.tsx**: tagline `text-gold/55` → `text-gold/70`

**ScrollRevealText.tsx**: Label `text-gold/50` → `text-gold/60`

### Section 5: Sectors Section Light Overlay + Text Shadow
**CinematicScrollReveal.tsx + USCinematicScrollReveal.tsx**:
- Update LIGHT_OVERLAY: start at `rgba(255,255,255,0.75)` (was 0.5)
- Add light-mode text shadows on sector headings and gold text

### Technical Details
**Files modified (16)**:
`src/index.css`, `src/components/LogoMarquee.tsx`, `src/components/TeamStickyDeck.tsx`, `src/components/CinematicScrollReveal.tsx`, `src/components/USCinematicScrollReveal.tsx`, `src/components/StickyCardStack.tsx`, `src/components/HorizontalStickyDeck.tsx`, `src/components/LightSectionEffects.tsx`, `src/components/DarkSectionEffects.tsx`, `src/components/SiteFooter.tsx`, `src/components/SiteHeader.tsx`, `src/components/PrinciplesSlider.tsx`, `src/components/PrinciplesDeck.tsx`, `src/components/ScrollRevealText.tsx`, `src/components/ui/Section.tsx`, `src/pages/Home.tsx`

Plus pages with isolated instances: `InvestmentCriteria.tsx`, `OurFocus.tsx`, `GuidingPrinciples.tsx`, `OurPlaybook.tsx`

All changes are color value replacements only — no structural or layout changes.

