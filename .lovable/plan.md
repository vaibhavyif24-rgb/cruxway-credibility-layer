

## Plan: Team Deck Cleanup, Theme-Aware Sticky Decks, and Criteria Label Fix

### 1. Remove duplicate logos and "Background" section from TeamStickyDeck

**File: `src/components/TeamStickyDeck.tsx`**
- Remove the "Background" / institutional logos row (lines 225-254) from `TeamCardSurface`. The deal logos marquee stays (it "floats on deck"). The institutional logos are already shown in the separate "Institutional Experience" marquee below.
- Remove `logos` from `TeamDeckMember` interface since it's no longer used in the deck.

**File: `src/pages/Team.tsx`**
- Stop passing `logos` to the `TeamStickyDeck` members array.

### 2. Theme-aware card backgrounds for all sticky decks

All three sticky deck components currently hardcode dark HSL backgrounds. They need to respond to light/dark mode.

**File: `src/components/TeamStickyDeck.tsx`**
- Import `useTheme` from `@/contexts/ThemeContext`.
- Add light-mode card backgrounds (cream/warm tones matching the site's light palette).
- Select the palette based on `theme`.
- Update text colors accordingly (dark text on light cards, light text on dark cards).

**File: `src/components/StickyCardStack.tsx`**
- Already has `lightBgs` and `darkBgs` palettes, but the `variant` prop is set manually per usage. The component should additionally read `useTheme()` and auto-select variant when not explicitly overridden, OR the calling pages should pass the correct variant. Since `StickyCardStack` already supports `variant` prop, the simplest fix is to have calling pages pass `variant` based on current theme.

**Files: `src/pages/InvestmentCriteria.tsx`, `src/pages/Home.tsx`**
- Import `useTheme` and pass `variant={theme === 'dark' ? 'dark' : 'light'}` to each `StickyCardStack`.

### 3. Replace "Step XX" with "Criterion XX" on criteria page

**File: `src/components/StickyCardStack.tsx`**
- Add a `labelPrefix` prop (default: `'Step'`) to `StickyCardStackProps`.
- Pass it through to `CardSurface`.
- In `CardSurface`, replace the hardcoded `Step {card.num}` with `{labelPrefix} {card.num}`.

**File: `src/pages/InvestmentCriteria.tsx`**
- Pass `labelPrefix="Criterion"` to the "What We Look For" `StickyCardStack`.
- The "How We Evaluate" deck can keep `labelPrefix="Step"` (default).

### Summary of files to edit
- `src/components/TeamStickyDeck.tsx` — remove Background logos section, add theme-aware colors
- `src/components/StickyCardStack.tsx` — add `labelPrefix` prop, pass theme variant through
- `src/pages/Team.tsx` — remove `logos` from member data passed to deck
- `src/pages/InvestmentCriteria.tsx` — pass `labelPrefix="Criterion"`, pass theme-based variant
- `src/pages/Home.tsx` — pass theme-based variant

