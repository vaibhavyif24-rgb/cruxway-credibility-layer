

## Remove Blank Space After Step 4

### Problem
The outer wrapper height is `cards.length * 0.65 * 100vh = 260vh`. But the last card (Step 4) doesn't need any scroll runway after it — it only needs to stay visible. The extra `0.65 * 100vh = 65vh` of runway after the last card creates the large blank gap before "Institutional Experience."

### Fix — `src/components/StickyCardStack.tsx`
Change the outer height formula from:
```
cards.length * SCROLL_PER_CARD * 100  →  260vh
```
to:
```
(cards.length - 1) * SCROLL_PER_CARD * 100 + (CARD_HEIGHT as vh)  →  ~195vh + card height
```

This gives scroll runway only for transitions between cards (3 transitions for 4 cards) plus just enough height at the end for the last card to remain visible. The blank gap after Step 4 is eliminated entirely.

The `scrollableRange` calculation in the scroll handler already accounts for `outerHeight - viewportHeight`, so it will automatically adjust — no other changes needed.

### Files
- `src/components/StickyCardStack.tsx` — one-line height formula change (line ~216)

