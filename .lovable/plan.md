

## Plan: Professional Mobile Footer Redesign

### Problem
On mobile (375px), the 6 navigation links in the footer try to display inline with gaps, causing them to wrap unpredictably across 2+ lines. "OUR IDENTITY" gets cut, and "OUR FOCUS" / "OUR PLAYBOOK" stack awkwardly. The overall mobile layout lacks structure.

### Solution: Vertically stacked, center-aligned mobile footer

**File: `src/components/SiteFooter.tsx`** — mobile-only changes (below `md:` breakpoint):

**Row 1 — Brand (centered)**
- Center-align "Cruxway" wordmark on mobile
- Show tagline below it in smaller text (currently hidden on mobile)
- `text-center` on mobile, keep `md:flex-row md:justify-between` for desktop

**Row 2 — Navigation as 2-column grid**
- Replace the single `flex` row with a `grid grid-cols-2 md:hidden` layout on mobile
- 6 links in a clean 2×3 grid, center-aligned within each cell
- Desktop keeps the existing inline layout unchanged
- `gap-y-3 gap-x-4 py-4`

**Row 3 — Email + Region (centered)**
- Center on mobile: email on one line, region switcher on the next
- `flex-col items-center md:flex-row` 

**Row 4 — Legal (centered)**
- Center copyright and Privacy/Terms on mobile
- `text-center` on mobile, keep `sm:flex-row justify-between` for desktop

### Technical Details
- All changes scoped with responsive prefixes (`md:`) so desktop is untouched
- Navigation: hidden `flex` on mobile, replaced with `grid grid-cols-2` for clean alignment
- Touch targets maintained at 44px+ height via `py-2` on each grid link

