
Goal: fix clipped descenders in desktop hero H1s across the site without changing anything except that rendering issue.

What I found
- The 8 hero H1s already use `leading-[1.18]`, so reapplying that value in page files will not fix the remaining clipping.
- The shared factor across all affected hero headings is the `.text-shimmer-gold` utility in `src/index.css`.
- That utility uses clipped/transparent text rendering (`background-clip: text` and `-webkit-text-fill-color: transparent`), which can still crop deep descenders like `g`, `y`, and `p` on desktop.
- The uploaded screenshot from `/india` confirms the clipping still happens even with the current line-height.

Implementation
1. Change only `src/index.css`.
2. Add a tiny desktop-only descender buffer to `.text-shimmer-gold` so the glyphs have a little extra bottom render space.
3. Keep the shimmer effect, current hero typography, and existing `leading-[1.18]` values unchanged.
4. Do not modify page JSX, copy, layout, images, motion, or hero section structure.

Coverage
This one shared CSS fix will apply to all current hero pages using the hero heading treatment:
- `src/pages/Home.tsx`
- `src/pages/About.tsx`
- `src/pages/Contact.tsx`
- `src/pages/GuidingPrinciples.tsx`
- `src/pages/InvestmentCriteria.tsx`
- `src/pages/OurFocus.tsx`
- `src/pages/OurPlaybook.tsx`
- `src/pages/Team.tsx`

Technical details
- I would not remove `overflow-hidden` from hero sections, because that is part of the cinematic hero system and could affect the visual masks.
- The safest fix is centralized in the shared text utility rather than touching 8 separate hero components again.

Validation
- Verify desktop hero headings on the affected pages, especially `/india`, to confirm letters like `g`, `y`, and `p` are fully visible.
- Confirm there is no visible change to copy, line breaks, spacing, or animation beyond the descender fix.
