

## Plan: Senior UI/UX Fixes (5 Items)

### 1. Fix Lowercase Titles in StickyCardStack

**Problem**: Card titles like "Evaluate", "Build" render as "evaluate.", "build." because `StickyCardStack.tsx` explicitly calls `.toLowerCase()` on titles (lines 323 and 383).

**Fix**: Remove `.toLowerCase()` from both render locations in `src/components/StickyCardStack.tsx`. Keep the trailing period. Titles will render as authored: "Identify.", "Evaluate.", "Invest.", "Build.", etc.

**File**: `src/components/StickyCardStack.tsx` (lines 323, 383)

---

### 2. Add "Back to Global" Navigation

**Problem**: The Cruxway logo in the header links to `/${region}` (e.g. `/us`), so there is no way to return to the landing page (`/`). Pressing browser back goes to `/` momentarily but the region context is still set, causing confusion.

**Fix**:
- In `src/components/SiteHeader.tsx`, change the logo `<Link>` destination from `prefix` to `/`
- In `src/pages/Landing.tsx`, add a `useEffect` that resets the region context to `null` on mount, so arriving at the landing page always clears the region state
- This ensures: clicking the logo always returns to the global landing page, and browser back works correctly

**Files**: `src/components/SiteHeader.tsx` (line 52), `src/pages/Landing.tsx` (add useEffect)

---

### 3. Slim Down the Cruxway Logo Font Weight

**Problem**: The logo uses `font-bold` (font-weight 700), making it appear "chubby."

**Fix**: Change `font-bold` to `font-normal` (weight 400) on the logo `<Link>` in `src/components/SiteHeader.tsx` (line 53). The serif font at `text-3xl`/`text-4xl` will remain prominent but appear more refined and institutional. Also update the Landing page logo to match if it differs.

**File**: `src/components/SiteHeader.tsx` (line 53)

---

### 4. Broaden "Founder-Led" Language for US

**Problem**: Multiple US-facing copy references "founder-led businesses" exclusively, but the firm also targets family-owned, retiree-owned, and other ownership types.

**Fix**: Update US-specific copy across pages to use broader ownership language:

| File | Current | Updated |
|---|---|---|
| `Home.tsx` line 128 | "founder-led businesses that keep America running" | "essential businesses that keep America running" |
| `Home.tsx` line 165 | "We focus on founder-led and family-owned businesses..." | "We focus on owner-operated and family-held businesses..." |
| `Home.tsx` line 176 | "Tens of thousands of founder-led businesses..." | "Tens of thousands of essential businesses..." |
| `Home.tsx` line 204 | "partnering with the founders who built..." | "partnering with the owners who built..." |
| `InvestmentCriteria.tsx` line 42 | title: "Founder-Led Succession" | title: "Ownership Succession" |
| `InvestmentCriteria.tsx` line 98 | "exceptional founder-led businesses" | "exceptional businesses" |
| `About.tsx` line 59 (India only) | Keep "founder-led" for India | No change for India |

The India copy retains "founder-led" where appropriate since that market is more founder-centric.

---

### 5. Add Gold-Highlighted Words to ScrollRevealText

**Problem**: In scroll-triggered reveal sections, certain key words should stand out in a different color (gold) to create emphasis and visual hierarchy.

**Fix**: Enhance `ScrollRevealText` to support inline markup for highlighted words. The component currently receives a plain string `heading` and splits by spaces.

**Approach**:
- Change the `heading` prop to accept `React.ReactNode` (JSX) instead of just a string
- Add a new internal parsing: if heading is a string, split by words as before. If it contains `<span>` elements (JSX), preserve them while still applying word-by-word opacity
- Simpler alternative: add a `highlights` prop (array of words/phrases to render in gold)
- The component will check each word against the highlights list and apply `text-gold` class

**Implementation**: Add optional `highlights?: string[]` prop to `ScrollRevealText`. In the `Word` component, check if the word matches any highlight and apply gold color.

**Updated callsites** (examples):
```
// Home.tsx - "What We Do" section
highlights={['essential', 'regulated']}

// Home.tsx - Social proof
highlights={['institutional', 'essential']}

// InvestmentCriteria.tsx - "Our Edge"  
highlights={['disciplined', 'lasting']}
```

The gold highlight creates visual anchors without needing a different font, maintaining the institutional aesthetic.

**Files**: `src/components/ScrollRevealText.tsx`, `src/pages/Home.tsx`, `src/pages/InvestmentCriteria.tsx`, `src/pages/About.tsx`, `src/pages/GuidingPrinciples.tsx`

---

### Summary of Files Modified

1. `src/components/StickyCardStack.tsx` - Remove `.toLowerCase()` on card titles
2. `src/components/SiteHeader.tsx` - Logo links to `/`, font-weight to normal
3. `src/pages/Landing.tsx` - Reset region on mount
4. `src/components/ScrollRevealText.tsx` - Add `highlights` prop for gold words
5. `src/pages/Home.tsx` - Broaden "founder-led" language, add highlights
6. `src/pages/InvestmentCriteria.tsx` - Rename "Founder-Led Succession" to "Ownership Succession", add highlights
7. `src/pages/About.tsx` - Broaden US copy
8. `src/pages/GuidingPrinciples.tsx` - Add highlights

