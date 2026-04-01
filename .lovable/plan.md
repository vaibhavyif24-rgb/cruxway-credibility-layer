

## Plan: Fix Team Card Text Overflow on Mobile

### Problem
On mobile (390px viewport), the team card text content overflows the screen edge. The card's content area doesn't properly constrain text within the available width.

### Root Cause
The outer deck container uses `px-4` (16px each side), leaving 358px for cards. Inside, the content div uses `p-6` (24px each side). The `flex-1 min-w-0` on the content column should handle overflow, but the summary text at `11.5px` with `break-words` and highlights with `overflow-wrap-anywhere` may still overflow due to the `flex` layout not constraining width properly on mobile when the card has no explicit `max-width` or `overflow-hidden` on the outer wrapper.

### Fix — `src/components/TeamStickyDeck.tsx`

1. **Add `overflow-hidden` and `w-full` to the outer card wrapper** (line 105) to ensure the card never exceeds its container width
2. **Add `overflow-hidden` to the flex row** (line 131) so the content column is properly constrained
3. **Add `word-break: break-word`** via Tailwind `break-words` to the summary and highlight text spans to ensure long words wrap
4. **Reduce mobile padding** from `p-6` to `p-5` on mobile for the content area to give text more room

### Files Modified
- `src/components/TeamStickyDeck.tsx` — add overflow constraints and adjust mobile padding

