
Goal: make the cards stack end-to-end like the Boundless reference, where each new card fully takes over the same pinned position and only a thin strip of the previous card remains visible until it is covered.

What is actually wrong now
- The current stack is mechanically wrong, not just stylistically wrong.
- `WRAPPER_HEIGHT = 100vh`, `CARD_HEIGHT = 52vh`, and `marginTop = -15vh` create too much vertical separation.
- Result: the previous card releases before the next card reaches the sticky top, so the user sees “slides in sequence” instead of a true stack.
- The current buried scale/fade effect also makes the interaction feel softer than the Boundless reference.

What I will change
1. Rebuild the stack geometry in `src/components/StickyCardStack.tsx`
- Stop using the current “one tall wrapper per card + small negative overlap” rhythm.
- Switch to a true overlapping deck layout:
  - all cards share the exact same sticky `top`
  - cards sit almost on top of each other in document flow
  - each next card starts higher, so it reaches the sticky line before the previous one releases
- Expose only a narrow reveal band between cards, similar to the screenshot you attached.

Target behavior
```text
card 1 pinned
card 2 rises into the exact same top position while card 1 is still pinned
card 2 covers card 1
card 3 does the same to card 2
```

2. Simplify the motion so stacking reads clearly
- Keep entrance animation with IntersectionObserver (`translateY + opacity`) on an inner surface only.
- Reduce or remove the current “buried” transform unless it helps readability.
- Prioritize physical overlap over decorative motion.

3. Tighten the visual stack treatment
- Make every card fully opaque so the active card cleanly obscures the one below.
- Strengthen the top-edge/shadow separation so the layering is obvious.
- Use a restrained, premium surface system instead of playful decoration.

4. Adjust page spacing where needed
- Tune the Home and Investment Criteria section spacing only if the rebuilt stack needs more runway above/below.
- Ensure the effect works on the current `/india` view first, then preserve mobile behavior.

Files to update
- `src/components/StickyCardStack.tsx` — full mechanical rebuild
- Possibly small spacing adjustments in:
  - `src/pages/Home.tsx`
  - `src/pages/InvestmentCriteria.tsx`

Implementation approach
- Replace the current wrapper math with an overlap-based deck formula.
- Use constants like:
  - shared sticky top
  - fixed card min-height
  - small “peek” amount between cards
  - final bottom runway so the last card can clear naturally
- Keep z-index increasing with card order so later cards always pass over earlier ones.

Validation after implementation
- On Home “Our Process”, each next card must visibly cover the previous one before the previous releases.
- On `/india` and on Investment Criteria dark variant, the cards must feel like one continuous stacked deck.
- Only a slim band of the underlying card should remain visible during takeover, matching your screenshot/reference.
