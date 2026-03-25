

## Fix: Remove Gap Below "What We Look For" Deck

### Root Cause

`SCROLL_PER_CARD = 0.45` with 6 cards creates a runway of `5 × 45vh = 225vh` plus card height (~100vh). That's ~325vh total outer wrapper height. After the last card transition completes, there's still significant scroll distance before the outer div ends, creating a visible empty gap below.

### Fix

**File: `src/components/HorizontalStickyDeck.tsx`**

- Reduce `SCROLL_PER_CARD` from `0.45` to `0.28` — this cuts the runway from 225vh to 140vh, eliminating the trailing gap while keeping transitions smooth (~28vh scroll per card change).

| File | Change |
|------|--------|
| `src/components/HorizontalStickyDeck.tsx` | `SCROLL_PER_CARD`: `0.45` → `0.28` |

