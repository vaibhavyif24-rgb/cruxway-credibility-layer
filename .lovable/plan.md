

## Gold Color System & Visual Polish — Finalization Pass

This is a large-scale visual refinement touching ~15 files, focused on enriching gold accents, improving light-mode readability in the cinematic scroll sections, and adding premium animations.

### Execution Order & Changes

**Phase 1: Gold CSS Variables (instant global impact)**
- `src/index.css`: Update `:root` gold from `38 48% 52%` → `38 62% 46%`, gold-dim from `38 28% 40%` → `38 40% 38%`. Dark mode gold from `38 50% 55%` → `38 55% 58%`, gold-dim from `38 30% 48%` → `38 35% 50%`.
- Update all hardcoded `hsl(38 48% 52%` references in index.css (btn-premium, gold-border-pulse, spinner, gold-underline, etc.) to `hsl(38 62% 46%`.
- Update `.text-shimmer-gold` gradient gold to `hsl(38 65% 58%)`.
- Update `.btn-premium::after` shimmer opacity from `0.08` to `0.12`.
- Update `.btn-premium-glow` pulse from `hsl(38 48% 52%` to `hsl(38 62% 46%`.

**Phase 2: Hardcoded Gold HSL Replacements (10 files)**
Global find-replace across all component files:
- `hsl(38 48% 52%)` → `hsl(38 62% 46%)` (applies to StickyCardStack, HorizontalStickyDeck, CriteriaCarousel, TeamStickyDeck, LightSectionEffects, PrinciplesGrid)
- `hsl(38 45% 55%)` → `hsl(38 60% 50%)` (applies to DarkSectionEffects, LightSectionEffects, AnimatedAccent, CriteriaIllustrations, HorizontalStickyDeck, SiteHeader)
- `hsl(38, 55%, 62%)` → theme-aware: `isDark ? 'hsl(38, 60%, 55%)' : 'hsl(38, 62%, 46%)'` in CinematicScrollReveal and USCinematicScrollReveal (gold text on heading span, MobileWord, SectorColumn bullets, "Sectors We Look At" labels and dividers)
- `hsl(38 55% 65%)` in `.text-shimmer-gold` → `hsl(38 65% 58%)`

**Phase 3: Gold Opacity Bumps**
Systematic opacity increases across shared/light-mode contexts:
- `src/components/ui/Section.tsx`: SectionLabel `text-gold/45` → `text-gold/60`, GoldRule line `bg-gold/20` → `bg-gold/35`, diamond `border-gold/15` → `border-gold/25`
- `src/components/ScrollRevealText.tsx`: Label `text-gold/50` → `text-gold/65`, stats border `border-gold/15` → `border-gold/25`, `border-gold/10` → `border-gold/15`, text-shadow gold value updated to `hsl(38, 62%, 46%`
- `src/pages/Home.tsx`: "Built for Owners" `text-gold/55` → `text-gold/70`, "Get in Touch" button `border-gold/25 text-gold/65 hover:border-gold/45 hover:text-gold/90` → `border-gold/40 text-gold hover:border-gold/60 hover:text-gold hover:shadow-[0_0_20px_hsl(38,62%,46%,0.12)]`
- `src/components/SiteFooter.tsx`: Wordmark glow `0.06` → `0.08`, top shimmer `0.12` → `0.18`
- `src/components/LightSectionEffects.tsx`: Bottom shimmer `0.18` → `0.22`, top shimmer `0.14` → `0.18`, pattern `opacity-[0.02]` → `opacity-[0.035]`, hollow particle `border-gold/15` → `border-gold/25`, solid particle `bg-gold/10` → `bg-gold/15`
- `src/components/PrinciplesGrid.tsx`: Timeline dot `border-gold/30` → `border-gold/40`, glow `bg-gold/20` → `bg-gold/25`, number opacity range `[0.1, 0.45, 0.1]` → `[0.15, 0.55, 0.15]`, timeline line `bg-gold/10` → `bg-gold/15`
- `src/components/TeamStickyDeck.tsx`: Counter `0.4` → `0.5`, role color, deal logos label `0.45` → `0.55`, bullet line `0.3` → `0.35`, photo border brightened

**Phase 4: Sectors Overlay Fix (light mode readability)**
- `CinematicScrollReveal.tsx` + `USCinematicScrollReveal.tsx`: LIGHT_OVERLAY updated to start at `0.7`, end at `0.98`. Mobile sectors overlay increased to `0.95`/`0.97`/`0.99`. Add warm tint layer after main overlay in desktop. Add subtle text shadow in light mode: `0 1px 8px rgba(248,245,240,0.8)`.

**Phase 5: CTA Button Elevation**
- All pages: Primary CTA ("Get in Touch") gets stronger gold border/text. Add `btn-premium-glow` to gold-bordered CTAs on Home.
- Secondary CTA ("Our Focus") gets `hover:border-gold/40`.

**Phase 6: Premium Animations**
- `src/components/ScrollRevealText.tsx`: Add textShadow animation on highlighted words — gold pulse when word reaches full opacity using `useTransform`.
- `src/App.tsx`: Add cursor-following gold glow in light mode (2.5% opacity, 400px radial gradient, desktop only, spring-animated).
- `src/components/LightSectionEffects.tsx`: Wrap container in `motion.div` with `initial={{ scale: 0.95, opacity: 0 }}` / `whileInView={{ scale: 1, opacity: 1 }}` for section entry "breathe" effect.

**Phase 7: WaveBackground, Contact, Team refinements**
- `src/components/WaveBackground.tsx`: Light mode line color to `hsl(228 40% 70%)`, opacity to `0.06`, stroke width to `1.2 + (i % 3) * 0.3`.
- `src/pages/Contact.tsx`: Add `border-t-2 border-t-gold/30` to both GlassCard instances.
- `src/components/TeamStickyDeck.tsx`: All hardcoded `hsl(38 48% 52%` values brightened to `hsl(38 62% 46%`.

### Files Modified (approximately 15)
1. `src/index.css` — gold variables + utility updates
2. `src/components/CinematicScrollReveal.tsx` — overlay + gold colors
3. `src/components/USCinematicScrollReveal.tsx` — overlay + gold colors
4. `src/components/ui/Section.tsx` — opacity bumps
5. `src/components/ScrollRevealText.tsx` — opacity bumps + shimmer animation
6. `src/pages/Home.tsx` — CTA buttons + opacity bumps
7. `src/components/SiteFooter.tsx` — opacity bumps
8. `src/components/LightSectionEffects.tsx` — shimmer + breathe animation
9. `src/components/PrinciplesGrid.tsx` — opacity bumps + gold HSL
10. `src/components/TeamStickyDeck.tsx` — gold HSL brightening
11. `src/components/DarkSectionEffects.tsx` — gold HSL
12. `src/components/StickyCardStack.tsx` — gold HSL
13. `src/components/HorizontalStickyDeck.tsx` — gold HSL
14. `src/components/WaveBackground.tsx` — stroke refinement
15. `src/pages/Contact.tsx` — gold border accent
16. `src/components/AnimatedAccent.tsx` — gold HSL
17. `src/components/CriteriaIllustrations.tsx` — gold HSL
18. `src/components/CriteriaCarousel.tsx` — gold HSL
19. `src/App.tsx` — cursor glow

