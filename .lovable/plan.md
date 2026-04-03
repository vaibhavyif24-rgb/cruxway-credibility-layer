

## Plan: Redesign Value Creation Chart to Professional Quality

### Problem
The current bar chart looks amateurish: flat rectangles with thin borders, no visual depth, no ambient texture, no sense of institutional quality. It feels like a basic prototype, not a chart on a $500M fund's website.

### Design Direction
A premium, editorial-quality visualization inspired by institutional annual reports (Blackstone, KKR). Key upgrades:

1. **Wider, more substantial bars** with inner texture (subtle noise/grain pattern via CSS, inner glow at the top edge)
2. **Ambient glow beneath each bar** casting soft gold light downward onto the baseline
3. **Staggered entrance animation** when scrolling into view (bars grow up sequentially)
4. **Connecting growth line** a thin gold line connecting the tops of all bars, showing the growth trajectory
5. **Richer active state** with a radial glow halo around the selected bar, not just opacity change on others
6. **Better label typography** with larger phase numbers and titles that feel weighted
7. **Detail panel upgrade** with a left gold accent border strip and better spacing

### Technical Changes

**File: `src/pages/OurPlaybook.tsx`** (lines 98-236)

Replace the `ValueCreationChart` component entirely:

- **Bar widths**: 64px mobile, 100px desktop (up from 52/80)
- **Bar heights**: `[100, 160, 230, 310]` mobile, `[130, 210, 295, 390]` desktop
- **Bar styling**: Each bar gets a multi-layer approach:
  - Base: gradient fill from gold/30 at top to gold/8 at bottom (dark) or gold/35 to gold/12 (light)
  - Inner highlight: 1px inset gold border with subtle top-edge glow
  - A faint vertical line pattern inside (repeating-linear-gradient with 1px lines every 12px at gold/5)
- **Growth trajectory line**: An SVG `<path>` drawn across the tops of all 4 bars using a smooth bezier curve, stroke gold/20, with a `pathLength` animation on scroll-in
- **Ambient base glow**: Each bar gets a `box-shadow: 0 4px 20px -4px hsl(43 78% 50% / 0.08)` beneath it
- **Staggered entrance**: Use `useInView` + staggered `motion.div` with 0.12s delay per bar, animating from `height: 0` to full height
- **Active state**: Selected bar pulses with `box-shadow: 0 0 30px hsl(43 78% 50% / 0.25)`, gold top edge thickens to 4px, bars get full gold gradient. Non-selected bars fade to 0.2 opacity
- **Labels**: Phase numbers at `text-[12px] md:text-[14px]`, titles at `text-[12px] md:text-[13px]` with more generous `max-w-[90px] md:max-w-[110px]`
- **Detail panel**: Add a `border-l-2 border-gold/40` left accent strip. Watermark number enlarged to `text-[6rem]`. Phase label uses full gold color. Description text at `text-[15px] md:text-[17px]`
- **Horizontal baseline**: Slightly thicker at 1.5px with gradient fade on edges using `linear-gradient(90deg, transparent, gold/20 15%, gold/20 85%, transparent)`

### What stays the same
- Click-to-select/deselect interaction model
- `AnimatePresence mode="wait"` for detail panel transitions
- Spring physics for bar height changes
- Overall layout structure (chart area above, detail panel below)
- All text content in `valueCreationItems`

