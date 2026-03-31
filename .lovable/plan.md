

## Gold Color Brightening + Button Unification — Implementation Plan

This is a color value update across ~20 files plus a new CSS class and ScrollRevealText enhancements.

### Section 1: CSS Variable Update
**File**: `src/index.css`
- Line 47-48: `--gold: 40 65% 44%` → `43 78% 50%`, `--gold-dim: 40 45% 36%` → `43 55% 40%`
- Line 108-109: `--gold: 40 58% 56%` → `43 70% 55%`, `--gold-dim: 40 38% 46%` → `43 45% 45%`
- All `hsl(40 65% 44%` in keyframes/utilities (lines 248, 249, 293, 333, 363, 364, 377, 378) → `hsl(43 78% 50%`
- `hsl(40 60% 55%)` in text-shimmer-gold (line 349) → `hsl(43 70% 55%)`

### Section 2: `.btn-gold` Class + CTA Unification
**File**: `src/index.css` — Add `.btn-gold` and `.dark .btn-gold` classes after `.btn-premium` block

**Apply `btn-premium btn-gold btn-premium-glow` to all "Get in Touch" / CTA buttons**:
- `src/pages/Home.tsx` line 147: Hero "Get in Touch" — replace `border border-gold/25 text-gold/65 hover:border-gold/45 hover:text-gold/90`
- `src/pages/Home.tsx` line 254-257: CTA section — replace conditional class with `btn-gold`
- `src/pages/OurFocus.tsx` line 185-188: same pattern
- `src/pages/InvestmentCriteria.tsx` line 359-362: same
- `src/pages/OurPlaybook.tsx` line 200-203: same
- `src/pages/GuidingPrinciples.tsx` line 120-123: same
- `src/pages/About.tsx` line 142-145: same ("Start a Conversation")

### Section 3: Hardcoded Gold Replacements
Bulk find-replace across all `.tsx` files:
- `hsl(40, 65%, 44%)` → `hsl(43, 78%, 50%)` (55 matches in CinematicScrollReveal, USCinematicScrollReveal, PrinciplesDeck)
- `hsl(40 65% 44%` → `hsl(43 78% 50%` (124 matches in StickyCardStack, HorizontalStickyDeck, TeamStickyDeck, CriteriaCarousel, LightSectionEffects, Landing, PrinciplesGrid, OurFocus)
- `hsl(40 60% 48%` → `hsl(43 70% 50%` (130 matches in DarkSectionEffects, LightSectionEffects, CinematicHero, GeometricHero, GlassCard, SiteFooter, SiteHeader, InvestorLogin, PrinciplesSlider, Home, GuidingPrinciples)
- `hsl(40, 60%, 48%` → `hsl(43, 70%, 50%` (if any comma-separated variants)

### Section 4: Logo Filter
**Files**: `src/components/LogoMarquee.tsx` line 34, `src/components/TeamStickyDeck.tsx` line 34
- Replace filter with: `brightness(0) invert(55%) sepia(60%) saturate(500%) hue-rotate(8deg) brightness(100%)`

### Section 5: ScrollRevealText Enhancements
**File**: `src/components/ScrollRevealText.tsx`
- Line 54: `bg-[hsl(38,18%,93%)]` → `bg-[hsl(40,22%,92%)]`
- Lines 58-63: Remove the gradient fade overlays block entirely
- Lines 73-74: Label className → `text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.28em] mb-5 md:mb-7 text-gold` (full gold, no opacity)
- After label `</motion.p>` (line 78): Add gold accent line `<motion.div>` with `w-8 h-[1.5px] bg-gold/50 mb-6 md:mb-8`
- Line 134: text-shadow → `'0 0 15px hsl(43,78%,50%,0.25)'`
- Lines 136-140: Add `font-medium` to highlighted words
- Line 162: Stat value → `text-[clamp(1.6rem,3.5vw,2.4rem)] text-gold font-medium` (no conditional)
- Line 165: Stat label → `font-semibold`, opacity `text-foreground/50` / `text-primary-foreground/40`
- Line 104: border divider `border-gold/15` → `border-gold/25`
- LIGHT_OVERLAY in CinematicScrollReveal: start at `0.8` (line 30)

### Section 6: SectionLabel + GoldRule
**File**: `src/components/ui/Section.tsx`
- Line 70: `text-gold/55` → `text-gold` (full gold, no opacity)
- Line 88: `bg-gold/30` → `bg-gold/40`
- Line 96: `border-gold/25` → `border-gold/35`, size `w-1.5 h-1.5`

### Section 7: Opacity Bumps (site-wide)
Apply across all files — key changes:
- `text-gold/45` → `text-gold/70`
- `text-gold/50` → `text-gold/75`
- `text-gold/55` → `text-gold/80`
- `text-gold/60` → `text-gold/85`
- `text-gold/65` → `text-gold` (full)
- `border-gold/10` → `border-gold/20`
- `border-gold/15` → `border-gold/25`
- `border-gold/20` → `border-gold/30`
- `border-gold/25` → `border-gold/40`
- `bg-gold/10` → `bg-gold/15`
- `bg-gold/15` → `bg-gold/20`
- `bg-gold/20` → `bg-gold/25`

### Section 8: Hero Gold Text Shadow + Tagline
**File**: `src/pages/Home.tsx`
- Line 119-120: Add `style={{ textShadow: '0 1px 8px hsl(43,78%,50%,0.3)' }}` to gold `<span>`
- Line 112: `text-gold/70` → `text-gold font-semibold`

### Section 9: CTA Background Warmth
Replace `bg-[hsl(38,16%,92%)]` → `bg-[hsl(40,20%,91%)]` in:
- Home.tsx, OurFocus.tsx, InvestmentCriteria.tsx, OurPlaybook.tsx, GuidingPrinciples.tsx, About.tsx, LogoMarquee.tsx

### Technical Details
**Files modified (~20)**: `src/index.css`, `src/components/ui/Section.tsx`, `src/components/ScrollRevealText.tsx`, `src/components/CinematicScrollReveal.tsx`, `src/components/USCinematicScrollReveal.tsx`, `src/components/LogoMarquee.tsx`, `src/components/TeamStickyDeck.tsx`, `src/components/StickyCardStack.tsx`, `src/components/HorizontalStickyDeck.tsx`, `src/components/LightSectionEffects.tsx`, `src/components/DarkSectionEffects.tsx`, `src/components/GlassCard.tsx`, `src/components/CinematicHero.tsx`, `src/components/GeometricHero.tsx`, `src/components/SiteFooter.tsx`, `src/components/SiteHeader.tsx`, `src/components/PrinciplesDeck.tsx`, `src/components/PrinciplesSlider.tsx`, `src/components/CriteriaCarousel.tsx`, `src/components/PrinciplesGrid.tsx`, `src/pages/Home.tsx`, `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx`, `src/pages/OurPlaybook.tsx`, `src/pages/GuidingPrinciples.tsx`, `src/pages/About.tsx`, `src/pages/Landing.tsx`, `src/pages/InvestorLogin.tsx`, `src/pages/NotFound.tsx`, `src/App.tsx`

All changes are color values, opacities, and one new CSS class. No structural or layout changes.

