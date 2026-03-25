

## Fix: HorizontalStickyDeck Content Visibility + Horizontal Overflow

### Root Cause Analysis

**1. Cards invisible**: Each card has `className="w-full"` (100% of parent), but the parent track is `width: ${cards.length * 100}%` = 600% of the viewport. So each card is 6x wider than the viewport, and `left: ${index * 100}%` positions them at multiples of 600% — pushing them far off-screen. The `translateX` animation only shifts by `100/6 = 16.67%` at a time, which doesn't align with where cards actually are.

**2. Horizontal scrollbar**: The 600%-wide track inside a `max-w-[1080px]` container causes overflow. The sticky div has `overflow: hidden` but the outer wrapper doesn't clip properly in all scenarios.

### Fix

**File: `src/components/HorizontalStickyDeck.tsx`**

- Change card width from `w-full` to `width: ${100 / cards.length}%` so each card fills exactly one "slide" worth of the track
- Change card `left` to `${(index * 100) / cards.length}%` to match
- This way `translateX(-${activeIndex * (100 / cards.length)}%)` correctly aligns each card
- Add `overflow: hidden` on the outer wrapper to prevent any horizontal bleed

**File: `src/pages/InvestmentCriteria.tsx`**

- Remove the `max-w-[1080px]` wrapper around `HorizontalStickyDeck` — the deck should span full width (it's a full-viewport experience like `StickyCardStack`)
- Add `overflow-x: hidden` on the section wrapper to eliminate horizontal scrollbar

### Changes Summary

| File | What |
|------|------|
| `src/components/HorizontalStickyDeck.tsx` | Fix card sizing (`w-full` → percentage), fix positioning (`left`), add `overflow: hidden` on outer |
| `src/pages/InvestmentCriteria.tsx` | Remove `max-w` constraint around deck, add `overflow-x: hidden` on section |

