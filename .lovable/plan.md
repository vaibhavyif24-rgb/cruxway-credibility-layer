
Goal: make “What We Look For” use the same scroll behavior model as “How We Evaluate Opportunities”: pinned frame, discrete step-by-step slide changes, and zero blank runway after the last slide.

What I found
- `StickyCardStack` already has the correct architecture:
  - sticky frame
  - outer height based on `cardHeight + transition runway`
  - `activeIndex` derived from normalized scroll progress across the real scrollable range
  - one discrete card change at a time
- `HorizontalStickyDeck` is still using a different model:
  - custom `SCROLL_STEP_VH` math
  - `Math.round(scrolled / stepPx)` instead of progress across the real range
  - a horizontal track that is positioned independently from the proven `StickyCardStack` timing
- That mismatch is why the deck can unpin awkwardly and leave blank space after the final slide.

Implementation approach
1. Replace the deck’s scroll logic with the exact `StickyCardStack` progress model
- In `src/components/HorizontalStickyDeck.tsx`, compute:
  - `outerHeight`
  - `scrolled`
  - `scrollableRange = outerHeight - viewportHeight + STICKY_TOP`
  - `progress = clamp(scrolled / scrollableRange, 0, 1)`
  - `activeIndex = round(progress * (cards.length - 1))`
- This makes slide timing and section ending match the proven vertical carousel behavior.

2. Keep the layout pinned exactly like the vertical stack
- Preserve the same sticky shell pattern:
  - outer wrapper controls runway
  - inner sticky viewport stays pinned at `top: 88px`
  - viewport height stays `window.innerHeight - 88px` with the same min height
- Keep `overflow-hidden` only on the sticky viewport so only one slide is visible.

3. Make the horizontal track behave like a true deck
- Drive the track only from `activeIndex`
- Use full-slide transforms only:
  - `translateX(-activeIndex * 100 / totalCards%)`
- Ensure each slide fully fills the viewport width so there is no partial reveal of the next slide.

4. Remove the trailing gap by matching the runway formula to the vertical stack
- Replace the current fixed `SCROLL_STEP_VH` runway system with the same runway formula used in `StickyCardStack`
- Use a single per-transition constant like the vertical component (`SCROLL_PER_CARD`)
- Result: the final slide finishes exactly as the wrapper ends, so there is no dead space below.

5. Keep the component visually self-contained
- Retain the right-side dots inside the sticky frame as an overlay, unless that conflicts with spacing during implementation
- Do not change page copy or surrounding section structure in `InvestmentCriteria.tsx`

File to update
- `src/components/HorizontalStickyDeck.tsx`

Expected result
- “What We Look For” stays pinned while scrolling, just like “How We Evaluate Opportunities”
- Only one full slide is visible at a time
- Each scroll segment advances one slide cleanly
- The section ends immediately after the last slide with no blank space
