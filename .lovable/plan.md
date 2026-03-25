
Goal: rebuild the stack so it behaves like the Boundless reference mechanically, while looking like Cruxway visually.

What is actually broken now
- The cards already share one sticky top (`88px`), but the wrappers are too short (`70vh`) relative to the card height (`~52vh`) plus sticky offset. That leaves almost no sticky runway, so cards do not stay pinned long enough to overlap convincingly.
- The scale/opacity effect is being applied to the sticky element itself, and progress is based on the current wrapper instead of the next card arriving. That makes the motion feel off and weak.
- The backgrounds are over-decorated for this brand, which is why the section reads playful instead of institutional.

What I will change

1. Rebuild the stack geometry in `src/components/StickyCardStack.tsx`
- Keep a single parent stack container.
- Give every card the same sticky top.
- Make each wrapper substantially taller than the card so the card remains pinned long enough to be overtaken.
- Add tighter vertical overlap between wrappers so card 2 reaches the sticky zone while card 1 is still pinned.
- Keep higher `z-index` on later cards so they slide over earlier ones.

Target interaction:
```text
wrapper 1  -> card pinned at top 88
wrapper 2  -> reaches same top 88 while card 1 is still pinned
wrapper 3  -> reaches same top 88 while card 2 is still pinned
```

2. Move animation to an inner card surface
- Keep the outer node purely sticky.
- Move `translateY`, `scale`, and `opacity` to an inner panel so sticky math stays stable.
- Keep IntersectionObserver only for the entrance reveal, matching the Boundless `om-animate` idea.

3. Fix the takeover logic
- Compute each card’s “buried” progress from the next wrapper’s position, not its own.
- Start the scale/dim only when the next card begins entering the sticky zone.
- Keep the effect restrained: slight scale-down, mild dimming, stronger shadow, not flashy.

4. Replace the current art direction with professional surfaces
- Remove the childish/illustrative feel.
- Use opaque editorial card backgrounds aligned to the site palette:
  - charcoal / prussian for dark cards
  - cream / warm stone for light cards
- Keep only very restrained structural detail: one low-contrast arc, ring field, or dot grid per card.
- No PNG-style artwork; no busy decorative overlays.

5. Tighten the card composition
- Strong left-aligned serif title.
- Clean sans-serif body copy.
- Larger, quieter right-side numeric mass.
- More whitespace and cleaner border/shadow hierarchy so overlap reads immediately.

Files I will update
- `src/components/StickyCardStack.tsx`
- Possibly small spacing-only adjustments in:
  - `src/pages/Home.tsx`
  - `src/pages/InvestmentCriteria.tsx`

Technical implementation details
- Sticky shell:
```text
position: sticky
top: 88px
z-index: increasing by card index
```
- Wrapper rhythm:
```text
min-height: larger than card height + sticky offset
negative/top overlap between subsequent wrappers
final wrapper gets enough bottom runway
```
- Animation pattern:
```text
IntersectionObserver -> add visible state/class
hidden: translateY(...)
visible: translateY(0), opacity: 1
```
- Takeover progress:
```text
progress for card i derived from wrapper i+1 approaching sticky top
```

Validation I will do after implementation
- On Home “Our Process”, card 2 must visibly slide over card 1 before card 1 releases.
- On Investment Criteria “Evaluation Framework”, the same overlap must work in the dark variant.
- The card underneath should remain partially visible as a buried layer.
- The effect should feel immediate and obvious at the current viewport first, then hold on mobile.

Expected outcome
- A true stacked deck, not separate slides.
- Cleaner, more senior backgrounds.
- Overlap behavior much closer to Boundless mechanically, but styled for Cruxway rather than copied.
