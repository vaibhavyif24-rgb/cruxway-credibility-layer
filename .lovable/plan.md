

## Plan: Senior UI/UX Polish for Our Focus & Our Playbook Pages

### 1. Redesign Investment Criteria Grid (OurFocus.tsx)

Replace the current simple `GlassCard` grid with a more sophisticated, well-thought-out layout:

- **Numbered accent system**: Large serif numbers (01-06) as watermark-style background elements within each card, creating visual hierarchy
- **Alternating layout rhythm**: First row shows 2 wider cards, second row 3 equal cards, third row 1 full-width card. This creates visual interest vs. a flat 2x3 grid
- **Gold left-border accent**: Each card gets a subtle 2px gold left border that expands on hover
- **Staggered entrance**: Cards animate in with alternating directions (odd from left, even from right) for sophistication
- **Improved typography**: Larger titles (`clamp(1.2rem, 2.2vw, 1.5rem)`), better spacing, and a refined "Criterion 01" label with letter-spacing

### 2. Fix "How We Build Value" Title Breaking (OurPlaybook.tsx)

- Change title from "How We Build Value" to a non-breaking, more authoritative title: **"The Value Creation Framework"**
- Add `whitespace-nowrap` on desktop via responsive class `md:whitespace-nowrap`
- Adjust clamp sizing to prevent overflow on small screens

### 3. New Hero Images for Playbook Pages

Replace the reused `hero-india-criteria.jpg` / `hero-us-criteria.jpg` with distinct, professional Unsplash images:

- **US Playbook**: Use `hero-partnership.jpg` (already in assets, unused by Playbook). If unsuitable, use `hero-industry.jpg` or `hero-nyc-skyline.jpg` which are already available
- **India Playbook**: Use `hero-india-business.jpg` (already in assets, currently unused by Playbook)
- These are distinct from the Focus page heroes, avoiding visual repetition

### 4. Ensure All Hero Images Have Proper Cinematic Motion

The `CinematicHero` component already applies Ken Burns zoom + horizontal drift + gold geometric overlays + floating particles. All pages already use this component. Verify the Playbook pages pass images correctly through `CinematicHero` (they do). No additional motion work needed beyond swapping the image sources.

### 5. Overall Polish Refinements

- **OurPlaybook.tsx**: Replace `StickyCardStack` for the deal process with the `CriteriaPipeline` vertical timeline component (as originally planned but not implemented). This is more visually distinctive and avoids duplicating the card-stack pattern used elsewhere
- **Value Creation section**: Add a section heading label and improve spacing. Change the carousel card minimum height and typography for better presence
- **Consistent section padding**: Ensure all sections have matching vertical rhythm (`py-16 md:py-24 lg:py-28`)

---

### Files to modify

| File | Changes |
|------|---------|
| `src/pages/OurFocus.tsx` | Redesign criteria grid layout with sophisticated card system |
| `src/pages/OurPlaybook.tsx` | Fix title, swap hero images, replace StickyCardStack with CriteriaPipeline, polish spacing |

