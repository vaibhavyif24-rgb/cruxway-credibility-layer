
## Plan

### 1. Fix the About Us SVG in `src/components/AnimatedAccent.tsx`
The current `partnership` variant is close, but the dart is visually broken into parts and does not read as a single straight hit into the bullseye.

Implementation:
- Rebuild the dart as one clean, straight composition aimed exactly into the center point of the target.
- Use a clearer shaft, a sharper symmetric tip, and balanced fins so it reads immediately as a dart.
- Remove the stray center/extra line treatment that is making the target feel cluttered.
- Keep the target rings, but simplify the composition so the eye focuses on the center hit.
- Increase the tagline size and presence further so it feels intentional and legible, not secondary.

Design intent:
- The graphic should communicate precision and partnership, not decoration.
- The dart should terminate exactly at the bullseye visually, with no ambiguity.

### 2. Redesign the Criteria SVG in `src/components/AnimatedAccent.tsx`
The current `criteria` variant is too cramped horizontally, the hierarchy is weak, and the partnership endpoint floating on the far right makes the layout feel unfinished.

Implementation:
- Rebuild the layout into a clean top-to-bottom structure:
  - Title clearly at the top
  - Four process stages aligned beneath it in a disciplined row/grid
  - Partnership moved to the bottom center as the natural destination
- Replace the current right-edge endpoint with a centered bottom partnership node/diamond connected from the full process.
- Add more subpoints to each stage so the diagram feels substantive:
  - 3 readable subpoints per stage instead of 2
- Increase spacing discipline inside each card:
  - larger title
  - larger labels
  - more consistent vertical rhythm
- Improve alignment of cards, arrows, bullets, and labels so nothing feels raw or improvised.
- Remove the lower quote and remove the line/progress bar below it entirely.
- Reduce unused bottom gap by letting the process terminate cleanly at the new partnership section.

Design intent:
- It should feel like a polished investment process diagram, not an experimental SVG.
- The layout should read instantly: top title, structured evaluation flow, bottom partnership outcome.

### 3. Tighten card alignment for “What Guides Us” in `src/pages/GuidingPrinciples.tsx`
The remaining desktop misalignment is likely coming from how the card content is flowing inside otherwise full-height cards.

Implementation:
- Keep the equal-height grid structure already in place.
- Wrap each card’s internal content in a `flex flex-col h-full` container so titles, dividers, and body copy align consistently.
- Apply one shared minimum height across all principle cards at desktop so every box lands on the same visual baseline.
- Ensure card padding, divider spacing, and paragraph top spacing are identical across all six cards.

Design intent:
- Every card should appear as part of one balanced system.
- No card should look taller just because its title or body copy wraps differently.

### Files to update
1. `src/components/AnimatedAccent.tsx`
   - Refine `partnership`
   - Fully redesign `criteria`
2. `src/pages/GuidingPrinciples.tsx`
   - Normalize “What Guides Us” card internals for desktop-perfect alignment

### Expected result
- About Us SVG: a clear, straight dart landing exactly in the center, with a stronger tagline and less clutter.
- Criteria SVG: a professional process graphic with stronger hierarchy, more readable subpoints, partnership centered at the bottom, and no awkward trailing gap.
- “What Guides Us”: perfectly equal, aligned desktop cards with a cleaner grid rhythm.
