

## Plan: Principles Single-Slide Deck, Sectors Spacing, Playbook Theme, Mobile Fixes

### 1. PrinciplesDeck — Single-slide scroll-driven experience

**Current**: Pairs of 2 cards side-by-side, creating massive empty space on mobile.
**Target**: One principle at a time, 6 slides total, scroll-driven transitions.

**Changes to `PrinciplesDeck.tsx`**:
- Remove pair grouping entirely — each principle is its own slide (6 slides, not 3 pairs)
- Desktop: single full-width card centered in the sticky container, `max-w-[720px]`
- Mobile: same single-card approach, `min-height: 55vh`, sticky container
- Reduce vertical padding: `pt-2 md:pt-4` (tighter than current `pt-4 md:pt-6`)
- Dot indicators: 6 dots instead of 3
- Scroll per card: reduce from `0.8` to `0.65` for snappier, more intentional transitions
- Keep all existing card visuals: celestial illustrations, alternating backgrounds, vignettes, gold effects, floating content animation

### 2. CinematicScrollReveal — Sectors section spacing

**Problem**: "Sectors We Look At" still merges visually with the tagline (screenshot confirms overlap).

**Changes to `CinematicScrollReveal.tsx`**:
- Desktop: increase `overlayOffset` from `22` to `28` — pushes sectors further below tagline
- Mobile: add `mt-4` (16px) extra margin to the sectors container below the word-reveal section

### 3. OurPlaybook — Theme-aware slides

**Current**: The "Deal Process" section always uses `variant="dark"`. The `StickyCardStack` `lightBgs` array contains dark colors at index 0 and 3, which look wrong in light mode.

**Changes**:
- `OurPlaybook.tsx` line 75: change `variant="dark"` to `variant={theme === 'dark' ? 'dark' : 'light'}`
- `StickyCardStack.tsx`: fix `lightBgs` array — replace the dark entries (index 0: `hsl(220 8% 18%)`, index 3: `hsl(207 55% 14%)`) with light-appropriate colors (`hsl(40 25% 96%)` and `hsl(38 22% 90%)`)
- Fix `lightTextColors` at those same indices to use dark text on light backgrounds

### 4. Mobile rendering fixes

**Root causes**: The PrinciplesDeck paired layout creates `mobileOuterH` = ~1900px of empty space. The mobile sticky height for 2 cards + gap is wrong.

**Fix**: Addressed by change #1 — single-slide approach works cleanly on mobile with `height: auto` fallback and reduced outer height.

Additional mobile fixes:
- Ensure all page roots have `overflow-x: clip` (already done on Home, Principles, Playbook)
- PrinciplesDeck mobile card height: `min(55vh, 400px)` instead of `min(42vh, 360px)` for better content fit

### Files

| File | Change |
|---|---|
| `PrinciplesDeck.tsx` | Rewrite to single-slide (6 slides), tighter gaps, snappier scroll |
| `CinematicScrollReveal.tsx` | Increase `overlayOffset` 22→28, mobile sectors margin |
| `OurPlaybook.tsx` | Theme-aware variant on Deal Process StickyCardStack |
| `StickyCardStack.tsx` | Fix `lightBgs` and `lightTextColors` for proper light mode |

