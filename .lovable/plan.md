
## Sticky Card Stack Rebuild: make cards truly stack and feel senior, not playful

### What is wrong now
The current `StickyCardStack` reads like separate slides, not a physical deck:
- the `top` value increases per card, so cards stagger downward instead of taking over the same pinned position
- the imported PNG artwork feels illustrative/childish and disconnected from the site’s PE-style visual language
- each card wrapper uses full-height spacing, so overlap feels delayed and weak
- the stack effect is relying more on decoration than on actual sticky/layer mechanics

### What I will change

#### 1) Rebuild the stacking logic in `src/components/StickyCardStack.tsx`
I will convert it to a true deck pattern:

- **Parent stack section** stays `relative`
- **Each item wrapper** provides the scroll distance
- **Each card** uses `position: sticky` at the **same top position** for all cards
- **Each later card gets a higher z-index**
- **Each wrapper after the first gets a negative top margin / tighter overlap rhythm**
- **IntersectionObserver** remains only for entrance animation (`translateY + opacity`), not for the stack itself

This creates the effect the user described:
```text
scroll area
  wrapper 1 -> card sticky at top: 88px, z: 10
  wrapper 2 -> card sticky at top: 88px, z: 20
  wrapper 3 -> card sticky at top: 88px, z: 30
```

Result: card 2 slides over card 1, card 3 slides over card 2, instead of pushing them apart.

#### 2) Replace the current childish art treatment with professional backgrounds
I will remove reliance on the four PNG art panels inside the cards and shift to backgrounds that match the existing site palette:

- **Dark charcoal / prussian cards**: matte surfaces, faint concentric rings, subtle radial highlight, restrained iconography or linework
- **Cream / sand cards**: large cropped geometric arcs, editorial negative space, no cartoon-like illustration
- **Dark variant for Criteria page**: deep navy/prussian surfaces with very low-contrast gold/blue structural detail

These will be built with:
- layered CSS gradients
- simple inline SVG linework / circles / arcs
- optional muted stat block on select cards
- opaque backgrounds so the top card clearly obscures the one underneath

#### 3) Add real depth cues during takeover
To reinforce the stack:
- outgoing/buried card subtly scales down
- opacity dims slightly
- shadow deepens progressively by layer
- border and surface contrast become cleaner so overlap is obvious

The effect will be restrained, not flashy:
- scale only slightly
- opacity dim only slightly
- shadow tailored to the site’s premium aesthetic

#### 4) Tighten the layout to match the attached reference behavior
I will shift the card composition closer to the reference:
- strong left-aligned serif title
- clean sans-serif description
- larger, quieter visual mass on the right
- more editorial whitespace
- more consistent rounded container proportions

The cards will feel like premium presentation boards rather than startup promo graphics.

### Likely implementation details

#### `src/components/StickyCardStack.tsx`
- remove current raster-art-driven layout as the main visual system
- keep `IntersectionObserver` for `.is-visible` / entrance class behavior
- change sticky positioning from:
```text
top: 60 + index * 32
```
to:
```text
top: shared fixed top value
```
- move z-index onto the sticky card layer itself
- adjust wrapper heights and overlap spacing so the next card reaches the same sticky zone while the previous is still pinned
- add professional background variants with CSS/SVG instead of playful image inserts
- keep component reusable for both Home and Criteria

#### Optional small updates in:
- `src/pages/Home.tsx`
- `src/pages/InvestmentCriteria.tsx`

Only if needed, I may pass small per-card presentation metadata such as:
- background style variant
- whether a card shows a metric block
- whether right side uses rings / arc field / stat layout

### Design direction I will follow
I will use the attached examples as interaction reference, but align styling to your existing brand system:
- prussian / navy / charcoal / cream / sand / muted gold
- editorial serif + disciplined sans pairing
- restrained PE / institutional feel
- no playful illustration-heavy treatment
- no “demo-like” gradients

### Validation after implementation
I will verify that:
- cards pin at the same vertical position
- later cards visibly pass over earlier cards
- overlap is immediate and unmistakable
- the card underneath is still partially readable as a buried layer
- the Home “Our Process” and Criteria “Evaluation Framework” both feel consistent
- the experience holds on the current viewport and mobile

### Expected outcome
After this rebuild, the sections should feel like:
- a real stacked deck
- premium and composed
- aligned with the rest of the site
- visually closer to the attached reference behavior, but with your own brand language instead of copied styling
