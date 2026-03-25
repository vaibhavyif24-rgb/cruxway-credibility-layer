
Goal: make the “What We Look For” section behave like a true presentation deck: the frame stays pinned, only one full slide is visible at a time, and there is zero dead/blank runway after the last slide.

What’s actually going wrong:
- `HorizontalStickyDeck` is currently using continuous `scrollProgress`-based `translateX` in `src/components/HorizontalStickyDeck.tsx` (`scrollProgress` + `translateX` on the wide track).
- That means while scrolling, two cards are partially visible at once. Because only the active card’s text fades in, the incoming card reads as “blank space”.
- The current outer height is also driven by mixed `vh + px` math, so the sticky deck can feel like it scrolls past the content instead of ending crisply.
- The right-side dots are rendered as a separate sticky sibling, which visually reinforces the empty gutter instead of making the deck feel like one contained presentation surface.

Implementation plan

1. Rework the deck from continuous motion to discrete slide changes
- Remove `scrollProgress` as the driver for horizontal movement.
- Use scroll only to determine `activeIndex`, similar to `StickyCardStack`.
- Move the track in full-card increments only:
  - `transform = translateX(-(activeIndex * 100 / totalCards)%)`
- Keep a polished eased transition so each downward scroll segment changes one slide cleanly.

2. Make the scroll runway exact so there is no blank space after the final slide
- Replace the current `calc(${transitionRunwayVh}vh + ${cardHeight}px)` approach with measured pixel-based layout math.
- Define one per-slide scroll step from viewport height (for example ~20–24vh per change).
- Compute:
  - `outerHeight = cardHeight + (cards.length - 1) * scrollStepPx`
- Compute `activeIndex` from the scrolled distance across those exact segments.
- Clamp the last slide to the final segment so the deck finishes exactly as the outer wrapper ends.

3. Keep the presentation pinned and self-contained
- Keep the sticky frame as the only visible viewport for the deck.
- Ensure `overflow-hidden` remains on the sticky frame so only one card is ever visible.
- Do not allow any “peek” of the next card during scroll.

4. Move the dot indicators inside the presentation frame
- Render the dots as an absolutely positioned overlay inside the sticky card viewport (`absolute right-* top-1/2 -translate-y-1/2`).
- Remove the current separate sticky sibling dot column.
- This makes the deck feel like one premium, contained presentation instead of content plus a blank gutter.

5. Preserve the rest of the page
- Keep the page copy, spacing above the section, and content structure unchanged.
- Limit the fix to the deck behavior so only this section is affected.

Files to update
- `src/components/HorizontalStickyDeck.tsx`
  - Remove continuous scroll translation
  - Switch to discrete `activeIndex`-based slide changes
  - Replace runway sizing with exact pixel-based step math
  - Move dot indicators into the sticky frame
  - Keep only one slide visible at all times

Technical notes
- Current issue area: `HorizontalStickyDeck` lines around the `scrollProgress` state, `translateX` calculation, and the separate sticky dots block.
- Desired behavior should mirror the robustness of `StickyCardStack`, but with horizontal full-slide transitions instead of vertical stacking.
- This is a behavior fix first, not a redesign.

Expected result
- When the user reaches “What We Look For”, the deck stays pinned.
- Scrolling down changes one full slide at a time.
- No partial blank panel appears on the right.
- No empty space remains after the last slide.
- The section feels intentional, premium, and presentation-like on tablet and desktop.
