

## Plan: Polish Investment Criteria Cards, Fix Playbook, Add Unique Hero Images

### 1. Redesign Investment Criteria Cards (OurFocus.tsx)

Replace the current simple `GlassCard` grid with a more sophisticated design:

- **Numbered accent**: Large serif gold number (`01`–`06`) as a background watermark element behind each card, creating visual depth
- **Animated gold accent line** on left edge of each card that expands on hover
- **Staggered reveal**: Cards animate in with alternating slide directions (left/right) for visual interest
- **Better spacing**: Increase card padding to `p-8 md:p-10`, add more breathing room between number label and title
- **Refined typography**: Larger titles at `clamp(1.2rem, 2.2vw, 1.5rem)`, slightly larger descriptions at `14px md:15px`
- **Remove unicode icons** (◆, ◈, etc.) — replace with the large watermark number for a cleaner institutional look
- **Add subtle inner glow** on hover using a radial gradient overlay

### 2. Fix "How We Build Value" Title Breaking (OurPlaybook.tsx)

- Line 93-94: Add `whitespace-nowrap` or increase `max-w` to prevent the title from wrapping awkwardly
- Alternatively, adjust the clamp to a smaller max: `text-[clamp(1.4rem,2.6vw,2rem)]`

### 3. Unique Hero Images for Playbook Pages

Currently both OurFocus and OurPlaybook use the same `hero-india-criteria.jpg` / `hero-us-criteria.jpg`. Will add distinct Unsplash images for the Playbook:

- **US Playbook**: A professional boardroom/strategy image (e.g., modern office with city view) — sourced from Unsplash at 2400px+
- **India Playbook**: A professional workspace/growth image (e.g., modern Indian business district or collaborative workspace)

New assets:
- `src/assets/hero-us-playbook.jpg` — Unsplash HD image of a professional strategy/boardroom setting
- `src/assets/hero-india-playbook.jpg` — Unsplash HD image of a modern Indian business environment

Update `OurPlaybook.tsx` imports to use these new images instead of the criteria hero images.

### 4. Ensure All Hero Images Have Cinematic Motion

The `CinematicHero` component already applies Ken Burns zoom, horizontal drift, gold geometric overlays, floating particles, and shimmer effects. The new playbook hero images will use this same component, so they automatically get the full cinematic treatment. No additional motion work needed — just verify the new images work well with the existing `overlay="strong"` setting.

### 5. Overall Polish Pass

- **OurFocus.tsx**: Increase section vertical padding for criteria grid from `py-14` to `py-16 md:py-24 lg:py-28` for more gravitas
- **OurPlaybook.tsx**: Ensure consistent section spacing matches OurFocus
- **CriterionCard hover**: Add a subtle scale transform (`scale: 1.01`) on hover alongside the existing `y: -4` lift

---

### Files to modify

| File | Change |
|------|--------|
| `src/pages/OurFocus.tsx` | Redesign `CriterionCard` with watermark numbers, refined typography, animated accent lines, better spacing |
| `src/pages/OurPlaybook.tsx` | Fix title wrapping, swap hero images to new playbook-specific assets |
| `src/assets/hero-us-playbook.jpg` | New HD Unsplash image (professional US strategy/boardroom) |
| `src/assets/hero-india-playbook.jpg` | New HD Unsplash image (modern Indian business) |

