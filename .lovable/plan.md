
1. Fix Harin’s last line being clipped on mobile in `src/components/TeamStickyDeck.tsx`.
- The current cards stay `position: sticky` on mobile (`390px` viewport), which is likely causing the next card to overlap before the first card’s full highlight list is readable.
- Follow the existing responsive pattern already used in `src/components/PrinciplesSlider.tsx`: disable sticky behavior on mobile.
- Update the card wrapper so it uses:
  - `position: 'relative'` on mobile
  - `position: 'sticky'` only on tablet/desktop
  - `top` only when sticky is active
- Keep desktop stacking intact, but let mobile cards flow naturally one after another so Harin’s final bullet is fully visible.

2. Add a little more breathing room at the bottom of each team card on mobile.
- Increase the content column’s bottom padding slightly for small screens so the last highlight line does not sit against the card edge.
- If needed, slightly reduce the mobile sticky spacing logic or bypass it entirely when `isMobile` is true.

3. Enlarge Cohoma and Lohum logos in Vaibhav’s deal carousel in `src/pages/Team.tsx`.
- Update `vaibhavDealLogos` so:
  - `Lohum` scale goes from `1.0` to `2.0`
  - `Cohoma Coffee` scale goes from `1.0` to `2.0`
- Add a small `extraGap` for one or both if needed, since doubling their size may make the marquee feel cramped.

4. Keep the carousel visually balanced in `src/components/TeamStickyDeck.tsx`.
- The inline marquee already respects `logo.scale` via `transform: scale(...)`.
- If the larger logos feel vertically cramped on mobile, slightly raise the marquee row height / image max-width for the inline team carousel only, without affecting other marquees site-wide.

5. QA to verify after implementation.
- Check `/india/team` at mobile width (`390px`) to confirm:
  - Harin’s final highlight line is fully visible
  - no text is clipped at the bottom of the first card
  - Vaibhav’s Cohoma and Lohum logos are visibly ~2x larger and still scroll cleanly
  - desktop sticky deck behavior remains unchanged

Technical notes:
- Files to update:
  - `src/components/TeamStickyDeck.tsx`
  - `src/pages/Team.tsx`
- Root cause is likely layout behavior, not text wrapping: mobile sticky stacking is compressing readable space for taller cards.
- Best fix is responsive behavior separation: stacked-flow on mobile, sticky deck on larger screens.
